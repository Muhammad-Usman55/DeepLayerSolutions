import { JobOpeningItem } from "@/types";

export const careerPerks = [
  {
    title: "100% Remote Flexibility",
    description: "Work from anywhere in the world with flexible asynchronous workflows.",
    icon: "Globe",
  },
  {
    title: "Senior AI & Lead Mentorship",
    description: "Direct 1-on-1 collaboration with principal software architects and machine learning researchers.",
    icon: "Brain",
  },
  {
    title: "Real Production Shipments",
    description: "Build code and campaigns deployed for real enterprise clients, not throwaway toy tasks.",
    icon: "Rocket",
  },
  {
    title: "Fast-Track Full-Time Offers",
    description: "Top-performing interns transition directly into full-time associate engineer and lead roles.",
    icon: "Zap",
  },
];

export const jobOpeningsData: JobOpeningItem[] = [
  {
    id: "ai-ml-intern",
    slug: "ai-ml-engineer-intern",
    title: "AI/ML Engineer Intern",
    department: "Engineering & AI",
    type: "Internship",
    location: "Remote (Global / Pakistan)",
    duration: "3 – 6 Months",
    stipend: "Competitive Paid Stipend + Fast-Track Offer",
    iconName: "Brain",
    shortDescription:
      "Work alongside senior AI architects developing computer vision, neural models, LLM fine-tuning, and RAG pipelines.",
    description:
      "We are seeking an enthusiastic, intellectually curious AI/ML Engineer Intern to join our intelligence team. You will participate in developing production-grade AI pipelines, fine-tuning modern foundation models, experimenting with retrieval-augmented generation (RAG), and optimizing low-latency inference on edge and cloud clusters.",
    responsibilities: [
      "Assist in training, evaluating, and quantizing machine learning models using PyTorch, TensorFlow, or ONNX.",
      "Build and test Retrieval-Augmented Generation (RAG) pipelines using vector databases (Qdrant, Pinecone, Chroma).",
      "Process, clean, and vectorize unstructured multimodal datasets (text, image, and tabular data).",
      "Collaborate with senior engineers to deploy models via high-throughput FastAPI and Docker microservices.",
      "Benchmark model accuracy, latency, and token consumption under rigorous test suites.",
    ],
    requirements: [
      "Strong foundational knowledge of Python, NumPy, Pandas, and basic Linear Algebra / Calculus.",
      "Hands-on experience with modern machine learning frameworks (PyTorch, Scikit-Learn, or TensorFlow).",
      "Familiarity with Large Language Models (LLMs), prompt engineering, or Computer Vision concepts.",
      "Good understanding of Git, version control, and collaborative software development.",
      "Enrolled in or graduate of Computer Science, Software Engineering, Data Science, or related STEM field.",
    ],
    preferredQualifications: [
      "Prior exposure to LangChain, LlamaIndex, or Hugging Face Transformers.",
      "Experience with Docker containerization or Linux command line.",
      "Contributions to open-source AI projects or a strong portfolio of personal GitHub projects.",
    ],
    perks: [
      "1-on-1 mentorship from seasoned machine learning leads",
      "Access to high-performance GPU compute clusters",
      "Performance-based stipend with transition to junior role",
      "Official certificate of internship & LinkedIn recommendation",
    ],
    isFeatured: true,
  },
  {
    id: "digital-marketing-intern",
    slug: "digital-marketing-intern",
    title: "Digital Marketing Intern",
    department: "Growth & Marketing",
    type: "Internship",
    location: "Remote (Global / Pakistan)",
    duration: "3 – 6 Months",
    stipend: "Competitive Paid Stipend + Performance Bonus",
    iconName: "TrendingUp",
    shortDescription:
      "Drive DeepLayer's digital brand footprint across LinkedIn, content marketing, tech SEO, and growth experiments.",
    description:
      "DeepLayer Solutions is looking for a proactive Digital Marketing Intern passionate about technology, AI, and modern B2B SaaS growth. You will create engaging content, manage social distribution channels, analyze traffic metrics, and execute digital marketing campaigns that establish DeepLayer Solutions as an authoritative engineering leader.",
    responsibilities: [
      "Draft, schedule, and optimize engaging technical B2B posts for LinkedIn, Twitter/X, and social channels.",
      "Collaborate with engineering leads to convert complex technical case studies into digestible blog posts and infographics.",
      "Perform keyword research and on-page SEO optimization to improve organic search visibility.",
      "Assist in running growth experiments across email newsletters and digital advertising channels.",
      "Monitor engagement metrics (impressions, CTR, conversions) using Google Analytics and LinkedIn Campaign Manager.",
    ],
    requirements: [
      "Excellent written English communication skills with an eye for clear, persuasive storytelling.",
      "Familiarity with social media platforms (especially LinkedIn and X/Twitter) and B2B marketing concepts.",
      "Basic understanding of SEO principles, keywords, and content management systems.",
      "Creative mindset with basic design skills (Canva, Figma, or Adobe Photoshop/Illustrator is a plus).",
      "Enrolled in or graduate of Marketing, Communications, Business Administration, or related disciplines.",
    ],
    preferredQualifications: [
      "Experience writing about technology, artificial intelligence, or software engineering.",
      "Understanding of email marketing tools, newsletter platforms, and community building.",
      "Strong aesthetic sensibility and attention to typography and layout.",
    ],
    perks: [
      "Hands-on experience growing an international B2B tech brand",
      "Direct guidance from growth leaders and founders",
      "Paid stipend with performance bonuses for milestone targets",
      "Flexible remote schedule and verified recommendation letter",
    ],
    isFeatured: true,
  },
  {
    id: "leads-intern",
    slug: "leads-intern",
    title: "Lead Generation & Business Development Intern",
    department: "Business & Sales",
    type: "Internship",
    location: "Remote (Global / Pakistan)",
    duration: "3 – 6 Months",
    stipend: "Competitive Paid Stipend + Commission Per Qualified Lead",
    iconName: "Target",
    shortDescription:
      "Identify high-value enterprise prospects, execute outbound B2B campaigns, and build our international sales pipeline.",
    description:
      "We are looking for a detail-oriented, energetic Lead Generation & Business Development Intern to power our outbound client acquisition engine. You will research prospective global clients (startups, scale-ups, and enterprises), build curated prospect databases, and draft hyper-personalized outreach that connects DeepLayer with global technology decision-makers.",
    responsibilities: [
      "Research and identify prospective target companies across North America, Europe, the Middle East, and APAC.",
      "Find verified contact details of key decision-makers (CTOs, VPs of Engineering, Product Leads, CEOs) using tools like LinkedIn Sales Navigator, Apollo, and Hunter.",
      "Craft tailored, personalized cold outreach emails and LinkedIn connection messages that spark interest.",
      "Qualify inbound and outbound leads against our target client criteria and schedule discovery meetings.",
      "Maintain, organize, and update customer pipelines and notes in the company CRM.",
    ],
    requirements: [
      "Strong verbal and written English communication skills with professional business etiquette.",
      "Self-driven, persistent, and organized with great attention to detail.",
      "Basic understanding of software development, web technologies, and AI terminology.",
      "Comfortable with internet research, spreadsheets (Excel / Google Sheets), and digital workflows.",
      "Enrolled in or graduate of Business, Economics, Marketing, International Relations, or related fields.",
    ],
    preferredQualifications: [
      "Prior exposure to LinkedIn Sales Navigator, Apollo.io, or HubSpot/Close CRM.",
      "Experience in B2B cold emailing or freelance client acquisition.",
      "Enthusiasm for software agency dynamics and client relations.",
    ],
    perks: [
      "Generous base stipend plus lucrative commissions on closed accounts",
      "Real-world masterclass in modern international B2B sales engines",
      "Direct access to agency founders and deal negotiation sessions",
      "Flexible remote hours and long-term full-time sales executive trajectory",
    ],
    isFeatured: true,
  },
  {
    id: "fullstack-engineer-intern",
    slug: "fullstack-software-engineer-intern",
    title: "Full-Stack Software Engineer Intern",
    department: "Engineering & AI",
    type: "Internship",
    location: "Remote (Global / Pakistan)",
    duration: "3 – 6 Months",
    stipend: "Competitive Paid Stipend + Transition to Junior Engineer",
    iconName: "Code2",
    shortDescription:
      "Build modern web applications, high-performance APIs, and interactive user interfaces using Next.js, TypeScript, and Python.",
    description:
      "Join our core engineering squad as a Full-Stack Software Engineer Intern. You will contribute to production client portals, SaaS platforms, and internal AI-driven tools. You'll gain hands-on experience across the entire software stack—from pixel-perfect responsive UI interfaces to resilient backend microservices and databases.",
    responsibilities: [
      "Develop responsive, accessible UI components using React, Next.js, TypeScript, and Tailwind CSS.",
      "Build and test RESTful and GraphQL API endpoints using Node.js, FastAPI, or Express.",
      "Write clean, modular code with automated unit and integration tests.",
      "Integrate SQL and NoSQL database layers (PostgreSQL, MongoDB, Supabase, Redis).",
      "Participate in weekly sprint planning, agile standups, and rigorous pull-request code reviews.",
    ],
    requirements: [
      "Solid understanding of JavaScript/TypeScript, React fundamentals, HTML5, and CSS/Tailwind.",
      "Basic backend knowledge in Python (FastAPI/Django) or Node.js.",
      "Understanding of relational databases (PostgreSQL/MySQL) and basic SQL queries.",
      "Proficiency with Git, GitHub branches, and pull requests.",
      "Enrolled in or graduate of Computer Science, Software Engineering, or related technical disciplines.",
    ],
    preferredQualifications: [
      "Experience with Next.js 14/15 App Router, React Server Components, or Framer Motion.",
      "Familiarity with REST APIs, authentication protocols (JWT, OAuth), or Docker.",
      "A published live web project or active GitHub repository showcasing clean code.",
    ],
    perks: [
      "Work directly with senior full-stack architects and code reviewers",
      "Ship code to real production environments within your first two weeks",
      "Competitive paid stipend with fast-track junior software engineer offer",
      "Official certificate of completion & professional career mentoring",
    ],
    isFeatured: false,
  },
];

