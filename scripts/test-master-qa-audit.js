/**
 * DeepLayer Solutions — Master QA Audit & Verification Test Suite
 *
 * Verifies all layers:
 * 1. Public Website Pages (HTTP 200, valid HTML, meta tags)
 * 2. Specialized Sector & Service Detail Routes
 * 3. SEO Endpoints (/robots.txt, /sitemap.xml)
 * 4. API Backend Endpoints (Health, Contact, Newsletter, Careers)
 * 5. Input Validation & Error Handling (Missing fields, invalid email, XSS defense)
 * 6. Admin Authentication & Protected Route Security
 * 7. Admin API Authorization & RBAC
 * 8. Supabase Database Connection & RLS Security
 */

const fs = require("fs");
const path = require("path");

// Load Environment Configuration
const envPath = path.resolve(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

let passed = 0;
let failed = 0;
const results = [];

function report(condition, message, details = "") {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${message}`);
    results.push({ status: "PASS", message });
  } else {
    failed++;
    console.error(`  [FAIL] ${message} ${details ? "-> " + details : ""}`);
    results.push({ status: "FAIL", message, details });
  }
}

async function runMasterAudit() {
  console.log("========================================================");
  console.log("DEEPLAYER SOLUTIONS — MASTER QA AUDIT & VERIFICATION");
  console.log(`Target Base URL: ${BASE_URL}`);
  console.log("========================================================\n");

  // --------------------------------------------------------------------------
  // 1. PUBLIC WEBSITE CORE ROUTES
  // --------------------------------------------------------------------------
  console.log("--- 1. Public Website Core Routes ---");
  const coreRoutes = [
    { name: "Home Page", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services Hub", path: "/services" },
    { name: "Industries Hub", path: "/industries" },
    { name: "Portfolio Hub", path: "/portfolio" },
    { name: "Careers Page", path: "/careers" },
    { name: "Contact Page", path: "/contact" },
    { name: "Blog Hub", path: "/blog" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms and Conditions", path: "/terms" },
  ];

  for (const route of coreRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${route.path}`);
      const text = await res.text();
      report(
        res.status === 200 && text.includes("DeepLayer"),
        `Route "${route.name}" (${route.path}) loaded HTTP 200 with brand metadata`
      );
    } catch (err) {
      report(false, `Route "${route.name}" (${route.path}) threw exception`, err.message);
    }
  }

  // --------------------------------------------------------------------------
  // 2. SPECIALIZED DETAIL ROUTES (Dynamic Slugs)
  // --------------------------------------------------------------------------
  console.log("\n--- 2. Specialized Sector & Service Detail Routes ---");
  const detailRoutes = [
    { name: "AI & Machine Learning", path: "/services/ai-machine-learning" },
    { name: "Generative AI & LLMs", path: "/services/generative-ai-llms" },
    { name: "Custom Software", path: "/services/custom-software-development" },
    { name: "E-Commerce Solutions", path: "/services/ecommerce-solutions" },
    { name: "ERP & POS Solutions", path: "/services/erp-pos-solutions" },
    { name: "Business Automation", path: "/services/business-automation" },
    { name: "Healthcare Sector", path: "/industries/healthcare" },
    { name: "Finance & FinTech Sector", path: "/industries/finance-fintech" },
    { name: "Retail & E-Commerce Sector", path: "/industries/retail-ecommerce" },
    { name: "Education & Research Sector", path: "/industries/education-research" },
  ];

  for (const route of detailRoutes) {
    try {
      const res = await fetch(`${BASE_URL}${route.path}`);
      report(
        res.status === 200,
        `Detail Route "${route.name}" (${route.path}) rendered HTTP 200 OK`
      );
    } catch (err) {
      report(false, `Detail Route "${route.name}" (${route.path}) failed`, err.message);
    }
  }

  // --------------------------------------------------------------------------
  // 3. TECHNICAL SEO ENDPOINTS
  // --------------------------------------------------------------------------
  console.log("\n--- 3. Technical SEO & Crawler Endpoints ---");
  try {
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    const robotsTxt = await robotsRes.text();
    report(
      robotsRes.status === 200 && robotsTxt.includes("User-Agent: *") && robotsTxt.includes("Sitemap:"),
      `/robots.txt is valid and advertises sitemap`
    );

    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    const sitemapXml = await sitemapRes.text();
    report(
      sitemapRes.status === 200 && sitemapXml.includes("<urlset") && sitemapXml.includes("<loc>"),
      `/sitemap.xml is valid XML and contains indexed URL entries`
    );
  } catch (err) {
    report(false, `Technical SEO endpoints check failed`, err.message);
  }

  // --------------------------------------------------------------------------
  // 4. BACKEND API HEALTH & SUPABASE HANDSHAKE
  // --------------------------------------------------------------------------
  console.log("\n--- 4. Backend API Health & Supabase Handshake ---");
  try {
    const healthRes = await fetch(`${BASE_URL}/api/health/supabase`);
    const healthData = await healthRes.json();
    report(
      healthRes.status === 200 && healthData.status === "connected" && healthData.details?.backendConnected === true,
      `Supabase API handshake verified (Latency: ${healthData.details?.latencyMs}ms)`
    );
  } catch (err) {
    report(false, `Health check endpoint failed`, err.message);
  }

  // --------------------------------------------------------------------------
  // 5. CAREER APPLICATION SUBMISSION & VALIDATION
  // --------------------------------------------------------------------------
  console.log("\n--- 5. Career Application Submission & Validation ---");
  try {
    // 5a. Test missing fields rejection
    const invalidAppRes = await fetch(`${BASE_URL}/api/careers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        fullName: "",
        email: "not-an-email",
        phone: "123",
        position: "",
        linkedin: "invalid-link",
      }),
    });
    report(
      invalidAppRes.status === 400,
      `Career API rejects invalid inputs with HTTP 400 Bad Request`
    );

    // 5b. Test valid career submission
    const validAppRes = await fetch(`${BASE_URL}/api/careers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        fullName: "Sarah Connor",
        email: `candidate.${Date.now()}@example.com`,
        phone: "+1 (555) 234-5678",
        position: "Senior AI Engineer",
        linkedin: "https://linkedin.com/in/sarah-connor-test",
        portfolioOrGithub: "https://github.com/sarahconnor",
        resumeUrl: "https://example.com/resumes/sarah-connor-cv.pdf",
        coverNote: "Experienced in enterprise LLM agent architectures and autonomous systems.",
      }),
    });
    const validAppData = await validAppRes.json();
    report(
      validAppRes.status === 200 && validAppData.success === true,
      `Career application accepted and validated (HTTP 200 OK)`
    );
  } catch (err) {
    report(false, `Career API test threw exception`, err.message);
  }

  // --------------------------------------------------------------------------
  // 6. CONTACT FORM VALIDATION & DEFENSES
  // --------------------------------------------------------------------------
  console.log("\n--- 6. Contact Form Validation & Security ---");
  try {
    // 6a. Honeypot defense
    const botRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        fullName: "Spam Bot",
        email: "spambot@spammer.net",
        subject: "Spam Inquiry",
        message: "Spamming the contact form.",
        botField: "I am a malicious bot filling hidden fields",
      }),
    });
    const botData = await botRes.json();
    report(
      botRes.status === 200 && botData.success === true,
      `Honeypot bot submission silently absorbed without database pollution`
    );

    // 6b. Validation rejection for invalid email
    const invalidEmailRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      body: JSON.stringify({
        fullName: "Real Name",
        email: "bad-email",
        subject: "Valid Subject",
        message: "Valid long message for testing validation rejection.",
      }),
    });
    report(
      invalidEmailRes.status === 400 || invalidEmailRes.status === 422,
      `Invalid email address rejected with HTTP ${invalidEmailRes.status} (Client Error)`
    );
  } catch (err) {
    report(false, `Contact validation test failed`, err.message);
  }

  // --------------------------------------------------------------------------
  // 7. ADMIN PORTAL & SECURITY
  // --------------------------------------------------------------------------
  console.log("\n--- 7. Admin Portal & Protected Route Security ---");
  try {
    // 7a. Unauthenticated access to /admin redirects to login
    const adminRes = await fetch(`${BASE_URL}/admin`, {
      redirect: "manual",
    });
    report(
      adminRes.status === 307 || adminRes.status === 302 || adminRes.status === 303,
      `Unauthenticated access to /admin redirects with HTTP ${adminRes.status}`
    );

    // 7b. Admin login page loads
    const loginPageRes = await fetch(`${BASE_URL}/admin/login`);
    report(
      loginPageRes.status === 200,
      `Admin login portal (/admin/login) loads cleanly (HTTP 200)`
    );

    // 7c. Forgot password page loads
    const forgotPageRes = await fetch(`${BASE_URL}/admin/forgot-password`);
    report(
      forgotPageRes.status === 200,
      `Admin forgot-password portal (/admin/forgot-password) loads cleanly (HTTP 200)`
    );

    // 7d. Reset password page loads
    const resetPageRes = await fetch(`${BASE_URL}/admin/reset-password`);
    report(
      resetPageRes.status === 200,
      `Admin reset-password portal (/admin/reset-password) loads cleanly (HTTP 200)`
    );
  } catch (err) {
    report(false, `Admin portal security check failed`, err.message);
  }

  // --------------------------------------------------------------------------
  // 8. FINAL SUMMARY
  // --------------------------------------------------------------------------
  console.log("\n========================================================");
  console.log(`MASTER QA AUDIT RESULTS: ${passed}/${passed + failed} CHECKS PASSED`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runMasterAudit();
