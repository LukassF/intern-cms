<template>
  <div
    class="w-full flex flex-col 2xs:flex-row 2xs:justify-between items-stretch 2xs:items-center gap-5"
  >
    <div
      class="xs:w-[300px] flex-1 xs:flex-none min-h-[36px] 2xs:min-h-[30px] rounded-[5px] bg-primary px-[10px] flex flex items-stretch justify-between gap-[10px] overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search for users..."
        class="bg-transparent text-sm outline-none text-brandGrey-300 flex-1 min-w-[140px]"
        @input="(e) => setSearchValue((e.target as HTMLInputElement).value)"
        :value="searchValue"
      />
      <div class="flex items-center">
        <SearchIcon />
      </div>
    </div>

    <button
      class="bg-accent-200 text-sm text-white px-[22px] py-[8px] rounded-[20px] hover:bg-accent-100"
      @click="navigateCreateUser"
    >
      + Add user
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SearchIcon from "../icons/SearchIcon.vue";
import { useRouter } from "vue-router";
import { useTypedStore } from "@/store";
import { allUsersLoaded } from "@/utils/utils";

const router = useRouter();
const store = useTypedStore();
const searchValue = ref(store.state.dashboard.userSearch);

const navigateCreateUser = () => {
  router.push({
    name: "create",
  });
};

const setSearchValue = async (val: string) => {
  searchValue.value = val;
  // some users are not loaded
  if (!allUsersLoaded(store.state.users.array)) {
    await store.dispatch("users/getAllUsers");
  }
  store.commit("dashboard/SET_USER_SEARCH", val);
};
</script>
