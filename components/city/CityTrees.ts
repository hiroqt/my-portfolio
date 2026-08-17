import * as THREE from 'three'

export interface TreesController {
  group: THREE.Group
  update: (delta: number, elapsed: number) => void
}

export function createCityTrees(): TreesController {
  const treesGroup = new THREE.Group()
  const swayingTrees: { fronds: THREE.Group; baseRot: number; speed: number }[] = []

  // 1. Shared Natural Materials
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

  // 2. Pre-Allocated Shared Geometries (Eliminates hundreds of redundant allocations)
  const sharedFrondGeo = new THREE.PlaneGeometry(0.7, 3.2, 1, 3)
  sharedFrondGeo.translate(0, 1.5, 0)
  sharedFrondGeo.rotateZ(-Math.PI / 3)

  const sharedBudGeo = new THREE.SphereGeometry(0.35, 6, 6)
  const sharedGrateGeo = new THREE.BoxGeometry(1.6, 0.04, 1.6)
  const sharedSoilGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 8)

  const sharedOakTrunkGeo = new THREE.CylinderGeometry(0.24, 0.4, 3.2, 7)
  const sharedOakClumpGeo1 = new THREE.IcosahedronGeometry(1.6, 1)
  const sharedOakClumpGeo2 = new THREE.IcosahedronGeometry(1.2, 1)

  const sharedBenchSeatGeo = new THREE.BoxGeometry(2.4, 0.08, 0.6)
  const sharedBenchBackGeo = new THREE.BoxGeometry(2.4, 0.4, 0.06)
  const sharedBenchLegGeo = new THREE.BoxGeometry(0.08, 0.5, 0.6)

  // Standard Palm Trunk Geometry
  const palmCurvePoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.25, 4.0, 0),
    new THREE.Vector3(0.65, 9.5, 0),
  ]
  const sharedPalmCurve = new THREE.CatmullRomCurve3(palmCurvePoints)
  const sharedPalmTrunkGeo = new THREE.TubeGeometry(sharedPalmCurve, 8, 0.22, 6, false)

  function createLAPalmTree(): THREE.Group {
    const palm = new THREE.Group()

    const trunk = new THREE.Mesh(sharedPalmTrunkGeo, palmTrunkMat)
    trunk.castShadow = true
    palm.add(trunk)

    // Palm Crown Fronds (Shared Geometry)
    const frondsGroup = new THREE.Group()
    frondsGroup.position.set(0.65, 9.5, 0)

    const numFronds = 10
    for (let i = 0; i < numFronds; i++) {
      const angle = (i / numFronds) * Math.PI * 2
      const frondMesh = new THREE.Mesh(sharedFrondGeo, i % 2 === 0 ? palmFrondMat : palmFrondLightMat)
      frondMesh.rotation.y = angle
      frondMesh.rotation.x = Math.PI / 4
      frondMesh.castShadow = true
      frondsGroup.add(frondMesh)
    }

    const bud = new THREE.Mesh(sharedBudGeo, palmFrondMat)
    frondsGroup.add(bud)

    palm.add(frondsGroup)
    swayingTrees.push({ fronds: frondsGroup, baseRot: frondsGroup.rotation.y, speed: 1.0 + Math.random() * 0.4 })

    const grate = new THREE.Mesh(sharedGrateGeo, grateMat)
    grate.position.y = 0.02
    palm.add(grate)

    const soil = new THREE.Mesh(sharedSoilGeo, soilMat)
    soil.position.y = 0.025
    palm.add(soil)

    return palm
  }

  function createNYCOakTree(): THREE.Group {
    const tree = new THREE.Group()

    const trunk = new THREE.Mesh(sharedOakTrunkGeo, oakTrunkMat)
    trunk.position.y = 1.6
    trunk.castShadow = true
    tree.add(trunk)

    const foliageGroup = new THREE.Group()
    foliageGroup.position.y = 3.6

    const clump1 = new THREE.Mesh(sharedOakClumpGeo1, oakFoliageMat1)
    clump1.position.set(0, 0.8, 0)
    clump1.castShadow = true
    foliageGroup.add(clump1)

    const clump2 = new THREE.Mesh(sharedOakClumpGeo2, oakFoliageMat2)
    clump2.position.set(1.0, 0.2, 0.4)
    clump2.castShadow = true
    foliageGroup.add(clump2)

    const clump3 = new THREE.Mesh(sharedOakClumpGeo2, oakFoliageMat2)
    clump3.position.set(-0.9, 0.3, -0.4)
    clump3.castShadow = true
    foliageGroup.add(clump3)

    tree.add(foliageGroup)
    swayingTrees.push({ fronds: foliageGroup, baseRot: foliageGroup.rotation.y, speed: 0.8 + Math.random() * 0.3 })

    const soil = new THREE.Mesh(sharedSoilGeo, soilMat)
    soil.scale.set(1.3, 1, 1.3)
    soil.position.y = 0.02
    tree.add(soil)

    return tree
  }

  function createParkBench(): THREE.Group {
    const bench = new THREE.Group()

    const seat = new THREE.Mesh(sharedBenchSeatGeo, benchWoodMat)
    seat.position.y = 0.45
    seat.castShadow = true
    bench.add(seat)

    const back = new THREE.Mesh(sharedBenchBackGeo, benchWoodMat)
    back.position.set(0, 0.8, -0.28)
    back.castShadow = true
    bench.add(back)

    const leg1 = new THREE.Mesh(sharedBenchLegGeo, benchIronMat)
    leg1.position.set(-1.0, 0.25, 0)
    bench.add(leg1)

    const leg2 = new THREE.Mesh(sharedBenchLegGeo, benchIronMat)
    leg2.position.set(1.0, 0.25, 0)
    bench.add(leg2)

    return bench
  }

  // 3. Populate Central Park Plaza & Avenue Planters
  const plazaSize = 20
  const lawnGeo = new THREE.BoxGeometry(plazaSize, 0.15, plazaSize)
  const lawnMat = new THREE.MeshStandardMaterial({ color: 0x3b7a3a, roughness: 0.85, metalness: 0.05 })
  const lawn = new THREE.Mesh(lawnGeo, lawnMat)
  lawn.position.set(0, 0.08, 0)
  lawn.receiveShadow = true
  treesGroup.add(lawn)

  // Plaza Perimeter Oaks & Benches
  const plazaTreePositions = [
    [-6.5, -6.5],
    [6.5, -6.5],
    [-6.5, 6.5],
    [6.5, 6.5],
    [0, -7.5],
    [0, 7.5],
  ]

  plazaTreePositions.forEach(([tx, tz]) => {
    const oak = createNYCOakTree()
    oak.position.set(tx, 0.15, tz)
    treesGroup.add(oak)
  })

  const benchPositions = [
    { x: -3.5, z: -5.0, rotY: 0 },
    { x: 3.5, z: -5.0, rotY: 0 },
    { x: -3.5, z: 5.0, rotY: Math.PI },
    { x: 3.5, z: 5.0, rotY: Math.PI },
  ]

  benchPositions.forEach((bp) => {
    const bench = createParkBench()
    bench.position.set(bp.x, 0.15, bp.z)
    bench.rotation.y = bp.rotY
    treesGroup.add(bench)
  })

  // Avenue Sidewalk Palms (Lining Main Boulevards)
  const boulevardOffsets = [-48, -32, -16, 16, 32, 48]
  boulevardOffsets.forEach((pos) => {
    // North-South Avenues
    const palm1 = createLAPalmTree()
    palm1.position.set(-8.5, 0, pos)
    treesGroup.add(palm1)

    const palm2 = createLAPalmTree()
    palm2.position.set(8.5, 0, pos)
    treesGroup.add(palm2)

    // East-West Boulevards
    const palm3 = createLAPalmTree()
    palm3.position.set(pos, 0, -8.5)
    palm3.rotation.y = Math.PI / 2
    treesGroup.add(palm3)

    const palm4 = createLAPalmTree()
    palm4.position.set(pos, 0, 8.5)
    palm4.rotation.y = Math.PI / 2
    treesGroup.add(palm4)
  })

  const update = (delta: number, elapsed: number) => {
    swayingTrees.forEach((t) => {
      t.fronds.rotation.z = Math.sin(elapsed * 1.5 * t.speed) * 0.04
      t.fronds.rotation.x = Math.cos(elapsed * 1.2 * t.speed) * 0.03
    })
  }

  return {
    group: treesGroup,
    update,
  }
}
