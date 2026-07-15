<script setup>
import { computed } from 'vue'
import { useJsonData } from '@/composables/useJsonData'
import { usePackingStore } from '@/stores/packing'

const { data: packingList, loading } = useJsonData('packing.json')
const packingStore = usePackingStore()

function itemKey(kategori, item) {
  return `${kategori}::${item}`
}

const totalItems = computed(() =>
  packingList.value.reduce((sum, cat) => sum + cat.items.length, 0)
)
const checkedCount = computed(() =>
  packingList.value.reduce(
    (sum, cat) => sum + cat.items.filter((item) => packingStore.isChecked(itemKey(cat.kategori, item))).length,
    0
  )
)
const progress = computed(() => (totalItems.value ? Math.round((checkedCount.value / totalItems.value) * 100) : 0))
</script>

<template>
  <section class="px-6 pt-36 pb-24">
    <div class="mx-auto max-w-4xl text-center">
      <p class="text-sm tracking-widest text-primary uppercase">Packing Checklist</p>
      <h1 class="mt-3 text-4xl font-bold sm:text-5xl">Jangan Sampai Ketinggalan</h1>
      <p class="mx-auto mt-4 max-w-xl text-white/65">
        Centang barang yang sudah kamu siapkan. Progress tersimpan otomatis di perangkatmu.
      </p>
    </div>

    <div v-if="loading" class="mt-16 text-center text-white/50">Memuat checklist...</div>

    <div v-else class="mx-auto mt-12 max-w-4xl">
      <div class="glass mb-8 rounded-2xl p-6">
        <div class="flex items-center justify-between text-sm text-white/60">
          <span>{{ checkedCount }} / {{ totalItems }} barang siap</span>
          <span>{{ progress }}%</span>
        </div>
        <div class="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/10">
          <div class="h-full rounded-full bg-accent transition-all duration-500" :style="{ width: `${progress}%` }"></div>
        </div>
        <button class="mt-4 text-xs text-white/40 hover:text-white/70" @click="packingStore.resetAll()">
          Reset semua centang
        </button>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div v-for="cat in packingList" :key="cat.kategori" class="glass rounded-2xl p-6">
          <h2 class="flex items-center gap-2 text-lg font-bold text-white">
            <span>{{ cat.icon }}</span> {{ cat.kategori }}
          </h2>
          <ul class="mt-4 space-y-2">
            <li v-for="item in cat.items" :key="item">
              <label class="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5">
                <input
                  type="checkbox"
                  class="h-4 w-4 accent-accent"
                  :checked="packingStore.isChecked(itemKey(cat.kategori, item))"
                  @change="packingStore.toggleItem(itemKey(cat.kategori, item))"
                />
                <span
                  class="text-sm text-white/80"
                  :class="{ 'text-white/35 line-through': packingStore.isChecked(itemKey(cat.kategori, item)) }"
                >
                  {{ item }}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
