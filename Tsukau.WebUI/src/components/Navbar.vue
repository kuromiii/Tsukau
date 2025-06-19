<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
</script>

<template>
  <v-app-bar :color="settingsStore.accentColor" :elevation="2">
    <!-- <v-app-bar-nav-icon
      v-if="accountStore.isLoggedIn"
      class="ml-4"
      @click="settingsStore.drawerOpened = !settingsStore.drawerOpened"
    /> -->

    <v-app-bar-title class="ml-4">
      Tsukau
    </v-app-bar-title>

    <v-spacer />

    <!-- <v-btn v-if="accountStore.identity?.isAdmin" icon :to="{ name: 'admin' }" class="mr-4">
      <v-icon>mdi-security</v-icon>
    </v-btn> -->

    <v-btn icon :to="{ name: 'settings' }" class="mr-4">
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <!-- <v-btn v-if="accountStore.isLoggedIn" icon class="mr-4" @click="logout()">
      <v-icon>mdi-power</v-icon>
    </v-btn>

    <v-btn
      v-if="!accountStore.isLoggedIn"
      elevation="8"
      prepend-icon="mdi-login"
      size="large"
      :to="{ name: 'login' }"
      class="mr-4"
    >
      {{ $t('common.login') }}
    </v-btn> -->
  </v-app-bar>
</template>

<style scoped>

</style>
