<template>
  <div
    :class="`p-[25px] w-full xs:h-auto xs:w-[400px] md:w-[450px] bg-white absolute rounded-t-[8px] xs:rounded-[8px] left-1/2 -translate-x-1/2 top-auto bottom-0 xs:bottom-auto xs:top-1/2 transition-all duration-[350ms] ${translate} ${opacity} ease-out`"
  >
    <component :is="props.child" v-bind="props.childProps" />
  </div>
</template>

<script setup lang="ts">
import { useTypedStore } from "@/store";
import { useMediaQuery } from "@/utils/utils";
import { computed, ref, watchSyncEffect, defineProps, Component } from "vue";

interface IModalComponent {
  child: Component;
  childProps: Record<any, any>;
}

const props = defineProps<IModalComponent>();
const store = useTypedStore();

const opacity = ref("opacity-0");
const { matches: isXs } = useMediaQuery("(max-width: 525px)");
const translate = ref(isXs.value ? "translate-y-full" : "-translate-y-full");

const isOpen = computed(() => store.state.app.showOverlay);

watchSyncEffect(() => {
  const isMobile = isXs.value;

  if (isOpen.value) {
    setTimeout(() => {
      translate.value = isMobile ? "translate-y-0" : "-translate-y-1/2";
      opacity.value = "opacity-100";
    }, 0);
  } else {
    translate.value = isMobile ? "translate-y-full" : "-translate-y-full";
    opacity.value = "opacity-0";
  }
});
</script>
