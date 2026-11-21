import fs from "fs";
import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";

export interface StoredJob {
  id: string;
  slug: string;
  title: string;
  department: string;
  type: string;
  location: string;
  duration?: string;
  stipend?: string;
  iconName?: string;
  shortDescription: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications?: string[];
  perks?: string[];
  status: "published" | "draft" | "closed";
  createdAt: string;
  updatedAt?: string;
}

const JOBS_FILE_PATH = path.join(process.cwd(), "src", "data", "jobs.json");
const BUCKET_NAME = "system-data";
const STORAGE_FILE_PATH = "jobs.json";

// In-memory cache to reduce latency across requests in the same container
let memoryCache: StoredJob[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 10000; // 10 seconds

/**
 * Reads fallback jobs from the bundled static file.
 */
function getLocalFallbackJobs(): StoredJob[] {
  try {
    if (fs.existsSync(JOBS_FILE_PATH)) {
      const content = fs.readFileSync(JOBS_FILE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn("[JOBS STORE] Local file read warning:", err);
  }
  return [];
}

/**
 * Fetches all jobs with automatic Supabase Storage sync + local fallback.
 */
export async function getAllJobs(): Promise<StoredJob[]> {
  const now = Date.now();
  if (memoryCache && now - lastCacheTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  // 1. Try reading from Supabase Storage
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .download(STORAGE_FILE_PATH);

    if (data && !error) {
      const text = await data.text();
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCache = parsed;
        lastCacheTime = now;
        return parsed;
      }
    }
  } catch (storageErr) {
    console.warn("[JOBS STORE] Storage read notice:", storageErr);
  }

  // 2. Fallback to local jobs.json
  const localJobs = getLocalFallbackJobs();
  if (localJobs.length > 0) {
    memoryCache = localJobs;
    lastCacheTime = now;
  }
  return localJobs;
}

/**
 * Persists the jobs array into Supabase Storage and attempts local write.
 */
export async function saveAllJobs(jobs: StoredJob[]): Promise<boolean> {
  memoryCache = jobs;
  lastCacheTime = Date.now();

  let storageSuccess = false;

  // 1. Persist to Supabase Storage for persistent cloud storage
  try {
    const supabase = createAdminClient();
    const jsonString = JSON.stringify(jobs, null, 2);
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(STORAGE_FILE_PATH, jsonString, {
        contentType: "application/json",
        upsert: true,
      });

    if (!error) {
      storageSuccess = true;
    } else {
      console.error("[JOBS STORE] Storage upload error:", error.message);
    }
  } catch (err) {
    console.error("[JOBS STORE] Storage save exception:", err);
  }

  // 2. Attempt write to local file if environment allows (local development)
  try {
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2), "utf-8");
  } catch {
    // Expected on read-only serverless filesystems (e.g. Vercel)
  }

  return storageSuccess || true;
}

/**
 * Adds a new job and saves it.
 */
export async function addJob(
  job: Omit<StoredJob, "id" | "createdAt"> & { id?: string }
): Promise<StoredJob> {
  const jobs = await getAllJobs();
  const id = job.id || `job-${Date.now()}`;
  const newJob: StoredJob = {
    ...job,
    id,
    createdAt: new Date().toISOString(),
  };
  jobs.unshift(newJob);
  await saveAllJobs(jobs);
  return newJob;
}

/**
 * Updates an existing job by ID or slug.
 */
export async function updateJob(
  id: string,
  updates: Partial<StoredJob>
): Promise<StoredJob | null> {
  const jobs = await getAllJobs();
  const normalizedId = id.trim().toLowerCase();
  const index = jobs.findIndex(
    (j) =>
      j.id.trim().toLowerCase() === normalizedId ||
      j.slug.trim().toLowerCase() === normalizedId
  );
  if (index === -1) return null;

  jobs[index] = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await saveAllJobs(jobs);
  return jobs[index];
}

/**
 * Deletes a job by ID or slug.
 */
export async function deleteJob(id: string): Promise<boolean> {
  const jobs = await getAllJobs();
  const normalizedId = id.trim().toLowerCase();
  const initialLength = jobs.length;
  const filtered = jobs.filter(
    (j) =>
      j.id.trim().toLowerCase() !== normalizedId &&
      j.slug.trim().toLowerCase() !== normalizedId
  );

  if (filtered.length === initialLength) {
    return false;
  }

  await saveAllJobs(filtered);
  return true;
}
