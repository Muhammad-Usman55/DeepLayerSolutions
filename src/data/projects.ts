import { ProjectItem } from "@/types";

export const projectsData: ProjectItem[] = [
  {
    id: "plant-doctor",
    slug: "plant-doctor",
    title: "Plant Doctor",
    tagline: "AI Plant Disease Detection & Crop Health Analytics",
    category: "AI & ML",
    featured: true,
    accentColor: "#159B50",
    summary:
      "A deep learning computer vision mobile and web application that diagnoses crop foliage diseases in real time from field photographs.",
    overview:
      "Plant Doctor was engineered to empower agronomists and farmers with instant disease classification and treatment recommendations right in the field. Using an optimized convolutional neural network trained on over 80,000 leaf condition images, the system identifies 38 distinct plant diseases with high accuracy.",
    challenge:
      "Early crop disease detection in remote agricultural fields is often impossible due to lack of on-site plant pathologists, leading to devastating yield losses. Additionally, field connectivity is frequently poor or intermittent.",
    solution:
      "We engineered a dual-engine architecture: a lightweight quantized MobileNetV3 model running locally on-device for offline field triage, and an enterprise cloud API utilizing an ensemble of EfficientNet and Vision Transformers for deep anomaly analysis and fungicide dosage calculation.",
    keyFeatures: [
      "Offline-first mobile leaf scanning with 96.4% diagnostic accuracy across 38 crop types.",
      "Automated localized pesticide and organic treatment recommendations.",
      "Geospatial disease heatmaps alerting neighboring farms to spreading pathogen clusters.",
      "Multi-lingual audio readouts for field laborers in rural areas.",
    ],
    technologies: [
      "PyTorch",
      "OpenCV",
      "TensorFlow Lite",
      "FastAPI",
      "Next.js",
      "Tailwind CSS",
      "Docker",
    ],
  },
  {
    id: "travelmate-ai",
    slug: "travelmate-ai",
    title: "TravelMate AI",
    tagline: "Autonomous Multi-Agent Travel Planning & Booking Assistant",
    category: "AI & ML",
    featured: true,
    accentColor: "#087A3D",
    summary:
      "An intelligent conversational travel companion that orchestrates personalized multi-day itineraries, flight reservations, and local experiences.",
    overview:
      "TravelMate AI replaces hours of fragmented browser tab research with an autonomous conversational agent. Built on top of fine-tuned language models and real-time travel APIs, the agent plans balanced schedules, balances budgets, and dynamically adjusts itineraries when flights are delayed or weather shifts.",
    challenge:
      "Travelers typically visit over 30 websites to plan complex international vacations, and generic AI chatbots often hallucinate unavailable flights, non-existent hotels, or impossible transit schedules.",
    solution:
      "We implemented a verified LangGraph multi-agent architecture with strict tool constraints. One agent checks verified live flight and hotel availability via GDS APIs, while another specializes in geospatial route optimization and local culinary curation.",
    keyFeatures: [
      "Dynamic day-by-day itinerary generation with interactive map waypoints.",
      "Real-time flight and hotel price tracking with predictive booking windows.",
      "Autonomous schedule re-routing during transit delays or weather anomalies.",
      "Collaborative group trip boards with instant split-bill estimation.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "LangGraph",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
    ],
  },
  {
    id: "gender-detection",
    slug: "gender-detection",
    title: "VisionSense Demographic Analytics",
    tagline: "YOLO + ResNet50 High-Speed Edge Computer Vision",
    category: "AI & ML",
    featured: true,
    accentColor: "#059669",
    summary:
      "Privacy-first edge computer vision system for foot-traffic demographic analytics in commercial retail environments.",
    overview:
      "VisionSense performs real-time face detection, anonymized demographic classification (age brackets and gender estimation), and dwell-time calculation from standard surveillance camera feeds. Designed with privacy-by-design principles, all frame analysis occurs purely in memory at the edge, outputting only numerical metadata.",
    challenge:
      "Retailers lacked accurate demographic footfall data to optimize store layouts and merchandising. Standard cloud video streaming was cost-prohibitive, bandwidth-heavy, and raised significant customer privacy issues.",
    solution:
      "We engineered a pipeline utilizing YOLOv8 for face and person localization, combined with an optimized ResNet50 multi-task classification head running on low-power NVIDIA Jetson edge devices, discarding all video frames immediately upon inference.",
    keyFeatures: [
      "45+ FPS inference performance on edge hardware without cloud streaming.",
      "100% privacy-preserving architecture: zero biometric facial templates stored.",
      "Store heatmaps correlating customer dwell times with product aisle categories.",
      "Real-time occupancy tracking with automated capacity threshold alerts.",
    ],
    technologies: [
      "YOLOv8",
      "ResNet50",
      "PyTorch",
      "NVIDIA TensorRT",
      "C++",
      "Python",
      "MQTT",
      "Grafana",
    ],
  },
  {
    id: "voice-agent",
    slug: "voice-agent",
    title: "DeepVoice Enterprise Agent",
    tagline: "Ultra-Low Latency Conversational Voice AI Platform",
    category: "AI & ML",
    featured: true,
    accentColor: "#10B981",
    summary:
      "Real-time voice assistant engine with sub-500ms response latency, expressive neural speech synthesis, and telephony integration.",
    overview:
      "DeepVoice transforms customer support telephony with an intelligent conversational voice agent capable of natural interruptions, emotion detection, and seamless CRM data lookups. It handles high-concurrency call centers with human-like prosody and accurate domain terminology understanding.",
    challenge:
      "Traditional interactive voice response (IVR) phone trees frustrate callers, while standard speech-to-text -> LLM -> text-to-speech pipelines produce jarring 2-3 second delays that make natural conversation awkward.",
    solution:
      "We engineered a streaming bidirectional audio pipeline utilizing WebSocket audio frames, streaming Whisper transcription, continuous token streaming from speculative LLM decoders, and low-latency neural vocoders to achieve sub-450ms end-to-end voice latency.",
    keyFeatures: [
      "Sub-450ms voice-to-voice response latency enabling smooth natural turn-taking.",
      "Intelligent interruption handling (barge-in) when the user speaks mid-sentence.",
      "Direct SIP trunk and Twilio integration for drop-in contact center deployment.",
      "Automated post-call CRM logging with structured summaries and sentiment ratings.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "WebSockets",
      "Whisper",
      "ElevenLabs",
      "WebRTC",
      "Redis",
      "Docker",
    ],
  },
  {
    id: "smart-qa",
    slug: "smart-qa",
    title: "Smart Enterprise Q&A",
    tagline: "RAG + Gemini Powered Knowledge Intelligence System",
    category: "AI & ML",
    featured: true,
    accentColor: "#075C32",
    summary:
      "Enterprise document intelligence engine that indexes millions of pages of technical documentation, legal contracts, and internal SOPs.",
    overview:
      "Smart Enterprise Q&A solves the enterprise search dilemma by allowing employees to query massive corpora of proprietary knowledge in plain natural language. The system cites exact page numbers, highlights source excerpts, and cross-references verified internal repositories.",
    challenge:
      "Enterprise teams wasted an average of 4.5 hours per week searching through disconnected SharePoint drives, PDF manuals, and Confluence spaces, frequently relying on outdated versions of critical procedures.",
    solution:
      "We built a high-recall RAG architecture combining semantic vector search with BM25 keyword matching, evaluated against Google Gemini Flash and Pro for reasoning and structured JSON output with precise citation guarantees.",
    keyFeatures: [
      "Multi-format ingestion: PDFs, DOCX, scanned image OCR, spreadsheets, and wikis.",
      "Precise source citation linking directly to the highlighted source paragraph.",
      "Strict enterprise access controls mirroring existing Active Directory / LDAP groups.",
      "Continuous hallucination scoring evaluating answer faithfulness against retrieved chunks.",
    ],
    technologies: [
      "Google Gemini 1.5",
      "LlamaIndex",
      "Qdrant Vector DB",
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
    ],
  },
  {
    id: "auto-labeling",
    slug: "auto-labeling",
    title: "AutoLabeler Pro",
    tagline: "SAM2 Integration for 10x Computer Vision Annotation Velocity",
    category: "Automation",
    featured: true,
    accentColor: "#159B50",
    summary:
      "Interactive dataset annotation platform leveraging Segment Anything 2 (SAM2) to accelerate training dataset preparation by 900%.",
    overview:
      "AutoLabeler Pro bridges the most expensive bottleneck in computer vision: manual pixel-level segmentation. By embedding foundation segmentation models into an ergonomic browser interface, annotators click a single point and obtain instant, boundary-precise polygon masks across whole video sequences.",
    challenge:
      "Manual polygon annotation of high-resolution video frames required up to 15 minutes per single frame for complex autonomous vehicle and medical datasets, driving data preparation costs through the roof.",
    solution:
      "We integrated Meta's SAM2 model with optimized WebAssembly rendering in the browser, enabling single-click object tracking and mask propagation across hundreds of consecutive video frames in seconds.",
    keyFeatures: [
      "Single-click semantic polygon mask generation with edge refinement brushes.",
      "Multi-frame temporal tracking maintaining object identity across occlusions.",
      "Export formats for YOLO, COCO, Pascal VOC, and mask binary tensors.",
      "Collaborative QA review queues with disagreement resolution metrics.",
    ],
    technologies: [
      "SAM2",
      "WebAssembly",
      "WebGL",
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "Docker",
    ],
  },
  {
    id: "finsecure-ml",
    slug: "finsecure-ml",
    title: "FinSecure Real-Time Fraud Engine",
    tagline: "Sub-Millisecond Financial Anomaly & Transaction Scoring",
    category: "Data Science",
    featured: false,
    accentColor: "#087A3D",
    summary:
      "High-throughput transactional scoring system evaluating credit and debit transfers against evolving fraud patterns in under 12 milliseconds.",
    overview:
      "FinSecure protects over \$2B in annual transactional volume for fintech startups. Operating in-line with payment gateways, the machine learning system evaluates behavioral velocity, device fingerprinting, and relational graph signals to flag fraudulent chargebacks before clearing.",
    challenge:
      "Rules-based legacy fraud filters blocked too many legitimate high-value customers, while slow ML pipelines introduced latency that breached card network SLAs.",
    solution:
      "We architected an ultra-fast feature store using Redis and DuckDB, paired with an ONNX-quantized XGBoost and Graph Neural Network model that computes fraud probabilities in 11.4 milliseconds.",
    keyFeatures: [
      "12ms end-to-end inference latency on peak loads of 4,000 transactions per second.",
      "65% reduction in false-positive declines compared to legacy rule engines.",
      "Real-time graph analysis identifying distributed card-testing rings.",
      "Automated compliance documentation for disputed transaction arbitration.",
    ],
    technologies: [
      "Python",
      "XGBoost",
      "ONNX Runtime",
      "Apache Kafka",
      "Redis",
      "ClickHouse",
      "Docker",
    ],
  },
  {
    id: "cloudsync-platform",
    slug: "cloudsync-platform",
    title: "CloudSync Distributed Asset Engine",
    tagline: "Scalable Multi-Region Asset Synchronization Platform",
    category: "Web Apps",
    featured: false,
    accentColor: "#059669",
    summary:
      "High-concurrency digital asset distribution platform synchronizing terabytes of media across multi-region edge caches.",
    overview:
      "CloudSync serves creative agencies and media studios who manage vast video and 3D asset libraries. The platform provides real-time chunked uploads, instant browser-based 4K proxy generation, and automated distributed delivery to global team members.",
    challenge:
      "Large media files caused upload timeouts, regional download bottlenecks, and storage sprawl across disorganized Google Drive and Dropbox instances.",
    solution:
      "We engineered a direct-to-S3 multi-part parallel upload engine with edge proxy transcoder workers and a modern Next.js management dashboard.",
    keyFeatures: [
      "Multi-part parallel uploads with automatic pause/resume on network drops.",
      "Automated serverless transcoding into HLS and thumbnail web formats.",
      "Granular team permissioning and expiring time-stamped client review links.",
      "Global CDN edge caching reducing media download latencies by 70%.",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "AWS S3 & CloudFront",
      "Go",
      "PostgreSQL",
      "Tailwind CSS",
    ],
  },
];

