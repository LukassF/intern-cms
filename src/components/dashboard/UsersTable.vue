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
        v-on:clickRemove="() => {}"
      />
    </table>
  </div>
</template>

<script setup lang="ts">
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateModifyUser = (userId: number) => {
  router.push({
    name: "create",
    query: {
      userId,
    },
  });
};
</script>
