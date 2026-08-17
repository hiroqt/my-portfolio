import * as THREE from 'three'

export interface TreesController {
  group: THREE.Group
  update: (delta: number, elapsed: number) => void
}

export function createCityTrees(): TreesController {
  const treesGroup = new THREE.Group()
  const swayingTrees: { fronds: THREE.Group; baseRot: number; speed: number }[] = []

  // 1. Natural Materials
  const palmTrunkMat = new THREE.MeshStandardMaterial({
    color: 0x5c4033,
    roughness: 0.85,
    metalness: 0.05,
  })

  const palmFrondMat = new THREE.MeshStandardMaterial({
    color: 0x2e7d32,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide,
  })

  const palmFrondLightMat = new THREE.MeshStandardMaterial({
    color: 0x43a047,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide,
  })

  const oakTrunkMat = new THREE.MeshStandardMaterial({
    color: 0x3e2723,
    roughness: 0.9,
    metalness: 0.05,
  })

  const oakFoliageMat1 = new THREE.MeshStandardMaterial({
    color: 0x388e3c,
    roughness: 0.7,
    metalness: 0.05,
    flatShading: true,
  })

  const oakFoliageMat2 = new THREE.MeshStandardMaterial({
    color: 0x2e7d32,
    roughness: 0.7,
    metalness: 0.05,
    flatShading: true,
  })

  const grateMat = new THREE.MeshStandardMaterial({
    color: 0x1f2937,
    roughness: 0.8,
    metalness: 0.6,
  })

  const soilMat = new THREE.MeshStandardMaterial({
    color: 0x261c14,
    roughness: 0.95,
  })

  const benchWoodMat = new THREE.MeshStandardMaterial({
    color: 0x6d4c41,
    roughness: 0.7,
  })

  const benchIronMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.3,
  })

  // Function to create a Realistic LA Fan Palm Tree
  function createLAPalmTree(): THREE.Group {
    const palm = new THREE.Group()

    // Curved slender trunk
    const curvePoints = []
    const height = 9.0 + Math.random() * 2.5
    const lean = (Math.random() - 0.5) * 1.4

    curvePoints.push(new THREE.Vector3(0, 0, 0))
    curvePoints.push(new THREE.Vector3(lean * 0.3, height * 0.4, 0))
    curvePoints.push(new THREE.Vector3(lean, height, 0))

    const curve = new THREE.CatmullRomCurve3(curvePoints)
    const trunkGeo = new THREE.TubeGeometry(curve, 16, 0.22, 8, false)
    const trunk = new THREE.Mesh(trunkGeo, palmTrunkMat)
    trunk.castShadow = true
    palm.add(trunk)

    // Palm Crown Fronds
    const frondsGroup = new THREE.Group()
    frondsGroup.position.set(lean, height, 0)

    const numFronds = 14
    for (let i = 0; i < numFronds; i++) {
      const angle = (i / numFronds) * Math.PI * 2
      const frondGeo = new THREE.PlaneGeometry(0.7, 3.2, 2, 4)
      frondGeo.translate(0, 1.5, 0)
      frondGeo.rotateZ(-Math.PI / 3)

      const frondMesh = new THREE.Mesh(frondGeo, i % 2 === 0 ? palmFrondMat : palmFrondLightMat)
      frondMesh.rotation.y = angle
      frondMesh.rotation.x = Math.PI / 4 + Math.random() * 0.2
      frondMesh.castShadow = true
      frondsGroup.add(frondMesh)
    }

    // Top crown bud
    const bud = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), palmFrondMat)
    frondsGroup.add(bud)

    palm.add(frondsGroup)
    swayingTrees.push({ fronds: frondsGroup, baseRot: frondsGroup.rotation.y, speed: 1.0 + Math.random() * 0.5 })

    // Sidewalk Cast-Iron Tree Grate
    const grateGeo = new THREE.BoxGeometry(1.6, 0.04, 1.6)
    const grate = new THREE.Mesh(grateGeo, grateMat)
    grate.position.y = 0.02
    grate.receiveShadow = true
    palm.add(grate)

    const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.05, 12), soilMat)
    soil.position.y = 0.025
    palm.add(soil)

    return palm
  }

  // Function to create a Natural NYC Central Park Maple / Oak Tree
  function createNYCOakTree(): THREE.Group {
    const tree = new THREE.Group()

    // Main Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.24, 0.4, 3.2, 8)
    const trunk = new THREE.Mesh(trunkGeo, oakTrunkMat)
    trunk.position.y = 1.6
    trunk.castShadow = true
    tree.add(trunk)

    // Branches & Foliage Clumps
    const foliageGroup = new THREE.Group()
    foliageGroup.position.y = 3.6

    const clumps = [
      { x: 0, y: 0.8, z: 0, r: 1.8, mat: oakFoliageMat1 },
      { x: 1.1, y: 0.2, z: 0.5, r: 1.4, mat: oakFoliageMat2 },
      { x: -1.0, y: 0.4, z: -0.4, r: 1.5, mat: oakFoliageMat1 },
      { x: 0.4, y: 0.3, z: -1.0, r: 1.3, mat: oakFoliageMat2 },
      { x: -0.3, y: 1.8, z: 0.3, r: 1.2, mat: oakFoliageMat1 },
    ]

    clumps.forEach(({ x, y, z, r, mat }) => {
      const clumpGeo = new THREE.DodecahedronGeometry(r, 1)
      const clump = new THREE.Mesh(clumpGeo, mat)
      clump.position.set(x, y, z)
      clump.castShadow = true
      foliageGroup.add(clump)
    })

    tree.add(foliageGroup)

    // Tree Grate Base
    const grate = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 1.8), grateMat)
    grate.position.y = 0.02
    grate.receiveShadow = true
    tree.add(grate)

    const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.05, 12), soilMat)
    soil.position.y = 0.025
    tree.add(soil)

    return tree
  }

  // Function to create a Wooden Park Bench
  function createParkBench(): THREE.Group {
    const bench = new THREE.Group()

    // Slats
    const slatGeo = new THREE.BoxGeometry(2.0, 0.08, 0.18)
    for (let s = 0; s < 3; s++) {
      const seatSlat = new THREE.Mesh(slatGeo, benchWoodMat)
      seatSlat.position.set(0, 0.5, s * 0.2 - 0.2)
      bench.add(seatSlat)
    }

    const backGeo = new THREE.BoxGeometry(2.0, 0.18, 0.08)
    for (let b = 0; b < 2; b++) {
      const backSlat = new THREE.Mesh(backGeo, benchWoodMat)
      backSlat.position.set(0, 0.8 + b * 0.22, -0.32)
      bench.add(backSlat)
    }

    // Cast-iron legs
    const legGeo = new THREE.BoxGeometry(0.08, 0.5, 0.6)
    const leg1 = new THREE.Mesh(legGeo, benchIronMat)
    leg1.position.set(-0.8, 0.25, 0)
    bench.add(leg1)

    const leg2 = new THREE.Mesh(legGeo, benchIronMat)
    leg2.position.set(0.8, 0.25, 0)
    bench.add(leg2)

    return bench
  }

  // 2. Populate Trees & Benches along Sidewalks and Central Plaza Park
  // Central Plaza Park Garden Lawn
  const lawnGeo = new THREE.CircleGeometry(7.2, 32)
  const lawnMat = new THREE.MeshStandardMaterial({
    color: 0x2e7d32,
    roughness: 0.9,
  })
  const lawn = new THREE.Mesh(lawnGeo, lawnMat)
  lawn.rotation.x = -Math.PI / 2
  lawn.position.set(0, 0.25, 0)
  lawn.receiveShadow = true
  treesGroup.add(lawn)

  // Plaza Perimeter Palm & Oak Trees
  const plazaCount = 8
  const plazaRadius = 6.5
  for (let i = 0; i < plazaCount; i++) {
    const angle = (i / plazaCount) * Math.PI * 2
    const tx = Math.cos(angle) * plazaRadius
    const tz = Math.sin(angle) * plazaRadius

    const tree = i % 2 === 0 ? createLAPalmTree() : createNYCOakTree()
    tree.position.set(tx, 0.25, tz)
    tree.scale.set(0.7, 0.7, 0.7)
    treesGroup.add(tree)
  }

  // Plaza Park Benches
  const benchAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4]
  benchAngles.forEach((ang) => {
    const bx = Math.cos(ang) * 4.8
    const bz = Math.sin(ang) * 4.8
    const bench = createParkBench()
    bench.position.set(bx, 0.25, bz)
    bench.rotation.y = -ang + Math.PI / 2
    treesGroup.add(bench)
  })

  // Sidewalk Trees along Main Avenues (LA Palms & NYC Oaks)
  const roadPositions = [-36, 0, 36]
  const sidewalkOffsets = [-6.2, 6.2]

  roadPositions.forEach((rx) => {
    sidewalkOffsets.forEach((ox) => {
      for (let z = -52; z <= 52; z += 16) {
        if (Math.abs(rx + ox) < 10 && Math.abs(z) < 10) continue

        const isPalm = Math.abs(rx) > 20
        const tree = isPalm ? createLAPalmTree() : createNYCOakTree()
        tree.position.set(rx + ox, 0.05, z)
        tree.scale.set(0.75, 0.75, 0.75)
        treesGroup.add(tree)

        // Add occasional sidewalk bench
        if (Math.abs(z) % 32 === 0) {
          const bench = createParkBench()
          bench.position.set(rx + (ox > 0 ? ox + 1.2 : ox - 1.2), 0.05, z + 4)
          bench.rotation.y = ox > 0 ? -Math.PI / 2 : Math.PI / 2
          bench.scale.set(0.8, 0.8, 0.8)
          treesGroup.add(bench)
        }
      }
    })
  })

  // Cross Street Sidewalk Trees
  roadPositions.forEach((rz) => {
    sidewalkOffsets.forEach((oz) => {
      for (let x = -52; x <= 52; x += 16) {
        if (Math.abs(x) < 10 && Math.abs(rz + oz) < 10) continue

        const tree = createLAPalmTree()
        tree.position.set(x, 0.05, rz + oz)
        tree.scale.set(0.75, 0.75, 0.75)
        treesGroup.add(tree)
      }
    })
  })

  // 3. Update Loop
  const update = (delta: number, elapsed: number) => {
    // Natural gentle wind sway on palm fronds
    swayingTrees.forEach((p, idx) => {
      p.fronds.rotation.z = Math.sin(elapsed * p.speed + idx) * 0.06
      p.fronds.rotation.x = Math.cos(elapsed * p.speed * 0.8 + idx) * 0.04
    })
  }

  return {
    group: treesGroup,
    update,
  }
}
