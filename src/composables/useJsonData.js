import { ref, onMounted } from 'vue'

export function useJsonData(fileName) {
  const data = ref([])
  const loading = ref(true)
  const error = ref(null)

  onMounted(async () => {
    try {
      const res = await fetch(`/data/${fileName}`)
      if (!res.ok) throw new Error(`Failed to load ${fileName}`)
      data.value = await res.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
