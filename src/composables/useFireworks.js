import * as THREE from 'three'
import { onMounted, onUnmounted } from 'vue'

const COLORS = [0xffd166, 0x5dade2, 0xff6b6b, 0xb57bf2, 0xffffff, 0x6bffb8]

export function useFireworks(canvasRef) {
  let renderer, scene, camera, animId
  let bursts = []
  let spawnTimer = 0

  function spawnBurst() {
    const count = 120
    const positions = new Float32Array(count * 3)
    const velocities = []
    const color = new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)])
    const origin = new THREE.Vector3((Math.random() - 0.5) * 18, Math.random() * 4 + 4, -6 + Math.random() * -6)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = origin.x
      positions[i * 3 + 1] = origin.y
      positions[i * 3 + 2] = origin.z

      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const speed = Math.random() * 0.12 + 0.05
      velocities.push(
        new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * speed,
          Math.sin(phi) * Math.sin(theta) * speed,
          Math.cos(phi) * speed
        )
      )
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({ color, size: 0.16, transparent: true, opacity: 1 })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    bursts.push({ points, velocities, life: 0, maxLife: 90 })
  }

  function updateBursts() {
    bursts = bursts.filter((burst) => {
      burst.life += 1
      const pos = burst.points.geometry.attributes.position
      for (let i = 0; i < burst.velocities.length; i++) {
        const v = burst.velocities[i]
        v.y -= 0.0015
        pos.setX(i, pos.getX(i) + v.x)
        pos.setY(i, pos.getY(i) + v.y)
        pos.setZ(i, pos.getZ(i) + v.z)
      }
      pos.needsUpdate = true
      burst.points.material.opacity = Math.max(0, 1 - burst.life / burst.maxLife)

      if (burst.life >= burst.maxLife) {
        scene.remove(burst.points)
        burst.points.geometry.dispose()
        burst.points.material.dispose()
        return false
      }
      return true
    })
  }

  function onResize() {
    if (!renderer || !canvasRef.value) return
    const { clientWidth, clientHeight } = canvasRef.value
    camera.aspect = clientWidth / clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(clientWidth, clientHeight)
  }

  function animate() {
    spawnTimer -= 1
    if (spawnTimer <= 0) {
      spawnBurst()
      spawnTimer = Math.random() * 40 + 35
    }
    updateBursts()
    renderer.render(scene, camera)
    animId = requestAnimationFrame(animate)
  }

  onMounted(() => {
    const canvas = canvasRef.value
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.set(0, 4, 16)
    camera.lookAt(0, 4, 0)

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    window.addEventListener('resize', onResize)
    animate()
  })

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', onResize)
    renderer?.dispose()
  })
}
