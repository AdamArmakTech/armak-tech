import type { GlossaryEntry } from './types';

// Glossary terms I–N. Sorted alphabetically by term (case-insensitive).
export const entries: GlossaryEntry[] = [
  {
    term: 'IDF',
    slug: 'idf',
    stands_for: 'Intermediate Distribution Frame',
    aka: ['Telecom closet', 'Network closet', 'Floor closet'],
    category: 'cabling',
    definition:
      'A smaller wiring closet, usually one per floor or area, where the cables from nearby desks, cameras and Wi-Fi points come together. Each IDF connects back to the building’s main room (the MDF) over backbone cabling.',
    why_it_matters:
      'Copper network cable is limited to about 100 meters, so IDFs are what let a large building reach every corner without failing that limit.',
    analogy:
      'Like a neighborhood post office that collects local mail before sending it to the main sorting center.',
    qa: [
      {
        q: 'What’s the difference between an MDF and an IDF?',
        a: 'The MDF is the main room where the internet and phone service enters and the core equipment lives. IDFs are the smaller satellite closets that serve individual floors or zones and link back to the MDF.',
      },
      {
        q: 'Does my building need an IDF?',
        a: 'Only if some devices would end up more than about 90 meters (roughly 295 feet) of cable away from the main room. Small offices often run everything from a single room; larger or multi-floor buildings usually need one or more IDFs.',
      },
      {
        q: 'What goes inside an IDF?',
        a: 'Typically a rack or wall cabinet holding patch panels, network switches, a battery backup (UPS) and the fiber or copper link back to the MDF. It should be secured, ventilated and have dedicated power.',
      },
    ],
    related: ['mdf', 'telecom-room', 'backbone-cabling', 'horizontal-cabling', 'rack', 'patch-panel', 'network-switch'],
    service: 'structured-cabling',
  },
  {
    term: 'IEEE 802.3 (PoE standards)',
    slug: 'ieee-802-3-poe-standards',
    stands_for: 'Institute of Electrical and Electronics Engineers standard 802.3',
    aka: ['802.3af', '802.3at', '802.3bt', 'PoE+', 'PoE++'],
    category: 'standards',
    definition:
      'IEEE 802.3 is the official family of Ethernet standards. Its Power over Ethernet versions, 802.3af, 802.3at (PoE+) and 802.3bt (PoE++), define how much electrical power a network cable can safely deliver to a device.',
    why_it_matters:
      'Matching each device’s power class to the switch prevents cameras, access points or displays from rebooting, losing features or not turning on at all.',
    analogy:
      'Like the ratings on a power strip: they tell you how much you can plug in before it can’t keep up.',
    qa: [
      {
        q: 'How much power does each PoE version deliver?',
        a: 'At the switch: 802.3af gives up to 15.4 watts per port, 802.3at (PoE+) up to 30 W, and 802.3bt up to 60 W (Type 3) or 90 W (Type 4). The device receives somewhat less because some power is lost in the cable.',
      },
      {
        q: 'Which version do I need?',
        a: 'Check each device’s spec sheet. Desk phones and basic cameras usually run on 802.3af, many Wi-Fi access points and PTZ cameras want PoE+, and some displays, heated outdoor cameras and lighting need 802.3bt.',
      },
      {
        q: 'Is “passive PoE” the same thing?',
        a: 'No. Passive PoE is a non-standard method that sends power without first checking what’s connected. Standard 802.3 PoE negotiates with the device before powering it, so it won’t damage equipment that doesn’t expect power.',
      },
    ],
    related: ['poe', 'ethernet', 'network-switch', 'access-point', 'ip-camera', 'cat-6a'],
    service: 'networking',
  },
  {
    term: 'Insertion loss',
    slug: 'insertion-loss',
    aka: ['Attenuation'],
    category: 'cabling',
    definition:
      'How much a signal weakens as it travels through a cable and its connectors, measured in decibels (dB). Longer cables, extra connections and higher speeds all increase it; lower numbers are better.',
    why_it_matters:
      'Too much loss means the far end can’t read the signal cleanly, causing slow or dropped connections. It’s one of the main pass/fail tests in cable certification.',
    analogy:
      'Like a voice fading as you shout down a long hallway: the farther it goes, the quieter it gets.',
    qa: [
      {
        q: 'What causes high insertion loss?',
        a: 'Runs that are too long, poor-quality or damaged cable, too many connections in a row, dirty or badly polished fiber connectors, and cable kinked or bent tighter than its rated bend radius.',
      },
      {
        q: 'Is it measured on copper and fiber?',
        a: 'Yes. Copper testers measure it across a range of frequencies; fiber testers measure how much light is lost from end to end. Both compare the result with the limits set by the cabling standard.',
      },
      {
        q: 'Is insertion loss the same as attenuation?',
        a: 'Essentially, yes. “Attenuation” is the older term; current standards use “insertion loss” because it includes losses from connectors and patch cords, not just the cable itself.',
      },
    ],
    related: ['cable-certification', 'return-loss', 'next', 'permanent-link', 'channel', 'fiber-optic-cable'],
    service: 'structured-cabling',
  },
  {
    term: 'Intercom',
    slug: 'intercom',
    aka: ['Door station', 'Entry phone', 'Video intercom'],
    category: 'access',
    definition:
      'A two-way talk system, often with a camera, that lets someone at a door or gate speak with a person inside. Many intercoms can also unlock the door remotely once the visitor is identified.',
    why_it_matters:
      'It lets staff or residents screen visitors and deliveries without walking to the door or leaving entrances propped open.',
    analogy: 'Like a doorbell that lets you see, talk to and buzz in whoever is standing outside.',
    qa: [
      {
        q: 'Can an intercom ring my cell phone?',
        a: 'Many modern IP and cloud-based intercoms can send calls to a smartphone app or desk phone, so you can answer and unlock from anywhere. Older audio-only systems usually ring only fixed indoor stations.',
      },
      {
        q: 'Does an intercom replace access control?',
        a: 'Not usually. Intercoms handle visitors; access control handles people who are allowed in on their own with a card, fob or phone. The two are often connected so the intercom can trigger the same door lock.',
      },
    ],
    related: ['access-control', 'electric-strike', 'maglock', 'voip', 'ip-camera', 'paging', 'mobile-credential'],
    service: 'access-control',
  },
  {
    term: 'IP address',
    slug: 'ip-address',
    stands_for: 'Internet Protocol address',
    category: 'networking',
    definition:
      'A numeric label, such as 192.168.1.20, that identifies each device on a network so data reaches the right place. Devices on your internal network get private addresses; your internet connection has a public one.',
    why_it_matters:
      'Organized IP addressing makes cameras, phones and printers easy to find and troubleshoot, and keeps two devices from clashing over the same address.',
    analogy: 'Like a street address for every device, so deliveries go to the right door.',
    qa: [
      {
        q: 'What’s a static versus a dynamic IP address?',
        a: 'A dynamic address is handed out automatically and can change over time. A static address is fixed. Servers, cameras, printers and door controllers often get fixed addresses (or reserved ones) so other systems can always find them.',
      },
      {
        q: 'What’s the difference between an IP address and a MAC address?',
        a: 'A MAC address is a permanent hardware ID built into a device. An IP address is assigned by the network and can change if the device moves to a different network.',
      },
      {
        q: 'What are IPv4 and IPv6?',
        a: 'Two versions of the addressing system. IPv4 uses short addresses like 192.168.1.20 and is running out of unique public addresses; IPv6 uses much longer addresses so there are effectively unlimited. Most networks use both today.',
      },
    ],
    related: ['mac-address', 'lan', 'router', 'network-switch', 'vlan', 'isp'],
    service: 'networking',
  },
  {
    term: 'IP camera',
    slug: 'ip-camera',
    stands_for: 'Internet Protocol camera',
    aka: ['Network camera'],
    category: 'security',
    definition:
      'A digital security camera that sends its video over a computer network instead of a dedicated video cable. Most get both data and power through a single network cable using PoE.',
    why_it_matters:
      'IP cameras offer far sharper images than older analog cameras, can be viewed remotely, and run on the same structured cabling as the rest of your network.',
    analogy: 'Like a camera that’s also a small computer, plugged into your network like any other device.',
    qa: [
      {
        q: 'How is an IP camera different from older CCTV cameras?',
        a: 'Traditional analog CCTV cameras send video over coaxial cable to a DVR. IP cameras send digital video over network cable to an NVR or video management software, usually with higher resolution and smarter features.',
      },
      {
        q: 'Does an IP camera need internet access?',
        a: 'No. It needs a local network to reach its recorder. Internet access is only needed for remote viewing or cloud features, and should be set up securely.',
      },
      {
        q: 'Can different camera brands work together?',
        a: 'Often, if the cameras and the recorder both support the ONVIF standard. Some advanced features, such as certain analytics, may only work fully within one manufacturer’s system.',
      },
    ],
    related: ['cctv', 'nvr', 'vms', 'poe', 'onvif', 'megapixel', 'h-264-h-265', 'video-analytics'],
    service: 'video-surveillance',
  },
  {
    term: 'IP rating',
    slug: 'ip-rating',
    stands_for: 'Ingress Protection rating',
    aka: ['IP66', 'IP67', 'Weatherproof rating'],
    category: 'security',
    definition:
      'A two-digit code from the international standard IEC 60529 showing how well a device’s housing keeps out dust (first digit) and water (second digit). Outdoor cameras are commonly rated IP66 or IP67.',
    why_it_matters:
      'Choosing the right rating keeps outdoor cameras, intercoms and speakers working through rain, sprinklers, pressure washing and dust.',
    analogy: 'Like the water-resistance rating on a watch, but covering dust as well.',
    qa: [
      {
        q: 'Is an IP rating related to an IP address?',
        a: 'No. It’s just the same two letters. In an IP rating, “IP” means Ingress Protection, a measure of how sealed a device is. An IP address is a network identifier.',
      },
      {
        q: 'What do the numbers mean?',
        a: 'The first digit (0–6) rates protection from solids and dust; 6 means dust-tight. The second (0–9) rates water protection: 5 and 6 cover water jets, 7 covers temporary immersion. Higher is not automatically better for every use. Check the specific tests listed.',
      },
      {
        q: 'What’s an IK rating?',
        a: 'A separate standard (IEC 62262) for impact resistance. IK10 is the highest common rating and is often specified for vandal-resistant cameras in reachable locations.',
      },
    ],
    related: ['ip-camera', 'intercom'],
    service: 'video-surveillance',
  },
  {
    term: 'IR illumination',
    slug: 'ir-illumination',
    stands_for: 'Infrared illumination',
    aka: ['Night vision', 'IR LEDs'],
    category: 'security',
    definition:
      'Built-in infrared lights on a security camera that light up a scene with light invisible to the human eye, so the camera can see in darkness. Images under IR are typically black and white.',
    why_it_matters:
      'It allows cameras to record usable night footage without adding visible lighting, though range and image quality depend on the camera and surroundings.',
    analogy: 'Like a flashlight only the camera can see.',
    qa: [
      {
        q: 'Why does my night footage look washed out or blurry?',
        a: 'Common causes are IR reflecting off nearby walls, eaves or glass, spider webs or rain near the lens, or a subject beyond the camera’s IR range. Camera placement and settings usually fix it.',
      },
      {
        q: 'Can IR cameras see through windows?',
        a: 'Not well. The camera’s own IR light reflects off the glass straight back into the lens. Cameras meant to watch outside should generally be mounted outdoors.',
      },
    ],
    related: ['ip-camera', 'cctv', 'megapixel', 'video-analytics'],
    service: 'video-surveillance',
  },
  {
    term: 'ISP',
    slug: 'isp',
    stands_for: 'Internet Service Provider',
    aka: ['Carrier', 'Internet provider'],
    category: 'networking',
    definition:
      'The company that brings internet service into your building, over fiber, cable, copper, wireless or satellite. The ISP’s responsibility usually ends at the demarc, where its line meets your building’s own network.',
    why_it_matters:
      'Your ISP and plan set the speed and reliability ceiling for everything online, including cloud apps, VoIP phones and remote camera viewing.',
    qa: [
      {
        q: 'Should a business have two ISPs?',
        a: 'If downtime is costly, a second connection from a different provider, ideally on a different type of line, lets a firewall or router fail over automatically when the main service goes down.',
      },
      {
        q: 'Who fixes problems: the ISP or my IT/cabling contractor?',
        a: 'Generally the ISP handles everything up to the demarc. Wiring, switches and Wi-Fi beyond that point are the building’s responsibility, so it helps to know exactly where the demarc is.',
      },
      {
        q: 'What’s the difference between dedicated and broadband internet?',
        a: 'Broadband is shared with other customers and often faster down than up. Dedicated internet is reserved for you, usually with equal upload and download speeds and a service-level agreement, at a higher price.',
      },
    ],
    related: ['demarc', 'wan', 'router', 'firewall', 'bandwidth', 'mbps'],
    service: 'networking',
  },
  {
    term: 'J-hook',
    slug: 'j-hook',
    aka: ['Cable hook', 'Bridle ring'],
    category: 'cabling',
    definition:
      'A J-shaped metal or plastic hanger fastened to the building structure, usually above a ceiling, that holds bundles of network cable. A row of them forms a simple pathway for cables to follow.',
    why_it_matters:
      'Properly spaced J-hooks keep cables from sagging, kinking or resting on ceiling tiles, which protects performance and keeps inspectors satisfied.',
    analogy: 'Like a series of coat hooks holding cables up off the floor of the ceiling space.',
    qa: [
      {
        q: 'Why not just lay cables on the ceiling tiles?',
        a: 'Codes generally require cables to be supported by the building structure, not the ceiling grid or tiles. Loose cables also get crushed, kinked or tangled, which can hurt performance and make future work harder.',
      },
      {
        q: 'How far apart should J-hooks be?',
        a: 'Industry practice is typically no more than about 4 to 5 feet (1.5 m) apart, with the cable allowed to sag only slightly between them. Each hook also has a maximum number of cables it should hold.',
      },
      {
        q: 'When should I use cable tray instead?',
        a: 'Cable tray suits large bundles, main routes and areas where lots of cables will be added later. J-hooks are cost-effective for smaller bundles branching off to individual rooms.',
      },
    ],
    related: ['pathway', 'cable-tray', 'conduit', 'horizontal-cabling', 'plenum-cable'],
    service: 'structured-cabling',
  },
  {
    term: 'Jitter',
    slug: 'jitter',
    aka: ['Packet delay variation'],
    category: 'networking',
    definition:
      'The variation in how long data packets take to arrive. Even if the average delay is fine, packets that arrive unevenly cause choppy, robotic or broken-up audio and video.',
    why_it_matters:
      'Jitter is a common hidden cause of poor VoIP and video calls, even on fast internet connections.',
    analogy:
      'Like a bus that’s due every 10 minutes but shows up after 2, then 18, then 5. The average is fine; the wait isn’t.',
    qa: [
      {
        q: 'How is jitter different from latency?',
        a: 'Latency is how long data takes to arrive. Jitter is how much that time varies from one packet to the next. Calls suffer from both, but jitter is often what makes voices sound choppy.',
      },
      {
        q: 'How do you reduce jitter?',
        a: 'Prioritize voice and video traffic with quality-of-service settings, separate it with a voice VLAN, avoid overloaded links, and use a reliable internet connection. Phones also use a small “jitter buffer” to smooth out minor variation.',
      },
    ],
    related: ['latency', 'voip', 'bandwidth', 'vlan', 'unified-communications'],
    service: 'voip-unified-comms',
  },
  {
    term: 'Key fob',
    slug: 'key-fob',
    aka: ['Fob', 'Proximity fob'],
    category: 'access',
    definition:
      'A small plastic credential, usually on a keyring, that unlocks doors when held near a card reader. It contains the same kind of chip or antenna as an access card, just in a different shape.',
    why_it_matters:
      'Fobs are durable and convenient, and a lost one can be switched off in the software instead of rekeying locks.',
    analogy: 'Like a house key that can be cancelled the moment it goes missing.',
    qa: [
      {
        q: 'Is a fob more secure than a card?',
        a: 'Not because of its shape. Security depends on the technology inside. Older 125 kHz proximity fobs can be copied cheaply; newer encrypted smart-card fobs are much harder to clone.',
      },
      {
        q: 'Will my existing fobs work with a new system?',
        a: 'Only if the new readers support the same credential technology and format. Many readers handle several formats, which can let you migrate gradually, but it should be confirmed before purchasing.',
      },
    ],
    related: ['credential', 'prox-card', 'card-reader', 'mobile-credential', 'access-control'],
    service: 'access-control',
  },
  {
    term: 'Keystone jack',
    slug: 'keystone-jack',
    aka: ['Keystone', 'Data jack', 'Modular jack'],
    category: 'cabling',
    definition:
      'A small snap-in network jack, most often an RJ45, that a cable is terminated into and then clipped into a wall plate or modular patch panel. Its standard shape lets different jack types share one plate.',
    why_it_matters:
      'Quality, correctly rated jacks are where many cable runs pass or fail testing, and the snap-in design makes repairs and changes quick.',
    analogy: 'Like a LEGO brick for wall outlets: a standard shape that clicks into place.',
    qa: [
      {
        q: 'Does the jack have to match the cable category?',
        a: 'Yes. A link only performs to the level of its weakest part, so a Cat 6A cable needs Cat 6A jacks and patch panels to deliver Cat 6A performance.',
      },
      {
        q: 'What else besides network jacks can go in a keystone plate?',
        a: 'Keystone-sized inserts exist for coax, HDMI, USB, audio and fiber, so one wall plate can combine network and AV connections.',
      },
      {
        q: 'Can a damaged jack be replaced without running new cable?',
        a: 'Usually. A technician re-terminates the existing cable onto a new jack, as long as there’s enough slack and the cable itself isn’t damaged. The link should be re-tested afterward.',
      },
    ],
    related: ['rj45', 'termination', 'punch-down', 'patch-panel', 'drop', 'cat-6', 'cat-6a'],
    service: 'structured-cabling',
  },
  {
    term: 'LAN',
    slug: 'lan',
    stands_for: 'Local Area Network',
    category: 'networking',
    definition:
      'The private network inside your building or campus that connects computers, phones, cameras, printers and Wi-Fi so they can talk to each other and share an internet connection.',
    why_it_matters:
      'Phones, cameras, door access and AV now all run on the LAN, so its design affects every one of them.',
    analogy: 'Like your building’s private road system, with the internet as the highway outside.',
    qa: [
      {
        q: 'What’s the difference between a LAN and a WAN?',
        a: 'A LAN covers one site, such as an office or campus. A WAN (wide area network) connects separate sites over long distances, including the internet itself.',
      },
      {
        q: 'Is Wi-Fi part of the LAN?',
        a: 'Yes. Wi-Fi is a wireless way onto the same local network. Access points connect to the wired LAN through cabling and switches.',
      },
    ],
    related: ['wan', 'network-switch', 'router', 'access-point', 'vlan', 'ethernet'],
    service: 'networking',
  },
  {
    term: 'Latency',
    slug: 'latency',
    aka: ['Delay', 'Lag', 'Ping'],
    category: 'networking',
    definition:
      'The time it takes for data to travel from one point to another, usually measured in milliseconds (ms). Lower latency means a network feels more responsive.',
    why_it_matters:
      'High latency causes awkward pauses on calls, laggy video meetings and slow cloud applications, even when bandwidth looks plentiful.',
    analogy:
      'Like the delay on a long-distance phone call: the line can be crystal clear and still feel slow.',
    qa: [
      {
        q: 'What’s the difference between latency and bandwidth?',
        a: 'Bandwidth is how much data can move at once (the width of the pipe). Latency is how long each piece takes to arrive (the length of the trip). A connection can be fast in one and poor in the other.',
      },
      {
        q: 'How much latency is acceptable for phone calls?',
        a: 'A widely used guideline (ITU-T G.114) recommends keeping one-way delay under about 150 milliseconds for good voice quality. Most well-run business networks are far below that.',
      },
    ],
    related: ['bandwidth', 'jitter', 'voip', 'wan', 'isp'],
    service: 'networking',
  },
  {
    term: 'License plate recognition (LPR)',
    slug: 'license-plate-recognition-lpr',
    stands_for: 'License Plate Recognition',
    aka: ['ALPR', 'ANPR', 'Automatic license plate recognition'],
    category: 'security',
    definition:
      'Camera software that automatically reads vehicle license plates and converts them to searchable text. It can log every car entering a lot or open a gate for plates on an approved list.',
    why_it_matters:
      'LPR turns hours of video review into a quick search, but in California, operating it brings specific privacy and data-handling obligations.',
    analogy: 'Like a parking attendant who writes down every plate, never gets tired and can search the list instantly.',
    qa: [
      {
        q: 'Can any security camera read license plates?',
        a: 'Not reliably. Plate reading needs a camera aimed at the right angle and zoom, with a fast shutter and good lighting or infrared, plus LPR software. A wide overview camera usually captures cars but not readable plates.',
      },
      {
        q: 'Are there legal rules for using LPR?',
        a: 'Yes. California law places requirements on operators of automated license plate recognition systems, including usage and privacy policies and data security. Review current requirements with your legal advisor before deploying.',
      },
    ],
    related: ['video-analytics', 'ip-camera', 'vms', 'ir-illumination', 'access-control'],
    service: 'video-surveillance',
  },
  {
    term: 'Low voltage',
    slug: 'low-voltage',
    aka: ['Low-voltage systems', 'LV', 'Limited-energy systems'],
    category: 'general',
    definition:
      'The industry name for building systems that run on small amounts of power instead of standard outlet power: network and phone cabling, Wi-Fi, security cameras, access control, intercoms, paging and AV.',
    why_it_matters:
      'Low-voltage work needs its own planning, licensing and code compliance, separate from the electrician’s high-voltage scope, so it should be coordinated early in any project.',
    analogy:
      'Like a building’s nervous system: it carries the signals, while the electrical system carries the power.',
    qa: [
      {
        q: 'Is low-voltage work regulated?',
        a: 'Yes. In California it’s licensed under the C-7 Low Voltage Systems classification, which covers energy-limited systems not exceeding 91 volts. Fire-rated cable, firestopping and permits may still be required depending on the project.',
      },
      {
        q: 'Is low voltage the same as “no shock risk”?',
        a: 'Lower risk, not zero. Low-voltage circuits are designed to limit energy, but work often happens near high-voltage wiring, and equipment like UPS units and PoE switches still connect to normal power.',
      },
      {
        q: 'Who installs low-voltage systems: my electrician?',
        a: 'Some electricians do, but many projects use a specialized low-voltage contractor for cabling, networking, security and AV, coordinating with the electrician who provides power to the equipment.',
      },
    ],
    related: ['structured-cabling', 'nec', 'poe', 'access-control', 'cctv', 'paging'],
  },
  {
    term: 'MAC (moves, adds, changes)',
    slug: 'mac-moves-adds-changes',
    stands_for: 'Moves, Adds and Changes',
    aka: ['MACs', 'MAC work'],
    category: 'general',
    definition:
      'The routine work of updating a building’s cabling and connections after the original install: moving a workstation, adding a new drop for a camera or printer, or changing which port a jack connects to.',
    why_it_matters:
      'Well-labeled, well-documented cabling makes moves, adds and changes fast and cheap; messy, undocumented closets turn small changes into slow detective work.',
    analogy: 'Like rearranging furniture in an office: routine, as long as you know where everything plugs in.',
    qa: [
      {
        q: 'Is this the same as a MAC address?',
        a: 'No. In cabling and telecom, “MAC” or “MACs” means moves, adds and changes: routine service work. A MAC address is a hardware ID built into network devices. Context usually tells you which one is meant.',
      },
      {
        q: 'How can we keep MAC work affordable?',
        a: 'Plan spare capacity in patch panels, switches and pathways; label everything to a consistent standard such as TIA-606; and keep as-built drawings up to date so technicians don’t have to trace cables.',
      },
    ],
    related: ['tia-606-labeling', 'as-built-drawings', 'drop', 'patch-panel', 'patch-cable', 'mac-address'],
    service: 'structured-cabling',
  },
  {
    term: 'MAC address',
    slug: 'mac-address',
    stands_for: 'Media Access Control address',
    aka: ['Hardware address', 'Physical address'],
    category: 'networking',
    definition:
      'A unique hardware ID assigned to every network-connected device by its manufacturer, written as six pairs of characters like 00:1A:2B:3C:4D:5E. Switches use it to deliver data to the right device on the local network.',
    why_it_matters:
      'MAC addresses help IT staff identify, track and control which cameras, phones, laptops and other devices are on the network.',
    analogy: 'Like a car’s VIN: it identifies the device itself, while the IP address is more like its current parking spot.',
    qa: [
      {
        q: 'Is a MAC address the same as “MACs” in cabling?',
        a: 'No. In cabling, “MACs” means moves, adds and changes: routine service work. A MAC address is a device’s hardware ID. They just share an abbreviation.',
      },
      {
        q: 'What’s the difference between a MAC address and an IP address?',
        a: 'The MAC address is tied to the device’s hardware and used within the local network. The IP address is assigned by the network and is used to route data between networks, including across the internet.',
      },
      {
        q: 'Can a MAC address change?',
        a: 'The built-in one normally doesn’t, but it can be overridden in software, and many phones and laptops now use a randomized MAC address on Wi-Fi for privacy.',
      },
    ],
    related: ['ip-address', 'network-switch', 'lan', 'mac-moves-adds-changes'],
    service: 'networking',
  },
  {
    term: 'Maglock',
    slug: 'maglock',
    aka: ['Magnetic lock', 'Electromagnetic lock', 'Mag lock'],
    category: 'access',
    definition:
      'An electromagnetic lock: a powered magnet mounted on the door frame grips a metal plate on the door, holding it shut until the power is cut. When power is removed, the door releases.',
    why_it_matters:
      'Maglocks are strong and suit many door types, but they must be installed with code-required release devices so people can always get out in an emergency.',
    analogy: 'Like a giant refrigerator magnet that lets go the instant you turn it off.',
    qa: [
      {
        q: 'Can we put a maglock on any door?',
        a: 'Not without meeting code. Maglocks on egress doors generally need a motion-sensor release, a manual push-to-exit button and automatic release on fire alarm activation; requirements vary by jurisdiction and occupancy.',
      },
      {
        q: 'What happens if the power goes out?',
        a: 'A maglock unlocks when it loses power, so it is inherently fail-safe. If the door must stay secure during an outage, a battery backup or a different locking device such as a fail-secure electric strike may be needed.',
      },
      {
        q: 'Maglock or electric strike: which is better?',
        a: 'It depends on the door, frame and code requirements. Electric strikes work with the door’s existing lock and allow free exit with the handle; maglocks suit doors where a strike won’t fit but require extra release devices.',
      },
    ],
    related: ['electric-strike', 'fail-safe-fail-secure', 'request-to-exit-rex', 'access-control', 'card-reader'],
    service: 'access-control',
  },
  {
    term: 'Mbps',
    slug: 'mbps',
    stands_for: 'Megabits per second',
    aka: ['Mb/s', 'Megabits'],
    category: 'networking',
    definition:
      'A unit of data speed: one million bits per second. Internet plans, Wi-Fi speeds and camera video streams are commonly quoted in Mbps; 1,000 Mbps equals 1 Gbps.',
    why_it_matters:
      'Knowing Mbps lets you compare internet plans and check whether your connection can handle your calls, cameras and cloud apps at the same time.',
    analogy: 'Like gallons per minute for a water pipe: how much flows through each second.',
    qa: [
      {
        q: 'What’s the difference between Mbps and MBps?',
        a: 'A lowercase “b” means bits; an uppercase “B” means bytes. One byte is 8 bits, so a 100 Mbps connection moves at most about 12.5 megabytes per second.',
      },
      {
        q: 'Why do my speed tests show less than my plan?',
        a: 'Plans are usually “up to” speeds. Wi-Fi conditions, older devices or cabling, other users on the network and the test server all affect results. A wired test near the router gives the clearest picture.',
      },
    ],
    related: ['gbps', 'bandwidth', 'isp', 'latency'],
    service: 'networking',
  },
  {
    term: 'MDF',
    slug: 'mdf',
    stands_for: 'Main Distribution Frame',
    aka: ['Main telecom room', 'Main equipment room', 'Server room', 'Head end'],
    category: 'cabling',
    definition:
      'The building’s main communications room, where outside internet and phone lines arrive and the core network equipment lives. Backbone cabling runs from here out to each IDF.',
    why_it_matters:
      'If the MDF loses power, overheats or floods, the whole building’s network, phones and cameras can go down with it.',
    analogy: 'Like the main sorting center of a postal system, with IDFs as the local branches.',
    qa: [
      {
        q: 'What’s the difference between an MDF and an IDF?',
        a: 'The MDF is the central room where service providers connect and core equipment sits. IDFs are smaller closets on other floors or areas that serve nearby devices and link back to the MDF.',
      },
      {
        q: 'What does a good MDF need?',
        a: 'Dedicated power with battery backup (UPS), cooling or ventilation, proper grounding, room for growth, controlled access and clear labeling. It shouldn’t double as a storage or janitorial closet.',
      },
      {
        q: 'Is the MDF the same as the demarc?',
        a: 'Not always. The demarc is the exact point where the provider’s responsibility ends. It is often inside or near the MDF, but in some buildings it’s in a separate room and is extended to the MDF.',
      },
    ],
    related: ['idf', 'telecom-room', 'demarc', 'backbone-cabling', 'rack', 'ups', 'grounding-and-bonding'],
    service: 'structured-cabling',
  },
  {
    term: 'Megapixel',
    slug: 'megapixel',
    aka: ['MP', 'Resolution'],
    category: 'security',
    definition:
      'One million pixels, the tiny dots that make up a digital image. Camera resolution is quoted in megapixels: a 4 MP camera captures about four million dots per frame, and 8 MP is roughly 4K.',
    why_it_matters:
      'More megapixels can capture more detail, like faces and plates, but also use more storage and bandwidth, so resolution should match each camera’s job.',
    analogy: 'Like the number of tiles in a mosaic: more tiles, finer picture.',
    qa: [
      {
        q: 'Are more megapixels always better?',
        a: 'Not always. Lens quality, sensor size, lighting, compression and camera placement matter as much. A well-placed 4 MP camera can outperform a poorly placed 8 MP one, especially at night.',
      },
      {
        q: 'How do megapixels affect storage?',
        a: 'Higher resolution creates larger video files, so the recorder needs more storage for the same number of days. Efficient compression such as H.265 and recording on motion help offset this.',
      },
    ],
    related: ['ip-camera', 'nvr', 'h-264-h-265', 'bandwidth', 'ir-illumination'],
    service: 'video-surveillance',
  },
  {
    term: 'Mobile credential',
    slug: 'mobile-credential',
    aka: ['Phone key', 'Digital key', 'Mobile access'],
    category: 'access',
    definition:
      'An encrypted access credential stored on a smartphone or smartwatch, used in place of a card or fob. The phone communicates with the door reader using Bluetooth or NFC (short-range wireless).',
    why_it_matters:
      'People rarely forget their phones, and administrators can issue or revoke access remotely without handing out or collecting physical cards.',
    analogy: 'Like a boarding pass in your phone’s wallet instead of a paper ticket.',
    qa: [
      {
        q: 'Are mobile credentials secure?',
        a: 'Generally more secure than older proximity cards, because they are encrypted and protected by the phone’s own lock screen or biometrics. Security still depends on the system and how it’s configured.',
      },
      {
        q: 'Do we need new card readers?',
        a: 'Usually readers must support the specific mobile credential technology, often via Bluetooth or NFC. Many current readers do; older proximity-only readers typically need to be replaced.',
      },
      {
        q: 'What if someone’s phone battery dies?',
        a: 'Some phones support a limited power-reserve mode for wallet keys, but not all. Many sites keep a backup card or fob option for people who need it.',
      },
    ],
    related: ['credential', 'card-reader', 'prox-card', 'key-fob', 'access-control', 'cloud-managed'],
    service: 'access-control',
  },
  {
    term: 'Multimode fiber',
    slug: 'multimode-fiber',
    aka: ['MMF', 'OM3', 'OM4', 'OM5'],
    category: 'cabling',
    definition:
      'Fiber optic cable with a relatively wide glass core that carries many paths of light at once. It uses lower-cost light sources and is typically used for shorter links inside a building or between nearby closets.',
    why_it_matters:
      'Multimode is a cost-effective choice for backbone runs within a building, but its distance limits shrink as speeds rise, so it must match your growth plans.',
    analogy:
      'Like a wide highway where cars drift between lanes: fine for short trips, but over long distances they arrive spread out.',
    qa: [
      {
        q: 'What’s the difference between multimode and singlemode fiber?',
        a: 'Multimode has a wider core and cheaper optics but shorter reach. Singlemode has a very thin core and supports much longer distances and higher speeds, which is why it’s common between buildings and for campus links.',
      },
      {
        q: 'What do OM3, OM4 and OM5 mean?',
        a: 'They are performance grades of multimode fiber. OM3 supports 10 Gbps to about 300 meters and OM4 to about 400 meters; OM5 adds support for multiple wavelengths. OM3 and OM4 jackets are usually aqua.',
      },
      {
        q: 'Can I mix multimode and singlemode?',
        a: 'No. The fiber type and the optics (SFP modules) at both ends must match. Connecting different types causes heavy signal loss or no link at all.',
      },
    ],
    related: ['singlemode-fiber', 'fiber-optic-cable', 'backbone-cabling', 'sfp', 'insertion-loss', 'gbps'],
    service: 'structured-cabling',
  },
  {
    term: 'NEC',
    slug: 'nec',
    stands_for: 'National Electrical Code (NFPA 70)',
    aka: ['NFPA 70', 'California Electrical Code', 'CEC'],
    category: 'standards',
    definition:
      'The U.S. model code for safe electrical and communications wiring, published by the National Fire Protection Association. States and cities adopt it, sometimes with changes; California’s version is the California Electrical Code.',
    why_it_matters:
      'The NEC governs fire ratings of cable, how cables pass through walls and floors, and separation from power, and inspectors check these before signing off.',
    analogy: 'Like a referee’s rulebook: it covers safety, not how well the network performs.',
    qa: [
      {
        q: 'Does the NEC apply to network cabling?',
        a: 'Yes. Its communications chapter covers things like which cable fire rating (plenum, riser or general-purpose) is allowed where, grounding of incoming lines, and supporting and firestopping cables.',
      },
      {
        q: 'What’s the difference between the NEC and TIA standards?',
        a: 'The NEC is a safety code that’s legally enforced where adopted. TIA standards such as ANSI/TIA-568 are industry performance standards describing how to build cabling that works reliably. Good installations follow both.',
      },
      {
        q: 'Which edition applies to my project?',
        a: 'Whichever edition your state or local jurisdiction has adopted, which is often not the newest one. The local building department can confirm.',
      },
    ],
    related: ['plenum-cable', 'riser-cable', 'grounding-and-bonding', 'ansi-tia-568', 'low-voltage', 'bicsi'],
  },
  {
    term: 'Network switch',
    slug: 'network-switch',
    aka: ['Switch', 'Ethernet switch', 'PoE switch'],
    category: 'networking',
    definition:
      'A box with many network ports that connects the computers, phones, cameras and Wi-Fi access points in a building and sends data only to the device it’s meant for. PoE switches also power devices.',
    why_it_matters:
      'Every device on the local network connects through a switch; their capacity, power budget and management features decide what you can connect and how reliably.',
    analogy: 'Like a mailroom clerk who reads each envelope and hands it straight to the right desk.',
    qa: [
      {
        q: 'What’s the difference between a switch and a router?',
        a: 'A switch connects devices within your local network. A router connects your network to other networks, such as the internet, and directs traffic between them.',
      },
      {
        q: 'Managed or unmanaged switch?',
        a: 'Unmanaged switches are plug-and-play with no settings. Managed switches allow VLANs, traffic prioritization for voice, monitoring and security controls, which is usually worth it for businesses with phones, cameras or guest Wi-Fi.',
      },
      {
        q: 'What is a PoE budget?',
        a: 'The total power a PoE switch can supply across all its ports at once. If connected devices need more than the budget, some may not power up, so add up device needs before choosing a switch.',
      },
    ],
    related: ['router', 'poe', 'port', 'vlan', 'lan', 'sfp', 'ethernet'],
    service: 'networking',
  },
  {
    term: 'NEXT',
    slug: 'next',
    stands_for: 'Near-End Crosstalk',
    aka: ['Crosstalk'],
    category: 'cabling',
    definition:
      'Interference that happens when the signal on one wire pair in a copper network cable bleeds into another pair, measured at the same end where the signal is sent. The cable’s twisted pairs are designed to cancel it.',
    why_it_matters:
      'Excessive crosstalk causes errors and slowdowns, and it’s one of the most common reasons a cable run fails certification testing.',
    analogy:
      'Like overhearing a neighbor’s phone conversation through the wall while you’re trying to talk.',
    qa: [
      {
        q: 'What usually causes NEXT failures?',
        a: 'Most often, untwisting the wire pairs too much at the jack or patch panel during termination. Standards call for keeping pairs twisted to within about half an inch (13 mm) of the termination. Mismatched or low-quality components can also cause it.',
      },
      {
        q: 'Do higher cable categories reduce crosstalk?',
        a: 'Yes. Cat 6 and Cat 6A use tighter twists, better materials and sometimes separators or shielding to limit crosstalk, which is part of how they support higher speeds.',
      },
    ],
    related: ['cable-certification', 'insertion-loss', 'return-loss', 'termination', 'utp-stp', 'cat-6a'],
    service: 'structured-cabling',
  },
  {
    term: 'Number porting',
    slug: 'number-porting',
    aka: ['Porting', 'Local number portability', 'LNP'],
    category: 'voice',
    definition:
      'Transferring your existing phone numbers from one phone provider to another, so you keep the same numbers when you switch systems or carriers.',
    why_it_matters:
      'Your phone numbers are on signs, cards and websites; careful porting avoids missed calls during a phone system change.',
    analogy: 'Like switching banks but keeping your same account number.',
    qa: [
      {
        q: 'Can we keep our existing phone numbers?',
        a: 'In most cases, yes. Depending on the carrier and how many numbers are involved, porting can take from days to a few weeks. Don’t cancel the old service until the port is complete.',
      },
      {
        q: 'What information is needed to port numbers?',
        a: 'Typically a recent bill from the current carrier, the account number and any PIN, the exact name and service address on the account, and a signed authorization. Mismatched details are the most common cause of rejected ports.',
      },
      {
        q: 'Can every number be ported?',
        a: 'Most can, but availability depends on the new provider’s coverage in your area. The new provider can usually check portability before you commit.',
      },
    ],
    related: ['voip', 'sip-trunk', 'pbx', 'unified-communications'],
    service: 'voip-unified-comms',
  },
  {
    term: 'NVR',
    slug: 'nvr',
    stands_for: 'Network Video Recorder',
    aka: ['Video recorder', 'Recorder'],
    category: 'security',
    definition:
      'A dedicated device that records and stores video from IP cameras over the network, usually on built-in hard drives, and lets you search and play back footage.',
    why_it_matters:
      'The NVR determines how many cameras you can record, how many days of footage you keep and how quickly you can find an incident.',
    analogy: 'Like a DVR for your TV, but for your security cameras.',
    qa: [
      {
        q: 'What’s the difference between an NVR and a DVR?',
        a: 'A DVR records analog cameras connected by coaxial cable. An NVR records IP cameras over a network. Some hybrid recorders handle both during an upgrade.',
      },
      {
        q: 'NVR, VMS or cloud: which should I use?',
        a: 'An NVR keeps footage on site in one box. VMS software runs on servers and suits larger, multi-site systems. Cloud recording stores video off site and depends on your internet upload. Many systems combine approaches.',
      },
      {
        q: 'How much storage do I need?',
        a: 'It depends on the number of cameras, resolution, frame rate, compression and how many days you need to keep. Calculate from those factors rather than guessing, and allow extra room for growth.',
      },
    ],
    related: ['vms', 'ip-camera', 'cctv', 'h-264-h-265', 'megapixel', 'poe'],
    service: 'video-surveillance',
  },
];
