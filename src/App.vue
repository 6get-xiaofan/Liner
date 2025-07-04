<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from './components/ui/sonner'
import AppTopbar from '@/components/AppTopbar.vue'
</script>

<template>
  <main class="container h-screen w-screen">
    <AppTopbar class="h-8" />
    <RouterView class="h-full" />
    <Toaster />
  </main>
</template>
