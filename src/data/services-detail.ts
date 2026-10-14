/**
 * Per-service page content for /services/{slug}/ (rendered by src/pages/services/[slug].astro).
 *
 * FACT POLICY: Armak-specific statements stay within what site.ts, content.ts and the original
 * site's copy say. Everything else here is general, accurate education about the technology
 * (standards, trade-offs, how things work) — no invented clients, counts, warranties,
 * certifications or response times.
 */
import type { ImageMetadata } from 'astro';
import type { ServiceSlug } from './site';
import type { Partner } from './content';

// Interim stock (see src/assets/photos/CREDITS.md) — not Armak jobs, never caption as such
import cablingBundles from '../assets/photos/cabling-bundles-white.jpg';
import wifiAp from '../assets/photos/wifi-ap-tray.jpg';
import cameraCeiling from '../assets/photos/camera-ceiling.jpg';
import badgeReader from '../assets/photos/badge-reader.jpg';
import deskPhone from '../assets/photos/desk-phone.jpg';
import conferenceRoom from '../assets/photos/conference-room.jpg';

export interface Capability {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface ServiceDetail {
  /** Page h1 — short, confident, sentence case */
  headline: string;
  /** 2–3 sentence lead under the h1 */
  intro: string;
  /** 4–6 items expanding the service's `includes` list */
  capabilities: Capability[];
  /** Short mono spec lines (standards / technologies) — general, not Armak claims */
  standards: string[];
  /** Which partner categories from content.ts to show on the page (empty = hide the section) */
  partnerCategories: Partner['category'][];
  faqs: Faq[];
  /** ≤155 characters, includes "Southern California" */
  metaDescription: string;
}

/* ── Photos ──
 * TODO(photo): interim stock — replace with real Armak install photos. A service without an
 * entry simply renders no photo band. Tags name the system layer, never a fake job location. */
export interface ServicePhoto {
  src: ImageMetadata;
  alt: string;
  /** Small mono tag overlaid on the photo, styled like a rack/closet label */
  tag: string;
}

export const servicePhotos: Partial<Record<ServiceSlug, ServicePhoto>> = {
  'structured-cabling': {
    src: cablingBundles,
    alt: 'Neatly dressed white cable bundles fanning into a patch panel',
    tag: 'A-01 · Physical layer',
  },
  networking: {
    src: wifiAp,
    alt: 'An enterprise Wi-Fi access point mounted on a ceiling cable tray',
    tag: 'A-02 · Network layer',
  },
  'video-surveillance': {
    src: cameraCeiling,
    alt: 'A white bullet security camera mounted on a ceiling',
    tag: 'A-03 · Security layer',
  },
  'access-control': {
    src: badgeReader,
    alt: 'A hand presenting an access card to a reader on a concrete wall',
    tag: 'A-04 · Entry layer',
  },
  'voip-unified-comms': {
    src: deskPhone,
    alt: 'An IP desk phone on a desk in a bright office',
    tag: 'A-05 · Voice layer',
  },
  'audio-video': {
    src: conferenceRoom,
    alt: 'A bright conference room with a wall-mounted display above a long table',
    tag: 'A-06 · Experience layer',
  },
};

export const servicesDetail: Record<ServiceSlug, ServiceDetail> = {
  /* ── A-01 ─────────────────────────────────────────────────────────── */
  'structured-cabling': {
    headline: 'Structured cabling, tested and documented.',
    intro:
      'Every system in your building rides on the physical layer. We install Cat 6A, Cat 8 and fiber to ANSI/TIA standards, then test, label and document every run before we leave the site.',
    capabilities: [
      {
        title: 'Cat 6A horizontal cabling',
        body: 'Cat 6A carries 10GBASE-T across a full 100-meter channel and handles the heat of bundled, high-power PoE runs to access points, cameras and door hardware. It’s the sensible default for new drops.',
      },
      {
        title: 'Cat 8 for high-speed links',
        body: 'Cat 8 supports 25 and 40 Gb/s over short runs of up to 30 meters. It’s meant for switch-to-server connections in server rooms and data centers rather than everyday office drops.',
      },
      {
        title: 'Fiber backbone',
        body: 'Single-mode and multimode fiber linking your main equipment room, IDF closets and neighboring buildings, terminated and loss-tested end to end.',
      },
      {
        title: 'Testing, labeling & certification',
        body: 'Copper links are certified with a field tester against TIA limits for their category, and cables, panels and ports are labeled to a consistent scheme. You get the reports.',
      },
      {
        title: 'Racks, patching & cable management',
        body: 'Patch panels, dressed and labeled patching, and cable management in the closet, so the next move, add or change takes minutes instead of an afternoon of tracing.',
      },
      {
        title: 'Business & corporate relocation',
        body: 'IT moves, cabling refreshes and go-live support. The new space is cabled, tested and ready before your team moves in.',
      },
    ],
    standards: [
      'ANSI/TIA-568',
      'TIA-606 labeling',
      'Cat 6A · Cat 8',
      'Single-mode · Multimode fiber',
      'Field-tested & documented',
    ],
    partnerCategories: ['Infrastructure'],
    faqs: [
      {
        q: 'Should we install Cat 6 or Cat 6A?',
        a: 'Cat 6 supports 10 Gb/s only over shorter runs (up to about 55 meters, depending on conditions), while Cat 6A supports it across the full 100-meter channel and copes better with heat in large PoE bundles. For new construction that should last ten years or more, Cat 6A is usually the better long-term value; Cat 6 can still suit short runs and budget-constrained additions to an existing Cat 6 plant.',
      },
      {
        q: 'When does Cat 8 make sense?',
        a: 'Cat 8 is designed for short, high-speed links (up to 30 meters at 25 or 40 Gb/s), typically between switches and servers in a data center or server room. It isn’t a replacement for Cat 6A in horizontal office cabling, and most desktops, access points and cameras gain nothing from it.',
      },
      {
        q: 'What’s the difference between testing and certifying a cable?',
        a: 'A basic tester confirms continuity and wire map, meaning each conductor lands on the right pin. Certification uses a field tester to measure performance (insertion loss, near-end crosstalk, return loss and more) against the TIA limits for the cable’s category, and records a pass/fail report for every link. Certification results are typically what manufacturers require for extended system warranties.',
      },
      {
        q: 'Single-mode or multimode fiber for our backbone?',
        a: 'Multimode (such as OM3 or OM4) is cost-effective for shorter runs inside a building. Single-mode supports far longer distances and more bandwidth headroom, which is why it’s common for campus and building-to-building links. The right choice depends on distance, the optics your equipment uses and how much growth you expect.',
      },
    ],
    metaDescription:
      'Cat 6A, Cat 8 and fiber cabling installed to ANSI/TIA standards across Southern California. Every run tested, labeled and certified.',
  },

  /* ── A-02 ─────────────────────────────────────────────────────────── */
  networking: {
    headline: 'Networks that stay up long after install day.',
    intro:
      'Switches, firewalls, VLANs, UPS power and enterprise Wi-Fi, designed around how your building actually works. One team from the patch panel to the access point.',
    capabilities: [
      {
        title: 'Switching & VLANs',
        body: 'Managed switching with VLANs that keep staff, guest, voice, camera and building-system traffic apart, with PoE budgets sized for the devices you actually run.',
      },
      {
        title: 'Firewalls & secure edge',
        body: 'Firewall configuration that controls what enters and leaves your network, with secure remote access and site-to-site connectivity for multi-location businesses.',
      },
      {
        title: 'Enterprise Wi-Fi design',
        body: 'Access points planned around client density, wall construction and roaming, then deployed and tuned for coverage across the whole space.',
      },
      {
        title: 'UPS & power',
        body: 'Rack UPS and power distribution that ride through short outages and give switches, firewalls and PoE devices time to shut down cleanly during long ones.',
      },
      {
        title: 'Internet service brokerage',
        body: 'Carrier sourcing, redundancy planning and SLA negotiation, so you get the right circuits, a backup path and terms you understand.',
      },
      {
        title: 'POS install & training',
        body: 'Point-of-sale setup, peripherals and network security for retail and hospitality, plus training so staff are confident at open.',
      },
    ],
    standards: [
      'IEEE 802.1Q VLANs',
      'PoE · PoE+ · PoE++ (802.3af/at/bt)',
      'Wi-Fi 6 / 6E / 7',
      'Next-gen firewall',
      'Rack UPS & PDU',
    ],
    partnerCategories: ['Network'],
    faqs: [
      {
        q: 'Why segment a network with VLANs?',
        a: 'VLANs split one physical network into separate logical networks. That limits what a compromised device can reach, keeps guest and camera traffic away from business systems, contains broadcast traffic and lets you apply different security and quality-of-service rules to each group.',
      },
      {
        q: 'How many Wi-Fi access points do we need?',
        a: 'Capacity matters more than square footage. The number of devices connecting at once, what they’re doing (video calls versus email), wall and ceiling construction and roaming needs all change the answer. A predictive design from floor plans, confirmed on site, avoids both dead zones and over-built networks that interfere with themselves.',
      },
      {
        q: 'What is a PoE budget, and why does it matter?',
        a: 'Power over Ethernet delivers power and data on one cable. Per port, 802.3af provides up to 15.4 W at the switch, 802.3at (PoE+) up to 30 W, and 802.3bt up to 60 or 90 W. Each switch also has a total power budget. If cameras, access points and phones together exceed it, some devices won’t power up, so budgets should be planned with headroom.',
      },
      {
        q: 'Cloud-managed or traditionally managed networking?',
        a: 'Cloud-managed platforms such as Cisco Meraki let you configure and monitor every site from a web dashboard, usually in exchange for ongoing licensing. Locally managed equipment avoids recurring license fees but relies on in-house or contracted expertise to administer. The right fit depends on how many sites you run and who will manage them.',
      },
    ],
    metaDescription:
      'Business networking and enterprise Wi-Fi in Southern California: switching, firewalls, VLANs, UPS power and internet service brokerage.',
  },

  /* ── A-03 ─────────────────────────────────────────────────────────── */
  'video-surveillance': {
    headline: 'Cameras placed where they’re needed.',
    intro:
      'High-resolution IP cameras, network video recorders and remote viewing, with cameras placed where they’re needed and a network that can carry the video. Plus LED perimeter and yard lighting so cameras see at night.',
    capabilities: [
      {
        title: 'Camera design & placement',
        body: 'Each camera is chosen and aimed for its job, such as identifying faces at entrances or watching activity across lots and hallways, with lighting and mounting height accounted for day and night.',
      },
      {
        title: 'IP cameras & NVRs',
        body: 'Network video recorders sized for your camera count, resolution and retention period, with storage calculated up front instead of discovered when the drives fill.',
      },
      {
        title: 'Remote monitoring',
        body: 'Secure live and recorded viewing from phones and browsers, so owners and managers can check in on every site without being on site.',
      },
      {
        title: 'Network-ready installs',
        body: 'Cameras powered over PoE and placed on their own VLAN, so video traffic doesn’t compete with the systems your business runs on.',
      },
      {
        title: 'LED perimeter & yard lighting',
        body: 'LED lighting for perimeters, yards and lots that supports security and operations and gives cameras the light they need for usable night footage.',
      },
    ],
    standards: [
      'IP / PoE cameras',
      'NVR & VMS',
      'H.264 · H.265',
      'ONVIF interoperability',
      'Remote viewing',
    ],
    partnerCategories: ['Security'],
    faqs: [
      {
        q: 'How much recording storage do we need?',
        a: 'It depends on camera count, resolution, frame rate, compression (H.265 typically needs considerably less space than H.264), how busy each scene is, and whether cameras record continuously or on motion. Start from how many days of footage you need to keep, then size the recorder to match — not the other way around.',
      },
      {
        q: 'Cloud or on-premises video recording?',
        a: 'An on-site NVR keeps footage local, avoids per-camera subscriptions and keeps recording if the internet goes down. Cloud video management adds off-site storage, easy multi-site access and managed updates, usually for a per-camera fee and with upload bandwidth to plan for. Hybrid systems that record locally and sync key footage to the cloud are increasingly common.',
      },
      {
        q: 'Is a higher-megapixel camera always better?',
        a: 'Not necessarily. What matters is pixel density on the subject: a 4K camera covering a whole parking lot can capture less facial detail than a 1080p camera aimed at a doorway. Good designs start from each camera’s purpose: detect, observe, recognize or identify — and pick the lens, resolution and position to match.',
      },
      {
        q: 'Is it safe to view our cameras remotely?',
        a: 'It can be, when it’s set up properly. Best practice is to avoid exposing recorders directly to the internet through port forwarding, use the manufacturer’s secure remote service or a VPN instead, replace default passwords, and keep camera and recorder firmware up to date.',
      },
    ],
    metaDescription:
      'IP cameras, NVRs and remote monitoring for Southern California businesses. Video surveillance systems designed and installed for usable footage.',
  },

  /* ── A-04 ─────────────────────────────────────────────────────────── */
  'access-control': {
    headline: 'Control who gets in, and when.',
    intro:
      'Card and mobile credentials, electric strikes, maglocks and video intercoms that let the right people in and keep a record of who did. Plus modern time and attendance for any workforce.',
    capabilities: [
      {
        title: 'Card & mobile access',
        body: 'Smart-card readers or mobile credentials on employees’ phones, managed from one system. Add or revoke access instantly, set schedules by door and group, and review who entered where.',
      },
      {
        title: 'Strikes & maglocks',
        body: 'The right locking hardware for each opening (electric strikes, maglocks, power supplies and request-to-exit devices), matched to the door, frame and life-safety requirements.',
      },
      {
        title: 'Video intercom',
        body: 'Video intercoms at entrances and gates so staff or residents can see who’s there, talk to them and release the door without leaving their desk.',
      },
      {
        title: 'Time & attendance',
        body: 'Modern time clocks and admin control for any workforce: accurate punches, simpler payroll and fewer disputes over hours.',
      },
      {
        title: 'Schedules & audit trails',
        body: 'Door schedules, holiday calendars and event logs that show exactly when each door was used, held open or forced.',
      },
    ],
    standards: [
      '13.56 MHz smart credentials',
      'BLE / NFC mobile access',
      'OSDP readers',
      'Fail-safe · Fail-secure hardware',
      'Request-to-exit (REX)',
    ],
    partnerCategories: ['Security'],
    faqs: [
      {
        q: 'Prox cards, smart cards or mobile credentials?',
        a: 'Legacy 125 kHz proximity cards are inexpensive but broadcast an unencrypted number that can be copied with cheap, widely available tools. 13.56 MHz smart cards use encryption and are much harder to clone. Mobile credentials store an encrypted credential on the user’s phone and work over Bluetooth or NFC. For new systems, smart or mobile credentials are the safer choice.',
      },
      {
        q: 'What’s the difference between fail-safe and fail-secure?',
        a: 'A fail-safe lock (like most maglocks) releases when it loses power. A fail-secure lock (like many electric strikes) stays locked from the outside when power is lost, while the inside handle still lets people exit freely. The right choice depends on the door’s role, fire and life-safety requirements and how much security the opening needs during an outage.',
      },
      {
        q: 'Can we put a maglock on any door?',
        a: 'Not without meeting code. Maglocks on egress doors generally need a motion-sensor release, a manual push-to-exit button and automatic release when the fire alarm activates, and requirements vary by jurisdiction and occupancy. That’s why hardware should be chosen with the local building and fire codes in mind.',
      },
      {
        q: 'Can we manage access remotely?',
        a: 'Most modern platforms let administrators add or remove users, change schedules, unlock doors and review activity from a browser or app. Cloud-hosted systems do this natively; many on-premises systems offer secure remote access as well.',
      },
    ],
    metaDescription:
      'Access control systems for Southern California businesses: card and mobile credentials, electric strikes, maglocks, video intercom and time clocks.',
  },

  /* ── A-05 ─────────────────────────────────────────────────────────── */
  'voip-unified-comms': {
    headline: 'Business phones that are simple to use and manage.',
    intro:
      'Cloud phone systems, call flows that send callers to the right person, and onboarding that gets your team comfortable from the first call. Paging, messaging and backup tie it all together.',
    capabilities: [
      {
        title: 'Cloud phone systems',
        body: 'Hosted VoIP in place of an on-site phone server: desk phones, softphones and mobile apps on one number plan, managed from a web portal.',
      },
      {
        title: 'Call flows & auto attendants',
        body: 'Auto attendants, ring groups, queues and after-hours routing designed with you, so callers reach the right person the first time.',
      },
      {
        title: 'Onboarding & training',
        body: 'Phones configured, numbers moved and your team walked through the system, so day one feels routine instead of disruptive.',
      },
      {
        title: 'Storage, backup & messaging',
        body: 'Cloud voice, file storage, backup and messaging working together, so communications and the files behind them live in one place.',
      },
      {
        title: 'PA & zone paging',
        body: 'Zone paging and network-integrated PA for announcements to one area or the whole building through ceiling speakers and phones.',
      },
      {
        title: 'Voice-ready networks',
        body: 'Voice VLANs, quality-of-service and PoE switching so calls stay clear even when the network is busy.',
      },
    ],
    standards: [
      'SIP / hosted PBX',
      'QoS · DSCP EF',
      'Voice VLAN',
      'PoE desk phones',
      'Multicast & SIP paging',
    ],
    partnerCategories: [],
    faqs: [
      {
        q: 'Can we keep our existing phone numbers?',
        a: 'In most cases, yes. Number porting moves your existing numbers to the new provider; depending on the carrier and how many numbers are involved, it can take anywhere from days to a few weeks. Plan the cutover so the old service isn’t cancelled until the port is complete.',
      },
      {
        q: 'What does our network need for VoIP?',
        a: 'Voice uses little bandwidth (roughly 100 kbps per call with a standard codec), but it is very sensitive to latency, jitter and packet loss. Quality-of-service prioritization, a dedicated voice VLAN, PoE switches for desk phones and a reliable internet connection (ideally with a backup) make the difference between clear calls and choppy ones.',
      },
      {
        q: 'What happens to our phones if the internet goes down?',
        a: 'Most cloud phone platforms can automatically forward calls to mobile apps or alternate numbers when desk phones go offline, so callers still reach you. A secondary internet connection keeps the office itself on the phones through an outage.',
      },
      {
        q: 'Can paging run through our phone system?',
        a: 'Yes. Many VoIP phones support multicast paging, and SIP paging adapters connect the phone system to overhead speakers and amplifiers, so one system handles calls, intercom and zone announcements.',
      },
    ],
    metaDescription:
      'Cloud VoIP phone systems, call flows, onboarding and zone paging for businesses across Southern California, installed and supported by Armak.',
  },

  /* ── A-06 ─────────────────────────────────────────────────────────── */
  'audio-video': {
    headline: 'Rooms that work when the meeting starts.',
    intro:
      'Displays, speakers, mounts and tuning for any space or scale: conference rooms, digital signage and distributed audio, set up so people can walk in and start a meeting.',
    capabilities: [
      {
        title: 'Conference & huddle rooms',
        body: 'Displays, cameras, microphones and speakers for video meetings, with simple controls so meetings start on time instead of ten minutes late.',
      },
      {
        title: 'Displays & digital signage',
        body: 'Commercial displays and signage for lobbies, menus, wayfinding and announcements, with content that can be updated without a ladder.',
      },
      {
        title: 'Distributed audio',
        body: 'Background music and zoned audio for offices, retail and hospitality, with volume and source control by area.',
      },
      {
        title: 'Mounting & clean installs',
        body: 'Wall, ceiling and furniture mounts with concealed cabling, so the equipment looks like it belongs there.',
      },
      {
        title: 'Tuning & commissioning',
        body: 'Levels, speaker coverage and microphone pickup tuned to the room, so speech is clear in every seat and on the far end of the call.',
      },
    ],
    standards: [
      'HDMI · HDBaseT',
      'AV-over-IP',
      '70V / 100V distributed audio',
      'USB-C presentation',
      'Commercial-grade displays',
    ],
    partnerCategories: ['AV'],
    faqs: [
      {
        q: 'Why use a commercial display instead of a consumer TV?',
        a: 'Commercial displays are built for longer daily operating hours, often run brighter, include control ports for room systems and carry warranties that cover business use, which many consumer TV warranties don’t. They also skip consumer features like on-screen ads and surprise software updates.',
      },
      {
        q: 'What makes a conference room good for video calls?',
        a: 'Audio first: microphones that cover every seat, echo cancellation and a room that isn’t too reverberant. Then a camera at roughly eye level that frames the whole table, a display sized for the viewing distance, and controls simple enough that anyone can start a meeting.',
      },
      {
        q: 'What is 70-volt audio?',
        a: '70V (or 100V) constant-voltage audio lets one amplifier drive many speakers over long cable runs, with each speaker tapped to its own level. It’s the standard approach for ceiling speakers in offices, retail spaces and paging systems.',
      },
      {
        q: 'How far can we run HDMI?',
        a: 'Passive HDMI cables are reliable only over fairly short distances: roughly 15 meters, less at higher resolutions. For longer runs, HDBaseT extenders carry video up to 100 meters over a single Cat 6A cable, and AV-over-IP distributes video across a network to many displays.',
      },
    ],
    metaDescription:
      'Conference room AV, commercial displays, digital signage and distributed audio for Southern California businesses, installed and tuned by Armak.',
  },
};
