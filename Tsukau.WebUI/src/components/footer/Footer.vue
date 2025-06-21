<script setup lang="ts">
import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <footer class="bg-indigo-500 text-gray-200 py-6">
    <div class="text-center mb-4">
      <a href="https://github.com/kuromiii/Tsukau">
        <FontAwesomeIcon class="w-8 h-8" :icon="faGithub" size="xl" />
      </a>

      <a href="https://x.com/_CLAWZ_">
        <FontAwesomeIcon class="w-8 h-8" :icon="faXTwitter" size="xl" />
      </a>
    </div>

    <!-- Bottom Section -->
    <div class="text-sm text-center">
      <p>&copy; 2025 Tsukau. Made by kuromiii.</p>
    </div>
  </footer>
</template>
