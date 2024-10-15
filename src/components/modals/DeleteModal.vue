<template>
  <div class="flex flex-col justify-between items-stretch h-full gap-[50px]">
    <div>
      <h1 class="text-3xl text-brandGrey-300">Delete user?</h1>
      <p class="text-md text-brandGrey-100">This action is irreversible</p>
    </div>
    <div class="flex flex-col gap-2">
      <button
        @click="onClickConfirm"
        class="w-full md:w-auto bg-accent-200 hover:bg-accent-100 disabled:opacity-70 disabled:hover:bg-accent-200 text-white text-sm px-[16px] py-[8px] rounded-[5px]"
      >
        Yes, I'm sure
      </button>
      <button
        @click="onClickBack"
        class="w-full md:w-auto hover:bg-gray-100 disabled:opacity-70 disabled:hover:bg-accent-200 text-brandGrey-300 text-sm px-[16px] py-[8px] rounded-[5px]"
      >
        No, go back
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTypedStore } from "@/store";
import { defineProps } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IDeleteModal {
  userId: number;
}

const props = defineProps<IDeleteModal>();
const store = useTypedStore();

const onClickConfirm = async () => {
  await store.dispatch("users/deleteUser", {
    userId: props.userId,
  });
  toast.info("User deleted!");
  store.commit("app/SET_SHOW_OVERLAY", false);
};

const onClickBack = () => {
  store.commit("app/SET_SHOW_OVERLAY", false);
};
</script>
