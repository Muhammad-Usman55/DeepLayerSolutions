export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "AI & Tech" | "Process & Timeline" | "Security & IP";
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "AI & Tech",
    question: "What core technologies and AI capabilities does DeepLayer Solutions specialize in?",
    answer:
      "We engineer enterprise-grade digital systems across two core pillars: Full-Stack Modern Software (Next.js, React, TypeScript, Python, FastAPI, Django, Node.js, PostgreSQL) and Applied Artificial Intelligence (custom LLM architectures, RAG systems, LangChain, Computer Vision with YOLO & OpenCV, and edge-inference automation). Every solution is built for high concurrency and scalable cloud deployments.",
  },
  {
    id: "faq-2",
    category: "Process & Timeline",
    question: "How does your engineering onboarding and development workflow operate?",
    answer:
      "We follow a disciplined 4-phase agile cycle: (1) Architecture Blueprint & Technical Scoping, (2) Bi-weekly iterative sprint execution with staging previews, (3) Automated unit/integration testing with rigorous edge-case verification, and (4) Production zero-downtime deployment. You receive direct communication via Slack/WhatsApp with senior engineers and transparent GitHub progress tracking.",
  },
  {
    id: "faq-3",
    category: "Security & IP",
    question: "Who retains ownership of the source code, data, and intellectual property (IP)?",
    answer:
      "You own 100% of all intellectual property, source code, neural network weights, database schemas, and digital assets. Before any project kickoff or technical discovery, we sign a comprehensive mutual Non-Disclosure Agreement (NDA) ensuring full legal and confidentiality protection.",
  },
  {
    id: "faq-4",
    category: "AI & Tech",
    question: "Can you integrate intelligent AI features into our existing legacy systems?",
    answer:
      "Yes. A significant portion of our work involves building intelligent AI middleware, vector indexing pipelines (Qdrant, Pinecone, pgvector), and custom REST/gRPC microservices that augment legacy enterprise systems, CRM, or ERP software without requiring expensive full-system rewrites.",
  },
  {
    id: "faq-5",
    category: "Process & Timeline",
    question: "What are your typical project timelines and engagement models?",
    answer:
      "Depending on technical scope, focused MVPs typically launch within 3 to 6 weeks, while large-scale enterprise platforms span 8 to 16 weeks. We support both Fixed-Scope Milestone contracts (for well-defined deliverables) and Dedicated Senior Engineering Pods (for continuous product innovation and scaling).",
  },
  {
    id: "faq-6",
    category: "Security & IP",
    question: "How do you guarantee enterprise data privacy and model compliance?",
    answer:
      "We design all AI workflows with zero-data-retention parameters, enterprise VPC isolation, TLS 1.3 encryption in transit, and AES-256 encryption at rest. For sensitive enterprise workflows, we deploy self-hosted open-weights models (e.g. Llama 3, Mistral) on private VPC instances so proprietary data never touches public third-party APIs.",
  },
];

