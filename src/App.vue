<script setup lang="ts">
import AppTopbar from '@/components/AppTopbar.vue'
import { RouterView } from 'vue-router'
import { Toaster } from './components/ui/sonner'
</script>

<template>
  <AppTopbar class="fixed top-0 right-0 z-50" />
  <main class="container h-screen w-screen">
    <RouterView class="h-full w-screen" />
    <Toaster />
  </main>
</template>
