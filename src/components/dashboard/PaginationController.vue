<template>
  <div
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
      v-for="(page, i) in Array(props.pages)"
      :key="i"
      :class="`${
        i + 1 == props.activePage
          ? 'bg-accent-200 text-white'
          : 'bg-white text-accent-200 hover:text-accent-100'
      } h-full aspect-square flex items-center justify-center text-sm `"
      @click="() => props.onClickPage(i + 1)"
    >
      {{ i + 1 }}
    </button>
    <button
      class="bg-white h-full aspect-square flex items-center justify-center disabled:text-brandGrey-100 text-accent-200 hover:text-accent-100"
      @click="onClickNextPage"
      :disabled="activePage === props.pages"
    >
      <DoubleArrowRightIcon size="12" />
    </button>
  </div>
</template>

<script setup lang="ts">
import DoubleArrowLeftIcon from "../icons/DoubleArrowLeftIcon.vue";
import DoubleArrowRightIcon from "../icons/DoubleArrowRightIcon.vue";
import { defineProps } from "vue";

interface IPaginationController {
  pages: number;
  activePage: number;
  onClickPage: (pageIndex: number) => void;
}

const props = defineProps<IPaginationController>();

const onClickNextPage = () => {
  if (props.activePage < props.pages) props.onClickPage(props.activePage + 1);
};

const onClickPreviousPage = () => {
  if (props.activePage > 1) props.onClickPage(props.activePage - 1);
};
</script>
