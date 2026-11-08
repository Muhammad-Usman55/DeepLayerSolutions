# DeepLayer Solutions — Enterprise Agency Website

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.9-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Production-grade, high-performance web platform for **DeepLayer Solutions**, an elite software engineering and artificial intelligence agency. Built for velocity, enterprise scale, and immersive visual storytelling.

Featuring a signature light green and obsidian color system, oversized modern typography, glassmorphism, interactive 3D visual models, and dual-direction continuous infinite marquee animations.

---

## 🌐 Live & Official Channels

- **Website:** [deeplayersolutions.com](https://deeplayersolutions.com)
- **GitHub Repository:** [Muhammad-Usman55/DeepLayerSolutions](https://github.com/Muhammad-Usman55/DeepLayerSolutions)
- **LinkedIn:** [DeepLayer Solutions on LinkedIn](https://www.linkedin.com/company/deeplayersolutions/)
- **Facebook:** [DeepLayer Solutions on Facebook](https://www.facebook.com/people/DeepLayer-Solutions/61596345801437/)
- **WhatsApp:** [+92 316 6007316](https://wa.me/923166007316)
- **Direct Email:** [deeplayersolutions@gmail.com](mailto:deeplayersolutions@gmail.com)
- **Headquarters:** Lahore, Pakistan

---

## 🎨 Brand Identity & Design System

DeepLayer Solutions uses a custom-engineered **Emerald / Obsidian** design language:

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Primary Emerald** | `#008F53` / `#087A3D` | Key brand actions, badges, active tabs, and highlights |
| **Deep Forest** | `#075C32` | Darker hover states and high-contrast borders |
| **Vibrant Mint** | `#159B50` / `#00B86B` | Glow pulses, active status dots, and live accents |
| **Soft Mint Surface** | `#E9FFF2` / `#E8F5E9` | Icon pedestals, badge backdrops, and chips |
| **Ambient Background** | `#FAFCF9` | Clean, glare-free main background |
| **Subtle Card Surface** | `#FFFFFF` | Elevated cards with glassmorphic border styling |
| **Primary Heading Text** | `#142A27` / `#101C19` | Deep obsidian green for high legibility |
| **Secondary Body Text** | `#64736F` / `#65736D` | Neutral balanced slate-green for descriptions |
| **Structural Border** | `#DFEDE5` / `#E3EDE5` | Refined hairline card borders and dividers |
| **Accent Glow** | `#34D399` | Radial ambient backdrops and hover rings |

---

## ⚡ Technology Stack

### Core Framework & Architecture
- **Next.js 16.4.5 (App Router & Turbopack):** Server Components, dynamic streaming with Partial Prerendering (PPR), and static route optimization.
- **React 19.3.0:** Modern React runtime with enhanced hooks and hydration performance.
- **TypeScript 5.8:** End-to-end type safety covering services, case studies, industries, careers, and API payloads.
- **Tailwind CSS v4 (`@tailwindcss/turbopack`):** Next-generation CSS engine featuring instant rebuilds and custom design tokens.

### Animation & Interaction
- **Dual-Row Infinite Marquee:** Pure CSS `@keyframes` with 3D transform acceleration (`translate3d`), sub-pixel precision, zero-gap mirrored grouping, hover pause, and responsive edge gradient masks.
- **Framer Motion 14.9.1:** Physics-based spring reveals, stagger transitions, and interactive accordions.
- **Lucide React 1.68.0:** Clean, unified SVG iconography across all cards and UI components.
- **Branded Preloader:** 0.5s lightweight animated SVG loader (`deeplayer-animated-loader.svg`) for smooth initial page entry.

### Backend Handlers & API
- **Route Handlers (`src/app/api/`):** Serverless endpoints with in-memory IP rate-limiting, server-side payload validation, and HTML sanitization:
  - `/api/contact` — Project inquiry and discovery booking handler.
  - `/api/careers` — Internship and job application pipeline handler.
  - `/api/newsletter` — Tech newsletter subscription handler.

---

## 📂 Project Structure

```
DeepLayer Solutions/
├── public/
│   ├── logo/
│   │   ├── logo.png                     # Official 800x800 transparent logo mark
│   │   └── logo-cropped.png             # Edge-trimmed logo for navigation bar
│   ├── deeplayer-animated-loader.svg    # 0.5s branded 3D preloader animation
│   ├── koeRHQn0tk.svg                   # Hero section neural network illustration
│   ├── robots.txt                       # Crawler access rules
│   └── sitemap.xml                      # Generated dynamic XML sitemap
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Global layout (Navbar, Footer, Preloader, Fonts)
│   │   ├── page.tsx                     # Agency Homepage
│   │   ├── globals.css                  # Custom tokens, keyframes, scrollbars, utility classes
│   │   ├── about/
│   │   │   └── page.tsx                 # Mission, values, leadership & agency narrative
│   │   ├── services/
│   │   │   ├── page.tsx                 # 9-Service filterable catalog
│   │   │   └── [slug]/page.tsx          # Dynamic deep-dive route for each service
│   │   ├── industries/
│   │   │   └── page.tsx                 # 8 Industry-specific technical blueprints
│   │   ├── portfolio/
│   │   │   ├── page.tsx                 # Interactive portfolio with case-study modals
│   │   │   └── [slug]/page.tsx          # Dedicated case study deep-dives
│   │   ├── careers/
│   │   │   └── page.tsx                 # Remote internship openings & culture
│   │   ├── blog/
│   │   │   ├── page.tsx                 # Technical blog with real-time search & filter
│   │   │   └── [slug]/page.tsx          # Full-length technical articles
│   │   ├── contact/
│   │   │   └── page.tsx                 # Contact form, direct WhatsApp & credentials
│   │   ├── privacy/page.tsx             # Privacy Policy
│   │   ├── terms/page.tsx               # Terms of Service
│   │   ├── not-found.tsx                # Custom branded 404 page
│   │   └── api/
│   │       ├── contact/route.ts         # Contact submission handler
│   │       ├── careers/route.ts         # Career application handler
│   │       └── newsletter/route.ts      # Newsletter subscription handler
│   ├── components/
│   │   ├── common/                      # Reusable atoms (Button, Container, SectionHeading, Preloader)
│   │   ├── layout/                      # Navbar, Footer, MobileMenu, Logo, PageWrapper
│   │   ├── home/                        # HeroSection, ServicesPreview, WhyChooseUs, StatsStrip,
│   │   │                                # ShowcaseProjects, IndustriesPreview, ProcessTimeline,
│   │   │                                # TechEcosystem (Dual Marquee), FAQSection
│   │   ├── services/                    # Service cards, deliverables grid, process steps
│   │   ├── portfolio/                   # Project cards, tech pills, case study modal
│   │   ├── careers/                     # CareersHeroVisual, CareersContent, application modals
│   │   ├── blog/                        # Blog cards, reading progress, share buttons
│   │   └── contact/                     # Interactive inquiry form with validation
│   ├── config/
│   │   └── site.ts                      # Centralized metadata, stats, links & contact info
│   ├── data/
│   │   ├── services.ts                  # 9 Production-grade services with complete specs
│   │   ├── industries.ts                # 8 Tailored domain solutions
│   │   ├── projects.ts                  # Real-world engineering case studies
│   │   ├── careers.ts                   # 4 Remote internship positions and perks
│   │   ├── blog.ts                      # Technical AI and web development articles
│   │   └── testimonials.ts              # Client endorsements and ratings
│   ├── lib/
│   │   └── utils.ts                     # Class name merger (`clsx` + `tailwind-merge`)
│   └── types/
│       └── index.ts                     # TypeScript definitions across the platform
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗺️ Route Directory (43 Compiled Routes)

| Route | Type | Description |
| :--- | :--- | :--- |
| `/` | `Static` | Agency homepage with Hero 3D, Services Preview, Stats Strip, Case Studies, Dual Tech Marquee & FAQs |
| `/services` | `Static` | Filterable catalog covering all 9 technical practices |
| `/services/[slug]` | `Partial Prerender` | 9 Dynamic deep-dive pages (AI/ML, Generative AI, Custom Software, Web Dev, Data Eng, Cloud/DevOps, Mobile Apps, IT Consulting, SEO) |
| `/industries` | `Static` | Sector blueprints (Healthcare, FinTech, EdTech, Retail, IoT, PropTech, Logistics, LegalTech) |
| `/portfolio` | `Static` | Interactive showcase with category filtering and interactive modal |
| `/portfolio/[slug]` | `Partial Prerender` | In-depth case studies (Plant Doctor AI, TravelMate AI, and more) |
| `/careers` | `Static` | Remote internship portal (AI/ML, Digital Marketing, B2B Lead Gen, Full-Stack) |
| `/about` | `Static` | Agency narrative, architectural philosophy, mission, vision, and core values |
| `/blog` | `Static` | Searchable technical articles with category filter and reading estimates |
| `/blog/[slug]` | `Partial Prerender` | Full-length articles with syntax highlighting, takeaways, and related reading |
| `/contact` | `Static` | Interactive discovery form, direct WhatsApp link, email, and office details |
| `/privacy` | `Static` | Data protection and governance policy |
| `/terms` | `Static` | Commercial engagement terms and warranty standards |
| `/not-found` | `Static` | Branded 404 recovery page |
| `/sitemap.xml` | `Dynamic` | Automated XML search engine index |
| `/robots.txt` | `Dynamic` | Search crawler directives |
| `/api/contact` | `API Endpoint` | POST endpoint with rate-limiting and validation |
| `/api/careers` | `API Endpoint` | POST endpoint for applicant resume and profile submission |
| `/api/newsletter` | `API Endpoint` | POST endpoint for newsletter subscriptions |

---

## 🚀 Key Homepage Features

1. **Hero Section:** High-impact agency proposition with 3D neural network illustration, dual CTA triggers, and social proof metrics.
2. **Services Preview:** Interactive showcase displaying core capabilities with an animated 3D visual and responsive multi-column cards.
3. **Why Choose Us:** Metric-backed agency differentiators with tactile glassmorphism.
4. **Stats Strip:** Live company milestones:
   - **26+** Projects Delivered
   - **9+** Happy Clients Worldwide
   - **18+** Client Satisfaction Score
   - **2+** Years of Specialized AI & Engineering Experience
5. **Showcase Projects:** Featured case studies highlighting real production ROI and technological architecture.
6. **Industries Grid:** Domain-specific technological capabilities across 8 high-growth sectors.
7. **Development Approach (Process Timeline):** 5-step delivery methodology from Discovery & Architecture to Deployment & Telemetry.
8. **Battle-Tested Technology Ecosystem (Dual Marquee):**
   - **Row 1:** Python, PyTorch, TensorFlow, OpenCV, Next.js, TypeScript, LangGraph, Google Gemini $\to$ scrolls **Right to Left** (`52s`).
   - **Row 2:** FastAPI, Django, Docker, Kubernetes, PostgreSQL, Redis, Qdrant, AWS Cloud $\to$ scrolls **Left to Right** (`46s`).
   - Features **instant hover pause**, seamless 0px loop reset, and bilateral optical edge dissolves.
9. **Interactive FAQ Section:** Expandable accordion addressing client concerns regarding security, timeline, pricing, and IP ownership.
10. **High-Conversion CTA Banner:** Visual emerald ribbon with direct links to booking discovery calls.

---

## 💼 Core Service Capabilities

1. **Artificial Intelligence & Machine Learning:** Custom deep learning models, predictive neural networks, computer vision, and low-latency inference pipelines.
2. **Generative AI & LLM Solutions:** Autonomous multi-agent systems (LangGraph), domain-specific RAG pipelines (Qdrant), fine-tuning, and enterprise guardrails.
3. **Custom Software Development:** High-concurrency backend architectures, resilient microservices, and distributed business systems.
4. **Web & Application Development:** Enterprise Next.js applications, responsive design systems, headless architectures, and sub-second Lighthouse scores.
5. **Data Engineering & Analytics:** High-volume ETL/ELT pipelines, real-time data streaming, lakehouse modeling, and executive BI dashboards.
6. **Cloud Solutions & DevOps:** Infrastructure as Code (Terraform), Kubernetes orchestration, automated CI/CD pipelines, and zero-trust cloud security on AWS/GCP.
7. **Mobile Application Development:** Cross-platform native apps (React Native / Flutter) with offline-first synchronization and fluid 60 FPS interfaces.
8. **IT Consulting & Digital Transformation:** Legacy modernization, technical due diligence, software architecture audits, and CTO-as-a-Service advisory.
9. **Search Engine Optimization (SEO):** Deep technical crawl audits, semantic entity mapping, automated structured data (JSON-LD), and programmatic rank scaling.

---

## 🎓 Remote Careers & Internships

DeepLayer Solutions runs a remote engineering internship program with transition paths to full-time roles:

- **AI/ML Engineer Intern:** PyTorch, RAG vector pipelines, FastAPI microservices, and GPU compute clusters.
- **Full-Stack Software Engineer Intern:** Next.js, React 19, TypeScript, Tailwind CSS, Node.js, and PostgreSQL.
- **Digital Marketing Intern:** Technical content marketing, B2B brand storytelling, LinkedIn outreach, and SEO analytics.
- **Lead Generation & Business Development Intern:** Global B2B client acquisition, prospect qualification, and CRM pipeline management.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js `20.x` or higher
- npm `10.x` or higher (or pnpm / yarn)

### 1. Clone the Repository
```bash
git clone https://github.com/Muhammad-Usman55/DeepLayerSolutions.git
cd DeepLayerSolutions
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The site updates automatically with Turbopack Fast Refresh.

### 4. Code Quality & Type Check
```bash
npx tsc --noEmit
npm run lint
```

### 5. Production Build & Static Export Verification
```bash
npm run build
npm start
```

---

## 🔒 Security & Performance Standards

- **Zero-Dependency Core Animation:** The dual-row tech stack marquee uses pure CSS keyframes with `translate3d` hardware acceleration, bypassing OS-level reduced motion animation freezes without external script overhead.
- **Serverless Rate Limiting:** All API routes enforce in-memory IP rate-limiting (`MAX_REQUESTS_PER_WINDOW = 5` per 15-minute window) to prevent spam and DDoS attacks.
- **Input Sanitization:** Contact and application endpoints strip dangerous script payloads and HTML tags to prevent XSS.
- **Asset Optimization:** WebP/AVIF images with Next.js Image component, pre-calculated responsive layout bounds, and optimized SVGs.
- **SEO & Social Graph:** Complete OpenGraph (`og:image`), Twitter Cards, structured schema, canonical URL management, and dynamic `sitemap.xml`.

---

## 📄 License & Attribution

Copyright © 2026 **DeepLayer Solutions**. All rights reserved.  
Unauthorized duplication, distribution, or commercial reuse of proprietary branding, visual models, or architectural assets is strictly prohibited.
