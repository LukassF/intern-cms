<template>
  <div class="w-full h-full px-5 py-10 md:px-20 overflow-auto">
    <div class="w-full min-h-full flex flex-col gap-4 justify-start">
      <div class="flex justify-start items-center gap-4">
        <button class="px-[5px] group" @click="goBack">
          <DoubleArrowLeftIcon
            size="30"
            class="group-hover:text-brandGrey-200 text-brandGrey-300"
          />
        </button>
        <h1 class="text-left text-3xl text-brandGrey-300">
          {{ route.query.userId ? "Modify" : "Add" }} user
        </h1>
      </div>
      <UserData :user="user" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserData from "@/components/create/UserData.vue";
import DoubleArrowLeftIcon from "@/components/icons/DoubleArrowLeftIcon.vue";
import { useTypedStore } from "@/store";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useTypedStore();
const route = useRoute();
const router = useRouter();

const user = computed(() =>
  Object.values(store.state.users.users).find(
    (user) => user.id === +(route.query.userId ?? "0")
  )
);

const goBack = () => {
  router.back();
};
</script>
