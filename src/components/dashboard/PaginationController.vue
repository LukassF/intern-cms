<template>
  <div
    v-if="totalUsers > 0"
    class="h-[30px] bg-blue-400 self-start border-solid border-[1px] border-brandGrey-100 rounded-[4px] overflow-hidden flex justify-start items-stretch divide-x-[1px] divide-brandGrey-100"
  >
    <button
      class="bg-white h-full aspect-square flex items-center justify-center disabled:text-brandGrey-100 text-accent-200 hover:text-accent-100"
      @click="onClickPreviousPage"
      :disabled="activePage === 1"
    >
      <DoubleArrowLeftIcon size="12" />
    </button>
    <button
      v-for="(_, i) in Array(pages)"
      :key="i"
      :class="`${
        i + 1 === activePage
          ? 'bg-accent-200 text-white'
          : 'bg-white text-accent-200 hover:text-accent-100'
      } h-full aspect-square flex items-center justify-center text-sm `"
      @click="() => updateActivePage(i + 1)"
    >
      {{ i + 1 }}
    </button>
    <button
      class="bg-white h-full aspect-square flex items-center justify-center disabled:text-brandGrey-100 text-accent-200 hover:text-accent-100"
      @click="onClickNextPage"
      :disabled="activePage === pages"
    >
      <DoubleArrowRightIcon size="12" />
    </button>
  </div>
</template>

<script setup lang="ts">
import DoubleArrowLeftIcon from "../icons/DoubleArrowLeftIcon.vue";
import DoubleArrowRightIcon from "../icons/DoubleArrowRightIcon.vue";
import { computed } from "@vue/reactivity";
import {
  allUsersLoaded,
  getNumberOfPages,
  getUsersForPage,
} from "@/utils/utils";
import { watchEffect } from "vue";
import { useTypedStore } from "@/store";
import { USERS_PER_PAGE } from "@/utils/constants";

const store = useTypedStore();
const activePage = computed(() => store.state.dashboard.activePage);
const usersArray = computed(() =>
  getUsersForPage(store.state.users.array, activePage.value)
);
const totalUsers = computed(() => {
  if (allUsersLoaded(store.state.users.array)) {
    return store.getters["users/getFilteredArray"].length;
  }
  return store.getters["users/getTotalUsers"];
});

const pages = computed(() => getNumberOfPages(totalUsers.value));

const updateActivePage = (page: number) => {
  store.commit("dashboard/SET_ACTIVE_PAGE", page);
  // fetch users for requested page if they are not loaded yet
  if (usersArray.value.some((val) => !val)) {
    store.dispatch("users/getUsers", { pageIdx: page });
  }
};

watchEffect(() => {
  if (pages.value && pages.value < activePage.value) {
    updateActivePage(1);
  }
});

const onClickNextPage = () => {
  if (activePage.value < pages.value) updateActivePage(activePage.value + 1);
};

const onClickPreviousPage = () => {
  if (activePage.value > 1) updateActivePage(activePage.value - 1);
};
</script>
