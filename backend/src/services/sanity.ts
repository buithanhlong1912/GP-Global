import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // We need real-time data for mutations
});

// Create a document
export async function createDocument<T extends Record<string, unknown>>(
  type: string,
  data: T
): Promise<T & { _id: string }> {
  return sanityClient.create({
    _type: type,
    ...data,
  });
}

// Update a document
export async function updateDocument<T extends Record<string, unknown>>(
  id: string,
  data: Partial<T>
): Promise<T> {
  return sanityClient.patch(id).set(data).commit();
}

// Delete a document
export async function deleteDocument(id: string): Promise<void> {
  await sanityClient.delete(id);
}

// Fetch documents with GROQ query
export async function fetchDocuments<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T[]> {
  return sanityClient.fetch(query, params);
}

// Fetch single document
export async function fetchDocument<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  return sanityClient.fetch(query, params);
}

