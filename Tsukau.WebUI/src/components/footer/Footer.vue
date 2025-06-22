<script setup lang="ts">
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <footer class="bg-indigo-500 py-6">
    <div class="text-center mb-4">
      <a class="text-gray-200 hover:text-white" href="https://github.com/kuromiii/Tsukau">
        <FontAwesomeIcon class="w-8 h-8" :icon="faGithub" size="xl" />
      </a>

      <a class="text-gray-200 hover:text-white" href="https://x.com/_CLAWZ_">
        <FontAwesomeIcon class="w-8 h-8" :icon="faXTwitter" size="xl" />
      </a>
    </div>

    <!-- Bottom Section -->
    <div class="text-sm text-center text-gray-200">
      <p>&copy; 2025 Tsukau. Made by kuromiii.</p>
    </div>
  </footer>
</template>
