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
    body: 'We walk the site with you and write down what’s there: pathways, closets, power and existing systems. Nothing is priced until that’s done.',
  },
  {
    code: '02',
    title: 'Design',
    body: 'We draw up where every cable, jack and device will go, and price the job from that drawing.',
  },
  {
    code: '03',
    title: 'Install',
    body: 'Installed to ANSI/TIA standards with materials prepared ahead of time. Disruptive work happens after hours, and systems are switched over in planned phases so your business keeps running.',
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
  { title: 'Cutover-ready', body: 'Materials are prepared ahead of time, noisy work happens after hours, and cutovers are phased so your business keeps running.' },
  { title: 'After the install', body: 'Moves, adds and changes, warranty response and managed service contracts.' },
];

/* ── Industries ──
 * TODO(content): confirm with Armak which sectors they actively serve. */
export interface Industry {
  slug: string;
  name: string;
  icon: 'heart-pulse' | 'graduation-cap' | 'building-2' | 'store' | 'hotel' | 'building' | 'landmark' | 'warehouse';
  need: string;
}

export const industries: Industry[] = [
  { slug: 'commercial-office', name: 'Commercial office', icon: 'building-2', need: 'Tenant improvements, relocations and network refreshes on tight move-in dates.' },
  { slug: 'healthcare', name: 'Healthcare', icon: 'heart-pulse', need: 'Reliable networks, secured entries and camera coverage in spaces that never close.' },
  { slug: 'education', name: 'Education', icon: 'graduation-cap', need: 'Campus-wide Wi-Fi, classroom AV and access control, scheduled around the academic calendar.' },
  { slug: 'retail', name: 'Retail', icon: 'store', need: 'POS, cameras and in-store networks rolled out consistently across locations.' },
  { slug: 'hospitality', name: 'Hospitality', icon: 'hotel', need: 'Guest Wi-Fi, back-of-house networks, paging and POS that stay invisible to guests.' },
  { slug: 'multifamily', name: 'Multifamily', icon: 'building', need: 'Building-wide cabling, intercoms and entry systems that are easy for residents to use.' },
  { slug: 'government', name: 'Public sector', icon: 'landmark', need: 'Documented, standards-compliant installs with the paperwork to match.' },
  { slug: 'industrial', name: 'Industrial & warehouse', icon: 'warehouse', need: 'Long fiber runs, rugged Wi-Fi and perimeter cameras across large footprints.' },
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
