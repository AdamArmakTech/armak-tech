import type { GlossaryEntry } from './types';

// Glossary entries for terms starting with a digit, A, B or C.
// Sorted alphabetically by term (case-insensitive), digits first.
export const entries: GlossaryEntry[] = [
  {
    term: "10GBASE-T",
    slug: "10gbase-t",
    aka: ["10-Gig Ethernet over copper", "10G copper"],
    category: "networking",
    definition:
      "The Ethernet standard for sending 10 gigabits per second over ordinary twisted-pair copper network cable. It reaches the full 100 meters on Cat 6A cable, but only about 55 meters on Cat 6.",
    why_it_matters:
      "If you want 10-gig speeds to desks, Wi-Fi access points or servers, your cable type decides whether that is possible without rewiring.",
    analogy:
      "Like a highway speed limit that only applies if the road was built to the right grade.",
    qa: [
      {
        q: "Do I need 10-gig speeds today?",
        a: "Most desks don’t yet. But newer Wi-Fi access points and servers can use more than 1 Gb/s, and cable stays in the walls for 15+ years, so many owners install cable that can handle 10-gig even if the switches are upgraded later.",
      },
      {
        q: "Will 10GBASE-T work on my existing Cat 6?",
        a: "Sometimes, on shorter runs. Cat 6 is generally only expected to carry 10 Gb/s up to about 55 meters, and results depend on how tightly cables are bundled. Cat 6A is designed for the full 100 meters.",
      },
      {
        q: "What does the “T” mean?",
        a: "It stands for twisted pair, the kind of copper cable used for office network jacks. Other 10-gig versions run over fiber optic cable instead.",
      },
    ],
    related: ["ethernet", "cat-6a", "cat-6", "gbps", "copper-cabling", "network-switch"],
    service: "networking",
  },
  {
    term: "70V audio",
    slug: "70v-audio",
    aka: ["Constant-voltage audio", "Distributed audio", "100V line (outside North America)"],
    category: "av",
    definition:
      "A way of wiring many speakers to one amplifier over long cable runs. Each speaker has a small transformer with settings (taps) that choose how loud it plays, so you can add speakers without complicated calculations.",
    why_it_matters:
      "It is the usual choice for overhead paging and background music across offices, warehouses and stores, because one amplifier can feed dozens of ceiling speakers.",
    analogy:
      "Like a water main with a valve at each faucet: the main stays at steady pressure and each tap takes only what it needs.",
    qa: [
      {
        q: "Can I use regular home speakers on a 70V system?",
        a: "Not directly. Standard speakers need a matching transformer, or they can be damaged and the system won’t work properly. Commercial ceiling and horn speakers usually have the transformer built in.",
      },
      {
        q: "How many speakers can one amplifier run?",
        a: "Add up the wattage tap chosen on each speaker; the total should stay comfortably below the amplifier’s rated output. Designers commonly leave about 20% headroom.",
      },
      {
        q: "Is 70V audio good for music?",
        a: "It is fine for background music and very good for clear announcements. For high-fidelity listening, like a boardroom or entertainment space, a different speaker setup is usually used.",
      },
    ],
    related: ["paging", "low-voltage", "intercom"],
    service: "audio-video",
  },
  {
    term: "Access control",
    slug: "access-control",
    aka: ["Electronic access control", "Door access system", "Badge system"],
    category: "access",
    definition:
      "An electronic system that decides who can open which doors, and when. People present a card, fob, phone or code at a reader, and the system unlocks the door only if that person is allowed in at that time.",
    why_it_matters:
      "You can add or cancel someone’s access instantly instead of re-keying locks, and every entry is logged for security and investigations.",
    analogy: "Like a guest list at the door, kept by a bouncer who never forgets a face or a time.",
    qa: [
      {
        q: "What happens if an employee loses their card?",
        a: "An administrator deactivates that card in the software, usually in a minute or two, and issues a new one. No locks need changing, which is one of the biggest advantages over metal keys.",
      },
      {
        q: "What happens to the doors if the power goes out?",
        a: "It depends on the lock hardware and backup batteries. Locks are chosen to either unlock (fail-safe) or stay locked (fail-secure) without power, and fire and building codes govern which doors must let people out.",
      },
      {
        q: "Can people still leave freely?",
        a: "Yes. Codes require that people can exit without a card, usually with a normal door handle, a push bar or an exit sensor on the inside.",
      },
    ],
    related: ["card-reader", "credential", "electric-strike", "maglock", "fail-safe-fail-secure", "request-to-exit-rex"],
    service: "access-control",
  },
  {
    term: "Access point",
    slug: "access-point",
    aka: ["AP", "WAP", "Wireless access point"],
    category: "networking",
    definition:
      "The device, usually mounted on a ceiling or wall, that creates the Wi-Fi signal phones and laptops connect to. It is wired back to a network switch by a network cable, which often also powers it.",
    why_it_matters:
      "Good Wi-Fi comes from enough access points in the right places, not from one powerful box, so placement drives both coverage and cost.",
    analogy: "Like a light fixture for wireless: each one lights up the area around it.",
    qa: [
      {
        q: "How many access points do I need?",
        a: "It depends on the floor plan, wall materials and how many people and devices connect at once. A wireless survey or careful design is the reliable way to decide; a rough guess often leaves dead spots or crowded areas.",
      },
      {
        q: "Is an access point the same as my home Wi-Fi router?",
        a: "Not quite. A home router combines a router, switch and access point in one box. Businesses use separate access points so they can place several around the building and manage them together.",
      },
      {
        q: "Why do access points need a cable if they’re wireless?",
        a: "The wireless part is only between your device and the access point. The access point still needs a wired connection back to the network, and that same cable usually supplies its power through PoE.",
      },
    ],
    related: ["poe", "network-switch", "wi-fi-6-6e-7", "wireless-survey", "router", "cloud-managed"],
    service: "networking",
  },
  {
    term: "ANSI/TIA-568",
    slug: "ansi-tia-568",
    stands_for: "American National Standards Institute / Telecommunications Industry Association standard 568",
    aka: ["TIA-568", "568 standard", "T568A / T568B"],
    category: "standards",
    definition:
      "The main North American standard for commercial building network cabling. It sets the rules for cable types, maximum lengths, connectors, wiring order and the tests a finished cable must pass.",
    why_it_matters:
      "Cabling built to this standard works with any brand of equipment and can be tested and compared objectively, which protects your investment for years.",
    analogy: "Like a building code, but for the network wiring inside your walls.",
    qa: [
      {
        q: "What are T568A and T568B?",
        a: "Two color orders for wiring the eight small wires in a network jack. Both work equally well; what matters is using the same one at both ends and throughout a building. T568B is very common in U.S. commercial work.",
      },
      {
        q: "Is following the standard required by law?",
        a: "Generally no; fire and electrical safety rules come from codes like the NEC. But owners, architects and manufacturers’ warranty programs commonly require TIA-568 compliance in project specifications.",
      },
      {
        q: "What’s the famous 100-meter rule?",
        a: "The standard limits a copper network link to 100 meters (about 328 feet) total: up to 90 meters of cable in the walls plus about 10 meters of patch cords at both ends.",
      },
    ],
    related: ["structured-cabling", "channel", "permanent-link", "cable-certification", "nec", "tia-606-labeling"],
    service: "structured-cabling",
  },
  {
    term: "Anti-passback",
    slug: "anti-passback",
    category: "access",
    definition:
      "An access control rule that stops one card from being used to enter twice in a row without first being used to exit. It prevents someone from passing their card back to a friend so both get in.",
    why_it_matters:
      "It keeps entry records accurate and closes a common loophole at parking gates, turnstiles and secure rooms.",
    analogy: "Like a stadium ticket that is marked used once you’re through the turnstile.",
    qa: [
      {
        q: "Does anti-passback need readers on both sides of the door?",
        a: "Usually yes. The system has to know when someone leaves, so there is typically a reader on the exit side as well as the entry side.",
      },
      {
        q: "What if someone follows another person through without badging?",
        a: "That’s called tailgating, and anti-passback alone won’t stop it. The next time that person badges in or out, the system may flag or deny them, which helps spot the problem.",
      },
    ],
    related: ["access-control", "card-reader", "credential"],
    service: "access-control",
  },
  {
    term: "As-built drawings",
    slug: "as-built-drawings",
    aka: ["As-builts", "Record drawings"],
    category: "general",
    definition:
      "Final drawings that show exactly what was installed and where, including any changes made during construction. For cabling, they typically show every jack location, its label and the telecom room it connects to.",
    why_it_matters:
      "Accurate as-builts make future troubleshooting, moves and expansions faster and cheaper, because no one has to trace cables blindly.",
    analogy: "Like a map of a house’s plumbing drawn after the pipes are in, not before.",
    qa: [
      {
        q: "How are as-builts different from the original plans?",
        a: "Plans show what was intended. As-builts show what actually happened after field changes, such as a jack moved to another wall or a cable rerouted around a beam.",
      },
      {
        q: "Should I ask for as-builts at the end of a project?",
        a: "Yes. Ask for them along with test results and labeling records, and store them where your facilities or IT team can find them. They are hard to recreate later.",
      },
    ],
    related: ["tia-606-labeling", "cable-certification", "structured-cabling", "drop"],
  },
  {
    term: "Auto-attendant",
    slug: "auto-attendant",
    aka: ["Automated attendant", "Phone tree", "IVR (in more advanced forms)"],
    category: "voice",
    definition:
      "The recorded greeting and menu that answers incoming calls, such as “Press 1 for sales, 2 for support.” It routes callers to the right person or department without a receptionist.",
    why_it_matters:
      "It lets a small staff handle calls professionally around the clock and can send after-hours calls to voicemail or an on-call number.",
    analogy: "Like a lobby directory that talks back.",
    qa: [
      {
        q: "Can I have different greetings for nights and holidays?",
        a: "Yes. Most modern phone systems let you set schedules so callers hear a different menu, or are routed differently, outside business hours.",
      },
      {
        q: "Will callers find it annoying?",
        a: "Long menus can frustrate people. Keep it short, put the most common options first, and always offer a way to reach a person.",
      },
    ],
    related: ["pbx", "voip", "unified-communications"],
    service: "voip-unified-comms",
  },
  {
    term: "Backbone cabling",
    slug: "backbone-cabling",
    aka: ["Riser cabling", "Vertical cabling"],
    category: "cabling",
    definition:
      "The main cables that connect telecom rooms to each other: between floors, between buildings, and from the main equipment room to smaller closets. It is often fiber optic cable because it carries lots of data over long distances.",
    why_it_matters:
      "Every user in the building depends on the backbone, so it needs extra capacity and spare strands for future growth.",
    analogy:
      "Like a building’s main water risers; horizontal cabling is the smaller pipes that branch off to each sink.",
    qa: [
      {
        q: "Why use fiber for the backbone instead of copper?",
        a: "Fiber carries far more data over much longer distances than copper network cable, which is limited to 100 meters. It is also unaffected by electrical interference between floors and buildings.",
      },
      {
        q: "How much extra capacity should the backbone have?",
        a: "Designers usually install more fiber strands than needed today, because pulling new backbone cable later is disruptive and costly compared to adding a few strands up front.",
      },
    ],
    related: ["horizontal-cabling", "fiber-optic-cable", "mdf", "idf", "riser-cable", "telecom-room"],
    service: "structured-cabling",
  },
  {
    term: "Bandwidth",
    slug: "bandwidth",
    category: "networking",
    definition:
      "How much data a connection can carry at once, usually measured in megabits or gigabits per second (Mbps or Gbps). For cable itself, bandwidth is rated in megahertz (MHz), a measure of the signal range it handles.",
    why_it_matters:
      "Too little bandwidth causes slow downloads, choppy video calls and lagging camera feeds when many people or devices share the same connection.",
    analogy: "Like the number of lanes on a highway: more lanes move more cars at the same time.",
    qa: [
      {
        q: "Is bandwidth the same as speed?",
        a: "People use them interchangeably, but bandwidth is capacity. Responsiveness also depends on latency, the delay before data arrives. A connection can have lots of bandwidth and still feel sluggish if latency is high.",
      },
      {
        q: "Why does my cable say 500 MHz instead of Gbps?",
        a: "Cable is rated by the signal frequency it can carry cleanly. Higher MHz ratings, like Cat 6A’s 500 MHz, are what allow higher data rates such as 10 Gb/s.",
      },
      {
        q: "How much internet bandwidth does my office need?",
        a: "It depends on headcount, video calls, cloud apps and cameras viewed remotely. Upload capacity matters too, especially for video conferencing and offsite backups.",
      },
    ],
    related: ["gbps", "latency", "isp", "wan", "cat-6a"],
    service: "networking",
  },
  {
    term: "Bend radius",
    slug: "bend-radius",
    aka: ["Minimum bend radius"],
    category: "cabling",
    definition:
      "The tightest curve a cable can be bent without damage or loss of performance. A common rule for office network cable is no tighter than four times the cable’s own diameter; fiber optic cable has its own, often larger, limits.",
    why_it_matters:
      "Cables kinked or bent too sharply can fail testing or slow down, often in ways that are hard to find once ceilings are closed.",
    analogy: "Like a garden hose: bend it too sharply and the flow drops.",
    qa: [
      {
        q: "How would I know if a cable is bent too tightly?",
        a: "Sometimes you can see kinks or sharp corners, but the reliable check is a certification test, which shows whether the cable still meets its performance limits.",
      },
      {
        q: "Is bend radius more important for fiber?",
        a: "Yes, in a practical sense. Bending fiber too tightly leaks light out of the glass, causing signal loss or even breakage, so installers use guides and slack loops to keep curves gentle.",
      },
    ],
    related: ["cable-certification", "fiber-optic-cable", "copper-cabling", "cable-management"],
    service: "structured-cabling",
  },
  {
    term: "BICSI",
    slug: "bicsi",
    stands_for: "Building Industry Consulting Service International",
    category: "standards",
    definition:
      "A professional association for the information and communications technology (ICT) cabling industry. It publishes design and installation manuals and offers credentials for designers, installers and technicians.",
    why_it_matters:
      "BICSI guidance and credentials are widely used as a benchmark of good practice when specifying or reviewing cabling work.",
    analogy: "Like a professional guild that writes the textbooks and gives the exams.",
    qa: [
      {
        q: "What is an RCDD?",
        a: "Registered Communications Distribution Designer, a well-known BICSI credential for people who design telecommunications cabling systems in buildings.",
      },
      {
        q: "Is BICSI the same as the TIA standards?",
        a: "No. TIA writes the formal cabling standards; BICSI is an association that publishes design guides and training built around those and other standards.",
      },
    ],
    related: ["ansi-tia-568", "structured-cabling", "nec"],
    service: "structured-cabling",
  },
  {
    term: "Biometric reader",
    slug: "biometric-reader",
    aka: ["Biometric scanner", "Fingerprint reader", "Face reader"],
    category: "access",
    definition:
      "A reader that identifies a person by a physical trait, such as a fingerprint, face or iris, instead of a card or code. It is used at doors and for employee time clocks.",
    why_it_matters:
      "A fingerprint or face can’t be lent or lost like a card, which suits high-security rooms and helps stop “buddy punching” on time clocks.",
    qa: [
      {
        q: "Are there privacy rules for biometrics?",
        a: "Yes. Several U.S. states, and California’s privacy law, treat biometric data as sensitive personal information. Check notice, consent and data-retention requirements before rolling it out to employees.",
      },
      {
        q: "Do biometric readers work with gloves or masks?",
        a: "Often not well. Fingerprint readers struggle with gloves or worn fingertips, and some face readers have trouble with masks or helmets, so many sites pair biometrics with a card or PIN.",
      },
    ],
    related: ["credential", "card-reader", "access-control", "time-and-attendance"],
    service: "access-control",
  },
  {
    term: "Bullet camera",
    slug: "bullet-camera",
    category: "security",
    definition:
      "A security camera with a long, cylindrical body, usually mounted on a wall or pole and pointed in one fixed direction. Its obvious shape makes it easy to see.",
    why_it_matters:
      "Visible cameras can deter trouble, and bullet cameras are often well suited to long views like parking lots, fences and building perimeters.",
    analogy: "Like a flashlight: it points one way and reaches far.",
    qa: [
      {
        q: "Bullet or dome camera: which is better?",
        a: "Neither is always better. Bullets are visible and often reach farther; domes are more discreet and harder to knock out of position. Many sites use both, chosen per location.",
      },
      {
        q: "Can bullet cameras go outdoors?",
        a: "Many are built for it. Look for a weather rating such as IP66 or IP67, and built-in infrared lighting if you need night coverage.",
      },
    ],
    related: ["ip-camera", "cctv", "nvr", "poe", "video-analytics"],
    service: "video-surveillance",
  },
  {
    term: "Cable certification",
    slug: "cable-certification",
    aka: ["Certification testing", "Cable testing"],
    category: "cabling",
    definition:
      "Testing each installed network cable with a specialized instrument to prove it meets the performance limits of its category, such as Cat 6A. The tester produces a pass/fail report for every link.",
    why_it_matters:
      "It is your proof the cabling performs as paid for, and manufacturers’ extended warranties typically require it.",
    analogy: "Like a home inspection with a signed report, done on every single cable.",
    qa: [
      {
        q: "Isn’t a simple continuity test enough?",
        a: "No. A basic tester only checks the wires connect in the right order. Certification also measures things like signal loss and crosstalk at high frequencies, which determine real-world speed.",
      },
      {
        q: "Should I keep the test results?",
        a: "Yes. Store the full report with your as-built drawings. It helps with troubleshooting and warranty claims, and shows future contractors what is in the walls.",
      },
      {
        q: "What happens if a cable fails?",
        a: "The installer finds the cause, often a bad termination, a kink or excess length, then fixes it and retests until it passes.",
      },
    ],
    related: ["ansi-tia-568", "permanent-link", "channel", "insertion-loss", "next", "return-loss", "as-built-drawings"],
    service: "structured-cabling",
  },
  {
    term: "Cable management",
    slug: "cable-management",
    category: "cabling",
    definition:
      "The hardware and practices used to route, bundle and support cables neatly, especially in racks and telecom rooms. It includes horizontal and vertical managers, D-rings, hook-and-loop straps and labeled bundles.",
    why_it_matters:
      "Tidy cabling speeds up troubleshooting, improves airflow to equipment and reduces accidental unplugging or damage during changes.",
    analogy: "Like closet organizers: the same stuff, but you can actually find things.",
    qa: [
      {
        q: "Why not just use zip ties?",
        a: "Plastic zip ties pulled tight can crush network cable and hurt performance, and must be cut to make changes. Reusable hook-and-loop straps are generally preferred for bundling network cables.",
      },
      {
        q: "Is messy cabling actually a problem or just ugly?",
        a: "It is a real problem. Tangles make it slow and risky to trace a cable, block cooling airflow and increase the chance of unplugging the wrong thing during routine work.",
      },
    ],
    related: ["rack", "patch-panel", "patch-cable", "telecom-room", "bend-radius"],
    service: "structured-cabling",
  },
  {
    term: "Cable tray",
    slug: "cable-tray",
    aka: ["Basket tray", "Ladder rack", "Wire mesh tray"],
    category: "cabling",
    definition:
      "An open metal tray or ladder, usually mounted above the ceiling or over racks, that carries large bundles of cable along a building’s main routes. Common styles include wire basket and ladder tray.",
    why_it_matters:
      "It supports heavy cable loads safely and keeps routes open and accessible, making future additions much easier than fishing new cables through ceilings.",
    analogy: "Like a shelf or rain gutter for cables running overhead.",
    qa: [
      {
        q: "Cable tray or J-hooks: which do I need?",
        a: "Tray is common along main corridors where many cables run together. J-hooks are lighter supports often used for smaller branches heading to individual rooms. Many buildings use both.",
      },
      {
        q: "Can network cables share a tray with power wiring?",
        a: "Generally they are kept separate, or divided by a barrier, to meet code and reduce electrical interference. Your installer should follow the NEC and the project’s design requirements.",
      },
    ],
    related: ["pathway", "j-hook", "conduit", "grounding-and-bonding"],
    service: "structured-cabling",
  },
  {
    term: "Card reader",
    slug: "card-reader",
    aka: ["Badge reader", "Access reader"],
    category: "access",
    definition:
      "The small device mounted beside a door that reads a credential, such as a key card, fob or phone. It sends what it reads to an access control panel, which decides whether to unlock the door.",
    why_it_matters:
      "The reader technology you choose affects security, user convenience and whether cards can be easily copied.",
    analogy: "Like a ticket scanner at a concert gate.",
    qa: [
      {
        q: "Does the reader decide who gets in?",
        a: "Usually not. Most readers just pass the card information to a controller elsewhere, which checks permissions and unlocks the door. That keeps the decision-making out of reach on the secure side.",
      },
      {
        q: "Can old card readers be copied or hacked?",
        a: "Some can. Older 125 kHz proximity cards are widely known to be easy to clone. Newer encrypted smart cards and mobile credentials, connected over secure wiring like OSDP, are much harder to copy.",
      },
    ],
    related: ["access-control", "credential", "prox-card", "mobile-credential", "osdp", "wiegand"],
    service: "access-control",
  },
  {
    term: "Cat 5e",
    slug: "cat-5e",
    stands_for: "Category 5 enhanced",
    aka: ["Category 5e"],
    category: "cabling",
    definition:
      "An older grade of copper network cable, rated to 100 MHz. It supports 1 Gb/s (and usually 2.5 Gb/s) over the standard 100-meter distance, but not 10 Gb/s.",
    why_it_matters:
      "Many existing buildings still have it; it may serve today’s desks but can limit newer Wi-Fi access points and future upgrades.",
    analogy: "Like a two-lane road: perfectly usable, but not built for tomorrow’s traffic.",
    qa: [
      {
        q: "Do I need to rip out my Cat 5e?",
        a: "Not necessarily. If it tests well and your devices only need 1 Gb/s, it can keep working. Plan an upgrade when you add faster Wi-Fi, renovate, or the cable starts failing.",
      },
      {
        q: "Should new installations use Cat 5e?",
        a: "It is rarely chosen for new commercial work now. Cat 6 or Cat 6A costs somewhat more but lasts much longer as a useful investment.",
      },
    ],
    related: ["cat-6", "cat-6a", "copper-cabling", "ethernet", "bandwidth"],
    service: "structured-cabling",
  },
  {
    term: "Cat 6",
    slug: "cat-6",
    stands_for: "Category 6",
    aka: ["Category 6"],
    category: "cabling",
    definition:
      "A common grade of copper network cable, rated to 250 MHz. It handles 1 Gb/s easily at the standard 100 meters and can carry 10 Gb/s on shorter runs, generally up to about 55 meters.",
    why_it_matters:
      "It is a solid, budget-friendly choice for many offices, though it may limit long 10-gig runs in the future.",
    analogy: "Like a good four-lane road: plenty for most daily traffic.",
    qa: [
      {
        q: "Cat 6 or Cat 6A: which should I choose?",
        a: "Cat 6 is cheaper and thinner. Cat 6A supports 10 Gb/s to the full 100 meters and handles heavy PoE power better. For new Wi-Fi access points and long-term buildings, many designers prefer Cat 6A.",
      },
      {
        q: "Will Cat 6 work with my current equipment?",
        a: "Yes. It uses the same RJ45 jacks and works with standard Ethernet devices, and it is backward compatible with older, slower equipment.",
      },
    ],
    related: ["cat-5e", "cat-6a", "10gbase-t", "copper-cabling", "rj45"],
    service: "structured-cabling",
  },
  {
    term: "Cat 6A",
    slug: "cat-6a",
    stands_for: "Category 6 augmented",
    aka: ["Category 6A", "Cat 6 augmented"],
    category: "cabling",
    definition:
      "A higher grade of copper network cable, rated to 500 MHz, that supports 10 Gb/s over the full 100-meter distance. It is thicker than Cat 6 and better at handling the heat from powering devices over the cable (PoE).",
    why_it_matters:
      "It is widely considered the safest choice for new buildings, supporting today’s and upcoming Wi-Fi and devices for the life of the cabling.",
    analogy: "Like building the wider road now, so you don’t have to tear it up later.",
    qa: [
      {
        q: "Is Cat 6A worth the extra cost?",
        a: "Often, for new construction. Labor is a big part of cabling cost, and pulling new cable later is disruptive. Cat 6A’s higher material cost buys 10 Gb/s headroom and better PoE performance for years.",
      },
      {
        q: "Does Cat 6A take up more space?",
        a: "Yes. It is noticeably thicker and stiffer, so trays, conduits and patch panels fill up faster. That needs to be planned in the pathway design.",
      },
      {
        q: "Will it make my internet faster?",
        a: "Not by itself. Your internet speed is set by your provider. Cat 6A raises the ceiling for traffic inside your building, such as between Wi-Fi, switches and servers.",
      },
    ],
    related: ["cat-6", "10gbase-t", "poe", "copper-cabling", "utp-stp", "access-point"],
    service: "structured-cabling",
  },
  {
    term: "Cat 8",
    slug: "cat-8",
    stands_for: "Category 8",
    aka: ["Category 8"],
    category: "cabling",
    definition:
      "A shielded copper network cable rated to 2,000 MHz that supports 25 or 40 Gb/s, but only over short distances of up to 30 meters. It is designed for connecting equipment inside data centers.",
    why_it_matters:
      "It is usually not the right choice for office desks or Wi-Fi, so seeing it in a quote for ordinary work is worth questioning.",
    analogy: "Like a racetrack: incredibly fast, but only for short laps.",
    qa: [
      {
        q: "Should I wire my office with Cat 8?",
        a: "Usually no. Its 30-meter limit is too short for most office runs, and desks and access points don’t need its speed. Cat 6A is the typical choice for building-wide cabling.",
      },
      {
        q: "Where is Cat 8 actually used?",
        a: "Mainly between switches and servers in data centers, often within the same or nearby racks, where its short reach is enough.",
      },
    ],
    related: ["cat-6a", "utp-stp", "copper-cabling", "rack"],
    service: "structured-cabling",
  },
  {
    term: "CCTV",
    slug: "cctv",
    stands_for: "Closed-circuit television",
    aka: ["Security cameras", "Video surveillance"],
    category: "security",
    definition:
      "A camera system whose video goes only to your own monitors and recorders, not broadcast publicly. The term began with analog cameras but is now used loosely for any security camera system, including modern network-based ones.",
    why_it_matters:
      "Cameras help deter theft, document incidents and support insurance or police reports, but only if image quality and recording are planned properly.",
    analogy: "Like a private TV channel that only your building can watch.",
    qa: [
      {
        q: "Is CCTV the same as IP cameras?",
        a: "Today the terms overlap. Traditional CCTV used analog cameras over coaxial cable; most new systems use IP cameras over network cable. People still call both “CCTV.”",
      },
      {
        q: "How long is video kept?",
        a: "As long as your recorder’s storage allows, often 30 days or more depending on camera count, resolution and settings. Some industries and policies set specific retention periods.",
      },
    ],
    related: ["ip-camera", "nvr", "vms", "coaxial-cable", "video-analytics"],
    service: "video-surveillance",
  },
  {
    term: "Channel",
    slug: "channel",
    aka: ["Cabling channel", "End-to-end link"],
    category: "cabling",
    definition:
      "The complete copper path from a network switch to a device, including the cable in the walls plus the patch cords at both ends. By standard, a channel can be at most 100 meters long.",
    why_it_matters:
      "Real-world performance depends on the whole channel, so cheap or overly long patch cords can undermine even premium in-wall cable.",
    analogy: "Like an entire trip door to door, including the walk to and from the car.",
    qa: [
      {
        q: "What’s the difference between a channel and a permanent link?",
        a: "The permanent link is just the fixed cable in the walls, from patch panel to wall jack (up to 90 meters). The channel adds the patch cords at each end (up to 10 meters total).",
      },
      {
        q: "Do patch cords really matter?",
        a: "Yes. Damaged, low-quality or wrong-category cords are a common cause of network problems, and they count toward the 100-meter limit.",
      },
    ],
    related: ["permanent-link", "patch-cable", "ansi-tia-568", "cable-certification", "horizontal-cabling"],
    service: "structured-cabling",
  },
  {
    term: "Cloud-managed",
    slug: "cloud-managed",
    aka: ["Cloud-based management", "Hosted management"],
    category: "networking",
    definition:
      "Equipment, such as Wi-Fi, switches, cameras or door systems, that is configured and monitored through a website run by the manufacturer, rather than a server in your building. Licenses are usually paid by subscription.",
    why_it_matters:
      "It allows remote management of many sites from one dashboard, but adds ongoing license costs that should be budgeted.",
    analogy: "Like managing your bank account online instead of visiting the branch.",
    qa: [
      {
        q: "If the internet goes down, does everything stop working?",
        a: "Usually not. Most cloud-managed devices keep running with their last settings, but you can’t view or change them remotely until the connection returns. Check how each product behaves before buying.",
      },
      {
        q: "What happens if I stop paying the license?",
        a: "It varies by manufacturer. Some products lose management features; others may stop working. Read the licensing terms closely before committing.",
      },
    ],
    related: ["access-point", "network-switch", "vms", "isp"],
    service: "networking",
  },
  {
    term: "Coaxial cable",
    slug: "coaxial-cable",
    aka: ["Coax", "RG-6", "RG-59"],
    category: "cabling",
    definition:
      "A round cable with a single copper center wire surrounded by insulation, a metal shield and an outer jacket. It is used for cable TV, cable internet and older analog security cameras.",
    why_it_matters:
      "Many buildings still have coax from older camera or TV systems, which affects upgrade plans and costs.",
    analogy: "Like a pipe within a pipe: the signal travels down the middle, shielded by the outer layer.",
    qa: [
      {
        q: "Do I have to replace coax to upgrade to IP cameras?",
        a: "Not always. Adapters can send network data and power over existing coax, which can save labor. But new network cable often performs better and is more future-proof.",
      },
      {
        q: "Is coax the same as network cable?",
        a: "No. Office network cable is twisted-pair copper with eight wires and RJ45 plugs. Coax has one center conductor and uses screw-on or twist-lock connectors.",
      },
    ],
    related: ["cctv", "copper-cabling", "ip-camera", "utp-stp"],
  },
  {
    term: "Conduit",
    slug: "conduit",
    aka: ["EMT", "Raceway"],
    category: "cabling",
    definition:
      "A protective tube, usually metal or plastic, that cables are pulled through. It is used inside walls, underground, in exposed areas, or wherever building code or the design requires protection.",
    why_it_matters:
      "Conduit protects cables from damage and makes future replacements easier, but it costs more to install and can only be filled so far.",
    analogy: "Like a drinking straw for cables: it guides and protects what runs inside.",
    qa: [
      {
        q: "Is conduit always required for network cable?",
        a: "No. Indoors above accessible ceilings, cables often run on J-hooks or tray. Conduit is common through walls, underground, outdoors, in exposed areas, or when local code or the building owner requires it.",
      },
      {
        q: "Why can’t I just fill the conduit up?",
        a: "Overfilling makes cables hard to pull, risks damage and traps heat. Codes and design guides limit fill, commonly to about 40% of the tube’s area for multiple cables, and also limit sharp bends.",
      },
    ],
    related: ["pathway", "cable-tray", "j-hook", "nec"],
    service: "structured-cabling",
  },
  {
    term: "Consolidation point",
    slug: "consolidation-point",
    aka: ["CP"],
    category: "cabling",
    definition:
      "An optional in-between connection point in a ceiling or floor box, used in open offices. Cables run from the telecom room to the consolidation point, and shorter cables continue from there to each desk.",
    why_it_matters:
      "When desks are rearranged, only the short final cables need changing, which lowers the cost and disruption of office moves.",
    analogy: "Like a junction box partway along a route, so you only rewire the last stretch.",
    qa: [
      {
        q: "Are there rules for where it goes?",
        a: "Yes. The TIA standard calls for it to be at least 15 meters (about 49 feet) from the telecom room, allows only one per cable run, and it must stay accessible.",
      },
      {
        q: "Is it the same as zone cabling?",
        a: "They’re closely related. Zone cabling is the overall design approach of serving areas from intermediate points; a consolidation point is one of the hardware options used to do it.",
      },
    ],
    related: ["zone-cabling", "horizontal-cabling", "telecom-room", "permanent-link"],
    service: "structured-cabling",
  },
  {
    term: "Copper cabling",
    slug: "copper-cabling",
    aka: ["Twisted-pair cabling", "Network cable", "Ethernet cable"],
    category: "cabling",
    definition:
      "Network cable made of copper wires twisted together in pairs, such as Cat 6 or Cat 6A. It connects most computers, phones, cameras and Wi-Fi access points and can also carry power to them.",
    why_it_matters:
      "It is the most common and cost-effective way to wire devices, but each run is limited to 100 meters, which shapes telecom room placement.",
    analogy: "Like the electrical wiring in your walls, but for data.",
    qa: [
      {
        q: "Why are the wires twisted?",
        a: "Twisting each pair helps cancel out electrical interference from neighboring wires and nearby equipment, so the signal stays clean.",
      },
      {
        q: "When should I use fiber instead of copper?",
        a: "Fiber is usually used for long distances, links between telecom rooms and buildings, and very high speeds. Copper is typically used for the final run to devices, especially those powered over the cable.",
      },
    ],
    related: ["cat-6", "cat-6a", "utp-stp", "poe", "fiber-optic-cable", "rj45"],
    service: "structured-cabling",
  },
  {
    term: "Credential",
    slug: "credential",
    category: "access",
    definition:
      "Anything a person presents to an access control system to prove who they are, such as a key card, key fob, PIN code, smartphone app or fingerprint.",
    why_it_matters:
      "The type of credential you choose affects how easily it can be copied, lost or shared, and how convenient it is for people every day.",
    analogy: "Like a house key, but one that can be switched off from a computer.",
    qa: [
      {
        q: "Which credential is most secure?",
        a: "Encrypted smart cards and mobile credentials are generally much harder to copy than older proximity cards. Combining two, such as a card plus a PIN, adds more protection for sensitive areas.",
      },
      {
        q: "Can I use my phone instead of a card?",
        a: "Many modern systems support mobile credentials, where a phone app or digital wallet acts as the key, if the readers are compatible.",
      },
    ],
    related: ["card-reader", "prox-card", "mobile-credential", "biometric-reader", "access-control"],
    service: "access-control",
  },
  {
    term: "Cross-connect",
    slug: "cross-connect",
    category: "cabling",
    definition:
      "A connection point in a telecom room where two sets of cabling are joined using short patch cords or jumper wires. It lets technicians change which line goes where without touching the permanent cables.",
    why_it_matters:
      "It makes moves and changes fast and organized, since connections are rearranged at a panel instead of re-terminating cables.",
    analogy: "Like an old telephone switchboard, where an operator moves cords to connect different lines.",
    qa: [
      {
        q: "How is a cross-connect different from plugging straight into the switch?",
        a: "Plugging cables from the patch panel directly into the switch is called an interconnect. A cross-connect adds a second panel so equipment connections stay fixed and only short cords between panels are moved.",
      },
      {
        q: "Do I need one?",
        a: "Larger or critical networks often use cross-connects for organization and to protect equipment ports. Smaller offices commonly use the simpler interconnect method.",
      },
    ],
    related: ["patch-panel", "patch-cable", "telecom-room", "mdf", "idf", "punch-down"],
    service: "structured-cabling",
  },
];
