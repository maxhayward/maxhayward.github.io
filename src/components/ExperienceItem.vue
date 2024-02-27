<script setup lang="ts">
import { type IExperience } from '@/interfaces/main'

const props = defineProps<IExperience>()
</script>

<template>
  <div class="mb-4 fade-in bg-gray-900 rounded-lg p-2">
    <h3 class="text-2xl mb-2">{{ props.role }}</h3>
    <p class="text-xl">{{ props.company }}</p>
    <img v-if="props.image" :src="props.image" class="my-2 h-16" />
    <p class="text-lg">{{ props.dates }}</p>
    <p class="mt-2">{{ props.description }}</p>
  </div>
</template>
