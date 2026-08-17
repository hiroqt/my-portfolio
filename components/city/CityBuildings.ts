import * as THREE from 'three'

export interface ContributionDay {
  date: string
  contributionCount: number
}

export interface BuildingData {
  id: string
  date: string
  commits: number
  height: number
  tier: number
  repoName?: string
  subtitle?: string
  projectSlug?: string
  isLandmark?: boolean
  logoPath?: string
  position: { x: number; y: number; z: number }
  mesh: THREE.Mesh | THREE.Group
}

export interface CityBuildingsController {
  group: THREE.Group
  interactiveMeshes: THREE.Mesh[]
  buildingsData: Map<string, BuildingData>
  update: (delta: number, elapsed: number) => void
  setNightMode: (isNight: boolean, mode: 'day' | 'sunset' | 'night' | 'morning') => void
  setThemeColor: (color: number) => void
}

// Generate realistic architectural window texture where lit window density and brightness map to commit count
function createCommitWindowTexture(commits: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 1024
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Tinted architectural glass base
    ctx.fillStyle = '#141c2b'
    ctx.fillRect(0, 0, 512, 1024)

    const cols = 10
    const rows = 32
    const cellW = 512 / cols
    const cellH = 1024 / rows

    const litRatio = Math.min(0.94, Math.max(0.12, 0.12 + (commits / 12) * 0.82))

    for (let r = 0; r < rows; r++) {
      if (r >= rows - 3) {
        ctx.fillStyle = commits > 3 ? 'rgba(254, 240, 138, 0.95)' : 'rgba(254, 240, 138, 0.5)'
        ctx.fillRect(0, r * cellH, 512, cellH)

        ctx.fillStyle = '#1e293b'
        for (let c = 0; c <= cols; c++) {
          ctx.fillRect(c * cellW - 3, r * cellH, 6, cellH)
        }
        continue
      }

      if (r % 4 === 0) {
        ctx.fillStyle = '#334155'
        ctx.fillRect(0, r * cellH, 512, 5)
      }

      for (let c = 0; c < cols; c++) {
        ctx.strokeStyle = '#0a0f1d'
        ctx.lineWidth = 2
        ctx.strokeRect(c * cellW + 3, r * cellH + 3, cellW - 6, cellH - 6)

        const isLit = Math.random() < litRatio
        if (isLit) {
          const rand = Math.random()
          if (commits >= 8) {
            if (rand > 0.6) {
              ctx.fillStyle = '#fef08a'
            } else if (rand > 0.3) {
              ctx.fillStyle = '#fde047'
            } else {
              ctx.fillStyle = '#ffffff'
            }
          } else if (commits >= 3) {
            if (rand > 0.5) {
              ctx.fillStyle = '#fef08a'
            } else {
              ctx.fillStyle = '#fed7aa'
            }
          } else {
            ctx.fillStyle = 'rgba(254, 215, 170, 0.65)'
          }
          ctx.fillRect(c * cellW + 4, r * cellH + 4, cellW - 8, cellH - 8)
        } else {
          ctx.fillStyle = '#0f172a'
          ctx.fillRect(c * cellW + 4, r * cellH + 4, cellW - 8, cellH - 8)
        }
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 4)
  return texture
}

export function createCityBuildings(contributions: ContributionDay[] = []): CityBuildingsController {
  const cityGroup = new THREE.Group()
  const interactiveMeshes: THREE.Mesh[] = []
  const buildingsData = new Map<string, BuildingData>()
  const beaconLights: { mesh: THREE.Mesh; phase: number }[] = []
  const landmarkSigns: THREE.Mesh[] = []

  // 1. Shared Window Textures (5 Tiers)
  const textureTiers: THREE.CanvasTexture[] = []
  if (typeof window !== 'undefined') {
    textureTiers.push(createCommitWindowTexture(1))
    textureTiers.push(createCommitWindowTexture(4))
    textureTiers.push(createCommitWindowTexture(7))
    textureTiers.push(createCommitWindowTexture(10))
    textureTiers.push(createCommitWindowTexture(15))
  }

  // 2. Shared High-Performance Materials (5 Tiers instead of 200 individual instances)
  const tierMaterials = [
    new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.18,
      metalness: 0.82,
      map: textureTiers[0] || undefined,
      emissiveMap: textureTiers[0] || undefined,
      emissive: new THREE.Color(0xfef08a),
      emissiveIntensity: 0.15,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.18,
      metalness: 0.82,
      map: textureTiers[1] || undefined,
      emissiveMap: textureTiers[1] || undefined,
      emissive: new THREE.Color(0xfef08a),
      emissiveIntensity: 0.22,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.18,
      metalness: 0.82,
      map: textureTiers[2] || undefined,
      emissiveMap: textureTiers[2] || undefined,
      emissive: new THREE.Color(0xfef08a),
      emissiveIntensity: 0.30,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.18,
      metalness: 0.82,
      map: textureTiers[3] || undefined,
      emissiveMap: textureTiers[3] || undefined,
      emissive: new THREE.Color(0xfef08a),
      emissiveIntensity: 0.38,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.18,
      metalness: 0.82,
      map: textureTiers[4] || undefined,
      emissiveMap: textureTiers[4] || undefined,
      emissive: new THREE.Color(0xfef08a),
      emissiveIntensity: 0.45,
    }),
  ]

  const landmarkRepos = [
    {
      name: 'HiveSync Tower',
      subtitle: 'Realtime Multi-Workspace Collaboration Suite',
      projectSlug: 'hivesync',
      logo: '/images/hivesync.png',
      height: 48,
      tint: 0x0284c7,
      facade: 0x334155,
      x: -20,
      z: -20,
    },
    {
      name: 'Tearsizes Center',
      subtitle: 'Fashion E-Commerce & Retail Commerce Engine',
      projectSlug: 'tearsizes',
      logo: '/images/tearsize.png',
      height: 44,
      tint: 0xd97706,
      facade: 0x475569,
      x: 20,
      z: -20,
    },
    {
      name: 'PCAE-Mentor Plaza',
      subtitle: 'AI Education & Intelligent Learning Portal',
      projectSlug: 'pcaementor',
      logo: '/images/pcaementor.png',
      height: 52,
      tint: 0x059669,
      facade: 0x1e293b,
      x: -20,
      z: 20,
    },
    {
      name: 'VCM Building',
      subtitle: 'Native Desktop Workflow & Media Suite',
      projectSlug: 'vcm',
      logo: '/images/vcm.png',
      height: 40,
      tint: 0x2563eb,
      facade: 0x334155,
      x: 20,
      z: 20,
    },
    {
      name: 'E-Gov Public Center',
      subtitle: 'Philippine Public Digital Portal Services',
      projectSlug: 'egov',
      logo: '/images/egov.png',
      height: 46,
      tint: 0x0d9488,
      facade: 0x1e293b,
      x: -36,
      z: 20,
    },
    {
      name: 'PresentPO Financial Tower',
      subtitle: 'Automated Purchase Order & Invoice Workflow',
      projectSlug: 'presentpo',
      logo: '/images/presentpo.png',
      height: 42,
      tint: 0x7c3aed,
      facade: 0x334155,
      x: 36,
      z: -20,
    },
    {
      name: 'TMRC Technology Plaza',
      subtitle: 'Enterprise Inventory Management System',
      projectSlug: 'tmrc',
      logo: '/images/tmrc.png',
      height: 38,
      tint: 0xe11d48,
      facade: 0x475569,
      x: 36,
      z: 20,
    },
  ]

  // Shared Static Materials
  const limestoneMaterial = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.8,
    metalness: 0.1,
  })

  const roofMaterial = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.7,
    metalness: 0.4,
  })

  const cedarWaterTankMat = new THREE.MeshStandardMaterial({
    color: 0x78350f,
    roughness: 0.85,
  })

  const tankSteelMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.85,
    roughness: 0.3,
  })

  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 })
  const spireMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.92, roughness: 0.2 })

  // Shared Rooftop Geometries (Eliminates redundant allocations)
  const legGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.6, 5)
  const barrelGeo = new THREE.CylinderGeometry(0.9, 0.9, 1.4, 12)
  const tankRoofGeo = new THREE.ConeGeometry(1.05, 0.7, 12)
  const beaconGeo = new THREE.SphereGeometry(0.22, 6, 6)
  const spireGeo = new THREE.CylinderGeometry(0.06, 0.25, 6.0, 6)

  function createNYCWaterTank(): THREE.Group {
    const tank = new THREE.Group()
    const offsets = [
      [-0.6, 0.8, -0.6],
      [0.6, 0.8, -0.6],
      [-0.6, 0.8, 0.6],
      [0.6, 0.8, 0.6],
    ]
    offsets.forEach(([lx, ly, lz]) => {
      const leg = new THREE.Mesh(legGeo, tankSteelMat)
      leg.position.set(lx, ly, lz)
      tank.add(leg)
    })

    const barrel = new THREE.Mesh(barrelGeo, cedarWaterTankMat)
    barrel.position.y = 2.3
    barrel.castShadow = true
    tank.add(barrel)

    const roof = new THREE.Mesh(tankRoofGeo, tankSteelMat)
    roof.position.y = 3.35
    roof.castShadow = true
    tank.add(roof)

    return tank
  }

  const textureLoader = new THREE.TextureLoader()
  const projectTextures = new Map<string, THREE.Texture>()

  landmarkRepos.forEach((repo) => {
    try {
      const tex = textureLoader.load(repo.logo)
      projectTextures.set(repo.logo, tex)
    } catch {
      // ignore
    }
  })

  const daysData: ContributionDay[] = [...contributions]
  if (daysData.length < 140) {
    const today = new Date()
    for (let i = 0; i < 200; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const count = Math.floor(Math.random() * 12 * Math.sin(i / 10 + 1) + (i % 7 === 0 ? 9 : 2))
      daysData.push({
        date: d.toISOString().split('T')[0],
        contributionCount: Math.max(0, count),
      })
    }
  }

  const gridSize = 14
  const spacing = 7.5
  const halfGrid = (gridSize * spacing) / 2

  let dayIndex = 0

  const sharedTrimGeo = new THREE.BoxGeometry(spacing * 0.7 * 1.02, 0.35, spacing * 0.7 * 1.02)
  const sharedHvacGeo = new THREE.BoxGeometry(spacing * 0.7 * 0.35, 0.7, spacing * 0.7 * 0.35)

  for (let gx = 0; gx < gridSize; gx++) {
    for (let gz = 0; gz < gridSize; gz++) {
      const x = gx * spacing - halfGrid
      const z = gz * spacing - halfGrid

      if (Math.abs(x) < 9 && Math.abs(z) < 9) continue

      if (
        Math.abs(x) < 2.5 ||
        Math.abs(z) < 2.5 ||
        Math.abs(x - 36) < 2.5 ||
        Math.abs(x + 36) < 2.5 ||
        Math.abs(z - 36) < 2.5 ||
        Math.abs(z + 36) < 2.5
      ) {
        continue
      }

      const day = daysData[dayIndex % daysData.length]
      dayIndex++

      const commits = day ? day.contributionCount : Math.floor(Math.random() * 8)
      const dateStr = day ? day.date : `Day ${dayIndex}`

      const baseHeight = 5.0 + commits * 3.5 + (Math.sin(gx * 0.7 + gz * 0.4) + 1) * 2.5
      const height = Math.min(44, Math.max(5.0, baseHeight))
      const width = spacing * 0.7
      const depth = spacing * 0.7

      const buildingGroup = new THREE.Group()
      buildingGroup.position.set(x, 0, z)

      const tierIdx = commits >= 12 ? 4 : commits >= 9 ? 3 : commits >= 6 ? 2 : commits >= 3 ? 1 : 0
      const mat = tierMaterials[tierIdx]

      const buildingGeo = new THREE.BoxGeometry(width, height, depth)
      const buildingMesh = new THREE.Mesh(buildingGeo, mat)
      buildingMesh.position.y = height / 2
      buildingMesh.castShadow = true
      buildingMesh.receiveShadow = true
      buildingGroup.add(buildingMesh)

      const trimMesh = new THREE.Mesh(sharedTrimGeo, limestoneMaterial)
      trimMesh.position.y = height
      buildingGroup.add(trimMesh)

      const buildingId = `bldg-${gx}-${gz}`
      buildingMesh.userData = {
        id: buildingId,
        date: dateStr,
        commits: commits,
        height: height,
        position: { x, y: height / 2, z },
        isBuilding: true,
      }
      interactiveMeshes.push(buildingMesh)
      buildingsData.set(buildingId, {
        id: buildingId,
        date: dateStr,
        commits: commits,
        height: height,
        tier: commits > 6 ? 3 : commits > 2 ? 2 : 1,
        position: { x, y: height / 2, z },
        mesh: buildingMesh,
      })

      if (height > 18) {
        const tierHeight = height * 0.35
        const tierWidth = width * 0.75
        const tierGeo = new THREE.BoxGeometry(tierWidth, tierHeight, depth * 0.75)
        const tierMesh = new THREE.Mesh(tierGeo, mat)
        tierMesh.position.y = height + tierHeight / 2
        tierMesh.castShadow = true
        buildingGroup.add(tierMesh)

        if (height > 25) {
          const spire = new THREE.Mesh(spireGeo, spireMat)
          spire.position.y = height + tierHeight + 3.0
          buildingGroup.add(spire)

          const beacon = new THREE.Mesh(beaconGeo, beaconMat)
          beacon.position.y = height + tierHeight + 6.0
          buildingGroup.add(beacon)
          beaconLights.push({ mesh: beacon, phase: Math.random() * Math.PI * 2 })
        }
      } else {
        if ((gx + gz) % 2 === 0) {
          const waterTank = createNYCWaterTank()
          waterTank.position.set(width * 0.15, height, depth * 0.15)
          waterTank.scale.set(0.7, 0.7, 0.7)
          buildingGroup.add(waterTank)
        }

        const hvac = new THREE.Mesh(sharedHvacGeo, roofMaterial)
        hvac.position.set(-width * 0.18, height + 0.35, -depth * 0.18)
        buildingGroup.add(hvac)
      }

      cityGroup.add(buildingGroup)
    }
  }

  // Landmark Corporate Headquarters Towers
  const landmarkMaterials: THREE.MeshStandardMaterial[] = []

  landmarkRepos.forEach((repo, idx) => {
    const landmarkGroup = new THREE.Group()
    landmarkGroup.position.set(repo.x, 0, repo.z)

    const lWidth = 7.2
    const lHeight = repo.height
    const lDepth = 7.2

    const landmarkTex = textureTiers[4] || null
    const lMat = new THREE.MeshStandardMaterial({
      color: repo.tint,
      roughness: 0.12,
      metalness: 0.9,
      map: landmarkTex || undefined,
      emissiveMap: landmarkTex || undefined,
      emissive: new THREE.Color(0xfef08a),
      emissiveIntensity: 0.45,
    })
    landmarkMaterials.push(lMat)

    const landmarkMesh = new THREE.Mesh(new THREE.BoxGeometry(lWidth, lHeight, lDepth), lMat)
    landmarkMesh.position.y = lHeight / 2
    landmarkMesh.castShadow = true
    landmarkGroup.add(landmarkMesh)

    const colGeo = new THREE.BoxGeometry(0.4, lHeight, 0.4)
    const colMat = new THREE.MeshStandardMaterial({ color: repo.facade, roughness: 0.7 })
    const colPositions = [
      [-lWidth / 2, lHeight / 2, -lDepth / 2],
      [lWidth / 2, lHeight / 2, -lDepth / 2],
      [-lWidth / 2, lHeight / 2, lDepth / 2],
      [lWidth / 2, lHeight / 2, lDepth / 2],
    ]
    colPositions.forEach(([cx, cy, cz]) => {
      const col = new THREE.Mesh(colGeo, colMat)
      col.position.set(cx, cy, cz)
      landmarkGroup.add(col)
    })

    const landmarkId = `landmark-${idx}`
    landmarkMesh.userData = {
      id: landmarkId,
      repoName: repo.name,
      subtitle: repo.subtitle,
      projectSlug: repo.projectSlug,
      commits: 45 + idx * 15,
      height: lHeight,
      position: { x: repo.x, y: lHeight / 2, z: repo.z },
      isLandmark: true,
      logoPath: repo.logo,
    }
    interactiveMeshes.push(landmarkMesh)
    buildingsData.set(landmarkId, {
      id: landmarkId,
      date: 'Flagship Platform',
      commits: 45 + idx * 15,
      height: lHeight,
      tier: 4,
      repoName: repo.name,
      subtitle: repo.subtitle,
      projectSlug: repo.projectSlug,
      position: { x: repo.x, y: lHeight / 2, z: repo.z },
      isLandmark: true,
      logoPath: repo.logo,
      mesh: landmarkMesh,
    })

    const logoTex = projectTextures.get(repo.logo)
    if (logoTex) {
      const signFrameGeo = new THREE.BoxGeometry(6.0, 3.6, 0.2)
      const signFrameMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.85,
        roughness: 0.25,
      })
      const signFrame = new THREE.Mesh(signFrameGeo, signFrameMat)
      signFrame.position.set(0, lHeight * 0.65, lDepth / 2 + 0.15)
      landmarkGroup.add(signFrame)

      const signGeo = new THREE.PlaneGeometry(5.6, 3.2)
      const signMat = new THREE.MeshBasicMaterial({
        map: logoTex,
        transparent: true,
        side: THREE.DoubleSide,
      })
      const signMesh = new THREE.Mesh(signGeo, signMat)
      signMesh.position.set(0, 0, 0.12)
      signFrame.add(signMesh)
      landmarkSigns.push(signMesh)

      const signFrameRear = signFrame.clone()
      signFrameRear.position.set(0, lHeight * 0.65, -lDepth / 2 - 0.15)
      signFrameRear.rotation.y = Math.PI
      landmarkGroup.add(signFrameRear)
    }

    const crownGeo = new THREE.ConeGeometry(2.4, 9.0, 4)
    crownGeo.rotateY(Math.PI / 4)
    const crownMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.92,
      roughness: 0.18,
    })
    const crown = new THREE.Mesh(crownGeo, crownMat)
    crown.position.y = lHeight + 4.5
    landmarkGroup.add(crown)

    const beacon = new THREE.Mesh(beaconGeo, beaconMat)
    beacon.position.y = lHeight + 9.2
    landmarkGroup.add(beacon)
    beaconLights.push({ mesh: beacon, phase: idx * 1.5 })

    cityGroup.add(landmarkGroup)
  })

  const update = (delta: number, elapsed: number) => {
    beaconLights.forEach((b) => {
      const intensity = (Math.sin(elapsed * 3.5 + b.phase) + 1) / 2
      if (b.mesh.material instanceof THREE.MeshBasicMaterial) {
        b.mesh.material.color.setRGB(1.0, intensity > 0.6 ? 0.3 : 0.0, intensity > 0.6 ? 0.3 : 0.0)
      }
    })
  }

  // Fast theme updater (updates 5 tier materials and landmark materials in O(1))
  const setNightMode = (isNight: boolean, mode: 'day' | 'sunset' | 'night' | 'morning') => {
    tierMaterials.forEach((mat, idx) => {
      const commits = idx * 3.5
      if (mode === 'night') {
        const commitGlow = Math.min(2.0, (commits / 10) * 1.6)
        mat.emissiveIntensity = 0.4 + commitGlow
        mat.emissive.setHex(commits >= 8 ? 0xfef08a : 0xfde047)
      } else if (mode === 'sunset') {
        const commitGlow = Math.min(1.2, (commits / 10) * 0.9)
        mat.emissiveIntensity = 0.3 + commitGlow
        mat.emissive.setHex(0xfba257)
      } else if (mode === 'morning') {
        const commitGlow = Math.min(0.8, (commits / 10) * 0.5)
        mat.emissiveIntensity = 0.2 + commitGlow
        mat.emissive.setHex(0xfef9c3)
      } else {
        mat.emissiveIntensity = 0.15 + (commits / 15) * 0.3
        mat.emissive.setHex(0xfef08a)
      }
    })

    landmarkMaterials.forEach((mat) => {
      if (mode === 'night') {
        mat.emissiveIntensity = 2.2
        mat.emissive.setHex(0xfef08a)
      } else if (mode === 'sunset') {
        mat.emissiveIntensity = 1.4
        mat.emissive.setHex(0xfba257)
      } else if (mode === 'morning') {
        mat.emissiveIntensity = 0.8
        mat.emissive.setHex(0xfef9c3)
      } else {
        mat.emissiveIntensity = 0.45
        mat.emissive.setHex(0xfef08a)
      }
    })
  }

  const setThemeColor = () => {
    // Theme setter
  }

  return {
    group: cityGroup,
    interactiveMeshes,
    buildingsData,
    update,
    setNightMode,
    setThemeColor,
  }
}
