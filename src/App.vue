<template>
  <OverlayWrapper
    v-if="store.state.app.mountOverlay"
    :open="store.state.app.showOverlay"
    v-on:close="() => setIsOverlayOpen(false)"
    :unmountOverlay="unmountOverlay"
  >
    <ModalComponent
      :child="overlayData.child"
      :childProps="overlayData.childProps"
    />
  </OverlayWrapper>

  <router-view />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import ModalComponent from "./components/shared/ModalComponent.vue";
import { OverlayWrapper } from "./utils/wrappers";
import { useTypedStore } from "./store";

const store = useTypedStore();
const overlayData = computed(() => store.state.app.overlayData);
const users = computed(() => store.state.users.users);

const setIsOverlayOpen = (val: boolean) => {
  store.commit("app/SET_SHOW_OVERLAY", val);
};
const unmountOverlay = () => {
  store.commit("app/SET_UNMOUNT_OVERLAY");
};

onMounted(() => {
  if (Object.values(users.value).length > 0) {
    return;
  }

  store.dispatch("users/getUsers", { pageIdx: 1 });
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f5f7f9;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
