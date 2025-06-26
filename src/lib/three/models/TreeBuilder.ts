import * as THREE from 'three';

export class TreeBuilder {
  private scene: THREE.Scene;
  private treeGroup: THREE.Group;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.treeGroup = new THREE.Group();
    this.scene.add(this.treeGroup);
  }

  public buildTree(): void {
    this.createMainTree();
    this.createForest();
  }

  private createMainTree(): void {
    this.createTrunk();
    this.createLeaves();
    this.createTreeBase();
  }

  private createTrunk(): void {
    // Taller, more realistic conifer trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.6, 0.8, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 }); // Darker brown
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(-12, 4, 6);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    this.treeGroup.add(trunk);

    // Add bark texture detail with vertical ridges
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const ridgeGeometry = new THREE.BoxGeometry(0.05, 8, 0.1);
      const ridgeMaterial = new THREE.MeshLambertMaterial({ color: 0x4A4A4A });
      const ridge = new THREE.Mesh(ridgeGeometry, ridgeMaterial);
      
      ridge.position.set(
        -12 + Math.cos(angle) * 0.75,
        4,
        6 + Math.sin(angle) * 0.75
      );
      ridge.rotation.y = angle;
      this.treeGroup.add(ridge);
    }
  }


  private createLeaves(): void {
    // Create layered conical structure like a realistic conifer
    const layers = [
      { radius: 5.5, height: 2, y: 4, opacity: 1.0, color: 0x0F4F0F }, // Bottom layer - darkest
      { radius: 4.8, height: 2, y: 5.5, opacity: 0.95, color: 0x228B22 }, // Second layer
      { radius: 4.0, height: 2, y: 7, opacity: 0.9, color: 0x32CD32 }, // Third layer
      { radius: 3.2, height: 2, y: 8.5, opacity: 0.85, color: 0x3CB371 }, // Fourth layer
      { radius: 2.4, height: 2, y: 10, opacity: 0.8, color: 0x90EE90 }, // Fifth layer
      { radius: 1.6, height: 1.5, y: 11.2, opacity: 0.75, color: 0x98FB98 }, // Top layer - lightest
    ];

    layers.forEach((layer, index) => {
      // Create cone geometry for natural conifer shape
      const coneGeometry = new THREE.ConeGeometry(layer.radius, layer.height, 12);
      const coneMaterial = new THREE.MeshLambertMaterial({ 
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide
      });
      
      const cone = new THREE.Mesh(coneGeometry, coneMaterial);
      cone.position.set(-12, layer.y, 6);
      cone.castShadow = true;
      cone.receiveShadow = true;
      this.treeGroup.add(cone);

      // Add needle texture detail using small cylinder "needles" around each layer
      const needleCount = Math.max(8, 16 - index * 2); // Fewer needles on smaller layers
      for (let i = 0; i < needleCount; i++) {
        const angle = (i / needleCount) * Math.PI * 2;
        const needleRadius = layer.radius * 0.8;
        
        // Create small needle clusters
        const needleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3);
        const needleMaterial = new THREE.MeshLambertMaterial({ 
          color: layer.color,
          transparent: true,
          opacity: layer.opacity * 0.8
        });
        
        const needle = new THREE.Mesh(needleGeometry, needleMaterial);
        needle.position.set(
          -12 + Math.cos(angle) * needleRadius,
          layer.y + Math.random() * 0.4 - 0.2,
          6 + Math.sin(angle) * needleRadius
        );
        
        // Random needle orientation for natural look
        needle.rotation.x = (Math.random() - 0.5) * 0.5;
        needle.rotation.z = (Math.random() - 0.5) * 0.5;
        
        this.treeGroup.add(needle);
      }
    });

    // Add a very small top spike
    const topGeometry = new THREE.ConeGeometry(0.3, 1);
    const topMaterial = new THREE.MeshLambertMaterial({ color: 0x98FB98 });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(-12, 12.5, 6);
    top.castShadow = true;
    this.treeGroup.add(top);
  }

  private createTreeBase(): void {
    // Larger grass area for the bigger tree
    const grassGeometry = new THREE.CircleGeometry(3.5, 16);
    const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const grassCircle = new THREE.Mesh(grassGeometry, grassMaterial);
    grassCircle.rotation.x = -Math.PI / 2;
    grassCircle.position.set(-12, 0.01, 6);
    grassCircle.receiveShadow = true;
    this.treeGroup.add(grassCircle);

    // Add some fallen needles around the base
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 2;
      
      const needleGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.2);
      const needleMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x8B4513,
        transparent: true,
        opacity: 0.7
      });
      
      const fallenNeedle = new THREE.Mesh(needleGeometry, needleMaterial);
      fallenNeedle.position.set(
        -12 + Math.cos(angle) * radius,
        0.05,
        6 + Math.sin(angle) * radius
      );
      fallenNeedle.rotation.x = Math.PI / 2;
      fallenNeedle.rotation.z = Math.random() * Math.PI * 2;
      
      this.treeGroup.add(fallenNeedle);
    }
  }

  public getTreeGroup(): THREE.Group {
    return this.treeGroup;
  }

  private createForest(): void {
    // Define forest positions around the school, avoiding the main areas
    const forestPositions = [
      // Behind the school
      { x: -25, z: -15, scale: 0.8 },
      { x: -20, z: -20, scale: 1.2 },
      { x: -15, z: -18, scale: 0.9 },
      { x: -30, z: -10, scale: 1.1 },
      { x: -35, z: -5, scale: 0.7 },
      
      // Right side of school
      { x: 25, z: -10, scale: 1.0 },
      { x: 30, z: -5, scale: 0.8 },
      { x: 35, z: 0, scale: 1.3 },
      { x: 28, z: 5, scale: 0.9 },
      { x: 32, z: 10, scale: 1.1 },
      
      // Left side background
      { x: -40, z: 5, scale: 0.6 },
      { x: -35, z: 10, scale: 1.0 },
      { x: -30, z: 15, scale: 0.8 },
      { x: -25, z: 12, scale: 1.2 },
      
      // Far background
      { x: -45, z: -25, scale: 0.5 },
      { x: -40, z: -30, scale: 0.7 },
      { x: 40, z: -15, scale: 0.6 },
      { x: 45, z: -20, scale: 0.8 },
      { x: 50, z: -10, scale: 0.5 },
      
      // Scattered around
      { x: -18, z: 20, scale: 0.9 },
      { x: 20, z: 25, scale: 0.7 },
      { x: -25, z: 25, scale: 1.0 },
      { x: 35, z: 20, scale: 0.8 },
    ];

    forestPositions.forEach((pos, index) => {
      this.createSingleForestTree(pos.x, pos.z, pos.scale, index);
    });
  }

  private createSingleForestTree(x: number, z: number, scale: number, index: number): void {
    const treeGroup = new THREE.Group();
    
    // Create trunk
    const trunkHeight = 6 + Math.random() * 4;
    const trunkGeometry = new THREE.CylinderGeometry(0.4 * scale, 0.6 * scale, trunkHeight * scale);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, (trunkHeight * scale) / 2, z);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    treeGroup.add(trunk);

    // Create simplified layered foliage for performance
    const layers = [
      { radius: 3.5 * scale, height: 1.5 * scale, y: trunkHeight * scale * 0.7, color: 0x0F4F0F },
      { radius: 2.8 * scale, height: 1.5 * scale, y: trunkHeight * scale * 0.85, color: 0x228B22 },
      { radius: 2.0 * scale, height: 1.2 * scale, y: trunkHeight * scale, color: 0x32CD32 },
      { radius: 1.2 * scale, height: 1.0 * scale, y: trunkHeight * scale * 1.1, color: 0x90EE90 },
    ];

    layers.forEach(layer => {
      const coneGeometry = new THREE.ConeGeometry(layer.radius, layer.height, 8); // Lower poly for performance
      const coneMaterial = new THREE.MeshLambertMaterial({ 
        color: layer.color,
        transparent: true,
        opacity: 0.9
      });
      
      const cone = new THREE.Mesh(coneGeometry, coneMaterial);
      cone.position.set(x, layer.y, z);
      cone.castShadow = true;
      cone.receiveShadow = true;
      treeGroup.add(cone);
    });

    // Add tree top
    const topGeometry = new THREE.ConeGeometry(0.2 * scale, 0.8 * scale, 6);
    const topMaterial = new THREE.MeshLambertMaterial({ color: 0x98FB98 });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(x, trunkHeight * scale * 1.2, z);
    top.castShadow = true;
    treeGroup.add(top);

    // Simple grass base
    const grassGeometry = new THREE.CircleGeometry(2 * scale, 8);
    const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const grassCircle = new THREE.Mesh(grassGeometry, grassMaterial);
    grassCircle.rotation.x = -Math.PI / 2;
    grassCircle.position.set(x, 0.01, z);
    grassCircle.receiveShadow = true;
    treeGroup.add(grassCircle);

    this.treeGroup.add(treeGroup);
  }

  public animateLeaves(time: number): void {
    // Gentle swaying animation for the main canopy
    this.treeGroup.children.forEach((child, index) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshLambertMaterial) {
        if (child.material.color.getHex() === 0x228B22 || child.material.color.getHex() === 0x32CD32) {
          child.rotation.z = Math.sin(time * 1.5 + index) * 0.05;
        }
      }
    });
  }
}