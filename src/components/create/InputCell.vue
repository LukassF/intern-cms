<template>
  <div class="flex flex-col items-stretch gap-2 text-sm text-brandGrey-300">
    <label class="text-left font-semibold" :for="props.cellName">{{
      props.cellName
    }}</label>
    <input
      type="text"
      :value="props.value"
      @input="(e) => props.setValue((e.target as HTMLInputElement).value)"
      :id="props.cellName"
      :class="`outline-none border-solid border-[1.5px] ${
        props.error ? 'border-red-500 text-red-500' : 'border-brandGrey-100'
      } rounded-[5px] py-[5px] px-[10px]`"
    />
    <span class="text-red-500 text-left text-xs" v-if="props.error">{{
      props.error
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface IInputCell {
  cellName: string;
  value: string;
  setValue: (val: string) => void;
  error?: string;
}

const props = defineProps<IInputCell>();
</script>
