<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import gsap from 'gsap'
import { useJsonData } from '@/composables/useJsonData'

const { data: quotes, loading: loadingQuotes } = useJsonData('quotes.json')

const featuredQuote = computed(() => {
  if (!quotes.value.length) return null
  return quotes.value[new Date().getDate() % quotes.value.length]
})

onMounted(() => {
  gsap.from('.hero-reveal', {
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
    delay: 0.1,
  })
})

const features = [
  { icon: '💰', title: 'Budget Calculator', desc: 'Hitung estimasi biaya transportasi, hotel, makan, hingga oleh-oleh.', to: '/budget' },
  { icon: '🎒', title: 'Packing Checklist', desc: 'Checklist perlengkapan yang tersimpan otomatis di perangkatmu.', to: '/packing' },
  { icon: '🎆', title: 'Countdown', desc: 'Hitung mundur pergantian tahun baru bersama kembang api virtual.', to: '/countdown' },
]

const highlights = [
  { icon: '⚡', title: 'Tanpa Backend', desc: 'Semua fitur berjalan 100% di browser, tanpa server maupun API.' },
  { icon: '❄️', title: 'Desain Winter Modern', desc: 'Tampilan musim dingin dengan animasi halus di setiap halaman.' },
  { icon: '💾', title: 'Tersimpan di Perangkatmu', desc: 'Progress checklist tersimpan otomatis lewat local storage.' },
]
</script>

<template>
<div>
  <section class="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden px-6 pt-24">
    <div class="pointer-events-none absolute top-1/4 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]"></div>
    <div class="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-accent/10 blur-[90px]"></div>

    <div class="relative z-10 flex flex-col items-center text-center">
      <p class="hero-reveal glass mb-6 rounded-full px-4 py-1.5 text-xs tracking-widest text-white/80 uppercase">
        Interactive Holiday Experience
      </p>
      <h1 class="hero-reveal text-gradient text-5xl font-bold sm:text-6xl md:text-7xl">
        WinterRa
      </h1>
      <p class="hero-reveal mt-5 max-w-xl text-base text-white/75 sm:text-lg">
        Temukan Inspirasi Liburan Akhir Tahun dalam Pengalaman 3D Interaktif.
      </p>

      <div class="hero-reveal mt-8 flex flex-wrap items-center justify-center gap-4">
        <RouterLink
          to="/countdown"
          class="rounded-full bg-primary px-7 py-3 font-semibold text-dark shadow-lg shadow-primary/30 transition hover:scale-105"
        >
          Countdown
        </RouterLink>
        <RouterLink
          to="/about"
          class="glass rounded-full px-7 py-3 font-semibold text-white transition hover:scale-105"
        >
          About
        </RouterLink>
      </div>

      <blockquote v-if="!loadingQuotes && featuredQuote" class="hero-reveal mt-14 max-w-lg text-sm text-white/50 italic">
        &ldquo;{{ featuredQuote.text }}&rdquo;
      </blockquote>
    </div>
  </section>

  <section class="relative z-10 px-6 py-20">
    <div class="mx-auto max-w-6xl text-center">
      <p class="text-sm tracking-widest text-primary uppercase">Fitur Utama</p>
      <h2 class="mt-2 text-3xl font-bold text-white sm:text-4xl">Semua yang Kamu Butuhkan</h2>
      <p class="mx-auto mt-3 max-w-xl text-white/60">
        Dari menghitung anggaran hingga menyiapkan koper, semua ada dalam satu tempat.
      </p>

      <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <RouterLink
          v-for="f in features"
          :key="f.title"
          :to="f.to"
          class="glass group rounded-2xl p-6 text-left transition hover:-translate-y-1.5 hover:bg-white/10"
        >
          <div class="mb-3 text-3xl transition group-hover:scale-110">{{ f.icon }}</div>
          <h3 class="font-bold text-white">{{ f.title }}</h3>
          <p class="mt-2 text-sm text-white/60">{{ f.desc }}</p>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="relative z-10 px-6 py-20">
    <div class="mx-auto max-w-6xl text-center">
      <p class="text-sm tracking-widest text-primary uppercase">Kenapa WinterRa</p>
      <h2 class="mt-2 text-3xl font-bold text-white sm:text-4xl">Dibuat Ringan &amp; Modern</h2>

      <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div v-for="h in highlights" :key="h.title" class="glass rounded-2xl p-6 text-left">
          <div class="mb-3 text-3xl">{{ h.icon }}</div>
          <h3 class="font-bold text-white">{{ h.title }}</h3>
          <p class="mt-2 text-sm text-white/60">{{ h.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="relative z-10 px-6 py-20">
    <div class="glass mx-auto max-w-4xl rounded-3xl px-8 py-14 text-center">
      <h2 class="text-3xl font-bold text-white sm:text-4xl">Sudah Siap Menyiapkan Koper?</h2>
      <p class="mx-auto mt-3 max-w-xl text-white/60">
        Pakai Packing Checklist kami supaya tidak ada perlengkapan liburan yang tertinggal.
      </p>
      <RouterLink
        to="/packing"
        class="mt-8 inline-block rounded-full bg-accent px-8 py-3 font-semibold text-dark transition hover:scale-105"
      >
        Buka Packing Checklist
      </RouterLink>
    </div>
  </section>
</div>
</template>
