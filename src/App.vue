<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import SnowOverlay from '@/components/three/SnowOverlay.vue'
import { useLenis } from '@/composables/useLenis'

useLenis()
</script>

<template>
  <div class="bg-winter-gradient min-h-screen text-white">
    <SnowOverlay />
    <NavBar />
    <main class="relative z-10">
      <RouterView v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
