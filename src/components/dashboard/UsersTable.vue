<script setup lang="ts">
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
</script>

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
        v-on:clickEdit="() => {}"
        v-on:clickRemove="() => {}"
      />
    </table>
  </div>
</template>
