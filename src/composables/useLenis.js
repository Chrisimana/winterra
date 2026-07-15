import Lenis from 'lenis'
import { onMounted, onUnmounted } from 'vue'

let lenisInstance = null

export function useLenis() {
  onMounted(() => {
    if (lenisInstance) return
    lenisInstance = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })

    function raf(time) {
      lenisInstance?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    // Keep a single global Lenis instance alive across route changes.
  })

  return { lenis: () => lenisInstance }
}
