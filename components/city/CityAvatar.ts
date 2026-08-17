import * as THREE from 'three'

export interface CharacterMovementState {
  isMoving: boolean
  isSprinting: boolean
  position: THREE.Vector3
  rotationY: number
}

export interface AvatarController {
  group: THREE.Group
  characterGroup: THREE.Group
  pedestrians: THREE.Group
  update: (delta: number, elapsed: number, inputDirection?: { x: number; z: number; isSprint?: boolean }) => CharacterMovementState
  triggerInteraction: () => void
  setPosition: (x: number, z: number) => void
  resetToPlaza: () => void
}

export function createCityAvatar(): AvatarController {
  const avatarGroup = new THREE.Group()

  // 1. Central Plaza Park Base (Granite paving & park steps)
  const plazaGeo = new THREE.CylinderGeometry(8.5, 9.5, 0.4, 32)
  const plazaMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    roughness: 0.75,
    metalness: 0.15,
  })
  const plazaMesh = new THREE.Mesh(plazaGeo, plazaMat)
  plazaMesh.position.set(0, 0.2, 0)
  plazaMesh.receiveShadow = true
  avatarGroup.add(plazaMesh)

  // Inner Polished Stone Circle
  const innerPlatGeo = new THREE.CylinderGeometry(5.2, 5.2, 0.08, 32)
  const innerPlatMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    roughness: 0.6,
    metalness: 0.2,
  })
  const innerPlat = new THREE.Mesh(innerPlatGeo, innerPlatMat)
  innerPlat.position.set(0, 0.44, 0)
  avatarGroup.add(innerPlat)

  // 2. Character Group (The movable player avatar - Arnel)
  const charGroup = new THREE.Group()
  charGroup.position.set(0, 0.5, 0)
  avatarGroup.add(charGroup)

  // Realistic Materials
  const skinMat = new THREE.MeshStandardMaterial({ color: 0xdca882, roughness: 0.65 })
  const jacketMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.75 }) // Navy urban jacket
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 }) // White tee
  const jeansMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.85 }) // Denim jeans
  const sneakerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 })
  const hpMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 })

  // Hips
  const hips = new THREE.Group()
  hips.position.y = 1.3
  charGroup.add(hips)

  // Left Leg Assembly
  const leftLegGroup = new THREE.Group()
  leftLegGroup.position.set(-0.32, 0, 0)
  hips.add(leftLegGroup)

  const legGeo = new THREE.BoxGeometry(0.28, 1.25, 0.32)
  legGeo.translate(0, -0.6, 0)
  const leftLeg = new THREE.Mesh(legGeo, jeansMat)
  leftLeg.castShadow = true
  leftLegGroup.add(leftLeg)

  const shoeGeo = new THREE.BoxGeometry(0.32, 0.2, 0.48)
  const leftShoe = new THREE.Mesh(shoeGeo, sneakerMat)
  leftShoe.position.set(0, -1.2, 0.08)
  leftShoe.castShadow = true
  leftLegGroup.add(leftShoe)

  // Right Leg Assembly
  const rightLegGroup = new THREE.Group()
  rightLegGroup.position.set(0.32, 0, 0)
  hips.add(rightLegGroup)

  const rightLeg = new THREE.Mesh(legGeo, jeansMat)
  rightLeg.castShadow = true
  rightLegGroup.add(rightLeg)

  const rightShoe = new THREE.Mesh(shoeGeo, sneakerMat)
  rightShoe.position.set(0, -1.2, 0.08)
  rightShoe.castShadow = true
  rightLegGroup.add(rightShoe)

  // Torso / Jacket
  const torsoGroup = new THREE.Group()
  torsoGroup.position.y = 0.1
  hips.add(torsoGroup)

  const torsoGeo = new THREE.BoxGeometry(0.95, 1.35, 0.55)
  const torso = new THREE.Mesh(torsoGeo, jacketMat)
  torso.position.y = 0.65
  torso.castShadow = true
  torsoGroup.add(torso)

  // Inner White Tee Shirt
  const shirtGeo = new THREE.PlaneGeometry(0.35, 1.1)
  const shirt = new THREE.Mesh(shirtGeo, shirtMat)
  shirt.position.set(0, 0.65, 0.28)
  torsoGroup.add(shirt)

  // Head & Neck
  const headGroup = new THREE.Group()
  headGroup.position.set(0, 1.5, 0)
  torsoGroup.add(headGroup)

  const headGeo = new THREE.BoxGeometry(0.68, 0.72, 0.68)
  const head = new THREE.Mesh(headGeo, skinMat)
  head.castShadow = true
  headGroup.add(head)

  // Natural Hair
  const hairGeo = new THREE.BoxGeometry(0.74, 0.32, 0.74)
  const hair = new THREE.Mesh(hairGeo, hairMat)
  hair.position.set(0, 0.3, -0.02)
  headGroup.add(hair)

  // Headphones around neck/ears
  const hpBandGeo = new THREE.TorusGeometry(0.42, 0.05, 8, 24, Math.PI)
  const hpBand = new THREE.Mesh(hpBandGeo, hpMat)
  hpBand.rotation.z = -Math.PI
  hpBand.position.y = 0.22
  headGroup.add(hpBand)

  const hpEarGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16)
  const hpEarL = new THREE.Mesh(hpEarGeo, hpMat)
  hpEarL.rotation.z = Math.PI / 2
  hpEarL.position.set(-0.36, 0.05, 0)
  headGroup.add(hpEarL)

  const hpEarR = new THREE.Mesh(hpEarGeo, hpMat)
  hpEarR.rotation.z = Math.PI / 2
  hpEarR.position.set(0.36, 0.05, 0)
  headGroup.add(hpEarR)

  // Arms Assembly
  const leftArmGroup = new THREE.Group()
  leftArmGroup.position.set(-0.62, 1.25, 0)
  torsoGroup.add(leftArmGroup)

  const armGeo = new THREE.BoxGeometry(0.24, 0.85, 0.24)
  armGeo.translate(0, -0.4, 0)
  const leftArm = new THREE.Mesh(armGeo, jacketMat)
  leftArm.castShadow = true
  leftArmGroup.add(leftArm)

  const handGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18)
  const leftHand = new THREE.Mesh(handGeo, skinMat)
  leftHand.position.set(0, -0.9, 0)
  leftArmGroup.add(leftHand)

  const rightArmGroup = new THREE.Group()
  rightArmGroup.position.set(0.62, 1.25, 0)
  torsoGroup.add(rightArmGroup)

  const rightArm = new THREE.Mesh(armGeo, jacketMat)
  rightArm.castShadow = true
  rightArmGroup.add(rightArm)

  const rightHand = new THREE.Mesh(handGeo, skinMat)
  rightHand.position.set(0, -0.9, 0)
  rightArmGroup.add(rightHand)

  // 3. Diverse Natural Pedestrians
  const pedestriansGroup = new THREE.Group()
  const pedCount = 24
  const pedList: { mesh: THREE.Group; speed: number; direction: number; radius: number; angle: number }[] = []

  // Natural pedestrian clothing colors (Coats, jackets, shirts, denim)
  const pedCoatColors = [
    0x334155, // Slate Coat
    0x991b1b, // Burgundy Jacket
    0x1e3a8a, // Navy Blazer
    0x4b5563, // Charcoal Cardigan
    0xd97706, // Camel Trench Coat
    0x047857, // Forest Jacket
    0x374151, // Dark Gray
    0xf8fafc, // White Puffer
  ]

  const pedPantsColors = [0x1e293b, 0x1e3a8a, 0x334155, 0x475569, 0x0f172a]

  for (let i = 0; i < pedCount; i++) {
    const pGroup = new THREE.Group()
    const pCoatColor = pedCoatColors[i % pedCoatColors.length]
    const pPantsColor = pedPantsColors[i % pedPantsColors.length]

    const coatMat = new THREE.MeshStandardMaterial({ color: pCoatColor, roughness: 0.8 })
    const pantsMat = new THREE.MeshStandardMaterial({ color: pPantsColor, roughness: 0.85 })

    // Body
    const pBody = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.9, 0.28), coatMat)
    pBody.position.y = 0.9
    pBody.castShadow = true
    pGroup.add(pBody)

    // Head
    const pHead = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), skinMat)
    pHead.position.y = 1.55
    pHead.castShadow = true
    pGroup.add(pHead)

    // Hair
    const pHair = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 10, 10),
      new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? 0x18181b : 0x78350f, roughness: 0.9 })
    )
    pHair.position.set(0, 1.62, -0.02)
    pGroup.add(pHair)

    // Legs
    const pLegGeo = new THREE.BoxGeometry(0.16, 0.65, 0.16)
    const pLegL = new THREE.Mesh(pLegGeo, pantsMat)
    pLegL.position.set(-0.11, 0.32, 0)
    pLegL.castShadow = true
    pGroup.add(pLegL)

    const pLegR = new THREE.Mesh(pLegGeo, pantsMat)
    pLegR.position.set(0.11, 0.32, 0)
    pLegR.castShadow = true
    pGroup.add(pLegR)

    // Position on sidewalks
    const angle = (i / pedCount) * Math.PI * 2
    const radius = 18 + (i % 4) * 6.5
    pGroup.position.set(Math.cos(angle) * radius, 0.05, Math.sin(angle) * radius)
    pGroup.scale.set(0.72, 0.72, 0.72)

    pedestriansGroup.add(pGroup)
    pedList.push({
      mesh: pGroup,
      speed: 1.4 + Math.random() * 1.4,
      direction: Math.random() > 0.5 ? 1 : -1,
      radius,
      angle,
    })
  }

  // State
  let isWaving = false
  let waveTimer = 0
  let walkCycle = 0
  let targetRotationY = 0

  const triggerInteraction = () => {
    isWaving = true
    waveTimer = 0
  }

  const setPosition = (x: number, z: number) => {
    charGroup.position.x = x
    charGroup.position.z = z
  }

  const resetToPlaza = () => {
    charGroup.position.set(0, 0.5, 0)
    charGroup.rotation.set(0, 0, 0)
    targetRotationY = 0
  }

  // Animation & Movement Update Loop
  const update = (
    delta: number,
    elapsed: number,
    inputDirection?: { x: number; z: number; isSprint?: boolean }
  ): CharacterMovementState => {
    const inputX = inputDirection?.x || 0
    const inputZ = inputDirection?.z || 0
    const isSprint = !!inputDirection?.isSprint
    const isMoving = Math.abs(inputX) > 0.05 || Math.abs(inputZ) > 0.05

    const moveSpeed = isSprint ? 11.5 : 5.8

    if (isMoving) {
      targetRotationY = Math.atan2(inputX, inputZ)

      let diff = targetRotationY - charGroup.rotation.y
      while (diff < -Math.PI) diff += Math.PI * 2
      while (diff > Math.PI) diff -= Math.PI * 2
      charGroup.rotation.y += diff * Math.min(1.0, delta * 12.0)

      const stepX = Math.sin(targetRotationY) * moveSpeed * delta
      const stepZ = Math.cos(targetRotationY) * moveSpeed * delta

      charGroup.position.x += stepX
      charGroup.position.z += stepZ

      charGroup.position.x = Math.max(-58, Math.min(58, charGroup.position.x))
      charGroup.position.z = Math.max(-58, Math.min(58, charGroup.position.z))

      const strideFreq = isSprint ? 13.5 : 8.5
      walkCycle += delta * strideFreq

      const legAngle = Math.sin(walkCycle) * (isSprint ? 0.85 : 0.6)
      leftLegGroup.rotation.x = legAngle
      rightLegGroup.rotation.x = -legAngle

      if (!isWaving) {
        leftArmGroup.rotation.x = -legAngle * 0.75
        rightArmGroup.rotation.x = legAngle * 0.75
      }

      torsoGroup.rotation.x = isSprint ? 0.12 : 0.04
      torsoGroup.position.y = 0.1 + Math.abs(Math.sin(walkCycle)) * 0.05
      headGroup.rotation.x = -torsoGroup.rotation.x * 0.5
    } else {
      walkCycle = 0
      leftLegGroup.rotation.x = THREE.MathUtils.lerp(leftLegGroup.rotation.x, 0, delta * 10)
      rightLegGroup.rotation.x = THREE.MathUtils.lerp(rightLegGroup.rotation.x, 0, delta * 10)
      torsoGroup.rotation.x = THREE.MathUtils.lerp(torsoGroup.rotation.x, 0, delta * 8)

      const breath = Math.sin(elapsed * 2.5) * 0.025
      torsoGroup.position.y = 0.1 + breath
      headGroup.rotation.y = Math.sin(elapsed * 1.2) * 0.1
      headGroup.rotation.x = Math.sin(elapsed * 1.8) * 0.04

      if (!isWaving) {
        leftArmGroup.rotation.x = THREE.MathUtils.lerp(leftArmGroup.rotation.x, 0, delta * 8)
        rightArmGroup.rotation.x = THREE.MathUtils.lerp(rightArmGroup.rotation.x, 0, delta * 8)
      }
    }

    // Waving Gesture
    if (isWaving) {
      waveTimer += delta
      rightArmGroup.rotation.x = -Math.PI / 1.5 + Math.sin(waveTimer * 12) * 0.35
      rightArmGroup.rotation.z = -Math.PI / 3 + Math.cos(waveTimer * 12) * 0.18
      if (waveTimer > 2.5) {
        isWaving = false
        rightArmGroup.rotation.x = 0
        rightArmGroup.rotation.z = 0
      }
    }

    // Pedestrians walking cycle
    pedList.forEach((ped) => {
      ped.angle += (ped.speed / ped.radius) * delta * ped.direction
      const px = Math.cos(ped.angle) * ped.radius
      const pz = Math.sin(ped.angle) * ped.radius
      ped.mesh.position.set(px, 0.05, pz)
      ped.mesh.rotation.y = -ped.angle + (ped.direction > 0 ? Math.PI / 2 : -Math.PI / 2)

      const legL = ped.mesh.children[2] as THREE.Mesh
      const legR = ped.mesh.children[3] as THREE.Mesh
      if (legL && legR) {
        legL.rotation.x = Math.sin(elapsed * 7.5 * (ped.speed / 2)) * 0.55
        legR.rotation.x = -Math.sin(elapsed * 7.5 * (ped.speed / 2)) * 0.55
      }
    })

    return {
      isMoving,
      isSprinting: isSprint,
      position: charGroup.position.clone(),
      rotationY: charGroup.rotation.y,
    }
  }

  return {
    group: avatarGroup,
    characterGroup: charGroup,
    pedestrians: pedestriansGroup,
    update,
    triggerInteraction,
    setPosition,
    resetToPlaza,
  }
}
