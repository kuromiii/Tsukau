<script setup lang="ts">
import TextField from '@/components/field/TextField.vue'

import { faSearch, faBeer } from '@fortawesome/free-solid-svg-icons'
</script>

<template>
  <TextField class="mx-2 my-2"></TextField>
  <TextField :icon="faSearch" class="mx-2 my-2" type="text" placeholder="test"></TextField>
  <TextField :icon="faBeer" class="mx-2 my-2" type="password" placeholder="test2"></TextField>
</template>
