<script setup>
import { computed, ref } from 'vue'

const budgetLimit = ref(5000000)
const components = ref([
  { key: 'transportasi', label: 'Transportasi', icon: '🚌', value: 800000 },
  { key: 'hotel', label: 'Hotel', icon: '🏨', value: 1200000 },
  { key: 'makan', label: 'Makan', icon: '🍽️', value: 600000 },
  { key: 'tiket', label: 'Tiket Wisata', icon: '🎫', value: 300000 },
  { key: 'olehOleh', label: 'Oleh-oleh', icon: '🎁', value: 400000 },
])

const total = computed(() => components.value.reduce((sum, c) => sum + (Number(c.value) || 0), 0))
const sisa = computed(() => budgetLimit.value - total.value)
const progress = computed(() => {
  if (budgetLimit.value <= 0) return 0
  return Math.min(100, Math.round((total.value / budgetLimit.value) * 100))
})

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
}
</script>

<template>
  <section class="px-6 pt-36 pb-24">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-sm tracking-widest text-primary uppercase">Budget Planner</p>
      <h1 class="mt-3 text-4xl font-bold sm:text-5xl">Hitung Estimasi Biaya</h1>
      <p class="mx-auto mt-4 max-w-xl text-white/65">
        Masukkan estimasi budget total dan rincian komponen biaya liburanmu.
      </p>
    </div>

    <div class="glass mx-auto mt-12 max-w-3xl rounded-3xl p-8">
      <label class="flex flex-col gap-2 text-sm text-white/70">
        Total Budget (Rp)
        <input
          v-model.number="budgetLimit"
          type="number"
          min="0"
          step="100000"
          class="rounded-xl bg-white/10 px-4 py-3 text-lg font-semibold text-white outline-none focus:ring-2 focus:ring-primary"
        />
      </label>

      <div class="mt-8 space-y-4">
        <div v-for="c in components" :key="c.key" class="flex items-center gap-4">
          <span class="w-8 text-xl">{{ c.icon }}</span>
          <span class="w-32 shrink-0 text-sm text-white/70">{{ c.label }}</span>
          <input
            v-model.number="c.value"
            type="number"
            min="0"
            step="50000"
            class="flex-1 rounded-xl bg-white/10 px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div class="mt-8 border-t border-white/10 pt-6">
        <div class="flex items-center justify-between text-sm text-white/60">
          <span>Progress Budget</span>
          <span>{{ progress }}%</span>
        </div>
        <div class="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="progress > 100 ? 'bg-red-400' : 'bg-primary'"
            :style="{ width: `${Math.min(progress, 100)}%` }"
          ></div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div class="rounded-2xl bg-white/5 p-4">
            <p class="text-xs text-white/50 uppercase">Estimasi Total</p>
            <p class="mt-1 text-xl font-bold text-white">{{ formatRupiah(total) }}</p>
          </div>
          <div class="rounded-2xl bg-white/5 p-4">
            <p class="text-xs text-white/50 uppercase">Sisa Budget</p>
            <p class="mt-1 text-xl font-bold" :class="sisa < 0 ? 'text-red-400' : 'text-accent'">
              {{ formatRupiah(sisa) }}
            </p>
          </div>
        </div>

        <p v-if="sisa < 0" class="mt-4 text-sm text-red-300">
          Total biaya melebihi budget. Coba kurangi salah satu komponen di atas.
        </p>
      </div>
    </div>
  </section>
</template>
