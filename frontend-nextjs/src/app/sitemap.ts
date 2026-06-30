import type { MetadataRoute } from 'next';
import { getServiceSlugs, getPostSlugs, getLocationSlugs } from '@/lib/api';
import { SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, postSlugs, locationSlugs] = await Promise.all([
    getServiceSlugs().catch(() => [] as string[]),
    getPostSlugs().catch(() => [] as string[]),
    getLocationSlugs().catch(() => [] as string[]),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const postPages: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const locationPages: MetadataRoute.Sitemap = locationSlugs.map((slug) => ({
    url: `${SITE_URL}/locations/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...postPages, ...locationPages];
}
