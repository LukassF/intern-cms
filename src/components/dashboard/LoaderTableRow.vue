<template>
  <tr
    class="w-full grid grid-cols-[60px_1fr_70px] xs:grid-cols-[100px_1fr_110px] [&>*]:px-[10px] [&>*]:py-[4px] [&>*]:text-left rounded-[5px]"
  >
    <td class="h-[50px] xs:h-[55px] flex items-center">
      <div
        class="h-[30px] xs:h-[35px] aspect-square rounded-full overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 bg-[length:400px_100px] animate-load"
      ></div>
    </td>
    <td class="flex items-center">
      <div class="flex gap-1 xs:gap-2 items-center">
        <div
          :style="{ width: `${Math.round(Math.random() * 100) + 50}px` }"
          class="max-w-[40px] xs:max-w-[50px] sm:max-w-[100%] h-[18px] bg-gradient-to-r from-slate-100 to-slate-200 bg-[length:400px_100px] animate-load rounded-[10px] delay-700"
        ></div>
        <div
          :style="{ width: `${Math.round(Math.random() * 100) + 50}px` }"
          class="max-w-[50px] xs:max-w-[60px] sm:max-w-[100%] h-[18px] bg-gradient-to-r from-slate-100 to-slate-200 bg-[length:400px_100px] animate-load rounded-[10px]"
        ></div>
      </div>
    </td>
    <td class="flex items-center">
      <div
        class="h-[20px] xs:h-[25px] w-[40px] xs:w-[50px] rounded-[10px] bg-gradient-to-r from-slate-100 to-slate-200 bg-[length:400px_100px] animate-load animation"
      ></div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@/utils/utils";

const { matches: isXs } = useMediaQuery("(max-width: 525px)");
</script>
