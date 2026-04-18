import { businessConfig } from '~/config/business';
import { siteConfig } from '~/config/site';
import { serviceAreaContent } from '~/content/service-area';

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.siteUrl}/#business`,
    name: businessConfig.businessName,
    legalName: businessConfig.businessName,
    description: siteConfig.siteDescription,
    slogan: businessConfig.slogan,
    url: siteConfig.siteUrl,
    telephone: businessConfig.phone,
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
