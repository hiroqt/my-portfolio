'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { createCityBuildings, BuildingData, ContributionDay } from './CityBuildings'
import { createCityTraffic } from './CityTraffic'
import { createCityAvatar } from './CityAvatar'
import { createCityTrees } from './CityTrees'
import { createCitySky } from './CitySky'
import { cityAudio } from './CityAudio'

export type LightingMode = 'day' | 'sunset' | 'night' | 'morning'
export type ViewMode = 'scroll' | 'free' | 'walk'

interface CitySceneProps {
  scrollProgress: number
  viewMode: ViewMode
  lightingMode: LightingMode
  trafficSpeed: number
  zoomLevel: number
  onZoomChange?: (zoom: number) => void
  selectedBuilding?: BuildingData | null
  contributions: ContributionDay[]
  virtualInput?: { x: number; z: number; y?: number; isSprint?: boolean }
  onBuildingSelect: (data: BuildingData | null) => void
  onAvatarInteract: () => void
}

// Helper to draw a crisp floating 3D billboard tag for the selected building
function createBuildingLabelTexture(title: string, subtitle: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 140
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.clearRect(0, 0, 512, 140)

    // Background Card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)'
    ctx.strokeStyle = '#38bdf8'
    ctx.lineWidth = 5

    // Rounded rectangle
    const x = 12
    const y = 12
    const w = 488
    const h = 116
    const r = 24
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r)
    ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
    ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r)
    ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Title Text
    ctx.font = 'bold 30px system-ui, -apple-system, sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    const displayTitle = title.length > 24 ? title.substring(0, 22) + '...' : title
    ctx.fillText(displayTitle, 256, 56)

    // Subtitle Tag
    ctx.font = 'bold 22px monospace'
    ctx.fillStyle = '#38bdf8'
    ctx.fillText(subtitle, 256, 96)
  }
  const tex = new THREE.CanvasTexture(canvas)
  return tex
}

export const CityScene: React.FC<CitySceneProps> = ({
  scrollProgress,
  viewMode,
  lightingMode,
  trafficSpeed,
  zoomLevel,
  onZoomChange,
  selectedBuilding,
  contributions,
  virtualInput,
  onBuildingSelect,
  onAvatarInteract,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewModeRef = useRef(viewMode)
  const scrollProgressRef = useRef(scrollProgress)
  const lightingModeRef = useRef(lightingMode)
  const trafficSpeedRef = useRef(trafficSpeed)
  const zoomLevelRef = useRef(zoomLevel)
  const selectedBuildingRef = useRef(selectedBuilding)
  const virtualInputRef = useRef(virtualInput)

  useEffect(() => {
    viewModeRef.current = viewMode
  }, [viewMode])

  useEffect(() => {
    scrollProgressRef.current = scrollProgress
  }, [scrollProgress])

  useEffect(() => {
    lightingModeRef.current = lightingMode
    cityAudio.setTheme(lightingMode)
  }, [lightingMode])

  useEffect(() => {
    trafficSpeedRef.current = trafficSpeed
  }, [trafficSpeed])

  useEffect(() => {
    zoomLevelRef.current = zoomLevel
  }, [zoomLevel])

  useEffect(() => {
    selectedBuildingRef.current = selectedBuilding
  }, [selectedBuilding])

  useEffect(() => {
    virtualInputRef.current = virtualInput
  }, [virtualInput])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number

    // 1. Scene & Natural Atmosphere
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xbfe0f7)
    scene.fog = new THREE.FogExp2(0xbfe0f7, 0.0035)

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.5,
      1400
    )
    camera.position.set(0, 52, 75)

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // 4. Natural Sky Dome & Distant Skyline
    const skyGeo = new THREE.SphereGeometry(450, 32, 24)
    skyGeo.scale(-1, 1, 1)

    const skyMat = new THREE.MeshBasicMaterial({
      color: 0x70b5e8,
      side: THREE.BackSide,
    })
    const skyDome = new THREE.Mesh(skyGeo, skyMat)
    scene.add(skyDome)

    // Distant Horizon Skyline Ring
    const distantSkylineGroup = new THREE.Group()
    const numDistantTowers = 110
    const horizonRadius = 160

    const distantTowerMat = new THREE.MeshBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.85 })
    const distantBeaconMat = new THREE.MeshBasicMaterial({ color: 0xef4444 })

    for (let i = 0; i < numDistantTowers; i++) {
      const angle = (i / numDistantTowers) * Math.PI * 2
      const rad = horizonRadius + (Math.random() - 0.5) * 45
      const tx = Math.cos(angle) * rad
      const tz = Math.sin(angle) * rad

      const tHeight = 25 + Math.random() * 70
      const tWidth = 5 + Math.random() * 9
      const tDepth = 5 + Math.random() * 9

      const dTowerGeo = new THREE.BoxGeometry(tWidth, tHeight, tDepth)
      const dTower = new THREE.Mesh(dTowerGeo, distantTowerMat)
      dTower.position.set(tx, tHeight / 2, tz)
      distantSkylineGroup.add(dTower)

      if (tHeight > 36) {
        const dSpireGeo = new THREE.CylinderGeometry(0.08, 0.25, 9, 6)
        const dSpire = new THREE.Mesh(dSpireGeo, distantTowerMat)
        dSpire.position.set(tx, tHeight + 4.5, tz)
        distantSkylineGroup.add(dSpire)

        const dBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.4, 6, 6), distantBeaconMat)
        dBeacon.position.set(tx, tHeight + 9, tz)
        distantSkylineGroup.add(dBeacon)
      }
    }
    scene.add(distantSkylineGroup)

    // 5. Directional Sun & Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 1.8)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 2.8)
    sunLight.position.set(70, 110, 60)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    sunLight.shadow.camera.near = 10
    sunLight.shadow.camera.far = 300
    const d = 80
    sunLight.shadow.camera.left = -d
    sunLight.shadow.camera.right = d
    sunLight.shadow.camera.top = d
    sunLight.shadow.camera.bottom = -d
    sunLight.shadow.bias = -0.0005
    scene.add(sunLight)

    const bounceLight = new THREE.DirectionalLight(0xbfdbfe, 0.9)
    bounceLight.position.set(-60, 40, -60)
    scene.add(bounceLight)

    // 6. FLOATING 3D BUILDING SELECTION INDICATOR PIN & BILLBOARD TAG
    const selectionIndicatorGroup = new THREE.Group()
    selectionIndicatorGroup.visible = false
    scene.add(selectionIndicatorGroup)

    // A. 3D Floating Diamond Pin
    const pinDiamondGeo = new THREE.OctahedronGeometry(1.5, 0)
    const pinDiamondMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.85,
      metalness: 0.9,
      roughness: 0.15,
    })
    const pinDiamondMesh = new THREE.Mesh(pinDiamondGeo, pinDiamondMat)
    pinDiamondMesh.position.y = 2.4
    selectionIndicatorGroup.add(pinDiamondMesh)

    // B. Downward Pointer Cone
    const pointerConeGeo = new THREE.ConeGeometry(0.7, 1.6, 16)
    pointerConeGeo.rotateX(Math.PI) // Invert cone to point down
    const pointerConeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.7,
      metalness: 0.85,
      roughness: 0.2,
    })
    const pointerConeMesh = new THREE.Mesh(pointerConeGeo, pointerConeMat)
    pointerConeMesh.position.y = 0.8
    selectionIndicatorGroup.add(pointerConeMesh)

    // C. Horizontal Target Halo Ring
    const targetRingGeo = new THREE.RingGeometry(2.2, 2.6, 24)
    targetRingGeo.rotateX(-Math.PI / 2)
    const targetRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    })
    const targetRingMesh = new THREE.Mesh(targetRingGeo, targetRingMat)
    targetRingMesh.position.y = 0.1
    selectionIndicatorGroup.add(targetRingMesh)

    // D. Billboard Floating Tag Badge (Always faces camera)
    const tagGeo = new THREE.PlaneGeometry(7.2, 2.0)
    const tagMat = new THREE.MeshBasicMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      depthTest: false,
    })
    const tagMesh = new THREE.Mesh(tagGeo, tagMat)
    tagMesh.position.y = 5.2
    selectionIndicatorGroup.add(tagMesh)

    let lastTaggedBuildingId: string | null = null

    // 7. Instantiate Subsystems
    const buildingsController = createCityBuildings(contributions)
    scene.add(buildingsController.group)

    const trafficController = createCityTraffic(140)
    scene.add(trafficController.roadGroup)
    scene.add(trafficController.carsGroup)

    const treesController = createCityTrees()
    scene.add(treesController.group)

    const skyController = createCitySky()
    scene.add(skyController.skyGroup)

    const avatarController = createCityAvatar()
    scene.add(avatarController.group)
    scene.add(avatarController.pedestrians)

    setLoading(false)

    // 8. Keyboard Controls
    const keysPressed: Record<string, boolean> = {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE', 'KeyQ', 'KeyC', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(
          e.code
        )
      ) {
        if (viewModeRef.current !== 'scroll') {
          e.preventDefault()
        }
      }
      keysPressed[e.code] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed[e.code] = false
    }

    window.addEventListener('keydown', handleKeyDown, { passive: false })
    window.addEventListener('keyup', handleKeyUp)

    // 9. Interactive Look, Flight & Raycasting State
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(-1000, -1000)
    let hoveredMesh: THREE.Mesh | null = null
    let originalEmissive = 0

    let isMouseDown = false
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    let scrollLookYaw = 0
    let scrollLookPitch = 0
    let thirdPersonYaw = 0
    let thirdPersonPitch = 0.35
    let thirdPersonDistance = 8.5

    const freeCamPos = new THREE.Vector3(0, 35, 55)
    let freeCamYaw = 0
    let freeCamPitch = -0.2

    let lastViewMode: ViewMode = viewModeRef.current

    const onPointerDown = (e: MouseEvent) => {
      isMouseDown = true
      isDragging = false
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onPointerUp = () => {
      isMouseDown = false
    }

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      if (isMouseDown) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY

        if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
          isDragging = true
        }

        if (viewModeRef.current === 'walk') {
          thirdPersonYaw -= deltaX * 0.0055
          thirdPersonPitch = Math.max(0.04, Math.min(1.3, thirdPersonPitch + deltaY * 0.0035))
        } else if (viewModeRef.current === 'free') {
          freeCamYaw -= deltaX * 0.0045
          freeCamPitch = Math.max(-1.45, Math.min(1.45, freeCamPitch + deltaY * 0.0035))
        } else if (viewModeRef.current === 'scroll') {
          scrollLookYaw -= deltaX * 0.0045
          scrollLookPitch = Math.max(-0.8, Math.min(0.8, scrollLookPitch + deltaY * 0.0035))
        }

        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }
    }

    const onWheel = (e: WheelEvent) => {
      if (viewModeRef.current === 'walk') {
        thirdPersonDistance = Math.max(3.0, Math.min(75.0, thirdPersonDistance + e.deltaY * 0.035))
      } else if (viewModeRef.current === 'free') {
        freeCamPos.y = Math.max(1.5, Math.min(260.0, freeCamPos.y - e.deltaY * 0.08))
      } else {
        if (e.ctrlKey || e.metaKey || e.altKey) {
          e.preventDefault()
          const newZoom = Math.max(0.35, Math.min(3.5, zoomLevelRef.current + (e.deltaY > 0 ? 0.15 : -0.15)))
          if (onZoomChange) onZoomChange(newZoom)
        }
      }
    }

    const onClick = (e: MouseEvent) => {
      if (isDragging) return

      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(buildingsController.interactiveMeshes)

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh
        const bId = hit.userData.id
        if (bId && buildingsController.buildingsData.has(bId)) {
          cityAudio.playInspectPing()
          const bData = buildingsController.buildingsData.get(bId) || null
          onBuildingSelect(bData)
          return
        }
      }

      const avatarIntersects = raycaster.intersectObjects(avatarController.group.children, true)
      if (avatarIntersects.length > 0) {
        avatarController.triggerInteraction()
        cityAudio.playWaveSound()
        onAvatarInteract()
      } else {
        onBuildingSelect(null)
      }
    }

    window.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mouseup', onPointerUp)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('click', onClick)

    // 10. Resize Handling
    const handleResize = () => {
      if (!container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // 11. Camera Scroll Keyframes
    const keyframes = [
      { progress: 0.0, pos: new THREE.Vector3(0, 52, 75), lookAt: new THREE.Vector3(0, 8, 0) },
      { progress: 0.32, pos: new THREE.Vector3(0, 4.2, 9.5), lookAt: new THREE.Vector3(0, 2.7, 0) },
      { progress: 0.58, pos: new THREE.Vector3(-24, 6.0, -26), lookAt: new THREE.Vector3(0, 4.0, 0) },
      { progress: 0.82, pos: new THREE.Vector3(26, 32, 24), lookAt: new THREE.Vector3(-10, 18, -10) },
      { progress: 1.0, pos: new THREE.Vector3(45, 38, 55), lookAt: new THREE.Vector3(0, 6, 0) },
    ]

    const currentLookAt = new THREE.Vector3(0, 8, 0)
    const targetLookAt = new THREE.Vector3(0, 8, 0)
    const targetPos = new THREE.Vector3(0, 52, 75)

    const clock = new THREE.Clock()
    let footstepTimer = 0

    // 12. Main Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      let moveX = 0
      let moveZ = 0
      let moveY = 0
      let isSprint = keysPressed['ShiftLeft'] || keysPressed['ShiftRight'] || false

      if (keysPressed['KeyW'] || keysPressed['ArrowUp']) moveZ -= 1
      if (keysPressed['KeyS'] || keysPressed['ArrowDown']) moveZ += 1
      if (keysPressed['KeyA'] || keysPressed['ArrowLeft']) moveX -= 1
      if (keysPressed['KeyD'] || keysPressed['ArrowRight']) moveX += 1
      if (keysPressed['Space'] || keysPressed['KeyE']) moveY += 1
      if (keysPressed['KeyC'] || keysPressed['KeyQ']) moveY -= 1

      if (virtualInputRef.current) {
        moveX += virtualInputRef.current.x
        moveZ += virtualInputRef.current.z
        if (virtualInputRef.current.y) moveY += virtualInputRef.current.y
        if (virtualInputRef.current.isSprint) isSprint = true
      }

      let worldMoveX = moveX
      let worldMoveZ = moveZ

      if (viewModeRef.current === 'walk') {
        const camYaw = thirdPersonYaw
        worldMoveX = moveX * Math.cos(camYaw) + moveZ * Math.sin(camYaw)
        worldMoveZ = -moveX * Math.sin(camYaw) + moveZ * Math.cos(camYaw)
      }

      // Update Subsystems
      trafficController.setSpeedMultiplier(trafficSpeedRef.current)
      trafficController.update(delta, elapsed)
      buildingsController.update(delta, elapsed)
      treesController.update(delta, elapsed)

      const charState = avatarController.update(delta, elapsed, {
        x: worldMoveX,
        z: worldMoveZ,
        isSprint,
      })

      // Footsteps in Walk mode
      if (charState.isMoving && viewModeRef.current === 'walk') {
        footstepTimer += delta
        const stepInterval = isSprint ? 0.26 : 0.38
        if (footstepTimer > stepInterval) {
          cityAudio.playFootstep()
          footstepTimer = 0
        }
      } else {
        footstepTimer = 0
      }

      // Lighting Presets
      const currentMode = lightingModeRef.current
      if (currentMode === 'day') {
        scene.background = new THREE.Color(0xbfe0f7)
        if (scene.fog) scene.fog.color = new THREE.Color(0xbfe0f7)
        skyMat.color.setHex(0x70b5e8)
        sunLight.color.setHex(0xfffbeb)
        sunLight.intensity = 2.8
        sunLight.position.set(70, 110, 60)
        ambientLight.color.setHex(0xdbeafe)
        ambientLight.intensity = 1.8
      } else if (currentMode === 'sunset') {
        scene.background = new THREE.Color(0xfb923c)
        if (scene.fog) scene.fog.color = new THREE.Color(0xfb923c)
        skyMat.color.setHex(0xe11d48)
        sunLight.color.setHex(0xf97316)
        sunLight.intensity = 3.0
        sunLight.position.set(120, 30, 80)
        ambientLight.color.setHex(0x7c2d12)
        ambientLight.intensity = 1.5
      } else if (currentMode === 'night') {
        scene.background = new THREE.Color(0x0f172a)
        if (scene.fog) scene.fog.color = new THREE.Color(0x0f172a)
        skyMat.color.setHex(0x090d16)
        sunLight.color.setHex(0x38bdf8)
        sunLight.intensity = 0.8
        sunLight.position.set(-40, 80, -40)
        ambientLight.color.setHex(0x1e293b)
        ambientLight.intensity = 1.2
      } else if (currentMode === 'morning') {
        scene.background = new THREE.Color(0xfecdd3)
        if (scene.fog) scene.fog.color = new THREE.Color(0xfecdd3)
        skyMat.color.setHex(0x93c5fd)
        sunLight.color.setHex(0xfde68a)
        sunLight.intensity = 2.4
        sunLight.position.set(-100, 45, 90)
        ambientLight.color.setHex(0xfce7f3)
        ambientLight.intensity = 1.6
      }

      skyController.update(delta, elapsed, currentMode)
      buildingsController.setNightMode(currentMode === 'night', currentMode)

      // Camera Modes Handling & Specific Building Focus Zoom
      const currentView = viewModeRef.current
      const currentZoom = zoomLevelRef.current || 1.0
      const focusedBldg = selectedBuildingRef.current

      if (currentView !== lastViewMode) {
        if (currentView === 'free') {
          freeCamPos.copy(camera.position)
        }
        lastViewMode = currentView
      }

      // Update 3D Floating Building Indicator Pin & Billboard Tag
      if (focusedBldg) {
        selectionIndicatorGroup.visible = true

        const bPos = focusedBldg.position
        const bHeight = focusedBldg.height || 20
        const floatY = Math.sin(elapsed * 4.0) * 0.65

        // Position the indicator directly hovering above the building roof
        selectionIndicatorGroup.position.set(bPos.x, bHeight + 3.2 + floatY, bPos.z)

        // Animate Diamond Pin Spin & Target Ring Pulse
        pinDiamondMesh.rotation.y = elapsed * 2.6
        pinDiamondMesh.rotation.x = Math.sin(elapsed * 1.8) * 0.15
        targetRingMesh.rotation.z = elapsed * 1.2
        targetRingMat.opacity = 0.65 + Math.sin(elapsed * 5.0) * 0.25

        // Update Billboard Tag Content when selection changes
        if (lastTaggedBuildingId !== focusedBldg.id) {
          const title = focusedBldg.repoName || `Sector ${focusedBldg.id.replace('bldg-', '')}`
          const subtitle = focusedBldg.isLandmark
            ? `★ Flagship Monolith • ${focusedBldg.commits} Commits`
            : `📅 ${focusedBldg.date} • ${focusedBldg.commits} Commits`
          tagMat.map = createBuildingLabelTexture(title, subtitle)
          tagMat.needsUpdate = true
          lastTaggedBuildingId = focusedBldg.id
        }

        // Keep Billboard Tag perfectly facing camera
        tagMesh.quaternion.copy(camera.quaternion)
      } else {
        selectionIndicatorGroup.visible = false
        lastTaggedBuildingId = null
      }

      if (focusedBldg) {
        // SMOOTH ZOOM & FOCUS TO SPECIFIC CLICKED BUILDING
        const bPos = focusedBldg.position
        const bHeight = focusedBldg.height || 20
        const focusDist = Math.max(16.0, bHeight * 0.48 + 12.0) * currentZoom

        const focusCamX = bPos.x + focusDist * 0.72
        const focusCamZ = bPos.z + focusDist * 0.72
        const focusCamY = Math.max(6.0, bHeight * 0.42 + 8.0)

        targetPos.set(focusCamX, focusCamY, focusCamZ)
        targetLookAt.set(bPos.x, Math.max(2.0, bHeight * 0.48), bPos.z)

        camera.position.lerp(targetPos, 0.10)
        currentLookAt.lerp(targetLookAt, 0.12)
        camera.lookAt(currentLookAt)
      } else if (currentView === 'free') {
        // FREE FLIGHT / SPECTATOR CAMERA
        const flySpeed = (isSprint ? 58.0 : 28.0) * (1.0 / currentZoom)

        const forwardX = Math.sin(freeCamYaw)
        const forwardZ = Math.cos(freeCamYaw)
        const rightX = Math.cos(freeCamYaw)
        const rightZ = -Math.sin(freeCamYaw)

        freeCamPos.x += (moveX * rightX - moveZ * forwardX) * flySpeed * delta
        freeCamPos.z += (moveX * rightZ - moveZ * forwardZ) * flySpeed * delta
        freeCamPos.y += moveY * flySpeed * 0.8 * delta

        freeCamPos.x = Math.max(-190, Math.min(190, freeCamPos.x))
        freeCamPos.z = Math.max(-190, Math.min(190, freeCamPos.z))
        freeCamPos.y = Math.max(1.5, Math.min(240, freeCamPos.y))

        camera.position.lerp(freeCamPos, 0.16)

        const lookDist = 20.0
        targetLookAt.set(
          camera.position.x - Math.sin(freeCamYaw) * Math.cos(freeCamPitch) * lookDist,
          camera.position.y + Math.sin(freeCamPitch) * lookDist,
          camera.position.z - Math.cos(freeCamYaw) * Math.cos(freeCamPitch) * lookDist
        )

        currentLookAt.lerp(targetLookAt, 0.18)
        camera.lookAt(currentLookAt)
      } else if (currentView === 'walk') {
        const camDistance = thirdPersonDistance * currentZoom
        const camHeight = 3.0 + Math.sin(thirdPersonPitch) * (camDistance * 0.35)

        const charPos = charState.position
        const camX = charPos.x + Math.sin(thirdPersonYaw) * camDistance * Math.cos(thirdPersonPitch)
        const camZ = charPos.z + Math.cos(thirdPersonYaw) * camDistance * Math.cos(thirdPersonPitch)
        const camY = Math.max(1.2, charPos.y + camHeight)

        targetPos.set(camX, camY, camZ)
        targetLookAt.set(charPos.x, charPos.y + 1.8, charPos.z)

        camera.position.lerp(targetPos, 0.14)
        currentLookAt.lerp(targetLookAt, 0.16)
        camera.lookAt(currentLookAt)
      } else {
        // Scroll Mode with Free Zoom & Interactive Mouse Look
        const p = Math.max(0, Math.min(1, scrollProgressRef.current))

        let segmentIndex = 0
        for (let i = 0; i < keyframes.length - 1; i++) {
          if (p >= keyframes[i].progress && p <= keyframes[i + 1].progress) {
            segmentIndex = i
            break
          }
        }

        const kf1 = keyframes[segmentIndex]
        const kf2 = keyframes[segmentIndex + 1] || keyframes[keyframes.length - 1]
        const segProgress = kf2.progress === kf1.progress ? 0 : (p - kf1.progress) / (kf2.progress - kf1.progress)
        const ease = segProgress < 0.5 ? 2 * segProgress * segProgress : -1 + (4 - 2 * segProgress) * segProgress

        const basePos = new THREE.Vector3().lerpVectors(kf1.pos, kf2.pos, ease)
        const baseLookAt = new THREE.Vector3().lerpVectors(kf1.lookAt, kf2.lookAt, ease)

        const lookVector = new THREE.Vector3().subVectors(basePos, baseLookAt)
        const zoomedPos = new THREE.Vector3().copy(baseLookAt).addScaledVector(lookVector, currentZoom)
        targetPos.copy(zoomedPos)

        const camDist = targetPos.distanceTo(baseLookAt)
        const parallaxX = mouse.x > -900 ? mouse.x * 2.5 : 0
        const parallaxY = mouse.y > -900 ? mouse.y * 1.8 : 0

        targetLookAt.copy(baseLookAt)
        targetLookAt.x += Math.sin(scrollLookYaw) * camDist * 0.8 + parallaxX
        targetLookAt.z += (Math.cos(scrollLookYaw) - 1.0) * camDist * 0.8
        targetLookAt.y += scrollLookPitch * camDist * 0.5 + parallaxY

        camera.position.lerp(targetPos, 0.08)
        currentLookAt.lerp(targetLookAt, 0.09)
        camera.lookAt(currentLookAt)
      }

      // Raycasting Hover
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(buildingsController.interactiveMeshes)

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh
        if (hoveredMesh !== hit) {
          if (hoveredMesh && hoveredMesh.material instanceof THREE.MeshStandardMaterial) {
            hoveredMesh.material.emissiveIntensity = originalEmissive
          }
          hoveredMesh = hit
          if (hit.material instanceof THREE.MeshStandardMaterial) {
            originalEmissive = hit.material.emissiveIntensity
            hit.material.emissiveIntensity = Math.min(2.5, originalEmissive + 0.6)
          }
        }
        document.body.style.cursor = 'pointer'
      } else {
        if (hoveredMesh && hoveredMesh.material instanceof THREE.MeshStandardMaterial) {
          hoveredMesh.material.emissiveIntensity = originalEmissive
        }
        hoveredMesh = null
        document.body.style.cursor = 'default'
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('mouseup', onPointerUp)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('click', onClick)
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [contributions, onAvatarInteract, onBuildingSelect, onZoomChange])

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full absolute inset-0" />
      {loading && (
        <div className="absolute inset-0 bg-[#bfe0f7] flex flex-col items-center justify-center z-50 transition-opacity duration-700">
          <div className="w-16 h-16 border-4 border-sky-400/40 border-t-sky-600 rounded-full animate-spin mb-4" />
          <p className="text-sky-900 font-mono text-sm tracking-widest uppercase animate-pulse font-semibold">
            Loading NYC & LA Metropolis...
          </p>
        </div>
      )}
    </div>
  )
}
