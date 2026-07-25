import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { services } from "@/lib/content/services";
import { products } from "@/lib/content/products";
import { solutions } from "@/lib/content/solutions";
import { getPostSlugs, getProjectSlugs, getResourceSlugs } from "@/lib/content/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/services",
    "/solutions",
    "/products",
    "/portfolio",
    "/pricing",
    "/about",
    "/blog",
    "/resources",
    "/contact",
    "/book",
    "/brands",
    "/privacy",
    "/terms",
  ];

  const [projectSlugs, postSlugs, resourceSlugs] = await Promise.all([
    getProjectSlugs(),
    getPostSlugs(),
    getResourceSlugs(),
  ]);

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route || "/"),
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...solutions.map((solution) => ({
      url: absoluteUrl(`/solutions/${solution.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...projectSlugs.map((slug) => ({
      url: absoluteUrl(`/portfolio/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...postSlugs.map((slug) => ({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...resourceSlugs.map((slug) => ({
      url: absoluteUrl(`/resources/${slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
