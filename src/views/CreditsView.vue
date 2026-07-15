<script setup>
const tech = [
  { name: 'Vue.js 3', desc: 'Framework JavaScript progresif untuk membangun antarmuka pengguna.' },
  { name: 'Vite', desc: 'Build tool generasi baru yang cepat untuk pengembangan modern.' },
  { name: 'Three.js', desc: 'Library WebGL untuk membangun dunia 3D interaktif di browser.' },
  { name: 'GSAP', desc: 'Library animasi profesional untuk transisi dan efek visual halus.' },
  { name: 'Tailwind CSS', desc: 'Utility-first CSS framework untuk desain yang cepat dan konsisten.' },
  { name: 'Pinia', desc: 'State management resmi untuk Vue.js.' },
  { name: 'Vue Router', desc: 'Routing resmi untuk aplikasi Single Page Vue.js.' },
  { name: 'Lenis', desc: 'Library smooth scroll untuk pengalaman menjelajah yang mulus.' },
]
</script>

<template>
  <section class="px-6 pt-36 pb-24">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-sm tracking-widest text-primary uppercase">Credits</p>
      <h1 class="mt-3 text-4xl font-bold sm:text-5xl">Di Balik WinterRa</h1>
      <p class="mx-auto mt-4 max-w-xl text-white/65">
        WinterRa dibangun sebagai eksplorasi pengalaman liburan digital berbasis web modern.
      </p>
    </div>

    <div class="mx-auto mt-14 max-w-4xl">
      <h2 class="mb-6 text-xl font-bold text-white">Teknologi &amp; Library</h2>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div v-for="t in tech" :key="t.name" class="glass rounded-2xl p-5">
          <p class="font-semibold text-accent">{{ t.name }}</p>
          <p class="mt-1 text-sm text-white/60">{{ t.desc }}</p>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-14 max-w-4xl">
      <h2 class="mb-6 text-xl font-bold text-white">Developer</h2>
      <div class="glass rounded-2xl p-6">
        <p class="text-white/70">
          WinterRa dikembangkan sebagai proyek frontend interaktif yang menggabungkan inspirasi
          liburan akhir tahun dengan visual 3D, tanpa backend maupun API — seluruh data berasal
          dari file JSON lokal.
        </p>
      </div>
    </div>

    <div class="mx-auto mt-14 max-w-4xl">
      <h2 class="mb-6 text-xl font-bold text-white">Referensi</h2>
      <ul class="glass list-inside list-disc rounded-2xl p-6 text-white/60 space-y-2">
        <li>Dokumentasi resmi Vue.js, Three.js, GSAP, dan Tailwind CSS.</li>
        <li>Inspirasi visual dari tema musim dingin dan dekorasi akhir tahun.</li>
      </ul>
    </div>
  </section>
</template>
