import fs from "fs";
import path from "path";

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
  status: "published" | "draft" | "closed";
  createdAt: string;
  updatedAt?: string;
}

const JOBS_FILE_PATH = path.join(process.cwd(), "src", "data", "jobs.json");

export function getAllJobs(): StoredJob[] {
  try {
    if (!fs.existsSync(JOBS_FILE_PATH)) {
      return [];
    }
    const content = fs.readFileSync(JOBS_FILE_PATH, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("[JOBS STORE] Error reading jobs.json:", err);
    return [];
  }
}

export function saveAllJobs(jobs: StoredJob[]): boolean {
  try {
    fs.writeFileSync(JOBS_FILE_PATH, JSON.stringify(jobs, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[JOBS STORE] Error writing to jobs.json:", err);
    return false;
  }
}

export function addJob(job: Omit<StoredJob, "id" | "createdAt"> & { id?: string }): StoredJob {
  const jobs = getAllJobs();
  const id = job.id || `job-${Date.now()}`;
  const newJob: StoredJob = {
    ...job,
    id,
    createdAt: new Date().toISOString(),
  };
  jobs.unshift(newJob);
  saveAllJobs(jobs);
  return newJob;
}

export function updateJob(id: string, updates: Partial<StoredJob>): StoredJob | null {
  const jobs = getAllJobs();
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return null;

  jobs[index] = {
    ...jobs[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveAllJobs(jobs);
  return jobs[index];
}

export function deleteJob(id: string): boolean {
  const jobs = getAllJobs();
  const filtered = jobs.filter((j) => j.id !== id);
  if (filtered.length === jobs.length) return false;
  return saveAllJobs(filtered);
}
