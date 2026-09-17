import { z } from "zod";

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(120),
  countryTimezone: z.string().trim().min(2).max(120),
  needs: z.string().trim().min(10).max(5000),
  budget: optionalText(80),
  referral: optionalText(120),
  phone: optionalText(40),
  website: z.string().max(0).optional(), // honeypot
});

export const quoteSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: optionalText(40),
  company: optionalText(120),
  countryTimezone: z.string().trim().min(2).max(120),
  service: z.string().trim().min(2).max(120),
  budget: optionalText(80),
  referral: optionalText(120),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(), // honeypot
});

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: optionalText(40),
  company: optionalText(120),
  preferredDate: z.string().trim().min(8).max(40),
  preferredTime: z.string().trim().min(1).max(40),
  notes: optionalText(2000),
  website: z.string().max(0).optional(), // honeypot
});

export const waitlistSchema = z.object({
  email: z.string().trim().email().max(200),
  name: optionalText(100),
  company: optionalText(120),
  productSlug: z.string().trim().min(2).max(120),
  productName: z.string().trim().min(2).max(120),
  notes: optionalText(1000),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type WaitlistInput = z.infer<typeof waitlistSchema>;
