/**
 * Single source of truth for business facts used across the site.
 * Never hardcode years, phone numbers or addresses in components — import from here.
 */

export const FOUNDED = 1998;

/** Computed at build time, so it stays correct on every rebuild. */
export const yearsInBusiness = new Date().getFullYear() - FOUNDED;

export const site = {
  name: 'Armak Technologies',
  shortName: 'Armak',
  url: 'https://armak.tech',
  tagline: 'Low-voltage, networking & security infrastructure for Southern California.',
  description:
    'Armak Technologies designs, installs and supports structured cabling, enterprise networks, video surveillance, access control, voice and AV systems across Southern California — since 1998.',
  phone: '(818) 858-4615',
  phoneHref: 'tel:+18188584615',
  email: 'sales@armak.tech',
  emailHref: 'mailto:sales@armak.tech',
  hq: { city: 'Glendale', region: 'CA', country: 'US', lat: 34.1425, lng: -118.2551 },
  hours: 'Mon–Fri · 8 AM – 6 PM',
  support: '24/7 support for contracted clients',
  // TODO(content): confirm license number + classification with Armak before launch
  license: null as string | null,
  projectsDelivered: 946,
} as const;

export type ServiceSlug =
  | 'structured-cabling'
  | 'networking'
  | 'video-surveillance'
  | 'access-control'
  | 'voip-unified-comms'
  | 'audio-video';

export interface Service {
  slug: ServiceSlug;
  /** TIA-606 style label used throughout the UI */
  code: string;
  name: string;
  short: string;
  /** Building layer this service maps to in the explorer */
  layer: string;
  /** Sub-services carried over from the original site — nothing Armak offers is dropped */
  includes: string[];
}

export const services: Service[] = [
  {
    slug: 'structured-cabling',
    code: 'A-01',
    name: 'Structured Cabling & Fiber',
    short: 'Cat 6A, Cat 8 and fiber installations built to ANSI/TIA standards — every run tested, labeled and certified.',
    layer: 'Physical layer',
    includes: [
      'Cat 6A / Cat 8 copper',
      'Fiber backbone',
      'Testing, labeling & certification',
      'Business & corporate relocation',
    ],
  },
  {
    slug: 'networking',
    code: 'A-02',
    name: 'Networking & Wireless',
    short: 'Switches, firewalls, VLANs, UPS and enterprise Wi-Fi for stable, secure uptime.',
    layer: 'Network layer',
    includes: [
      'Switching, firewall & VLANs',
      'UPS & power',
      'Enterprise Wi-Fi design',
      'Internet service brokerage',
      'POS install & training',
    ],
  },
  {
    slug: 'video-surveillance',
    code: 'A-03',
    name: 'Video Surveillance',
    short: 'High-resolution cameras, NVRs and remote monitoring systems.',
    layer: 'Security layer',
    includes: ['IP cameras & NVRs', 'Remote monitoring', 'LED perimeter & yard lighting'],
  },
  {
    slug: 'access-control',
    code: 'A-04',
    name: 'Access Control',
    short: 'Secure doors, strikes, maglocks and video intercom systems.',
    layer: 'Entry layer',
    includes: ['Card & mobile access', 'Strikes & maglocks', 'Video intercom', 'Time & attendance'],
  },
  {
    slug: 'voip-unified-comms',
    code: 'A-05',
    name: 'Voice & Unified Comms',
    short: 'Cloud voice, phone systems, call flows and team onboarding.',
    layer: 'Voice layer',
    includes: ['Cloud phone systems', 'Call flows & onboarding', 'Storage, backup & messaging', 'PA & zone paging'],
  },
  {
    slug: 'audio-video',
    code: 'A-06',
    name: 'Audio & Video',
    short: 'Displays, speakers, mounts and tuning for any space or scale.',
    layer: 'Experience layer',
    includes: ['Conference rooms', 'Displays & signage', 'Distributed audio'],
  },
];

export const nav = [
  { label: 'Services', href: '/services/', mega: true },
  { label: 'Industries', href: '/industries/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'About', href: '/about/' },
  { label: 'Glossary', href: '/glossary/' },
] as const;

export interface City {
  name: string;
  county: string;
  lat: number;
  lng: number;
}

/** Cities from the original site's service-area map, north → south. */
export const serviceArea: City[] = [
  { name: 'Santa Barbara', county: 'Santa Barbara', lat: 34.4208, lng: -119.6982 },
  { name: 'Lancaster', county: 'Los Angeles', lat: 34.6868, lng: -118.1542 },
  { name: 'Palmdale', county: 'Los Angeles', lat: 34.5794, lng: -118.1165 },
  { name: 'Santa Clarita', county: 'Los Angeles', lat: 34.3917, lng: -118.5426 },
  { name: 'Ventura', county: 'Ventura', lat: 34.2746, lng: -119.229 },
  { name: 'Oxnard', county: 'Ventura', lat: 34.1975, lng: -119.1771 },
  { name: 'Burbank', county: 'Los Angeles', lat: 34.1808, lng: -118.309 },
  { name: 'Pasadena', county: 'Los Angeles', lat: 34.1478, lng: -118.1445 },
  { name: 'Glendale', county: 'Los Angeles', lat: 34.1425, lng: -118.2551 },
  { name: 'San Bernardino', county: 'San Bernardino', lat: 34.1083, lng: -117.2898 },
  { name: 'Beverly Hills', county: 'Los Angeles', lat: 34.0736, lng: -118.4004 },
  { name: 'Los Angeles', county: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
  { name: 'Malibu', county: 'Los Angeles', lat: 34.0259, lng: -118.7798 },
  { name: 'Riverside', county: 'Riverside', lat: 33.9806, lng: -117.3755 },
  { name: 'Anaheim', county: 'Orange', lat: 33.8366, lng: -117.9143 },
  { name: 'Long Beach', county: 'Los Angeles', lat: 33.7701, lng: -118.1937 },
  { name: 'Santa Ana', county: 'Orange', lat: 33.7455, lng: -117.8677 },
  { name: 'Irvine', county: 'Orange', lat: 33.6846, lng: -117.8265 },
  { name: 'Huntington Beach', county: 'Orange', lat: 33.6603, lng: -117.9992 },
  { name: 'Temecula', county: 'Riverside', lat: 33.4936, lng: -117.1484 },
  { name: 'Oceanside', county: 'San Diego', lat: 33.1959, lng: -117.3795 },
  { name: 'Escondido', county: 'San Diego', lat: 33.1192, lng: -117.0864 },
  { name: 'San Diego', county: 'San Diego', lat: 32.7157, lng: -117.1611 },
  { name: 'Chula Vista', county: 'San Diego', lat: 32.6401, lng: -117.0842 },
];

export const counties = [...new Set(serviceArea.map((c) => c.county))];
