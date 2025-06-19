<script setup lang="ts">
import { ref } from 'vue'

import { faSearch } from '@fortawesome/free-solid-svg-icons'

import TextField from '../field/TextField.vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <nav class="sticky top-0 z-50 md:bg-indigo-500 border-b shadow border-gray-200">
      <div class="max-w-7xl mx-auto px-6 bg-indigo-500">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a href="#" class="text-xl font-semibold text-white">Tsukau</a>
          </div>

          <!-- Search bar -->
          <div class="">
            <TextField
              :icon="faSearch"
              class="mx-2 my-2"
              type="text"
              placeholder="Search for something"
            />
          </div>

          <!-- Desktop Links -->
          <div class="hidden md:flex space-x-8 items-center">
            <a href="#" class="text-gray-200 hover:text-white">Home</a>
            <a href="#" class="text-gray-200 hover:text-white">About</a>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center">
            <button
              @click="toggleMenu"
              class="text-gray-200 hover:text-white focus:outline-none"
              :aria-expanded="isMenuOpen"
              aria-controls="mobile-menu"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition>
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        role="menu"
        class="md:hidden px-4 py-4 space-y-2 bg-white border-t border-b shadow border-gray-200"
      >
        <a href="#" class="block text-gray-700 hover:text-indigo-500">Home</a>
        <a href="#" class="block text-gray-700 hover:text-indigo-500">About</a>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-90px);
}
</style>
