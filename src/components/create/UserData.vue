<template>
  <div
    class="grid grid-cols-1 grid-rows-2 xs:grid-cols-2 md:grid-cols-[2fr_1fr] gap-4"
  >
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
          @click="confirmChange"
          :disabled="buttonDisabled"
          class="w-full md:w-auto bg-accent-200 hover:bg-accent-100 disabled:opacity-70 disabled:hover:bg-accent-200 text-white text-sm px-[16px] py-[8px] rounded-[5px]"
        >
          {{ isLoading ? "Loading..." : "Update Data" }}
        </button>
      </div>
    </div>
    <UserImage :image="image" v-on:set-image="setImage" />
  </div>
</template>

<script setup lang="ts">
import { IUser } from "@/utils/types";
import InputCell from "./InputCell.vue";
import { computed, ref, defineProps } from "vue";
import UserImage from "./UserImage.vue";
import { useRouter } from "vue-router";
import { useTypedStore } from "@/store";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IUserData {
  user?: IUser;
}

const store = useTypedStore();
const router = useRouter();
const props = defineProps<IUserData>();
const firstName = ref(props.user?.firstName ?? "");
const lastName = ref(props.user?.lastName ?? "");
const image = ref(props.user?.avatar);

const isLoading = ref(false);

const setFirstName = (val: string) => {
  firstName.value = val;
};
const setLastName = (val: string) => {
  lastName.value = val;
};
const setImage = (val?: string) => {
  image.value = val;
};

// disable button if fields are empty or when they are unchanged
const buttonDisabled = computed(
  () =>
    !lastName.value.length ||
    !firstName.value.length ||
    (lastName.value === props.user?.lastName &&
      firstName.value === props.user?.firstName &&
      image.value === props.user?.avatar)
);

const modifyUser = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("users/modifyUser", {
      ...props.user,
      firstName: firstName.value,
      lastName: lastName.value,
      avatar: image.value,
    });

    await router.push("/");
    toast.success("User modified!");
  } finally {
    isLoading.value = false;
  }
};

const createUser = async () => {
  try {
    isLoading.value = true;
    await store.dispatch("users/createUser", {
      firstName: firstName.value,
      lastName: lastName.value,
      avatar: image.value,
    });

    await router.push("/");
    toast.success("User created!");
  } finally {
    isLoading.value = false;
  }
};

const confirmChange = () => {
  if (props.user) {
    modifyUser();
  } else {
    createUser();
  }
};
</script>
