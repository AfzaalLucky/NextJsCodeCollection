export interface WPImage {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface WPSeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}

export interface WPPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  featuredImage?: WPImage;
  categories: string[];
  tags: string[];
  seo: WPSeoMeta;
}

export interface WPService {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: WPImage;
  seo: WPSeoMeta;
  // ACF custom fields
  icon?: string;
  price?: string;
  features?: string[];
}

export interface WPLocation {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage?: WPImage;
  seo: WPSeoMeta;
  // ACF custom fields
  city?: string;
  region?: string;
  phone?: string;
}

export interface WPPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  seo: WPSeoMeta;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
