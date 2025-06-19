<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/footer/Footer.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
  <Footer />
</template>
