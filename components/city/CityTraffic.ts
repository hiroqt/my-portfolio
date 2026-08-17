import * as THREE from 'three'

export interface TrafficController {
  roadGroup: THREE.Group
  carsGroup: THREE.Group
  update: (delta: number, elapsed: number) => void
  setSpeedMultiplier: (mult: number) => void
}

interface CarData {
  mesh: THREE.Group
  speed: number
  axis: 'x' | 'z'
  direction: 1 | -1
  laneOffset: number
  limit: number
  wheels: THREE.Mesh[]
}

function createAsphaltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.fillStyle = '#222834'
    ctx.fillRect(0, 0, 512, 512)

    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const shade = Math.random() * 25 + 35
      ctx.fillStyle = `rgb(${shade}, ${shade + 2}, ${shade + 4})`
      ctx.fillRect(x, y, 1.5, 1.5)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  return texture
}

export function createCityTraffic(citySize = 140): TrafficController {
  const roadGroup = new THREE.Group()
  const carsGroup = new THREE.Group()
  let speedMultiplier = 1.0

  const asphaltTex = typeof window !== 'undefined' ? createAsphaltTexture() : null

  // 1. Shared Materials
  const asphaltMat = new THREE.MeshStandardMaterial({
    color: 0x2b3342,
    roughness: 0.8,
    metalness: 0.1,
    map: asphaltTex || undefined,
  })

  const whiteLineMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const yellowLineMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b })
  const ironMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5, metalness: 0.85 })
  const lampPoleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 })
  const lampBulbMat = new THREE.MeshBasicMaterial({ color: 0xfffaed })
  const lightPoolMat = new THREE.MeshBasicMaterial({
    color: 0xfff3d6,
    transparent: true,
    opacity: 0.20,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const glassMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.1, metalness: 0.9 })
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 })
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 })
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfffaed })
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 })

  // 2. Shared Geometries
  const sharedTireGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.22, 10)
  sharedTireGeo.rotateZ(Math.PI / 2)
  const sharedRimGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.23, 8)
  sharedRimGeo.rotateZ(Math.PI / 2)

  const sharedHeadlightGeo = new THREE.BoxGeometry(0.35, 0.2, 0.08)
  const sharedTaillightGeo = new THREE.BoxGeometry(0.35, 0.16, 0.08)
  const sharedLampPoleGeo = new THREE.CylinderGeometry(0.08, 0.14, 5.2, 7)
  const sharedLampArmGeo = new THREE.BoxGeometry(1.5, 0.08, 0.08)
  const sharedLanternGeo = new THREE.CylinderGeometry(0.25, 0.18, 0.45, 6)
  const sharedBulbGeo = new THREE.SphereGeometry(0.18, 6, 6)
  const sharedLightPoolGeo = new THREE.CircleGeometry(3.6, 12)
  sharedLightPoolGeo.rotateX(-Math.PI / 2)

  const sharedManholeGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.05, 12)
  const sharedZebraStripeGeo = new THREE.PlaneGeometry(0.55, 2.4)
  sharedZebraStripeGeo.rotateX(-Math.PI / 2)

  // Ground Plaza Foundation
  const groundGeo = new THREE.PlaneGeometry(citySize * 1.8, citySize * 1.8)
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    roughness: 0.85,
    metalness: 0.1,
  })
  const ground = new THREE.Mesh(groundGeo, groundMat)
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.05
  ground.receiveShadow = true
  roadGroup.add(ground)

  // 3. Roads Network
  const roadWidth = 9.2
  const roadPositions = [-36, 0, 36]

  roadPositions.forEach((pos) => {
    // East-West Road
    const roadX = new THREE.Mesh(new THREE.PlaneGeometry(citySize * 1.5, roadWidth), asphaltMat)
    roadX.rotation.x = -Math.PI / 2
    roadX.position.set(0, 0.01, pos)
    roadX.receiveShadow = true
    roadGroup.add(roadX)

    // Center Yellow Lines (X)
    const dy1 = new THREE.Mesh(new THREE.PlaneGeometry(citySize * 1.5, 0.14), yellowLineMat)
    dy1.rotation.x = -Math.PI / 2
    dy1.position.set(0, 0.02, pos - 0.14)
    roadGroup.add(dy1)

    const dy2 = new THREE.Mesh(new THREE.PlaneGeometry(citySize * 1.5, 0.14), yellowLineMat)
    dy2.rotation.x = -Math.PI / 2
    dy2.position.set(0, 0.02, pos + 0.14)
    roadGroup.add(dy2)

    // North-South Road
    const roadZ = new THREE.Mesh(new THREE.PlaneGeometry(roadWidth, citySize * 1.5), asphaltMat)
    roadZ.rotation.x = -Math.PI / 2
    roadZ.position.set(pos, 0.01, 0)
    roadZ.receiveShadow = true
    roadGroup.add(roadZ)

    // Center Yellow Lines (Z)
    const dyZ1 = new THREE.Mesh(new THREE.PlaneGeometry(0.14, citySize * 1.5), yellowLineMat)
    dyZ1.rotation.x = -Math.PI / 2
    dyZ1.position.set(pos - 0.14, 0.02, 0)
    roadGroup.add(dyZ1)

    const dyZ2 = new THREE.Mesh(new THREE.PlaneGeometry(0.14, citySize * 1.5), yellowLineMat)
    dyZ2.rotation.x = -Math.PI / 2
    dyZ2.position.set(pos + 0.14, 0.02, 0)
    roadGroup.add(dyZ2)
  })

  // Intersections: Zebra Crossings & Manholes
  roadPositions.forEach((rx) => {
    roadPositions.forEach((rz) => {
      const offsets = [-3.8, -4.6, 4.6, 3.8]
      offsets.forEach((offset, idx) => {
        const isHoriz = idx < 2
        for (let s = -3.2; s <= 3.2; s += 0.95) {
          const stripe = new THREE.Mesh(sharedZebraStripeGeo, whiteLineMat)
          stripe.position.set(
            isHoriz ? rx + s : rx + offset,
            0.025,
            isHoriz ? rz + offset : rz + s
          )
          roadGroup.add(stripe)
        }
      })

      const manhole = new THREE.Mesh(sharedManholeGeo, ironMat)
      manhole.position.set(rx + 3.2, 0.025, rz + 3.2)
      roadGroup.add(manhole)
    })
  })

  // 4. Streetlamps (Shared Geometries)
  for (let x = -50; x <= 50; x += 25) {
    for (let z = -50; z <= 50; z += 25) {
      if (Math.abs(x) < 8 && Math.abs(z) < 8) continue

      const lampGroup = new THREE.Group()
      lampGroup.position.set(x + 5.8, 0, z + 5.8)

      const pole = new THREE.Mesh(sharedLampPoleGeo, lampPoleMat)
      pole.position.y = 2.6
      lampGroup.add(pole)

      const arm = new THREE.Mesh(sharedLampArmGeo, lampPoleMat)
      arm.position.set(-0.65, 5.0, 0)
      lampGroup.add(arm)

      const lantern = new THREE.Mesh(sharedLanternGeo, lampPoleMat)
      lantern.position.set(-1.3, 4.8, 0)
      lampGroup.add(lantern)

      const bulb = new THREE.Mesh(sharedBulbGeo, lampBulbMat)
      bulb.position.set(-1.3, 4.7, 0)
      lampGroup.add(bulb)

      const pool = new THREE.Mesh(sharedLightPoolGeo, lightPoolMat)
      pool.position.set(-1.3, 0.03, 0)
      lampGroup.add(pool)

      roadGroup.add(lampGroup)
    }
  }

  // 5. Vehicle Fleet
  const carList: CarData[] = []

  function createWheel(): { group: THREE.Group; tire: THREE.Mesh } {
    const wheel = new THREE.Group()
    const tire = new THREE.Mesh(sharedTireGeo, tireMat)
    tire.castShadow = true
    wheel.add(tire)

    const rim = new THREE.Mesh(sharedRimGeo, rimMat)
    wheel.add(rim)
    return { group: wheel, tire }
  }

  // NYC Taxi
  function createNYCTaxi(): { group: THREE.Group; wheels: THREE.Mesh[] } {
    const taxi = new THREE.Group()
    const taxiMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3, metalness: 0.4 })

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.65, 4.2), taxiMat)
    body.position.y = 0.55
    body.castShadow = true
    taxi.add(body)

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.55, 2.2), glassMat)
    cabin.position.set(0, 1.05, -0.2)
    cabin.castShadow = true
    taxi.add(cabin)

    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.08, 2.1), taxiMat)
    roof.position.set(0, 1.34, -0.2)
    taxi.add(roof)

    // Taxi Sign
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.22, 0.35), new THREE.MeshBasicMaterial({ color: 0xfffbeb }))
    sign.position.set(0, 1.48, -0.2)
    taxi.add(sign)

    const hl1 = new THREE.Mesh(sharedHeadlightGeo, headlightMat)
    hl1.position.set(-0.65, 0.6, 2.12)
    taxi.add(hl1)
    const hl2 = new THREE.Mesh(sharedHeadlightGeo, headlightMat)
    hl2.position.set(0.65, 0.6, 2.12)
    taxi.add(hl2)

    const tl1 = new THREE.Mesh(sharedTaillightGeo, taillightMat)
    tl1.position.set(-0.65, 0.6, -2.12)
    taxi.add(tl1)
    const tl2 = new THREE.Mesh(sharedTaillightGeo, taillightMat)
    tl2.position.set(0.65, 0.6, -2.12)
    taxi.add(tl2)

    const wheels: THREE.Mesh[] = []
    const wPos = [
      [-0.95, 0.32, 1.25],
      [0.95, 0.32, 1.25],
      [-0.95, 0.32, -1.25],
      [0.95, 0.32, -1.25],
    ]
    wPos.forEach(([wx, wy, wz]) => {
      const w = createWheel()
      w.group.position.set(wx, wy, wz)
      wheels.push(w.tire)
      taxi.add(w.group)
    })

    return { group: taxi, wheels }
  }

  // Sports Roadster
  function createRoadster(color: number): { group: THREE.Group; wheels: THREE.Mesh[] } {
    const car = new THREE.Group()
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.15, metalness: 0.85 })

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.95, 0.5, 4.0), bodyMat)
    body.position.y = 0.45
    body.castShadow = true
    car.add(body)

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.45, 1.7), glassMat)
    cabin.position.set(0, 0.82, -0.3)
    cabin.castShadow = true
    car.add(cabin)

    const spoiler = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 0.35), bodyMat)
    spoiler.position.set(0, 0.9, -1.9)
    car.add(spoiler)

    const wheels: THREE.Mesh[] = []
    const wPos = [
      [-0.95, 0.3, 1.2],
      [0.95, 0.3, 1.2],
      [-0.95, 0.3, -1.2],
      [0.95, 0.3, -1.2],
    ]
    wPos.forEach(([wx, wy, wz]) => {
      const w = createWheel()
      w.group.position.set(wx, wy, wz)
      wheels.push(w.tire)
      car.add(w.group)
    })

    return { group: car, wheels }
  }

  // City SUV
  function createSUV(color: number): { group: THREE.Group; wheels: THREE.Mesh[] } {
    const suv = new THREE.Group()
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.25, metalness: 0.7 })

    const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.9, 4.4), bodyMat)
    body.position.y = 0.75
    body.castShadow = true
    suv.add(body)

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 2.6), glassMat)
    cabin.position.set(0, 1.35, -0.4)
    cabin.castShadow = true
    suv.add(cabin)

    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.08, 2.5), bodyMat)
    roof.position.set(0, 1.72, -0.4)
    suv.add(roof)

    const wheels: THREE.Mesh[] = []
    const wPos = [
      [-1.0, 0.36, 1.35],
      [1.0, 0.36, 1.35],
      [-1.0, 0.36, -1.35],
      [1.0, 0.36, -1.35],
    ]
    wPos.forEach(([wx, wy, wz]) => {
      const w = createWheel()
      w.group.position.set(wx, wy, wz)
      wheels.push(w.tire)
      suv.add(w.group)
    })

    return { group: suv, wheels }
  }

  // Spawn Initial Vehicle Fleet
  const trafficConfigs = [
    { type: 'taxi', axis: 'x' as const, dir: 1 as const, lane: -2.3, speed: 18, z: 0, x: -50 },
    { type: 'taxi', axis: 'x' as const, dir: -1 as const, lane: 2.3, speed: 16, z: 0, x: 50 },
    { type: 'roadster', color: 0xdc2626, axis: 'x' as const, dir: 1 as const, lane: -2.3, speed: 22, z: 36, x: -30 },
    { type: 'suv', color: 0x0f172a, axis: 'x' as const, dir: -1 as const, lane: 2.3, speed: 15, z: -36, x: 20 },
    { type: 'taxi', axis: 'z' as const, dir: 1 as const, lane: -2.3, speed: 17, x: 0, z: -40 },
    { type: 'roadster', color: 0x2563eb, axis: 'z' as const, dir: -1 as const, lane: 2.3, speed: 24, x: 0, z: 40 },
    { type: 'suv', color: 0x334155, axis: 'z' as const, dir: 1 as const, lane: -2.3, speed: 16, x: 36, z: -60 },
    { type: 'taxi', axis: 'z' as const, dir: -1 as const, lane: 2.3, speed: 18, x: -36, z: 60 },
  ]

  trafficConfigs.forEach((cfg) => {
    let carObj: { group: THREE.Group; wheels: THREE.Mesh[] }
    if (cfg.type === 'taxi') {
      carObj = createNYCTaxi()
    } else if (cfg.type === 'roadster') {
      carObj = createRoadster(cfg.color || 0xdc2626)
    } else {
      carObj = createSUV(cfg.color || 0x1e293b)
    }

    if (cfg.axis === 'x') {
      carObj.group.position.set(cfg.x, 0, cfg.z + cfg.lane)
      carObj.group.rotation.y = cfg.dir === 1 ? Math.PI / 2 : -Math.PI / 2
    } else {
      carObj.group.position.set(cfg.x + cfg.lane, 0, cfg.z)
      carObj.group.rotation.y = cfg.dir === 1 ? 0 : Math.PI
    }

    carsGroup.add(carObj.group)
    carList.push({
      mesh: carObj.group,
      speed: cfg.speed,
      axis: cfg.axis,
      direction: cfg.dir,
      laneOffset: cfg.lane,
      limit: citySize * 0.72,
      wheels: carObj.wheels,
    })
  })

  const update = (delta: number) => {
    const effectiveSpeed = speedMultiplier
    carList.forEach((car) => {
      const step = car.speed * effectiveSpeed * delta * car.direction
      if (car.axis === 'x') {
        car.mesh.position.x += step
        if (car.direction === 1 && car.mesh.position.x > car.limit) car.mesh.position.x = -car.limit
        if (car.direction === -1 && car.mesh.position.x < -car.limit) car.mesh.position.x = car.limit
      } else {
        car.mesh.position.z += step
        if (car.direction === 1 && car.mesh.position.z > car.limit) car.mesh.position.z = -car.limit
        if (car.direction === -1 && car.mesh.position.z < -car.limit) car.mesh.position.z = car.limit
      }

      car.wheels.forEach((w) => {
        w.rotation.x += delta * car.speed * 2.8
      })
    })
  }

  const setSpeedMultiplier = (mult: number) => {
    speedMultiplier = mult
  }

  return {
    roadGroup,
    carsGroup,
    update,
    setSpeedMultiplier,
  }
}
