import { siteConfig } from '~/config/site';

export interface SeoProps {
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
  canonical?: string;
}

export function buildPageTitle(title?: string): string {
  if (!title || title === siteConfig.siteName) return siteConfig.siteName;
  return `${title} | ${siteConfig.siteShortName}`;
}

export function resolveCanonical(pathname: string, base = siteConfig.siteUrl): string {
  try {
    const url = new URL(pathname, base);
    if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
      url.pathname += '/';
    }
    return url.toString();
  } catch {
    return base;
  }
}
