<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

import { RouterView } from 'vue-router'
import AlertManager from '@/components/AlertManager.vue'
import Footer from '@/components/Footer.vue'
import Navbar from '@/components/Navbar.vue'

const settingsStore = useSettingsStore()

</script>

<template>
  <v-app :theme="settingsStore.darkTheme ? 'dark' : 'light'">
    <Navbar />
    <v-main>
      <RouterView />
      <AlertManager />
    </v-main>
    <Footer />
  </v-app>
</template>
