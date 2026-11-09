import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import type { Database, AdminRole } from "../src/types/supabase";

// Load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      process.env[key] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Parse arguments
const args = process.argv.slice(2);
let email = "";
let password = "";
let role: AdminRole = "superadmin";

args.forEach((arg) => {
  if (arg.startsWith("email=")) email = arg.replace("email=", "").trim();
  if (arg.startsWith("password=")) password = arg.replace("password=", "").trim();
  if (arg.startsWith("role=")) role = arg.replace("role=", "").trim() as AdminRole;
});

// Default fallback for development/testing if not specified
if (!email || !password) {
  email = email || "admin@deeplayersolutions.com";
  password = password || "DeepLayerAdmin2026!";
  console.log(`No credentials passed. Using default admin credentials:`);
  console.log(`Email:    ${email}`);
  console.log(`Password: ${password}`);
  console.log(`(You can supply custom credentials: npx tsx scripts/create-admin.ts email=... password=... role=superadmin)\n`);
}

async function provisionAdmin() {
  console.log(`Provisioning admin user: ${email} [${role}]...`);

  // Check if user already exists
  const { data: listData } = await supabase.auth.admin.listUsers();
  const existingUser = listData?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

  let userId: string;

  if (existingUser) {
    userId = existingUser.id;
    console.log(`- User already exists in auth.users (ID: ${userId}). Updating password...`);
    const { error: updateErr } = await supabase.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
    });
    if (updateErr) {
      console.error("Failed to update user password:", updateErr.message);
      process.exit(1);
    }
  } else {
    console.log(`- Creating new user in auth.users...`);
    const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role },
    });

    if (createErr || !newUser.user) {
      console.error("Failed to create user in auth.users:", createErr?.message);
      process.exit(1);
    }
    userId = newUser.user.id;
    console.log(`- User created successfully (ID: ${userId}).`);
  }

  // Upsert into admin_profiles
  console.log(`- Recording in public.admin_profiles table...`);
  const { error: profileErr } = await supabase.from("admin_profiles").upsert(
    {
      id: userId,
      role,
    },
    { onConflict: "id" }
  );

  if (profileErr) {
    console.error("Failed to upsert admin profile:", profileErr.message);
    process.exit(1);
  }

  console.log("\n=======================================================");
  console.log("   ADMIN USER SUCCESSFULLY PROVISIONED!                ");
  console.log("=======================================================");
  console.log(`Email:    ${email}`);
  console.log(`Role:     ${role}`);
  console.log(`User ID:  ${userId}`);
  console.log(`Login at: http://localhost:3000/admin/login`);
  console.log("=======================================================\n");
}

provisionAdmin().catch((err) => {
  console.error("Provisioning failed:", err);
  process.exit(1);
});

