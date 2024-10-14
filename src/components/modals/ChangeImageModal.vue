<template>
  <div class="flex flex-col justify-between items-stretch h-full gap-4">
    <div class="flex justify-center mb-[20px]">
      <div class="w-[120px] aspect-square rounded-full overflow-hidden">
        <ImageHandler :src="avatar" customClass="w-full h-full object-cover" />
      </div>
    </div>
    <input
      @input="(e) => onInput((e.target as HTMLInputElement).value)"
      :value="avatar"
      type="text"
      class="outline-none border-solid border-[1.5px] border-brandGrey-100 rounded-[5px] py-[5px] px-[10px]"
    />
    <div class="flex flex-col gap-2">
      <button
        @click="onClickConfirm"
        class="w-full md:w-auto bg-accent-200 hover:bg-accent-100 disabled:opacity-70 disabled:hover:bg-accent-200 text-white text-sm px-[16px] py-[8px] rounded-[5px]"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { debounce } from "lodash";
import ImageHandler from "../shared/ImageHandler.vue";
import { useTypedStore } from "@/store";

interface IChangeImageModal {
  avatar?: string;
  onSetImage: (val?: string) => void;
}

const props = defineProps<IChangeImageModal>();
const store = useTypedStore();

const avatar = ref(props.avatar ?? "");
const debouncedInput = debounce((value: string) => {
  avatar.value = value;
}, 300);

const onInput = (val: string) => {
  debouncedInput(val);
};

const onClickConfirm = () => {
  props.onSetImage(avatar.value);
  store.commit("app/SET_SHOW_OVERLAY", false);
};
</script>
