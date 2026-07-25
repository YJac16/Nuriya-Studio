import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "@/sanity/env";
import type { SanityImage } from "@/lib/sanity/types";

const builder = isSanityConfigured()
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImage) {
  if (!builder || !source?.asset) return null;
  return builder.image(source);
}
