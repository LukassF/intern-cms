<template>
  <tr
    :class="`w-full grid grid-cols-[60px_1fr_70px] xs:grid-cols-[100px_1fr_110px] [&>*]:px-[10px] [&>*]:py-[4px] [&>*]:text-left rounded-[5px] ${
      props.index % 2 == 0 ? 'bg-primary' : ''
    }`"
  >
    <td class="h-[50px] xs:h-[55px] flex items-center">
      <div
        class="h-[30px] xs:h-[35px] aspect-square rounded-full bg-blue-400 overflow-hidden"
      >
        <img
          :src="props.image ?? PLACEHOLDER_PROFILE_IMAGE"
          class="w-full h-full object-cover"
        />
      </div>
    </td>
    <td class="flex items-center">
      <div
        class="text-xs xs:text-sm whitespace-nowrap overflow-hidden truncate max-w-[calc(100vw-220px)] sm:max-w-[calc(100vw-400px)]"
      >
        {{ props.firstName }}
        {{ props.lastName }}
      </div>
    </td>
    <td class="flex justify-start items-center h-full">
      <button
        class="h-full px-[5px] group flex items-center"
        :onclick="props.onClickEdit"
      >
        <EditIcon
          customClass="text-brandGrey-100 group-hover:text-accent-200 w-[12px] xs:w-[18px]"
          size="18"
        />
      </button>
      <button
        class="h-full px-[5px] group flex items-center"
        :onclick="props.onClickRemove"
      >
        <TrashIcon
          customClass="text-brandGrey-100 group-hover:text-red-500 w-[10px] xs:w-[20px]"
        />
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { PLACEHOLDER_PROFILE_IMAGE } from "@/utils/constants";
import EditIcon from "../icons/EditIcon.vue";
import TrashIcon from "../icons/TrashIcon.vue";
import { defineProps } from "vue";

interface ITableRow {
  index: number;
  image?: string;
  firstName: string;
  lastName: string;
  onClickEdit: (userId: number) => void;
  onClickRemove: () => void;
}

const props = defineProps<ITableRow>();
</script>
