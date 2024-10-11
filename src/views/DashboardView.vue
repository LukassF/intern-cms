<template>
  <div class="w-full h-full sm:px-20 sm:py-10 overflow-auto">
    <!-- <nav>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/create">Create</router-link>
      <router-link to="/modify">Modify</router-link>
    </nav> -->

    <div class="w-full min-h-full flex flex-col gap-4 justify-between">
      <h1 class="text-left text-3xl text-brandGrey-300">User list</h1>
      <div
        class="bg-white flex-1 rounded-[6px] shadow-md px-[20px] py-[25px] flex flex-col gap-[40px]"
      >
        <UsersTableHeader />
        <UsersTable />
      </div>
      <div class="h-[40px] bg-blue-400"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UsersTableHeader from "@/components/dashboard/UsersTableHeader.vue";
import UsersTable from "@/components/dashboard/UsersTable.vue";
</script>

<!-- <script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  // components: {
  //   HelloWorld,
  // },
});
</script> -->
