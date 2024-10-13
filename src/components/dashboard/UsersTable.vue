<template>
  <div class="w-full flex-1">
    <table class="w-full">
      <TableHead />
      <TableRow
        v-for="(item, i) in Array(9)"
        :key="i"
        :index="i"
        firstName="Milos"
        lastName="Stojanovic"
        v-on:clickEdit="() => navigateModifyUser(i)"
        v-on:clickRemove="() => setIsOverlayOpen(true)"
      />
    </table>
  </div>
</template>

<script setup lang="ts">
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const navigateModifyUser = (userId: number) => {
  router.push({
    name: "create",
    query: {
      userId,
    },
  });
};

const setIsOverlayOpen = (val: boolean) => {
  store.commit("app/setShowOverlay", val);
};
</script>
