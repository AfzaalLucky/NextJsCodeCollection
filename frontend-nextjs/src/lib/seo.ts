import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Dubai Movers Pro';

export function buildMetadata({
  title,
  description,
  canonical,
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const resolvedTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const resolvedCanonical = canonical || SITE_URL;
  const resolvedOgImage = ogImage || `${SITE_URL}/og-default.jpg`;

  return {
    title: resolvedTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: resolvedCanonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: resolvedTitle,
      description,
      url: resolvedCanonical,
      siteName: SITE_NAME,
      images: [{ url: resolvedOgImage, width: 1200, height: 630 }],
      type: 'website',
      locale: 'en_AE',
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [resolvedOgImage],
    },
  };
}

export function buildArticleMetadata({
  title,
  description,
  canonical,
  ogImage,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  datePublished?: string;
  dateModified?: string;
}): Metadata {
  const base = buildMetadata({ title, description, canonical, ogImage });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: datePublished,
      modifiedTime: dateModified,
    },
  };
}

export function buildJsonLd(schema: object): string {
  return JSON.stringify(schema);
}

export { SITE_URL, SITE_NAME };
