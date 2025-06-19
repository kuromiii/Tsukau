<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'

import { storeToRefs } from 'pinia'

const alertStore = useAlertStore()

const { alerts } = storeToRefs(alertStore)
</script>

<template>
  <v-snackbar-queue v-model="alerts" closable="true" timeout="3000" />
</template>