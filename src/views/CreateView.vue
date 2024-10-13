<template>
  <div class="w-full h-full px-5 py-10 md:px-20 overflow-auto">
    <div class="w-full min-h-full flex flex-col gap-4 justify-start">
      <h1 class="text-left text-3xl text-brandGrey-300">
        {{ route.query.userId ? "Modify" : "Add" }} user
      </h1>
      <div
        class="grid grid-cols-1 grid-rows-2 xs:grid-cols-2 md:grid-cols-[2fr_1fr] gap-4"
      >
        <UserData />
        <UserImage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserData from "@/components/create/UserData.vue";
import UserImage from "@/components/create/UserImage.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
