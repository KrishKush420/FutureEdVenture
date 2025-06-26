import * as THREE from 'three';
import { SceneData } from '../TimeBasedSceneController';

export class SkyController {
  private scene: THREE.Scene;
  private skyGeometry: THREE.SphereGeometry;
  private skyMaterial: THREE.ShaderMaterial;
  private skyMesh: THREE.Mesh;
  private stars: THREE.Points | null = null;
  private moon: THREE.Mesh | null = null;
  private clouds: THREE.Group;
  
  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.clouds = new THREE.Group();
    this.scene.add(this.clouds);
    this.createSky();
  }

  public createSky(): void {
    // Create sky dome
    this.skyGeometry = new THREE.SphereGeometry(200, 32, 32);
    
    // Sky shader for gradient effect
    this.skyMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      uniforms: {
        topColor: { value: new THREE.Color(0x87CEEB) }, // Sky blue
        bottomColor: { value: new THREE.Color(0xB0E0E6) }, // Powder blue
        offset: { value: 33 },
        exponent: { value: 0.8 }
      },
      side: THREE.BackSide
    });

    this.skyMesh = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
    this.scene.add(this.skyMesh);
  }

  public updateSkyForScene(sceneData: SceneData): void {
    // Update sky gradient colors to sky blue tones
    this.skyMaterial.uniforms.topColor.value.setHex(0x87CEEB); // Sky blue
    this.skyMaterial.uniforms.bottomColor.value.setHex(0xB0E0E6); // Powder blue

    // Always show clouds during daytime hours (6 AM to 6 PM)
    const isDaytime = sceneData.hour >= 6 && sceneData.hour <= 18;
    const shouldShowClouds = isDaytime || sceneData.weather?.clouds;
    
    const modifiedSceneData = {
      ...sceneData,
      weather: {
        ...sceneData.weather,
        clouds: shouldShowClouds,
        // Keep other weather as defined, but no stars/moon during day
        stars: sceneData.weather?.stars && !isDaytime,
        moon: sceneData.weather?.moon && !isDaytime
      }
    };

    // Handle weather elements
    this.updateWeatherEffects(modifiedSceneData);
  }

  private updateWeatherEffects(sceneData: SceneData): void {
    // Stars
    if (sceneData.weather?.stars && !this.stars) {
      this.createStars();
    } else if (!sceneData.weather?.stars && this.stars) {
      this.removeStars();
    }

    // Moon
    if (sceneData.weather?.moon && !this.moon) {
      this.createMoon();
    } else if (!sceneData.weather?.moon && this.moon) {
      this.removeMoon();
    }

    // Clouds
    if (sceneData.weather?.clouds) {
      this.createClouds();
    } else {
      this.removeClouds();
    }

    // Update visibility based on time
    if (this.stars) {
      this.stars.visible = !!sceneData.weather?.stars;
    }
    if (this.moon) {
      this.moon.visible = !!sceneData.weather?.moon;
    }
  }

  private createStars(): void {
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      // Create stars in a sphere around the scene
      const radius = 150 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.cos(phi);
      positions[i + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 2,
      sizeAttenuation: false
    });

    this.stars = new THREE.Points(starsGeometry, starsMaterial);
    this.scene.add(this.stars);
  }

  private removeStars(): void {
    if (this.stars) {
      this.scene.remove(this.stars);
      this.stars.geometry.dispose();
      (this.stars.material as THREE.Material).dispose();
      this.stars = null;
    }
  }

  private createMoon(): void {
    const moonGeometry = new THREE.SphereGeometry(3, 16, 16);
    const moonMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xFFFACD,
      emissive: 0x444444
    });
    this.moon = new THREE.Mesh(moonGeometry, moonMaterial);
    this.moon.position.set(50, 40, -30);
    this.scene.add(this.moon);
  }

  private removeMoon(): void {
    if (this.moon) {
      this.scene.remove(this.moon);
      this.moon.geometry.dispose();
      (this.moon.material as THREE.Material).dispose();
      this.moon = null;
    }
  }

  private createClouds(): void {
    this.removeClouds(); // Remove existing clouds first

    // Create more clouds for better sky coverage
    for (let i = 0; i < 12; i++) {
      const cloud = this.createSingleCloud();
      cloud.position.set(
        (Math.random() - 0.5) * 300,
        15 + Math.random() * 25,
        (Math.random() - 0.5) * 300
      );
      cloud.scale.setScalar(0.8 + Math.random() * 0.7);
      cloud.rotation.y = Math.random() * Math.PI * 2;
      this.clouds.add(cloud);
    }
  }

  private createSingleCloud(): THREE.Group {
    const cloud = new THREE.Group();
    const cloudMaterial = new THREE.MeshLambertMaterial({ 
      color: 0xffffff,
      transparent: true,
      opacity: 0.9
    });

    // Create more realistic cloud puffs with better distribution
    for (let i = 0; i < 8; i++) {
      const puffGeometry = new THREE.SphereGeometry(
        1.5 + Math.random() * 2.5, 
        12, 
        12
      );
      const puff = new THREE.Mesh(puffGeometry, cloudMaterial);
      
      // Better cloud shape distribution
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2 + Math.random() * 3;
      puff.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 2
      );
      
      // Slight scale variation for organic look
      puff.scale.setScalar(0.8 + Math.random() * 0.4);
      cloud.add(puff);
    }

    return cloud;
  }

  private removeClouds(): void {
    this.clouds.children.forEach(cloud => {
      if (cloud instanceof THREE.Group) {
        cloud.children.forEach(puff => {
          if (puff instanceof THREE.Mesh) {
            puff.geometry.dispose();
            (puff.material as THREE.Material).dispose();
          }
        });
      }
    });
    this.clouds.clear();
  }

  public update(currentTime: { progress: number; hour: number }): void {
    // COMPLETELY DISABLED ALL ANIMATIONS TO STOP CLOUD MOVEMENT
    return;
    
    // // Animate stars twinkling
    // if (this.stars) {
    //   const material = this.stars.material as THREE.PointsMaterial;
    //   material.size = 2 + Math.sin(Date.now() * 0.002) * 0.5;
    // }

    // // Clouds are static - no movement
    // // this.clouds.children.forEach((cloud, index) => {
    // //   cloud.position.x += Math.sin(Date.now() * 0.0000000001 + index) * 0.000000001;
    // //   cloud.rotation.y += 0.0000000001;
    // // });

    // // Animate moon glow
    // if (this.moon) {
    //   const material = this.moon.material as THREE.MeshLambertMaterial;
    //   const glowIntensity = 0.3 + Math.sin(Date.now() * 0.001) * 0.1;
    //   material.emissive.setHex(parseInt((0x444444 * glowIntensity).toString(16)));
    // }
  }
}