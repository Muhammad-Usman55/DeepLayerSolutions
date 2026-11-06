import { CaseStudyProject } from "@/types";

export const projectsData: CaseStudyProject[] = [
  {
    id: "plant-doctor",
    slug: "plant-doctor",
    title: "Plant Doctor",
    tagline: "AI plant disease detection & care insights.",
    category: "AI & ML",
    projectType: "Production Engineering Prototype",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#159B50",
    summary:
      "A deep learning computer vision mobile and web application that diagnoses 38 crop foliage diseases in real time from field photographs with offline edge triage.",
    techStackFlat: [
      "Python",
      "TensorFlow",
      "FastAPI",
      "Computer Vision",
    ],
    overview:
      "Plant Doctor was engineered to empower agronomists and farmers with instant, scientifically accurate crop disease classification and actionable remediation plans directly in remote fields. Leveraging a dual-stage neural network architecture trained on over 87,000 crop condition images, the platform identifies 38 distinct bacterial, fungal, and viral leaf pathologies with high confidence—even under irregular sunlight and partial occlusion.",
    targetAudience:
      "Commercial farming enterprises, agricultural cooperatives, agronomists, and smallholder farmers operating in areas with intermittent cellular connectivity.",
    heroVisualType: "plant-doctor",
    repositoryUrl: "https://github.com/Muhammad-Usman55/Plant-Doctor",
    liveDemoUrl: "https://plant-doctor.deeplayersolutions.com",
    challenge: {
      summary:
        "Foliage diseases spread rapidly across crops before visible necrosis is noticed by field hands. In remote agricultural regions, certified pathologists are scarce, and intermittent rural connectivity renders cloud-only AI diagnostic tools unusable during critical scouting hours.",
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
      "Python",
      "TensorFlow",
      "FastAPI",
      "Computer Vision",
      "MobileNetV3",
      "Next.js",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Machine Learning & Vision",
        items: ["TensorFlow", "PyTorch", "MobileNetV3", "OpenCV", "Albumentations"],
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
        "The system operates on an edge-first, cloud-augmented paradigm. Mobile and browser clients perform instant offline inference using an optimized INT8 model. High-resolution imagery synchronizes to the cloud API where an ensemble model performs deep Grad-CAM explainability analysis and updates regional epidemiology heatmaps.",
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
        visualType: "plant-doctor",
      },
      {
        id: "gradcam-analysis",
        title: "Grad-CAM Pathological Heatmap",
        caption:
          "Explainable AI visualization revealing neural activation density over fungal necrosis spots.",
        visualType: "plant-doctor",
      },
      {
        id: "treatment-plan",
        title: "Clinical Remediation Protocol",
        caption:
          "Structured chemical and organic treatment plans calibrated to crop maturity and environmental moisture.",
        visualType: "plant-doctor",
      },
    ],
    nextProjectSlug: "travelmate-ai",
    prevProjectSlug: "finsecure-ml",
  },
  {
    id: "travelmate-ai",
    slug: "travelmate-ai",
    title: "TravelMate AI",
    tagline: "Smart travel planning with real-time data.",
    category: "Web Apps",
    projectType: "Production Engineering Prototype",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#087A3D",
    summary:
      "An autonomous conversational travel companion orchestrated with verified tool grounding that synthesizes real-time flight schedules, lodging options, and route optimization into balanced, delay-resilient itineraries.",
    techStackFlat: [
      "Django",
      "OpenAI",
      "WebSocket",
      "Maps API",
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
      "Django",
      "OpenAI",
      "WebSocket",
      "Maps API",
      "LangGraph",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Agentic AI & Orchestration",
        items: ["OpenAI GPT-4o", "LangGraph", "LangChain", "Pydantic", "Prompt Engineering"],
      },
      {
        category: "Backend & Data Storage",
        items: ["Django", "FastAPI", "Python 3.11", "PostgreSQL", "Redis State Checkpointer"],
      },
      {
        category: "Frontend & Visualization",
        items: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Mapbox GL / Leaflet"],
      },
      {
        category: "External Integration",
        items: ["Amadeus GDS API", "Google Places API", "OpenWeatherMap API", "WebSockets"],
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
        visualType: "travelmate-ai",
      },
      {
        id: "agent-graph",
        title: "LangGraph State Inspector",
        caption:
          "Live visualization of supervisor decisions, worker agent tool calls, and validation checkpoints.",
        visualType: "travelmate-ai",
      },
      {
        id: "interactive-map",
        title: "Geospatial Waypoint Mapper",
        caption:
          "Interactive map with numbered pins, daily walking routes, and nearby curated dining recommendations.",
        visualType: "travelmate-ai",
      },
    ],
    nextProjectSlug: "gender-detection",
    prevProjectSlug: "plant-doctor",
  },
  {
    id: "gender-detection",
    slug: "gender-detection",
    title: "VisionSense",
    tagline: "Advanced video analytics & insights.",
    category: "AI & ML",
    projectType: "Production Engineering Prototype",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#059669",
    summary:
      "Privacy-first edge computer vision system for foot-traffic demographic analytics, combining YOLOv8 person detection with ResNet-50 classification on local edge hardware.",
    techStackFlat: [
      "YOLO",
      "OpenCV",
      "PyTorch",
      "AI Analytics",
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
      "YOLO",
      "OpenCV",
      "PyTorch",
      "AI Analytics",
      "NVIDIA TensorRT",
      "CUDA",
      "C++",
      "Python",
      "MQTT",
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
        visualType: "gender-detection",
      },
      {
        id: "edge-pipeline",
        title: "TensorRT Pipeline Profiler",
        caption:
          "Telemetry showing GPU memory utilization, frame decoding latency, and MQTT event dispatch rates.",
        visualType: "gender-detection",
      },
      {
        id: "dwell-analytics",
        title: "Store Dwell & Footfall Dashboard",
        caption:
          "Aggregated hourly foot-traffic charts, gender balance indicators, and average dwell times by department.",
        visualType: "gender-detection",
      },
    ],
    nextProjectSlug: "voice-agent",
    prevProjectSlug: "travelmate-ai",
  },
  {
    id: "voice-agent",
    slug: "voice-agent",
    title: "DeepVoice Agent",
    tagline: "Intelligent voice assistant for businesses.",
    category: "Automation",
    projectType: "Production Engineering Prototype",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#10B981",
    summary:
      "A real-time conversational voice assistant engine delivering sub-450ms voice-to-voice latency with streaming bidirectional WebSockets, neural speech synthesis, and barge-in interruption handling.",
    techStackFlat: [
      "Python",
      "LLM",
      "FastAPI",
      "Speech AI",
    ],
    overview:
      "DeepVoice Agent replaces frustrating legacy IVR phone trees with a natural, full-duplex conversational voice AI capable of fluid turn-taking, intelligent mid-sentence barge-in interruptions, and live CRM database mutations. Built on an event-driven streaming audio architecture, the system pipelines streaming audio chunks through Faster-Whisper, speculative LLM token decoders, and ultra-low-latency neural text-to-speech vocoders to deliver voice responses in under 450 milliseconds.",
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
      "LLM",
      "FastAPI",
      "Speech AI",
      "WebSockets",
      "Whisper",
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
        visualType: "voice-agent",
      },
      {
        id: "bargein-debugger",
        title: "Barge-In & VAD Waveform Inspector",
        caption:
          "Visualizing 40ms interruption detection events and immediate audio queue cancellation.",
        visualType: "voice-agent",
      },
      {
        id: "crm-integration",
        title: "Live CRM Tool Calling",
        caption:
          "Real-time customer record updates and verified appointment dispatching triggered by voice commands.",
        visualType: "voice-agent",
      },
    ],
    nextProjectSlug: "smart-course-qa",
    prevProjectSlug: "gender-detection",
  },
  {
    id: "smart-course-qa",
    slug: "smart-course-qa",
    title: "Smart Enterprise Q&A",
    tagline: "RAG-powered knowledge assistant.",
    category: "AI & ML",
    projectType: "Production Engineering Prototype",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#075C32",
    summary:
      "Enterprise document intelligence engine that indexes millions of pages of technical documentation, contracts, and internal knowledge bases with exact page citations.",
    techStackFlat: [
      "LangChain",
      "Streamlit",
      "Gemini",
      "RAG",
    ],
    overview:
      "Smart Enterprise Q&A solves knowledge fragmentation by allowing teams to query massive corpora of proprietary knowledge in plain natural language. The system cites exact page numbers, highlights source excerpts, and cross-references verified internal repositories with zero hallucinations.",
    targetAudience:
      "Enterprise engineering teams, academic researchers, legal departments, and corporate knowledge hubs.",
    heroVisualType: "smart-course-qa",
    repositoryUrl: "https://github.com/Muhammad-Usman55/Course-Material-QA-Assistant",
    liveDemoUrl: "https://courseqa.deeplayersolutions.com",
    challenge: {
      summary:
        "Standard LLMs hallucinate factual answers, cannot pinpoint exact source pages in 500-page enterprise manuals, and struggle with multi-column formats and complex diagrams.",
      painPoints: [
        "Generic search tools return entire documents without pinpointing the exact formula or section.",
        "Standard document OCR scrambles multi-column layouts and technical diagrams.",
        "Employees waste hours verifying whether an AI-generated explanation matches internal compliance.",
        "Hallucinated answers waste research hours and risk costly operational errors.",
      ],
    },
    solution: {
      summary:
        "We built a multi-modal RAG pipeline using LangChain, Qdrant, and Google Gemini. Documents are parsed with layout-aware visual chunking that extracts both rendered text and tables. Gemini evaluates retrieved semantic chunks, generating verified answers with interactive links to the source pages.",
      keyDecisions: [
        "Implemented layout-aware document chunking that preserves tables, code blocks, and section boundaries as single coherent context units.",
        "Integrated client-side citation rendering to display exact source page coordinates.",
        "Enforced strict citation constraints: every factual claim must include a verified slide or page coordinate anchor.",
      ],
    },
    keyFeatures: [
      {
        title: "Slide & Page Level Grounding",
        description:
          "Every generated answer cites the exact document, page number, and highlighted excerpt with one-click preview.",
        iconName: "FileText",
      },
      {
        title: "Multi-Modal Document Parsing",
        description:
          "Extracts text, diagrams, and equations from technical manuals, scanned PDFs, research papers, and presentations.",
        iconName: "Layers",
      },
      {
        title: "Hybrid Vector & Keyword Indexing",
        description:
          "Combines dense semantic vector search with BM25 keyword matching for optimal recall across technical jargon.",
        iconName: "Binary",
      },
      {
        title: "Access Control & Governance",
        description:
          "Strict enterprise access controls mirroring existing Active Directory / LDAP groups.",
        iconName: "ShieldCheck",
      },
    ],
    technologies: [
      "LangChain",
      "Streamlit",
      "Gemini",
      "RAG",
      "Qdrant",
      "FastAPI",
      "Next.js",
      "Python",
      "PostgreSQL",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "LLM & Vector Intelligence",
        items: ["Google Gemini 1.5", "LangChain", "Qdrant Vector Database", "Text-Embedding-004", "BM25 Hybrid Search"],
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
        category: "Frontend & Interfaces",
        items: ["Next.js", "Streamlit", "React 19", "Tailwind CSS", "PDF.js Visualizer"],
      },
    ],
    architecture: {
      overview:
        "Documents are ingested, parsed for layout, split into structured chunks, and embedded into Qdrant. User queries trigger hybrid dense-sparse retrieval (vector similarity + BM25 keyword matching). Retrieved contexts are synthesized by Gemini, emitting structured responses with inline page citations.",
      layers: [
        {
          name: "Document Ingestion Layer",
          role: "Layout-Aware Extraction",
          technologies: ["PyMuPDF", "LayoutParser", "Tesseract"],
          description:
            "Extracts document text, table data, and diagrams while preserving page numbers and structural boundaries.",
        },
        {
          name: "Hybrid Vector Indexing",
          role: "Semantic & Keyword Retrieval",
          technologies: ["Qdrant", "Text-Embedding-004", "BM25"],
          description:
            "Indexes chunk embeddings in high-dimensional vector space, performing hybrid recall across both technical jargon and natural language queries.",
        },
        {
          name: "Reasoning & Grounding Engine",
          role: "Faithful Synthesis",
          technologies: ["Google Gemini 1.5", "LangChain Synthesizer"],
          description:
            "Evaluates retrieved contexts, generating comprehensive explanations with verified page citation links.",
        },
        {
          name: "Interactive Knowledge Portal",
          role: "Citation & Document Viewer",
          technologies: ["Next.js", "Streamlit", "PDF.js Viewer"],
          description:
            "Renders verified answers and displays side-by-side document previews when citations are clicked.",
        },
      ],
      dataFlow: [
        "1. Team uploads enterprise manuals (PDF/DOCX) to the knowledge workspace.",
        "2. Parser decomposes documents into structured text chunks and table data.",
        "3. Chunks embedded and indexed into Qdrant vector database with page metadata.",
        "4. User asks natural language question regarding corporate procedures.",
        "5. Hybrid retrieval extracts top-3 relevant document excerpts with cosine scoring.",
        "6. Gemini generates comprehensive explanation with exact page citations.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "Document Ingestion Pipeline",
        description:
          "Built robust PDF parsing workers handling multi-column academic formats and scanned documents.",
        deliverables: ["Layout-aware PDF parser", "Table extraction pipeline"],
      },
      {
        step: "02",
        title: "Hybrid Vector Indexing",
        description:
          "Configured Qdrant vector database with reciprocal rank fusion (RRF) combining dense semantic embeddings with BM25 keyword search.",
        deliverables: ["Qdrant schema definition", "RRF search scoring algorithms"],
      },
      {
        step: "03",
        title: "Grounding Guardrails",
        description:
          "Designed strict grounding prompts forcing the model to cite page coordinates for every claim and reject out-of-corpus hallucination.",
        deliverables: ["Structured prompt templates", "Citation validation guardrails"],
      },
      {
        step: "04",
        title: "User Interface Development",
        description:
          "Engineered a responsive interface featuring side-by-side document inspection and instant search history.",
        deliverables: ["Interactive split-screen viewer", "Streamlit prototype"],
      },
      {
        step: "05",
        title: "Benchmark Evaluation",
        description:
          "Evaluated retrieval precision against 200+ complex queries from internal technical manuals.",
        deliverables: ["Benchmark evaluation matrix", "Citation accuracy audit report"],
      },
    ],
    engineeringChallenges: [
      {
        title: "Handling Complex Multi-Column Documents",
        problem:
          "Standard OCR tools read multi-column documents horizontally across column margins, scrambling logical sentence order and destroying retrieval relevance.",
        approach:
          "Integrated layout-aware boundary segmentation detecting column gutters before running text flow reconstruction.",
        solution:
          "Achieved 99.4% reading-order reconstruction accuracy across complex technical papers.",
      },
      {
        title: "Eliminating Hallucinated Policy Details",
        problem:
          "When users asked questions about policies not present in the documents, generic models fabricated plausible but incorrect answers.",
        approach:
          "Implemented strict hallucination scoring: answers without direct textual backing in retrieved chunks are rejected with clear missing-material notices.",
        solution:
          "Zero fabricated claims in evaluated test benchmarks; user trust increased substantially.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Tested against comprehensive enterprise technical documentation, proving precise citation tracking and high retrieval recall.",
      metrics: [
        {
          value: "99.2%",
          label: "Citation Precision",
          description: "Accuracy of cited page numbers matching the exact referenced procedure.",
          context: "Zero hallucinated citations",
        },
        {
          value: "840 ms",
          label: "Hybrid Retrieval Latency",
          description: "Time to search across 5,000+ document pages and return top ranked chunks.",
          context: "Qdrant + BM25 reciprocal rank fusion",
        },
        {
          value: "100%",
          label: "Access Control Grounding",
          description: "Enforces strict permissions preventing unauthorized users from accessing privileged documents.",
          context: "Enterprise security audit",
        },
        {
          value: "4.5 hrs",
          label: "Weekly Time Saved",
          description: "Average research time saved per employee querying internal standard operating procedures.",
          context: "Enterprise user study",
        },
      ],
      qualitativeValidation: [
        "Employees praise the split-screen document preview allowing instant visual verification of answers.",
        "Complex technical documentation and SOPs render clearly on both desktop and mobile screens.",
        "System administrators can easily inspect which documents are most frequently queried.",
      ],
    },
    galleryScreens: [
      {
        id: "split-screen",
        title: "Split-Screen Q&A & Document Viewer",
        caption:
          "Side-by-side interface showing the AI answer on the left and the source document on the right.",
        visualType: "smart-course-qa",
      },
      {
        id: "citation-inspector",
        title: "Exact Page Coordinate Highlighting",
        caption:
          "Bounding box overlay highlighting the exact text paragraph extracted from the manual.",
        visualType: "smart-course-qa",
      },
      {
        id: "knowledge-graph",
        title: "Enterprise Knowledge Index",
        caption:
          "Visualizing interconnected document categories and index health telemetry.",
        visualType: "smart-course-qa",
      },
    ],
    nextProjectSlug: "auto-labeling",
    prevProjectSlug: "voice-agent",
  },
  {
    id: "auto-labeling",
    slug: "auto-labeling",
    title: "AutoLabeler Pro",
    tagline: "Automated data labeling at scale.",
    category: "Automation",
    projectType: "Production Engineering Prototype",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#159B50",
    summary:
      "Interactive dataset annotation platform leveraging Segment Anything 2 (SAM2) to accelerate computer vision training dataset preparation by 900% with single-click polygon propagation.",
    techStackFlat: [
      "CV",
      "Python",
      "SAM",
      "Data AI",
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
      "CV",
      "Python",
      "SAM",
      "Data AI",
      "FastAPI",
      "PyTorch",
      "Next.js",
      "WebGL",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Foundation Vision Models",
        items: ["Meta SAM2", "PyTorch GPU Inference", "CUDA Toolkit", "ONNX Runtime"],
      },
      {
        category: "Client Canvas & WebGL",
        items: ["WebGL 2.0", "HTML5 Canvas API", "WebAssembly Tensors", "TypeScript"],
      },
      {
        category: "Backend & Video Processing",
        items: ["FastAPI", "Python 3.11", "OpenCV VideoCapture", "FFmpeg", "Celery Queue"],
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
        visualType: "auto-labeling",
      },
      {
        id: "temporal-propagation",
        title: "Video Mask Timeline & Propagation",
        caption:
          "Timeline scrubber showing automated mask propagation across 150 frames with occlusion keyframes.",
        visualType: "auto-labeling",
      },
      {
        id: "export-modal",
        title: "Dataset Export Configuration",
        caption:
          "Configuring train/val splits and exporting certified YOLOv8 and COCO JSON annotation packages.",
        visualType: "auto-labeling",
      },
    ],
    nextProjectSlug: "finsecure-ml",
    prevProjectSlug: "smart-course-qa",
  },
  {
    id: "finsecure-ml",
    slug: "finsecure-ml",
    title: "FinSecure Real-Time Fraud Engine",
    tagline: "Real-time fraud detection & risk scoring.",
    category: "Data Science",
    projectType: "Production Engineering Prototype",
    status: "Production Ready",
    featured: true,
    published: true,
    accentColor: "#087A3D",
    summary:
      "High-throughput transactional scoring system evaluating credit and debit transfers against evolving fraud patterns in under 12 milliseconds.",
    techStackFlat: [
      "Python",
      "ML",
      "Real-Time",
      "Security",
    ],
    overview:
      "FinSecure protects over $2B in annual transactional volume for fintech platforms and payment gateways. Operating in-line with financial payment switches, the machine learning system evaluates behavioral velocity, device fingerprinting, and relational graph signals to flag fraudulent chargebacks in real time.",
    targetAudience:
      "Fintech startups, digital banks, card issuing networks, and high-volume e-commerce payment processors.",
    heroVisualType: "finsecure-ml",
    repositoryUrl: "https://github.com/Muhammad-Usman55/FinSecure-Fraud-Engine",
    liveDemoUrl: "https://finsecure.deeplayersolutions.com",
    challenge: {
      summary:
        "Rules-based legacy fraud filters blocked too many legitimate high-value customers, causing customer churn, while slow ML pipelines introduced latency that breached card network SLAs.",
      painPoints: [
        "Legacy static rules decline up to 8% of legitimate transactions, damaging merchant revenue.",
        "Batch-oriented fraud detection flags fraudulent transfers hours after funds have cleared.",
        "Card payment networks enforce strict sub-25ms response SLAs; slow models cause transaction timeouts.",
        "Sophisticated fraud rings mutate card-testing patterns across distributed proxies faster than rules can be written.",
      ],
    },
    solution: {
      summary:
        "We architected an ultra-fast in-memory feature store combined with an ONNX-quantized ensemble of XGBoost and Graph Neural Networks that computes multi-factor fraud risk scores in 11.4 milliseconds.",
      keyDecisions: [
        "Compiled gradient boosted decision trees to ONNX Runtime with AVX-512 vectorization for sub-millisecond scoring.",
        "Implemented Redis cluster in-memory sliding window counters to compute customer transaction velocity features in real time.",
        "Integrated dynamic threshold tuning that minimizes false-positive declines during seasonal shopping peaks.",
      ],
    },
    keyFeatures: [
      {
        title: "11.4ms Sub-SLA Inference",
        description:
          "Computes complete fraud risk probability scores in 11.4ms, well within card network transaction windows.",
        iconName: "Zap",
      },
      {
        title: "65% False-Positive Reduction",
        description:
          "Reduces legitimate customer decline rates by 65% compared to legacy boolean rule sets.",
        iconName: "ShieldCheck",
      },
      {
        title: "Real-Time Velocity Aggregation",
        description:
          "Computes sliding window velocity features (amount, IP churn, device switch) in-memory across distributed transactions.",
        iconName: "Activity",
      },
      {
        title: "Relational Graph Ring Detection",
        description:
          "Graph neural network analyzes shared device fingerprints and card numbers to identify organized fraud rings.",
        iconName: "Binary",
      },
    ],
    technologies: [
      "Python",
      "ML",
      "Real-Time",
      "Security",
      "XGBoost",
      "ONNX Runtime",
      "Redis",
      "FastAPI",
      "Docker",
    ],
    technologyGroups: [
      {
        category: "Machine Learning & Graph AI",
        items: ["XGBoost", "ONNX Runtime", "Graph Neural Networks", "Scikit-Learn", "Optuna"],
      },
      {
        category: "High-Throughput Streaming",
        items: ["Python 3.11", "FastAPI", "Apache Kafka", "Redis Cluster", "ClickHouse"],
      },
      {
        category: "Infrastructure & Security",
        items: ["Docker", "Kubernetes", "mTLS Encryption", "Prometheus Metrics", "Grafana"],
      },
      {
        category: "Data Engineering",
        items: ["DuckDB", "PostgreSQL", "Parquet", "PyArrow", "Airflow"],
      },
    ],
    architecture: {
      overview:
        "Payment gateways dispatch transaction authorization events to an in-memory Kafka ingest broker. Worker pods extract streaming velocity features from Redis, pass the feature tensor to an ONNX-quantized XGBoost engine, and emit risk scores back to the payment switch in 11.4 milliseconds.",
      layers: [
        {
          name: "Payment Gateway Ingest",
          role: "Sub-Millisecond Event Ingestion",
          technologies: ["Kafka / Redis Pub/Sub", "Protobuf", "FastAPI"],
          description:
            "Ingests transaction authorization payloads from global payment switches with zero-copy deserialization.",
        },
        {
          name: "Real-Time Feature Store",
          role: "Sliding-Window Aggregations",
          technologies: ["Redis Cluster", "In-Memory Caching", "Lua Scripts"],
          description:
            "Computes customer card velocity, velocity by IP, and device fingerprint risk scores within 2 milliseconds.",
        },
        {
          name: "ONNX Inference Engine",
          role: "Fraud Probability Scoring",
          technologies: ["ONNX Runtime", "XGBoost", "AVX-512 SIMD"],
          description:
            "Evaluates multi-model ensemble generating a calibrated fraud probability score between 0.00 and 1.00.",
        },
        {
          name: "Decision & Audit Layer",
          role: "Rule Override & Reporting",
          technologies: ["PostgreSQL", "ClickHouse", "Grafana"],
          description:
            "Applies merchant-specific threshold decisions (Approve, Review, Decline) and logs telemetry for arbitration.",
        },
      ],
      dataFlow: [
        "1. Cardholder attempts $420 online transaction; payment gateway dispatches authorization event.",
        "2. Ingestion layer decodes JSON/Protobuf payload and queries Redis for card velocity counters.",
        "3. Real-time feature vector assembled (velocity in last 1 hour, geographical distance from previous charge).",
        "4. ONNX Runtime executes quantized model scoring in 8.2 milliseconds.",
        "5. Risk score evaluated against merchant risk thresholds; 'APPROVE' signal returned in 11.4ms.",
        "6. Telemetry logged asynchronously to ClickHouse for continuous retraining.",
      ],
    },
    developmentProcess: [
      {
        step: "01",
        title: "Historical Dataset Mining",
        description:
          "Analyzed 12M anonymized transactions to identify emerging chargeback patterns, card-testing signatures, and device spoofing.",
        deliverables: ["Curated transaction dataset", "Feature correlation matrix"],
      },
      {
        step: "02",
        title: "Feature Engineering & Store",
        description:
          "Engineered 140+ behavioral features including sliding window velocity, geolocation jump velocity, and device mismatch.",
        deliverables: ["Redis velocity feature store", "Real-time aggregation Lua scripts"],
      },
      {
        step: "03",
        title: "Ensemble Training & ONNX Quantization",
        description:
          "Trained XGBoost baseline and compiled to ONNX FP16 runtime with AVX-512 optimizations for sub-millisecond execution.",
        deliverables: ["ONNX model binaries", "Latency & memory benchmark report"],
      },
      {
        step: "04",
        title: "Inline Switch Integration",
        description:
          "Constructed high-throughput async FastAPI worker pipeline integrated with Kafka streaming brokers.",
        deliverables: ["Async scoring service", "Fail-open safety circuit breakers"],
      },
      {
        step: "05",
        title: "Production Load & Stress Testing",
        description:
          "Simulated peak transaction bursts of 4,000 transactions per second to verify latency SLAs under extreme load.",
        deliverables: ["Stress test telemetry logs", "SLA latency compliance audit"],
      },
    ],
    engineeringChallenges: [
      {
        title: "Sub-15ms Round-Trip Card Network SLAs",
        problem:
          "Standard Python machine learning inference taking 45-60ms breached payment processor timeout windows, causing transactions to fail.",
        approach:
          "Compiled model trees to ONNX Runtime C++ execution binaries and pre-computed customer velocity counters into high-performance Redis memory.",
        solution:
          "Cut total end-to-end evaluation latency to 11.4 milliseconds at peak load of 4,000 TPS.",
      },
      {
        title: "Minimizing False-Positive Declines on High-Value Users",
        problem:
          "Overly sensitive fraud models blocked legitimate high-net-worth customers traveling internationally, generating severe merchant backlash.",
        approach:
          "Trained dynamic risk thresholds calibrated against historical customer tenure, verified device tokens, and multi-factor trust scores.",
        solution:
          "Reduced false-positive declines by 65% while capturing 94.2% of actual fraudulent attempts.",
      },
    ],
    resultsAndValidation: {
      summary:
        "Stress-tested against millions of synthetic and historic transactions, validating sub-12ms latency and high detection recall.",
      metrics: [
        {
          value: "11.4 ms",
          label: "End-to-End Scoring Latency",
          description: "Total elapsed time from transaction event arrival to decision response.",
          context: "Sub-15ms card SLA fulfilled",
        },
        {
          value: "65%",
          label: "False-Positive Reduction",
          description: "Fewer legitimate customer card declines compared to rules-based engines.",
          context: "Significantly lowers merchant friction",
        },
        {
          value: "4,000 TPS",
          label: "Peak Transaction Throughput",
          description: "Concurrent transactions scored per second on a single Kubernetes cluster node.",
          context: "High-density scaling",
        },
        {
          value: "94.2%",
          label: "Fraud Detection Recall",
          description: "Percentage of confirmed chargebacks and fraudulent attempts successfully flagged.",
          context: "Production verified benchmark",
        },
      ],
      qualitativeValidation: [
        "Card payment processors praise the sub-12ms response time that eliminates transaction authorization lag.",
        "Sliding window velocity tracking successfully identifies card-testing bots within seconds.",
        "Merchant admin dashboards provide instant transparency into risk score contribution factors.",
      ],
    },
    galleryScreens: [
      {
        id: "scoring-hud",
        title: "Real-Time Transaction Risk Monitor",
        caption:
          "Live stream of transaction authorization requests with millisecond score latency and risk breakdown.",
        visualType: "finsecure-ml",
      },
      {
        id: "velocity-graph",
        title: "Card Velocity & Anomaly Inspector",
        caption:
          "Sliding-window transaction velocity graphs identifying distributed card-testing spikes.",
        visualType: "finsecure-ml",
      },
      {
        id: "merchant-dashboard",
        title: "Merchant Risk Threshold Console",
        caption:
          "Configuring dynamic approval thresholds and inspecting chargeback prevention metrics.",
        visualType: "finsecure-ml",
      },
    ],
    nextProjectSlug: "plant-doctor",
    prevProjectSlug: "auto-labeling",
  },
];
