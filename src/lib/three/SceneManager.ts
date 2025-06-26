import * as THREE from 'three';
import { TimeBasedSceneController } from './TimeBasedSceneController';
import { SchoolBuilder } from './models/SchoolBuilder';
import { TreeBuilder } from './models/TreeBuilder';
import { SkyController } from './effects/SkyController';
import { LightingController } from './effects/LightingController';
import { AnimationController } from './effects/AnimationController';

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private timeController: TimeBasedSceneController;
  private schoolBuilder: SchoolBuilder;
  private treeBuilder: TreeBuilder;
  private skyController: SkyController;
  private lightingController: LightingController;
  private animationController: AnimationController;

  constructor(canvas: HTMLCanvasElement) {
    try {
      // Initialize Three.js core components
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / (window.innerHeight / 2), // Adjust for top half only
        0.1,
        1000
      );
      
      this.renderer = new THREE.WebGLRenderer({ 
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false
      });
      
      this.renderer.setSize(window.innerWidth, window.innerHeight / 2); // Set actual size to half height
      this.renderer.setViewport(0, 0, window.innerWidth, window.innerHeight / 2); // Only render top half
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for high DPI
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 0.8;
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      
      // Enhanced rendering quality
      this.renderer.physicallyCorrectLights = true;

      // Initialize scene controllers
      this.timeController = new TimeBasedSceneController();
      this.schoolBuilder = new SchoolBuilder(this.scene);
      this.treeBuilder = new TreeBuilder(this.scene);
      this.skyController = new SkyController(this.scene);
      this.lightingController = new LightingController(this.scene);
      this.animationController = new AnimationController(this.scene);

      this.initializeScene();
    } catch (error) {
      console.error('SceneManager initialization failed:', error);
      throw error;
    }
  }

  private initializeScene(): void {
    // Set scene background to sky blue
    this.scene.background = new THREE.Color(0x87CEEB);
    
    // Set camera position - adjusted for top half focus
    this.camera.position.set(0, 12, 30);
    this.camera.lookAt(0, 5, 0);

    // Create ground plane first
    this.createGroundPlane();
    
    // Build the main scene elements
    this.schoolBuilder.buildSchool();
    this.treeBuilder.buildTree();
    this.skyController.createSky();
    this.lightingController.setupLighting();

    // Initialize with current time scene - force daytime for sky blue with clouds
    this.updateSceneForTime(12); // Noon for best daytime effect
  }

  public update(): void {
    // COMPLETELY DISABLED ALL UPDATES TO STOP ANY MOVEMENT
    return;
    
    // const currentHour = new Date().getHours();
    // const currentTime = this.timeController.getCurrentTimeData();
    
    // // Update scene based on current time
    // this.updateSceneForTime(currentHour);
    
    // // Update animations
    // this.animationController.update();
    // this.skyController.update(currentTime);
    // this.lightingController.update(currentTime);
  }

  private updateSceneForTime(hour: number): void {
    const sceneData = this.timeController.getSceneForHour(hour);
    
    // Update sky
    this.skyController.updateSkyForScene(sceneData);
    
    // Update lighting
    this.lightingController.updateLightingForScene(sceneData);
    
    // Update animations
    this.animationController.updateAnimationsForScene(sceneData);
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public handleResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / (height / 2); // Adjust aspect ratio for top half only
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height / 2); // Set actual size to half height
    this.renderer.setViewport(0, 0, width, height / 2); // Maintain top half viewport
  }

  private createGroundPlane(): void {
    // Large ground plane to simulate paved road/asphalt
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x404040, // Dark grey for asphalt/paved road
      transparent: false
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    ground.position.set(0, 0, 0);
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  public dispose(): void {
    this.renderer.dispose();
    this.scene.clear();
  }
}