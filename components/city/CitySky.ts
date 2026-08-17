import * as THREE from 'three'
import { LightingMode } from './CityScene'

export interface SkyController {
  skyGroup: THREE.Group
  update: (delta: number, elapsed: number, mode: LightingMode) => void
}

export function createCitySky(): SkyController {
  const skyGroup = new THREE.Group()

  // 1. Celestial Sun & Corona Halo
  const sunGroup = new THREE.Group()
  const sunCoreMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb })
  const sunCore = new THREE.Mesh(new THREE.SphereGeometry(14, 24, 24), sunCoreMat)
  sunGroup.add(sunCore)

  // Sun Flare / Corona Halo
  const haloGeo = new THREE.RingGeometry(14, 38, 32)
  const sunHaloMat = new THREE.MeshBasicMaterial({
    color: 0xfef08a,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const sunHalo = new THREE.Mesh(haloGeo, sunHaloMat)
  sunGroup.add(sunHalo)
  sunGroup.position.set(160, 200, 160)
  skyGroup.add(sunGroup)

  // 2. Realistic 3D Glowing Moon & Lunar Aura
  const moonGroup = new THREE.Group()
  const moonMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc })
  const moon = new THREE.Mesh(new THREE.SphereGeometry(12, 24, 24), moonMat)
  moonGroup.add(moon)

  const moonHaloGeo = new THREE.RingGeometry(12, 28, 32)
  const moonHaloMat = new THREE.MeshBasicMaterial({
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
  const moonHalo = new THREE.Mesh(moonHaloGeo, moonHaloMat)
  moonGroup.add(moonHalo)
  moonGroup.position.set(-160, 190, -160)
  skyGroup.add(moonGroup)

  // 3. Twinkling Starfield (1,200+ Stars)
  const starCount = 1400
  const starGeo = new THREE.BufferGeometry()
  const starPositions = new Float32Array(starCount * 3)
  const starColors = new Float32Array(starCount * 3)
  const starBaseAlphas: number[] = []

  for (let i = 0; i < starCount; i++) {
    // Distribute across upper hemisphere
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 0.85 + 0.15) // Upper sky
    const r = 340 + Math.random() * 30

    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.cos(phi)
    const z = r * Math.sin(phi) * Math.sin(theta)

    starPositions[i * 3] = x
    starPositions[i * 3 + 1] = y
    starPositions[i * 3 + 2] = z

    // Star colors: Diamond white, warm gold, cool blue
    const randColor = Math.random()
    if (randColor > 0.8) {
      // Blue star
      starColors[i * 3] = 0.75
      starColors[i * 3 + 1] = 0.88
      starColors[i * 3 + 2] = 1.0
    } else if (randColor > 0.6) {
      // Gold star
      starColors[i * 3] = 1.0
      starColors[i * 3 + 1] = 0.92
      starColors[i * 3 + 2] = 0.7
    } else {
      // Pure White
      starColors[i * 3] = 1.0
      starColors[i * 3 + 1] = 1.0
      starColors[i * 3 + 2] = 1.0
    }

    starBaseAlphas.push(Math.random() * 0.7 + 0.3)
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))

  const starMat = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.0, // hidden in day, visible at night/sunset
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const starField = new THREE.Points(starGeo, starMat)
  skyGroup.add(starField)

  // Shooting Star / Meteor
  const meteorGeo = new THREE.CylinderGeometry(0.12, 0.0, 18, 4)
  const meteorMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.0,
    blending: THREE.AdditiveBlending,
  })
  const meteor = new THREE.Mesh(meteorGeo, meteorMat)
  meteor.rotation.z = Math.PI / 3
  skyGroup.add(meteor)
  let meteorActive = false
  let meteorTimer = 0
  let meteorProgress = 0

  // 4. Volumetric Drifting 3D Cumulus Cloud Clusters
  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.95,
    metalness: 0.05,
    transparent: true,
    opacity: 0.9,
    flatShading: true,
  })

  const cloudPuffsGeo = new THREE.DodecahedronGeometry(1, 1)
  const cloudsList: { group: THREE.Group; speed: number; startX: number }[] = []
  const numCloudClusters = 14

  for (let c = 0; c < numCloudClusters; c++) {
    const cloudCluster = new THREE.Group()
    const numPuffs = 6 + Math.floor(Math.random() * 6)
    const clusterScale = 5.0 + Math.random() * 4.5

    for (let p = 0; p < numPuffs; p++) {
      const puff = new THREE.Mesh(cloudPuffsGeo, cloudMat)
      puff.position.set(
        (Math.random() - 0.5) * clusterScale * 2.2,
        (Math.random() - 0.5) * clusterScale * 0.7,
        (Math.random() - 0.5) * clusterScale * 1.5
      )
      const puffScale = clusterScale * (0.6 + Math.random() * 0.7)
      puff.scale.set(puffScale, puffScale * 0.75, puffScale)
      cloudCluster.add(puff)
    }

    const altitude = 68 + (c % 4) * 14 + Math.random() * 8
    const spreadX = (Math.random() - 0.5) * 320
    const spreadZ = (Math.random() - 0.5) * 320

    cloudCluster.position.set(spreadX, altitude, spreadZ)
    skyGroup.add(cloudCluster)
    cloudsList.push({
      group: cloudCluster,
      speed: 1.8 + Math.random() * 1.6,
      startX: spreadX,
    })
  }

  // 5. High-Altitude Commercial Jet Airplane with Vapor Contrail
  const planeGroup = new THREE.Group()
  const planeBodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 })
  const planeStrobeRedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 })
  const planeStrobeGreenMat = new THREE.MeshBasicMaterial({ color: 0x22c55e })
  const planeStrobeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff })

  // Fuselage
  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 7.5, 8), planeBodyMat)
  fuselage.rotation.x = Math.PI / 2
  planeGroup.add(fuselage)

  // Wings
  const wings = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.12, 1.8), planeBodyMat)
  wings.position.set(0, 0, 0.2)
  planeGroup.add(wings)

  // Tail Fin
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 1.4), planeBodyMat)
  tail.position.set(0, 0.9, -3.2)
  planeGroup.add(tail)

  // Wingtip Strobes
  const strobeL = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6), planeStrobeRedMat)
  strobeL.position.set(-4.75, 0, 0.2)
  planeGroup.add(strobeL)

  const strobeR = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6), planeStrobeGreenMat)
  strobeR.position.set(4.75, 0, 0.2)
  planeGroup.add(strobeR)

  const strobeTail = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 6), planeStrobeWhiteMat)
  strobeTail.position.set(0, 1.8, -3.8)
  planeGroup.add(strobeTail)

  // Vapor Contrail / Exhaust Stream
  const contrailMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  })
  const contrailL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.8, 38, 6), contrailMat)
  contrailL.rotation.x = Math.PI / 2
  contrailL.position.set(-1.8, -0.1, -22)
  planeGroup.add(contrailL)

  const contrailR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.8, 38, 6), contrailMat)
  contrailR.rotation.x = Math.PI / 2
  contrailR.position.set(1.8, -0.1, -22)
  planeGroup.add(contrailR)

  planeGroup.position.set(-160, 135, -80)
  planeGroup.rotation.y = Math.PI / 3.5
  skyGroup.add(planeGroup)

  // 6. Flock of Soaring Urban Birds
  const birdsGroup = new THREE.Group()
  const birdMat = new THREE.MeshBasicMaterial({ color: 0x1e293b, side: THREE.DoubleSide })
  const birdCount = 12
  const birdsList: { mesh: THREE.Group; wingL: THREE.Mesh; wingR: THREE.Mesh; phase: number }[] = []

  for (let b = 0; b < birdCount; b++) {
    const singleBird = new THREE.Group()

    const wingGeo = new THREE.PlaneGeometry(0.75, 0.28)
    wingGeo.translate(0.38, 0, 0)

    const wingL = new THREE.Mesh(wingGeo, birdMat)
    wingL.rotation.y = Math.PI
    singleBird.add(wingL)

    const wingR = new THREE.Mesh(wingGeo, birdMat)
    singleBird.add(wingR)

    // V-formation offsets
    const row = Math.floor(b / 2)
    const side = b % 2 === 0 ? 1 : -1
    singleBird.position.set(side * row * 3.2, (Math.random() - 0.5) * 1.5, -row * 3.5)

    birdsGroup.add(singleBird)
    birdsList.push({ mesh: singleBird, wingL, wingR, phase: b * 0.4 })
  }

  birdsGroup.position.set(0, 52, 0)
  skyGroup.add(birdsGroup)
  let birdFlockAngle = 0

  // 7. Update Loop
  const update = (delta: number, elapsed: number, mode: LightingMode) => {
    // A. Sun & Moon position & appearance based on theme
    if (mode === 'day') {
      sunGroup.visible = true
      sunGroup.position.set(160, 210, 160)
      sunCoreMat.color.setHex(0xfffbeb)
      sunHaloMat.color.setHex(0xfef08a)
      sunHaloMat.opacity = 0.45
      sunHalo.lookAt(0, 50, 0)

      moonGroup.visible = false
      starMat.opacity = 0.0

      cloudMat.color.setHex(0xffffff)
      cloudMat.opacity = 0.88
      contrailMat.color.setHex(0xffffff)
      contrailMat.opacity = 0.55
      birdsGroup.visible = true
    } else if (mode === 'sunset') {
      sunGroup.visible = true
      sunGroup.position.set(210, 48, 130)
      sunCoreMat.color.setHex(0xfef08a)
      sunHaloMat.color.setHex(0xf97316)
      sunHaloMat.opacity = 0.75
      sunHalo.lookAt(0, 20, 0)

      moonGroup.visible = true
      moonGroup.position.set(-180, 140, -180)
      moonMat.color.setHex(0xfef3c7)
      moonHaloMat.opacity = 0.35
      moonHalo.lookAt(0, 30, 0)

      starMat.opacity = 0.45

      // Fiery peach/rose twilight clouds
      cloudMat.color.setHex(0xfda4af)
      cloudMat.opacity = 0.92
      contrailMat.color.setHex(0xfed7aa)
      contrailMat.opacity = 0.65
      birdsGroup.visible = true
    } else if (mode === 'night') {
      sunGroup.visible = false

      moonGroup.visible = true
      moonGroup.position.set(-150, 195, -150)
      moonMat.color.setHex(0xffffff)
      moonHaloMat.color.setHex(0x93c5fd)
      moonHaloMat.opacity = 0.65
      moonHalo.lookAt(0, 40, 0)

      // Twinkling Starfield
      starMat.opacity = 0.92
      starMat.size = 2.2 + Math.sin(elapsed * 4.0) * 0.4

      // Deep night clouds with moonlight tint
      cloudMat.color.setHex(0x334155)
      cloudMat.opacity = 0.6
      contrailMat.color.setHex(0x64748b)
      contrailMat.opacity = 0.3
      birdsGroup.visible = false

      // Shooting star trigger
      meteorTimer += delta
      if (!meteorActive && meteorTimer > 6.0 && Math.random() < 0.02) {
        meteorActive = true
        meteorProgress = 0
        meteor.position.set((Math.random() - 0.5) * 150, 160 + Math.random() * 40, (Math.random() - 0.5) * 150)
        meteorMat.opacity = 1.0
      }

      if (meteorActive) {
        meteorProgress += delta * 1.8
        meteor.position.x += delta * 95
        meteor.position.y -= delta * 55
        meteor.position.z += delta * 35
        meteorMat.opacity = Math.max(0, 1.0 - meteorProgress)
        if (meteorProgress >= 1.0) {
          meteorActive = false
          meteorTimer = 0
          meteorMat.opacity = 0.0
        }
      }
    } else if (mode === 'morning') {
      sunGroup.visible = true
      sunGroup.position.set(-180, 65, 140)
      sunCoreMat.color.setHex(0xfef08a)
      sunHaloMat.color.setHex(0xfbcfe8)
      sunHaloMat.opacity = 0.55
      sunHalo.lookAt(0, 25, 0)

      moonGroup.visible = false
      starMat.opacity = 0.15

      // Morning pastel gold/rose clouds
      cloudMat.color.setHex(0xfef08a)
      cloudMat.opacity = 0.85
      contrailMat.color.setHex(0xfde68a)
      contrailMat.opacity = 0.5
      birdsGroup.visible = true
    }

    // B. Clouds Drifting Animation
    cloudsList.forEach((c) => {
      c.group.position.x += c.speed * delta
      if (c.group.position.x > 220) {
        c.group.position.x = -220
      }
    })

    // C. Airplane Flight & Strobe Lights
    planeGroup.position.x += 18.0 * delta
    planeGroup.position.z += 9.5 * delta
    if (planeGroup.position.x > 260) {
      planeGroup.position.x = -260
      planeGroup.position.z = -140
    }

    const strobeBlink = (Math.sin(elapsed * 10.0) + 1) / 2 > 0.65
    planeStrobeWhiteMat.opacity = strobeBlink ? 1.0 : 0.1
    planeStrobeRedMat.opacity = strobeBlink ? 1.0 : 0.1

    // D. Bird Flock Circling & Wing Flapping
    birdFlockAngle += delta * 0.18
    birdsGroup.position.x = Math.sin(birdFlockAngle) * 75
    birdsGroup.position.z = Math.cos(birdFlockAngle) * 75
    birdsGroup.rotation.y = birdFlockAngle + Math.PI / 2

    birdsList.forEach((bird) => {
      const flap = Math.sin(elapsed * 12.0 + bird.phase) * 0.55
      bird.wingL.rotation.z = flap
      bird.wingR.rotation.z = -flap
    })
  }

  return {
    skyGroup,
    update,
  }
}
