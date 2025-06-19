<script setup lang="ts">
import { ref } from 'vue'

import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const icons = ref(['mdi-twitter', 'mdi-github'])
</script>

<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" :color="`${settingsStore.accentColor}-lighten-1`">
    <div class="d-flex ga-3">
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        density="comfortable"
        variant="text"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <div>{{ new Date().getFullYear() }} — <strong>Tsukau</strong> — Made by kuromiii</div>
  </v-footer>
</template>
