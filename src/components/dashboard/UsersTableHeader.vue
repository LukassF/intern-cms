<script setup lang="ts">
import SearchIcon from "../icons/SearchIcon.vue";
</script>

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
      />
      <div class="flex items-center">
        <SearchIcon />
      </div>
    </div>

    <button
      class="bg-accent-200 text-sm text-white px-[22px] py-[8px] rounded-[20px] hover:bg-accent-100"
    >
      + Add user
    </button>
  </div>
</template>
