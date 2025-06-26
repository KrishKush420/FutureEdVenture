import * as THREE from 'three';
import { SceneData } from '../TimeBasedSceneController';

export class LightingController {
  private scene: THREE.Scene;
  private sunLight: THREE.DirectionalLight;
  private ambientLight: THREE.AmbientLight;
  private moonLight: THREE.DirectionalLight;
  private streetLights: THREE.Group;
  private classroomLights: THREE.Group;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.streetLights = new THREE.Group();
    this.classroomLights = new THREE.Group();
    this.scene.add(this.streetLights);
    this.scene.add(this.classroomLights);
    this.setupLighting();
  }

  public setupLighting(): void {
    // Sun light (directional)
    this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
    this.sunLight.position.set(0, 50, 0);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 2048;
    this.sunLight.shadow.mapSize.height = 2048;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 100;
    this.sunLight.shadow.camera.left = -50;
    this.sunLight.shadow.camera.right = 50;
    this.sunLight.shadow.camera.top = 50;
    this.sunLight.shadow.camera.bottom = -50;
    this.scene.add(this.sunLight);

    // Ambient light
    this.ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(this.ambientLight);

    // Moon light (for nighttime)
    this.moonLight = new THREE.DirectionalLight(0x9999ff, 0.2);
    this.moonLight.position.set(50, 40, -30);
    this.moonLight.castShadow = true;
    this.moonLight.visible = false;
    this.scene.add(this.moonLight);

    // Street lights removed for cleaner modern scene
    // this.createStreetLights();
    
    // Create classroom lights
    this.createClassroomLights();
  }

  private createStreetLights(): void {
    const streetLightPositions = [
      { x: -20, z: 15 },
      { x: 20, z: 15 },
      { x: -20, z: -15 },
      { x: 20, z: -15 },
      { x: 0, z: 20 }
    ];

    streetLightPositions.forEach((pos) => {
      // Street light pole
      const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 8);
      const poleMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
      const pole = new THREE.Mesh(poleGeometry, poleMaterial);
      pole.position.set(pos.x, 4, pos.z);
      pole.castShadow = true;
      this.streetLights.add(pole);

      // Light fixture
      const fixtureGeometry = new THREE.SphereGeometry(0.5, 8, 8);
      const fixtureMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffff99,
        emissive: 0x222200
      });
      const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial);
      fixture.position.set(pos.x, 7.5, pos.z);
      this.streetLights.add(fixture);

      // Point light
      const pointLight = new THREE.PointLight(0xffff99, 0.5, 20);
      pointLight.position.set(pos.x, 7.5, pos.z);
      pointLight.castShadow = true;
      pointLight.visible = false; // Initially off
      this.streetLights.add(pointLight);
    });
  }

  private createClassroomLights(): void {
    // Classroom window lights
    const windowPositions = [
      { x: -7.5, y: 6, z: -0.9 },
      { x: -5, y: 6, z: -0.9 },
      { x: -2.5, y: 6, z: -0.9 },
      { x: 0, y: 6, z: -0.9 },
      { x: 2.5, y: 6, z: -0.9 },
      { x: 5, y: 6, z: -0.9 },
      { x: -7.5, y: 8.5, z: -0.9 },
      { x: -5, y: 8.5, z: -0.9 },
      { x: -2.5, y: 8.5, z: -0.9 },
      { x: 0, y: 8.5, z: -0.9 },
      { x: 2.5, y: 8.5, z: -0.9 },
      { x: 5, y: 8.5, z: -0.9 }
    ];

    windowPositions.forEach(pos => {
      const windowLight = new THREE.PointLight(0xffffcc, 0.3, 10);
      windowLight.position.set(pos.x, pos.y, pos.z);
      windowLight.visible = false; // Initially off
      this.classroomLights.add(windowLight);
    });
  }

  public updateLightingForScene(sceneData: SceneData): void {
    // Update sun position and intensity
    this.sunLight.position.set(
      sceneData.sunPosition.x,
      sceneData.sunPosition.y,
      sceneData.sunPosition.z
    );
    this.sunLight.intensity = sceneData.lighting.sunIntensity;
    this.sunLight.color.setHex(parseInt(sceneData.lighting.sunColor.replace('#', '0x')));

    // Update ambient light
    this.ambientLight.intensity = sceneData.lighting.ambientIntensity;
    this.ambientLight.color.setHex(parseInt(sceneData.lighting.ambientColor.replace('#', '0x')));

    // Handle moon light for nighttime
    const isNightTime = sceneData.hour >= 19 || sceneData.hour <= 6;
    this.moonLight.visible = isNightTime;
    
    if (isNightTime) {
      this.moonLight.intensity = 0.2 + (1 - sceneData.lighting.sunIntensity) * 0.3;
    }

    // Street lights removed
    // this.updateStreetLights(sceneData);

    // Update classroom lights
    this.updateClassroomLights(sceneData);
  }

  private updateStreetLights(sceneData: SceneData): void {
    const shouldBeOn = sceneData.animations.securityLight || sceneData.hour >= 19 || sceneData.hour <= 6;
    
    this.streetLights.children.forEach(child => {
      if (child instanceof THREE.PointLight) {
        child.visible = shouldBeOn;
        if (shouldBeOn) {
          // Flickering effect
          child.intensity = 0.5 + Math.sin(Date.now() * 0.01) * 0.1;
        }
      } else if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshLambertMaterial) {
        // Update fixture emissive
        if (child.geometry instanceof THREE.SphereGeometry) {
          child.material.emissive.setHex(shouldBeOn ? 0x444400 : 0x000000);
        }
      }
    });
  }

  private updateClassroomLights(sceneData: SceneData): void {
    const shouldBeOn = sceneData.animations.classroomLights;
    
    this.classroomLights.children.forEach((light, index) => {
      if (light instanceof THREE.PointLight) {
        light.visible = shouldBeOn;
        if (shouldBeOn) {
          // Slight variation in intensity for realism
          light.intensity = 0.3 + Math.sin(Date.now() * 0.005 + index) * 0.05;
        }
      }
    });
  }

  public update(currentTime: { progress: number; hour: number }): void {
    // Dynamic lighting effects
    
    // Sun movement animation
    const dayProgress = currentTime.progress; // 0-1 through the day
    const sunAngle = dayProgress * Math.PI * 2 - Math.PI / 2; // Sun path arc
    
    // Natural sun movement
    this.sunLight.position.x = Math.cos(sunAngle) * 50;
    this.sunLight.position.y = Math.max(Math.sin(sunAngle) * 50, -10);
    this.sunLight.position.z = 0;

    // Color temperature change throughout day
    const morningColor = new THREE.Color(0xFFB347); // Warm morning
    const noonColor = new THREE.Color(0xFFFFFF);    // Bright white
    const eveningColor = new THREE.Color(0xFF6B35); // Warm evening
    
    let sunColor = noonColor;
    if (currentTime.hour >= 5 && currentTime.hour < 10) {
      // Morning blend
      const t = (currentTime.hour - 5) / 5;
      sunColor = morningColor.clone().lerp(noonColor, t);
    } else if (currentTime.hour >= 16 && currentTime.hour < 20) {
      // Evening blend
      const t = (currentTime.hour - 16) / 4;
      sunColor = noonColor.clone().lerp(eveningColor, t);
    }
    
    this.sunLight.color = sunColor;

    // Street light animation removed
    // this.streetLights.children.forEach((child, index) => {
    //   if (child instanceof THREE.PointLight && child.visible) {
    //     child.intensity = 0.5 + Math.sin(Date.now() * 0.003 + index * 0.5) * 0.1;
    //   }
    // });
  }
}