<script setup lang="ts">
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import type { InputTypeHTMLAttribute } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref } from 'vue'

interface Props {
  placeholder?: string
  type?: InputTypeHTMLAttribute
  icon?: IconDefinition
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const cssClass = computed(() => ({
  [props.icon ? 'pl-12' : 'pl-4']: true,
}))

const value = ref('')
</script>

<template>
  <div class="relative max-w-md">
    <input
      :type="props.type"
      :model="value"
      :placeholder="props.placeholder"
      :class="cssClass"
      class="w-full pr-4 py-3 rounded-sm shadow-md bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-lg transition duration-300"
    >

    <!-- Icon -->
    <div v-if="icon" class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
      <FontAwesomeIcon class="w-5 h-5" :icon="props.icon!" size="lg" />
    </div>
  </div>
</template>

<style scoped></style>
