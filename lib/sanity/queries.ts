import { groq } from "next-sanity";

export const projectsQuery = groq`
  *[_type == "project"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    client,
    industry,
    overview,
    featured,
    "cover": gallery[0]
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    client,
    industry,
    overview,
    problem,
    solution,
    techStack,
    gallery[]{ ..., alt },
    results[]{ label, value },
    body,
    featured,
    publishedAt
  }
`;

export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)].slug.current`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    cover,
    author,
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    cover,
    author,
    publishedAt,
    body
  }
`;

export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)].slug.current`;

export const testimonialsQuery = groq`
  *[_type == "testimonial" && featured != false] | order(order asc, _createdAt desc) {
    _id,
    quote,
    author,
    role,
    company
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc, _createdAt asc) {
    _id,
    question,
    answer,
    category
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc, name asc) {
    _id,
    name,
    role,
    bio,
    image,
    links[]{ label, url }
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    tagline,
    contactEmail,
    brands[]{
      name,
      role,
      description,
      url,
      logo
    }
  }
`;
