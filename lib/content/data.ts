import { faqs as fallbackFaqs } from "@/lib/content/faqs";
import { fallbackResources } from "@/lib/content/resources";
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
  resourcesQuery,
  resourceBySlugQuery,
  resourceSlugsQuery,
  siteSettingsQuery,
  teamMembersQuery,
  testimonialsQuery,
} from "@/lib/sanity/queries";
import type {
  CmsFaq,
  CmsResourceDetail,
  CmsResourceListItem,
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

export async function getResources(): Promise<CmsResourceListItem[]> {
  const cms = await sanityFetch<CmsResourceListItem[]>({
    query: resourcesQuery,
    tags: ["resource"],
  });
  if (cms && cms.length > 0) return cms;
  return fallbackResources.map((item, index) => ({
    _id: `fallback-resource-${index}`,
    title: item.title,
    slug: item.slug,
    type: item.type,
    summary: item.summary,
  }));
}

export async function getResource(slug: string): Promise<CmsResourceDetail | null> {
  const cms = await sanityFetch<CmsResourceDetail>({
    query: resourceBySlugQuery,
    params: { slug },
    tags: ["resource", `resource:${slug}`],
  });
  if (cms) return cms;

  const fallback = fallbackResources.find((item) => item.slug === slug);
  if (!fallback) return null;
  return {
    _id: `fallback-resource-${fallback.slug}`,
    title: fallback.title,
    slug: fallback.slug,
    type: fallback.type,
    summary: fallback.summary,
  };
}

export async function getResourceSlugs(): Promise<string[]> {
  const cms = await sanityFetch<string[]>({ query: resourceSlugsQuery, tags: ["resource"] });
  if (cms && cms.length > 0) return cms;
  return fallbackResources.map((item) => item.slug);
}
