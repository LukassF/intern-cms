<template>
  <div class="w-full flex justify-between items-center">
    <div
      class="w-[300px] h-[30px] rounded-[5px] bg-primary px-[10px] flex flex items-stretch justify-between gap-[10px] overflow-hidden"
    >
      <input
        type="text"
        placeholder="Search for users..."
        class="bg-transparent text-sm outline-none text-brandGrey-300 flex-1"
      />
      <div class="flex items-center">
        <img src="@/assets/svg/search.svg" />
      </div>
    </div>

    <button
      class="bg-accent-200 text-sm text-white px-[22px] py-[8px] rounded-[20px] hover:bg-accent-100"
    >
      + Add user
    </button>
  </div>
</template>
