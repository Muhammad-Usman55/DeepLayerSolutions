import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  cacheComponents: true,
  partialPrefetching: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/portfolio/gender-detection",
        destination: "/portfolio/visionsense-video-analytics",
        permanent: true,
      },
      {
        source: "/portfolio/smart-course-qa",
        destination: "/portfolio/enterprise-rag-assistant",
        permanent: true,
      },
      // Service legacy & alternative slug aliases
      {
        source: "/services/website-optimization",
        destination: "/services/seo",
        permanent: true,
      },
      {
        source: "/services/landing-pages",
        destination: "/services/web-development",
        permanent: true,
      },
      {
        source: "/services/ai-automation",
        destination: "/services/generative-ai-llms",
        permanent: true,
      },
      {
        source: "/services/bots-intelligent-agents",
        destination: "/services/generative-ai-llms",
        permanent: true,
      },
      {
        source: "/services/computer-vision",
        destination: "/services/ai-machine-learning",
        permanent: true,
      },
      {
        source: "/services/machine-learning",
        destination: "/services/ai-machine-learning",
        permanent: true,
      },
      {
        source: "/services/custom-software",
        destination: "/services/custom-software-development",
        permanent: true,
      },
      {
        source: "/services/cloud-devops",
        destination: "/services/cloud-solutions-devops",
        permanent: true,
      },
      {
        source: "/services/mobile-apps",
        destination: "/services/mobile-app-development",
        permanent: true,
      },
      {
        source: "/services/mobile-application-development",
        destination: "/services/mobile-app-development",
        permanent: true,
      },
      {
        source: "/services/it-consulting-digital-transformation",
        destination: "/services/it-consulting",
        permanent: true,
      },
    ];
  },
  async headers() {
    const defaultHeaders = [
      {
        key: "X-DNS-Prefetch-Control",
        value: "on",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com https://www.googletagmanager.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data:",
          "frame-src 'self' https://challenges.cloudflare.com",
          "connect-src 'self' https: https://challenges.cloudflare.com https://www.google-analytics.com https://analytics.google.com",
          "frame-ancestors 'none'",
        ].join("; "),
      },
    ];

    // On staging/preview deployments (e.g. *.vercel.app), instruct search engines not to index
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
      defaultHeaders.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow",
      });
    }

    return [
      {
        source: "/:path*",
        headers: defaultHeaders,
      },
      {
        source: "/deeplayer-animated-loader.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/koeRHQn0tk.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/logo/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
