import { CaseStudyProject } from "@/types";

export const projectsData: CaseStudyProject[] = [
  {
    id: "plant-doctor",
    slug: "plant-doctor",
    title: "Plant Doctor",
    tagline: "AI Crop Foliage Pathology & Edge Diagnostic Intelligence",
    category: "AI & ML",
    projectType: "Independent Engineering Project",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#159B50",
    summary:
      "A deep learning computer vision mobile and web application that diagnoses 38 crop foliage diseases in real time from field photographs with offline edge triage.",
    techStackFlat: [
      "PyTorch",
      "MobileNetV3",
      "EfficientNet-B4",
      "TensorFlow Lite",
      "FastAPI",
      "Next.js",
      "Docker",
    ],
    overview:
      "Plant Doctor was engineered to empower agronomists, smallholder farmers, and agricultural extension workers with instant, scientifically accurate crop disease classification and actionable remediation plans directly in remote fields. Leveraging a dual-stage neural network architecture trained on over 87,000 multi-spectral and RGB crop condition images, the platform identifies 38 distinct bacterial, fungal, and viral leaf pathologies with high confidence—even under irregular sunlight and partial occlusion.",
    targetAudience:
      "Commercial farming enterprises, agricultural cooperatives, agronomists, and smallholder farmers operating in areas with intermittent cellular connectivity.",
    heroVisualType: "plant-doctor",
    repositoryUrl: "https://github.com/Muhammad-Usman55/Plant-Doctor",
    liveDemoUrl: "https://plant-doctor.deeplayersolutions.com",
    challenge: {
      summary:
        "Foliage diseases spread rapidly across crops before visible necrosis is noticed by field hands. In remote agricultural regions, certified plant pathologists are scarce, and intermittent rural connectivity renders cloud-only AI diagnostic tools unusable during critical scouting hours.",
      painPoints: [
        "Pathologists visit farms infrequently, leaving early fungal blights unnoticed until 20-40% yield loss occurs.",
        "Zero or unstable 3G/4G connectivity across rural farm fields prevents standard cloud inference APIs from functioning.",
        "Variable field lighting, shadow casting, and soil background noise cause generic pre-trained vision models to generate frequent false positives.",
        "Existing research tools provide raw Latin pathogen taxonomy without practical pesticide dosage or organic remediation steps.",
      ],
    },
    solution: {
      summary:
        "We architected a hybrid edge-cloud intelligence pipeline: an ultra-lightweight 8-bit quantized MobileNetV3 model running entirely offline on the client device for sub-60ms field triage, paired with an enterprise cloud ensemble of EfficientNet-B4 and Vision Transformers for deep lab-grade severity scoring and localized treatment generation.",
      keyDecisions: [
        "Trained INT8 quantized neural models for native on-device TFLite and WebAssembly inference without server dependency.",
        "Implemented multi-scale synthetic data augmentation (simulating direct midday glare, overcast diffuse light, and morning dew) to harden feature representations.",
        "Curated an integrated remediation knowledge base cross-referencing pesticide safety data sheets and biological organic controls.",
      ],
    },
    keyFeatures: [
      {
        title: "Sub-60ms Offline Edge Diagnostics",
        description:
          "Runs 8-bit quantized MobileNetV3 locally in the client browser or mobile runtime without requiring internet access or cloud roundtrips.",
        iconName: "Zap",
      },
      {
        title: "38 Pathologies Across 14 Crops",
        description:
          "High-recall classification covering tomato early blight, potato late blight, corn leaf spot, grape black rot, apple scab, and healthy controls.",
        iconName: "ShieldCheck",
      },
      {
        title: "Grad-CAM Pathological Heatmap",
        description:
          "Visualizes neural activation maps directly over the scanned leaf image so agronomists can verify the exact lesion regions influencing the AI prediction.",
        iconName: "Layers",
      },
      {
        title: "Actionable Treatment Protocols",
        description:
          "Calculates certified fungicide dosages, organic biological controls, and cultural practices (aeration, drip timing) calibrated to crop growth stage.",
        iconName: "FileCheck",
      },
    ],
    technologies: [
      "PyTorch",
      "MobileNetV3",
      "EfficientNet-B4",
      "TensorFlow Lite",
      "OpenCV",
      "FastAPI",
      "Next.js",
      "Tailwind CSS",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Machine Learning & Vision",
        items: ["PyTorch", "MobileNetV3", "EfficientNet-B4", "TensorFlow Lite", "OpenCV", "Albumentations"],
      },
      {
        category: "Backend & Orchestration",
        items: ["FastAPI", "Python 3.11", "Uvicorn", "Pydantic v2", "Redis Queue"],
      },
      {
        category: "Frontend & Edge Runtime",
        items: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "WebAssembly TFLite"],
      },
      {
        category: "DevOps & Deployment",
        items: ["Docker", "GitHub Actions CI/CD", "Nginx", "Linux Ubuntu"],
      },
    ],
    architecture: {
      overview:
        "The system operates on an edge-first, cloud-augmented paradigm. Mobile and browser clients perform instant offline inference using an optimized INT8 model. When network connectivity is re-established, high-resolution imagery synchronizes to the cloud API where an ensemble model performs deep Grad-CAM explainability analysis and updates regional epidemiology heatmaps.",
      layers: [
        {
          name: "Edge Client Layer",
          role: "Offline Capture & Triage",
          technologies: ["React / Next.js", "TFLite WebAssembly", "HTML5 Camera API"],
          description:
            "Captures RGB leaf photography, validates focus sharpness via Laplacian variance, and executes on-device inference in 54ms.",
        },
        {
          name: "API & Validation Layer",
          role: "Ingestion & Security",
          technologies: ["FastAPI", "Pydantic", "JWT Auth", "Rate Limiter"],
          description:
            "Authenticates field requests, checks EXIF metadata and GPS coordinates, and routes images to the high-throughput inference worker pool.",
        },
        {
          name: "Deep Inference Engine",
          role: "Ensemble Pathology Scoring",
          technologies: ["PyTorch", "EfficientNet-B4", "Vision Transformer", "TorchScript"],
          description:
            "Executes multi-class softmax classification with temperature scaling, computing disease confidence and generating Grad-CAM activation overlays.",
        },
        {
          name: "Agronomic Knowledge Base",
          role: "Treatment & Dosage Mapping",
          technologies: ["PostgreSQL", "JSONB Schemas", "Vector Index"],
          description:
            "Retrieves chemical and organic remediation protocols mapped to specific plant growth phases and environmental humidity levels.",
        },
      ],
      dataFlow: [
        "1. Field worker photographs diseased crop leaf using mobile camera.",
        "2. Client evaluates image sharpness via edge OpenCV/Canvas Laplacian kernel.",
        "3. Local TFLite INT8 model computes top-3 disease probabilities within 54 milliseconds.",
        "4. Diagnostic report displays instant triage results and immediate quarantine advice.",
        "5. Background sync dispatches raw image to FastAPI cloud endpoint upon network reconnection.",
        "6. Cloud EfficientNet ensemble validates diagnosis and stores geospatial occurrence data.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "Dataset Assembly & Curation",
        description:
          "Curated 87,000+ crop foliage images across 38 condition categories, balancing class distributions and eliminating laboratory background artifacts.",
        deliverables: ["Curated balanced dataset", "Multi-spectral train/val/test splits"],
      },
      {
        step: "02",
        title: "Model Architecture & Training",
        description:
          "Trained EfficientNet-B4 baseline in PyTorch with label smoothing and cosine annealing learning rate schedules, achieving 96.4% top-1 validation accuracy.",
        deliverables: ["PyTorch training pipelines", "Loss & convergence benchmarks"],
      },
      {
        step: "03",
        title: "Edge Quantization & Benchmarking",
        description:
          "Quantized weights from FP32 to INT8 using Post-Training Quantization (PTQ), shrinking model size from 78MB to 4.2MB with less than 0.8% accuracy degradation.",
        deliverables: ["TFLite flatbuffer models", "Edge latency benchmarks"],
      },
      {
        step: "04",
        title: "Application & API Engineering",
        description:
          "Constructed asynchronous FastAPI backend and responsive Next.js frontend with camera capture, offline caching, and treatment advisory generation.",
        deliverables: ["Async REST API", "PWA offline client application"],
      },
      {
        step: "05",
        title: "Field Testing & Validation",
        description:
          "Conducted field stress testing under direct sunlight, partial shade, and dew conditions across tomato and potato plots to verify real-world robustness.",
        deliverables: ["Field test telemetry logs", "Grad-CAM explainability reports"],
      },
    ],
    engineeringChallenges: [
      {
        title: "Edge Model Size vs. Multi-Class Precision",
        problem:
          "Distinguishing between subtle visual differences (e.g., Early Blight vs. Septoria Leaf Spot) typically requires 100M+ parameter Vision Transformers, which cannot run inside mobile web browsers without crashing memory buffers.",
        approach:
          "Applied knowledge distillation transferring rich feature representations from a heavy EfficientNet-B4 teacher to a compact MobileNetV3 student, followed by structured weight pruning.",
        solution:
          "Compressed model memory footprint to 4.2MB while retaining 96.4% top-1 diagnostic accuracy and executing in 54ms on mid-range Android devices.",
      },
      {
        title: "Background Clutter & Variable Sunlight",
        problem:
          "In real fields, soil, weeds, farm tools, and severe midday sun glare frequently tricked standard convolutional kernels into flagging background noise as leaf lesions.",
        approach:
          "Implemented automated foreground leaf segmentation using color-space thresholding in HSV combined with heavy random shadow and glare augmentation during PyTorch training runs.",
        solution:
          "False-positive diagnosis rate dropped by 73% in high-glare and complex field background environments.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Rigorous validation against academic benchmarks and simulated field photography demonstrated state-of-the-art diagnostic accuracy with true offline edge feasibility.",
      metrics: [
        {
          value: "96.4%",
          label: "Top-1 Diagnostic Accuracy",
          description: "Verified across 38 distinct crop condition and pathogen classes.",
          context: "Academic validation benchmark",
        },
        {
          value: "54 ms",
          label: "Edge Inference Latency",
          description: "Average inference time on standard smartphone hardware via INT8 WebAssembly.",
          context: "Sub-60ms budget achieved",
        },
        {
          value: "4.2 MB",
          label: "Quantized Model Footprint",
          description: "Compressed from 78MB FP32 checkpoint with zero external cloud dependencies.",
          context: "94.6% storage reduction",
        },
        {
          value: "38",
          label: "Crop Pathologies Classified",
          description: "Spanning fungal, bacterial, viral infections, and nutrient deficiency controls.",
          context: "14 commercial crop varieties",
        },
      ],
      qualitativeValidation: [
        "Tested against benchmark datasets with consistent precision across varying camera sensors and resolutions.",
        "Grad-CAM visual overlays confirm that convolutional attention focuses strictly on pathological lesions rather than background soil.",
        "Offline caching architecture guarantees continuous diagnostic capability in remote zero-signal agricultural zones.",
      ],
    },
    galleryScreens: [
      {
        id: "scanner-hud",
        title: "Live Edge Scanner HUD",
        caption:
          "Real-time viewfinder with focus verification, bounding box localization, and sub-60ms edge inference readout.",
        visualType: "plant-doctor-scanner",
      },
      {
        id: "gradcam-analysis",
        title: "Grad-CAM Pathological Heatmap",
        caption:
          "Explainable AI visualization revealing neural activation density over fungal necrosis spots.",
        visualType: "plant-doctor-gradcam",
      },
      {
        id: "treatment-plan",
        title: "Clinical Remediation Protocol",
        caption:
          "Structured chemical and organic treatment plans calibrated to crop maturity and environmental moisture.",
        visualType: "plant-doctor-treatment",
      },
    ],
    nextProjectSlug: "travelmate-ai",
    prevProjectSlug: "urdu-dubbing",
  },
  {
    id: "travelmate-ai",
    slug: "travelmate-ai",
    title: "TravelMate AI",
    tagline: "Autonomous Multi-Agent Travel Planning & Dynamic Itinerary Engine",
    category: "AI & ML",
    projectType: "Independent Engineering Project",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#087A3D",
    summary:
      "An autonomous multi-agent conversational travel planner orchestrated via LangGraph, synthesizing real-time flight, lodging, and route optimization into interactive itineraries.",
    techStackFlat: [
      "LangGraph",
      "LangChain",
      "OpenAI GPT-4o",
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
    ],
    overview:
      "TravelMate AI replaces fragmented multi-tab vacation planning with an autonomous, graph-based multi-agent architecture. By separating the trip planning workflow into specialized cooperating agents—Geospatial Route Agent, Budget & Flight Scanner, and Local Experience Curator—the platform generates mathematically viable, time-consistent itineraries while enforcing strict tool-calling constraints to prevent hallucinated flights or impossible transit connections.",
    targetAudience:
      "Independent travelers, digital nomads, and travel management groups seeking fully customized, dynamic travel itineraries with real-time adaptation.",
    heroVisualType: "travelmate-ai",
    repositoryUrl: "https://github.com/Muhammad-Usman55/TravelMate-AI",
    liveDemoUrl: "https://travelmate.deeplayersolutions.com",
    challenge: {
      summary:
        "Modern travelers consult over 30 websites to plan complex multi-day journeys. Generic LLMs hallucinate non-existent flight routes, propose geographically conflicting destinations in a single afternoon, and cannot dynamically replan when a flight delays or weather conditions shift.",
      painPoints: [
        "Generic AI chat models hallucinate discontinued airline routes and closed attractions.",
        "Naive single-prompt LLM travel planners fail at arithmetic budget balancing and temporal transit calculations.",
        "Static PDF travel itineraries break the moment a flight is rescheduled or severe weather closes an outdoor landmark.",
        "Manual group trip coordination involves chaotic spreadsheets and disjointed messaging threads.",
      ],
    },
    solution: {
      summary:
        "We engineered a stateful multi-agent system powered by LangGraph. Each sub-agent holds specialized domain knowledge, invokes live verified travel APIs (Amadeus, Google Places, OpenWeather), and coordinates through a deterministic supervisor node that validates geographic feasibility, transit buffers, and budget constraints before presenting the schedule.",
      keyDecisions: [
        "Adopted LangGraph state machines with cyclic validation loops to verify schedule feasibility before final answer generation.",
        "Integrated real-time external APIs for live flight schedules, hotel rates, and localized weather forecasts.",
        "Implemented Redis state checkpointing allowing users to pause, fork, and dynamically modify itineraries via conversational turns.",
      ],
    },
    keyFeatures: [
      {
        title: "Multi-Agent State Orchestration",
        description:
          "Specialized agent nodes for flight logistics, hotel matching, routing, and dining coordinate via a stateful LangGraph supervisor.",
        iconName: "Workflow",
      },
      {
        title: "Verified Live API Grounding",
        description:
          "Queries live GDS and transit APIs to verify current flight numbers, ticket pricing, and opening hours, eliminating hallucinations.",
        iconName: "CheckCircle2",
      },
      {
        title: "Dynamic Weather & Delay Re-routing",
        description:
          "Automatically detects incoming rain forecasts or flight delay alerts and swaps indoor museum tours for outdoor excursions.",
        iconName: "RefreshCw",
      },
      {
        title: "Interactive Map Waypoints & Budgets",
        description:
          "Renders day-by-day transit sequences on dynamic interactive maps with live ledger balance tracking per currency.",
        iconName: "MapPin",
      },
    ],
    technologies: [
      "LangGraph",
      "LangChain",
      "OpenAI GPT-4o",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Agentic AI & Orchestration",
        items: ["LangGraph", "LangChain", "OpenAI GPT-4o", "Pydantic Structured Outputs", "Prompt Engineering"],
      },
      {
        category: "Backend & Data Storage",
        items: ["FastAPI", "Python 3.11", "PostgreSQL", "Prisma / SQLAlchemy", "Redis State Checkpointer"],
      },
      {
        category: "Frontend & Visualization",
        items: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Mapbox GL / Leaflet"],
      },
      {
        category: "External Integration",
        items: ["Amadeus GDS API", "Google Places API", "OpenWeatherMap API", "Currency Exchange API"],
      },
    ],
    architecture: {
      overview:
        "A cyclic directed graph coordinates agent operations. The Supervisor Agent parses user preferences and delegates tasks to specialized worker nodes. After workers execute tool calls against verified APIs, a Validator Node audits temporal spacing and transit times before committing the state to PostgreSQL and Redis.",
      layers: [
        {
          name: "User Interface & Map Layer",
          role: "Conversational UI & Map View",
          technologies: ["Next.js", "Mapbox GL", "Tailwind CSS", "Server-Sent Events"],
          description:
            "Streams conversational reasoning tokens in real time while rendering interactive day-by-day waypoint pins and route polylines.",
        },
        {
          name: "Supervisor & Graph Engine",
          role: "Multi-Agent Coordination",
          technologies: ["LangGraph", "LangChain", "State Checkpointer"],
          description:
            "Manages agent execution flow, routing state between flight scanners, hotel matchers, and geographic optimizers.",
        },
        {
          name: "External Grounding APIs",
          role: "Deterministic Live Data",
          technologies: ["Amadeus API", "Google Places", "OpenWeatherMap"],
          description:
            "Fetches verified flight schedules, fare estimates, venue opening times, and 7-day precipitation forecasts.",
        },
        {
          name: "Persistence & Memory Cache",
          role: "Trip State & History",
          technologies: ["PostgreSQL", "Redis", "JSONB Itinerary Trees"],
          description:
            "Stores trip states, user constraints, chat history, and enables instant forking or rolling back itinerary days.",
        },
      ],
      dataFlow: [
        "1. User enters travel brief: '4-day family trip to Tokyo under $2,500 with sushi workshops'.",
        "2. LangGraph Supervisor parses constraints and invokes Flight & Accommodation agents.",
        "3. Flight Agent queries live Amadeus endpoints to retrieve validated flights within budget.",
        "4. Route Agent clusters attractions geographically to eliminate crisscrossing across Tokyo.",
        "5. Validation Node tests schedule against venue hours and inserts transit time buffers.",
        "6. Final verified itinerary renders on interactive map with day-by-day timeline cards.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "Agent Architecture Design",
        description:
          "Formulated state schemas and transition graphs in LangGraph, establishing strict boundaries between deterministic tools and LLM reasoning.",
        deliverables: ["State graph blueprint", "Pydantic data schemas"],
      },
      {
        step: "02",
        title: "API Grounding & Tool Tooling",
        description:
          "Built resilient async wrappers for flight GDS, accommodation engines, and geospatial transit calculation with caching fallbacks.",
        deliverables: ["Amadeus & Places API connectors", "Redis caching layer"],
      },
      {
        step: "03",
        title: "Validation & Feasibility Loop",
        description:
          "Implemented automated checks calculating transit travel times between sequential stops to prevent unfeasible schedule proposals.",
        deliverables: ["Geospatial validation node", "Constraint solver routines"],
      },
      {
        step: "04",
        title: "Frontend & Streaming Interface",
        description:
          "Engineered a Next.js interface featuring token streaming, dynamic timeline cards, and synchronized map waypoint highlights.",
        deliverables: ["Streaming chat UI", "Interactive Mapbox component"],
      },
      {
        step: "05",
        title: "End-to-End Stress Testing",
        description:
          "Benchmarked multi-turn dialogues against complex multi-city constraints, evaluating budget adherence and API error resiliency.",
        deliverables: ["Evaluation benchmark suite", "Automated synthetic test scenarios"],
      },
    ],
    engineeringChallenges: [
      {
        title: "Preventing Multi-Agent State Divergence",
        problem:
          "In initial prototypes, independent agents frequently overwrote shared state properties—for example, the hotel agent booking dates inconsistent with updated flight arrival times.",
        approach:
          "Engineered a centralized LangGraph state checkpointer with explicit typed state transitions and pre-commit schema guards.",
        solution:
          "Zero state collisions achieved, guaranteeing that downstream itinerary generators always inherit synchronized arrival and departure timestamps.",
      },
      {
        title: "Eliminating Hallucinated Attraction Hours",
        problem:
          "Language models regularly scheduled temple and museum visits at 9:00 PM when venues were closed, causing user frustration.",
        approach:
          "Bound the itinerary generator to mandatory tool-calling lookups against Google Places operating hour vectors prior to event scheduling.",
        solution:
          "100% elimination of scheduling conflicts with verified business operating hours across evaluated test itineraries.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Tested against multi-day itinerary scenarios across major global destinations, verifying budget compliance, temporal feasibility, and sub-second token streaming.",
      metrics: [
        {
          value: "100%",
          label: "API-Grounded Flight Verification",
          description: "All recommended flights and booking codes cross-referenced against live GDS data.",
          context: "Zero hallucinated airlines",
        },
        {
          value: "<1.2s",
          label: "Initial Agent Streaming Latency",
          description: "Time to first reasoning token streamed back to the interactive client.",
          context: "Server-Sent Events streaming",
        },
        {
          value: "0",
          label: "Geographic Schedule Collisions",
          description: "Rigorous transit time calculation prevents overlapping or unfeasible travel legs.",
          context: "Automated routing validator",
        },
        {
          value: "3x",
          label: "Planning Velocity Acceleration",
          description: "Reduces complete multi-day trip research and synthesis time from hours to minutes.",
          context: "Multi-agent parallelization",
        },
      ],
      qualitativeValidation: [
        "Dynamic re-routing algorithms successfully replan schedules when synthetic flight delays are triggered.",
        "Interactive budget ledger accurately accounts for accommodation, transit fares, and estimated meal costs.",
        "Clear visual separation between verified tool results and conversational advice gives users complete trust.",
      ],
    },
    galleryScreens: [
      {
        id: "timeline-view",
        title: "Dynamic Day-by-Day Timeline",
        caption:
          "Time-stamped schedule with integrated transit buffers, cost estimates, and attraction notes.",
        visualType: "travelmate-timeline",
      },
      {
        id: "agent-graph",
        title: "LangGraph State Inspector",
        caption:
          "Live visualization of supervisor decisions, worker agent tool calls, and validation checkpoints.",
        visualType: "travelmate-graph",
      },
      {
        id: "interactive-map",
        title: "Geospatial Waypoint Mapper",
        caption:
          "Interactive map with numbered pins, daily walking routes, and nearby curated dining recommendations.",
        visualType: "travelmate-map",
      },
    ],
    nextProjectSlug: "gender-detection",
    prevProjectSlug: "plant-doctor",
  },
  {
    id: "gender-detection",
    slug: "gender-detection",
    title: "VisionSense Demographic Analytics",
    tagline: "High-Speed Privacy-Preserving Demographic & Foot-Traffic Edge Computer Vision",
    category: "Computer Vision",
    projectType: "Production Engineering Prototype",
    status: "Stable Release",
    featured: true,
    published: true,
    accentColor: "#059669",
    summary:
      "A privacy-first edge computer vision system for foot-traffic demographic analytics, combining YOLOv8 person detection with ResNet-50 classification on local edge hardware.",
    techStackFlat: [
      "YOLOv8",
      "ResNet-50",
      "PyTorch",
      "NVIDIA TensorRT",
      "OpenCV",
      "C++",
      "Python",
      "MQTT",
      "Docker",
    ],
    overview:
      "VisionSense performs real-time face localization, anonymized demographic classification (age brackets and gender estimation), and customer dwell-time calculation from standard CCTV video streams. Architected strictly around privacy-by-design principles, all frame processing occurs in volatile GPU memory directly on local edge appliances (NVIDIA Jetson / x86 TensorRT). Video frames are discarded immediately upon inference, outputting only encrypted numerical metadata to prevent privacy liabilities.",
    targetAudience:
      "Commercial retail chains, shopping malls, airport terminals, and exhibition centers needing footfall demographics without privacy violations.",
    heroVisualType: "gender-detection",
    repositoryUrl: "https://github.com/Muhammad-Usman55/Gender-Detection-Yolo-Resnet50",
    liveDemoUrl: "https://visionsense.deeplayersolutions.com",
    challenge: {
      summary:
        "Retailers need accurate demographic footfall data to optimize store layouts and merchandising. Streaming dozens of 1080p surveillance video feeds to public cloud providers consumes prohibitive network bandwidth and triggers severe biometric surveillance privacy compliance violations (GDPR/CCPA).",
      painPoints: [
        "Streaming 20+ HD security camera feeds to the cloud incurs immense monthly bandwidth and cloud GPU bills.",
        "Transmitting and storing raw customer facial images introduces massive regulatory and legal liabilities under GDPR.",
        "Generic pre-trained vision models struggle with extreme angles, varied heights, motion blur, and poor retail store lighting.",
        "Edge compute devices have constrained power and thermal limits that throttle heavy neural network architectures.",
      ],
    },
    solution: {
      summary:
        "We built an ultra-optimized two-stage edge pipeline: YOLOv8-nano localized faces and human silhouettes, passing cropped facial bounding boxes to a TensorRT-quantized multi-task ResNet-50 network for age and gender estimation at 48+ FPS per stream. All image tensors are instantly freed from RAM, dispatching only anonymized JSON telemetry over lightweight MQTT.",
      keyDecisions: [
        "Compiled PyTorch models to FP16 NVIDIA TensorRT engines, cutting inference latency by 68%.",
        "Adopted an edge-only architecture where zero video or facial biometric templates are ever written to disk or transmitted.",
        "Integrated Kalman filter multi-object tracking to prevent double-counting visitors walking through camera field-of-view.",
      ],
    },
    keyFeatures: [
      {
        title: "48+ FPS Multi-Stream Edge Processing",
        description:
          "Sustained 48 frames per second inference across multiple concurrent camera feeds on compact edge accelerator hardware.",
        iconName: "Zap",
      },
      {
        title: "100% Privacy-Preserving Architecture",
        description:
          "Zero facial images, biometric vectors, or personal data saved to disk; only anonymized telemetry is published.",
        iconName: "Shield",
      },
      {
        title: "Multi-Object Trajectory Tracking",
        description:
          "Kalman filter and ByteTrack association maintain visitor tracking across occlusions, calculating accurate dwell times.",
        iconName: "Eye",
      },
      {
        title: "Low-Bandwidth MQTT Telemetry",
        description:
          "Transmits micro-payload JSON telemetry over MQTT, reducing network bandwidth consumption by over 99.8% vs video streaming.",
        iconName: "Radio",
      },
    ],
    technologies: [
      "YOLOv8",
      "ResNet-50",
      "PyTorch",
      "NVIDIA TensorRT",
      "CUDA",
      "OpenCV",
      "C++",
      "Python",
      "MQTT",
      "Grafana",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Computer Vision & Edge AI",
        items: ["YOLOv8", "ResNet-50", "PyTorch", "NVIDIA TensorRT", "CUDA Toolkit", "OpenCV"],
      },
      {
        category: "Tracking & Association",
        items: ["ByteTrack", "Kalman Filter", "IoU Association", "Feature Embeddings"],
      },
      {
        category: "Edge Runtime & Protocol",
        items: ["Python 3.10", "C++ Inference Wrapper", "MQTT (Mosquitto)", "Protobuf Serialization"],
      },
      {
        category: "Analytics & Monitoring",
        items: ["TimescaleDB", "Grafana Dashboards", "Docker Containerization", "NVIDIA System Management"],
      },
    ],
    architecture: {
      overview:
        "The system ingests RTSP surveillance streams via hardware-accelerated video decoding. YOLOv8 localizes faces in incoming frames; cropped bounding boxes are batched and passed to TensorRT ResNet-50 for demographic classification. Trajectory trackers maintain visitor identity across frames, and metadata is published via MQTT to an aggregated analytics dashboard.",
      layers: [
        {
          name: "Video Ingestion Layer",
          role: "Hardware Stream Decoding",
          technologies: ["NVIDIA DeepStream / OpenCV", "RTSP Streams", "CUDA Decoders"],
          description:
            "Decodes concurrent H.264/H.265 camera feeds in hardware, zero-copying frame tensors directly into GPU memory.",
        },
        {
          name: "Detection & Tracking Layer",
          role: "Localization & Trajectory",
          technologies: ["YOLOv8 TensorRT", "ByteTrack", "Kalman Filter"],
          description:
            "Detects human silhouettes and facial regions, maintaining persistent tracking IDs as visitors move through retail zones.",
        },
        {
          name: "Demographic Inference Layer",
          role: "Multi-Task Classification",
          technologies: ["ResNet-50 FP16", "TensorRT Engine", "PyTorch"],
          description:
            "Computes age bracket distributions and gender probabilities across batched face crops in sub-12 milliseconds.",
        },
        {
          name: "Telemetry & Aggregation Layer",
          role: "Zero-Knowledge Reporting",
          technologies: ["MQTT Broker", "TimescaleDB", "Grafana"],
          description:
            "Transmits anonymous count, demographic, and dwell-time events, populating real-time retail occupancy heatmaps.",
        },
      ],
      dataFlow: [
        "1. RTSP camera stream ingested via hardware-accelerated NVDEC video decoders.",
        "2. YOLOv8-nano identifies candidate bounding boxes for faces and heads.",
        "3. ByteTrack tracker associates detections across consecutive frames to prevent duplicate counts.",
        "4. Aligned face crops fed into TensorRT FP16 ResNet-50 classification engine.",
        "5. Frame memory immediately purged from GPU VRAM without any disk writes.",
        "6. Anonymized JSON demographic payload published to central MQTT broker.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "Model Selection & Multi-Task Design",
        description:
          "Architected a unified ResNet-50 backbone with dual classification heads for simultaneous age bracket and gender prediction.",
        deliverables: ["PyTorch multi-task model", "Custom loss weighting logic"],
      },
      {
        step: "02",
        title: "Fine-Tuning on Diverse Datasets",
        description:
          "Trained on curated public demographic datasets augmented with synthetic lighting variations, head tilts, and surveillance noise.",
        deliverables: ["Trained FP32 PyTorch weights", "Confusion matrix validation metrics"],
      },
      {
        step: "03",
        title: "TensorRT Compilation & Quantization",
        description:
          "Exported ONNX graphs and built optimized TensorRT FP16 execution engines calibrated for NVIDIA architecture.",
        deliverables: ["Engine binary artifacts", "GPU latency & memory profiling"],
      },
      {
        step: "04",
        title: "Tracker & Pipeline Integration",
        description:
          "Combined YOLOv8 detector and ByteTrack Kalman tracker into an asynchronous multi-threaded C++ and Python pipeline.",
        deliverables: ["Production edge pipeline code", "Multi-camera test harness"],
      },
      {
        step: "05",
        title: "Telemetry & Performance Profiling",
        description:
          "Built secure MQTT transmission client and real-time Grafana dashboard tracking footfall volume, dwell times, and demographics.",
        deliverables: ["MQTT telemetry bridge", "Grafana executive dashboard"],
      },
    ],
    engineeringChallenges: [
      {
        title: "Preventing Frame Rate Drops Under High Visitor Density",
        problem:
          "When retail aisles experienced sudden crowd surges, per-face classification calls overwhelmed GPU compute buffers, dropping video frame rates below 15 FPS.",
        approach:
          "Implemented dynamic face crop batching combined with temporal inference skipping (classifying each tracked person every 8 frames rather than every frame).",
        solution:
          "Maintained steady 48+ FPS processing throughput even during dense crowd scenarios with zero loss in demographic accuracy.",
      },
      {
        title: "Handling Oblique Surveillance Angles",
        problem:
          "Ceiling-mounted security cameras capture extreme downward angles where standard facial alignment models fail to locate keypoints.",
        approach:
          "Trained an affine transform pre-processor on oblique surveillance crops to normalize facial geometry before feeding tensors to ResNet.",
        solution:
          "Improved demographic classification accuracy at 45-degree downward angles by 31.4%.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Rigorous stress-testing across diverse surveillance video feeds proved high inference velocity and strict privacy compliance.",
      metrics: [
        {
          value: "48.2 FPS",
          label: "Inference Throughput",
          description: "Sustained dual-pipeline processing speed on NVIDIA Jetson edge platform.",
          context: "Real-time edge performance",
        },
        {
          value: "91.8%",
          label: "Demographic Accuracy",
          description: "Combined accuracy across gender and age brackets under standard retail lighting.",
          context: "Benchmarked on surveillance test sets",
        },
        {
          value: "0 bytes",
          label: "Biometric Data Stored",
          description: "Zero image frames or biometric vectors written to disk or transmitted to cloud.",
          context: "100% GDPR/CCPA compliant",
        },
        {
          value: "99.8%",
          label: "Bandwidth Savings",
          description: "Comparing lightweight MQTT JSON events against continuous HD video cloud streaming.",
          context: "Massive cost efficiency",
        },
      ],
      qualitativeValidation: [
        "Eliminated cloud streaming bandwidth costs entirely while satisfying strict EU privacy regulations.",
        "Persistent tracking reliably differentiates between newly entering shoppers and stationary employees.",
        "Automated telemetry successfully populates real-time retail occupancy and dwell-time heatmaps.",
      ],
    },
    galleryScreens: [
      {
        id: "camera-hud",
        title: "Surveillance Stream HUD",
        caption:
          "Real-time video feed overlay with bounding boxes, tracking IDs, demographic estimates, and FPS counter.",
        visualType: "gender-detection-hud",
      },
      {
        id: "edge-pipeline",
        title: "TensorRT Pipeline Profiler",
        caption:
          "Telemetry showing GPU memory utilization, frame decoding latency, and MQTT event dispatch rates.",
        visualType: "gender-detection-pipeline",
      },
      {
        id: "dwell-analytics",
        title: "Store Dwell & Footfall Dashboard",
        caption:
          "Aggregated hourly foot-traffic charts, gender balance indicators, and average dwell times by department.",
        visualType: "gender-detection-dashboard",
      },
    ],
    nextProjectSlug: "voice-agent",
    prevProjectSlug: "travelmate-ai",
  },
  {
    id: "voice-agent",
    slug: "voice-agent",
    title: "DeepVoice Enterprise Agent",
    tagline: "Sub-450ms Full-Duplex Conversational Voice AI Platform",
    category: "Voice & Conversational AI",
    projectType: "Production Engineering Prototype",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#10B981",
    summary:
      "A real-time conversational voice assistant engine delivering sub-450ms voice-to-voice latency with streaming bidirectional WebSockets, neural speech synthesis, and barge-in interruption handling.",
    techStackFlat: [
      "Python",
      "FastAPI",
      "WebSockets",
      "Faster-Whisper",
      "OpenAI GPT-4o Mini",
      "ElevenLabs",
      "WebRTC",
      "Redis",
      "Docker",
    ],
    overview:
      "DeepVoice Enterprise Agent replaces frustrating legacy IVR phone trees with a natural, full-duplex conversational voice AI capable of fluid turn-taking, intelligent mid-sentence barge-in interruptions, and live CRM database mutations. Built on an event-driven streaming audio architecture, the system pipelines streaming audio chunks through Faster-Whisper, speculative LLM token decoders, and ultra-low-latency neural text-to-speech vocoders to deliver voice responses in under 450 milliseconds.",
    targetAudience:
      "Enterprise customer support centers, telehealth triage lines, financial advisory hotlines, and booking dispatch operators.",
    heroVisualType: "voice-agent",
    repositoryUrl: "https://github.com/Muhammad-Usman55/Realtime-Voice-Agent",
    liveDemoUrl: "https://deepvoice.deeplayersolutions.com",
    challenge: {
      summary:
        "Traditional sequential voice AI systems (transcribe entire sentence -> send to LLM -> wait for complete answer -> synthesize entire audio) produce awkward 2.5 to 4-second delays. Furthermore, when callers interrupt, legacy bots continue speaking blindly over the user, creating a jarring experience.",
      painPoints: [
        "High round-trip latency (2.5-4s) breaks the cadence of natural human conversation.",
        "Lack of full-duplex interruption handling (barge-in) causes bots to talk over users.",
        "Audio artifacts, packet drops, and background noise degrade transcription accuracy.",
        "Integrating AI agents into existing SIP telephony trunks and PBX switches is historically complex.",
      ],
    },
    solution: {
      summary:
        "We engineered a pipelined streaming architecture utilizing bidirectional WebSockets and WebRTC audio channels. Audio buffers stream directly to an in-memory Faster-Whisper acoustic model. As soon as the first phonetic clause is detected, token generation starts immediately in an LLM streaming pipeline, which feeds directly into an edge neural audio vocoder with sub-450ms time-to-first-audio.",
      keyDecisions: [
        "Implemented Voice Activity Detection (Silero VAD) to execute instant client-side and server-side audio interruption muting within 40ms.",
        "Built chunked token-to-speech pipelining so audio synthesis begins on the first sentence fragment rather than awaiting entire responses.",
        "Integrated telephony audio resampling (8kHz μ-law to 16kHz PCM) with jitter buffer compensation.",
      ],
    },
    keyFeatures: [
      {
        title: "Sub-450ms Voice-to-Voice Latency",
        description:
          "End-to-end latency from caller speech termination to synthesized audio playback measured under 450ms.",
        iconName: "Zap",
      },
      {
        title: "Full-Duplex Barge-In Interruption",
        description:
          "Silero VAD detects user interruptions mid-speech, cancelling pending audio buffers and resetting LLM state in 40ms.",
        iconName: "Mic",
      },
      {
        title: "Telephony SIP & WebRTC Ready",
        description:
          "Seamlessly connects with Twilio Media Streams, Asterisk PBX, and WebRTC browser interfaces.",
        iconName: "PhoneCall",
      },
      {
        title: "Live Function Calling & CRM Sync",
        description:
          "Executes tool calls during calls to retrieve account balances, verify identities, and book appointments.",
        iconName: "Database",
      },
    ],
    technologies: [
      "Python",
      "FastAPI",
      "WebSockets",
      "WebRTC",
      "Faster-Whisper",
      "OpenAI GPT-4o Mini",
      "ElevenLabs",
      "Silero VAD",
      "Redis",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Audio Processing & Speech AI",
        items: ["Faster-Whisper (CTranslate2)", "Silero VAD", "ElevenLabs Streaming TTS", "PyAudio", "Opus Codec"],
      },
      {
        category: "Real-Time Streaming Core",
        items: ["FastAPI", "WebSockets", "WebRTC Media Streams", "Asyncio Event Loop", "Twilio Audio Stream API"],
      },
      {
        category: "Reasoning & LLM Engine",
        items: ["GPT-4o Mini", "Groq LLaMA-3.1-70B", "Structured JSON Tool Calling", "Context Memory Buffers"],
      },
      {
        category: "Infrastructure & State",
        items: ["Redis Pub/Sub", "Docker Containers", "Nginx WebSocket Proxy", "Prometheus Metrics"],
      },
    ],
    architecture: {
      overview:
        "The architecture operates on a full-duplex asynchronous streaming pipeline. Client audio streams via WebSocket or WebRTC into Silero VAD for boundary detection, passes into Faster-Whisper for incremental token transcription, triggers streaming LLM inference, and routes sentence fragments directly to a neural TTS vocoder for immediate playback.",
      layers: [
        {
          name: "Audio Ingestion & VAD Layer",
          role: "Speech Boundary & Barge-in",
          technologies: ["WebSockets / WebRTC", "Silero VAD", "Opus Decoder"],
          description:
            "Buffers incoming 20ms audio frames, detecting speech onset and instantly halting outgoing audio when barge-in occurs.",
        },
        {
          name: "Streaming Speech-to-Text Layer",
          role: "Incremental Acoustic Transcription",
          technologies: ["Faster-Whisper", "CTranslate2", "CUDA"],
          description:
            "Transcribes streaming phonemes into text tokens with sub-120ms latency and automatic punctuation insertion.",
        },
        {
          name: "Conversational Reasoning Engine",
          role: "Tool Execution & Token Generation",
          technologies: ["GPT-4o Mini", "Groq LLaMA 3.1", "Tool Dispatcher"],
          description:
            "Evaluates conversational intent, triggers enterprise CRM API tool calls, and streams response tokens continuously.",
        },
        {
          name: "Neural Speech Synthesis Layer",
          role: "Expressive Audio Generation",
          technologies: ["Streaming TTS Vocoder", "ElevenLabs Turbo v2", "Opus Encoder"],
          description:
            "Converts the first completed phrase into human-like audio frames, streaming them back to the caller immediately.",
        },
      ],
      dataFlow: [
        "1. Caller speaks into phone or browser; audio packaged into 20ms Opus frames.",
        "2. Silero VAD identifies speech termination; acoustic stream passed to Faster-Whisper.",
        "3. Transcription text emitted to LLM streaming generator within 110ms.",
        "4. First 6-8 response tokens parsed by TTS chunking worker to initiate audio synthesis.",
        "5. Neural vocoder streams synthesized speech packets back to client audio device.",
        "6. Total elapsed voice-to-voice latency reaches client speaker in under 450ms.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "Streaming Architecture Design",
        description:
          "Built full-duplex asynchronous Python WebSocket harness with parallel worker queues for transcription, LLM, and synthesis.",
        deliverables: ["Asyncio streaming pipeline", "WebSocket protocol specification"],
      },
      {
        step: "02",
        title: "Acoustic Model & VAD Optimization",
        description:
          "Integrated CTranslate2 Faster-Whisper engine and Silero VAD, tuning silence detection windows down to 250ms.",
        deliverables: ["Optimized Whisper server", "VAD sensitivity calibration harness"],
      },
      {
        step: "03",
        title: "Barge-in Interruption Mechanics",
        description:
          "Engineered priority interrupt signaling: incoming user audio instantly clears downstream audio playback queues and aborts LLM generation.",
        deliverables: ["Barge-in cancellation controller", "Audio queue flush routines"],
      },
      {
        step: "04",
        title: "Telephony & Tool Calling Bridge",
        description:
          "Connected Twilio Media Streams bidirectional gateway and implemented JSON function calling for live CRM data lookups.",
        deliverables: ["Twilio SIP gateway", "Live CRM lookup connector"],
      },
      {
        step: "05",
        title: "A/B Latency & Conversational Benchmarks",
        description:
          "Ran synthetic telephony call simulations measuring jitter, packet loss resilience, and voice turnaround latencies.",
        deliverables: ["Latency benchmarking logs", "Telephony audio quality metrics"],
      },
    ],
    engineeringChallenges: [
      {
        title: "Achieving Sub-450ms End-to-End Latency",
        problem:
          "Sequential execution of STT (300ms) + LLM TTFT (400ms) + TTS generation (600ms) resulted in unacceptable 1.3s+ turnaround times.",
        approach:
          "Architected pipelined overlapping execution: LLM token generation begins before Whisper finishes finalizing trailing silence, and TTS streaming begins on the very first 5 generated words.",
        solution:
          "Cut end-to-end turnaround latency to 420ms, producing seamless and natural conversational pacing.",
      },
      {
        title: "Echo Cancellation & False Barge-in",
        problem:
          "Speaker output on mobile phones leaked back into the microphone, causing the bot to falsely detect its own voice as a user interruption.",
        approach:
          "Implemented acoustic echo suppression combined with spectral subtraction filtering client-side audio streams against outgoing synthesized waveforms.",
        solution:
          "Zero false-positive barge-in interruptions caused by acoustic speaker bleed.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Validated across hundreds of simulated telephony interactions, confirming sub-450ms latency and natural interruption handling.",
      metrics: [
        {
          value: "420 ms",
          label: "Voice-to-Voice Latency",
          description: "Measured from user end-of-speech to first synthesized audio frame received.",
          context: "Sub-450ms SLA achieved",
        },
        {
          value: "40 ms",
          label: "Barge-In Reaction Time",
          description: "Speed at which the agent halts playback when caller begins speaking mid-sentence.",
          context: "Instant fluid interruption",
        },
        {
          value: "97.4%",
          label: "Speech Recognition Accuracy",
          description: "Word accuracy across accented telephony audio using Faster-Whisper.",
          context: "Robust against background noise",
        },
        {
          value: "150+",
          label: "Concurrent Voice Channels",
          description: "Concurrent calls sustained on a single GPU node using asynchronous worker multiplexing.",
          context: "High-density scaling",
        },
      ],
      qualitativeValidation: [
        "Callers experience natural human-like turn-taking without awkward pauses or robotic interruptions.",
        "Seamless integration with enterprise CRM systems allows instant identity lookup during live calls.",
        "Tested across poor 3G mobile telephony connections with stable audio packet reconstruction.",
      ],
    },
    galleryScreens: [
      {
        id: "call-console",
        title: "Real-Time Telephony Console",
        caption:
          "Live spectrogram waveform, audio stream latency breakdown, and conversation transcription feed.",
        visualType: "voice-agent-console",
      },
      {
        id: "bargein-debugger",
        title: "Barge-In & VAD Waveform Inspector",
        caption:
          "Visualizing 40ms interruption detection events and immediate audio queue cancellation.",
        visualType: "voice-agent-bargein",
      },
      {
        id: "crm-integration",
        title: "Live CRM Tool Calling",
        caption:
          "Real-time customer record updates and verified appointment dispatching triggered by voice commands.",
        visualType: "voice-agent-crm",
      },
    ],
    nextProjectSlug: "smart-course-qa",
    prevProjectSlug: "gender-detection",
  },
  {
    id: "smart-course-qa",
    slug: "smart-course-qa",
    title: "Smart Course Material Q&A",
    tagline: "Academic Multi-Modal RAG with Slide-Level Grounding & KaTeX Math Rendering",
    category: "AI & ML",
    projectType: "Academic & Production Tool",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#075C32",
    summary:
      "An academic retrieval-augmented generation engine that indexes university lecture slides, textbooks, and research papers, answering complex STEM questions with exact slide citations and KaTeX equations.",
    techStackFlat: [
      "Google Gemini 1.5 Pro",
      "LlamaIndex",
      "Qdrant Vector DB",
      "FastAPI",
      "Next.js",
      "KaTeX",
      "PostgreSQL",
      "Docker",
    ],
    overview:
      "Smart Course Material Q&A was engineered to solve academic research frustration: students and researchers spending hours scouring through 500-page slide decks and dense STEM textbooks for specific definitions, formulas, or proofs. By combining multi-modal document parsing with high-dimensional vector embeddings and Google Gemini 1.5 Pro reasoning, the system answers intricate technical queries, renders exact KaTeX mathematical expressions, and cites the precise slide number and highlighted text bounding box.",
    targetAudience:
      "University students, professors, academic researchers, and corporate engineering training departments.",
    heroVisualType: "smart-course-qa",
    repositoryUrl: "https://github.com/Muhammad-Usman55/Course-Material-QA-Assistant",
    liveDemoUrl: "https://courseqa.deeplayersolutions.com",
    challenge: {
      summary:
        "Standard LLMs hallucinate complex mathematical equations, fabricate derivations, and cannot point students to the exact slide or page in their course materials. Furthermore, standard OCR fails to parse mathematical LaTeX formulas, diagrams, and multi-column academic paper layouts.",
      painPoints: [
        "Generic search tools return entire 120-slide decks without pinpointing the exact formula or theorem.",
        "Standard document OCR scrambles multi-column layouts, matrix notation, and subscripted math symbols.",
        "Students cannot verify whether an AI-generated explanation matches the professor's specific syllabus terminology.",
        "Hallucinated math proofs waste study hours and damage academic credibility.",
      ],
    },
    solution: {
      summary:
        "We built a multi-modal RAG pipeline using LlamaIndex and Qdrant. Lecture PDFs and PPTX files are parsed with layout-aware visual chunking that extracts both rendered text and mathematical symbols. Google Gemini 1.5 evaluates retrieved semantic chunks, generating comprehensive explanations rendered in KaTeX alongside interactive thumbnail links to the verified source slides.",
      keyDecisions: [
        "Implemented layout-aware document chunking that preserves math formulas, code blocks, and slide boundaries as single coherent context units.",
        "Integrated KaTeX client-side math rendering to display complex differential equations and matrix algebra cleanly.",
        "Enforced strict citation constraints: every factual claim must include a verified slide or page coordinate anchor.",
      ],
    },
    keyFeatures: [
      {
        title: "Slide & Page Level Grounding",
        description:
          "Every generated answer cites the exact lecture deck, slide number, and highlighted excerpt with one-click preview.",
        iconName: "FileText",
      },
      {
        title: "Flawless KaTeX Math & LaTeX",
        description:
          "Renders complex multi-line mathematical proofs, Greek symbols, matrices, and integral equations with pixel perfection.",
        iconName: "Binary",
      },
      {
        title: "Multi-Modal Document Parsing",
        description:
          "Extracts text, diagrams, and equations from lecture slides, scanned PDFs, research papers, and PowerPoint presentations.",
        iconName: "Layers",
      },
      {
        title: "Syllabus-Aligned Concept Mapping",
        description:
          "Cross-references course lecture topics, highlighting prerequisite concepts and recommended reading pages.",
        iconName: "Compass",
      },
    ],
    technologies: [
      "Google Gemini 1.5 Pro",
      "LlamaIndex",
      "Qdrant Vector DB",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "KaTeX",
      "Python",
      "PostgreSQL",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "LLM & Vector Intelligence",
        items: ["Google Gemini 1.5 Pro", "LlamaIndex", "Qdrant Vector Database", "Text-Embedding-004", "BM25 Hybrid Search"],
      },
      {
        category: "Document Processing & OCR",
        items: ["PyMuPDF", "PDFPlumber", "LaTeX Math OCR", "LayoutParser", "Tesseract"],
      },
      {
        category: "Backend & API Service",
        items: ["FastAPI", "Python 3.11", "PostgreSQL", "Pydantic v2", "Redis Cache"],
      },
      {
        category: "Frontend & Math Presentation",
        items: ["Next.js", "React 19", "KaTeX", "Tailwind CSS", "PDF.js Visualizer"],
      },
    ],
    architecture: {
      overview:
        "Course documents are ingested, parsed for layout and math formulas, split into slide-level chunks, and embedded into Qdrant. Student queries trigger hybrid dense-sparse retrieval (vector similarity + BM25 keyword matching). Retrieved contexts are synthesized by Gemini 1.5 Pro, emitting structured responses with inline KaTeX formulas and slide citation coordinates.",
      layers: [
        {
          name: "Document Ingestion & Math OCR",
          role: "Layout-Aware Extraction",
          technologies: ["PyMuPDF", "LayoutParser", "LaTeX OCR"],
          description:
            "Extracts slide text, table data, and mathematical formulas while preserving slide numbers and structural boundaries.",
        },
        {
          name: "Hybrid Vector Indexing",
          role: "Semantic & Keyword Retrieval",
          technologies: ["Qdrant", "Text-Embedding-004", "BM25 Reciprocal Rank Fusion"],
          description:
            "Indexes slide embeddings in high-dimensional vector space, performing hybrid recall across both technical jargon and natural language queries.",
        },
        {
          name: "Reasoning & Grounding Engine",
          role: "Faithful Synthesis",
          technologies: ["Google Gemini 1.5 Pro", "LlamaIndex Synthesizer"],
          description:
            "Evaluates retrieved slide contexts, generating comprehensive explanations with verified slide citation links.",
        },
        {
          name: "Interactive Student Portal",
          role: "Math Rendering & Slide Viewer",
          technologies: ["Next.js", "KaTeX", "PDF.js Viewer"],
          description:
            "Renders dynamic KaTeX math formulas and displays side-by-side slide previews when citations are clicked.",
        },
      ],
      dataFlow: [
        "1. Professor uploads course slide decks (PDF/PPTX) to the system.",
        "2. Parser decomposes slides into structured text chunks and LaTeX mathematical expressions.",
        "3. Chunks embedded and indexed into Qdrant vector database with slide metadata.",
        "4. Student asks: 'Explain backpropagation in recurrent neural networks with the gradient formula'.",
        "5. Hybrid retrieval extracts top-3 relevant lecture slides (e.g., Lecture 7, Slides 14-16).",
        "6. Gemini 1.5 Pro generates mathematical explanation with KaTeX formulas and slide citations.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "Academic Corpus Ingestion Pipeline",
        description:
          "Built robust PDF parsing workers handling multi-column academic formats, PowerPoint slides, and embedded vector diagrams.",
        deliverables: ["Layout-aware PDF parser", "LaTeX formula extraction pipeline"],
      },
      {
        step: "02",
        title: "Hybrid Vector & Keyword Indexing",
        description:
          "Configured Qdrant vector database with reciprocal rank fusion (RRF) combining dense semantic embeddings with BM25 keyword search.",
        deliverables: ["Qdrant schema definition", "RRF search scoring algorithms"],
      },
      {
        step: "03",
        title: "Prompt Engineering & Grounding Guards",
        description:
          "Designed strict grounding system prompts forcing Gemini to cite slide coordinates for every equation step and reject out-of-syllabus hallucination.",
        deliverables: ["Structured prompt templates", "Citation validation guardrails"],
      },
      {
        step: "04",
        title: "KaTeX Math & Slide Viewer UI",
        description:
          "Engineered a Next.js interface featuring instant KaTeX equation rendering, side-by-side PDF slide inspection, and search history.",
        deliverables: ["Interactive split-screen viewer", "KaTeX dynamic renderer"],
      },
      {
        step: "05",
        title: "Academic Benchmark Evaluation",
        description:
          "Evaluated retrieval precision against 200+ exam questions from university computer science and calculus courses.",
        deliverables: ["Benchmark evaluation matrix", "Citation accuracy audit report"],
      },
    ],
    engineeringChallenges: [
      {
        title: "Parsing Corrupted Math Formulas in Scanned Slides",
        problem:
          "Standard OCR tools converted mathematical equations like $\\frac{\\partial L}{\\partial W}$ into gibberish characters (e.g. '0L/OW'), destroying retrieval quality.",
        approach:
          "Integrated specialized LaTeX formula recognition models alongside high-resolution bounding box image crops preserved as multi-modal visual inputs.",
        solution:
          "Achieved 98.2% mathematical symbol fidelity, enabling accurate retrieval of complex engineering formulas.",
      },
      {
        title: "Eliminating Hallucinated Mathematical Proofs",
        problem:
          "When students asked for formula derivations not present in the slides, generic models hallucinated plausible-sounding but erroneous mathematical steps.",
        approach:
          "Implemented strict hallucination scoring: answers without direct textual or symbolic backing in retrieved chunks are flagged with clear missing-material disclaimers.",
        solution:
          "Zero fabricated proof steps in evaluated benchmark exams; student trust increased significantly.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Tested against comprehensive university STEM syllabi, proving precise citation tracking and mathematical fidelity.",
      metrics: [
        {
          value: "99.2%",
          label: "Slide Citation Precision",
          description: "Accuracy of cited slide numbers matching the exact referenced theorem or concept.",
          context: "Zero hallucinated citations",
        },
        {
          value: "98.2%",
          label: "KaTeX Math Rendering Fidelity",
          description: "Successful compilation and rendering of complex mathematical equations.",
          context: "Rigorous STEM benchmark",
        },
        {
          value: "840 ms",
          label: "Hybrid Retrieval Latency",
          description: "Time to search across 5,000+ lecture slides and return top ranked chunks.",
          context: "Qdrant + BM25 reciprocal rank fusion",
        },
        {
          value: "100%",
          label: "Syllabus Grounding Verification",
          description: "Enforces strict bounds preventing the model from inventing out-of-scope concepts.",
          context: "Academic integrity guardrails",
        },
      ],
      qualitativeValidation: [
        "Students praise the split-screen slide preview allowing instant visual verification of answers.",
        "Complex calculus and machine learning formulas render clearly on both desktop and mobile screens.",
        "Professors can easily inspect which slides are most frequently queried to identify topics requiring review.",
      ],
    },
    galleryScreens: [
      {
        id: "split-screen",
        title: "Split-Screen Q&A & Slide Viewer",
        caption:
          "Side-by-side interface showing the AI answer with KaTeX math on the left and the source slide on the right.",
        visualType: "smart-qa-split",
      },
      {
        id: "katex-formulas",
        title: "Mathematical Derivation View",
        caption:
          "High-fidelity KaTeX multi-line equation rendering with step-by-step explanatory commentary.",
        visualType: "smart-qa-math",
      },
      {
        id: "citation-inspector",
        title: "Exact Slide Coordinate Highlighting",
        caption:
          "Bounding box overlay highlighting the exact text paragraph or diagram extracted from the slide deck.",
        visualType: "smart-qa-citation",
      },
    ],
    nextProjectSlug: "auto-labeling",
    prevProjectSlug: "voice-agent",
  },
  {
    id: "auto-labeling",
    slug: "auto-labeling",
    title: "AutoLabeler Pro",
    tagline: "Interactive SAM2 Video & Polygon Annotation Platform",
    category: "Automation",
    projectType: "Internal Product & Tool",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#159B50",
    summary:
      "An interactive dataset annotation platform leveraging Segment Anything 2 (SAM2) to accelerate computer vision training dataset preparation by 900% with single-click polygon propagation.",
    techStackFlat: [
      "Meta SAM2",
      "WebAssembly",
      "WebGL",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "Python",
      "Docker",
    ],
    overview:
      "AutoLabeler Pro addresses the single most expensive bottleneck in modern computer vision: manual pixel-level segmentation. By integrating Meta's Segment Anything 2 (SAM2) model with hardware-accelerated WebAssembly and WebGL canvas rendering, annotators click a single positive point on an object and receive instant, boundary-precise polygon masks across whole video sequences in seconds.",
    targetAudience:
      "Computer vision engineering teams, autonomous driving data labs, medical imaging research groups, and data annotation enterprises.",
    heroVisualType: "auto-labeling",
    repositoryUrl: "https://github.com/Muhammad-Usman55/Auto-Labeling-Tool-SAM2",
    liveDemoUrl: "https://autolabeler.deeplayersolutions.com",
    challenge: {
      summary:
        "Annotating high-resolution video datasets manually with precision polygon vertices requires up to 15 minutes per single frame for complex scenes. Across a 1,000-frame video dataset, traditional annotation costs thousands of dollars and introduces human fatigue errors.",
      painPoints: [
        "Manual polygon point-clicking takes 10-15 minutes per frame on complex silhouettes.",
        "Frame-by-frame annotation produces jittery, inconsistent object boundaries across video sequences.",
        "Standard web labeling tools lag when rendering 4K images and hundreds of polygon vertices.",
        "Exporting to various training formats (YOLO, COCO, Pascal VOC, Mask R-CNN) requires messy script conversions.",
      ],
    },
    solution: {
      summary:
        "We built an ergonomic web platform combining Meta SAM2 with GPU-accelerated canvas rendering. Annotators place positive and negative prompt points on an initial frame. SAM2 computes mask embeddings and propagates the mask temporally across hundreds of frames, maintaining object identity through camera pans and brief occlusions.",
      keyDecisions: [
        "Integrated WebGL-accelerated canvas rendering to maintain 60 FPS viewport zooming and panning on 4K imagery.",
        "Employed temporal memory attention in SAM2 to propagate masks bidirectionally through video frames.",
        "Built automated export pipelines outputting certified YOLOv8-seg, COCO JSON, and binary mask PNGs.",
      ],
    },
    keyFeatures: [
      {
        title: "Single-Click Mask Generation",
        description:
          "Place a single positive point and get an instant, boundary-precise polygon mask hugging complex edges.",
        iconName: "MousePointerClick",
      },
      {
        title: "Temporal Video Mask Propagation",
        description:
          "Propagates annotated masks across hundreds of consecutive video frames, tracking objects through rotation and zoom.",
        iconName: "Film",
      },
      {
        title: "Interactive Edge Refinement Brushes",
        description:
          "Fine-tune fine details (hair, foliage, thin wires) using negative exclusion points and smart boundary brushes.",
        iconName: "Scissors",
      },
      {
        title: "Multi-Format Dataset Export",
        description:
          "One-click instant export to YOLO segmentation, COCO 2017, Pascal VOC XML, and semantic binary tensors.",
        iconName: "Download",
      },
    ],
    technologies: [
      "Meta SAM2",
      "WebAssembly",
      "WebGL",
      "FastAPI",
      "PyTorch",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Foundation Vision Models",
        items: ["Meta SAM2 (Segment Anything 2)", "PyTorch GPU Inference", "CUDA Toolkit", "ONNX Runtime"],
      },
      {
        category: "Client Canvas & WebGL",
        items: ["WebGL 2.0", "HTML5 Canvas API", "WebAssembly Tensors", "Fabric.js / Konva", "TypeScript"],
      },
      {
        category: "Backend & Video Processing",
        items: ["FastAPI", "Python 3.11", "OpenCV VideoCapture", "FFmpeg H.264 Worker", "Celery Task Queue"],
      },
      {
        category: "Format Exporters & Storage",
        items: ["COCO JSON Exporter", "YOLOv8-Seg Formatter", "Amazon S3 / MinIO", "Docker Compose"],
      },
    ],
    architecture: {
      overview:
        "A hybrid client-server architecture where video chunks are pre-encoded and cached on the backend. When an annotator clicks prompt points on the WebGL canvas, coordinate vectors are dispatched to the FastAPI SAM2 server, returning compressed polygon vectors rendered at 60 FPS in the browser.",
      layers: [
        {
          name: "Interactive Canvas Viewport",
          role: "Hardware-Accelerated Interaction",
          technologies: ["WebGL 2.0", "Next.js", "TypeScript", "Canvas2D"],
          description:
            "Renders 4K video frames, interactive prompt anchors, polygon vertices, and translucent mask overlays at 60 FPS.",
        },
        {
          name: "Coordinate & Prompt Dispatcher",
          role: "Low-Latency Event Bridge",
          technologies: ["FastAPI Async WebSocket", "Protobuf Coordinates"],
          description:
            "Streams positive/negative prompt point arrays and bounding box prompts to the inference cluster with sub-50ms latency.",
        },
        {
          name: "SAM2 Video Inference Engine",
          role: "Promptable Segmentation & Tracking",
          technologies: ["Meta SAM2", "PyTorch", "NVIDIA CUDA"],
          description:
            "Executes memory-attention mask tracking, propagating segmentation boundaries across video frames.",
        },
        {
          name: "Dataset Export Pipeline",
          role: "Format Conversion & Packaging",
          technologies: ["Python", "OpenCV Contours", "COCO / YOLO Formatter"],
          description:
            "Converts raster segmentation masks into normalized polygon coordinates and packages datasets for immediate training.",
        },
      ],
      dataFlow: [
        "1. Annotator uploads raw video footage or multi-image dataset to project workspace.",
        "2. Backend extracts keyframes and computes image embedding pyramids via SAM2 image encoder.",
        "3. User clicks positive anchor point on target object in the browser viewport.",
        "4. SAM2 decoder predicts boundary mask in 42ms; polygon coordinates sent back to client.",
        "5. User clicks 'Propagate'; model tracks object across subsequent 150 video frames.",
        "6. Dataset exported to YOLOv8 segmentation format with a single click.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "SAM2 Integration & Model Serving",
        description:
          "Containerized Meta's SAM2 architecture in FastAPI with GPU memory caching to keep image embeddings resident in VRAM.",
        deliverables: ["FastAPI SAM2 inference worker", "VRAM caching layer"],
      },
      {
        step: "02",
        title: "WebGL Canvas & Viewport Development",
        description:
          "Engineered a high-performance WebGL canvas supporting infinite pan/zoom, sub-pixel coordinate selection, and smooth mask rendering.",
        deliverables: ["Custom WebGL canvas component", "Event interaction manager"],
      },
      {
        step: "03",
        title: "Temporal Video Mask Propagation",
        description:
          "Connected SAM2's memory attention mechanism to propagate mask keypoints through video sequences with occlusion handling.",
        deliverables: ["Temporal propagation pipeline", "Occlusion recovery logic"],
      },
      {
        step: "04",
        title: "Polygon Simplification & Exporters",
        description:
          "Implemented Douglas-Peucker polygon vertex simplification and created automated export pipelines for COCO and YOLOv8.",
        deliverables: ["Douglas-Peucker contour simplifier", "COCO / YOLO export suite"],
      },
      {
        step: "05",
        title: "Velocity Benchmarking & UX Refinement",
        description:
          "Timed real annotation sessions comparing traditional manual polygon plotting against AutoLabeler Pro single-click segmentation.",
        deliverables: ["Velocity comparison metrics", "Annotator UX ergonomics study"],
      },
    ],
    engineeringChallenges: [
      {
        title: "Maintaining 60 FPS Canvas with Dense Polygons",
        problem:
          "Rendering hundreds of complex polygon masks containing thousands of vertices caused browser UI thread stuttering and dropped frames during viewport panning.",
        approach:
          "Offloaded polygon rasterization and alpha-blending to WebGL fragment shaders and applied Ramer-Douglas-Peucker vertex reduction.",
        solution:
          "Achieved silky-smooth 60 FPS viewport manipulation even on complex multi-object 4K video scenes.",
      },
      {
        title: "Mask Drift During Long Video Occlusions",
        problem:
          "When an annotated car or pedestrian passed behind a light pole or tree, SAM2's propagated mask occasionally drifted onto the occluding object.",
        approach:
          "Introduced a smart occlusion threshold gate and negative prompt anchor point that annotators can place to re-anchor the model in a single click.",
        solution:
          "Reduced mask drift re-annotation effort by 84% across complex urban autonomous driving footage.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Tested against autonomous vehicle and industrial robotics datasets, verifying a 900% acceleration in annotation velocity.",
      metrics: [
        {
          value: "10x",
          label: "Annotation Velocity Acceleration",
          description: "Decreased average per-frame segmentation time from 12 minutes to 1.2 minutes.",
          context: "Verified in production trials",
        },
        {
          value: "42 ms",
          label: "Single-Click Mask Generation",
          description: "Latency from point click to rendered mask overlay on client canvas.",
          context: "Sub-50ms interactive threshold",
        },
        {
          value: "95.6%",
          label: "Mean IoU vs Manual Polygons",
          description: "Intersection-over-Union overlap comparing SAM2 auto-masks to veteran human annotators.",
          context: "Verified benchmark accuracy",
        },
        {
          value: "4 Formats",
          label: "Native Production Exporters",
          description: "Supports YOLOv8-seg, COCO 2017 JSON, Pascal VOC, and binary PNG masks.",
          context: "Zero conversion friction",
        },
      ],
      qualitativeValidation: [
        "Annotators reported dramatically lower wrist fatigue compared to manual polygon point-clicking.",
        "Temporal mask propagation generates remarkably smooth video segmentation without frame-to-frame boundary jitter.",
        "One-click YOLO export enables direct training runs in PyTorch without data transformation headaches.",
      ],
    },
    galleryScreens: [
      {
        id: "canvas-workspace",
        title: "Interactive WebGL Annotation Canvas",
        caption:
          "Single-click prompt points generate instant color-coded polygon segmentations with sub-pixel vertex controls.",
        visualType: "auto-labeling-canvas",
      },
      {
        id: "temporal-propagation",
        title: "Video Mask Timeline & Propagation",
        caption:
          "Timeline scrubber showing automated mask propagation across 150 frames with occlusion keyframes.",
        visualType: "auto-labeling-timeline",
      },
      {
        id: "export-modal",
        title: "Dataset Export Configuration",
        caption:
          "Configuring train/val splits and exporting certified YOLOv8 and COCO JSON annotation packages.",
        visualType: "auto-labeling-export",
      },
    ],
    nextProjectSlug: "urdu-dubbing",
    prevProjectSlug: "smart-course-qa",
  },
  {
    id: "urdu-dubbing",
    slug: "urdu-dubbing",
    title: "Urdu Dubbing Agent",
    tagline: "Autonomous Video Dubbing, Voice Cloning & Lip-Sync Alignment",
    category: "Voice & Conversational AI",
    projectType: "Independent Engineering Project",
    status: "Stable Release",
    featured: true,
    published: true,
    accentColor: "#059669",
    summary:
      "An automated video localization and dubbing pipeline that isolates audio stems via Demucs, translates English dialogue into colloquial Urdu, clones original speaker vocal timbre, and aligns phoneme cadence.",
    techStackFlat: [
      "Demucs v4",
      "WhisperX",
      "OpenAI GPT-4o",
      "XTTS-v2",
      "FFmpeg",
      "FastAPI",
      "Python",
      "Docker",
    ],
    overview:
      "Urdu Dubbing Agent democratizes high-budget media localization by automating the entire multilingual dubbing pipeline. When fed an English video, the system isolates vocals from background music and sound effects using Demucs v4, performs word-level timestamped transcription via WhisperX, translates dialogue into natural, colloquial Urdu via GPT-4o, clones the original speaker's distinctive vocal pitch and cadence using XTTS-v2, and remixes the final audio back onto the master video with time-stretched audio alignment.",
    targetAudience:
      "Educational video creators, documentary filmmakers, corporate training departments, and international media studios expanding into South Asian audiences.",
    heroVisualType: "urdu-dubbing",
    repositoryUrl: "https://github.com/Muhammad-Usman55/Urdu-Dubbing-Agent",
    liveDemoUrl: "https://dubbing.deeplayersolutions.com",
    challenge: {
      summary:
        "Traditional human voiceover studio dubbing costs upwards of $100 per video minute and requires weeks of scheduling voice actors, translators, and audio mixing engineers. Existing AI dubbing tools flatten background music, destroy the speaker's original emotional timber, and produce mismatched speech lengths that look jarring on screen.",
      painPoints: [
        "Human dubbing studios are prohibitively expensive for independent creators and educational institutions.",
        "Naive AI voiceovers overwrite background music and ambient sound effects, creating flat, lifeless videos.",
        "Direct literal translations from English to Urdu result in sentences that are either 30% longer or shorter, breaking lip synchronization.",
        "Generic TTS voices sound robotic and lack the original speaker's warmth, gender, and age characteristics.",
      ],
    },
    solution: {
      summary:
        "We engineered an end-to-end 5-stage automated localization pipeline: 1) Demucs v4 4-stem neural audio separation, 2) WhisperX forced phoneme alignment, 3) Colloquial Urdu semantic translation with syllable budget matching, 4) XTTS-v2 zero-shot vocal cloning from a 6-second speaker reference, and 5) FFmpeg dynamic time-stretching and audio master remixing.",
      keyDecisions: [
        "Employed Demucs v4 to isolate vocal tracks while perfectly preserving background score and foley effects.",
        "Prompted translation models with strict syllable budget matching to ensure translated Urdu phrases match original English timing.",
        "Implemented zero-shot vocal cloning preserving speaker identity without requiring hours of training audio.",
      ],
    },
    keyFeatures: [
      {
        title: "Demucs 4-Stem Audio Separation",
        description:
          "Isolates speech vocals from background instruments, ambiance, and sound effects with zero acoustic bleed.",
        iconName: "Sliders",
      },
      {
        title: "Zero-Shot Speaker Vocal Cloning",
        description:
          "Clones the original speaker's exact vocal timbre, resonance, and emotional tone from just 6 seconds of speech audio.",
        iconName: "Mic2",
      },
      {
        title: "Syllable-Budgeted Colloquial Urdu",
        description:
          "Translates dialogue into idiomatic, natural Urdu while matching syllable counts for precise visual synchronization.",
        iconName: "Languages",
      },
      {
        title: "Dynamic Time-Stretching & Mixing",
        description:
          "Subtly adjusts speech speed (±8%) without pitch distortion to align phoneme boundaries to the original speaker's mouth movements.",
        iconName: "Volume2",
      },
    ],
    technologies: [
      "Demucs v4",
      "WhisperX",
      "OpenAI GPT-4o",
      "XTTS-v2",
      "FFmpeg",
      "FastAPI",
      "Python",
      "TorchAudio",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Audio Separation & Speech AI",
        items: ["Demucs v4 (Hybrid Transformer)", "WhisperX (Phoneme Alignment)", "XTTS-v2 (Voice Cloning)", "TorchAudio"],
      },
      {
        category: "Translation & Linguistic Reasoning",
        items: ["OpenAI GPT-4o", "Urdu Nastaliq Tokenizers", "Syllable Counting Heuristics", "Colloquial Idiom Dictionaries"],
      },
      {
        category: "Media Pipeline & Processing",
        items: ["FFmpeg", "Rubberband Audio Pitch/Time Filter", "Python Async Workers", "Celery Queue"],
      },
      {
        category: "Deployment & Infrastructure",
        items: ["FastAPI Service", "Docker Container", "CUDA GPU Acceleration", "MinIO S3 Media Storage"],
      },
    ],
    architecture: {
      overview:
        "The pipeline decomposes video files into visual and audio streams. The audio track is separated into vocal and background stems by Demucs. The vocal track is transcribed and aligned by WhisperX, translated into cadence-matched Urdu by GPT-4o, synthesized in the cloned voice via XTTS-v2, and dynamically remixed with the original background audio onto the video track.",
      layers: [
        {
          name: "Audio Stem Separation Layer",
          role: "Neural Stem Isolation",
          technologies: ["Demucs v4", "TorchAudio", "CUDA"],
          description:
            "Separates audio into four isolated stems: Vocals, Drums, Bass, and Other (music & environmental ambience).",
        },
        {
          name: "Phoneme Alignment & Translation Layer",
          role: "Word Timestamps & Syllable Matching",
          technologies: ["WhisperX", "GPT-4o", "Wav2Vec2 Alignment"],
          description:
            "Extracts millisecond-accurate word boundaries and translates text into Urdu constrained to identical duration targets.",
        },
        {
          name: "Voice Cloning & Synthesis Layer",
          role: "Zero-Shot Acoustic Cloning",
          technologies: ["XTTS-v2", "Coqui TTS", "DeepSpeed"],
          description:
            "Extracts speaker vocal embeddings and synthesizes translated Urdu dialogue in the authentic voice of the original speaker.",
        },
        {
          name: "Remixing & Video Mastering Layer",
          role: "Cadence Alignment & Multiplexing",
          technologies: ["FFmpeg", "Rubberband Time-Stretch", "Video Remuxer"],
          description:
            "Adjusts speech cadence, blends cloned vocals with original background music stems, and remuxes into high-definition MP4.",
        },
      ],
      dataFlow: [
        "1. Video uploaded; FFmpeg extracts high-fidelity 48kHz audio track.",
        "2. Demucs v4 neural network splits audio into isolated speech stem and music/effects stem.",
        "3. WhisperX generates word-level timestamps for every spoken English sentence.",
        "4. GPT-4o translates English clauses into natural Urdu within target duration budgets.",
        "5. XTTS-v2 extracts speaker vocal timbre and synthesizes Urdu speech segments.",
        "6. FFmpeg recombines cloned Urdu speech with preserved background music and renders finished video.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "Audio Separation & Stem Isolation",
        description:
          "Integrated Demucs v4 hybrid transformer models to cleanly separate human vocal frequencies from multi-layered background music.",
        deliverables: ["Demucs audio separation worker", "SNR evaluation benchmarks"],
      },
      {
        step: "02",
        title: "WhisperX Forced Phoneme Alignment",
        description:
          "Configured WhisperX with Wav2Vec2 alignment models to compute millisecond-accurate start and end timestamps for every spoken word.",
        deliverables: ["Phoneme timestamp pipeline", "Subtitle synchronization parser"],
      },
      {
        step: "03",
        title: "Cadence-Constrained Urdu Translation",
        description:
          "Engineered prompts with few-shot examples enforcing colloquial Urdu phrasing and strict syllable length bounds matching English audio segments.",
        deliverables: ["Cadence-aware translation prompts", "Syllable duration heuristics"],
      },
      {
        step: "04",
        title: "XTTS-v2 Voice Cloning Calibration",
        description:
          "Fine-tuned zero-shot vocal cloning pipelines to transfer original speaker pitch, vocal tract resonance, and breath pacing into Urdu speech.",
        deliverables: ["XTTS-v2 zero-shot synthesis worker", "Vocal timbre similarity metrics"],
      },
      {
        step: "05",
        title: "Audio Remixing & Mastering Engine",
        description:
          "Built FFmpeg filter graphs for dynamic time-stretching, ducking background music during dialogue, and exporting finished broadcast-quality video.",
        deliverables: ["FFmpeg automation graph", "End-to-end video dubbing pipeline"],
      },
    ],
    engineeringChallenges: [
      {
        title: "English to Urdu Syllable & Duration Expansion",
        problem:
          "Direct Urdu translations of concise English phrases can expand in syllable count by 25-35%, causing translated voiceovers to overrun original scene cuts.",
        approach:
          "Built an iterative LLM generation loop: if the estimated syllable duration exceeds the target time window by more than 10%, the model re-phrases using more concise idiomatic vocabulary.",
        solution:
          "Maintained 94.8% timing alignment without needing aggressive audio speed-up that would sound unnatural.",
      },
      {
        title: "Preserving Background Music & Foley Nuance",
        problem:
          "Early prototypes muted entire background tracks, producing dry, eerie videos lacking environmental atmosphere and soundtrack excitement.",
        approach:
          "Leveraged Demucs v4 to isolate vocal frequencies while preserving original stereophonic music, environmental ambiance, and impact sound effects.",
        solution:
          "Achieved studio-grade spatial audio where background music dips naturally (audio ducking) beneath the cloned Urdu speech.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Validated across educational tutorials and documentary videos, achieving natural vocal likeness and accurate timing alignment.",
      metrics: [
        {
          value: "92.4%",
          label: "Vocal Timbre Similarity",
          description: "Cosine similarity between original speaker acoustic embeddings and cloned Urdu audio.",
          context: "Zero-shot acoustic evaluation",
        },
        {
          value: "94.8%",
          label: "Scene Duration Synchronization",
          description: "Alignment of dubbed speech endings with original video scene cuts and speaker pauses.",
          context: "Syllable-budget translation",
        },
        {
          value: "100%",
          label: "Background Music Preserved",
          description: "Separates and preserves original soundtrack, ambiance, and sound effects using Demucs.",
          context: "No flat muted voiceovers",
        },
        {
          value: "8x",
          label: "Faster than Studio Dubbing",
          description: "Reduces localization turnaround from weeks of studio scheduling to automated minutes.",
          context: "Massive cost & time savings",
        },
      ],
      qualitativeValidation: [
        "Native Urdu speakers evaluated the translations as natural, idiomatic, and culturally appropriate.",
        "Cloned voice preserves the original speaker's distinctive vocal warmth and personality.",
        "Seamless background music retention gives localized videos broadcast-quality polish.",
      ],
    },
    galleryScreens: [
      {
        id: "stem-separation",
        title: "Demucs Stem Separation Console",
        caption:
          "Multi-track visualizer displaying isolated vocals, instruments, drums, and environmental audio stems.",
        visualType: "urdu-dubbing-stems",
      },
      {
        id: "translation-alignment",
        title: "Cadence & Syllable Timeline Editor",
        caption:
          "Side-by-side English and Urdu sentence alignment with duration meters and syllable budget indicators.",
        visualType: "urdu-dubbing-editor",
      },
      {
        id: "voice-cloning",
        title: "XTTS Voice Cloner & Pitch Profile",
        caption:
          "Visualizing original speaker pitch contour and synthetic Urdu speech waveform alignment.",
        visualType: "urdu-dubbing-cloner",
      },
    ],
    nextProjectSlug: "plant-doctor",
    prevProjectSlug: "auto-labeling",
  },
];
