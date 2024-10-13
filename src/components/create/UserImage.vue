<script setup lang="ts">
import { PLACEHOLDER_PROFILE_IMAGE } from "@/utils/constants";
import CameraIcon from "../icons/CameraIcon.vue";
</script>

<template>
  <div
    class="bg-white rounded-[6px] shadow-md px-[20px] pb-[25px] pt-[50px] flex flex-col items-stretch gap-[50px]"
  >
    <div class="flex justify-center">
      <div class="w-[120px] aspect-square rounded-full overflow-hidden">
        <img
          :src="PLACEHOLDER_PROFILE_IMAGE"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
    <button
      class="hover:opacity-80 text-sm flex gap-2 items-center justify-center border-solid border-[1.5px] border-brandGrey-100 rounded-[5px] px-[10px] py-[5px]"
    >
      <CameraIcon class="w-[16px] -mb-[1px]" />
      Change Photo
    </button>
  </div>
</template>
