<template>
  <img
    :src="props.src ?? PLACEHOLDER_PROFILE_IMAGE"
    :class="`${customClass}`"
    @error="onError"
  />
</template>

<script setup lang="ts">
import { PLACEHOLDER_PROFILE_IMAGE } from "@/utils/constants";
import { defineProps } from "vue";

interface IImageHandler {
  src?: string;
  customClass: string;
}
const props = defineProps<IImageHandler>();

const onError = (e: Event) => {
  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_PROFILE_IMAGE;
};
</script>
