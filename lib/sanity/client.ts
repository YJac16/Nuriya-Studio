import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "@/sanity/env";

export function getSanityClient() {
  if (!isSanityConfigured()) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
    stega: { enabled: false },
    token: process.env.SANITY_API_READ_TOKEN,
  });
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    });
  } catch {
    return null;
  }
}
