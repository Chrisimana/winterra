<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { PartyPopper } from '@lucide/vue'
import { useFireworks } from '@/composables/useFireworks'

const canvasRef = ref(null)
useFireworks(canvasRef)

function nextNewYear() {
  const now = new Date()
  return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0)
}

const target = nextNewYear()
const now = ref(new Date())
let intervalId

const diff = computed(() => Math.max(0, target.getTime() - now.value.getTime()))

const days = computed(() => Math.floor(diff.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((diff.value / (1000 * 60 * 60)) % 24))
const minutes = computed(() => Math.floor((diff.value / (1000 * 60)) % 60))
const seconds = computed(() => Math.floor((diff.value / 1000) % 60))

const isNewYear = computed(() => diff.value === 0)

function pad(n) {
  return String(n).padStart(2, '0')
}

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => clearInterval(intervalId))
</script>

<template>
  <section class="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 pt-24">
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full"></canvas>

    <div class="relative z-10 flex flex-col items-center text-center">
      <p class="glass mb-6 rounded-full px-4 py-1.5 text-xs tracking-widest text-white/80 uppercase">
        Countdown Tahun Baru
      </p>
      <h1 class="text-gradient text-4xl font-bold sm:text-5xl">
        {{ isNewYear ? 'Selamat Tahun Baru!' : `Menuju ${target.getFullYear()}` }}
      </h1>

      <div v-if="!isNewYear" class="mt-10 grid grid-cols-4 gap-3 sm:gap-6">
        <div v-for="unit in [{ v: days, l: 'Hari' }, { v: hours, l: 'Jam' }, { v: minutes, l: 'Menit' }, { v: seconds, l: 'Detik' }]" :key="unit.l" class="glass flex flex-col items-center rounded-2xl px-4 py-5 sm:px-7 sm:py-7">
          <span class="text-3xl font-bold text-white sm:text-5xl">{{ pad(unit.v) }}</span>
          <span class="mt-2 text-xs text-white/60 uppercase">{{ unit.l }}</span>
        </div>
      </div>

      <p v-else class="mt-6 flex items-center gap-3 text-2xl text-accent">
        <PartyPopper :size="28" /> Selamat datang tahun {{ target.getFullYear() }}! <PartyPopper :size="28" />
      </p>

      <p class="mt-10 max-w-md text-sm text-white/50">
        Rayakan pergantian tahun bersama kembang api virtual WinterRa sambil merencanakan liburan berikutnya.
      </p>
    </div>
  </section>
</template>
