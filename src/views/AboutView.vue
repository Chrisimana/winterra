<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: 'Ide', title: 'Masalah Liburan Akhir Tahun', desc: 'Banyak orang bingung menyusun anggaran dan menyiapkan perlengkapan saat liburan akhir tahun.' },
  { year: 'Konsep', title: 'Interactive Holiday Experience', desc: 'WinterRa lahir sebagai pengalaman liburan musim dingin yang interaktif, bukan sekadar artikel wisata.' },
  { year: 'Bangun', title: 'Dibangun dengan Vue.js & Three.js', desc: 'Menggabungkan Vue 3, Three.js, GSAP, dan Lenis untuk pengalaman visual yang halus dan interaktif.' },
  { year: 'Hasil', title: 'Satu Aplikasi, Banyak Fitur', desc: 'Budget Calculator, Packing Checklist, hingga Countdown Tahun Baru dalam satu pengalaman.' },
]

const keunggulan = [
  { icon: '🎆', title: 'Efek 3D Interaktif', desc: 'Rasakan animasi kembang api 3D di halaman Countdown menyambut tahun baru.' },
  { icon: '⚡', title: 'Frontend Only', desc: 'Seluruh fitur berjalan tanpa backend maupun API, menggunakan data JSON lokal.' },
  { icon: '🧭', title: 'Perencanaan Liburan', desc: 'Budget calculator dan packing checklist dalam satu tempat.' },
  { icon: '✨', title: 'Animasi Halus', desc: 'Didukung GSAP dan Lenis untuk transisi dan scroll yang mulus.' },
]

onMounted(() => {
  gsap.utils.toArray('.timeline-item').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
    })
  })

  gsap.utils.toArray('.advantage-card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
      },
    })
  })
})
</script>

<template>
<div>
  <section class="px-6 pt-36 pb-20">
    <div class="mx-auto max-w-4xl text-center">
      <p class="text-sm tracking-widest text-primary uppercase">Tentang Kami</p>
      <h1 class="mt-3 text-4xl font-bold sm:text-5xl">Apa itu WinterRa?</h1>
      <p class="mx-auto mt-5 max-w-2xl text-white/70">
        WinterRa adalah platform bertema liburan akhir tahun dengan pengalaman visual musim dingin
        yang interaktif. Alih-alih membaca artikel yang monoton, pengguna dapat menghitung anggaran,
        menyiapkan checklist perlengkapan, dan merayakan momen pergantian tahun langsung dari browser.
      </p>
    </div>
  </section>

  <section class="px-6 py-16">
    <div class="mx-auto max-w-3xl">
      <h2 class="mb-12 text-center text-3xl font-bold">Perjalanan WinterRa</h2>
      <div class="relative border-l border-white/15 pl-8">
        <div v-for="item in timeline" :key="item.title" class="timeline-item relative mb-12 last:mb-0">
          <span class="absolute top-1 -left-[41px] h-3 w-3 rounded-full bg-accent"></span>
          <p class="text-xs font-semibold tracking-wider text-accent uppercase">{{ item.year }}</p>
          <h3 class="mt-1 text-xl font-bold text-white">{{ item.title }}</h3>
          <p class="mt-2 text-white/65">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="px-6 py-20">
    <div class="mx-auto max-w-6xl">
      <h2 class="mb-12 text-center text-3xl font-bold">Mengapa WinterRa?</h2>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="a in keunggulan" :key="a.title" class="advantage-card glass rounded-2xl p-6 text-center">
          <div class="mb-3 text-4xl">{{ a.icon }}</div>
          <h3 class="font-bold text-white">{{ a.title }}</h3>
          <p class="mt-2 text-sm text-white/60">{{ a.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
