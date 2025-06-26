import * as THREE from 'three';
import { SceneData } from '../TimeBasedSceneController';

export class AnimationController {
  private scene: THREE.Scene;
  private animatedObjects: THREE.Group;
  private schoolBus: THREE.Group | null = null;
  private students: THREE.Group | null = null;
  private teacher: THREE.Group | null = null;
  private birds: THREE.Group | null = null;
  private owl: THREE.Group | null = null;
  private fireflies: THREE.Group | null = null;
  private flag: THREE.Mesh | null = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.animatedObjects = new THREE.Group();
    this.scene.add(this.animatedObjects);
    this.initializeAnimatedElements();
  }

  private initializeAnimatedElements(): void {
    this.createSchoolBus();
    this.createStudents();
    this.createTeacher();
    this.createBirds();
    this.createOwl();
    this.createFireflies();
    this.findFlag();
  }

  private createSchoolBus(): void {
    this.schoolBus = new THREE.Group();
    
    // Bus body
    const busGeometry = new THREE.BoxGeometry(8, 3, 3);
    const busMaterial = new THREE.MeshLambertMaterial({ color: 0xFFD700 });
    const busBody = new THREE.Mesh(busGeometry, busMaterial);
    busBody.position.set(0, 1.5, 0);
    busBody.castShadow = true;
    this.schoolBus.add(busBody);

    // Bus wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    const wheels = [
      { x: -2.5, y: 0.8, z: 1.5 },
      { x: -2.5, y: 0.8, z: -1.5 },
      { x: 2.5, y: 0.8, z: 1.5 },
      { x: 2.5, y: 0.8, z: -1.5 }
    ];

    wheels.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(pos.x, pos.y, pos.z);
      wheel.rotation.x = Math.PI / 2;
      this.schoolBus.add(wheel);
    });

    // Bus windows
    const windowGeometry = new THREE.BoxGeometry(1.5, 1, 0.1);
    const windowMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.7
    });

    for (let i = 0; i < 4; i++) {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(-2.5 + i * 1.5, 2.5, 1.55);
      this.schoolBus.add(window);
    }

    // Position bus off-scene initially
    this.schoolBus.position.set(-50, 0, 10);
    this.schoolBus.visible = false;
    this.animatedObjects.add(this.schoolBus);
  }

  private createStudents(): void {
    this.students = new THREE.Group();

    // Create simple student figures
    for (let i = 0; i < 8; i++) {
      const student = new THREE.Group();
      
      // Body
      const bodyGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5);
      const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffa500, 0x800080];
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: colors[i] });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.set(0, 0.75, 0);
      student.add(body);

      // Head
      const headGeometry = new THREE.SphereGeometry(0.3, 8, 8);
      const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
      const head = new THREE.Mesh(headGeometry, headMaterial);
      head.position.set(0, 1.8, 0);
      student.add(head);

      // Position students randomly
      student.position.set(
        (Math.random() - 0.5) * 20,
        0,
        (Math.random() - 0.5) * 15
      );
      
      student.visible = false;
      this.students.add(student);
    }

    this.animatedObjects.add(this.students);
  }

  private createTeacher(): void {
    this.teacher = new THREE.Group();

    // Teacher figure (taller than students)
    const bodyGeometry = new THREE.CylinderGeometry(0.4, 0.4, 2);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x4169E1 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.set(0, 1, 0);
    this.teacher.add(body);

    const headGeometry = new THREE.SphereGeometry(0.35, 8, 8);
    const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(0, 2.35, 0);
    this.teacher.add(head);

    // Position teacher at classroom window
    this.teacher.position.set(-2.5, 3, -1);
    this.teacher.visible = false;
    this.animatedObjects.add(this.teacher);
  }

  private createBirds(): void {
    this.birds = new THREE.Group();

    for (let i = 0; i < 5; i++) {
      const bird = new THREE.Group();
      
      // Simple bird body
      const bodyGeometry = new THREE.SphereGeometry(0.1, 6, 6);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      bird.add(body);

      // Wings
      const wingGeometry = new THREE.PlaneGeometry(0.3, 0.1);
      const wingMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x654321,
        side: THREE.DoubleSide
      });
      
      const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
      leftWing.position.set(-0.15, 0, 0);
      bird.add(leftWing);
      
      const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
      rightWing.position.set(0.15, 0, 0);
      bird.add(rightWing);

      // Position birds around tree
      const angle = (i / 5) * Math.PI * 2;
      bird.position.set(
        -12 + Math.cos(angle) * 8,
        12 + Math.random() * 4,
        8 + Math.sin(angle) * 8
      );
      
      bird.visible = false;
      this.birds.add(bird);
    }

    this.animatedObjects.add(this.birds);
  }

  private createOwl(): void {
    this.owl = new THREE.Group();

    // Owl body
    const bodyGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    this.owl.add(body);

    // Owl eyes
    const eyeGeometry = new THREE.SphereGeometry(0.08, 6, 6);
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.1, 0.1, 0.25);
    this.owl.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.1, 0.1, 0.25);
    this.owl.add(rightEye);

    // Position owl on tree
    this.owl.position.set(-10, 10, 8);
    this.owl.visible = false;
    this.animatedObjects.add(this.owl);
  }

  private createFireflies(): void {
    this.fireflies = new THREE.Group();

    for (let i = 0; i < 15; i++) {
      const fireflyGeometry = new THREE.SphereGeometry(0.05, 6, 6);
      const fireflyMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffff00,
        emissive: 0x444400
      });
      const firefly = new THREE.Mesh(fireflyGeometry, fireflyMaterial);
      
      // Random position around tree
      firefly.position.set(
        -12 + (Math.random() - 0.5) * 16,
        2 + Math.random() * 6,
        8 + (Math.random() - 0.5) * 16
      );
      
      firefly.visible = false;
      this.fireflies.add(firefly);
    }

    this.animatedObjects.add(this.fireflies);
  }

  private findFlag(): void {
    // Find the flag in the scene (created by SchoolBuilder)
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry) {
        if (child.material instanceof THREE.MeshLambertMaterial && 
            child.material.color.getHex() === 0xFF0000) {
          this.flag = child;
        }
      }
    });
  }

  public updateAnimationsForScene(sceneData: SceneData): void {
    // Update visibility based on scene data
    if (this.schoolBus) {
      this.schoolBus.visible = !!sceneData.animations.schoolBus;
    }
    
    if (this.students) {
      this.students.visible = !!sceneData.animations.students;
    }
    
    if (this.teacher) {
      this.teacher.visible = !!sceneData.animations.teacher;
    }
    
    if (this.birds) {
      this.birds.visible = !!sceneData.animations.birds;
    }
    
    if (this.owl) {
      this.owl.visible = !!sceneData.animations.owl;
    }
    
    if (this.fireflies) {
      this.fireflies.visible = !!sceneData.animations.fireflies;
    }

    // Flag animation
    if (this.flag && sceneData.animations.flagRaised) {
      this.flag.visible = true;
    } else if (this.flag) {
      this.flag.visible = false;
    }
  }

  public update(): void {
    const time = Date.now() * 0.001;

    // Animate school bus movement
    if (this.schoolBus && this.schoolBus.visible) {
      this.schoolBus.position.x = -30 + Math.sin(time * 0.5) * 5;
    }

    // Animate students walking
    if (this.students && this.students.visible) {
      this.students.children.forEach((student, index) => {
        if (student instanceof THREE.Group) {
          student.position.x += Math.sin(time + index) * 0.01;
          student.position.z += Math.cos(time + index) * 0.01;
        }
      });
    }

    // Animate teacher gesturing
    if (this.teacher && this.teacher.visible) {
      this.teacher.rotation.y = Math.sin(time * 2) * 0.3;
    }

    // Animate birds flying
    if (this.birds && this.birds.visible) {
      this.birds.children.forEach((bird, index) => {
        if (bird instanceof THREE.Group) {
          bird.position.y += Math.sin(time * 2 + index) * 0.02;
          bird.rotation.z = Math.sin(time * 3 + index) * 0.2;
          
          // Animate wings
          const wings = bird.children.filter(child => child instanceof THREE.Mesh && 
            child.geometry instanceof THREE.PlaneGeometry);
          wings.forEach(wing => {
            wing.rotation.z = Math.sin(time * 10 + index) * 0.5;
          });
        }
      });
    }

    // Animate owl turning head
    if (this.owl && this.owl.visible) {
      this.owl.rotation.y = Math.sin(time * 0.5) * 0.8;
    }

    // Animate fireflies
    if (this.fireflies && this.fireflies.visible) {
      this.fireflies.children.forEach((firefly, index) => {
        if (firefly instanceof THREE.Mesh) {
          firefly.position.x += Math.sin(time + index) * 0.01;
          firefly.position.y += Math.cos(time * 2 + index) * 0.01;
          firefly.position.z += Math.sin(time * 1.5 + index) * 0.01;
          
          // Glow effect
          const material = firefly.material as THREE.MeshLambertMaterial;
          const glowIntensity = 0.2 + Math.sin(time * 4 + index) * 0.2;
          material.emissive.setHex(parseInt((0x444400 * glowIntensity).toString(16)));
        }
      });
    }

    // Animate flag waving
    if (this.flag && this.flag.visible) {
      this.flag.rotation.y = Math.sin(time * 3) * 0.1;
    }
  }
}