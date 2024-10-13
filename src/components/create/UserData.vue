<template>
  <div
    class="bg-white rounded-[6px] shadow-md px-[20px] pb-[25px] pt-[50px] flex flex-col justify-between gap-4"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputCell
        cell-name="First Name"
        :value="firstName"
        :set-value="setFirstName"
      />
      <InputCell
        cell-name="Last Name"
        :value="lastName"
        :set-value="setLastName"
      />
    </div>

    <div class="md:text-left">
      <button
        :disabled="buttonDisabled"
        class="w-full md:w-auto bg-accent-200 hover:bg-accent-100 disabled:opacity-70 disabled:hover:bg-accent-200 text-white text-sm px-[16px] py-[8px] rounded-[5px]"
      >
        Update Details
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IUser } from "@/utils/types";
import InputCell from "./InputCell.vue";
import { computed, ref, defineProps } from "vue";
interface IUserData {
  user?: IUser;
}
const props = defineProps<IUserData>();
const firstName = ref(props.user?.firstName ?? "");
const lastName = ref(props.user?.lastName ?? "");

const setFirstName = (val: string) => {
  firstName.value = val;
};
const setLastName = (val: string) => {
  lastName.value = val;
};

// disable button if fields are empty or when they are unchanged
const buttonDisabled = computed(
  () =>
    !lastName.value.length ||
    !firstName.value.length ||
    lastName.value === props.user?.lastName ||
    firstName.value === props.user?.firstName
);
</script>
