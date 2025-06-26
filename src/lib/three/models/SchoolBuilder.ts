import * as THREE from 'three';

export class SchoolBuilder {
  private scene: THREE.Scene;
  private schoolGroup: THREE.Group;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.schoolGroup = new THREE.Group();
    this.scene.add(this.schoolGroup);
  }

  public buildSchool(): void {
    this.createModernCubeBuilding();
    this.createGlassFacades();
    this.createModernEntrance();
    this.createGeometricElements();
    this.createLandscaping();
  }

  private createModernCubeBuilding(): void {
    // Main cube structure - modern geometric design
    const mainCubeGeometry = new THREE.BoxGeometry(12, 8, 12);
    const mainCubeMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xF8F8FF, // Ghost white
      transparent: true,
      opacity: 0.95
    });
    const mainCube = new THREE.Mesh(mainCubeGeometry, mainCubeMaterial);
    mainCube.position.set(0, 4, 0);
    mainCube.castShadow = true;
    mainCube.receiveShadow = true;
    this.schoolGroup.add(mainCube);

    // Secondary cube - offset for modern asymmetric look
    const secondCubeGeometry = new THREE.BoxGeometry(8, 6, 8);
    const secondCubeMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x4169E1 // Royal blue accent
    });
    const secondCube = new THREE.Mesh(secondCubeGeometry, secondCubeMaterial);
    secondCube.position.set(-8, 3, -4);
    secondCube.castShadow = true;
    secondCube.receiveShadow = true;
    this.schoolGroup.add(secondCube);

    // Third cube - smaller, higher for dynamic composition
    const thirdCubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    const thirdCubeMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x87CEEB // Sky blue
    });
    const thirdCube = new THREE.Mesh(thirdCubeGeometry, thirdCubeMaterial);
    thirdCube.position.set(6, 6, -2);
    thirdCube.castShadow = true;
    thirdCube.receiveShadow = true;
    this.schoolGroup.add(thirdCube);

    // Modern foundation platform - matching paved road
    const platformGeometry = new THREE.BoxGeometry(20, 0.5, 16);
    const platformMaterial = new THREE.MeshLambertMaterial({ color: 0x505050 }); // Slightly lighter grey than ground
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(0, 0.25, 0);
    platform.receiveShadow = true;
    this.schoolGroup.add(platform);
  }

  private createGlassFacades(): void {
    // Modern glass curtain wall system
    const glassMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.4,
      reflectivity: 0.8
    });

    // Main cube glass facade
    const mainGlassGeometry = new THREE.PlaneGeometry(11.8, 7.8);
    const mainGlass = new THREE.Mesh(mainGlassGeometry, glassMaterial);
    mainGlass.position.set(0, 4, 6.1);
    this.schoolGroup.add(mainGlass);

    // Grid pattern on glass - modern architectural detail
    const gridMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    
    // Vertical grid lines
    for (let i = 0; i < 4; i++) {
      const vGridGeometry = new THREE.BoxGeometry(0.05, 8, 0.05);
      const vGrid = new THREE.Mesh(vGridGeometry, gridMaterial);
      vGrid.position.set(-4.5 + i * 3, 4, 6.15);
      this.schoolGroup.add(vGrid);
    }

    // Horizontal grid lines
    for (let i = 0; i < 3; i++) {
      const hGridGeometry = new THREE.BoxGeometry(12, 0.05, 0.05);
      const hGrid = new THREE.Mesh(hGridGeometry, gridMaterial);
      hGrid.position.set(0, 2 + i * 2, 6.15);
      this.schoolGroup.add(hGrid);
    }

    // Side facades for secondary cubes
    const sideGlassGeometry = new THREE.PlaneGeometry(7.8, 5.8);
    const sideGlass1 = new THREE.Mesh(sideGlassGeometry, glassMaterial);
    sideGlass1.position.set(-8, 3, 0.1);
    this.schoolGroup.add(sideGlass1);

    const sideGlass2 = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 3.8), glassMaterial);
    sideGlass2.position.set(6, 6, 1.1);
    this.schoolGroup.add(sideGlass2);
  }

  private createModernEntrance(): void {
    // Geometric entrance canopy - futuristic overhang
    const canopyGeometry = new THREE.BoxGeometry(8, 0.3, 4);
    const canopyMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x4169E1,
      transparent: true,
      opacity: 0.9
    });
    const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
    canopy.position.set(0, 3, 8);
    canopy.castShadow = true;
    this.schoolGroup.add(canopy);

    // Canopy support pillars - modern minimalist
    const pillarGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3);
    const pillarMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    
    const leftPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    leftPillar.position.set(-3, 1.5, 8);
    leftPillar.castShadow = true;
    this.schoolGroup.add(leftPillar);
    
    const rightPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    rightPillar.position.set(3, 1.5, 8);
    rightPillar.castShadow = true;
    this.schoolGroup.add(rightPillar);

    // Modern entrance portal - glass and steel
    const portalFrameGeometry = new THREE.BoxGeometry(4, 6, 0.2);
    const portalFrameMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    const portalFrame = new THREE.Mesh(portalFrameGeometry, portalFrameMaterial);
    portalFrame.position.set(0, 3, 6.2);
    this.schoolGroup.add(portalFrame);

    // Transparent entrance doors
    const doorGeometry = new THREE.PlaneGeometry(1.8, 5.5);
    const doorMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.3
    });
    
    const leftDoor = new THREE.Mesh(doorGeometry, doorMaterial);
    leftDoor.position.set(-0.9, 3, 6.25);
    this.schoolGroup.add(leftDoor);

    const rightDoor = new THREE.Mesh(doorGeometry, doorMaterial);
    rightDoor.position.set(0.9, 3, 6.25);
    this.schoolGroup.add(rightDoor);

    // LED strip lighting effect (simulated)
    const ledGeometry = new THREE.BoxGeometry(4, 0.05, 0.05);
    const ledMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x00FFFF,
      emissive: 0x004444
    });
    const ledStrip = new THREE.Mesh(ledGeometry, ledMaterial);
    ledStrip.position.set(0, 5.8, 6.3);
    this.schoolGroup.add(ledStrip);
  }

  private createGeometricElements(): void {
    // Modern geometric roof elements - no traditional roof
    const roofGeometry = new THREE.BoxGeometry(12.2, 0.3, 12.2);
    const roofMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x4169E1,
      transparent: true,
      opacity: 0.8
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 8.15, 0);
    roof.castShadow = true;
    this.schoolGroup.add(roof);

    // Floating geometric accent elements
    const accentGeometry = new THREE.BoxGeometry(2, 2, 2);
    const accentMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xFF6347,
      transparent: true,
      opacity: 0.7
    });
    
    // Floating cubes for dynamic visual interest
    const accent1 = new THREE.Mesh(accentGeometry, accentMaterial);
    accent1.position.set(-10, 6, 4);
    accent1.rotation.set(Math.PI / 4, Math.PI / 4, 0);
    accent1.castShadow = true;
    this.schoolGroup.add(accent1);
    
    const accent2 = new THREE.Mesh(accentGeometry, accentMaterial);
    accent2.position.set(10, 5, -6);
    accent2.rotation.set(0, Math.PI / 4, Math.PI / 4);
    accent2.castShadow = true;
    this.schoolGroup.add(accent2);

    // Modern signage element
    const signGeometry = new THREE.BoxGeometry(6, 1, 0.2);
    const signMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x2F4F4F,
      emissive: 0x111111
    });
    const sign = new THREE.Mesh(signGeometry, signMaterial);
    sign.position.set(0, 9, 0.5);
    this.schoolGroup.add(sign);
  }

  private createLandscaping(): void {
    // Modern landscaping elements
    
    // Geometric planters
    const planterGeometry = new THREE.CylinderGeometry(1.5, 1.5, 1);
    const planterMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    
    const planter1 = new THREE.Mesh(planterGeometry, planterMaterial);
    planter1.position.set(-12, 0.5, 2);
    planter1.receiveShadow = true;
    this.schoolGroup.add(planter1);
    
    const planter2 = new THREE.Mesh(planterGeometry, planterMaterial);
    planter2.position.set(12, 0.5, -2);
    planter2.receiveShadow = true;
    this.schoolGroup.add(planter2);

    // Modern sculptural elements
    const sculptureGeometry = new THREE.ConeGeometry(0.5, 3, 8);
    const sculptureMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xFF6347,
      metalness: 0.5
    });
    const sculpture = new THREE.Mesh(sculptureGeometry, sculptureMaterial);
    sculpture.position.set(-15, 1.5, -3);
    sculpture.castShadow = true;
    this.schoolGroup.add(sculpture);

    // Modern seating elements
    const benchGeometry = new THREE.BoxGeometry(3, 0.3, 1);
    const benchMaterial = new THREE.MeshLambertMaterial({ color: 0x2F4F4F });
    
    const bench1 = new THREE.Mesh(benchGeometry, benchMaterial);
    bench1.position.set(-8, 0.65, 10);
    bench1.receiveShadow = true;
    this.schoolGroup.add(bench1);
    
    const bench2 = new THREE.Mesh(benchGeometry, benchMaterial);
    bench2.position.set(8, 0.65, 10);
    bench2.receiveShadow = true;
    this.schoolGroup.add(bench2);

    // Digital information kiosk
    const kioskGeometry = new THREE.BoxGeometry(1, 2.5, 0.2);
    const kioskMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x2F4F4F,
      emissive: 0x001122
    });
    const kiosk = new THREE.Mesh(kioskGeometry, kioskMaterial);
    kiosk.position.set(15, 1.25, 0);
    kiosk.castShadow = true;
    this.schoolGroup.add(kiosk);
  }


  public getSchoolGroup(): THREE.Group {
    return this.schoolGroup;
  }
}