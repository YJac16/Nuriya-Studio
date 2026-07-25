export const CONSENT_STORAGE_KEY = "nuriya-cookie-consent";

export type ConsentValue = "accepted" | "rejected";

export function getGaId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_ID || undefined;
}

export function getClarityId(): string | undefined {
  return process.env.NEXT_PUBLIC_CLARITY_ID || undefined;
}

export function getMetaPixelId(): string | undefined {
  return process.env.NEXT_PUBLIC_META_PIXEL_ID || undefined;
}

export function hasAnalyticsConfigured(): boolean {
  return Boolean(getGaId() || getClarityId() || getMetaPixelId());
}
