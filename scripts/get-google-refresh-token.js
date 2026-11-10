/**
 * DeepLayer Solutions — Google Cloud Gmail API Refresh Token Helper
 *
 * This interactive CLI tool helps you obtain a valid `GOOGLE_REFRESH_TOKEN`
 * with `https://www.googleapis.com/auth/gmail.send` scope.
 *
 * Usage:
 *   node scripts/get-google-refresh-token.js
 */

const { google } = require("googleapis");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

// Load .env.local if present
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const [k, ...v] = trimmed.split("=");
    if (k && v.length) {
      process.env[k.trim()] = v.join("=").trim();
    }
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("==================================================================");
  console.log("DeepLayer Solutions — Google Cloud Gmail API Token Setup");
  console.log("==================================================================\n");

  const defaultClientId =
    process.env.GOOGLE_CLIENT_ID ||
    "197585439582-jh6f9bk079b3i5nb5pduag1ggc1ok949.apps.googleusercontent.com";

  let clientId = await ask(`1. Enter Google Client ID [default: ${defaultClientId}]: `);
  clientId = clientId.trim() || defaultClientId;

  let clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  if (!clientSecret) {
    clientSecret = await ask("2. Enter Google Client Secret (from Google Cloud Console): ");
    clientSecret = clientSecret.trim();
  } else {
    console.log(`2. Google Client Secret found in .env.local`);
  }

  if (!clientSecret) {
    console.error("\n[ERROR] Client Secret is required to generate a refresh token.");
    rl.close();
    process.exit(1);
  }

  // Use OAuth Playground redirect URI or custom
  const redirectUri = "https://developers.google.com/oauthplayground";
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/gmail.send"],
  });

  console.log("\n------------------------------------------------------------------");
  console.log("Step A: Ensure Authorized Redirect URI in Google Cloud Console:");
  console.log(`Make sure "${redirectUri}" is added to your OAuth 2.0 Client's Authorized Redirect URIs.`);
  console.log("\nStep B: Open the authorization URL below in your browser:");
  console.log(authUrl);
  console.log("------------------------------------------------------------------\n");

  const code = await ask("3. Enter the authorization code from Google: ");
  rl.close();

  try {
    const { tokens } = await oauth2Client.getToken(code.trim());
    console.log("\n==================================================================");
    console.log("SUCCESS! Here are your Google API tokens:");
    console.log("==================================================================");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token || "(No new refresh token provided - re-run with prompt: consent)"}`);
    console.log("==================================================================");

    if (tokens.refresh_token && fs.existsSync(envPath)) {
      let content = fs.readFileSync(envPath, "utf-8");
      if (content.includes("GOOGLE_REFRESH_TOKEN=")) {
        content = content.replace(/GOOGLE_REFRESH_TOKEN=.*(\r?\n|$)/, `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
      } else {
        content += `\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`;
      }
      if (clientSecret && !content.includes(`GOOGLE_CLIENT_SECRET=${clientSecret}`)) {
        content = content.replace(/GOOGLE_CLIENT_SECRET=.*(\r?\n|$)/, `GOOGLE_CLIENT_SECRET=${clientSecret}\n`);
      }
      fs.writeFileSync(envPath, content, "utf-8");
      console.log("Updated .env.local automatically!");
    }
  } catch (err) {
    console.error("\n[ERROR] Failed to exchange code for tokens:", err.message);
  }
}

main();

