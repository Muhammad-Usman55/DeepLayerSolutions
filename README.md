# DeepLayer Solutions — Enterprise Agency Web Platform & Admin CMS

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Gmail_API-EA4335?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.9-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Production-grade, high-performance web platform and centralized management system for **DeepLayer Solutions**, an elite software engineering, artificial intelligence, and business automation agency.

Engineered with Next.js App Router, Turbopack, Lenis smooth scrolling, Embla horizontal carousels, Google Cloud Gmail API communications, Supabase PostgreSQL with strict Row Level Security (RLS), and a comprehensive enterprise Admin Dashboard & CMS.

---

## 🌐 Official Channels & Direct Contacts

- **Production Website:** [deeplayersolutions.vercel.app](https://deeplayersolutions.vercel.app)
- **GitHub Repository:** [Muhammad-Usman55/DeepLayerSolutions](https://github.com/Muhammad-Usman55/DeepLayerSolutions)
- **LinkedIn:** [DeepLayer Solutions on LinkedIn](https://www.linkedin.com/company/deeplayersolutions/)
- **Facebook:** [DeepLayer Solutions on Facebook](https://www.facebook.com/people/DeepLayer-Solutions/61596345801437/)
- **WhatsApp:** [+92 316 6007316](https://wa.me/923166007316)
- **Direct Inquiries:** [deeplayersolutions@gmail.com](mailto:deeplayersolutions@gmail.com)
- **Headquarters:** Lahore, Pakistan

---

## 🎨 Brand Identity & Design System

DeepLayer Solutions adheres to an engineered **Emerald / Obsidian** design language with high-contrast legibility, tactile glassmorphism, and minimal clean aesthetics:

| Token | Hex Value | Application |
| :--- | :--- | :--- |
| **Primary Emerald** | `#008F53` / `#087A3D` | Key brand actions, CTA triggers, active badges, and highlights |
| **Deep Forest / Obsidian** | `#075C32` / `#142A27` | High-contrast borders, headers, and dark hover surfaces |
| **Vibrant Mint** | `#159B50` / `#00B86B` | Glow pulses, active status indicators, and live badge dots |
| **Soft Mint Surface** | `#E9FFF2` / `#E8F5E9` | Icon pedestals, badge backdrops, and interactive chip fills |
| **Ambient Background** | `#FAFCF9` | Glare-free, warm-white main canvas background |
| **Subtle Card Surface** | `#FFFFFF` | Elevated cards with glassmorphic border styling |
| **Primary Heading Text** | `#142A27` / `#101C19` | Deep obsidian green for maximum typographical contrast |
| **Secondary Body Text** | `#64736F` / `#65736D` | Balanced slate-green for body copy and technical specs |
| **Structural Border** | `#DFEDE5` / `#E3EDE5` | Refined hairline card borders and horizontal separators |
| **Accent Glow** | `#34D399` | Ambient radial glows and interactive focus rings |

---

## ⚡ Technology Architecture

### Core Framework & Frontend
- **Next.js 16.4.5 (App Router & Turbopack):** Server Components by default, streaming SSR with Partial Prerendering (PPR), zero-overhead static generation, and automated route compilation across 88 routes.
- **React 19.3.0:** React 19 compiler-ready architecture with clean server actions and modern hooks.
- **TypeScript 5.8:** Strict end-to-end type safety covering all 12 services, 9 industries, case studies, applicant schemas, and Supabase database types.
- **Tailwind CSS v4 (`@tailwindcss/turbopack`):** Engine-level build performance, custom CSS tokens, and fluid layout responsiveness.

### Motion, Scrolling & Interactive Components
- **Lenis Smooth Scroll (`lenis/react`):** Cinematic inertia-based momentum scrolling across all public pages, with zero jitter, synchronized anchor jumping, and smooth page transitions.
- **Embla Carousel (`embla-carousel-react`):** Smooth touch/drag carousels with sub-card navigation arrows, progress counters, snap-to-slide alignments, and responsive viewports.
- **Framer Motion 14.9.1:** Physics-modeled spring reveals, staggered card entrances, and fluid accordion transitions.
- **Dual-Row Infinite Marquee:** Pure CSS `@keyframes` with `translate3d` GPU acceleration, zero-gap mirrored grouping, instant hover pause, and responsive edge gradient masks.
- **Lucide React 1.68.0:** Unified iconography system across client pages and admin management modules.

### Backend, Database & Storage
- **Supabase PostgreSQL (`kzrgbqvpzstyyantunqs`):** Enterprise relational database with automated timestamping, foreign key integrity, and Row Level Security (RLS) policies.
- **Supabase Storage:** Secure applicant resume and portfolio document storage with signed private download URLs.
- **Supabase SSR (`@supabase/ssr`):** Cookie-based session validation, server-side auth guards, and automated token refreshment.

### Email Transmission Infrastructure (Google Cloud Gmail API)
- **Google Cloud Platform (GCP) Gmail REST API (`googleapis` v189):** Replaced legacy SMTP/Resend dependencies with an enterprise REST API over port 443 HTTPS.
  - **Client ID:** `197585439582-jh6f9bk079b3i5nb5pduag1ggc1ok949.apps.googleusercontent.com`
  - Automated OAuth 2.0 token refresher with local interactive generator script (`scripts/get-google-refresh-token.js`).
  - RFC 2822 base64url encoded MIME builder supporting formatted HTML templates, candidate confirmations, and admin notifications.

### Security, Privacy & Bot Mitigation
- **Native Bot Trap Defense:** Invisible honeypot inputs and server-side timing validation, silently neutralizing automated spam bots without user-facing friction.
- **Zero Cloudflare Challenge Dependencies:** Cloudflare Turnstile scripts and blockers have been eliminated, providing instantaneous page loads and unrestricted access.
- **Serverless In-Memory Rate Limiting:** Enforces strict burst protection (`MAX_REQUESTS_PER_WINDOW = 5` per 15-minute sliding window) across all mutation endpoints.
- **Input Sanitization & Validation:** Strict schema validation with HTML tag stripping to neutralize XSS, SQL injection, and parameter tampering.

---

## 🗺️ Complete Route Directory (88 Compiled Routes)

The application compiles **88 production routes** across public visitor pages, dynamic content hubs, admin portals, and serverless API endpoints:

```
Route (app)                                     Size     First Load JS
┌ ○ /                                           48.7 kB         177 kB
├ ○ /about                                      14.2 kB         142 kB
├ ○ /services                                   18.5 kB         146 kB
├ ● /services/[slug] (12 routes)                16.8 kB         145 kB
├ ○ /industries                                 15.1 kB         143 kB
├ ● /industries/[slug] (9 routes)               15.9 kB         144 kB
├ ○ /portfolio                                  19.2 kB         147 kB
├ ● /portfolio/[slug] (6 routes)                17.1 kB         145 kB
├ ○ /careers                                    21.4 kB         149 kB
├ ● /careers/[id] (4 routes)                    18.0 kB         146 kB
├ ○ /blog                                       16.3 kB         144 kB
├ ● /blog/[slug] (8 routes)                     19.4 kB         147 kB
├ ○ /contact                                    17.6 kB         145 kB
├ ○ /privacy                                    11.2 kB         139 kB
├ ○ /terms                                      11.0 kB         139 kB
├ ○ /admin                                       1.2 kB         129 kB
├ ○ /admin/login                                 8.4 kB         136 kB
├ ○ /admin/forgot-password                       7.9 kB         135 kB
├ ○ /admin/reset-password                        7.8 kB         135 kB
├ ○ /admin/dashboard                            24.8 kB         153 kB
├ ○ /admin/jobs                                 19.5 kB         147 kB
├ ○ /admin/applications                         21.2 kB         149 kB
├ ○ /admin/contact                              18.7 kB         146 kB
├ ○ /admin/newsletter                           16.4 kB         144 kB
├ ○ /admin/analytics                            22.1 kB         150 kB
├ ○ /admin/content                              17.9 kB         145 kB
├ ○ /admin/media                                16.5 kB         144 kB
├ ○ /admin/notifications                        15.2 kB         143 kB
├ ○ /admin/users                                18.1 kB         146 kB
├ ○ /admin/activity                             16.8 kB         144 kB
├ ○ /admin/settings                             19.0 kB         147 kB
├ ƒ /api/contact                                 0 B               0 B
├ ƒ /api/careers                                 0 B               0 B
├ ƒ /api/newsletter                              0 B               0 B
├ ƒ /api/admin/auth/login                        0 B               0 B
├ ƒ /api/admin/auth/logout                       0 B               0 B
├ ƒ /api/admin/auth/forgot-password              0 B               0 B
├ ƒ /api/admin/auth/reset-password               0 B               0 B
├ ƒ /api/admin/overview                          0 B               0 B
├ ƒ /api/health                                  0 B               0 B
├ ○ /robots.txt                                  0 B               0 B
└ ○ /sitemap.xml                                 0 B               0 B
+ First Load JS shared by all                   128 kB
```

### 1. 12 Dedicated Technical Service Practices (`/services/[slug]`)
1. `/services/ai-machine-learning` — Custom Deep Learning, Neural Networks, Computer Vision & Edge AI
2. `/services/generative-ai-llms` — Multi-Agent Systems, Domain RAG Pipelines & Fine-Tuned Models
3. `/services/custom-software-development` — Resilient Microservices, Distributed Systems & Concurrency
4. `/services/web-application-development` — Enterprise Next.js Platforms & Responsive Web Applications
5. `/services/data-engineering-analytics` — High-Throughput ETL/ELT Pipelines, Lakehouse & BI Dashboards
6. `/services/cloud-solutions-devops` — Kubernetes, Infrastructure as Code & Zero-Trust Cloud Architecture
7. `/services/mobile-application-development` — High-Performance Native Cross-Platform Apps (React Native / Flutter)
8. `/services/it-consulting-digital-transformation` — Modernization Audits, Technical Strategy & Architecture Advisory
9. `/services/search-engine-optimization` — Programmatic SEO, JSON-LD Schema & Semantic Crawl Optimization
10. `/services/ecommerce-solutions` — Headless Storefronts, High-Conversion Checkout & Multi-Vendor Engines
11. `/services/erp-pos-solutions` — Real-Time Inventory, Cloud POS, Accounting & Warehouse Integration
12. `/services/business-automation` — End-to-End Workflow Orchestration, RPA & Cross-Tool Integrations

### 2. 9 Specialized Industry Sector Solutions (`/industries/[slug]`)
1. `/industries/healthcare` — HIPAA-Compliant Telehealth, Diagnostic AI & Clinical Workflows
2. `/industries/finance-fintech` — Real-Time Payment Gateways, Algorithmic Risk & Fraud Prevention
3. `/industries/retail-ecommerce` — Omnichannel Commerce, Automated Supply Chain & Smart Catalogs
4. `/industries/education-research` — Adaptive Learning Management Systems, EdTech & Academic Portals
5. `/industries/logistics-supply-chain` — Autonomous Fleet Tracking, Route Optimization & Warehouse Systems
6. `/industries/real-estate-proptech` — Digital Property Management, Smart Leases & Virtual Tours
7. `/industries/legal-regtech` — Automated Legal Discovery, Contract AI & Compliance Governance
8. `/industries/media-entertainment` — Streaming Platforms, Content Delivery Pipelines & Digital Rights
9. `/industries/hospitality-restaurants` — Smart Cloud Booking, POS Kitchen Sync & Guest Loyalty

---

## 🛡️ Admin Dashboard & Role-Based Access Control (RBAC)

The admin panel is accessible at `/admin` and provides a comprehensive management suite backed by real PostgreSQL data:

### 1. Access Architecture
- **Root Protection:** Requests to `/admin` are intercepted by server middleware; unauthenticated sessions are redirected via HTTP 307 to `/admin/login`.
- **Credential Recovery:** Full password reset flow with secure token validation at `/admin/forgot-password` and `/admin/reset-password`.
- **Overview Metrics:** Real-time statistics aggregating visitor telemetry, contact inquiries, active recruitment listings, applicant tallies, and newsletter subscriptions.

### 2. Role-Based Access Control (RBAC) Hierarchy

| Role | Scope & Permissions |
| :--- | :--- |
| **Super Admin** | Full system governance, administrator account creation, RBAC assignments, security logs, and master configuration |
| **Admin** | General operations, contact inquiry management, newsletter campaigns, overview metrics, and customer tracking |
| **Recruitment Manager** | Job posting creation, applicant review, resume downloads, interview scheduling, and candidate status updates |
| **Content Manager** | Technical blog authoring, case study curation, media asset library, and meta tag SEO optimization |

### 3. Management Modules
- **Jobs Management (`/admin/jobs`):** Create, publish, pause, or archive job postings.
- **Applicant Tracking System (`/admin/applications`):** Filter by position, review applicant resumes, and update statuses (`new`, `reviewing`, `shortlisted`, `rejected`, `hired`).
- **Contact Inquiries (`/admin/contact`):** Inbox for prospect messages with status tracking (`unread`, `in-progress`, `resolved`).
- **Newsletter Subscribers (`/admin/newsletter`):** Email distribution list management with CSV export.
- **Analytics & Telemetry (`/admin/analytics`):** Real-time visitor counts, popular pages, and referral insights.
- **Media Library (`/admin/media`):** Upload, optimize, and organize brand visual assets.

---

## 📬 Google Cloud Gmail API Integration

DeepLayer Solutions uses Google Cloud Gmail REST API over HTTPS (Port 443) for reliable email delivery:

```
[Client Contact / Application Form]
               │
               ▼
   [Server Action / API Route]
               │
      (OAuth 2.0 Client)
   Client ID: 197585439582-...
               │
               ▼
 [Google Cloud Gmail REST API: port 443]
               │
       ┌───────┴───────┐
       ▼               ▼
[Admin Alert]    [User Confirmation]
```

### Refresh Token Generation
When configuring a new deployment, run the automated Google OAuth helper script:
```bash
node scripts/get-google-refresh-token.js
```
The script opens the Google Consent screen, completes authorization, and outputs your `GMAIL_REFRESH_TOKEN` to paste directly into `.env.local`.

---

## 📂 Project Directory Structure

```
DeepLayer Solutions/
├── public/
│   ├── logo/
│   │   ├── logo.png                     # High-resolution transparent brand mark
│   │   └── logo-cropped.png             # Edge-trimmed mark for navigation
│   ├── deeplayer-animated-loader.svg    # 0.5s branded preloader animation
│   ├── koeRHQn0tk.svg                   # Neural network hero vector graphic
│   ├── robots.txt                       # Dynamic crawler directives
│   └── sitemap.xml                      # Dynamic XML search engine index
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Global layout (Lenis, Navbar, Footer, Preloader)
│   │   ├── page.tsx                     # Agency Homepage
│   │   ├── globals.css                  # Design tokens, Tailwind v4 imports, utility classes
│   │   ├── about/page.tsx               # Agency narrative, mission, and leadership
│   │   ├── services/
│   │   │   ├── page.tsx                 # 12-Practice filterable services catalog
│   │   │   └── [slug]/page.tsx          # Dynamic deep-dive route for each service
│   │   ├── industries/
│   │   │   ├── page.tsx                 # 9-Sector industry blueprint hub
│   │   │   └── [slug]/page.tsx          # Dynamic sector deep-dive routes
│   │   ├── portfolio/
│   │   │   ├── page.tsx                 # Filterable engineering case studies
│   │   │   └── [slug]/page.tsx          # In-depth architectural case studies
│   │   ├── careers/
│   │   │   ├── page.tsx                 # Remote job & internship listings
│   │   │   └── [id]/page.tsx            # Role details and application modal
│   │   ├── blog/
│   │   │   ├── page.tsx                 # Technical engineering articles with search
│   │   │   └── [slug]/page.tsx          # Full-length technical articles
│   │   ├── contact/page.tsx             # Interactive inquiry form & credentials
│   │   ├── privacy/page.tsx             # Privacy Policy
│   │   ├── terms/page.tsx               # Terms of Service
│   │   ├── not-found.tsx                # Branded 404 recovery page
│   │   ├── admin/                       # Enterprise Admin Portal & CMS
│   │   │   ├── (auth)/                  # Login, Forgot Password, Reset Password
│   │   │   └── (dashboard)/             # Protected Dashboard, Jobs, Applicants, Inquiries
│   │   └── api/
│   │       ├── contact/route.ts         # Contact form handler (Gmail API + Supabase)
│   │       ├── careers/route.ts         # Career application handler (Storage + Gmail API)
│   │       ├── newsletter/route.ts      # Newsletter subscription handler
│   │       ├── health/route.ts          # Automated health check endpoint
│   │       └── admin/                   # Admin authentication & data endpoints
│   ├── components/
│   │   ├── common/                      # Reusable atoms (Button, Container, SectionHeading)
│   │   ├── layout/                      # Navbar, Footer, MobileMenu, Logo, PageWrapper
│   │   ├── home/                        # Hero, ServicesPreview (Embla), Tech Marquee, FAQ
│   │   ├── services/                    # Service cards, deliverables grid, process steps
│   │   ├── industries/                  # Sector cards, architecture blueprints, metrics
│   │   ├── portfolio/                   # Project cards, interactive modals, tech tags
│   │   ├── careers/                     # Openings list, application modal with resume upload
│   │   ├── blog/                        # Article cards, reading progress, share buttons
│   │   ├── contact/                     # Validated inquiry form with bot honeypot
│   │   └── admin/                       # Admin sidebar, header, stat cards, data tables
│   ├── config/
│   │   └── site.ts                      # Centralized metadata, stats, links & credentials
│   ├── data/
│   │   ├── services.ts                  # 12 Detailed service practice specifications
│   │   ├── industries.ts                # 9 Industry domain solution specifications
│   │   ├── projects.ts                  # Production case studies with architectural ROI
│   │   ├── careers.ts                   # Remote career openings and qualifications
│   │   ├── blog.ts                      # Technical articles and code walkthroughs
│   │   └── testimonials.ts              # Verified client ratings and endorsements
│   ├── lib/
│   │   ├── supabase/                    # Client, server, and admin Supabase instances
│   │   ├── gmail.ts                     # Google Cloud Gmail REST API client
│   │   └── utils.ts                     # Class name merger (`clsx` + `tailwind-merge`)
│   └── types/
│       └── index.ts                     # Centralized TypeScript definitions
├── scripts/
│   ├── test-master-qa-audit.js          # 31-point comprehensive production test suite
│   ├── test-phase9-integration.js       # 43-point end-to-end integration test suite
│   ├── get-google-refresh-token.js      # Interactive OAuth token generator for Gmail API
│   └── create-admin.js                  # Initial superadmin bootstrap utility
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js:** `20.x` or higher
- **npm:** `10.x` or higher (or `pnpm` / `yarn`)
- **Supabase Account & Project:** PostgreSQL database with storage buckets
- **Google Cloud Platform Account:** Gmail API enabled with OAuth 2.0 Web Application credentials

### 1. Clone the Repository
```bash
git clone https://github.com/Muhammad-Usman55/DeepLayerSolutions.git
cd DeepLayerSolutions
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:
```env
# Public App URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase PostgreSQL Configuration
NEXT_PUBLIC_SUPABASE_URL=https://kzrgbqvpzstyyantunqs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Google Cloud Gmail API Configuration
GMAIL_CLIENT_ID=197585439582-jh6f9bk079b3i5nb5pduag1ggc1ok949.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=your-google-client-secret
GMAIL_REFRESH_TOKEN=your-google-refresh-token
GMAIL_SENDER_EMAIL=deeplayersolutions@gmail.com
ADMIN_NOTIFICATION_EMAIL=deeplayersolutions@gmail.com

# Admin Security Secret
ADMIN_JWT_SECRET=your-secure-random-jwt-secret-key-32-chars
```

### 4. Start Local Development Server
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the live site. The application updates in real time with Turbopack Fast Refresh.

### 5. Create Initial Super Administrator
```bash
npm run create-admin
```
Follow the interactive prompts to create the initial Super Admin account for the `/admin` portal.

---

## 🧪 Quality Assurance & Automated Testing

The codebase includes two automated QA suites to verify production stability before deployment:

### 1. Master QA Audit Suite (31 Automated Tests)
Runs comprehensive checks across public routes, detail pages, crawler files, Supabase connectivity, form validation, honeypot bot absorption, and admin portal route security:
```bash
node scripts/test-master-qa-audit.js
```
```
========================================================
MASTER QA AUDIT RESULTS: 31/31 CHECKS PASSED
========================================================
```

### 2. Phase 9 Integration Test Suite (43 Automated Tests)
Validates all dynamic routes, API rate-limiting behaviors, payload sanitization, and career file uploads:
```bash
node scripts/test-phase9-integration.js
```
```
========================================================
INTEGRATION AUDIT RESULTS: 43/43 CHECKS PASSED
========================================================
```

### 3. Static Type Checking & Code Quality
```bash
# Verify TypeScript strict typing without emitting files
npx tsc --noEmit

# Run Next.js ESLint rules
npm run lint

# Compile production build (verifies all 88 routes)
npm run build
```

---

## 🔒 Security & Performance Highlights

- **Lenis Smooth Scroll:** Native-feeling kinetic scrolling with dynamic height calculation, touch preservation, and anchor navigation.
- **Pure CSS GPU-Accelerated Marquee:** Zero JavaScript runtime overhead during marquee scrolling, with bilateral gradient masking and responsive hover pauses.
- **Serverless REST Email Delivery:** Google Cloud Gmail API over HTTPS (port 443) avoids SMTP port blocks on serverless platforms (Vercel, AWS Lambda, Cloudflare).
- **Row Level Security (RLS):** All Supabase database tables (`contact_inquiries`, `job_applications`, `newsletter_subscribers`, `admin_users`, `admin_activity_logs`) enforce strict RLS policies preventing unauthorized client read/write operations.
- **Automated Honeypot Filtering:** Form submissions containing values in hidden trap fields are silently handled with HTTP 200 responses to deceive bots without corrupting database records.
- **Next.js Image Optimization:** WebP and AVIF formats with automatic responsive srcset calculation and layout shift prevention (CLS = 0).

---

## 📄 License & Attribution

Copyright © 2026 **DeepLayer Solutions**. All rights reserved.  
Unauthorized duplication, reproduction, or commercial distribution of proprietary source code, branding assets, or design elements is strictly prohibited.
