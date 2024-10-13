<template>
  <div
    :class="`p-[25px] w-full xs:h-auto xs:w-[400px] md:w-[450px] bg-white absolute rounded-t-[8px] xs:rounded-[8px] left-1/2 -translate-x-1/2 top-auto bottom-0 xs:bottom-auto xs:top-1/2 transition-all duration-[400ms] ${translate.valueOf()} opacity-${opacity.valueOf()}`"
  >
    <div class="flex flex-col justify-between items-stretch h-full gap-[40px]">
      <div>
        <h1 class="text-3xl text-brandGrey-300">Are you sure?</h1>
        <p class="text-md text-brandGrey-100">This action is irreversible</p>
      </div>
      <div class="flex flex-col gap-2">
        <button
          @click="onClickConfirm"
          class="w-full md:w-auto bg-accent-200 hover:bg-accent-100 disabled:opacity-70 disabled:hover:bg-accent-200 text-white text-sm px-[16px] py-[8px] rounded-[5px]"
        >
          Yes, I'm sure
        </button>
        <button
          @click="onClickBack"
          class="w-full md:w-auto hover:bg-gray-100 disabled:opacity-70 disabled:hover:bg-accent-200 text-brandGrey-300 text-sm px-[16px] py-[8px] rounded-[5px]"
        >
          No, go back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@/utils/utils";
import { computed, ref, watchSyncEffect, defineProps } from "vue";
import { useStore } from "vuex";

interface IModalComponent {
  onConfirm: () => void;
}

const props = defineProps<IModalComponent>();
const store = useStore();

const translate = ref("full");
const opacity = ref(0);
const { matches: isXs } = useMediaQuery("(max-width: 525px)");

const isOpen = computed(() => store.state.app.showOverlay);

watchSyncEffect(() => {
  const isMobile = isXs.value;
  if (isOpen.value) {
    setTimeout(() => {
      translate.value = isMobile ? "translate-y-0" : "-translate-y-1/2";
      opacity.value = 100;
    }, 0);
  } else {
    translate.value = isMobile ? "translate-y-full" : "-translate-y-full";
    opacity.value = 0;
  }
});

const onClickConfirm = () => {
  props.onConfirm();
  store.commit("app/setShowOverlay", false);
};

const onClickBack = () => {
  store.commit("app/setShowOverlay", false);
};
</script>
