import { businessConfig } from '~/config/business';
import { siteConfig } from '~/config/site';
import { serviceAreaContent } from '~/content/service-area';
import { servicesContent } from '~/content/services';
import { faqContent } from '~/content/faq';
import { pricingContent } from '~/content/pricing';

const businessId = `${siteConfig.siteUrl}/#business`;

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': businessId,
    name: businessConfig.businessName,
    legalName: businessConfig.businessName,
    description: siteConfig.siteDescription,
    slogan: businessConfig.slogan,
    url: siteConfig.siteUrl,
    email: `mailto:${businessConfig.primaryEmail}`,
    image: `${siteConfig.siteUrl}${siteConfig.defaultOgImage}`,
    logo: `${siteConfig.siteUrl}/images/brand/curl-up-club-logo.png`,
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      addressLocality: businessConfig.address.locality,
      addressRegion: businessConfig.address.region,
      addressCountry: businessConfig.address.countryCode,
    },
    areaServed: serviceAreaContent.areas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    openingHoursSpecification: businessConfig.hours.schemaSpec.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    serviceType: 'Cat sitting',
    sameAs: [businessConfig.facebookUrl],
  };
}

export function servicesJsonLd() {
  const offers = pricingContent.plans
    .filter((plan) => /^£\d/.test(plan.price))
    .map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      price: plan.price.replace(/[^\d.]/g, ''),
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.siteUrl}/pricing/`,
      description: `${plan.description} (${plan.unit}).`,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cat sitting',
    name: 'In-home cat sitting',
    description: servicesContent.intro,
    provider: { '@id': businessId },
    areaServed: serviceAreaContent.areas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Curl Up Club services',
      itemListElement: servicesContent.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.description,
        },
      })),
    },
    offers,
  };
}

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqContent.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  trail: ReadonlyArray<{ name: string; href: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: step.href.startsWith('http')
        ? step.href
        : `${siteConfig.siteUrl}${step.href}`,
    })),
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.siteName,
    inLanguage: siteConfig.locale,
    publisher: { '@id': businessId },
  };
}
