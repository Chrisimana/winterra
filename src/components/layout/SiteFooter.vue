<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="relative z-10 mt-24 border-t border-white/10 bg-black/20 px-6 py-10">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
      <p class="font-[Poppins] text-lg font-bold text-white">WinterRa</p>
      <p class="max-w-md text-sm text-white/60">
        Temukan Inspirasi Liburan Akhir Tahun dalam Pengalaman 3D Interaktif.
      </p>
      <RouterLink to="/credits" class="text-sm text-primary hover:text-accent">
        Credits &amp; Teknologi
      </RouterLink>
      <p class="text-xs text-white/40">&copy; {{ new Date().getFullYear() }} WinterRa. Dibuat dengan Vue.js &amp; Three.js.</p>
    </div>
  </footer>
</template>
