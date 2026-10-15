/**
 * Site-wide SEO defaults and the business structured data rendered on every page by Base.astro.
 * Facts come from site.ts only — nothing here should be invented (no street address, ratings,
 * prices or social profiles until Armak supplies them).
 */
import { site, services, serviceArea, FOUNDED } from './site';

const abs = (path: string) => new URL(path, site.url).href;

/** Homepage <title> (pages with their own title get "<title> | Armak Technologies") */
export const defaultTitle = `${site.name} | Low-Voltage & Network Contractor, SoCal`;

/** Homepage meta description (120–155 chars) */
export const defaultDescription = `${site.name} designs, installs and supports cabling, networks, cameras, access control, voice and AV across Southern California. Since ${FOUNDED}.`;

/** Default social share card — regenerate with `node scripts/make-brand-images.mjs` */
export const defaultOgImage = {
  src: '/og-image.png',
  width: 1200,
  height: 630,
  alt: `${site.name}: Built for the future. Low-voltage, networking and security across Southern California.`,
};

/** Same @id the service pages use for their `provider`, so search engines merge the two */
export const businessId = `${site.url}/#business`;
export const websiteId = `${site.url}/#website`;

const telephone = site.phoneHref.replace(/^tel:/, '');

export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': businessId,
      name: site.name,
      alternateName: site.shortName,
      description: site.description,
      url: abs('/'),
      logo: abs('/logo.png'),
      image: abs(defaultOgImage.src),
      telephone,
      email: site.email,
      foundingDate: String(FOUNDED),
      // TODO(content): add streetAddress + postalCode (and `geo`) once Armak confirms the HQ address
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.hq.city,
        addressRegion: site.hq.region,
        addressCountry: site.hq.country,
      },
      areaServed: serviceArea.map((c) => ({ '@type': 'City', name: `${c.name}, CA` })),
      // Mirrors site.hours ("Mon–Fri · 8 AM – 6 PM") — update both together
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone,
        email: site.email,
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Low-voltage, networking & security services',
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            '@id': abs(`/services/${s.slug}/#service`),
            name: s.name,
            description: s.short,
            url: abs(`/services/${s.slug}/`),
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: abs('/'),
      name: site.name,
      alternateName: site.shortName,
      inLanguage: 'en-US',
      publisher: { '@id': businessId },
    },
  ],
};
