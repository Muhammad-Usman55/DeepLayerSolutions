# DeepLayer Solutions — Enterprise Agency Website

Production-grade, premium multi-page frontend website for **DeepLayer Solutions**, a software engineering and artificial intelligence agency.

Designed and developed with a sophisticated light green and white visual identity, oversized modern typography, subtle glassmorphism, responsive architecture, and interactive 3D-inspired technology illustrations.

---

## Brand Identity & Design System

- **Agency Name:** DeepLayer Solutions
- **Tagline:** Build • Innovate • Scale
- **Subtitle:** Your Trusted Software & AI Partner
- **Theme:** Premium Light Green System
- **Color Palette:**
  - **Primary Green:** `#087A3D`
  - **Deep Green:** `#075C32`
  - **Secondary Green:** `#159B50`
  - **Light Green:** `#E8F5E9`
  - **Surface Green:** `#F4FAF3`
  - **Main Background:** `#FAFCF9`
  - **Primary Text:** `#101C19`
  - **Secondary Text:** `#65736D`
  - **Border:** `#E3EDE5`
  - **Accent Glows:** `#34D399`, `#10B981`

---

## Technology Stack

- **Framework:** Next.js (App Router, Turbopack, React Server Components)
- **UI Library:** React 19, TypeScript 5.8
- **Styling:** Tailwind CSS v4, Custom CSS tokens & Glassmorphism
- **Animations:** Framer Motion (GPU accelerated, responsive, respects `prefers-reduced-motion`)
- **Icons:** Lucide React & Custom Brand Vectors
- **SEO & Performance:** Next.js Metadata API, Dynamic `sitemap.ts`, `robots.ts`, OpenGraph, Twitter Cards

---

## Project Structure

```
d:/code/DeepLayer Solutions/
├── public/
│   ├── logo/
│   │   ├── logo.png                    # Supplied original 800x800 logo
│   │   └── logo-cropped.png            # Trimmed logo mark for navigation
│   ├── deeplayer-animated-loader.svg   # 3D brand animated preloader
│   └── koeRHQn0tk.svg                  # 3D animated hero neural vortex
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout with Navbar, Footer & Fonts
│   │   ├── page.tsx                    # Comprehensive Homepage
│   │   ├── globals.css                 # Design tokens, glassmorphism, scrollbars
│   │   ├── services/
│   │   │   ├── page.tsx                # Filterable services showcase
│   │   │   └── [slug]/page.tsx         # Dynamic service deep-dive routes
│   │   ├── industries/
│   │   │   └── page.tsx                # 8 Industry-specific technical blueprints
│   │   ├── about/
│   │   │   └── page.tsx                # Agency narrative, mission, vision & values
│   │   ├── portfolio/
│   │   │   └── page.tsx                # Interactive portfolio & case study modal
│   │   ├── blog/
│   │   │   ├── page.tsx                # Searchable blog articles
│   │   │   └── [slug]/page.tsx         # In-depth technical articles
│   │   ├── contact/
│   │   │   └── page.tsx                # Contact cards & interactive form
│   │   ├── privacy/page.tsx            # Privacy policy
│   │   ├── terms/page.tsx              # Terms of service
│   │   ├── not-found.tsx               # Custom branded 404 page
│   │   ├── sitemap.ts                  # Dynamic XML sitemap generator
│   │   └── robots.ts                   # Crawler rules
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx              # Accessible button with variants
│   │   │   ├── Container.tsx           # Responsive layout container
│   │   │   ├── SectionHeading.tsx      # Reusable section title with pill badge
│   │   │   ├── Breadcrumb.tsx          # Accessible breadcrumb trail
│   │   │   ├── TechLayerVisual.tsx     # 3D isometric glowing glass visual
│   │   │   └── CTASection.tsx          # Emerald ribbon call-to-action
│   │   ├── layout/
│   │   │   ├── Navbar.tsx              # Sticky blur navigation & active links
│   │   │   ├── Footer.tsx              # Rich brand footer with social links
│   │   │   ├── MobileMenu.tsx          # Slide-over mobile drawer
│   │   │   ├── Logo.tsx                # Multi-variant brand logo component
│   │   │   └── PageWrapper.tsx
│   │   ├── home/
│   │   ├── services/
│   │   ├── portfolio/
│   │   ├── blog/
│   │   └── contact/
│   ├── config/
│   │   └── site.ts                     # Centralized editable configuration
│   ├── data/
│   │   ├── services.ts                 # 8 Detailed services with full specs
│   │   ├── industries.ts               # 8 Tailored domain solutions
│   │   ├── projects.ts                 # Real portfolio project case studies
│   │   ├── blog.ts                     # In-depth AI & web engineering articles
│   │   ├── testimonials.ts             # Client quotes from design boards
│   │   └── navigation.ts               # Header & footer routes
│   ├── lib/
│   │   └── utils.ts                    # Class merging and formatting helpers
│   └── types/
│       └── index.ts                    # Shared TypeScript interfaces
├── package.json
└── tsconfig.json
```

---

## Available Routes

| Route | Description |
| :--- | :--- |
| `/` | Agency homepage with hero, capabilities strip, core services, case studies, timeline, ecosystem, and testimonials |
| `/services` | Complete capabilities catalog with category filtering |
| `/services/[slug]` | Individual dynamic deep-dive pages for all 8 engineering disciplines |
| `/industries` | Sector-specific technical breakdowns (Healthcare, FinTech, EdTech, Retail, IoT, PropTech, Logistics, Legal) |
| `/about` | Company narrative, architectural philosophy, mission, vision, and core values |
| `/portfolio` | Interactive project showcase with category filters and case study modal dialog |
| `/blog` | Technical articles and thought leadership with real-time client search and category filters |
| `/blog/[slug]` | Full-length technical articles with key takeaway callouts and related reading |
| `/contact` | Contact cards, office credentials, and interactive contact form with validation |
| `/privacy` | Data privacy governance |
| `/terms` | Professional engagement terms |
| `/not-found` | Branded 404 error page |
| `/sitemap.xml` | Generated XML sitemap |
| `/robots.txt` | Crawler policy |

---

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Asset Management & Original Logo

- **Original Logo Asset:** [Logo.png](file:///d:/code/DeepLayer%20Solutions/Logo.png) (800×800 RGBA PNG with alpha transparency) preserved in project root and mirrored to [logo.png](file:///d:/code/DeepLayer%20Solutions/public/logo/logo.png).
- **Edge-Trimmed Asset:** Generated [logo-cropped.png](file:///d:/code/DeepLayer%20Solutions/public/logo/logo-cropped.png) (641×705 px) to eliminate empty outer padding and render with razor-sharp fidelity on Retina displays.
- **Animated SVG Loader:** Preserved and linked [deeplayer-animated-loader.svg](file:///d:/code/DeepLayer%20Solutions/deeplayer-animated-loader.svg) for the 1-second initial page load preloader (`public/deeplayer-animated-loader.svg`).
- **Component Implementation:** Built [`Logo`](file:///d:/code/DeepLayer%20Solutions/src/components/layout/Logo.tsx) and [`Preloader`](file:///d:/code/DeepLayer%20Solutions/src/components/common/Preloader.tsx).

---

## Current Frontend Scope & Limitations

- **Frontend Exclusivity:** As specified, this phase focuses exclusively on the complete visual, responsive, and interactive frontend.
- **Form Submission:** The contact form executes full client-side validation (field requirements, email formatting, character minimums) and provides a simulated network roundtrip and success state. No email server or database is queried.
- **Mock Data Layer:** All data is strictly typed and centralized in `src/data/*.ts` for seamless future database migration.

---

## Instructions for Future Backend Integration (Phase 6+)

When beginning backend development:
1. **API Routes:** Implement Route Handlers in `src/app/api/contact/route.ts` to receive contact form submissions and forward to SendGrid/Resend or company CRM.
2. **Database Integration:** Connect Prisma, Drizzle, or Supabase to `src/data/` interfaces defined in `src/types/index.ts`.
3. **Admin Dashboard:** Add authenticated routes under `src/app/admin/` with NextAuth.js / Clerk to manage projects and blog posts dynamically.
4. **Environment Variables:** Set production secrets in `.env.local` (`DATABASE_URL`, `RESEND_API_KEY`, etc.).
