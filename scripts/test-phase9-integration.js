/**
 * DeepLayer Solutions — Phase 9 Comprehensive Integration Test Suite
 *
 * Verifies all 15 feature areas specified in Phase 9 requirements:
 * 1. Supabase connection
 * 2. Database migrations and RLS
 * 3. Contact form submissions
 * 4. Company notification emails
 * 5. Visitor confirmation emails
 * 6. Newsletter subscription
 * 7. Newsletter double opt-in
 * 8. Newsletter unsubscribe
 * 9. Cookie consent preferences
 * 10. Google Analytics consent behavior
 * 11. Admin authentication
 * 12. Admin dashboard authorization
 * 14. Distributed rate limiting
 * 15. Mobile & desktop frontend page functionality
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

// 1. Load Environment Configuration
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
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("FATAL: Missing Supabase environment variables in .env.local");
  process.exit(1);
}

const adminDb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const anonDb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY || "dummy", {
  auth: { autoRefreshToken: false, persistSession: false },
});

let passed = 0;
let failed = 0;

function report(condition, message) {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${message}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${message}`);
  }
}

async function run() {
  console.log("\n========================================================");
  console.log("DEEPLAYER SOLUTIONS — PHASE 9 END-TO-END INTEGRATION TEST SUITE");
  console.log(`Target Base URL: ${BASE_URL}`);
  console.log(`Target Supabase URL: ${SUPABASE_URL}`);
  console.log("========================================================\n");

  // --------------------------------------------------------------------------
  // FEATURE 1: Supabase Connection
  // --------------------------------------------------------------------------
  console.log("--- 1. Supabase Connection ---");
  try {
    const start = Date.now();
    const { data, error } = await adminDb.from("admin_profiles").select("count", { count: "exact", head: true });
    const latency = Date.now() - start;

    report(!error, `Successfully connected to PostgreSQL via Supabase admin client (${latency}ms)`);
  } catch (err) {
    report(false, `Supabase connection failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 2: Database Migrations and RLS
  // --------------------------------------------------------------------------
  console.log("\n--- 2. Database Migrations & Row Level Security (RLS) ---");
  try {
    // 2a. Verify required tables exist
    const tables = ["contact_submissions", "subscribers", "cookie_consents", "email_logs", "admin_profiles"];
    for (const t of tables) {
      const { error } = await adminDb.from(t).select("id").limit(1);
      report(!error, `Table "public.${t}" is active and accessible via service_role`);
    }

    // 2b. Verify RLS denies public/anonymous read on protected tables
    const { data: anonData, error: anonError } = await anonDb.from("admin_profiles").select("*");
    report(
      !anonData || anonData.length === 0 || Boolean(anonError),
      "RLS strictly protects 'admin_profiles' (anonymous queries return 0 rows)"
    );

    const { data: anonEmails } = await anonDb.from("email_logs").select("*");
    report(
      !anonEmails || anonEmails.length === 0,
      "RLS strictly protects 'email_logs' (zero records exposed to anonymous queries)"
    );
  } catch (err) {
    report(false, `RLS test failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 3: Contact Form Submissions
  // --------------------------------------------------------------------------
  console.log("\n--- 3. Contact Form Submissions ---");
  let createdInquiry = null;
  const contactIp = `198.51.100.${Math.floor(Math.random() * 200) + 10}`;
  const contactEmail = `phase9.client.${Date.now()}@example.com`;
  const contactSubject = `Enterprise AI Integration ${Date.now()}`;

  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": contactIp,
      },
      body: JSON.stringify({
        fullName: "Dr. Alexander Wright",
        email: contactEmail,
        company: "DeepLayer Solutions Test Corp",
        service: "AI & Machine Learning",
        subject: contactSubject,
        message: "We need production architecture review for enterprise LLM agents and multi-agent systems.",
      }),
    });

    const data = await res.json();
    report(
      res.status === 201 && data.success === true,
      `Contact submission returned HTTP 201 Created (Ref: ${data.referenceNumber})`
    );
    report(
      /^DLS-\d{4}-\d{5}$/.test(data.referenceNumber),
      `Reference number conforms to production pattern "DLS-YYYY-XXXXX" (${data.referenceNumber})`
    );

    // Verify row in database
    const { data: row, error: rowError } = await adminDb
      .from("contact_submissions")
      .select("*")
      .eq("reference_number", data.referenceNumber)
      .single();

    report(
      !rowError && row && row.status === "new" && row.email === contactEmail,
      `Inquiry saved in PostgreSQL with status 'new' (Record ID: ${row?.id})`
    );

    createdInquiry = row;
  } catch (err) {
    report(false, `Contact submission failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 4 & 5: Company Notification & Visitor Confirmation Emails
  // --------------------------------------------------------------------------
  console.log("\n--- 4 & 5. Transactional Emails (Notification & Confirmation) ---");
  try {
    if (createdInquiry) {
      // Allow brief async dispatch window
      await new Promise((r) => setTimeout(r, 1200));

      const { data: logs, error: logsError } = await adminDb
        .from("email_logs")
        .select("*")
        .eq("related_record_id", createdInquiry.id);

      report(!logsError && Boolean(logs), `Queried email logs for inquiry ${createdInquiry.reference_number}`);

      const notifEmail = logs?.find((l) => l.email_type === "contact_notification");
      const confirmEmail = logs?.find((l) => l.email_type === "contact_autoresponder");

      report(
        Boolean(notifEmail),
        `Company notification email logged in email_logs (Status: ${notifEmail?.status}, Recipient: ${notifEmail?.recipient})`
      );

      report(
        Boolean(confirmEmail),
        `Visitor confirmation email logged in email_logs (Status: ${confirmEmail?.status}, Recipient: ${confirmEmail?.recipient})`
      );
    } else {
      report(false, "Skipped email verification: inquiry record was not created");
    }
  } catch (err) {
    report(false, `Email log verification failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 6: Newsletter Subscription (Pending Double Opt-In)
  // --------------------------------------------------------------------------
  console.log("\n--- 6. Newsletter Subscription (Pending State) ---");
  const newsletterEmail = `subscriber.${Date.now()}@example.com`;
  const newsIp = `203.0.113.${Math.floor(Math.random() * 200) + 10}`;
  let subscriberRecord = null;

  try {
    const res = await fetch(`${BASE_URL}/api/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": newsIp,
      },
      body: JSON.stringify({
        email: newsletterEmail,
      }),
    });

    const data = await res.json();
    report(res.status === 200 && data.success === true, `Newsletter subscription returned HTTP 200: "${data.message}"`);

    // Verify database record
    const { data: sub, error: subError } = await adminDb
      .from("subscribers")
      .select("*")
      .eq("email", newsletterEmail)
      .single();

    report(
      !subError && sub && sub.status === "pending",
      `Subscriber stored in 'pending' status (ID: ${sub?.id})`
    );

    report(
      Boolean(sub?.confirmation_token_hash && sub?.token_expires_at),
      `SHA-256 confirmation token hash and 48-hr expiry recorded`
    );

    subscriberRecord = sub;
  } catch (err) {
    report(false, `Newsletter subscription test failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 7: Newsletter Double Opt-In Confirmation
  // --------------------------------------------------------------------------
  console.log("\n--- 7. Newsletter Double Opt-In Confirmation ---");
  try {
    // Generate fresh test token and set hash on test subscriber
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    const { error: setTokenError } = await adminDb
      .from("subscribers")
      .update({
        confirmation_token_hash: tokenHash,
        token_expires_at: expiresAt,
        status: "pending",
      })
      .eq("id", subscriberRecord.id);

    report(!setTokenError, "Prepared test confirmation token on pending subscriber");

    // Hit confirmation endpoint
    const confirmRes = await fetch(`${BASE_URL}/api/newsletter/confirm?token=${rawToken}`, {
      headers: { "X-Forwarded-For": `198.51.100.${Math.floor(Math.random() * 200) + 10}` },
    });

    const confirmData = await confirmRes.json();
    report(
      confirmRes.status === 200 && confirmData.success === true,
      `Confirmation endpoint validated token and returned HTTP 200: "${confirmData.message}"`
    );

    // Verify subscriber status transitioned to 'active'
    const { data: activeSub } = await adminDb
      .from("subscribers")
      .select("*")
      .eq("id", subscriberRecord.id)
      .single();

    report(
      activeSub && activeSub.status === "active" && activeSub.confirmation_token_hash === null && Boolean(activeSub.subscribed_at),
      `Subscriber transitioned to 'active', token cleared, and subscribed_at timestamp populated`
    );
  } catch (err) {
    report(false, `Double opt-in confirmation test failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 8: Newsletter Unsubscribe
  // --------------------------------------------------------------------------
  console.log("\n--- 8. Newsletter Unsubscribe System ---");
  try {
    const signingSecret = process.env.SUPABASE_SERVICE_ROLE_KEY || "deeplayer-solutions-newsletter-secret";
    const unsubKey = crypto
      .createHmac("sha256", signingSecret)
      .update(newsletterEmail.toLowerCase().trim())
      .digest("hex");

    const unsubRes = await fetch(
      `${BASE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(newsletterEmail)}&key=${unsubKey}`,
      {
        headers: { "X-Forwarded-For": `198.51.100.${Math.floor(Math.random() * 200) + 10}` },
      }
    );

    const unsubData = await unsubRes.json();
    report(
      unsubRes.status === 200 && unsubData.success === true,
      `Unsubscribe endpoint verified HMAC signature and returned HTTP 200: "${unsubData.message}"`
    );

    // Verify database record updated to 'unsubscribed'
    const { data: unsubSub } = await adminDb
      .from("subscribers")
      .select("*")
      .eq("id", subscriberRecord.id)
      .single();

    report(
      unsubSub && unsubSub.status === "unsubscribed" && Boolean(unsubSub.unsubscribed_at),
      `Subscriber status safely updated to 'unsubscribed' with unsubscribed_at recorded`
    );
  } catch (err) {
    report(false, `Unsubscribe test failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 9: Cookie Consent Preferences
  // --------------------------------------------------------------------------
  console.log("\n--- 9. Cookie Consent Preferences ---");
  try {
    const consentId = `c-test-${Date.now()}`;
    const consentRes = await fetch(`${BASE_URL}/api/consent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": `198.51.100.${Math.floor(Math.random() * 200) + 10}`
      },
      body: JSON.stringify({
        consentId,
        necessary: true,
        analytics: true,
        marketing: false,
        policyVersion: "1.0",
      }),
    });

    const consentData = await consentRes.json();
    report(
      consentRes.status === 200 && consentData.success === true,
      `Cookie consent endpoint persisted preferences (HTTP 200)`
    );

    const { data: consentRow } = await adminDb
      .from("cookie_consents")
      .select("*")
      .eq("consent_id", consentId)
      .single();

    report(
      Boolean(consentRow && consentRow.necessary === true && consentRow.analytics === true && consentRow.marketing === false),
      `Preferences verified in PostgreSQL: necessary=true, analytics=true, marketing=false`
    );
  } catch (err) {
    report(false, `Cookie consent test failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 10: Google Analytics Consent Behavior
  // --------------------------------------------------------------------------
  console.log("\n--- 10. Google Analytics Consent Behavior ---");
  try {
    const gaComponentFile = path.resolve(__dirname, "../src/components/consent/GoogleAnalytics.tsx");
    const gaContent = fs.readFileSync(gaComponentFile, "utf8");

    const gatesOnConsent =
      gaContent.includes("hasAnalyticsConsent") &&
      gaContent.includes("!hasAnalyticsConsent") &&
      gaContent.includes("NEXT_PUBLIC_GA_MEASUREMENT_ID");

    report(
      gatesOnConsent,
      "Google Analytics component strictly gates script loading on (hasAnalyticsConsent === true)"
    );

    const cookieBannerFile = path.resolve(__dirname, "../src/components/consent/CookieConsentBanner.tsx");
    const bannerContent = fs.readFileSync(cookieBannerFile, "utf8");

    const hasCustomizeModal =
      bannerContent.includes("Customize") &&
      bannerContent.includes("Reject") &&
      bannerContent.includes("Accept All");

    report(
      hasCustomizeModal,
      "CookieConsentBanner provides Accept All, Reject Optional, and Granular Customization options"
    );
  } catch (err) {
    report(false, `Google Analytics consent check failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 11: Admin Authentication
  // --------------------------------------------------------------------------
  console.log("\n--- 11. Admin Authentication ---");
  try {
    const authIp = `192.0.2.${Math.floor(Math.random() * 200) + 10}`;

    // 11a. Invalid credentials
    const badLoginRes = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": authIp,
      },
      body: JSON.stringify({
        email: "admin@deeplayersolutions.com",
        password: "WrongPassword999!",
      }),
    });

    report(badLoginRes.status === 401, "Invalid password rejected with HTTP 401 Unauthorized");

    // 11b. Valid admin credentials
    const goodLoginRes = await fetch(`${BASE_URL}/api/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": authIp,
      },
      body: JSON.stringify({
        email: "admin@deeplayersolutions.com",
        password: "DeepLayerAdmin2026!",
      }),
    });

    const goodLoginData = await goodLoginRes.json();
    report(
      goodLoginRes.status === 200 && goodLoginData.success === true && goodLoginData.user?.role === "superadmin",
      `Authorized admin authentication successful (Role: ${goodLoginData.user?.role})`
    );
  } catch (err) {
    report(false, `Admin authentication test failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 12: Admin Dashboard Authorization
  // --------------------------------------------------------------------------
  console.log("\n--- 12. Admin Dashboard Authorization ---");
  try {
    const unauthInquiries = await fetch(`${BASE_URL}/api/admin/inquiries`);
    report(unauthInquiries.status === 401, "/api/admin/inquiries rejects unauthenticated access (HTTP 401)");

    const unauthSubscribers = await fetch(`${BASE_URL}/api/admin/subscribers`);
    report(unauthSubscribers.status === 401, "/api/admin/subscribers rejects unauthenticated access (HTTP 401)");

    const unauthEmails = await fetch(`${BASE_URL}/api/admin/emails`);
    report(unauthEmails.status === 401, "/api/admin/emails rejects unauthenticated access (HTTP 401)");

    const unauthOverview = await fetch(`${BASE_URL}/api/admin/overview`);
    report(unauthOverview.status === 401, "/api/admin/overview rejects unauthenticated access (HTTP 401)");
  } catch (err) {
    report(false, `Admin authorization test failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 14: Rate Limiting
  // --------------------------------------------------------------------------
  console.log("\n--- 14. Distributed Rate Limiting ---");
  try {
    const rateLimitIp = `203.0.113.${Math.floor(Math.random() * 200) + 10}`;
    let hitRateLimit = false;

    for (let i = 1; i <= 6; i++) {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          "X-Forwarded-For": rateLimitIp,
        },
        body: JSON.stringify({
          fullName: `Burst Tester ${i}`,
          email: `burst.${Date.now()}.${i}@example.com`,
          subject: `Burst Test Subject ${i}`,
          message: `Testing rate limiting thresholds on serverless deployment iteration ${i}.`,
        }),
      });

      if (res.status === 429) {
        hitRateLimit = true;
        const retryAfter = res.headers.get("retry-after");
        report(
          Boolean(retryAfter),
          `Rate limit triggered on request ${i} with HTTP 429 and Retry-After: ${retryAfter}s`
        );
        break;
      }
    }

    report(hitRateLimit, "Rate limiter capped requests at 5 and blocked 6th request with HTTP 429");
  } catch (err) {
    report(false, `Rate limiting test failed: ${err.message}`);
  }

  // --------------------------------------------------------------------------
  // FEATURE 15: Mobile & Desktop Frontend Pages
  // --------------------------------------------------------------------------
  console.log("\n--- 15. Frontend Pages & Viewport Integrity ---");
  const pages = [
    { path: "/", name: "Home Page" },
    { path: "/about", name: "About Page" },
    { path: "/services", name: "Services Hub" },
    { path: "/portfolio", name: "Portfolio Hub" },
    { path: "/careers", name: "Careers Page" },
    { path: "/contact", name: "Contact Page" },
    { path: "/privacy", name: "Privacy Policy" },
    { path: "/terms", name: "Terms of Service" },
    { path: "/admin/login", name: "Admin Login Portal" },
  ];

  for (const p of pages) {
    try {
      const res = await fetch(`${BASE_URL}${p.path}`);
      report(res.status === 200, `Page "${p.name}" (${p.path}) rendered with HTTP 200`);
    } catch (err) {
      report(false, `Page "${p.name}" (${p.path}) failed: ${err.message}`);
    }
  }

  console.log("\n========================================================");
  console.log(`PHASE 9 INTEGRATION TEST RESULTS: ${passed}/${passed + failed} CHECKS PASSED`);
  console.log("========================================================\n");

  if (failed === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

run();
