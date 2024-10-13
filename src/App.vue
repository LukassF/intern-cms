<template>
  <OverlayWrapper
    :open="store.state.app.showOverlay"
    v-on:close="() => setIsOverlayOpen(false)"
  >
    <ModalComponent v-on:confirm="() => {}" />
  </OverlayWrapper>

  <router-view />
</template>

<script setup lang="ts">
import { ref } from "vue";
import ModalComponent from "./components/shared/ModalComponent.vue";
import { OverlayWrapper } from "./utils/wrappers";
import { useStore } from "vuex";

const store = useStore();

const setIsOverlayOpen = (val: boolean) => {
  store.commit("app/setShowOverlay", val);
};
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
