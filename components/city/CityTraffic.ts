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

// Generate realistic road asphalt texture with fine aggregate grain
function createAsphaltTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Natural dark asphalt gray
    ctx.fillStyle = '#222834'
    ctx.fillRect(0, 0, 512, 512)

    // Fine mineral aggregate & tire wear
    for (let i = 0; i < 15000; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const shade = Math.random() * 30 + 35
      ctx.fillStyle = `rgb(${shade}, ${shade + 2}, ${shade + 5})`
      ctx.fillRect(x, y, 1.5, 1.5)
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  return texture
}

// Generate concrete sidewalk slab texture
function createSidewalkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.fillStyle = '#cbd5e1'
    ctx.fillRect(0, 0, 256, 256)

    // Concrete slab score lines
    ctx.strokeStyle = '#94a3b8'
    ctx.lineWidth = 2
    const size = 64
    for (let x = 0; x <= 256; x += size) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, 256)
      ctx.stroke()
    }
    for (let y = 0; y <= 256; y += size) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(256, y)
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(8, 8)
  return texture
}

export function createCityTraffic(citySize = 140): TrafficController {
  const roadGroup = new THREE.Group()
  const carsGroup = new THREE.Group()
  let speedMultiplier = 1.0

  const asphaltTex = typeof window !== 'undefined' ? createAsphaltTexture() : null
  const sidewalkTex = typeof window !== 'undefined' ? createSidewalkTexture() : null

  // 1. Road Materials
  const asphaltMat = new THREE.MeshStandardMaterial({
    color: 0x2b3342,
    roughness: 0.8,
    metalness: 0.1,
    map: asphaltTex || undefined,
  })

  const whiteLineMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
  const yellowLineMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b })

  const sidewalkMat = new THREE.MeshStandardMaterial({
    color: 0xd1d5db,
    roughness: 0.75,
    metalness: 0.15,
    map: sidewalkTex || undefined,
  })

  const curbMat = new THREE.MeshStandardMaterial({
    color: 0x9ca3af,
    roughness: 0.7,
  })

  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x1f2937,
    roughness: 0.5,
    metalness: 0.85,
  })

  // Ground Plaza Foundation (Natural concrete/stone ground, not black)
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

  // 2. Build Realistic City Road Network (Avenues & Cross Streets)
  const roadWidth = 9.2
  const roadPositions = [-36, 0, 36]

  roadPositions.forEach((pos) => {
    // East-West Road (along X)
    const roadXGeo = new THREE.PlaneGeometry(citySize * 1.5, roadWidth)
    const roadX = new THREE.Mesh(roadXGeo, asphaltMat)
    roadX.rotation.x = -Math.PI / 2
    roadX.position.set(0, 0.01, pos)
    roadX.receiveShadow = true
    roadGroup.add(roadX)

    // Double Center Yellow Lines
    const dy1 = new THREE.Mesh(new THREE.PlaneGeometry(citySize * 1.5, 0.15), yellowLineMat)
    dy1.rotation.x = -Math.PI / 2
    dy1.position.set(0, 0.02, pos - 0.16)
    roadGroup.add(dy1)

    const dy2 = new THREE.Mesh(new THREE.PlaneGeometry(citySize * 1.5, 0.15), yellowLineMat)
    dy2.rotation.x = -Math.PI / 2
    dy2.position.set(0, 0.02, pos + 0.16)
    roadGroup.add(dy2)

    // White Dashed Lane Dividers
    for (let x = -citySize * 0.7; x <= citySize * 0.7; x += 4.8) {
      const dash1 = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.15), whiteLineMat)
      dash1.rotation.x = -Math.PI / 2
      dash1.position.set(x, 0.02, pos - 2.3)
      roadGroup.add(dash1)

      const dash2 = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.15), whiteLineMat)
      dash2.rotation.x = -Math.PI / 2
      dash2.position.set(x, 0.02, pos + 2.3)
      roadGroup.add(dash2)
    }

    // North-South Road (along Z)
    const roadZGeo = new THREE.PlaneGeometry(roadWidth, citySize * 1.5)
    const roadZ = new THREE.Mesh(roadZGeo, asphaltMat)
    roadZ.rotation.x = -Math.PI / 2
    roadZ.position.set(pos, 0.01, 0)
    roadZ.receiveShadow = true
    roadGroup.add(roadZ)

    // Double Center Yellow Lines (Z)
    const dyZ1 = new THREE.Mesh(new THREE.PlaneGeometry(0.15, citySize * 1.5), yellowLineMat)
    dyZ1.rotation.x = -Math.PI / 2
    dyZ1.position.set(pos - 0.16, 0.02, 0)
    roadGroup.add(dyZ1)

    const dyZ2 = new THREE.Mesh(new THREE.PlaneGeometry(0.15, citySize * 1.5), yellowLineMat)
    dyZ2.rotation.x = -Math.PI / 2
    dyZ2.position.set(pos + 0.16, 0.02, 0)
    roadGroup.add(dyZ2)

    // White Dashed Lane Dividers (Z)
    for (let z = -citySize * 0.7; z <= citySize * 0.7; z += 4.8) {
      const dash1 = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 2.4), whiteLineMat)
      dash1.rotation.x = -Math.PI / 2
      dash1.position.set(pos - 2.3, 0.02, z)
      roadGroup.add(dash1)

      const dash2 = new THREE.Mesh(new THREE.PlaneGeometry(0.15, 2.4), whiteLineMat)
      dash2.rotation.x = -Math.PI / 2
      dash2.position.set(pos + 2.3, 0.02, z)
      roadGroup.add(dash2)
    }

    // Sidewalks & Beveled Curbs
    const swWidth = 2.6
    const curbHeight = 0.22

    const swNorth = new THREE.Mesh(new THREE.BoxGeometry(citySize * 1.5, curbHeight, swWidth), sidewalkMat)
    swNorth.position.set(0, curbHeight / 2, pos - roadWidth / 2 - swWidth / 2)
    swNorth.receiveShadow = true
    roadGroup.add(swNorth)

    const swSouth = new THREE.Mesh(new THREE.BoxGeometry(citySize * 1.5, curbHeight, swWidth), sidewalkMat)
    swSouth.position.set(0, curbHeight / 2, pos + roadWidth / 2 + swWidth / 2)
    swSouth.receiveShadow = true
    roadGroup.add(swSouth)
  })

  // 3. Pedestrian Zebra Crossings & Manhole Covers at Intersections
  roadPositions.forEach((rx) => {
    roadPositions.forEach((rz) => {
      const zebraOffsets = [
        { x: rx, z: rz - 6.2, isHoriz: true },
        { x: rx, z: rz + 6.2, isHoriz: true },
        { x: rx - 6.2, z: rz, isHoriz: false },
        { x: rx + 6.2, z: rz, isHoriz: false },
      ]

      zebraOffsets.forEach(({ x, z, isHoriz }) => {
        const stripeCount = 8
        for (let s = 0; s < stripeCount; s++) {
          const offset = (s - stripeCount / 2 + 0.5) * 1.1
          const stripeGeo = isHoriz
            ? new THREE.PlaneGeometry(0.6, 2.0)
            : new THREE.PlaneGeometry(2.0, 0.6)
          const stripe = new THREE.Mesh(stripeGeo, whiteLineMat)
          stripe.rotation.x = -Math.PI / 2
          stripe.position.set(
            isHoriz ? x + offset : x,
            0.025,
            isHoriz ? z : z + offset
          )
          roadGroup.add(stripe)
        }
      })

      // Manhole Cover
      const manholeGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.05, 16)
      const manhole = new THREE.Mesh(manholeGeo, ironMat)
      manhole.position.set(rx + 3.2, 0.025, rz + 3.2)
      roadGroup.add(manhole)
    })
  })

  // 4. Classic NYC / LA Cast-Iron Streetlamps
  const lampPoleGeo = new THREE.CylinderGeometry(0.08, 0.14, 5.2, 8)
  const lampPoleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 })
  const lampBulbMat = new THREE.MeshBasicMaterial({ color: 0xfffaed })
  const lightPoolMat = new THREE.MeshBasicMaterial({
    color: 0xfff3d6,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  for (let x = -50; x <= 50; x += 25) {
    for (let z = -50; z <= 50; z += 25) {
      if (Math.abs(x) < 8 && Math.abs(z) < 8) continue

      const lampGroup = new THREE.Group()
      lampGroup.position.set(x + 5.8, 0, z + 5.8)

      const pole = new THREE.Mesh(lampPoleGeo, lampPoleMat)
      pole.position.y = 2.6
      lampGroup.add(pole)

      // Classic Curved Arm
      const arm = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.08), lampPoleMat)
      arm.position.set(-0.65, 5.0, 0)
      lampGroup.add(arm)

      // Lantern Housing
      const lanternGeo = new THREE.CylinderGeometry(0.25, 0.18, 0.45, 6)
      const lantern = new THREE.Mesh(lanternGeo, lampPoleMat)
      lantern.position.set(-1.3, 4.8, 0)
      lampGroup.add(lantern)

      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), lampBulbMat)
      bulb.position.set(-1.3, 4.7, 0)
      lampGroup.add(bulb)

      // Ground Light Pool
      const pool = new THREE.Mesh(new THREE.CircleGeometry(3.8, 16), lightPoolMat)
      pool.rotation.x = -Math.PI / 2
      pool.position.set(-1.3, 0.03, 0)
      lampGroup.add(pool)

      roadGroup.add(lampGroup)
    }
  }

  // 5. Realistic Vehicle Fleet (NYC Taxis, LA Sports Cars, SUVs, Metro Buses)
  const carList: CarData[] = []

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.1,
    metalness: 0.9,
  })

  const tireMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 })
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 })
  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfffaed })
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xdc2626 })

  // Function to create a Wheel
  function createWheel(): THREE.Group {
    const wheel = new THREE.Group()
    const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 14), tireMat)
    tire.rotation.z = Math.PI / 2
    tire.castShadow = true
    wheel.add(tire)

    const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.23, 10), rimMat)
    rim.rotation.z = Math.PI / 2
    wheel.add(rim)
    return wheel
  }

  // A. NYC Yellow Taxi Cab
  function createNYCTaxi(): { group: THREE.Group; wheels: THREE.Mesh[] } {
    const taxi = new THREE.Group()
    const taxiYellowMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.3,
      metalness: 0.4,
    })

    // Lower Body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.5, 3.6), taxiYellowMat)
    body.position.y = 0.45
    body.castShadow = true
    taxi.add(body)

    // Cabin
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.48, 1.9), glassMat)
    cabin.position.set(0, 0.85, -0.15)
    cabin.castShadow = true
    taxi.add(cabin)

    // Roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.08, 1.8), taxiYellowMat)
    roof.position.set(0, 1.1, -0.15)
    taxi.add(roof)

    // Roof TAXI Light Medallion
    const taxiSignMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfef08a, emissiveIntensity: 0.6 })
    const taxiSign = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.25), taxiSignMat)
    taxiSign.position.set(0, 1.22, -0.15)
    taxi.add(taxiSign)

    // Black Checkers Stripe
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
    const stripeL = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.08), stripeMat)
    stripeL.position.set(-0.86, 0.52, 0)
    stripeL.rotation.y = -Math.PI / 2
    taxi.add(stripeL)

    const stripeR = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 0.08), stripeMat)
    stripeR.position.set(0.86, 0.52, 0)
    stripeR.rotation.y = Math.PI / 2
    taxi.add(stripeR)

    // Headlights & Taillights
    const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.05), headlightMat)
    hlL.position.set(-0.6, 0.45, 1.81)
    taxi.add(hlL)
    const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.05), headlightMat)
    hlR.position.set(0.6, 0.45, 1.81)
    taxi.add(hlR)

    const tlL = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.1, 0.05), taillightMat)
    tlL.position.set(-0.6, 0.48, -1.81)
    taxi.add(tlL)
    const tlR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.1, 0.05), taillightMat)
    tlR.position.set(0.6, 0.48, -1.81)
    taxi.add(tlR)

    // 4 Wheels
    const wheels: THREE.Mesh[] = []
    const wheelOffsets = [
      [-0.9, 0.32, 1.1],
      [0.9, 0.32, 1.1],
      [-0.9, 0.32, -1.1],
      [0.9, 0.32, -1.1],
    ]
    wheelOffsets.forEach(([wx, wy, wz]) => {
      const w = createWheel()
      w.position.set(wx, wy, wz)
      taxi.add(w)
    })

    return { group: taxi, wheels }
  }

  // B. LA Sports Roadster / Coupe
  function createLASportsCar(colorHex: number): { group: THREE.Group; wheels: THREE.Mesh[] } {
    const car = new THREE.Group()
    const paintMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.2,
      metalness: 0.7,
    })

    // Low sleek body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.42, 3.8), paintMat)
    body.position.y = 0.38
    body.castShadow = true
    car.add(body)

    // Aerodynamic Windshield
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.42, 1.6), glassMat)
    cabin.position.set(0, 0.72, -0.3)
    cabin.castShadow = true
    car.add(cabin)

    // Rear Spoiler
    const spoilerMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 })
    const spoiler = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.3), spoilerMat)
    spoiler.position.set(0, 0.68, -1.75)
    car.add(spoiler)

    // Headlights & Taillights
    const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 0.05), headlightMat)
    hlL.position.set(-0.65, 0.4, 1.91)
    car.add(hlL)
    const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.1, 0.05), headlightMat)
    hlR.position.set(0.65, 0.4, 1.91)
    car.add(hlR)

    const tlL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.05), taillightMat)
    tlL.position.set(-0.65, 0.42, -1.91)
    car.add(tlL)
    const tlR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.05), taillightMat)
    tlR.position.set(0.65, 0.42, -1.91)
    car.add(tlR)

    const wheels: THREE.Mesh[] = []
    const wheelOffsets = [
      [-0.92, 0.32, 1.2],
      [0.92, 0.32, 1.2],
      [-0.92, 0.32, -1.2],
      [0.92, 0.32, -1.2],
    ]
    wheelOffsets.forEach(([wx, wy, wz]) => {
      const w = createWheel()
      w.position.set(wx, wy, wz)
      car.add(w)
    })

    return { group: car, wheels }
  }

  // C. City SUV / Sedan
  function createCitySUV(colorHex: number): { group: THREE.Group; wheels: THREE.Mesh[] } {
    const suv = new THREE.Group()
    const paintMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.3,
      metalness: 0.5,
    })

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.65, 3.9), paintMat)
    body.position.y = 0.55
    body.castShadow = true
    suv.add(body)

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.55, 2.4), glassMat)
    cabin.position.set(0, 1.1, -0.2)
    cabin.castShadow = true
    suv.add(cabin)

    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.55, 0.08, 2.3), paintMat)
    roof.position.set(0, 1.4, -0.2)
    suv.add(roof)

    // Lights
    const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.05), headlightMat)
    hlL.position.set(-0.68, 0.58, 1.96)
    suv.add(hlL)
    const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.05), headlightMat)
    hlR.position.set(0.68, 0.58, 1.96)
    suv.add(hlR)

    const tlL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.05), taillightMat)
    tlL.position.set(-0.68, 0.6, -1.96)
    suv.add(tlL)
    const tlR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.14, 0.05), taillightMat)
    tlR.position.set(0.68, 0.6, -1.96)
    suv.add(tlR)

    const wheels: THREE.Mesh[] = []
    const wheelOffsets = [
      [-0.95, 0.35, 1.25],
      [0.95, 0.35, 1.25],
      [-0.95, 0.35, -1.25],
      [0.95, 0.35, -1.25],
    ]
    wheelOffsets.forEach(([wx, wy, wz]) => {
      const w = createWheel()
      w.position.set(wx, wy, wz)
      suv.add(w)
    })

    return { group: suv, wheels }
  }

  // D. Metro Transit Bus
  function createCityBus(): { group: THREE.Group; wheels: THREE.Mesh[] } {
    const bus = new THREE.Group()
    const busMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.4 })
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })

    const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.7, 6.8), busMat)
    lowerBody.position.y = 0.65
    lowerBody.castShadow = true
    bus.add(lowerBody)

    const windowBand = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.65, 6.2), glassMat)
    windowBand.position.set(0, 1.3, 0)
    bus.add(windowBand)

    const upperBody = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.3, 6.8), whiteMat)
    upperBody.position.set(0, 1.75, 0)
    bus.add(upperBody)

    // Lights
    const hlL = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.05), headlightMat)
    hlL.position.set(-0.8, 0.65, 3.41)
    bus.add(hlL)
    const hlR = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.05), headlightMat)
    hlR.position.set(0.8, 0.65, 3.41)
    bus.add(hlR)

    const tlL = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.05), taillightMat)
    tlL.position.set(-0.8, 0.7, -3.41)
    bus.add(tlL)
    const tlR = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.05), taillightMat)
    tlR.position.set(0.8, 0.7, -3.41)
    bus.add(tlR)

    const wheels: THREE.Mesh[] = []
    const wheelOffsets = [
      [-1.05, 0.35, 2.2],
      [1.05, 0.35, 2.2],
      [-1.05, 0.35, -2.2],
      [1.05, 0.35, -2.2],
    ]
    wheelOffsets.forEach(([wx, wy, wz]) => {
      const w = createWheel()
      w.position.set(wx, wy, wz)
      bus.add(w)
    })

    return { group: bus, wheels }
  }

  // Populate Vehicle Traffic
  const totalVehicles = 26
  const limit = citySize * 0.68
  const sportsColors = [0xdc2626, 0x2563eb, 0x475569, 0xf8fafc, 0xd97706]
  const suvColors = [0x0f172a, 0x334155, 0xf1f5f9, 0x1e3a8a]

  for (let i = 0; i < totalVehicles; i++) {
    let vehicleObj: { group: THREE.Group; wheels: THREE.Mesh[] }

    if (i % 4 === 0) {
      vehicleObj = createNYCTaxi()
    } else if (i % 4 === 1) {
      vehicleObj = createLASportsCar(sportsColors[i % sportsColors.length])
    } else if (i % 4 === 2) {
      vehicleObj = createCitySUV(suvColors[i % suvColors.length])
    } else {
      vehicleObj = createCityBus()
    }

    const mesh = vehicleObj.group
    const axis: 'x' | 'z' = i % 2 === 0 ? 'x' : 'z'
    const roadIdx = i % 3
    const roadCoord = roadPositions[roadIdx]
    const direction: 1 | -1 = i % 4 < 2 ? 1 : -1
    const laneOffset = direction === 1 ? 2.3 : -2.3
    const initialPos = (Math.random() - 0.5) * limit * 1.8
    const speed = (12 + Math.random() * 10)

    if (axis === 'x') {
      mesh.position.set(initialPos, 0, roadCoord + laneOffset)
      mesh.rotation.y = direction === 1 ? Math.PI / 2 : -Math.PI / 2
    } else {
      mesh.position.set(roadCoord + laneOffset, 0, initialPos)
      mesh.rotation.y = direction === 1 ? 0 : Math.PI
    }

    carsGroup.add(mesh)
    carList.push({
      mesh,
      speed,
      axis,
      direction,
      laneOffset,
      limit,
      wheels: vehicleObj.wheels,
    })
  }

  // 6. Update Loop
  const update = (delta: number, elapsed: number) => {
    carList.forEach((car) => {
      const step = car.speed * delta * speedMultiplier * car.direction

      if (car.axis === 'x') {
        car.mesh.position.x += step
        if (car.direction === 1 && car.mesh.position.x > car.limit) {
          car.mesh.position.x = -car.limit
        } else if (car.direction === -1 && car.mesh.position.x < -car.limit) {
          car.mesh.position.x = car.limit
        }
      } else {
        car.mesh.position.z += step
        if (car.direction === 1 && car.mesh.position.z > car.limit) {
          car.mesh.position.z = -car.limit
        } else if (car.direction === -1 && car.mesh.position.z < -car.limit) {
          car.mesh.position.z = car.limit
        }
      }
    })
  }

  const setSpeedMultiplier = (mult: number) => {
    speedMultiplier = Math.max(0.1, Math.min(3.0, mult))
  }

  return {
    roadGroup,
    carsGroup,
    update,
    setSpeedMultiplier,
  }
}
