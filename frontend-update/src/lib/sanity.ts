import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity client configuration
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
  // token: process.env.SANITY_API_TOKEN, // Uncomment for authenticated requests
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to get asset URL
export function getFileUrl(ref: string): string {
  const [, id, extension] = ref.split("-");
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${extension}`;
}

// GROQ Queries
export const queries = {
  // Interior Projects
  allProjects: `*[_type == "project"] | order(completedDate desc) {
    _id,
    title,
    slug,
    description,
    category,
    images,
    completedDate,
    client,
    location,
    area,
    duration
  }`,

  projectBySlug: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    category,
    images,
    completedDate,
    client,
    location,
    area,
    duration,
    testimonial
  }`,

  // Jobs
  allJobs: `*[_type == "job" && status == "active"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    company,
    location,
    salary,
    employmentType,
    category,
    description,
    requirements,
    publishedAt,
    deadline,
    isHot,
    isUrgent
  }`,

  jobBySlug: `*[_type == "job" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    company,
    location,
    salary,
    employmentType,
    category,
    description,
    requirements,
    benefits,
    publishedAt,
    deadline,
    isHot,
    isUrgent,
    contactInfo
  }`,

  jobsByCategory: `*[_type == "job" && status == "active" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    company,
    location,
    salary,
    employmentType,
    category,
    description,
    publishedAt,
    deadline,
    isHot,
    isUrgent
  }`,

  // Blog Posts
  allPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    category,
    author-> {
      name,
      image
    },
    publishedAt
  }`,

  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    mainImage,
    category,
    author-> {
      name,
      image,
      bio
    },
    publishedAt,
    "relatedPosts": *[_type == "post" && category == ^.category && slug.current != $slug][0...3] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt
    }
  }`,

  // Services
  allServices: `*[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    image,
    division
  }`,

  serviceBySlug: `*[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    description,
    features,
    icon,
    image,
    gallery,
    division,
    pricing
  }`,

  // Team Members
  allTeamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    position,
    image,
    bio,
    skills,
    experience
  }`,

  // Partners
  allPartners: `*[_type == "partner"] | order(order asc) {
    _id,
    name,
    logo,
    website
  }`,

  // Testimonials
  allTestimonials: `*[_type == "testimonial"] | order(publishedAt desc) {
    _id,
    name,
    position,
    company,
    content,
    image,
    rating
  }`,

  // Company Documents
  companyDocuments: `*[_type == "companyDocument"] | order(order asc) {
    _id,
    title,
    description,
    file,
    category
  }`,

  // Site Settings
  siteSettings: `*[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    contactInfo,
    socialLinks,
    seo
  }`,
};

// Fetch functions
export async function fetchSanity<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return sanityClient.fetch(query, params);
}

// Preview client for draft content
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

