/**
 * Site-wide SEO defaults and the business structured data rendered on every page by Base.astro.
 * Facts come from site.ts only — nothing here should be invented (no street address, ratings,
 * prices or social profiles until Armak supplies them).
 */
import { site, services, serviceArea, FOUNDED } from './site';
import { parseHours, DAY_NAMES } from '../lib/hours';

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
const websiteId = `${site.url}/#website`;

const telephone = site.phoneHref.replace(/^tel:/, '');

/**
 * schema.org opening hours, derived from site.hours (e.g. "Mon–Fri · 8 AM – 6 PM") with parseHours(),
 * the same reader as the "Open now" line, so the visible hours, the status line and the structured
 * data always match. If site.hours is reworded so it no longer parses, the hours are left out of
 * the JSON-LD (with a build warning) rather than published wrong.
 */
function openingHours(text: string) {
  const h = parseHours(text);
  if (h) {
    return [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
        opens: h.open,
        closes: h.close,
      },
    ];
  }
  console.warn(`[seo] Could not read site.hours ("${text}"); openingHoursSpecification omitted from JSON-LD.`);
  return undefined;
}

const hoursSpec = openingHours(site.hours);

// TODO(content): add streetAddress + postalCode (and `geo`) once Armak confirms the HQ address
const address = {
  '@type': 'PostalAddress',
  addressLocality: site.hq.city,
  addressRegion: site.hq.region,
  addressCountry: site.hq.country,
};

/** The business as a service page's provider: same @id as the site-wide entry, so search engines merge them. Key order matters, it is printed as JSON. */
export const businessProvider = {
  '@type': 'ProfessionalService',
  '@id': businessId,
  name: site.name,
  url: abs('/'),
  telephone,
  email: site.email,
  address,
};

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
      address,
      areaServed: serviceArea.map((c) => ({ '@type': 'City', name: `${c.name}, CA` })),
      // Derived from site.hours (see openingHours above), so it always matches the hours on the page
      ...(hoursSpec && { openingHoursSpecification: hoursSpec }),
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
