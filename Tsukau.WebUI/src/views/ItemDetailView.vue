<script setup lang="ts">
import { ref } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

const itemData = ref<string>('')

onBeforeRouteUpdate(async (to, from) => {
  itemData.value = to.params.id as string
})
</script>

<template>
  <h1 class="text-2xl font-medium">
    Item detail (ID: {{ itemData }})
  </h1>
</template>
