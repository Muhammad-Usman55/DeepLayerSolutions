import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/common/MotionProvider";
import { siteConfig } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const isProduction =
  process.env.VERCEL_ENV === "production" ||
  (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url || "https://deeplayersolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} — Custom AI, Enterprise Software & Cloud Engineering`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "DeepLayer Solutions is a premier software engineering and artificial intelligence agency. We engineer Custom AI Development, LLM Integration, Enterprise Software Engineering, Computer Vision, and Cloud & DevOps Solutions built for velocity and scale.",
  keywords: [
    "Custom AI Development",
    "LLM Integration",
    "Enterprise Software Engineering",
    "Computer Vision",
    "Cloud & DevOps Solutions",
    "DeepLayer Solutions",
    "Machine Learning Agency",
    "Next.js Enterprise Development",
    "AI Agent Systems",
    "FastAPI & Microservices Architecture",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${siteConfig.name} — Custom AI, Enterprise Software & Cloud Engineering`,
    description:
      "Enterprise agency specializing in Custom AI Development, LLM Integration, Enterprise Software Engineering, Computer Vision, and Cloud & DevOps Solutions.",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 800,
        height: 800,
        alt: `${siteConfig.name} — Enterprise Software & AI Agency`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Custom AI, Enterprise Software & Cloud Engineering`,
    description:
      "Enterprise agency specializing in Custom AI Development, LLM Integration, Enterprise Software Engineering, Computer Vision, and Cloud & DevOps Solutions.",
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "1_eR-BQXU2XK2n7seIS1-BRwE6GLcvwSDC5us33FzOc",
  },
};

export const viewport: Viewport = {
  themeColor: "#008F53",
  width: "device-width",
  initialScale: 1,
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.name,
      url: siteUrl,
      logo: `${siteUrl}/logo/logo.png`,
      image: `${siteUrl}/logo/logo.png`,
      description: siteConfig.description,
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phone,
        contactType: "customer service",
        email: siteConfig.contact.email,
        availableLanguage: ["English", "Urdu"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Enterprise Technology Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom AI & Machine Learning Development",
              description: "Custom deep learning models, neural networks, and computer vision systems.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Generative AI & LLM Integration",
              description: "RAG vector pipelines, multi-agent AI workflows, and enterprise model fine-tuning.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Enterprise Software Engineering",
              description: "High-concurrency full-stack architectures, Next.js web applications, and resilient APIs.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Cloud Solutions & DevOps",
              description: "Kubernetes orchestration, automated CI/CD pipelines, and cloud infrastructure.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Technical SEO & Web Optimization",
              description: "Core Web Vitals acceleration, semantic search schema, and organic ranking scaling.",
            },
          },
        ],
      },
      sameAs: [
        siteConfig.social.linkedin,
        siteConfig.social.facebook,
        siteConfig.contact.whatsappUrl,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFCF9] text-[#142A27] overflow-x-clip">
        {/* Skip to Main Content Link for WCAG 2.2 AA Compliance */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[10000] px-4 py-2.5 bg-[#008F53] text-white font-semibold rounded-lg shadow-xl outline-none ring-2 ring-white"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
