# D4 icons audit (Lucide)

Before: 24 files import @lucide/astro, 61 icon uses (rendered glyph sites). Proposed after: 19 files, 31 uses (all actions/affordances). 30 decorative uses removed, 5 files drop the import entirely.

## REMOVE (decorative)
| file:line | icon | edit |
|---|---|---|
| src/components/home/ContactSection.astro:5,34,39,44 | Clock, LifeBuoy, MapPin | delete import line 5; delete the 3 `<Clock/LifeBuoy/MapPin class="contact__icon" .../>` lines; drop `.contact__icon` CSS and grid column for it (the mono key label already names each row) |
| src/pages/contact.astro:6,43,48,53 | Clock, LifeBuoy, MapPin | same as above |
| src/components/home/Industries.astro:2-12,16-25,44 | HeartPulse, GraduationCap, BuildingComplex, Store, Hotel, Building, Landmark, Warehouse | import becomes `import { ArrowUpRight } from '@lucide/astro';`; delete `icons` map (l.16-25) and `const Icon = icons[ind.icon];` (l.39); delete `<span class="industry__icon"><Icon .../></span>` (l.44); drop `.industry__icon` CSS (l.97,107) |
| src/pages/industries.astro:7-17,24-33,50,81-84 | same 8 sector icons | import becomes `import { ArrowRight } from '@lucide/astro';`; delete `icons` map; remove `Icon: icons[ind.icon]` (l.50); `rows.map(({ Icon, ...r })` -> `rows.map((r)`; delete `<span class="sector__icon">...</span>` (l.84); drop `.sector__icon` CSS (l.180,189). Optional: remove `icon` field from Industry type/data in content.ts |
| src/components/process/InstallDemo.astro:9,52-54,144-146 | Package, Moon, Zap | delete import l.9; remove `icon: ...` from 3 step objects; destructure `({ title, detail })`; delete `<span class="in__icon">` (l.146) and `.in__icon` CSS (l.402,413,470) |
| src/components/ui/NextStep.astro:10,25,31,37,51 | MessageSquare, ClipboardList, Phone (card icons) | import becomes `import { ArrowRight } from '@lucide/astro';`; remove 3 `icon:` fields; destructure `({ href, title, detail })`; delete `<Icon class="next__icon" .../>` (l.51) and `.next__icon` CSS (l.91,130) |
| src/pages/404.astro:3,37 | Unplug | delete import; delete `<span class="trace__badge" aria-hidden><Unplug/></span>` (or keep badge text-only) |
| src/pages/about.astro:7,199 | UserRound | delete import; placeholder avatar: replace `<UserRound .../>` with nothing (the "Placeholder" Label + K-04.n code is enough). Removed when real photos arrive anyway |

## KEEP (actions/affordances)
TermDetail:6 ArrowRight (link); BuildingExplorer:7,64 ArrowRight (link); FeaturedProjects:3,57 ArrowUpRight (link); Hero:3,63 ArrowRight (link); Industries:49 ArrowUpRight (link); SectionNext:22 ArrowDown (scroll cue); Header:2 ChevronDown (dropdown), Menu/X (toggle), Phone (call button); DemoFrame:31 RotateCcw (replay); ProjectCard:7,53 ArrowUpRight; FaqList:25 Plus (accordion toggle); OtherServices:26 ArrowUpRight; Button:2,33,35 Phone/ArrowRight; CableTest:13 Play, RotateCcw, ArrowDown, ArrowRight (controls/links); NextStep:56 ArrowRight; ServiceTile:39 ArrowUpRight; glossary.astro:8 Search (input), ChevronRight (disclosure), X (close); industries.astro:101 ArrowRight; plan.astro:99 Printer (print button); services/index.astro:82 ArrowRight (row link).
