import type { GlossaryEntry } from './types';

export const entries: GlossaryEntry[] = [
  {
    term: 'ONVIF',
    slug: 'onvif',
    stands_for: 'Open Network Video Interface Forum',
    category: 'security',
    definition:
      'An industry standard that lets IP cameras, video recorders and video software from different manufacturers talk to each other. Devices are certified to “profiles,” such as Profile S for live video streaming and Profile G for recording.',
    why_it_matters:
      'ONVIF support gives you freedom to mix camera brands and replace recorders later without being locked into one manufacturer’s ecosystem.',
    analogy: 'Like a universal remote standard: different brands of TVs all understand the same basic buttons.',
    qa: [
      {
        q: 'Does ONVIF mean any camera works perfectly with any recorder?',
        a: 'Not quite. ONVIF guarantees the basics: live video, recording and common settings. Advanced features like a maker’s own analytics or special motion rules often only work when the camera and recorder come from the same brand. Check which ONVIF profiles both devices support.',
      },
      {
        q: 'Which ONVIF profile should I look for?',
        a: 'Profile S covers basic streaming and is the most common. Profile T adds newer compression (H.265) and better event handling, Profile G covers recording on the device, and Profile M covers analytics data. Matching profiles on both camera and recorder is what counts.',
      },
      {
        q: 'Can I reuse my existing cameras with a new system?',
        a: 'Often yes, if the old cameras are IP cameras with ONVIF support and the new recorder or VMS supports the same profile. Older analog cameras are a different story and usually need an encoder or replacement.',
      },
    ],
    related: ['ip-camera', 'nvr', 'vms', 'h-264-h-265', 'video-analytics'],
    service: 'video-surveillance',
  },
  {
    term: 'OSDP',
    slug: 'osdp',
    stands_for: 'Open Supervised Device Protocol',
    category: 'access',
    definition:
      'A modern standard for how door card readers communicate with the access control panel. It runs over a simple two-wire connection, supports encryption, and constantly checks that the reader is still connected and hasn’t been tampered with.',
    why_it_matters:
      'OSDP closes security gaps in older Wiegand wiring, where card data travels unencrypted and a reader can be disconnected or spoofed without anyone noticing.',
    analogy: 'Wiegand is a one-way shout down a hallway; OSDP is a private, two-way phone call that notices if the line goes dead.',
    qa: [
      {
        q: 'Is OSDP more secure than Wiegand?',
        a: 'Yes. With its Secure Channel feature turned on, OSDP encrypts the conversation between reader and panel and supervises the connection, so cutting or tapping the wires raises an alert. Wiegand sends card numbers in the clear and can’t tell if a reader has been swapped.',
      },
      {
        q: 'Do I have to replace my readers to use OSDP?',
        a: 'Only if they don’t support it. Many current readers can do both Wiegand and OSDP, and many newer controllers accept OSDP. Older readers and panels may need upgrading. Existing cable can sometimes be reused if it has a suitable pair, but that should be checked.',
      },
      {
        q: 'What is OSDP Secure Channel?',
        a: 'It’s the encryption mode of OSDP. Without it, OSDP is still supervised but data isn’t encrypted. When specifying a system, confirm that Secure Channel is actually enabled, not just supported on paper.',
      },
    ],
    related: ['wiegand', 'card-reader', 'access-control', 'credential'],
    service: 'access-control',
  },
  {
    term: 'OTDR',
    slug: 'otdr',
    stands_for: 'Optical Time-Domain Reflectometer',
    category: 'cabling',
    definition:
      'A fiber optic test instrument that sends pulses of light down a fiber and measures what bounces back. It produces a map of the cable showing where connectors, splices, bends and breaks are, and how much signal each one loses.',
    why_it_matters:
      'An OTDR trace pinpoints exactly where a fiber problem is, saving hours of guesswork and serving as a baseline record if the cable is damaged later.',
    analogy: 'Like sonar for glass: send a ping down the fiber and listen for echoes to find what’s along the way.',
    qa: [
      {
        q: 'Is an OTDR test required for every fiber run?',
        a: 'Not usually. The basic required fiber test measures total light loss end to end. OTDR testing is an extra, more detailed step often requested for backbone runs, long distances, campus links or when troubleshooting.',
      },
      {
        q: 'Can an OTDR find where a fiber is broken?',
        a: 'Yes, that’s one of its main uses. It shows the distance from the tester to the break or bad splice, so a technician can go to that spot instead of pulling or replacing the whole cable.',
      },
    ],
    related: ['fiber-optic-cable', 'cable-certification', 'insertion-loss', 'backbone-cabling', 'singlemode-fiber', 'multimode-fiber'],
    service: 'structured-cabling',
  },
  {
    term: 'Paging',
    slug: 'paging',
    aka: ['Overhead paging', 'Public address (PA)'],
    category: 'voice',
    definition:
      'A system for making spoken announcements through speakers in ceilings, walls or horns across a building. Announcements can go to everywhere at once or to specific “zones” such as the warehouse or the front office.',
    why_it_matters:
      'Paging reaches people who aren’t at a desk or phone (warehouses, shop floors, schools, retail) and can tie into the phone system so any phone can make announcements.',
    analogy: 'The building’s own loudspeaker voice, like announcements at an airport gate.',
    qa: [
      {
        q: 'Can I page through my phone system?',
        a: 'Usually yes. Many VoIP phones can page each other directly, and a paging adapter or gateway can connect the phone system to overhead speakers and amplifiers so you dial a code to make an announcement.',
      },
      {
        q: 'What are paging zones?',
        a: 'Zones are groups of speakers you can address separately, for example “warehouse only” or “all call.” They keep announcements from disturbing people who don’t need to hear them.',
      },
      {
        q: 'Can paging also play background music?',
        a: 'Many systems can, with announcements automatically interrupting the music. That depends on the amplifier and controller used, so it’s worth mentioning at the design stage.',
      },
    ],
    related: ['70v-audio', 'voip', 'intercom', 'pbx', 'sip-trunk'],
    service: 'voip-unified-comms',
  },
  {
    term: 'Patch cable',
    slug: 'patch-cable',
    aka: ['Patch cord', 'Jumper', 'Network cable'],
    category: 'cabling',
    definition:
      'A short, flexible network cable with a connector on each end, used to plug equipment into the permanent cabling: for example, a computer into a wall jack, or a patch panel port into a network switch.',
    why_it_matters:
      'Patch cables are the most handled and most damaged part of a network; a cheap or crushed cord can cause slow or dropped connections that look like bigger problems.',
    analogy: 'The extension cord of the network: the permanent wiring is in the walls, the patch cable gets you from the outlet to the device.',
    qa: [
      {
        q: 'Do patch cables need to match the category of my cabling?',
        a: 'Yes. A Cat 6A system needs Cat 6A patch cables to perform as tested. Using a lower-category cord makes it the weakest link in the connection.',
      },
      {
        q: 'Can I make my own patch cables?',
        a: 'You can, but factory-made cords are generally recommended because they’re tested and more consistent. Hand-crimped cords are a common cause of intermittent problems, especially at higher speeds.',
      },
      {
        q: 'Why are the cables in the network rack different colors?',
        a: 'Color-coding is a common way to show what each connection is for (for example phones, cameras or Wi-Fi). It makes moves and troubleshooting faster, as long as the scheme is written down.',
      },
    ],
    related: ['patch-panel', 'rj45', 'channel', 'network-switch', 'cat-6', 'cat-6a'],
    service: 'structured-cabling',
  },
  {
    term: 'Patch panel',
    slug: 'patch-panel',
    category: 'cabling',
    definition:
      'A panel of numbered ports mounted in a network rack. The permanent cables from wall jacks around the building attach to the back, and short patch cables connect its front ports to network switches or other equipment.',
    why_it_matters:
      'A labeled patch panel makes it quick and safe to reconnect, move or troubleshoot any jack in the building without touching the permanent wiring in the walls.',
    analogy: 'Like an old-fashioned telephone switchboard: every line in the building arrives in one tidy spot where it can be connected wherever it’s needed.',
    qa: [
      {
        q: 'Why not plug wall cables straight into the switch?',
        a: 'Permanent cable is solid-core and isn’t meant to be bent and unplugged repeatedly. Ending it on a patch panel protects it, keeps the rack organized, and lets you replace a switch without disturbing the building wiring.',
      },
      {
        q: 'How do I know which port goes to which office?',
        a: 'Each port should have a label that matches the label on the wall jack, ideally following a standard labeling scheme. If yours aren’t labeled, a technician can trace and label them.',
      },
    ],
    related: ['patch-cable', 'rack', 'punch-down', 'permanent-link', 'tia-606-labeling', 'network-switch', 'horizontal-cabling'],
    service: 'structured-cabling',
  },
  {
    term: 'Pathway',
    slug: 'pathway',
    category: 'cabling',
    definition:
      'The physical route and support system that cables travel through and rest on: conduit, cable trays, J-hooks, wall sleeves and floor penetrations. The pathway is the “road”; the cables are the traffic.',
    why_it_matters:
      'Good pathways protect cables, keep them away from electrical interference, satisfy fire codes, and leave room so future cables can be added without opening walls.',
    analogy: 'Like plumbing chases and pipe hangers, but for data cables.',
    qa: [
      {
        q: 'Can cables just lie on top of the ceiling tiles?',
        a: 'No. Codes and cabling standards call for cables to be supported independently (on J-hooks, trays or similar), not resting on ceiling tiles, pipes or light fixtures.',
      },
      {
        q: 'Why should pathways have spare room?',
        a: 'Adding cable later is far cheaper when there’s space in the existing conduit or tray. Overfilled pathways also crush cables and make heat build up, which can hurt performance.',
      },
      {
        q: 'What happens where cables go through a fire-rated wall?',
        a: 'Openings in fire-rated walls and floors must be sealed with an approved firestop system so smoke and flames can’t travel through the hole. Inspectors check this.',
      },
    ],
    related: ['conduit', 'cable-tray', 'j-hook', 'plenum-cable', 'riser-cable', 'nec'],
    service: 'structured-cabling',
  },
  {
    term: 'PBX',
    slug: 'pbx',
    stands_for: 'Private Branch Exchange',
    aka: ['Phone system', 'Hosted PBX', 'Cloud PBX', 'IP PBX'],
    category: 'voice',
    definition:
      'A business’s own private phone system. It connects internal extensions to each other and to outside lines, and handles features like transfers, voicemail, auto attendants and call queues. It can be a box on site or a service hosted in the cloud.',
    why_it_matters:
      'Your PBX decides how calls flow to your staff and customers, and choosing on-premises or hosted affects upfront cost, monthly fees and who maintains it.',
    analogy: 'The office receptionist and switchboard, turned into software.',
    qa: [
      {
        q: 'What’s the difference between an on-site PBX and a hosted PBX?',
        a: 'An on-site PBX is equipment you own in your building. A hosted (cloud) PBX is run by a provider over the internet for a monthly fee. Hosted reduces equipment on site; on-site gives more direct control but you maintain it.',
      },
      {
        q: 'Can I keep my phone numbers if I change systems?',
        a: 'In most cases, yes. Numbers can usually be moved to a new provider through a process called number porting, which takes some paperwork and lead time.',
      },
    ],
    related: ['voip', 'sip-trunk', 'unified-communications', 'number-porting', 'ring-group', 'pstn'],
    service: 'voip-unified-comms',
  },
  {
    term: 'Permanent link',
    slug: 'permanent-link',
    category: 'cabling',
    definition:
      'The fixed, in-the-wall part of a cable run: from the patch panel in the telecom room to the jack at the desk, not counting the patch cables at either end. Standards limit it to 90 meters (about 295 feet).',
    why_it_matters:
      'The permanent link is what gets tested and certified at installation, and it’s the part that is expensive to replace once walls and ceilings are closed.',
    analogy: 'The plumbing pipe inside the wall, as opposed to the hose you attach to the faucet.',
    qa: [
      {
        q: 'What’s the difference between a permanent link and a channel?',
        a: 'The permanent link is the installed cable from panel to jack. The channel is the whole connection, including the patch cables at both ends, up to 100 meters total. Installers usually certify the permanent link.',
      },
      {
        q: 'Why is the limit 90 meters?',
        a: 'Ethernet is designed to work up to 100 meters end to end. Reserving 90 meters for the permanent cable leaves about 10 meters for patch cables at both ends.',
      },
    ],
    related: ['channel', 'cable-certification', 'horizontal-cabling', 'patch-panel', 'ansi-tia-568'],
    service: 'structured-cabling',
  },
  {
    term: 'Plenum cable',
    slug: 'plenum-cable',
    aka: ['CMP cable', 'Plenum-rated cable'],
    category: 'cabling',
    definition:
      'Cable with a special fire-resistant, low-smoke jacket, rated for use in a “plenum”. A plenum is a space, such as above a drop ceiling or below a raised floor, that the building uses to circulate air. It’s marked “CMP” on the jacket.',
    why_it_matters:
      'If your ceiling is used for air return, electrical code requires plenum-rated cable there, so ordinary cable could fail inspection and spread toxic smoke in a fire.',
    analogy: 'Like flame-retardant fabric for curtains in a theater: required where a fire could spread to many people quickly.',
    qa: [
      {
        q: 'How do I know if my ceiling is a plenum?',
        a: 'If the space above the ceiling carries return air back to the heating and cooling system instead of ducts, it’s a plenum. Your mechanical drawings, building engineer or a site survey can confirm it.',
      },
      {
        q: 'Is plenum cable worth the extra cost if it’s not required?',
        a: 'Plenum cable costs more than other types. Where it isn’t required, riser-rated cable is normally acceptable. Some owners choose plenum everywhere for simplicity, since plenum cable can be used in place of riser or general-purpose cable.',
      },
    ],
    related: ['riser-cable', 'nec', 'pathway', 'copper-cabling'],
    service: 'structured-cabling',
  },
  {
    term: 'PoE',
    slug: 'poe',
    stands_for: 'Power over Ethernet',
    category: 'power',
    definition:
      'A way to send electrical power and network data through the same Ethernet cable. A PoE network switch powers devices like Wi-Fi access points, security cameras, phones and card readers, so they don’t need a separate outlet.',
    why_it_matters:
      'PoE lets devices go wherever a network cable can reach (ceilings, walls, parking lots) and puts their power on one backup battery in the network closet.',
    analogy: 'Like a USB cable that both charges your phone and transfers files.',
    qa: [
      {
        q: 'Do I need PoE?',
        a: 'If you’re installing Wi-Fi access points, IP cameras, VoIP desk phones or network card readers, almost certainly. PoE avoids running electrical outlets to each device and simplifies backup power.',
      },
      {
        q: 'How much power can PoE deliver?',
        a: 'At the switch port: about 15.4 W for 802.3af, 30 W for 802.3at (PoE+), and up to roughly 60 W or 90 W for 802.3bt. Some power is lost in the cable, so the device receives a bit less.',
      },
      {
        q: 'Is there a limit to how many PoE devices a switch can power?',
        a: 'Yes. Every PoE switch has a total power budget shared across its ports. Adding devices like PTZ cameras or high-end access points can use it up quickly, so it should be calculated during design.',
      },
    ],
    related: ['ieee-802-3-poe-standards', 'network-switch', 'access-point', 'ip-camera', 'ups', 'ethernet'],
    service: 'networking',
  },
  {
    term: 'Port',
    slug: 'port',
    category: 'networking',
    definition:
      'A physical socket where a cable plugs in, on a network switch, patch panel, wall jack or computer. In software, “port” also means a numbered channel a computer uses to tell different kinds of traffic apart, such as web or email.',
    why_it_matters:
      'Counting ports on switches, patch panels and walls is how you size equipment and make sure every device, plus room for growth, has a place to connect.',
    analogy: 'Physical ports are like electrical outlets; software port numbers are like apartment numbers at the same street address.',
    qa: [
      {
        q: 'How many switch ports do I need?',
        a: 'Count every wired device (computers, phones, printers, access points, cameras), then add spare capacity for growth, commonly 20% or more. PoE devices also need PoE-capable ports.',
      },
      {
        q: 'Why do I hear about “opening a port” on the firewall?',
        a: 'That’s the software meaning. It allows a specific type of outside traffic into your network. Each open port is a potential entry point, so it should only be done when necessary and kept documented.',
      },
    ],
    related: ['network-switch', 'patch-panel', 'rj45', 'firewall', 'drop'],
    service: 'networking',
  },
  {
    term: 'POS',
    slug: 'pos',
    stands_for: 'Point of Sale',
    category: 'networking',
    definition:
      'The checkout system where a business takes payments: terminals, card readers, receipt printers, cash drawers and the software that runs them. Modern POS systems depend on a reliable network and internet connection.',
    why_it_matters:
      'When the network or internet drops, a POS system may not be able to take cards, and payment-card security rules affect how its network must be set up.',
    analogy: 'The modern cash register, now a networked computer.',
    qa: [
      {
        q: 'Should my POS be on its own network?',
        a: 'Separating POS devices from guest Wi-Fi and general office traffic is widely recommended. Under PCI DSS, the card industry’s security standard, isolating the payment systems can also reduce how much of your network falls under its requirements.',
      },
      {
        q: 'What happens to my POS if the internet goes down?',
        a: 'It depends on the system. Some can store card transactions offline and send them later; others stop taking cards. A backup internet connection, such as a cellular link, is a common safeguard.',
      },
    ],
    related: ['vlan', 'firewall', 'isp', 'redundancy', 'network-switch'],
    service: 'networking',
  },
  {
    term: 'Prox card',
    slug: 'prox-card',
    aka: ['Proximity card', '125 kHz card', 'Key fob'],
    category: 'access',
    definition:
      'An access card or key fob that unlocks a door when held near a card reader, using low-frequency radio (125 kHz). It carries a simple ID number and has no encryption.',
    why_it_matters:
      'Prox cards are still common and inexpensive, but they can be copied easily, so newer installations generally use encrypted smart cards or mobile credentials.',
    analogy: 'A house key that anyone with the right gadget can duplicate in seconds without you noticing.',
    qa: [
      {
        q: 'Can someone copy my prox card?',
        a: 'Yes. Most 125 kHz prox cards broadcast an unencrypted number that can be read and cloned with cheap, widely available devices, sometimes from a short distance. That’s the main reason organizations upgrade.',
      },
      {
        q: 'What should I use instead?',
        a: 'Encrypted 13.56 MHz smart cards or mobile credentials on a phone are much harder to clone. Many current readers can read both old prox cards and new smart cards, allowing a gradual switchover.',
      },
      {
        q: 'Do I have to replace everyone’s card at once?',
        a: 'Not necessarily. With multi-technology readers, you can issue new cards over time and switch off prox support once everyone has been moved over.',
      },
    ],
    related: ['credential', 'card-reader', 'mobile-credential', 'access-control', 'wiegand'],
    service: 'access-control',
  },
  {
    term: 'PSTN',
    slug: 'pstn',
    stands_for: 'Public Switched Telephone Network',
    aka: ['POTS lines', 'Landlines', 'Analog lines'],
    category: 'voice',
    definition:
      'The traditional worldwide telephone network that landlines connect to. Today it reaches internet-based phone systems too, through connections such as SIP trunks, so calls can travel between any phone on Earth.',
    why_it_matters:
      'Many carriers are retiring old copper phone lines, which can affect fire alarm panels, elevator phones, fax machines and other equipment that still depend on them.',
    analogy: 'The public road system for phone calls: private driveways (your office phones) connect to it to reach anyone else.',
    qa: [
      {
        q: 'Do I still need landlines?',
        a: 'Most office calling can move to VoIP. But check alarm panels, elevator emergency phones, gate callboxes and fax lines. Some need an analog line or an approved replacement such as a cellular or VoIP adapter, depending on local code.',
      },
      {
        q: 'What is a POTS line?',
        a: 'POTS stands for “plain old telephone service”: a basic analog phone line on copper wire. It’s the classic landline that the PSTN was built on.',
      },
    ],
    related: ['voip', 'sip-trunk', 'pbx', 'demarc', 'number-porting'],
    service: 'voip-unified-comms',
  },
  {
    term: 'PTZ camera',
    slug: 'ptz-camera',
    stands_for: 'Pan-Tilt-Zoom camera',
    category: 'security',
    definition:
      'A security camera that can turn side to side (pan), up and down (tilt), and zoom in, either controlled by an operator or following preset tours. It covers large areas like parking lots, yards and warehouses.',
    why_it_matters:
      'A PTZ can zoom in on details from far away, but it only records where it’s pointed, so it usually works alongside fixed cameras rather than replacing them.',
    analogy: 'Like a security guard who can turn their head and use binoculars, but can only look in one direction at a time.',
    qa: [
      {
        q: 'Can one PTZ camera replace several fixed cameras?',
        a: 'Usually not. While it’s zoomed in on one spot, it isn’t watching the rest of the area. PTZs are best for following activity or checking details, with fixed cameras keeping constant coverage.',
      },
      {
        q: 'Do PTZ cameras need more power?',
        a: 'Often yes. Motors, heaters and infrared lights can push them beyond standard PoE, so many require PoE+ or 802.3bt ports, or a separate power supply. Check the camera’s power rating during design.',
      },
    ],
    related: ['ip-camera', 'poe', 'nvr', 'vms', 'cctv'],
    service: 'video-surveillance',
  },
  {
    term: 'Punch-down',
    slug: 'punch-down',
    aka: ['Punch down', 'IDC termination'],
    category: 'cabling',
    definition:
      'The method of attaching each tiny wire of a network or phone cable to a jack or patch panel by pressing it into a metal slot with a special tool. The slot cuts through the insulation and grips the copper.',
    why_it_matters:
      'Neat, correct punch-downs are what make a cable pass certification; sloppy ones cause slow speeds or connections that drop intermittently.',
    analogy: 'Like pressing a wire into a clip that bites through the plastic to touch the metal inside, with no soldering or stripping needed.',
    qa: [
      {
        q: 'What tool is used?',
        a: 'A punch-down tool, a spring-loaded handle with a blade that seats the wire and trims the extra in one motion. Different blades match different connector types, such as 110 or 66 blocks.',
      },
      {
        q: 'Why does untwisting matter?',
        a: 'Network cable pairs are twisted to block interference. Untwisting too much wire at the connection weakens that protection and can cause a cable to fail testing, especially for Cat 6 and Cat 6A.',
      },
    ],
    related: ['termination', 'keystone-jack', 'patch-panel', 'cable-certification', 'next'],
    service: 'structured-cabling',
  },
  {
    term: 'QoS',
    slug: 'qos',
    stands_for: 'Quality of Service',
    category: 'networking',
    definition:
      'Network settings that give priority to time-sensitive traffic, such as phone calls and video meetings, over things that can wait, such as file downloads. Voice traffic is commonly tagged so switches and routers move it to the front of the line.',
    why_it_matters:
      'Without QoS, a big download or backup can make phone calls choppy or robotic even when your internet connection is otherwise fast enough.',
    analogy: 'Like an ambulance lane on a busy highway: emergency traffic gets through first while everyone else waits a moment.',
    qa: [
      {
        q: 'Does QoS make my internet faster?',
        a: 'No. It doesn’t add bandwidth. It decides who goes first when the connection is busy. If the link is constantly overloaded, you may need more bandwidth as well.',
      },
      {
        q: 'Do I need QoS for VoIP phones?',
        a: 'It’s strongly recommended, especially on shared networks. Settings should be consistent on your switches, router and firewall, since priority only helps if every device along the path honors it.',
      },
    ],
    related: ['voip', 'bandwidth', 'latency', 'vlan', 'router', 'network-switch'],
    service: 'networking',
  },
  {
    term: 'Rack',
    slug: 'rack',
    aka: ['Equipment rack', '19-inch rack', 'Network cabinet'],
    category: 'cabling',
    definition:
      'A metal frame or cabinet that holds network equipment (patch panels, switches, servers and backup batteries) stacked on standard 19-inch-wide mounting rails. Racks can be open frames, enclosed cabinets or small wall-mounted units.',
    why_it_matters:
      'A properly sized, organized and secured rack keeps equipment cool, accessible and protected, and leaves space for growth.',
    analogy: 'A bookshelf built to a universal size, so any manufacturer’s equipment fits on the shelves.',
    qa: [
      {
        q: 'Open rack or enclosed cabinet?',
        a: 'Open racks are cheaper and easier to work in, good for locked telecom rooms. Enclosed, lockable cabinets suit shared spaces, dusty areas or anywhere you need to keep people from touching equipment.',
      },
      {
        q: 'Does a rack need to be bolted down?',
        a: 'Floor-standing racks are normally anchored to the floor so they can’t tip, and in earthquake-prone areas like California seismic bracing is often required. Wall-mount racks must be fastened to solid structure.',
      },
      {
        q: 'Why does the rack get so hot?',
        a: 'Switches, especially ones powering PoE devices, produce heat. The room needs enough cooling and airflow, and blank panels in empty spaces help direct cool air through the equipment.',
      },
    ],
    related: ['rack-unit-u', 'patch-panel', 'network-switch', 'ups', 'telecom-room', 'grounding-and-bonding'],
    service: 'structured-cabling',
  },
  {
    term: 'Rack unit (U)',
    slug: 'rack-unit-u',
    aka: ['RU', '1U', 'U'],
    category: 'cabling',
    definition:
      'The standard unit for measuring height in an equipment rack. One rack unit (1U) is 1.75 inches (44.45 mm). Equipment is sized in whole units, so a “2U” device takes up 3.5 inches of vertical space.',
    why_it_matters:
      'Adding up the U of every patch panel, switch and battery tells you what size rack you need and how much room is left for growth.',
    analogy: 'Like counting shelves instead of inches: each piece of gear takes a known number of slots.',
    qa: [
      {
        q: 'How tall is a 42U rack?',
        a: '42U gives about 73.5 inches (roughly six feet) of usable mounting space. The rack itself is a little taller because of its frame, top and base.',
      },
      {
        q: 'How much spare space should I leave?',
        a: 'Many designers leave around 25–50% open for future equipment, cable managers and airflow. Running a rack completely full makes changes and cooling difficult.',
      },
    ],
    related: ['rack', 'patch-panel', 'network-switch', 'ups'],
    service: 'structured-cabling',
  },
  {
    term: 'Redundancy',
    slug: 'redundancy',
    aka: ['Failover', 'Backup path'],
    category: 'general',
    definition:
      'Building in a backup for something important so one failure doesn’t take everything down: a second internet connection, a spare power supply, two fiber routes between buildings, or a battery backup for the network.',
    why_it_matters:
      'Redundancy is how you keep phones, payments, cameras and door access working through a cut cable, a provider outage or a failed device.',
    analogy: 'Like carrying a spare tire: you hope not to use it, but it turns a disaster into a short delay.',
    qa: [
      {
        q: 'Do I need two internet connections?',
        a: 'If an outage would stop sales, phones or operations, a second connection from a different provider (ideally using different physical routes, or cellular) is worth considering. A firewall or router can switch over automatically.',
      },
      {
        q: 'Isn’t a second connection from the same provider enough?',
        a: 'It helps with some failures, but a single provider outage or a cut cable on the same route can take both down. True redundancy avoids shared points of failure.',
      },
    ],
    related: ['isp', 'wan', 'ups', 'router', 'firewall', 'backbone-cabling'],
    service: 'networking',
  },
  {
    term: 'Request-to-exit (REX)',
    slug: 'request-to-exit-rex',
    stands_for: 'Request to Exit',
    aka: ['RTE', 'Exit button', 'REX sensor'],
    category: 'access',
    definition:
      'A device on the secure side of an access-controlled door that tells the system someone is leaving. It can be a motion sensor above the door, a push button, or a switch in the door handle.',
    why_it_matters:
      'REX devices prevent false “door forced open” alarms and, on doors with magnetic locks, release the lock so people can get out, which is a life-safety issue.',
    analogy: 'A polite signal to the security system: “It’s fine, someone is walking out, not breaking in.”',
    qa: [
      {
        q: 'Why does the door alarm when people leave?',
        a: 'Usually because the REX isn’t detecting them: a misaimed motion sensor, a bad switch or wiring problem. The system then sees the door open without a valid card or exit request and reports a forced door.',
      },
      {
        q: 'Is a motion sensor enough on a maglock door?',
        a: 'Often not. Building and fire codes typically require additional ways to release electrically locked exit doors, such as a manual push button and release on fire alarm. Local requirements vary, so the design should be checked against code.',
      },
    ],
    related: ['access-control', 'maglock', 'electric-strike', 'fail-safe-fail-secure', 'card-reader'],
    service: 'access-control',
  },
  {
    term: 'Return loss',
    slug: 'return-loss',
    aka: ['RL'],
    category: 'cabling',
    definition:
      'A measurement of how much signal bounces back toward the sender instead of traveling down the cable, caused by imperfections such as poor terminations, kinks or mismatched parts. It’s measured in decibels (dB); higher numbers are better.',
    why_it_matters:
      'Poor return loss can cause errors and slowdowns, and it’s one of the tests a cable must pass to be certified to its category.',
    analogy: 'Like an echo in a hallway: the more sound that bounces back at you, the harder it is to hear the person at the other end.',
    qa: [
      {
        q: 'What causes a return loss failure?',
        a: 'Common causes are poorly made terminations, too much untwisting at the jack, a cable bent or crushed too tightly, or components from different categories mixed together.',
      },
      {
        q: 'Does return loss apply to fiber too?',
        a: 'Yes. In fiber, reflections from dirty or poorly mated connectors bounce light back toward the source. Clean, well-made connections keep reflections low.',
      },
    ],
    related: ['cable-certification', 'insertion-loss', 'next', 'termination', 'punch-down'],
    service: 'structured-cabling',
  },
  {
    term: 'Ring group',
    slug: 'ring-group',
    aka: ['Hunt group'],
    category: 'voice',
    definition:
      'A set of phones that share one number or extension. When a call comes in, the phones ring all at once or one after another until someone answers, so callers reach a team instead of one person.',
    why_it_matters:
      'Ring groups mean fewer missed calls to sales, support or the front desk, without needing a dedicated receptionist.',
    analogy: 'Like a shop bell everyone on the team can hear, so whoever’s free gets the customer.',
    qa: [
      {
        q: 'What’s the difference between a ring group and a call queue?',
        a: 'A ring group simply rings a set of phones. A call queue holds callers in line with music or messages when everyone is busy, then sends them to the next free person.',
      },
      {
        q: 'What happens if nobody answers?',
        a: 'You decide. Unanswered calls can go to a shared voicemail, another group, a cell phone or an after-hours message.',
      },
    ],
    related: ['pbx', 'voip', 'unified-communications'],
    service: 'voip-unified-comms',
  },
  {
    term: 'Riser cable',
    slug: 'riser-cable',
    aka: ['CMR cable', 'Riser-rated cable'],
    category: 'cabling',
    definition:
      'Cable with a fire-resistant jacket rated for vertical runs between floors, such as in shafts or stacked telecom closets. It’s marked “CMR” and is designed to keep flames from climbing the cable from one floor to the next.',
    why_it_matters:
      'Electrical code requires riser-rated or better cable in vertical shafts; it’s typically less expensive than plenum cable but can’t be used in air-handling spaces.',
    analogy: 'Like a fire door for a vertical shaft: it slows a fire from spreading upward along the cable.',
    qa: [
      {
        q: 'Can I use riser cable above a drop ceiling?',
        a: 'Only if that ceiling isn’t a plenum (air-return) space. If it is, plenum-rated (CMP) cable is required instead.',
      },
      {
        q: 'Can plenum cable be used in a riser?',
        a: 'Yes. Plenum cable has a higher fire rating and can substitute for riser cable, but not the other way around.',
      },
    ],
    related: ['plenum-cable', 'backbone-cabling', 'nec', 'pathway'],
    service: 'structured-cabling',
  },
  {
    term: 'RJ45',
    slug: 'rj45',
    stands_for: 'Registered Jack 45',
    aka: ['8P8C', 'Ethernet connector', 'Network jack'],
    category: 'cabling',
    definition:
      'The common plug and jack used for wired network (Ethernet) connections. It has eight small metal contacts and looks like a slightly wider version of a telephone plug. Technically it’s an “8P8C” connector, but everyone calls it RJ45.',
    why_it_matters:
      'Almost every wired network device you buy uses this connector, so wall jacks, patch panels and switches are all built around it.',
    analogy: 'The network world’s standard plug, the way a regular three-prong outlet is for power.',
    qa: [
      {
        q: 'Can I plug a phone cord into an RJ45 jack?',
        a: 'A smaller phone plug (RJ11) physically fits into an RJ45 jack and can work for some analog phone setups, but it doesn’t work for network connections. Forcing it can damage the jack’s outer contacts.',
      },
      {
        q: 'What are T568A and T568B?',
        a: 'They’re the two standard color orders for wiring the eight wires into an RJ45. Either works, but both ends of a cable (and ideally the whole building) should use the same one.',
      },
    ],
    related: ['ethernet', 'keystone-jack', 'patch-cable', 'ansi-tia-568', 'termination'],
    service: 'structured-cabling',
  },
  {
    term: 'Router',
    slug: 'router',
    category: 'networking',
    definition:
      'A device that connects different networks together and decides where data should go. Most commonly, it links your office network to the internet. Business routers often include a firewall and can handle multiple internet connections.',
    why_it_matters:
      'The router is your gateway to the internet and other sites, so its speed, security features and reliability affect everyone in the building.',
    analogy: 'Like a post office sorting center: it reads the address on each package and sends it toward the right city.',
    qa: [
      {
        q: 'What’s the difference between a router and a switch?',
        a: 'A switch connects devices within your building’s network. A router connects your network to other networks, such as the internet or another office. Many small networks have both.',
      },
      {
        q: 'Can I just use the router my internet provider gave me?',
        a: 'For a small office it can work, but provider-supplied units often have limited security, management and backup-connection features. Many businesses put their own firewall or router behind the provider’s equipment.',
      },
      {
        q: 'Is a Wi-Fi router the same thing?',
        a: 'A home “Wi-Fi router” combines a router, switch, firewall and wireless access point in one box. Business networks usually separate these into dedicated devices for performance and control.',
      },
    ],
    related: ['network-switch', 'firewall', 'isp', 'wan', 'lan', 'ip-address', 'access-point'],
    service: 'networking',
  },
];
