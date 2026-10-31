// Design rules: ai/DESIGN.md
/**
 * Page content shared across the homepage and inner pages.
 *
 * ⚠ PLACEHOLDER POLICY: anything Armak hasn't supplied yet is marked `placeholder: true`
 * and renders with a visible "Placeholder" tag. `placeholderCount()` is logged at build so
 * nothing invented ships unnoticed. Replace with real content before launch.
 */
import type { ImageMetadata } from 'astro';
import { site, type ServiceSlug } from './site';

import cisco from '../assets/partners/cisco.png';
import meraki from '../assets/partners/meraki.png';
import fortinet from '../assets/partners/fortinet.png';
import aruba from '../assets/partners/aruba.png';
import ubiquiti from '../assets/partners/ubiquiti.png';
import axis from '../assets/partners/axis.png';
import bosch from '../assets/partners/bosch.png';
import hikvision from '../assets/partners/hikvision.png';
import lts from '../assets/partners/lts.png';
import honeywell from '../assets/partners/honeywell.png';
import commscope from '../assets/partners/commscope.png';
import panduit from '../assets/partners/panduit.png';
import crestron from '../assets/partners/crestron.png';
import netgear from '../assets/partners/netgear.png';

import cableBundles from '../assets/photos/cabling-bundles-white.jpg';
import rackRow from '../assets/photos/wifi-ap-tray.jpg';
import patchColors from '../assets/photos/camera-ceiling.jpg';

/* ── Manufacturer partners (logos processed by scripts/prepare-logos.mjs) ── */
export interface Partner {
  name: string;
  logo: ImageMetadata;
  category: 'Network' | 'Security' | 'Infrastructure' | 'AV';
}

export const partners: Partner[] = [
  { name: 'Cisco', logo: cisco, category: 'Network' },
  { name: 'Cisco Meraki', logo: meraki, category: 'Network' },
  { name: 'Fortinet', logo: fortinet, category: 'Network' },
  { name: 'Aruba', logo: aruba, category: 'Network' },
  { name: 'Ubiquiti', logo: ubiquiti, category: 'Network' },
  { name: 'Netgear', logo: netgear, category: 'Network' },
  { name: 'Axis Communications', logo: axis, category: 'Security' },
  { name: 'Bosch', logo: bosch, category: 'Security' },
  { name: 'Hikvision', logo: hikvision, category: 'Security' },
  { name: 'LTS', logo: lts, category: 'Security' },
  { name: 'Honeywell', logo: honeywell, category: 'Security' },
  { name: 'CommScope', logo: commscope, category: 'Infrastructure' },
  { name: 'Panduit', logo: panduit, category: 'Infrastructure' },
  { name: 'Crestron', logo: crestron, category: 'AV' },
];

/* ── Process: "The Armak standard" ── */
export const process = [
  {
    code: '01',
    title: 'Assess',
    body: 'We walk the site with you and write down what’s there: pathways, closets, power and existing systems.',
  },
  {
    code: '02',
    title: 'Design',
    body: 'We draw up where every cable, jack and device will go, and price the job from that drawing.',
  },
  {
    code: '03',
    title: 'Install',
    body: 'Installed to ANSI/TIA standards with materials prepared ahead of time. Disruptive work can be scheduled after hours, and systems are switched over in planned phases so your business keeps running.',
  },
  {
    code: '04',
    title: 'Certify',
    body: 'Every run, rack and port is tested and documented before we leave the site. You get the reports.',
  },
  {
    code: '05',
    title: 'Support',
    body: 'Post-install MAC work, warranty response and managed service contracts. We stay available after the job is done.',
  },
];

/* ── Credentials & pillars — wording carried over from the original site ── */
export const credentials = ['Licensed · Bonded · Insured', 'BICSI-certified technicians', site.support];

export const pillars = [
  { title: 'Built to standard', body: 'ANSI/TIA-compliant installs. Every cable tested, every port labeled, every job documented to spec.' },
  { title: 'From closet to campus', body: 'From a single rack to a multi-site rollout, you work with the same team and one point of contact.' },
  { title: 'Cutover-ready', body: 'Materials are prepared ahead of time, noisy work can be scheduled after hours, and cutovers are phased so your business keeps running.' },
  { title: 'After the install', body: 'Moves, adds and changes, warranty response and managed service contracts.' },
];

/* ── Industries ──
 * TODO(content): confirm with Armak which sectors they actively serve. */
export interface Industry {
  slug: string;
  name: string;
  icon: 'heart-pulse' | 'graduation-cap' | 'building-2' | 'store' | 'hotel' | 'building' | 'landmark' | 'warehouse';
  need: string;
  /** Systems that typically apply to this sector. Kept general: every site is scoped individually.
   * TODO(content): confirm sectors and typical systems with Armak. */
  systems: ServiceSlug[];
}

export const industries: Industry[] = [
  { slug: 'commercial-office', name: 'Commercial office', icon: 'building-2', need: 'Tenant improvements, relocations and network refreshes on tight move-in dates.', systems: ['structured-cabling', 'networking', 'access-control', 'voip-unified-comms', 'audio-video'] },
  { slug: 'healthcare', name: 'Healthcare', icon: 'heart-pulse', need: 'Reliable networks, secured entries and camera coverage in spaces that never close.', systems: ['structured-cabling', 'networking', 'video-surveillance', 'access-control'] },
  { slug: 'education', name: 'Education', icon: 'graduation-cap', need: 'Campus-wide Wi-Fi, classroom AV and access control, scheduled around the academic calendar.', systems: ['networking', 'audio-video', 'access-control', 'video-surveillance'] },
  { slug: 'retail', name: 'Retail', icon: 'store', need: 'POS, cameras and in-store networks rolled out consistently across locations.', systems: ['networking', 'video-surveillance', 'structured-cabling'] },
  { slug: 'hospitality', name: 'Hospitality', icon: 'hotel', need: 'Guest Wi-Fi, back-of-house networks, paging and POS that stay invisible to guests.', systems: ['networking', 'voip-unified-comms', 'audio-video', 'video-surveillance'] },
  { slug: 'multifamily', name: 'Multifamily', icon: 'building', need: 'Building-wide cabling, intercoms and entry systems that are easy for residents to use.', systems: ['structured-cabling', 'access-control', 'video-surveillance'] },
  { slug: 'government', name: 'Public sector', icon: 'landmark', need: 'Documented, standards-compliant installs with the paperwork to match.', systems: ['structured-cabling', 'networking', 'access-control', 'video-surveillance'] },
  { slug: 'industrial', name: 'Industrial & warehouse', icon: 'warehouse', need: 'Long fiber runs, rugged Wi-Fi and perimeter cameras across large footprints.', systems: ['structured-cabling', 'networking', 'video-surveillance'] },
];

/* ── Projects ──
 * ⚠ ALL PLACEHOLDERS — illustrative scopes only. Replace with real Armak projects. */
export interface Project {
  slug: string;
  title: string;
  sector: string;
  location: string;
  services: ServiceSlug[];
  scope: { value: string; label: string }[];
  summary: string;
  image?: ImageMetadata;
  placeholder: boolean;
}

export const projects: Project[] = [
  {
    slug: 'office-headquarters-buildout',
    title: 'Corporate headquarters build-out',
    sector: 'Commercial office',
    location: 'Los Angeles County',
    services: ['structured-cabling', 'networking', 'access-control'],
    scope: [
      { value: '—', label: 'Data drops' },
      { value: '—', label: 'Wireless APs' },
      { value: '—', label: 'Doors secured' },
    ],
    summary: 'Placeholder: a real Armak project goes here: the challenge, what was installed, and the outcome.',
    image: cableBundles,
    placeholder: true,
  },
  {
    slug: 'multi-site-retail-rollout',
    title: 'Multi-site retail rollout',
    sector: 'Retail',
    location: 'Orange County',
    services: ['networking', 'video-surveillance'],
    scope: [
      { value: '—', label: 'Locations' },
      { value: '—', label: 'Cameras' },
      { value: '—', label: 'Days per site' },
    ],
    summary: 'Placeholder: a real Armak project goes here: the challenge, what was installed, and the outcome.',
    image: patchColors,
    placeholder: true,
  },
  {
    slug: 'server-room-modernization',
    title: 'Server room modernization',
    sector: 'Healthcare',
    location: 'San Fernando Valley',
    services: ['structured-cabling', 'networking'],
    scope: [
      { value: '—', label: 'Racks rebuilt' },
      { value: '—', label: 'Fiber strands' },
      { value: '—', label: 'Hours downtime' },
    ],
    summary: 'Placeholder: a real Armak project goes here: the challenge, what was installed, and the outcome.',
    image: rackRow,
    placeholder: true,
  },
];

/* ── Testimonials ── empty until real, permissioned quotes are supplied (section hides itself). */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [];

export function placeholderCount() {
  return projects.filter((p) => p.placeholder).length;
}

/**
 * Only real projects are ever shown. While every project is a placeholder, the whole Projects
 * area (homepage section, nav/footer links, /projects/ pages) is hidden. Add a real project with
 * `placeholder: false` and it all switches back on automatically.
 */
export const publishedProjects = projects.filter((p) => !p.placeholder);
export const showProjects = publishedProjects.length > 0;

/* ── Signature practices (ai/FATHER-CHECKLIST.md section A) ──
 * Used in B7 (cutaway), B8, B9 (sheet) and B10 (chart notes). confirmed:
 *   'yes'       shown as an Armak default
 *   'sometimes' shown with "On some jobs" (B7, B9 only; B8 needs 'yes')
 *   'no' | null shown nowhere (not in the drawing, the sheet or the chart)
 * The owner confirmed all ten as defaults in chat on 2026-10-30.
 * Numbers on the site come only from ai/research/cable-plant-lifespan-sources.md. */
export type Answer = null | 'yes' | 'sometimes' | 'no';

export interface SignatureItem {
  confirmed: Answer;
  /** The checklist line this answers, for tracing the fact back. */
  checklist: 'A1' | 'A2' | 'A3' | 'A4' | 'A5' | 'A6' | 'A7' | 'A8' | 'A9' | 'A10';
  /** What Armak installs. Short; used in the drawing (B7), the sheet (B9) and the chart notes (B10). */
  label: string;
  /** One plain sentence on what it makes possible later. Used in B7's list and B9's sheet. */
  detail: string;
  /** B9 left column: the version that is enough for today. Describes an option, names nobody. */
  today: string;
}

export type SignatureKey =
  | 'cat6aDefault' | 'twoDropsPerAp' | 'spareFiberStrands' | 'emptyConduit' | 'rackHeadroom'
  | 'zoneCabling' | 'ceilingGridJacks' | 'identicalJacks' | 'openStandards' | 'labelsAndAsBuilts';

export const signature: {
  confirmedBy: 'owner' | null;
  confirmedOn: string | null; // ISO date
  /** Item 11, the owner's own words. null until he writes them. Not rendered anywhere yet. */
  inOwnWords: string | null;
  items: Record<SignatureKey, SignatureItem>;
} = {
  confirmedBy: 'owner',
  confirmedOn: '2026-10-30',
  inOwnWords: null,
  items: {
    cat6aDefault: {
      confirmed: 'yes', checklist: 'A1',
      label: 'Cat 6A for new drops',
      detail: 'Carries 10 Gb/s over the full 100 m, so faster equipment can use the same cable.',
      today: 'Cat 6, enough for today’s speeds',
    },
    twoDropsPerAp: {
      confirmed: 'yes', checklist: 'A2',
      label: 'Two cables to each Wi-Fi access point',
      detail: 'The second cable is already in place when it is needed.',
      today: 'One cable to each access point',
    },
    spareFiberStrands: {
      confirmed: 'yes', checklist: 'A3',
      label: 'Spare fiber strands in every backbone',
      detail: 'Unused strands run between the closets, ready to connect later.',
      today: 'Only the strands in use today',
    },
    emptyConduit: {
      confirmed: 'yes', checklist: 'A4',
      label: 'Empty conduit with pull strings',
      detail: 'New cable can be pulled through later without opening walls.',
      today: 'Conduit only where cable runs today',
    },
    rackHeadroom: {
      confirmed: 'yes', checklist: 'A5',
      label: 'Room to grow in the rack',
      detail: 'Rack space, power and cooling beyond what today’s equipment needs.',
      today: 'A rack sized for today’s equipment',
    },
    zoneCabling: {
      confirmed: 'yes', checklist: 'A6',
      label: 'Zone cabling in open offices',
      detail: 'Cables meet at a point in the ceiling, so desks can move with short new runs.',
      today: 'A separate run from the closet to every desk',
    },
    ceilingGridJacks: {
      confirmed: 'yes', checklist: 'A7',
      label: 'Jacks ready in the ceiling',
      detail: 'Cameras and access points can be added or moved without a new cable run.',
      today: 'Ceiling cables only where devices hang today',
    },
    identicalJacks: {
      confirmed: 'yes', checklist: 'A8',
      label: 'The same jack everywhere',
      detail: 'Any jack can serve a phone, a computer or a camera. The role is set at the switch.',
      today: 'Different jacks for different uses',
    },
    openStandards: {
      confirmed: 'yes', checklist: 'A9',
      label: 'Open standards by default',
      detail: 'No lock-in to one brand of equipment.',
      today: 'One brand’s system from end to end',
    },
    labelsAndAsBuilts: {
      confirmed: 'yes', checklist: 'A10',
      label: 'Labels at both ends, and drawings handed over',
      detail: 'Every cable is labeled to TIA-606 at the jack and at the panel, and you get drawings of what was installed.',
      today: 'Labels at the panel only',
    },
  },
};

export const isShown = (s: SignatureItem) => s.confirmed === 'yes' || s.confirmed === 'sometimes';
export const shownSignature = (keys: SignatureKey[]) =>
  keys.map((k) => ({ key: k, ...signature.items[k] })).filter(isShown);

/* ── Lifespans (used in B10 and the "10 years" label in B7) ──
 * Numbers come only from ai/research/cable-plant-lifespan-sources.md (section B).
 * Cabling: BICSI design minimum, owner-approved. Devices: no maker publishes how long a customer
 * keeps a device, so this stays empty. Do not fill it. */
export interface Lifespan { years: number | null; basis: string | null; source: string | null; sourceUrl: string | null; footnote: string | null }
export const lifespans: { cabling: Lifespan; devices: Lifespan } = {
  cabling: {
    years: 10,
    basis: 'BICSI 005-2016 design horizon',
    source: 'ANSI/BICSI 005-2016, section 5.4.1.2.2',
    sourceUrl: 'https://aux.bicsi.org/om/BICSI-005-2016.pdf',
    footnote: 'Why 10 years: the BICSI 005-2016 design guide says to plan backbone cabling for at least 10 years after it goes into service.',
  },
  devices: { years: null, basis: null, source: null, sourceUrl: null, footnote: null },
};
export const cablingSourced = lifespans.cabling.years !== null && !!lifespans.cabling.sourceUrl;

/* ── Wi-Fi generations (used in B10) ──
 * One labeled basis: Wi-Fi Alliance certification launch dates.
 * Numbers come only from ai/research/cable-plant-lifespan-sources.md (section D). */
export const wifiBasis = 'Wi-Fi Alliance certification launch dates';
export const wifiGenerations = [
  { name: 'Wi-Fi 5', year: 2013, date: '2013-06-19', sourceUrl: 'https://www.wi-fi.org/news-events/newsroom/wi-fi-certified-ac-takes-wi-fi-performance-to-new-heights' },
  { name: 'Wi-Fi 6', year: 2019, date: '2019-09-16', sourceUrl: 'https://www.wi-fi.org/news-events/newsroom/wi-fi-certified-6-delivers-new-wi-fi-era' },
  { name: 'Wi-Fi 6E', year: 2021, date: '2021-01-07', sourceUrl: 'https://www.wi-fi.org/news-events/newsroom/wi-fi-alliance-delivers-wi-fi-6e-certification-program' },
  { name: 'Wi-Fi 7', year: 2024, date: '2024-01-08', sourceUrl: 'https://wi-fi.org/news-events/newsroom/wi-fi-alliance-introduces-wi-fi-certified-7' },
];

/* ── Device support windows (used in B10 notes) ──
 * Numbers come only from ai/research/cable-plant-lifespan-sources.md (section C). */
export const deviceSupport = [
  { maker: 'Cisco', years: 5, what: 'years of hardware support after a product stops being sold', sourceLabel: 'Cisco end-of-life policy', sourceUrl: 'https://www.cisco.com/c/en/us/products/eos-eol-policy.html' },
  { maker: 'Axis', years: 6, what: 'years of camera hardware and repair service after a camera is discontinued', sourceLabel: 'Axis discontinuation statement', sourceUrl: 'https://www.axis.com/dam/public/9f/a1/28/discontinuation-statement-axis-p1245-p1265_-p1275-en-06-24-en-US-442584.pdf' },
];

/* ── Cabling warranty sentence (used in B10 footnote) ──
 * Owner-approved wording. About the manufacturers only, not a claim about Armak.
 * Sources: ai/research/cable-plant-lifespan-sources.md section A. */
export const cablingWarranty = {
  text: 'Installed by an authorized partner, CommScope and Panduit cabling can be registered for manufacturer system warranties of up to 25 years.',
  sources: [
    { label: 'CommScope 25-year extended product warranty', url: 'https://webresources.commscope.com/download/assets/Technical+Document%3A+CommScope+Network+Infrastructure+System+25+Year+Extended+Product+Warranty/306b2bf63bd311f09d2d068e18034550' },
    { label: 'Panduit Certification Plus System Warranty', url: 'https://www.panduit.com/en/legal-information/certification-plus-system-warranty.html' },
  ],
};

/* ── Install phases (used in B4 Install demo and B6 job timeline) ──
 * Words match InstallDemo.astro's steps array exactly. */
export const installPhases = [
  { id: 'prestaged', title: 'Pre-staged', detail: 'Panels, labels and parts prepared before arriving on site.' },
  { id: 'afterhours', title: 'After-hours install', detail: 'The noisy work happens while the office is closed.' },
  { id: 'cutover', title: 'Phased cutover', detail: 'Systems switched over in planned phases, so the business keeps running.' },
];

/* ── Two-tier assessment copy (used in D, the plan/contact assessment choice) ──
 * Owner-approved 2026-10-31, verbatim. */
export const assessmentTiers = [
  { id: 'quote', value: 'Free rough quote', title: 'Free rough quote', body: 'Tell us about the job, and email any plans or photos to contact@armak.tech. We’ll give you a ballpark number. No site visit.' },
  { id: 'onsite', value: 'On-site assessment (paid)', title: 'On-site assessment (paid)', body: 'A technician walks your site, checks the closets, pathways and power, and gives you an accurate estimate. The fee is credited toward your project if you hire us.' },
] as const;
