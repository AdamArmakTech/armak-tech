import type { GlossaryEntry } from './types';

export const entries: GlossaryEntry[] = [
  {
    term: 'SFP',
    slug: 'sfp',
    stands_for: 'Small Form-factor Pluggable',
    aka: ['SFP module', 'Optic', 'Transceiver', 'SFP+'],
    category: 'networking',
    definition:
      'A small, swappable module that plugs into a port on a network switch or router so it can connect to a fiber optic cable (or sometimes copper). The module turns the equipment’s electrical signals into light, and back again.',
    why_it_matters:
      'The right SFPs let fiber links reach other closets and buildings; the wrong ones simply won’t light up, so they must match your fiber type and equipment.',
    analogy:
      'Like a travel plug adapter: the switch stays the same, and you snap in whichever adapter fits the cable you need to connect.',
    qa: [
      {
        q: 'What’s the difference between SFP, SFP+ and SFP28?',
        a: 'Mostly speed. A standard SFP handles about 1 Gbps, SFP+ handles 10 Gbps and SFP28 handles 25 Gbps. Larger QSFP modules go to 40 Gbps, 100 Gbps and beyond. The port on the switch decides which ones it can accept.',
      },
      {
        q: 'Can I use any brand of SFP?',
        a: 'Not always. Some equipment makers only accept their own coded modules, while others accept compatible third-party ones. Both ends of a link also need matching types, such as singlemode or multimode and the same wavelength. Check compatibility before buying.',
      },
      {
        q: 'Can I swap one out while the switch is running?',
        a: 'Yes, SFPs are designed to be “hot-swappable,” meaning they can be inserted or removed without powering down the switch. The link using that module will drop while it’s out, of course.',
      },
    ],
    related: ['fiber-optic-cable', 'singlemode-fiber', 'multimode-fiber', 'network-switch', 'uplink', 'port'],
    service: 'networking',
  },
  {
    term: 'Singlemode fiber',
    slug: 'singlemode-fiber',
    aka: ['Single-mode fiber', 'SMF', 'OS1 / OS2 fiber'],
    category: 'cabling',
    definition:
      'A type of fiber optic cable with a very thin glass core (about 9 microns, far thinner than a hair) that carries a single narrow beam of laser light. That lets signals travel many kilometers with very little loss.',
    why_it_matters:
      'It’s the usual choice for long runs between buildings or across a campus, and it leaves the most room for faster equipment in the future.',
    analogy:
      'Like a straight, narrow highway with one lane: no merging or weaving, so traffic can travel a very long way without getting jumbled.',
    qa: [
      {
        q: 'Singlemode or multimode: which do I need?',
        a: 'Multimode is common and cost-effective for shorter runs inside one building. Singlemode is used for longer distances, such as between buildings, and offers more headroom for future speeds. Distance, your equipment’s optics and growth plans decide it.',
      },
      {
        q: 'How can I tell singlemode cable apart?',
        a: 'Singlemode cable jackets are usually yellow, while multimode is typically orange, aqua or lime green. Colors are a convention rather than a guarantee, so the printing on the jacket (such as “OS2”) is the reliable check.',
      },
      {
        q: 'Is singlemode more expensive?',
        a: 'The cable itself is often similar in price or even cheaper than high-grade multimode. Historically the laser optics at each end cost more, though that gap has narrowed a lot. Total cost depends on distances and the equipment involved.',
      },
    ],
    related: ['fiber-optic-cable', 'multimode-fiber', 'backbone-cabling', 'sfp', 'splice', 'insertion-loss'],
    service: 'structured-cabling',
  },
  {
    term: 'SIP trunk',
    slug: 'sip-trunk',
    stands_for: 'Session Initiation Protocol trunk',
    aka: ['SIP trunking', 'SIP lines'],
    category: 'voice',
    definition:
      'A way of delivering phone lines to a business over its internet or data connection instead of traditional copper phone lines. It connects your phone system (PBX) to the public phone network so you can make and receive outside calls.',
    why_it_matters:
      'SIP trunks usually cost less and scale more easily than old phone lines, and they let you keep your existing numbers when you modernize.',
    analogy:
      'Like streaming TV instead of a cable box: the same channels arrive, just over your internet connection rather than a dedicated wire.',
    qa: [
      {
        q: 'Is a SIP trunk the same as VoIP?',
        a: 'It’s one kind of VoIP. A SIP trunk connects a phone system you own or host to the outside world. Fully hosted cloud phone services also use VoIP, but the provider runs the phone system for you.',
      },
      {
        q: 'How many SIP trunks do I need?',
        a: 'Trunks are usually sold as “channels,” where each channel carries one call at a time. You need enough for your busiest moment of simultaneous inside-to-outside calls, not one per employee.',
      },
      {
        q: 'Can I keep my current phone numbers?',
        a: 'Usually yes. Numbers can typically be moved to a SIP provider through a process called number porting, which can take days to weeks depending on the carriers involved.',
      },
    ],
    related: ['voip', 'pbx', 'number-porting', 'isp', 'bandwidth', 'unified-communications'],
    service: 'voip-unified-comms',
  },
  {
    term: 'Site survey',
    slug: 'site-survey',
    aka: ['Site walk', 'Walkthrough', 'Pre-construction survey'],
    category: 'general',
    definition:
      'An in-person visit where a technician walks the building before a project to see the real conditions: ceilings, walls, existing cable, telecom rooms, power, and where devices will go. The findings shape the design and the quote.',
    why_it_matters:
      'Surprises found during a survey cost nothing to fix on paper; the same surprises found mid-installation cause delays and change orders.',
    analogy: 'Like a contractor looking at your kitchen before quoting a remodel, rather than pricing it from a description.',
    qa: [
      {
        q: 'Why is a quote from floor plans only a rough number?',
        a: 'Plans often don’t show hard ceilings, firewalls, asbestos concerns, crowded pathways or old cable that must be removed. These affect labor and materials. A quote from plans and photos gives you a useful ballpark; walking the space is what turns it into an accurate estimate.',
      },
      {
        q: 'What should I have ready for a survey?',
        a: 'Access to all relevant areas, including ceilings, telecom rooms and the roof if needed, any floor plans, a list of devices you want, and someone who knows the building’s history and future plans.',
      },
      {
        q: 'Is a site survey the same as a wireless survey?',
        a: 'No. A general site survey looks at the building and installation conditions. A wireless survey specifically measures or predicts Wi-Fi signal coverage. Wi-Fi projects often include both.',
      },
    ],
    related: ['wireless-survey', 'as-built-drawings', 'pathway', 'telecom-room'],
  },
  {
    term: 'Sound masking',
    slug: 'sound-masking',
    category: 'av',
    definition:
      'A system of ceiling speakers that plays a soft, evenly spread background sound, similar to gentle airflow. It makes nearby conversations harder to understand, so open offices feel quieter and more private.',
    why_it_matters:
      'It can improve speech privacy in offices, clinics and HR areas without building more walls, which matters where conversations are confidential.',
    analogy:
      'Like a quiet air conditioner humming in the background: you stop noticing it, but it blurs the words of the conversation two desks away.',
    qa: [
      {
        q: 'Isn’t that just white noise?',
        a: 'Not quite. Sound masking uses a carefully shaped sound that is tuned to the room so it covers speech without being harsh. Raw white noise sounds hissy and is more distracting.',
      },
      {
        q: 'Will people notice it?',
        a: 'When properly tuned and introduced gradually, most people stop noticing it quickly. It’s set at a low, comfortable level, and many systems can also play paging announcements and background music.',
      },
    ],
    related: ['paging', '70v-audio', 'zone-paging'],
    service: 'audio-video',
  },
  {
    term: 'Splice',
    slug: 'splice',
    aka: ['Fusion splice', 'Fiber splice', 'Mechanical splice'],
    category: 'cabling',
    definition:
      'A permanent joint between two strands of fiber optic cable. Fusion splicing lines up the glass ends and melts them together with an electric arc; mechanical splicing holds them aligned in a small clamp.',
    why_it_matters:
      'Good splices lose very little signal, so damaged fiber can be repaired and connectors added cleanly without replacing the whole cable run.',
    qa: [
      {
        q: 'Does a splice weaken the signal?',
        a: 'Slightly. A good fusion splice typically loses only a tiny fraction of a decibel, and industry standards set a maximum allowed loss per splice. Testing after installation confirms each link is within its budget.',
      },
      {
        q: 'Can a cut fiber cable be repaired?',
        a: 'Usually yes. Technicians can splice the broken ends back together, often inside a protective splice enclosure. If the damage is extensive, replacing that section may be the better option.',
      },
    ],
    related: ['fiber-optic-cable', 'termination', 'insertion-loss', 'cable-certification', 'singlemode-fiber'],
    service: 'structured-cabling',
  },
  {
    term: 'Structured cabling',
    slug: 'structured-cabling',
    aka: ['Structured wiring', 'Premises cabling'],
    category: 'cabling',
    definition:
      'An organized, standards-based way of wiring a building for data and phones. Cables run from each wall jack or device back to labeled patch panels in telecom rooms, following rules on layout, length and testing.',
    why_it_matters:
      'Planned, documented cabling supports several generations of equipment. Unplanned cabling tends to get re-run every time something changes.',
    analogy:
      'Like a building’s plumbing: planned pipes to every room, all leading back to a central place where you can manage them.',
    qa: [
      {
        q: 'What’s the alternative to structured cabling?',
        a: 'Point-to-point cabling, where each device is wired straight to another as needed. It can seem cheaper at first but gets hard to manage, troubleshoot and expand as cables pile up.',
      },
      {
        q: 'How long does structured cabling last?',
        a: 'The cable itself often outlives several generations of computers and switches, which is why it is planned for the long term. How long it stays useful depends mostly on the category chosen and your future speed needs.',
      },
      {
        q: 'Does it include fiber and Wi-Fi?',
        a: 'It includes fiber backbone cabling and the cables that feed Wi-Fi access points, cameras and other devices. The wireless equipment itself is usually considered part of the network rather than the cabling.',
      },
    ],
    related: [
      'ansi-tia-568',
      'horizontal-cabling',
      'backbone-cabling',
      'patch-panel',
      'telecom-room',
      'tia-606-labeling',
      'cable-certification',
    ],
    service: 'structured-cabling',
  },
  {
    term: 'Tailgating',
    slug: 'tailgating',
    aka: ['Piggybacking'],
    category: 'access',
    definition:
      'When someone without permission slips through a secured door right behind a person who badged in legitimately. It’s called piggybacking when the authorized person knowingly holds the door open for them.',
    why_it_matters:
      'Tailgating defeats an expensive access control system with no technical skill at all, so many security plans address it directly.',
    analogy: 'Like a second car slipping through a parking gate before the arm comes down.',
    qa: [
      {
        q: 'How can tailgating be prevented?',
        a: 'Common measures include staff training, door-held-open alarms, cameras at entrances, video analytics that count people passing through, and turnstiles or vestibules where security needs are high.',
      },
      {
        q: 'Does access control stop tailgating on its own?',
        a: 'No. A card reader only controls who unlocks the door, not how many people walk through it. Additional sensors, cameras or physical barriers are needed to detect or prevent it.',
      },
    ],
    related: ['access-control', 'card-reader', 'video-analytics', 'cctv'],
    service: 'access-control',
  },
  {
    term: 'Telecom room',
    slug: 'telecom-room',
    aka: ['TR', 'Network closet', 'IT closet', 'Wiring closet', 'IDF'],
    category: 'cabling',
    definition:
      'A dedicated room or closet that holds the network equipment and cable connections for an area of a building. Cables from nearby wall jacks and devices run back here to patch panels, switches and racks.',
    why_it_matters:
      'Its location, size, cooling, power and security directly affect how reliable your network is and how easily it can grow.',
    analogy: 'Like an electrical panel for your network: the place where all the circuits in an area come together.',
    qa: [
      {
        q: 'How many telecom rooms do we need?',
        a: 'It depends on distance and size. Standard copper network cable runs are limited to 90 meters (about 295 feet) from the room to the jack, so large floors or multi-story buildings usually need more than one.',
      },
      {
        q: 'Can it double as a storage or janitor closet?',
        a: 'It shouldn’t. Standards call for dedicated space, because water, chemicals, dust, heat and unrestricted access all put expensive and critical equipment at risk.',
      },
      {
        q: 'Does it need air conditioning?',
        a: 'Often yes. Switches, servers and UPS units give off heat, and a small closed room can overheat quickly. Ventilation or dedicated cooling should be planned based on the equipment inside.',
      },
    ],
    related: ['idf', 'mdf', 'rack', 'patch-panel', 'network-switch', 'ups', 'horizontal-cabling'],
    service: 'structured-cabling',
  },
  {
    term: 'Termination',
    slug: 'termination',
    aka: ['Terminating', 'Cable termination'],
    category: 'cabling',
    definition:
      'Finishing the end of a cable by attaching it to a jack, plug, patch panel or fiber connector so it can actually be plugged in and used. For copper, this usually means pressing each wire into a slot.',
    why_it_matters:
      'Sloppy terminations are one of the most common reasons new cable fails testing or causes slow, unreliable connections later.',
    analogy: 'Like hemming the end of a rope so it doesn’t fray and can be tied onto something.',
    qa: [
      {
        q: 'Why do terminations fail?',
        a: 'Common causes include untwisting the wire pairs too far, wires in the wrong order, damaged conductors, or connectors that don’t match the cable category. With fiber, dirty or poorly polished ends are frequent culprits.',
      },
      {
        q: 'How do I know terminations were done right?',
        a: 'Each completed cable should be tested with a certification tester, which checks wiring and performance against the standard. Ask for the test reports at the end of the job.',
      },
    ],
    related: ['punch-down', 'keystone-jack', 'patch-panel', 'rj45', 'cable-certification', 'splice'],
    service: 'structured-cabling',
  },
  {
    term: 'TIA-606 labeling',
    slug: 'tia-606-labeling',
    stands_for: 'Telecommunications Industry Association standard 606',
    aka: ['ANSI/TIA-606', 'Cable labeling standard'],
    category: 'standards',
    definition:
      'The industry standard for labeling and documenting cabling systems. It gives every cable, jack, patch panel, rack and room a unique, logical identifier, and keeps records that match what is physically installed.',
    why_it_matters:
      'Consistent labels let any technician find and fix a problem quickly, saving time and money on every future move, change or repair.',
    analogy: 'Like street addresses for every cable, so anyone can find the right one without knocking on every door.',
    qa: [
      {
        q: 'What does a label look like?',
        a: 'Typically a short code showing where a cable lives, such as the floor, room, rack, panel and port number. The same code appears at both ends of the cable and in the records.',
      },
      {
        q: 'Do small offices really need this?',
        a: 'The standard scales by size, with simpler classes for a single room or building. Even a small office benefits when matching labels at the desk and the patch panel save troubleshooting time.',
      },
    ],
    related: ['structured-cabling', 'as-built-drawings', 'patch-panel', 'ansi-tia-568', 'cable-certification'],
    service: 'structured-cabling',
  },
  {
    term: 'Time and attendance',
    slug: 'time-and-attendance',
    aka: ['Time clock', 'Time tracking', 'Workforce time management'],
    category: 'access',
    definition:
      'Systems that record when employees start and end work and take breaks, using a badge, PIN, fingerprint, face scan or phone app. The hours usually feed straight into payroll software.',
    why_it_matters:
      'Accurate time records reduce payroll errors and support compliance with wage-and-hour rules, which are especially detailed in California.',
    analogy: 'Punching a paper time card, minus the paper.',
    qa: [
      {
        q: 'Can it use the same badges as our doors?',
        a: 'Often yes. Many time clocks read the same cards or mobile credentials as the access control system, so employees carry one credential for both.',
      },
      {
        q: 'Are fingerprint or face-scan clocks legal?',
        a: 'Generally yes, but biometric data is regulated in some states and can carry notice, consent and data-handling obligations. Check current requirements with your HR or legal advisor before choosing biometrics.',
      },
      {
        q: 'Can remote or field workers clock in?',
        a: 'Many systems offer mobile apps, sometimes with location checks, so off-site staff can record time from a phone.',
      },
    ],
    related: ['access-control', 'credential', 'mobile-credential', 'card-reader', 'cloud-managed'],
    service: 'access-control',
  },
  {
    term: 'Unified communications',
    slug: 'unified-communications',
    stands_for: 'UC (UCaaS when delivered as a cloud service)',
    aka: ['UC', 'UCaaS', 'Unified communications as a service'],
    category: 'voice',
    definition:
      'Bringing phone calls, voicemail, video meetings, chat messaging and presence (whether someone is available) into one connected system. People can reach each other the same way from a desk phone, computer or mobile app.',
    why_it_matters:
      'One system for all communication can cut the number of separate tools and bills, and lets staff work from anywhere with the same business number.',
    analogy: 'Like a single inbox for every way people contact you, instead of checking five different apps.',
    qa: [
      {
        q: 'Is unified communications just a fancy name for VoIP?',
        a: 'VoIP is the technology that carries voice over a data network. Unified communications builds on it by adding video, messaging, presence and mobile apps in one platform.',
      },
      {
        q: 'Do we still need desk phones?',
        a: 'Not necessarily. Many users switch to a computer app or mobile app. Desk phones remain popular for receptionists, shared areas and anyone who handles a lot of calls.',
      },
    ],
    related: ['voip', 'pbx', 'sip-trunk', 'cloud-managed', 'paging'],
    service: 'voip-unified-comms',
  },
  {
    term: 'Uplink',
    slug: 'uplink',
    aka: ['Uplink port', 'Trunk link'],
    category: 'networking',
    definition:
      'The connection that links a network switch to the next level of the network, such as a main switch, router or firewall. All of the traffic from devices on that switch shares this one path.',
    why_it_matters:
      'An undersized uplink becomes a bottleneck, slowing everyone on that switch even when the individual connections are fast.',
    analogy: 'Like the on-ramp from a neighborhood onto the freeway: if it’s one lane, rush hour backs up no matter how wide the local streets are.',
    qa: [
      {
        q: 'How fast should an uplink be?',
        a: 'Faster than any single device connection, and sized for how much traffic the switch carries at once. Many business networks use 10 Gbps or faster uplinks, often over fiber.',
      },
      {
        q: 'Should there be more than one uplink?',
        a: 'For important closets, two uplinks can add capacity and keep things running if one cable or port fails, as long as the switches are configured to use them correctly.',
      },
    ],
    related: ['network-switch', 'sfp', 'fiber-optic-cable', 'backbone-cabling', 'bandwidth', 'gbps'],
    service: 'networking',
  },
  {
    term: 'UPS',
    slug: 'ups',
    stands_for: 'Uninterruptible Power Supply',
    aka: ['Battery backup'],
    category: 'power',
    definition:
      'A battery backup unit that keeps equipment running the instant the power flickers or goes out. It also smooths out power spikes and dips. Most give minutes of runtime, not hours.',
    why_it_matters:
      'It keeps your network, phones and cameras up through brief outages and gives equipment time to shut down safely during long ones.',
    analogy: 'Like a spare tank of air for a diver: it doesn’t replace the main supply, but it buys you time to act safely.',
    qa: [
      {
        q: 'How long will a UPS keep things running?',
        a: 'It depends on battery size and how much equipment is plugged in. A typical rack UPS might last anywhere from a few minutes to an hour. Longer runtime needs extra battery packs or a generator.',
      },
      {
        q: 'Do UPS batteries need replacing?',
        a: 'Yes. Common lead-acid UPS batteries often last around three to five years, less in hot rooms. Lithium-ion models usually last longer. Many units warn you when a battery test fails.',
      },
      {
        q: 'If the network has a UPS, will phones and cameras stay on?',
        a: 'PoE devices like phones, cameras and access points stay on if the PoE switch they connect to is on a UPS. Calls to the outside also need the internet equipment powered.',
      },
    ],
    related: ['poe', 'network-switch', 'rack', 'telecom-room', 'grounding-and-bonding'],
    service: 'networking',
  },
  {
    term: 'UTP / STP',
    slug: 'utp-stp',
    stands_for: 'Unshielded Twisted Pair / Shielded Twisted Pair',
    aka: ['Unshielded cable', 'Shielded cable', 'F/UTP', 'S/FTP'],
    category: 'cabling',
    definition:
      'The two main styles of copper network cable. Both twist pairs of wires together to cancel out interference. Shielded (STP) cable adds a foil or braided metal layer for extra protection from electrical noise.',
    why_it_matters:
      'Choosing the right type affects cost, installation effort and reliability, especially near motors, lighting ballasts or other sources of electrical noise.',
    analogy:
      'Like wearing a jacket versus wearing a jacket and a raincoat: the extra layer helps in a storm, but only if worn correctly.',
    qa: [
      {
        q: 'Is shielded cable always better?',
        a: 'Not always. Shielding helps in electrically noisy environments, but it must be properly grounded at the connections. Poorly installed shielded cable can perform worse than unshielded. Most offices use unshielded successfully.',
      },
      {
        q: 'What do labels like F/UTP or S/FTP mean?',
        a: 'They describe where the shielding is. The letter before the slash is the overall shield (F for foil, S for braid); the part after describes each pair (U for unshielded, FTP for foil around each pair).',
      },
    ],
    related: ['copper-cabling', 'cat-6', 'cat-6a', 'grounding-and-bonding', 'next'],
    service: 'structured-cabling',
  },
  {
    term: 'Video analytics',
    slug: 'video-analytics',
    aka: ['AI video analytics', 'Smart detection', 'Video content analysis'],
    category: 'security',
    definition:
      'Software that automatically watches camera video for specific events, such as a person entering an area after hours, a vehicle stopping, someone loitering, or a crowd forming. It can send alerts and make recorded video searchable.',
    why_it_matters:
      'Cameras can flag problems as they happen instead of only being reviewed afterward, and finding footage takes minutes.',
    analogy: 'Like a security guard who never blinks, watching every screen and tapping you on the shoulder when something matters.',
    qa: [
      {
        q: 'Does video analytics eliminate false alarms?',
        a: 'It greatly reduces them compared with simple motion detection, which triggers on shadows, trees or rain. It is not perfect, so rules and camera placement need tuning for each scene.',
      },
      {
        q: 'Where does the analysis happen?',
        a: 'Either inside the camera itself (often called “edge” analytics), on a recorder or server, or in the cloud. Each approach has trade-offs in cost, bandwidth and features.',
      },
      {
        q: 'Is facial recognition included?',
        a: 'Some systems offer it, but it raises privacy and legal questions that vary by location. Most business analytics focus on detecting people and vehicles rather than identifying who someone is.',
      },
    ],
    related: ['ip-camera', 'vms', 'nvr', 'cctv', 'tailgating'],
    service: 'video-surveillance',
  },
  {
    term: 'Video intercom',
    slug: 'video-intercom',
    aka: ['Video door station', 'Video entry system'],
    category: 'access',
    definition:
      'A door station with a camera, speaker, microphone and call button. Staff can see and talk to visitors from a screen, phone or app, then unlock the door remotely if they choose.',
    why_it_matters:
      'It lets you screen visitors and deliveries before opening the door, and many systems record who called and when.',
    analogy: 'Like a video doorbell, but built for a business and tied into the door locks and phone system.',
    qa: [
      {
        q: 'Can it ring our desk phones or cell phones?',
        a: 'Often yes. Many video intercoms connect to VoIP phone systems or mobile apps, so calls can go to a receptionist, a group of phones or staff working elsewhere.',
      },
      {
        q: 'Does it work with our access control?',
        a: 'Many models integrate with access control so the door release, credential readers and event logs work together. Compatibility depends on the specific products.',
      },
    ],
    related: ['intercom', 'access-control', 'electric-strike', 'voip', 'ip-camera', 'poe'],
    service: 'access-control',
  },
  {
    term: 'Video wall',
    slug: 'video-wall',
    category: 'av',
    definition:
      'Several displays mounted edge to edge and controlled together so they act like one large screen, or show multiple feeds side by side. Thin-border panels keep the seams between screens small.',
    why_it_matters:
      'Video walls give lobbies and showrooms one large display and let security staff watch many cameras at once in a monitoring room.',
    analogy: 'Like tiles on a floor that together form one big picture.',
    qa: [
      {
        q: 'Why not just buy one giant TV?',
        a: 'Single displays top out at a certain size and get expensive. A video wall can be built to almost any size and shape, and one failed panel can be replaced without replacing everything.',
      },
      {
        q: 'What runs the content on a video wall?',
        a: 'A video wall controller or processor splits and arranges the image across the screens. Content can come from computers, digital signage players or camera software.',
      },
    ],
    related: ['digital-signage', 'hdmi', 'hdbaset', 'vms'],
    service: 'audio-video',
  },
  {
    term: 'VLAN',
    slug: 'vlan',
    stands_for: 'Virtual Local Area Network',
    aka: ['IEEE 802.1Q', 'Network segment'],
    category: 'networking',
    definition:
      'A way to split one physical network into separate, isolated networks using switch settings rather than separate cables. For example, guests, staff, phones and cameras can share the same switches but not see each other.',
    why_it_matters:
      'Segmenting the network limits how far a hacked device can reach, keeps guest traffic away from business systems and helps voice and video run smoothly.',
    analogy:
      'Like an office building where everyone uses the same hallways, but each company’s keycard only opens its own suite.',
    qa: [
      {
        q: 'Do we need VLANs in a small office?',
        a: 'Even small offices benefit from at least separating guest Wi-Fi and devices like cameras or smart TVs from business computers. It’s a low-cost way to reduce risk.',
      },
      {
        q: 'Do VLANs require new equipment?',
        a: 'They need “managed” switches and a router or firewall that support them. Most business-grade equipment does; basic unmanaged switches do not.',
      },
      {
        q: 'Why put phones on their own VLAN?',
        a: 'A voice VLAN makes it easier to give calls priority over other traffic, so conversations stay clear when the network is busy.',
      },
    ],
    related: ['lan', 'network-switch', 'firewall', 'router', 'voip', 'ip-camera'],
    service: 'networking',
  },
  {
    term: 'VMS',
    slug: 'vms',
    stands_for: 'Video Management System (or Software)',
    aka: ['Video management software'],
    category: 'security',
    definition:
      'The software used to view, record, search and manage video from security cameras. It lets you watch live feeds, find recorded footage, export clips and control who can see which cameras.',
    why_it_matters:
      'A good VMS determines how quickly you can find and share footage after an incident, and how easily the system grows to more cameras or sites.',
    analogy: 'Like a TV guide and DVR combined for every camera you own.',
    qa: [
      {
        q: 'What’s the difference between a VMS and an NVR?',
        a: 'An NVR is usually a recording box with built-in software. A VMS is the software layer, which can run on servers, on an NVR or in the cloud, and typically handles larger or multi-site systems.',
      },
      {
        q: 'Can I watch my cameras from my phone?',
        a: 'Most modern VMS platforms offer mobile apps or web access, with permissions controlling what each user can see. Remote access should be set up securely.',
      },
      {
        q: 'Will it work with cameras from different brands?',
        a: 'Many VMS products support multiple brands, often through the ONVIF standard. Advanced features may work best with specific supported camera models, so check compatibility lists.',
      },
    ],
    related: ['nvr', 'ip-camera', 'onvif', 'video-analytics', 'cloud-managed', 'h-264-h-265'],
    service: 'video-surveillance',
  },
  {
    term: 'VoIP',
    slug: 'voip',
    stands_for: 'Voice over Internet Protocol',
    aka: ['Internet phone', 'IP telephony', 'Cloud phone system'],
    category: 'voice',
    definition:
      'Technology that carries phone calls as data over a computer network and the internet, instead of over traditional copper phone lines. Calls can be made from desk phones, computers or mobile apps.',
    why_it_matters:
      'VoIP usually lowers phone costs and adds features like call routing and voicemail-to-email, but call quality depends on a well-built network and internet connection.',
    analogy: 'Like sending your voice as an email in tiny pieces, delivered and reassembled so fast it feels like a normal phone call.',
    qa: [
      {
        q: 'Do I still need a phone company if I switch to VoIP?',
        a: 'You need a VoIP provider and a reliable internet service provider, but not a traditional phone line from the local phone company. Your VoIP provider handles connections to the regular phone network.',
      },
      {
        q: 'What happens to my phones if the power or internet goes down?',
        a: 'Calls stop unless your network equipment is on battery backup and your internet stays up. Many businesses add a backup internet connection and set calls to forward to cell phones during outages.',
      },
      {
        q: 'Does 911 work with VoIP?',
        a: 'Yes, but each phone’s registered location must be kept up to date so emergency services are sent to the right place. Federal rules require business phone systems to support direct 911 dialing and location information.',
      },
    ],
    related: ['sip-trunk', 'pbx', 'unified-communications', 'isp', 'latency', 'poe', 'number-porting'],
    service: 'voip-unified-comms',
  },
  {
    term: 'VPN',
    slug: 'vpn',
    stands_for: 'Virtual Private Network',
    category: 'networking',
    definition:
      'An encrypted, private connection across the public internet. It lets remote workers securely reach the office network, or links two office locations together as if they were on the same network.',
    why_it_matters:
      'A VPN protects business data traveling over untrusted networks like hotel or coffee-shop Wi-Fi, and connects branch offices without dedicated private lines.',
    analogy: 'Like an armored, sealed tunnel through a busy public road: the traffic shares the road, but no one can see inside.',
    qa: [
      {
        q: 'What’s the difference between remote-access and site-to-site VPN?',
        a: 'Remote-access VPN connects one person’s device to the office. Site-to-site VPN permanently links two locations, usually router to router or firewall to firewall, so users don’t have to do anything.',
      },
      {
        q: 'Is a VPN enough to keep us secure?',
        a: 'It protects data in transit, but it’s one layer. Strong passwords, multi-factor sign-in, updated equipment and limiting what VPN users can reach all matter too.',
      },
    ],
    related: ['firewall', 'router', 'wan', 'isp', 'lan'],
    service: 'networking',
  },
  {
    term: 'WAN',
    slug: 'wan',
    stands_for: 'Wide Area Network',
    category: 'networking',
    definition:
      'A network that connects locations spread over large distances, such as offices in different cities, or your office to the internet. The internet itself is the largest WAN. A LAN is the local network inside one building.',
    why_it_matters:
      'Your WAN connections decide how well multiple sites, cloud services and remote staff can reach each other, and what happens when a link goes down.',
    analogy: 'If your LAN is the roads inside a neighborhood, the WAN is the highway system connecting different towns.',
    qa: [
      {
        q: 'What is the “WAN port” on my router?',
        a: 'It’s the port that connects to your internet service, usually from the ISP’s modem or equipment. The other ports serve the devices inside your building.',
      },
      {
        q: 'What is SD-WAN?',
        a: 'Software-defined WAN is a way to manage several internet connections or sites centrally, steering traffic over the best available link and failing over automatically if one goes down.',
      },
    ],
    related: ['lan', 'isp', 'router', 'vpn', 'firewall', 'demarc'],
    service: 'networking',
  },
  {
    term: 'WDR',
    slug: 'wdr',
    stands_for: 'Wide Dynamic Range',
    aka: ['HDR (for cameras)', 'True WDR'],
    category: 'security',
    definition:
      'A security camera feature that handles scenes with both very bright and very dark areas, like a doorway with sunlight behind a visitor. It balances the image so both the face and the background remain visible.',
    why_it_matters:
      'Without good WDR, cameras at entrances and windows often record a dark silhouette instead of an identifiable face.',
    analogy: 'Like your eyes adjusting to see both a sunny window and the dim room around it at the same time.',
    qa: [
      {
        q: 'What’s the difference between true WDR and digital WDR?',
        a: 'True WDR captures several exposures and combines them into one image. Digital WDR mostly brightens the dark areas through processing. True WDR generally handles harsh backlight much better.',
      },
      {
        q: 'Do the dB numbers on spec sheets matter?',
        a: 'Higher numbers suggest better range, but manufacturers measure differently, so the numbers aren’t always comparable. Seeing sample footage in a similar lighting situation is more useful.',
      },
    ],
    related: ['ip-camera', 'cctv', 'video-analytics'],
    service: 'video-surveillance',
  },
  {
    term: 'Wiegand',
    slug: 'wiegand',
    aka: ['Wiegand protocol', 'Wiegand interface', '26-bit'],
    category: 'access',
    definition:
      'An older, very common way for card readers to send badge numbers to the door controller over a few wires. It only sends data one way and isn’t encrypted, so the signal can be intercepted or copied.',
    why_it_matters:
      'Many existing access systems still rely on Wiegand, and upgrading to the more secure OSDP standard is a common step when modernizing door security.',
    analogy: 'Like passing a note in plain writing down a hallway: it gets there, but anyone along the way could read or copy it.',
    qa: [
      {
        q: 'Is Wiegand insecure?',
        a: 'It has well-known weaknesses: no encryption and no way for the controller to check the reader is healthy. Inexpensive devices can capture card data from the wires. OSDP was created largely to fix these issues.',
      },
      {
        q: 'Do I have to replace everything to move off Wiegand?',
        a: 'Not always. Many modern readers and controllers support both Wiegand and OSDP. Existing wiring can sometimes be reused, but it depends on the cable and equipment, so an assessment is needed.',
      },
      {
        q: 'What does “26-bit” mean?',
        a: 'It’s a common card data format describing how many bits of information the badge sends. Its small number range means card numbers can repeat across sites, one reason organizations move to newer formats.',
      },
    ],
    related: ['osdp', 'card-reader', 'prox-card', 'credential', 'access-control'],
    service: 'access-control',
  },
  {
    term: 'Wi-Fi 6 / 6E / 7',
    slug: 'wi-fi-6-6e-7',
    stands_for: 'Wi-Fi 6 = IEEE 802.11ax; Wi-Fi 6E = 802.11ax in the 6 GHz band; Wi-Fi 7 = IEEE 802.11be',
    aka: ['802.11ax', '802.11be'],
    category: 'networking',
    definition:
      'Recent generations of wireless networking. Wi-Fi 6 handles many devices more efficiently; Wi-Fi 6E adds a new, less crowded radio band (6 GHz); Wi-Fi 7 adds wider channels and can use several bands at once for higher speed and responsiveness.',
    why_it_matters:
      'Newer Wi-Fi supports more devices and faster speeds, but it also expects stronger cabling and switches behind each access point to deliver those gains.',
    analogy:
      'Like adding more lanes and smarter traffic lights to a busy road: more cars move at once with less waiting.',
    qa: [
      {
        q: 'Is Wi-Fi 7 worth it yet?',
        a: 'For new installs it’s worth considering, since newer phones and laptops increasingly support it and access points last years. Older devices still work but won’t get the new benefits. Wi-Fi 6E remains a solid, often cheaper option.',
      },
      {
        q: 'Do I need new cabling for Wi-Fi 7?',
        a: 'Many Wi-Fi 6E and 7 access points have faster-than-1 Gbps ports and draw more PoE power. Cat 6A cabling and multi-gigabit PoE switches let them reach full potential; older cable may limit them.',
      },
      {
        q: 'Does 6 GHz reach as far as regular Wi-Fi?',
        a: 'No. Higher-frequency signals lose more strength through walls, so 6 GHz coverage is shorter range. Designs often place access points closer together to cover the same space.',
      },
    ],
    related: ['access-point', 'wireless-survey', 'poe', 'cat-6a', 'network-switch', 'channel', 'bandwidth'],
    service: 'networking',
  },
  {
    term: 'Wireless survey',
    slug: 'wireless-survey',
    aka: ['Wi-Fi survey', 'RF survey', 'Wi-Fi heat map', 'Predictive survey'],
    category: 'networking',
    definition:
      'A study that predicts or measures Wi-Fi signal strength and interference throughout a building, then decides how many access points are needed and where they should go. Results are often shown as color-coded “heat maps.”',
    why_it_matters:
      'A survey helps avoid dead zones, slow spots and overspending on unnecessary access points, and verifies the finished network performs as designed.',
    analogy: 'Like a lighting designer planning where to place lamps so every corner is lit without blinding glare.',
    qa: [
      {
        q: 'What types of wireless surveys are there?',
        a: 'Predictive surveys use floor plans and software modeling. On-site passive surveys measure existing signals and interference. Active and post-installation surveys test real connections to confirm coverage and performance.',
      },
      {
        q: 'Can’t we just add access points where Wi-Fi is weak?',
        a: 'That can work in small spaces, but in larger buildings too many access points can interfere with each other. A survey balances coverage, capacity and interference.',
      },
    ],
    related: ['access-point', 'site-survey', 'wi-fi-6-6e-7', 'channel'],
    service: 'networking',
  },
  {
    term: 'Zone cabling',
    slug: 'zone-cabling',
    aka: ['Zone distribution'],
    category: 'cabling',
    definition:
      'A layout where groups of cables run from the telecom room to a box or enclosure in a central spot, often in the ceiling. Shorter cables then branch out from that point to nearby desks or devices.',
    why_it_matters:
      'It makes office rearrangements cheaper and faster, since only the short cables between the zone box and the desks need to change.',
    analogy: 'Like a power strip placed in the middle of a room, rather than running every cord back to the wall outlet.',
    qa: [
      {
        q: 'When is zone cabling a good idea?',
        a: 'In open offices that are reconfigured often, or ceilings full of devices like access points and cameras. It’s less useful where furniture and walls rarely change.',
      },
      {
        q: 'Are there rules for where the zone box goes?',
        a: 'Yes. Cabling standards require the consolidation point to be at least 15 meters (about 49 feet) from the telecom room, and only one is allowed in each cable run.',
      },
    ],
    related: ['consolidation-point', 'horizontal-cabling', 'structured-cabling', 'telecom-room', 'ansi-tia-568'],
    service: 'structured-cabling',
  },
  {
    term: 'Zone paging',
    slug: 'zone-paging',
    aka: ['Zoned paging', 'All-call'],
    category: 'voice',
    definition:
      'Splitting a building’s overhead speakers into separate areas, called zones, so announcements can go to one area, several, or everywhere at once (an “all-call”). Zones can include ceiling speakers and phone speakers.',
    why_it_matters:
      'It lets you reach the people who need a message without interrupting everyone else, such as paging the warehouse without disturbing the office.',
    analogy: 'Like a group chat for loudspeakers: you pick which group hears the message.',
    qa: [
      {
        q: 'Can our phone system make the pages?',
        a: 'Often yes. Many VoIP phone systems support paging zones through desk phones, network speakers or adapters that connect to existing amplifiers and speakers.',
      },
      {
        q: 'Can it also play background music?',
        a: 'Many paging systems can play music in some zones and automatically lower it during announcements.',
      },
    ],
    related: ['paging', 'voip', '70v-audio', 'intercom', 'sound-masking'],
    service: 'voip-unified-comms',
  },
];
