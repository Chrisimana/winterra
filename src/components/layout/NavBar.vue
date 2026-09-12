<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from '@lucide/vue'
import logoUrl from '@/assets/logo WinterRa.png'

const open = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/budget', label: 'Budget' },
  { to: '/packing', label: 'Packing' },
  { to: '/countdown', label: 'Countdown' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <nav class="glass mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
      <RouterLink to="/" class="flex items-center gap-2">
        <img :src="logoUrl" alt="WinterRa" class="h-9 w-9 object-contain" />
        <span class="font-[Poppins] text-xl font-bold text-white">WinterRa</span>
      </RouterLink>

      <ul class="hidden items-center gap-1 lg:flex">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="rounded-full px-3.5 py-1.5 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
            active-class="bg-primary/20 text-accent hover:bg-primary/20 hover:text-accent"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="flex items-center gap-3">
        <button
          class="glass flex h-11 w-11 items-center justify-center rounded-full text-white lg:hidden"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <Menu v-if="!open" :size="20" />
          <X v-else :size="20" />
        </button>
      </div>
    </nav>

    <transition name="fade">
      <ul
        v-if="open"
        class="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 lg:hidden"
      >
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="block rounded-lg px-3 py-2 text-white/85 transition hover:bg-white/10"
            active-class="bg-primary/20 text-accent"
            @click="open = false"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </transition>
  </header>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
