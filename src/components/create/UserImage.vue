<template>
  <div
    class="bg-white rounded-[6px] shadow-md px-[20px] pb-[25px] pt-[50px] flex flex-col items-stretch gap-[50px]"
  >
    <div class="flex justify-center">
      <div class="w-[120px] aspect-square rounded-full overflow-hidden">
        <ImageHandler
          :src="props.image"
          customClass="w-full h-full object-cover"
        />
      </div>
    </div>
    <button
      @click="() => onClickChangeImage(true, ChangeImageModal)"
      class="hover:opacity-80 text-sm flex gap-2 items-center justify-center border-solid border-[1.5px] border-brandGrey-100 rounded-[5px] px-[10px] py-[5px]"
    >
      <CameraIcon class="w-[16px] -mb-[1px]" />
      Change Photo
    </button>
  </div>
</template>

<script setup lang="ts">
import CameraIcon from "../icons/CameraIcon.vue";
import { Component, defineProps } from "vue";
import store from "@/store";
import ChangeImageModal from "../modals/ChangeImageModal.vue";
import ImageHandler from "../shared/ImageHandler.vue";

interface IUserImage {
  image?: string;
  onSetImage: (val?: string) => void;
}

const props = defineProps<IUserImage>();

// navigate to change image modal with data
const onClickChangeImage = (isOpen: boolean, modal: Component) => {
  const data = {
    avatar: props.image,
    onSetImage: props.onSetImage,
  };
  store.commit("app/SET_SHOW_OVERLAY", isOpen);
  store.commit("app/SET_OVERLAY_DATA", { child: modal, childProps: data });
};
</script>
