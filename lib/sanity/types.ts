import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type?: "image";
  asset?: { _ref?: string; _type?: string };
  alt?: string;
};

export type ProjectListItem = {
  _id: string;
  title: string;
  slug: string;
  client?: string;
  industry?: string;
  overview: string;
  featured?: boolean;
  cover?: SanityImage;
};

export type ProjectDetail = ProjectListItem & {
  problem?: string;
  solution?: string;
  techStack?: string[];
  gallery?: SanityImage[];
  results?: { label?: string; value?: string }[];
  body?: PortableTextBlock[];
  publishedAt?: string;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  cover?: SanityImage;
  author?: string;
  publishedAt?: string;
};

export type PostDetail = PostListItem & {
  body?: PortableTextBlock[];
};

export type CmsTestimonial = {
  _id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
};

export type CmsFaq = {
  _id: string;
  question: string;
  answer: string;
  category?: string;
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: SanityImage;
  links?: { label?: string; url?: string }[];
};

export type SiteSettings = {
  tagline?: string;
  contactEmail?: string;
  brands?: {
    name?: string;
    role?: string;
    description?: string;
    url?: string;
    logo?: SanityImage;
  }[];
};
