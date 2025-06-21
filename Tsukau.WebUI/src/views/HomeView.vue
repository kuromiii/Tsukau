<script setup lang="ts">
import { faBeer, faSearch } from '@fortawesome/free-solid-svg-icons'

import TextField from '@/components/field/TextField.vue'
</script>

<template>
  <TextField class="mx-2 my-2" />
  <TextField :icon="faSearch" class="mx-2 my-2" type="text" placeholder="test" />
  <TextField :icon="faBeer" class="mx-2 my-2" type="password" placeholder="test2" />
</template>
