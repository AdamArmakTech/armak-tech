import type { GlossaryEntry } from './types';

export const entries: GlossaryEntry[] = [
  {
    term: 'DAS',
    slug: 'das',
    stands_for: 'Distributed Antenna System',
    aka: ['Cellular booster system', 'In-building wireless'],
    category: 'networking',
    definition:
      'A network of small antennas spread through a building to bring cell-phone signal (or emergency-radio signal) indoors where thick walls, glass or basements block it.',
    why_it_matters:
      'Dead zones frustrate staff and visitors, and many fire codes require reliable indoor radio coverage for firefighters before a building can be occupied.',
    analogy: 'Like sprinkler heads for cell signal — one source, piped to many outlets so every room gets coverage.',
    qa: [
      {
        q: 'Is a DAS the same as Wi-Fi?',
        a: 'No. Wi-Fi is your own private network for laptops and devices. A DAS carries signals from cellular carriers (or public-safety radio) so phones get bars indoors. Many buildings need both.',
      },
      {
        q: 'Why would the fire department care about a DAS?',
        a: 'Firefighters rely on handheld radios. Many jurisdictions require an emergency responder radio coverage system — often built as a public-safety DAS — in larger or hard-to-reach buildings, and test signal strength before sign-off.',
      },
      {
        q: 'Can I just buy a signal booster instead?',
        a: 'Small consumer boosters can help a single office. Large buildings, multiple carriers and code-required public-safety coverage usually need a properly designed system, and carriers may need to approve equipment connected to their network.',
      },
    ],
    related: ['fiber-optic-cable', 'site-survey', 'backbone-cabling'],
  },
  {
    term: 'Demarc',
    slug: 'demarc',
    stands_for: 'Demarcation point',
    aka: ['MPOE (minimum point of entry)', 'Point of demarcation'],
    category: 'cabling',
    definition:
      'The spot where the phone or internet provider’s wiring ends and the building’s own wiring begins. Everything on the provider’s side is theirs to fix; everything on your side is yours.',
    why_it_matters:
      'Knowing where the demarc is saves time and finger-pointing during an outage, and determines how far your own cabling must run to reach the provider’s equipment.',
    analogy: 'Like the water meter at the street — the utility owns the pipe up to it, and you own the plumbing after it.',
    qa: [
      {
        q: 'Where is the demarc usually located?',
        a: 'Often in a ground-floor or basement utility room, close to where the provider’s lines enter the building. In multi-tenant buildings it may be far from your own suite.',
      },
      {
        q: 'What is an "extended demarc"?',
        a: 'Cabling that carries the provider’s service from the building’s main demarc up to your suite or telecom room, so the provider’s equipment can sit near your network gear. It is often needed when a new internet circuit is installed.',
      },
      {
        q: 'If my internet goes down, who do I call?',
        a: 'Start with your internet provider. If they confirm their service is working at the demarc, the problem is on your side — your cabling, router, firewall or switches.',
      },
    ],
    related: ['isp', 'mdf', 'backbone-cabling', 'telecom-room'],
    service: 'structured-cabling',
  },
  {
    term: 'DHCP',
    slug: 'dhcp',
    stands_for: 'Dynamic Host Configuration Protocol',
    category: 'networking',
    definition:
      'The automatic system that hands each device an IP address (its network "street address") and other settings the moment it connects, so nobody has to type them in by hand.',
    why_it_matters:
      'When DHCP runs out of addresses or stops working, new devices can’t get online — a common, easily prevented cause of “the internet is down” calls.',
    analogy: 'Like a hotel front desk assigning room numbers to guests as they check in.',
    qa: [
      {
        q: 'What device runs DHCP in my office?',
        a: 'Usually the router or firewall, though larger networks may use a server for it. It keeps a list of which address was lent to which device and for how long.',
      },
      {
        q: 'Should cameras and printers use DHCP too?',
        a: 'Devices that others need to find — printers, cameras, recorders, servers — are usually given a fixed address, either set on the device or "reserved" in DHCP so it never changes.',
      },
    ],
    related: ['ip-address', 'router', 'firewall', 'dns', 'lan'],
    service: 'networking',
  },
  {
    term: 'Digital signage',
    slug: 'digital-signage',
    aka: ['Electronic signage', 'Digital displays'],
    category: 'av',
    definition:
      'Screens used to show menus, wayfinding, announcements or advertising, with content managed from a computer or online dashboard instead of printed posters.',
    why_it_matters:
      'Messages can be updated across every screen in minutes, without reprinting — but each screen needs power, a network connection and a sturdy, correctly placed mount.',
    analogy: 'Like a bulletin board you can rewrite from your desk.',
    qa: [
      {
        q: 'Can I just use a regular TV?',
        a: 'Consumer TVs work for light use, but commercial displays are built for long daily hours, brighter rooms, and often include warranties covering commercial use. Check the manufacturer’s rated hours before buying.',
      },
      {
        q: 'What does each sign need behind it?',
        a: 'Typically a power outlet, a network cable or reliable Wi-Fi, a small media player (sometimes built into the screen) and a mount rated for the display’s weight.',
      },
      {
        q: 'Who updates the content?',
        a: 'Usually your own staff, through signage software that lets you schedule playlists, change slides and push updates to one screen or all of them.',
      },
    ],
    related: ['hdmi', 'hdbaset', 'drop', 'ethernet', 'cloud-managed'],
    service: 'audio-video',
  },
  {
    term: 'DNS',
    slug: 'dns',
    stands_for: 'Domain Name System',
    category: 'networking',
    definition:
      'The internet’s phone book: it translates names people type, like a website address, into the numeric IP addresses computers actually use to connect.',
    why_it_matters:
      'If DNS fails, websites and cloud apps appear "down" even though the internet connection works, and DNS filtering can block many malicious sites before they load.',
    analogy: 'Like a contacts app — you tap a name, and it dials the number for you.',
    qa: [
      {
        q: 'How do I know if a problem is DNS?',
        a: 'A classic sign: everything seems connected, but websites won’t load by name. Your IT provider can test whether names are resolving to addresses correctly.',
      },
      {
        q: 'Is DNS something I have to buy?',
        a: 'Basic DNS is normally provided by your internet provider or a free public service. Businesses sometimes choose a filtering DNS service that blocks known malicious or unwanted sites.',
      },
    ],
    related: ['ip-address', 'dhcp', 'firewall', 'router', 'isp'],
    service: 'networking',
  },
  {
    term: 'Door position switch',
    slug: 'door-position-switch',
    aka: ['DPS', 'Door contact', 'Door sensor'],
    category: 'access',
    definition:
      'A small magnetic sensor in the door and frame that tells the access control or alarm system whether the door is actually closed or open.',
    why_it_matters:
      'Without it, the system can’t alert you when a door is forced open or propped open — two of the most common security gaps in a building.',
    analogy: 'Like the sensor that turns on the light when you open the fridge.',
    qa: [
      {
        q: 'What is a "door held open" alarm?',
        a: 'If the switch reports the door stayed open longer than an allowed time after someone badged in, the system raises an alert — often with a local beeper — so staff can close it.',
      },
      {
        q: 'What does "door forced open" mean?',
        a: 'The switch saw the door open without a valid badge, button press or key release being registered. That usually means a break-in attempt or someone defeating the lock.',
      },
    ],
    related: ['access-control', 'request-to-exit-rex', 'electric-strike', 'maglock'],
    service: 'access-control',
  },
  {
    term: 'Drop',
    slug: 'drop',
    aka: ['Cable drop', 'Data drop', 'Run'],
    category: 'cabling',
    definition:
      'One network cable run from the telecom room to a single jack at a desk, ceiling or wall, where a computer, phone, camera or Wi-Fi access point plugs in.',
    why_it_matters:
      'Cabling projects are usually planned and quoted per drop, so counting drops accurately — including spares for future growth — shapes both the budget and the building’s flexibility.',
    analogy: 'Like a single water line from the main pipe to one faucet.',
    qa: [
      {
        q: 'How many drops does a desk need?',
        a: 'It varies by business. Many offices plan at least two per workstation — for example a computer and a phone — plus extras for printers, wall displays and future needs.',
      },
      {
        q: 'Do cameras and Wi-Fi need their own drops?',
        a: 'Yes. Each IP camera and access point normally gets its own cable, which often also powers it through PoE.',
      },
      {
        q: 'Is there a maximum length for a drop?',
        a: 'For standard copper Ethernet cabling, the fixed cable is limited to 90 meters (about 295 feet), with up to 100 meters total including patch cords.',
      },
    ],
    related: ['horizontal-cabling', 'telecom-room', 'keystone-jack', 'patch-panel', 'poe'],
    service: 'structured-cabling',
  },
  {
    term: 'Egress',
    slug: 'egress',
    aka: ['Free egress', 'Means of egress'],
    category: 'access',
    definition:
      'The path people use to leave a building. In access control, "free egress" means anyone inside can exit without a key, badge or special knowledge.',
    why_it_matters:
      'Building and fire codes generally require free egress on exit routes, so every locked door must be designed to let people out quickly in an emergency.',
    qa: [
      {
        q: 'Can I lock a door so people can’t leave without badging out?',
        a: 'Generally not on a required exit route. Codes allow only narrow exceptions (such as some healthcare or detention settings) with special approvals. Your local building official has the final say.',
      },
      {
        q: 'How do people get out through a locked door?',
        a: 'Through the door handle or a push bar that mechanically opens it, and on magnetically locked doors, a motion sensor or exit button that cuts power to the lock.',
      },
    ],
    related: ['request-to-exit-rex', 'fail-safe-fail-secure', 'maglock', 'electric-strike'],
    service: 'access-control',
  },
  {
    term: 'Electric strike',
    slug: 'electric-strike',
    category: 'access',
    definition:
      'An electrically controlled replacement for the metal plate in a door frame that the latch catches on. When the access system unlocks it, a hinged piece swings free so the door can be pulled open.',
    why_it_matters:
      'It lets a normal door with an existing lever handle work with badges or buttons, while the inside handle still lets people walk out freely.',
    analogy: 'Like the buzzer door at an apartment building — the latch stays put, but the frame lets go.',
    qa: [
      {
        q: 'What happens if the power goes out?',
        a: 'It depends on how it’s set up. A fail-secure strike stays locked from the outside without power; a fail-safe one unlocks. People can still exit from the inside either way.',
      },
      {
        q: 'Electric strike or maglock — which is better?',
        a: 'Strikes keep the door’s normal hardware and free mechanical exit, so they are common on office doors. Maglocks suit some glass or double doors. The door type, fire rating and code requirements usually decide.',
      },
      {
        q: 'Does the door need to be replaced?',
        a: 'Usually not. The frame is typically modified to fit the strike, and a power wire is run through it. Fire-rated doors require strikes that are listed for fire-rated use.',
      },
    ],
    related: ['maglock', 'fail-safe-fail-secure', 'access-control', 'card-reader', 'request-to-exit-rex'],
    service: 'access-control',
  },
  {
    term: 'Ethernet',
    slug: 'ethernet',
    aka: ['Wired network', 'IEEE 802.3'],
    category: 'networking',
    definition:
      'The standard way computers, phones, cameras and other devices connect to a network with a cable. It defines how data travels over copper or fiber, at speeds from about 10 megabits up to hundreds of gigabits per second.',
    why_it_matters:
      'Wired Ethernet is generally faster, steadier and more secure than Wi-Fi, which is why cameras, access points, phones and servers are usually cabled.',
    analogy: 'Like the rules of the road for wired networks — every brand of car follows the same ones.',
    qa: [
      {
        q: 'Is an Ethernet cable the same as a network cable?',
        a: 'In everyday speech, yes. Most people mean a Cat 5e, Cat 6 or Cat 6A cable with RJ45 plugs on each end.',
      },
      {
        q: 'Why use Ethernet if we have Wi-Fi?',
        a: 'Cables don’t suffer from interference or crowded airwaves. Even Wi-Fi itself depends on Ethernet — every access point needs a cable back to the network.',
      },
      {
        q: 'How fast is Ethernet in an office?',
        a: 'Most desktops connect at 1 Gbps. Wi-Fi access points and switch-to-switch links increasingly use 2.5, 5 or 10 Gbps, which need suitable cable such as Cat 6A.',
      },
    ],
    related: ['ieee-802-3-poe-standards', 'rj45', 'cat-6a', 'network-switch', 'lan', 'gbps'],
    service: 'networking',
  },
  {
    term: 'Fail-safe / fail-secure',
    slug: 'fail-safe-fail-secure',
    category: 'access',
    definition:
      'Two ways an electric lock can behave when it loses power. Fail-safe locks unlock; fail-secure locks stay locked from the outside. "Safe" refers to people being able to pass, "secure" to the door staying protected.',
    why_it_matters:
      'Choosing wrong can trap people, fail fire inspection, or leave a sensitive room wide open during an outage — so each door’s role should drive the choice.',
    analogy: 'Fail-safe is a door that swings open when the power drops; fail-secure is a safe that stays shut.',
    qa: [
      {
        q: 'What happens to the doors if the power goes out?',
        a: 'Fail-safe doors unlock and fail-secure doors stay locked from outside. People inside can still exit fail-secure doors with the handle. Battery backup can keep locks working normally during short outages.',
      },
      {
        q: 'Which doors are usually fail-safe?',
        a: 'Doors on exit paths and some stairwell doors, depending on local fire code. Maglocks are fail-safe by design because a magnet can’t hold without power.',
      },
      {
        q: 'Which doors are usually fail-secure?',
        a: 'Server rooms, storage, cash rooms and perimeter doors where security matters most, typically using fail-secure electric strikes or electrified locks that still allow free exit from inside.',
      },
    ],
    related: ['electric-strike', 'maglock', 'egress', 'ups', 'access-control'],
    service: 'access-control',
  },
  {
    term: 'Fiber optic cable',
    slug: 'fiber-optic-cable',
    aka: ['Fiber', 'Optical fiber'],
    category: 'cabling',
    definition:
      'Cable that carries data as pulses of light through hair-thin strands of glass. It goes much farther than copper network cable and isn’t affected by electrical interference.',
    why_it_matters:
      'Fiber is the usual choice for linking telecom rooms, floors and buildings, and installed fiber can often support faster speeds later by upgrading only the equipment at each end.',
    analogy: 'Like a garden hose for light — bending it gently is fine, but kinks and dirt at the ends block the flow.',
    qa: [
      {
        q: 'Will fiber replace the cables to our desks?',
        a: 'Rarely in offices. Copper cabling is cheaper to install and terminate, and it can deliver power to phones, cameras and access points. Fiber is mostly used between rooms, floors and buildings.',
      },
      {
        q: 'What’s the difference between singlemode and multimode?',
        a: 'Multimode is common for shorter runs inside a building. Singlemode has a thinner core and reaches much longer distances, such as between buildings or to an internet provider. Electronics for each type differ.',
      },
      {
        q: 'Is fiber fragile?',
        a: 'The glass is protected by jackets, but it must not be bent too sharply or crushed, and connector ends must be kept clean. Proper installation and testing matter more than with copper.',
      },
    ],
    related: [
      'multimode-fiber',
      'singlemode-fiber',
      'backbone-cabling',
      'fusion-splicing',
      'sfp',
      'insertion-loss',
    ],
    service: 'structured-cabling',
  },
  {
    term: 'Firewall',
    slug: 'firewall',
    category: 'networking',
    definition:
      'A device or software that sits between your network and the internet and decides, based on rules, which traffic is allowed in or out. Modern business firewalls can also inspect traffic for threats.',
    why_it_matters:
      'It is a core layer of cybersecurity protection, and it often controls secure remote access for staff and connections between office locations.',
    analogy: 'Like a security guard at the lobby desk checking who comes in and what leaves.',
    qa: [
      {
        q: 'Isn’t my internet provider’s router already a firewall?',
        a: 'Many provider routers include basic firewall features. Business firewalls add finer controls, threat inspection, VPN access, separate networks for guests or cameras, and logging. Which you need depends on your risk and requirements.',
      },
      {
        q: 'What is a "next-generation firewall"?',
        a: 'A firewall that looks beyond addresses and ports to recognize applications and users, and often includes intrusion prevention and malware filtering. Many of these features require an ongoing subscription.',
      },
      {
        q: 'Does a firewall need maintenance?',
        a: 'Yes. Firmware updates, security subscriptions and rule reviews keep it effective. An outdated firewall can become a weak point itself.',
      },
    ],
    related: ['router', 'vpn', 'vlan', 'wan', 'lan', 'isp'],
    service: 'networking',
  },
  {
    term: 'Frame rate',
    slug: 'frame-rate',
    stands_for: 'FPS — frames per second',
    aka: ['FPS'],
    category: 'security',
    definition:
      'How many still pictures a camera captures each second to make video. Higher frame rates show smoother motion; lower rates look choppier but use less storage.',
    why_it_matters:
      'Frame rate directly affects how much recording storage you need and whether fast events, like a hand at a register, are clearly captured.',
    analogy: 'Like a flip book — more pages per second makes the motion smoother.',
    qa: [
      {
        q: 'What frame rate do security cameras usually use?',
        a: 'Many systems record around 15 frames per second for general areas, which looks reasonably smooth. Cash registers, entrances or fast-moving scenes are sometimes set higher, such as 25–30.',
      },
      {
        q: 'Does a higher frame rate improve picture detail?',
        a: 'No. It makes motion smoother, but detail comes from resolution, lens choice and lighting. A sharp, well-placed camera at 15 fps often beats a poorly placed one at 30.',
      },
    ],
    related: ['ip-camera', 'nvr', 'h-264-h-265', 'bandwidth', 'vms'],
    service: 'video-surveillance',
  },
  {
    term: 'Fusion splicing',
    slug: 'fusion-splicing',
    aka: ['Splicing'],
    category: 'cabling',
    definition:
      'Permanently joining two fiber optic strands by precisely lining up their ends and melting them together with an electric arc, creating a joint with very little light loss.',
    why_it_matters:
      'It is a common way to attach factory-made connectors or repair a cut fiber, and good splices preserve the signal margin a long fiber link needs.',
    analogy: 'Like welding two pipes into one, rather than clamping them together.',
    qa: [
      {
        q: 'Why not just plug two fibers together?',
        a: 'Connectors work well and are used where links need to be rearranged, but each connection loses a bit more light than a good splice. Splices are used where the joint never needs to come apart.',
      },
      {
        q: 'Can a cut fiber be repaired?',
        a: 'Usually, yes. The damaged section is cut out and the ends are fusion spliced, sometimes with a short added piece, then the link is retested.',
      },
    ],
    related: ['fiber-optic-cable', 'termination', 'insertion-loss', 'cable-certification'],
    service: 'structured-cabling',
  },
  {
    term: 'Gbps',
    slug: 'gbps',
    stands_for: 'Gigabits per second',
    aka: ['Gb/s', 'Gig'],
    category: 'networking',
    definition:
      'A measure of network speed: one billion bits of data per second. 1 Gbps equals 1,000 Mbps (megabits per second).',
    why_it_matters:
      'Comparing internet plans, switches and cable categories in Gbps helps you avoid paying for speed one weak link can’t deliver.',
    analogy: 'Like the number of lanes on a highway — more lanes move more cars at once.',
    qa: [
      {
        q: 'Why does a 1 Gbps download not show 1 GB per second?',
        a: 'Speeds are measured in bits, but file sizes in bytes, and one byte is 8 bits. So 1 Gbps tops out around 125 megabytes per second, a bit less after network overhead.',
      },
      {
        q: 'Do I need multi-gigabit cabling?',
        a: 'Newer Wi-Fi access points and some switch links use 2.5, 5 or 10 Gbps. Cat 6A supports 10 Gbps up to the standard 100-meter channel, which is why it’s common in new installations.',
      },
    ],
    related: ['bandwidth', 'ethernet', '10gbase-t', 'cat-6a', 'latency'],
    service: 'networking',
  },
  {
    term: 'Grounding and bonding',
    slug: 'grounding-and-bonding',
    aka: ['Telecom grounding', 'TIA-607'],
    category: 'power',
    definition:
      'Connecting racks, cable trays, shielded cables and equipment with copper conductors to the building’s electrical ground, so they share the same electrical level and stray currents have a safe path.',
    why_it_matters:
      'Proper grounding protects people and equipment from shocks and surges, reduces electrical noise on network gear, and is required by electrical code and telecom standards.',
    analogy: 'Like a lightning rod for your equipment room — it gives stray electricity a safe route to the earth.',
    qa: [
      {
        q: 'Isn’t the electrical outlet ground enough?',
        a: 'Not for telecom rooms. Standards such as ANSI/TIA-607 call for a dedicated grounding busbar in each telecom room, bonded back to the building’s electrical ground, with racks and trays connected to it.',
      },
      {
        q: 'Who is responsible for grounding?',
        a: 'Usually shared: an electrician provides the building ground connection, and the cabling installer bonds racks, trays and shielded cable to the telecom grounding system. Coordinating this early avoids gaps.',
      },
    ],
    related: ['telecom-room', 'rack', 'cable-tray', 'nec', 'utp-stp', 'ansi-tia-568'],
    service: 'structured-cabling',
  },
  {
    term: 'H.264 / H.265',
    slug: 'h-264-h-265',
    aka: ['AVC / HEVC', 'Video compression', 'Codec'],
    category: 'security',
    definition:
      'Standard ways of shrinking (compressing) video so it takes less space to store and less network capacity to send. H.265 is the newer one and typically produces files about half the size for similar quality.',
    why_it_matters:
      'Compression choice largely determines how many days of camera footage your recorder can keep and how much network bandwidth cameras consume.',
    analogy: 'Like vacuum-packing clothes for a suitcase — the same contents, packed into less space.',
    qa: [
      {
        q: 'Should every camera use H.265?',
        a: 'Often it’s a good default, but the camera, recorder and viewing software must all support it. Older equipment or some phone apps may only handle H.264, which remains very widely compatible.',
      },
      {
        q: 'Does compression lower video quality?',
        a: 'Some detail is always discarded, but at sensible settings it’s hard to notice. Setting the compression too aggressively to save storage can blur faces and license plates.',
      },
      {
        q: 'What do the other names mean?',
        a: 'H.264 is also called AVC (Advanced Video Coding) and H.265 is HEVC (High Efficiency Video Coding). Many cameras add brand-named "smart" modes built on top of these.',
      },
    ],
    related: ['ip-camera', 'nvr', 'vms', 'bandwidth', 'frame-rate'],
    service: 'video-surveillance',
  },
  {
    term: 'HDBaseT',
    slug: 'hdbaset',
    category: 'av',
    definition:
      'A technology that sends high-definition video and audio — plus control signals, network and often power — over a single Cat 6-type network cable for up to 100 meters, using a transmitter and receiver at each end.',
    why_it_matters:
      'It lets a display or projector sit far from the video source without bulky, unreliable long HDMI cables, using the same cabling installers already pull.',
    analogy: 'Like a long-distance extension cord for HDMI.',
    qa: [
      {
        q: 'Is HDBaseT the same as plugging into the office network?',
        a: 'No. It uses network-style cable, but runs point to point between its own transmitter and receiver. It should not be plugged into a network switch. Sending video over the actual network is called AV-over-IP.',
      },
      {
        q: 'What cable is best for HDBaseT?',
        a: 'Manufacturers commonly recommend solid-copper Cat 6A, especially for 4K video and longer runs. Cheaper cable or extra connections in the path can cause flickering or dropouts.',
      },
    ],
    related: ['hdmi', 'cat-6a', 'digital-signage', 'poe'],
    service: 'audio-video',
  },
  {
    term: 'HDMI',
    slug: 'hdmi',
    stands_for: 'High-Definition Multimedia Interface',
    category: 'av',
    definition:
      'The common plug and cable that carries digital video and audio from a laptop, media player or cable box to a TV, projector or display.',
    why_it_matters:
      'Conference rooms and displays depend on it, but long HDMI runs are unreliable, so planning where sources and screens sit matters.',
    qa: [
      {
        q: 'How long can an HDMI cable be?',
        a: 'Standard passive cables are dependable only over fairly short distances — roughly 15 meters, less at 4K. Longer runs typically use active or fiber HDMI cables, HDBaseT extenders, or AV-over-IP.',
      },
      {
        q: 'Why does the screen sometimes go black or say "HDCP error"?',
        a: 'HDCP is copy protection built into HDMI. If any device, adapter or extender in the chain doesn’t properly support it, protected content may refuse to display.',
      },
      {
        q: 'Do expensive HDMI cables look better?',
        a: 'For a working digital signal, no — it either arrives intact or shows obvious dropouts. What matters is buying a cable certified for the speed you need, such as for 4K.',
      },
    ],
    related: ['hdbaset', 'digital-signage'],
    service: 'audio-video',
  },
  {
    term: 'Headend',
    slug: 'headend',
    aka: ['Head-end', 'Head end'],
    category: 'general',
    definition:
      'The central location where a system’s main equipment lives — for example camera recorders, door controllers, audio amplifiers or video distribution gear — usually in a rack in a telecom or equipment room.',
    why_it_matters:
      'Headend equipment needs space, power, cooling and battery backup, so planning it early prevents overheated closets and crowded racks later.',
    analogy: 'Like the engine room of a ship — the controls are everywhere, but the machinery is in one place.',
    qa: [
      {
        q: 'Is the headend the same as the telecom room?',
        a: 'Often the headend equipment sits in the telecom room, but the term refers to the equipment itself. A building might have security, AV and network headends in the same or different rooms.',
      },
      {
        q: 'What should a headend location have?',
        a: 'Secure access, enough rack space, dedicated power, backup power for critical systems, adequate cooling, and a clear cable path to the devices it serves.',
      },
    ],
    related: ['telecom-room', 'rack', 'mdf', 'ups', 'nvr'],
  },
  {
    term: 'Horizontal cabling',
    slug: 'horizontal-cabling',
    category: 'cabling',
    definition:
      'The cables that run from a floor’s telecom room out to each outlet where devices plug in — desks, ceilings, cameras and access points. Each cable runs on its own, without splices, from the room to its jack.',
    why_it_matters:
      'Horizontal cabling is usually the largest share of a cabling project and the hardest to replace later, so choosing the right category up front protects your investment.',
    analogy: 'Like the branches of a tree, each spreading from the trunk (the telecom room) to a single leaf (the outlet).',
    qa: [
      {
        q: 'How long can a horizontal cable be?',
        a: 'Under ANSI/TIA-568, the installed cable is limited to 90 meters (about 295 feet), with up to 100 meters total including patch cords at each end.',
      },
      {
        q: 'Why is it called "horizontal" if it goes up into the ceiling?',
        a: 'Because it generally serves a single floor, spreading out across it. Cabling that connects floors or buildings is called backbone cabling.',
      },
      {
        q: 'What cable is usually used?',
        a: 'Copper twisted-pair cable such as Cat 6 or Cat 6A is typical for new work, because it carries data and can power devices through PoE.',
      },
    ],
    related: [
      'backbone-cabling',
      'telecom-room',
      'drop',
      'permanent-link',
      'channel',
      'cat-6a',
      'ansi-tia-568',
    ],
    service: 'structured-cabling',
  },
];
