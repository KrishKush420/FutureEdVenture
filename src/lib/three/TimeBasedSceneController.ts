export interface SceneData {
  hour: number;
  title: string;
  description: string;
  skyColor: {
    top: string;
    bottom: string;
  };
  sunPosition: {
    x: number;
    y: number;
    z: number;
  };
  lighting: {
    sunIntensity: number;
    ambientIntensity: number;
    sunColor: string;
    ambientColor: string;
  };
  animations: {
    schoolBus?: boolean;
    students?: boolean;
    teacher?: boolean;
    birds?: boolean;
    owl?: boolean;
    staff?: boolean;
    cleaningCrew?: boolean;
    securityLight?: boolean;
    classroomLights?: boolean;
    flagRaised?: boolean;
    playground?: boolean;
    fireflies?: boolean;
    shootingStar?: boolean;
  };
  weather?: {
    stars?: boolean;
    moon?: boolean;
    clouds?: boolean;
  };
}

export class TimeBasedSceneController {
  private scenes: SceneData[] = [
    {
      hour: 0,
      title: "Midnight Serenity",
      description: "Deep night - School silhouette under starry sky, single security light, owl perched on tree",
      skyColor: { top: "#0B1426", bottom: "#1A1A2E" },
      sunPosition: { x: 0, y: -50, z: 0 },
      lighting: {
        sunIntensity: 0,
        ambientIntensity: 0.1,
        sunColor: "#ffffff",
        ambientColor: "#2B2B52"
      },
      animations: {
        owl: true,
        securityLight: true
      },
      weather: {
        stars: true,
        moon: true
      }
    },
    {
      hour: 1,
      title: "Midnight Calm",
      description: "Moon illuminating empty campus, gentle breeze rustling tree leaves",
      skyColor: { top: "#0F1B2E", bottom: "#1E1E3E" },
      sunPosition: { x: 0, y: -45, z: 0 },
      lighting: {
        sunIntensity: 0,
        ambientIntensity: 0.15,
        sunColor: "#ffffff",
        ambientColor: "#3B3B62"
      },
      animations: {
        securityLight: true
      },
      weather: {
        stars: true,
        moon: true
      }
    },
    {
      hour: 2,
      title: "Pre-dawn Quiet",
      description: "Faint horizon glow, night janitor's light in one window",
      skyColor: { top: "#1A2332", bottom: "#2A2A4A" },
      sunPosition: { x: 0, y: -40, z: 0 },
      lighting: {
        sunIntensity: 0,
        ambientIntensity: 0.2,
        sunColor: "#ffffff",
        ambientColor: "#4B4B72"
      },
      animations: {
        cleaningCrew: true,
        securityLight: true
      },
      weather: {
        stars: true
      }
    },
    {
      hour: 3,
      title: "Late Night Serenity",
      description: "Shooting star across sky, peaceful sleeping campus",
      skyColor: { top: "#1E2836", bottom: "#2E2E5E" },
      sunPosition: { x: 0, y: -35, z: 0 },
      lighting: {
        sunIntensity: 0,
        ambientIntensity: 0.2,
        sunColor: "#ffffff",
        ambientColor: "#5B5B82"
      },
      animations: {
        shootingStar: true,
        securityLight: true
      },
      weather: {
        stars: true
      }
    },
    {
      hour: 4,
      title: "Dawn Approaching",
      description: "Sky beginning to lighten, first birds stirring in tree",
      skyColor: { top: "#2A3442", bottom: "#3A3A6A" },
      sunPosition: { x: -30, y: -20, z: 0 },
      lighting: {
        sunIntensity: 0.1,
        ambientIntensity: 0.3,
        sunColor: "#FFE4B5",
        ambientColor: "#6B6B92"
      },
      animations: {
        birds: true,
        securityLight: true
      },
      weather: {
        stars: true
      }
    },
    {
      hour: 5,
      title: "Early Dawn",
      description: "Soft orange glow on horizon, tree silhouette against brightening sky",
      skyColor: { top: "#4A4A72", bottom: "#FF6B35" },
      sunPosition: { x: -25, y: -10, z: 0 },
      lighting: {
        sunIntensity: 0.3,
        ambientIntensity: 0.4,
        sunColor: "#FFB347",
        ambientColor: "#7B7BA2"
      },
      animations: {
        birds: true
      }
    },
    {
      hour: 6,
      title: "Sunrise",
      description: "Golden sun rising behind school, tree casting long shadow",
      skyColor: { top: "#87CEEB", bottom: "#FF8C00" },
      sunPosition: { x: -20, y: 0, z: 0 },
      lighting: {
        sunIntensity: 0.6,
        ambientIntensity: 0.5,
        sunColor: "#FFD700",
        ambientColor: "#B0E0E6"
      },
      animations: {
        birds: true
      }
    },
    {
      hour: 7,
      title: "Morning Preparation",
      description: "Lights turning on in school offices, early staff arriving",
      skyColor: { top: "#87CEEB", bottom: "#FFA500" },
      sunPosition: { x: -15, y: 10, z: 0 },
      lighting: {
        sunIntensity: 0.8,
        ambientIntensity: 0.6,
        sunColor: "#FFD700",
        ambientColor: "#87CEEB"
      },
      animations: {
        staff: true,
        classroomLights: true,
        birds: true
      }
    },
    {
      hour: 8,
      title: "School Arrival",
      description: "School bus at entrance, students walking in, teacher visible at classroom window pointing to board",
      skyColor: { top: "#87CEEB", bottom: "#98FB98" },
      sunPosition: { x: -10, y: 20, z: 0 },
      lighting: {
        sunIntensity: 1.0,
        ambientIntensity: 0.7,
        sunColor: "#FFFF99",
        ambientColor: "#87CEEB"
      },
      animations: {
        schoolBus: true,
        students: true,
        teacher: true,
        classroomLights: true,
        birds: true
      }
    },
    {
      hour: 9,
      title: "Morning Classes",
      description: "Multiple classroom windows lit, flag raised on flagpole, birds active in tree",
      skyColor: { top: "#87CEEB", bottom: "#98FB98" },
      sunPosition: { x: -5, y: 30, z: 0 },
      lighting: {
        sunIntensity: 1.2,
        ambientIntensity: 0.8,
        sunColor: "#FFFF99",
        ambientColor: "#87CEEB"
      },
      animations: {
        classroomLights: true,
        flagRaised: true,
        birds: true,
        teacher: true
      }
    },
    {
      hour: 10,
      title: "Mid-Morning",
      description: "Bright morning sun, students visible in playground/courtyard, teacher at window",
      skyColor: { top: "#87CEEB", bottom: "#98FB98" },
      sunPosition: { x: 0, y: 35, z: 0 },
      lighting: {
        sunIntensity: 1.3,
        ambientIntensity: 0.9,
        sunColor: "#FFFF99",
        ambientColor: "#87CEEB"
      },
      animations: {
        playground: true,
        teacher: true,
        classroomLights: true,
        birds: true
      }
    },
    {
      hour: 11,
      title: "Late Morning",
      description: "Clear blue sky, PE class visible in schoolyard, tree in full daylight",
      skyColor: { top: "#87CEEB", bottom: "#98FB98" },
      sunPosition: { x: 5, y: 40, z: 0 },
      lighting: {
        sunIntensity: 1.4,
        ambientIntensity: 1.0,
        sunColor: "#FFFF99",
        ambientColor: "#87CEEB"
      },
      animations: {
        playground: true,
        students: true,
        classroomLights: true
      }
    },
    {
      hour: 12,
      title: "Lunch Time",
      description: "Students eating outside under tree, cafeteria windows glowing",
      skyColor: { top: "#87CEEB", bottom: "#98FB98" },
      sunPosition: { x: 10, y: 45, z: 0 },
      lighting: {
        sunIntensity: 1.5,
        ambientIntensity: 1.0,
        sunColor: "#FFFF99",
        ambientColor: "#87CEEB"
      },
      animations: {
        students: true,
        classroomLights: true
      }
    },
    {
      hour: 13,
      title: "Afternoon Classes",
      description: "Bright afternoon sun, shadows shorter, classroom activities visible",
      skyColor: { top: "#87CEEB", bottom: "#98FB98" },
      sunPosition: { x: 15, y: 40, z: 0 },
      lighting: {
        sunIntensity: 1.4,
        ambientIntensity: 1.0,
        sunColor: "#FFFF99",
        ambientColor: "#87CEEB"
      },
      animations: {
        teacher: true,
        classroomLights: true
      }
    },
    {
      hour: 14,
      title: "Study Period",
      description: "Library windows showing reading students, tree providing shade",
      skyColor: { top: "#87CEEB", bottom: "#98FB98" },
      sunPosition: { x: 20, y: 35, z: 0 },
      lighting: {
        sunIntensity: 1.3,
        ambientIntensity: 0.9,
        sunColor: "#FFFF99",
        ambientColor: "#87CEEB"
      },
      animations: {
        students: true,
        classroomLights: true
      }
    },
    {
      hour: 15,
      title: "After School",
      description: "School buses lined up, students exiting, teacher erasing board",
      skyColor: { top: "#87CEEB", bottom: "#98FB98" },
      sunPosition: { x: 25, y: 30, z: 0 },
      lighting: {
        sunIntensity: 1.2,
        ambientIntensity: 0.8,
        sunColor: "#FFD700",
        ambientColor: "#87CEEB"
      },
      animations: {
        schoolBus: true,
        students: true,
        teacher: true,
        classroomLights: true
      }
    },
    {
      hour: 16,
      title: "Late Afternoon",
      description: "Warm golden light, sports team practicing, tree casting afternoon shadows",
      skyColor: { top: "#87CEEB", bottom: "#FFA500" },
      sunPosition: { x: 30, y: 20, z: 0 },
      lighting: {
        sunIntensity: 1.0,
        ambientIntensity: 0.7,
        sunColor: "#FFD700",
        ambientColor: "#87CEEB"
      },
      animations: {
        playground: true,
        students: true
      }
    },
    {
      hour: 17,
      title: "Evening Preparation",
      description: "Cleaning staff arriving, some lights still on, tree in golden hour light",
      skyColor: { top: "#87CEEB", bottom: "#FF8C00" },
      sunPosition: { x: 35, y: 10, z: 0 },
      lighting: {
        sunIntensity: 0.8,
        ambientIntensity: 0.6,
        sunColor: "#FF8C00",
        ambientColor: "#87CEEB"
      },
      animations: {
        cleaningCrew: true,
        classroomLights: true
      }
    },
    {
      hour: 18,
      title: "Sunset",
      description: "Beautiful orange/pink sky, school silhouette, tree branches against colorful sky",
      skyColor: { top: "#FF6B35", bottom: "#FF1493" },
      sunPosition: { x: 40, y: 0, z: 0 },
      lighting: {
        sunIntensity: 0.6,
        ambientIntensity: 0.5,
        sunColor: "#FF6B35",
        ambientColor: "#FFB6C1"
      },
      animations: {
        birds: true
      }
    },
    {
      hour: 19,
      title: "Dusk",
      description: "Streetlights beginning to glow, security lights on school, bats emerging from tree",
      skyColor: { top: "#4B0082", bottom: "#FF4500" },
      sunPosition: { x: 45, y: -10, z: 0 },
      lighting: {
        sunIntensity: 0.3,
        ambientIntensity: 0.4,
        sunColor: "#FF4500",
        ambientColor: "#8A2BE2"
      },
      animations: {
        securityLight: true,
        birds: true
      }
    },
    {
      hour: 20,
      title: "Evening Activities",
      description: "Community classes in session, adult learners visible in windows",
      skyColor: { top: "#2E2E5E", bottom: "#8B0000" },
      sunPosition: { x: 50, y: -20, z: 0 },
      lighting: {
        sunIntensity: 0.1,
        ambientIntensity: 0.3,
        sunColor: "#FF4500",
        ambientColor: "#6B6B92"
      },
      animations: {
        classroomLights: true,
        students: true,
        securityLight: true
      }
    },
    {
      hour: 21,
      title: "Night Falling",
      description: "Most windows dark except evening program, tree under streetlight",
      skyColor: { top: "#1A1A2E", bottom: "#4B0082" },
      sunPosition: { x: 50, y: -30, z: 0 },
      lighting: {
        sunIntensity: 0,
        ambientIntensity: 0.2,
        sunColor: "#ffffff",
        ambientColor: "#5B5B82"
      },
      animations: {
        classroomLights: true,
        securityLight: true
      }
    },
    {
      hour: 22,
      title: "Late Evening",
      description: "Only security lights on, peaceful campus, fireflies near tree",
      skyColor: { top: "#0B1426", bottom: "#2E2E5E" },
      sunPosition: { x: 0, y: -40, z: 0 },
      lighting: {
        sunIntensity: 0,
        ambientIntensity: 0.15,
        sunColor: "#ffffff",
        ambientColor: "#4B4B72"
      },
      animations: {
        fireflies: true,
        securityLight: true
      },
      weather: {
        stars: true
      }
    },
    {
      hour: 23,
      title: "Night Quiet",
      description: "Calm before midnight, gentle moonlight, tree silhouette against night sky",
      skyColor: { top: "#0B1426", bottom: "#1A1A2E" },
      sunPosition: { x: 0, y: -45, z: 0 },
      lighting: {
        sunIntensity: 0,
        ambientIntensity: 0.1,
        sunColor: "#ffffff",
        ambientColor: "#3B3B62"
      },
      animations: {
        securityLight: true
      },
      weather: {
        stars: true,
        moon: true
      }
    }
  ];

  public getSceneForHour(hour: number): SceneData {
    return this.scenes[hour] || this.scenes[0];
  }

  public getCurrentTimeData() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    
    return {
      hour,
      minute,
      second,
      totalMinutes: hour * 60 + minute,
      progress: (hour * 60 + minute) / (24 * 60) // 0-1 progress through the day
    };
  }
}