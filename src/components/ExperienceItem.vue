<script setup lang="ts">
import { type IExperience } from '@/interfaces/main'

const props = defineProps<IExperience>()
</script>

<template>
  <div class="">
    <div class="relative h-full pl-8 pb-4 sm:pl-20 group">
      <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) -->
      <div
        class="flex flex-col sm:flex-row items-start group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[3.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-white after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[3.5rem] after:-translate-x-1/2 after:translate-y-1.5"
      ></div>
      <div class="fade-in rounded-lg">
        <p class="text-2xl">{{ props.company }}</p>
        <img v-if="props.image" :src="props.image" class="my-2 h-16" />
        <p class="text-lg">{{ props.dates }}</p>
        <p class="mt-2">{{ props.description }}</p>
      </div>
    </div>

    <div class="relative pl-8 sm:pl-32 group"></div>
  </div>
</template>
