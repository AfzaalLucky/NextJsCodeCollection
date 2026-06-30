import axios from 'axios';

const API_URL = process.env.NEST_API_URL || 'http://localhost:3001';
const API_KEY = process.env.NEST_API_KEY || '';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

async function get<T>(path: string): Promise<T> {
  const res = await client.get<T>(path);
  return res.data;
}

// Services
export const getServices = () => get<Service[]>('/api/services');
export const getService = (slug: string) => get<Service>(`/api/services/${slug}`);
export const getServiceSlugs = () => get<string[]>('/api/services/slugs');

// Posts / Blog
export const getPosts = (page = 1, perPage = 12) =>
  get<Post[]>(`/api/posts?page=${page}&perPage=${perPage}`);
export const getPostsByCategory = (categorySlug: string, page = 1, perPage = 12) =>
  get<Post[]>(`/api/posts?category=${categorySlug}&page=${page}&perPage=${perPage}`);
export const getPost = (slug: string) => get<Post>(`/api/posts/${slug}`);
export const getPostSlugs = () => get<string[]>('/api/posts/slugs');
export const getPostSlugsByCategory = (categorySlug: string) =>
  get<string[]>(`/api/posts/slugs?category=${categorySlug}`);

// Categories
export const getCategories = () => get<Category[]>('/api/categories');
export const getCategorySlugs = async () => {
  const cats = await getCategories();
  return cats.map((c) => c.slug);
};

// Locations
export const getLocations = () => get<Location[]>('/api/locations');
export const getLocation = (slug: string) => get<Location>(`/api/locations/${slug}`);
export const getLocationSlugs = () => get<string[]>('/api/locations/slugs');

// SEO
export const getLocalBusinessSchema = () => get<object>('/api/seo/local-business');

// Types
export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export interface FeaturedImage {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface PostCategory {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
  parent: number;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: FeaturedImage;
  seo: SeoMeta;
  icon?: string;
  price?: string;
  features?: string[];
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage?: FeaturedImage;
  categories: PostCategory[];
  tags: string[];
  seo: SeoMeta;
}

export interface Location {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: FeaturedImage;
  seo: SeoMeta;
  city?: string;
  region?: string;
  phone?: string;
}
