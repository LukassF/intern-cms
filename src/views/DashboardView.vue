<template>
  <div class="w-full h-full px-5 py-10 md:px-20 overflow-auto">
    <div class="w-full min-h-full flex flex-col gap-4 justify-between">
      <h1 class="text-left text-3xl text-brandGrey-300">User list</h1>
      <div
        class="bg-white flex-1 rounded-[6px] shadow-md px-[20px] py-[25px] flex flex-col gap-[40px]"
      >
        <UsersTableHeader />
        <UsersTable />
      </div>
      <PaginationController
        :pages="store.state.dashboard.numberOfPages"
        :active-page="store.state.dashboard.activePage"
        v-on:click-page="updateActivePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UsersTableHeader from "@/components/dashboard/UsersTableHeader.vue";
import UsersTable from "@/components/dashboard/UsersTable.vue";
import PaginationController from "@/components/dashboard/PaginationController.vue";
import { useStore } from "vuex";

const store = useStore();

const updateActivePage = (page: number) => {
  store.commit("dashboard/setActivePage", page);
};
</script>
