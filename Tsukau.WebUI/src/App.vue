<script setup lang="ts">
import { RouterView } from 'vue-router'
import Footer from '@/components/footer/Footer.vue'
import Navbar from '@/components/navbar/Navbar.vue'
</script>

<template>
  <Navbar />
  <main class="mx-12 my-12 md:mx-32">
    <RouterView />
  </main>
  <Footer />
</template>
