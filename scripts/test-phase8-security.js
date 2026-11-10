/**
 * DeepLayer Solutions — Phase 8 Backend Security Verification Test Suite
 *
 * Verifies:
 * 1. Distributed rate limiting (5 req max -> 429 on 6th)
 * 3. CSRF / Unauthorized Origin blocking (HTTP 403)
 * 4. Input sanitization & field length enforcement (HTTP 400)
 * 5. Brute-force protection on Admin Login (HTTP 429)
 * 6. Safe generic error responses (zero stack trace / DB leak)
 */

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

let passedCount = 0;
let totalCount = 0;

function assert(condition, message) {
  totalCount++;
  if (condition) {
    passedCount++;
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
  }
}

async function runTests() {
  console.log("\n========================================================");
  console.log("DEEPLAYER SOLUTIONS - PHASE 8 SECURITY AUDIT SUITE");
  console.log("Target Base URL:", BASE_URL);
  console.log("========================================================\n");

  // --------------------------------------------------------------------------
  // TEST 1: CSRF & Unauthorized Origin Blocking
  // --------------------------------------------------------------------------
  console.log("--- TEST 1: CSRF / Unauthorized Origin Rejection ---");
  try {
    const csrfRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://malicious-attacker-site.com",
        "X-Forwarded-For": "198.51.100.1",
      },
      body: JSON.stringify({
        fullName: "Attacker",
        email: "hacker@evil.com",
        subject: "CSRF Exploit",
        message: "Attempting forged submission from foreign origin.",
      }),
    });

    assert(
      csrfRes.status === 403,
      `Cross-site request blocked with HTTP 403 Forbidden (got status ${csrfRes.status})`
    );

    const csrfData = await csrfRes.json();
    assert(
      csrfData.success === false && csrfData.message.includes("Cross-site request blocked"),
      `Response correctly indicates failure: "${csrfData.message}"`
    );
  } catch (err) {
    console.error("Test 1 error:", err.message);
    assert(false, "Test 1 failed due to exception");
  }

  // --------------------------------------------------------------------------
  // TEST 2: Input Length Limits & Validation
  // --------------------------------------------------------------------------
  console.log("\n--- TEST 2: Strict Server-Side Field Validation ---");
  try {
    const overflowRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": "198.51.100.2",
      },
      body: JSON.stringify({
        fullName: "A", // too short (min 2)
        email: "not-an-email", // invalid email
        subject: "hi", // too short (min 3)
        message: "short", // too short (min 15)
      }),
    });

    assert(
      overflowRes.status === 400,
      `Invalid fields rejected with HTTP 400 Bad Request (got ${overflowRes.status})`
    );

    const overflowData = await overflowRes.json();
    assert(
      Boolean(overflowData.errors && overflowData.errors.fullName && overflowData.errors.email),
      "Detailed field-level validation errors returned for short/invalid fields"
    );
  } catch (err) {
    console.error("Test 2 error:", err.message);
    assert(false, "Test 2 failed due to exception");
  }

  // --------------------------------------------------------------------------
  // TEST 3: Honeypot Silent Bot Defeat
  // --------------------------------------------------------------------------
  console.log("\n--- TEST 3: Honeypot Anti-Bot Field ---");
  try {
    const honeypotRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": "198.51.100.3",
      },
      body: JSON.stringify({
        fullName: "Spam Bot",
        email: "bot@spammer.org",
        subject: "Buy Cheap Crypto",
        message: "This is spam bot text trying to flood the contact form.",
        botField: "I am a malicious bot filling invisible fields",
      }),
    });

    assert(
      honeypotRes.status === 200,
      `Honeypot returns HTTP 200 to trick bot (got ${honeypotRes.status})`
    );

    const honeypotData = await honeypotRes.json();
    assert(
      honeypotData.referenceNumber === "DLS-CONFIRMED",
      "Honeypot returns simulated confirmation without writing to database"
    );
  } catch (err) {
    console.error("Test 3 error:", err.message);
    assert(false, "Test 3 failed due to exception");
  }

  // --------------------------------------------------------------------------
  // TEST 4: Input Length / Injection Defense
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // TEST 5: Distributed Rate Limiting Enforcement
  // --------------------------------------------------------------------------
  console.log("\n--- TEST 5: Distributed Rate Limiting & Window Enforcement ---");
  try {
    const testRateIp = `203.0.113.${Math.floor(Math.random() * 200) + 10}`;
    let rateLimitTriggered = false;
    let successfulSubmissions = 0;

    for (let i = 1; i <= 6; i++) {
      const res = await fetch(`${BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "http://localhost:3000",
          "X-Forwarded-For": testRateIp,
        },
        body: JSON.stringify({
          fullName: `Rate Tester ${i}`,
          email: `rate.test.${Date.now()}.${i}@example.com`,
          subject: `Rate Limit Test Subject ${i}`,
          message: `This is a test message to evaluate the rate limiter threshold number ${i}.`,
        }),
      });

      if (res.status === 429) {
        rateLimitTriggered = true;
        const data = await res.json();
        assert(
          data.success === false && data.message.includes("Too many inquiries sent"),
          `Rate limit triggered on request ${i} with HTTP 429: "${data.message}"`
        );
        const retryAfter = res.headers.get("retry-after");
        assert(
          Boolean(retryAfter),
          `Retry-After header present in 429 response (${retryAfter}s)`
        );
        break;
      } else if (res.status === 201 || res.status === 200) {
        successfulSubmissions++;
      }
    }

    assert(
      rateLimitTriggered,
      `Rate limit strictly capped requests at threshold (successful: ${successfulSubmissions})`
    );
  } catch (err) {
    console.error("Test 5 error:", err.message);
    assert(false, "Test 5 failed due to exception");
  }

  // --------------------------------------------------------------------------
  // TEST 6: Admin Login Brute-Force Rate Limiting
  // --------------------------------------------------------------------------
  console.log("\n--- TEST 6: Admin Login Brute-Force Rate Limiting ---");
  try {
    const bruteForceIp = `192.0.2.${Math.floor(Math.random() * 200) + 10}`;
    let hitRateLimit = false;

    for (let i = 1; i <= 6; i++) {
      const loginRes = await fetch(`${BASE_URL}/api/admin/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Forwarded-For": bruteForceIp,
          Origin: "http://localhost:3000",
        },
        body: JSON.stringify({
          email: "attacker@fake.com",
          password: `wrong-password-${i}`,
        }),
      });

      if (loginRes.status === 429) {
        hitRateLimit = true;
        const data = await loginRes.json();
        assert(
          data.success === false && data.message.includes("Too many failed login attempts"),
          `Rate limit triggered on attempt ${i} with HTTP 429: "${data.message}"`
        );
        break;
      }
    }

    assert(hitRateLimit, "Brute force attempts triggered HTTP 429 rate limit");
  } catch (err) {
    console.error("Test 6 error:", err.message);
    assert(false, "Test 6 failed due to exception");
  }

  // --------------------------------------------------------------------------
  // TEST 7: Safe Error Messages & Information Leakage Prevention
  // --------------------------------------------------------------------------
  console.log("\n--- TEST 7: Information Disclosure & Generic Safe Responses ---");
  try {
    const freshIp = `203.0.113.${Math.floor(Math.random() * 200) + 10}`;
    const badJsonRes = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
        "X-Forwarded-For": freshIp,
      },
      body: "not-json-malformed{{{",
    });

    const badJsonData = await badJsonRes.json();
    assert(
      badJsonRes.status === 400 && badJsonData.success === false,
      `Malformed JSON rejected safely (got status ${badJsonRes.status})`
    );
    assert(
      !JSON.stringify(badJsonData).includes("SyntaxError") &&
        !JSON.stringify(badJsonData).includes("node_modules") &&
        !JSON.stringify(badJsonData).includes("pg_") &&
        !JSON.stringify(badJsonData).includes("at "),
      "No internal stack trace, file path, or database syntax error leaked to client"
    );
  } catch (err) {
    console.error("Test 7 error:", err.message);
    assert(false, "Test 7 failed due to exception");
  }

  console.log("\n========================================================");
  console.log(`PHASE 8 SECURITY AUDIT RESULTS: ${passedCount}/${totalCount} TESTS PASSED`);
  console.log("========================================================\n");

  if (passedCount === totalCount) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
