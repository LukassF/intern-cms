<template>
  <div class="w-full flex-1">
    <table class="w-full">
      <TableHead v-if="usersForPage?.length > 0" />
      <div v-if="isLoading">
        <LoaderTableRow v-for="(_, idx) in Array(USERS_PER_PAGE)" :key="idx" />
      </div>
      <div v-else-if="usersForPage?.length > 0">
        <TableRow
          v-for="(user, i) in usersForPage"
          :key="i"
          :index="i"
          :firstName="user.firstName"
          :lastName="user.lastName"
          :image="user.avatar"
          v-on:clickEdit="() => navigateModifyUser(user.id)"
          v-on:clickRemove="() => setOverlayDelete(true, DeleteModal, user.id)"
        />
      </div>
      <div v-else class="p-5 sm:p-10 flex flex-col justify-center items-center">
        <img src="@/assets/svg/no-data.svg" class="w-[120px] sm:w-[180px]" />
        <h1
          class="text-lg sm:text-xl text-brandGrey-300 font-semibold mt-[20px]"
        >
          No data found :(
        </h1>
        <h3 class="text-sm sm:text-md text-brandGrey-100">
          Check your internet connection
        </h3>
      </div>
    </table>
  </div>
</template>

<script setup lang="ts">
import TableHead from "./TableHead.vue";
import TableRow from "./TableRow.vue";
import { useRouter } from "vue-router";
import { Component, computed, ref } from "vue";
import DeleteModal from "../modals/DeleteModal.vue";
import { getUsersForPage } from "@/utils/utils";
import { useTypedStore } from "@/store";
import LoaderTableRow from "./LoaderTableRow.vue";
import { USERS_PER_PAGE } from "@/utils/constants";
import ImageHandler from "../shared/ImageHandler.vue";

const store = useTypedStore();
const router = useRouter();

const activePage = computed(() => store.state.dashboard.activePage);
const filteredUsers = computed(() => store.getters["users/getFilteredUsers"]);
const usersForPage = computed(() =>
  getUsersForPage(filteredUsers.value, activePage.value)
);

const isLoading = computed(() => store.state.dashboard.tableLoading);

const navigateModifyUser = (userId: number) => {
  router.push({
    name: "create",
    query: {
      userId,
    },
  });
};

const setOverlayDelete = (
  isOpen: boolean,
  modal: Component,
  userId: number
) => {
  const props = { userId };
  store.commit("app/SET_SHOW_OVERLAY", isOpen);
  store.commit("app/SET_OVERLAY_DATA", { child: modal, childProps: props });
};
</script>
