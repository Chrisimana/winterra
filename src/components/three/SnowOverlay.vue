<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let ctx, animId, flakes, width, height

function resize() {
  width = window.innerWidth
  height = window.innerHeight
  canvasRef.value.width = width
  canvasRef.value.height = height
}

function initFlakes() {
  const count = Math.round((width * height) / 18000)
  flakes = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.2 + 0.6,
    speed: Math.random() * 0.6 + 0.2,
    drift: Math.random() * 0.6 - 0.3,
  }))
}

function tick() {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  for (const f of flakes) {
    ctx.beginPath()
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
    ctx.fill()
    f.y += f.speed
    f.x += f.drift
    if (f.y > height) {
      f.y = -5
      f.x = Math.random() * width
    }
  }
  animId = requestAnimationFrame(tick)
}

onMounted(() => {
  ctx = canvasRef.value.getContext('2d')
  resize()
  initFlakes()
  tick()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-70"></canvas>
</template>
