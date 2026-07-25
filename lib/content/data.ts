import { faqs as fallbackFaqs } from "@/lib/content/faqs";
import { testimonials as fallbackTestimonials } from "@/lib/content/testimonials";
import { sanityFetch } from "@/lib/sanity/client";
import {
  faqsQuery,
  postsQuery,
  postBySlugQuery,
  postSlugsQuery,
  projectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  siteSettingsQuery,
  teamMembersQuery,
  testimonialsQuery,
} from "@/lib/sanity/queries";
import type {
  CmsFaq,
  CmsTestimonial,
  PostDetail,
  PostListItem,
  ProjectDetail,
  ProjectListItem,
  SiteSettings,
  TeamMember,
} from "@/lib/sanity/types";

export async function getProjects(): Promise<ProjectListItem[]> {
  return (await sanityFetch<ProjectListItem[]>({ query: projectsQuery, tags: ["project"] })) || [];
}

export async function getProject(slug: string): Promise<ProjectDetail | null> {
  return sanityFetch<ProjectDetail>({
    query: projectBySlugQuery,
    params: { slug },
    tags: ["project", `project:${slug}`],
  });
}

export async function getProjectSlugs(): Promise<string[]> {
  return (await sanityFetch<string[]>({ query: projectSlugsQuery, tags: ["project"] })) || [];
}

export async function getPosts(): Promise<PostListItem[]> {
  return (await sanityFetch<PostListItem[]>({ query: postsQuery, tags: ["post"] })) || [];
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  return sanityFetch<PostDetail>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["post", `post:${slug}`],
  });
}

export async function getPostSlugs(): Promise<string[]> {
  return (await sanityFetch<string[]>({ query: postSlugsQuery, tags: ["post"] })) || [];
}

export async function getTestimonials(): Promise<CmsTestimonial[]> {
  const cms = await sanityFetch<CmsTestimonial[]>({
    query: testimonialsQuery,
    tags: ["testimonial"],
  });
  if (cms && cms.length > 0) return cms;
  return fallbackTestimonials.map((item, index) => ({
    _id: `fallback-testimonial-${index}`,
    quote: item.quote,
    author: item.author,
    role: item.role,
    company: item.company,
  }));
}

export async function getFaqs(): Promise<CmsFaq[]> {
  const cms = await sanityFetch<CmsFaq[]>({ query: faqsQuery, tags: ["faq"] });
  if (cms && cms.length > 0) return cms;
  return fallbackFaqs.map((item, index) => ({
    _id: `fallback-faq-${index}`,
    question: item.question,
    answer: item.answer,
  }));
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return (
    (await sanityFetch<TeamMember[]>({ query: teamMembersQuery, tags: ["teamMember"] })) || []
  );
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] });
}
