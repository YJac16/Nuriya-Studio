import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  company: z.string().max(0).optional(), // honeypot
});

export const quoteSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().min(2).max(120),
  budget: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(), // honeypot
});

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  preferredDate: z.string().trim().min(8).max(40),
  preferredTime: z.string().trim().min(1).max(40),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
