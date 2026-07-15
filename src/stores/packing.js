import { defineStore } from 'pinia'

const STORAGE_KEY = 'winterra_packing_checked'

function loadChecked() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export const usePackingStore = defineStore('packing', {
  state: () => ({
    checked: loadChecked(),
  }),
  actions: {
    toggleItem(itemKey) {
      this.checked[itemKey] = !this.checked[itemKey]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.checked))
    },
    isChecked(itemKey) {
      return !!this.checked[itemKey]
    },
    resetAll() {
      this.checked = {}
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
