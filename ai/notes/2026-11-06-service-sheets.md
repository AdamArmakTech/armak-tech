# Service product sheets (2026-11-06)

Side session started by the main session for the owner's instructions of 2026-11-06 (from his phone): product pictures
of the gear Armak installs, "vectorized how ui.com has it", generic devices with no brand or logo, "PUT THE PICTURES IN
THERE"; the stock-photo band under the service hero "looks boring now the new way you made it and its random as fuck";
the old stacked rows with a small red uppercase label are what he likes ("I LIKE THIS OLD way more than the new way"),
so red eyebrow labels are an owner decision; nothing scrolls sideways on phones; layouts intentional, no floating or
overlapping cards, no dead space.

## What changed (branch `intent-redesign`; committed by the main session as bbac2d4 on 2026-11-06, NOT pushed)
- `src/components/services/ProductBand.astro` (new): the "What we install" sheet under every service hero.
- `src/pages/services/[slug].astro`: renders ProductBand instead of PhotoBand; the photo lookup is gone.
- `src/data/services-detail.ts`: `ProductFile` (the 24 drawing names, so a typo fails `astro check`), `ServiceProduct`
  (file + caption) and a required `products` list of four on every `ServiceDetail` entry.
- Used as-is, not mine: the 24 drawings in `src/assets/products/` (three artist sessions; viewBox 240 x 180, each with
  `role="img"` and a `<title>`, no ids, no style blocks, no classes, only the site's own colours).
- `src/components/services/PhotoBand.astro` is no longer used by any page. It stays on disk until the owner approves
  deleting it (owner rule: show the path, get a yes). `servicePhotos`, `ServicePhoto` and the six photo imports at the
  top of `services-detail.ts` stay only so PhotoBand still compiles; they go with it. The photos themselves stay in
  `src/assets/photos/` (the homepage hero uses them).

## What each page shows
| Page | The four drawings | Test card |
| --- | --- | --- |
| Structured cabling | Patch panel, Bulk cable, Keystone jack, Patch cord | yes (compact live cable test) |
| Networking | Network switch, Access point, Firewall, Equipment rack | no |
| Video surveillance | Dome camera, Bullet camera, PTZ camera, Video recorder | no |
| Access control | Card reader, Door controller, Video intercom, Magnetic lock | no |
| Voice and unified comms | Desk phone, Conference phone, Headset, Video bar | no |
| Audio and video | Touch panel, Ceiling speaker, Wall display, AV encoder | no |

Captions are the device type only, never a brand or model. "Bulk cable" rather than "Cable box" (the drawing is a box
of network cable; "cable box" reads like a TV box).

## Design choices and the DESIGN.md rule each serves
- **The sheet.** A white (`--white`) band across the whole page width, square-edged, with `--space-block` above and
  below its content and no margins of its own (the hero's bottom padding and the next section's top padding are
  the other gaps). Rule 2: equipment shown product-style on a clean background, the way ui.com shows gear, never a
  staged stock scene; the 2026-11-05 round-1 note: surfaces are tone steps, no 1px borders, no resting shadows.
  It was first built as a rounded white box inside the container (same radius and padding as the hero's scope
  sheet); the anti-slop pass below changed it to the band, because on a phone the scope sheet, the product box and
  the test card made three identical white rounded boxes in a row, which reads as a kit.
- **The red label.** "What we install" in `--signal`, uppercase, `--fs-label` (14px), `--tracking-label`, weight 600:
  the owner's 2026-11-06 decision (the old rows' red eyebrow labels), which overrides rule 7 for labels. It is an `h2`,
  so the sheet is a named landmark and shows up when someone navigates by headings. No hairline under it (rule 5:
  lines only separate rows).
- **Drawings inline.** The SVG files are read as text (`import.meta.glob` with `?raw`) and placed with `set:html`, so
  they stay crisp at any size and keep their own `role="img"` and `<title>`. The component prefixes any ids per drawing
  (none of the 24 use ids today, but a future one with a gradient or clip would otherwise collide across four inline
  drawings) and strips any XML prolog or comment. A drawing that is missing gives a build warning and a gap, not a
  broken site. All 24 share one 240 x 180 frame, so the four line up; the soft shadow is inside each drawing.
- **Captions.** Body face, sentence case, 16px, `--text`, weight 500, centred under the drawing (rule 4: mono only for
  readouts; rule 9: text sized and coloured to be read). Measured: one line each at 390px.
- **Grid.** Two by two under 640px, four in a row from 640px (the site's breakpoints, no new ones). Each drawing is
  capped at 260px wide so the four are the same size on every page. Even spacing from the `--sp` scale. Beside the
  test card (structured cabling from 1024px) the four go two by two at 200px: each drawing then takes the same
  4-column module as the card, and the sheet's natural height matches the card's instead of leaving two bands of
  white above and below a row of small drawings (measured: both 502px tall at 1024 and at 1440).
- **The test card (structured cabling only).** Kept because the cable test is the site's promise (rule 1) and the
  cabling page is where it belongs. On the white band it is a paper (`--paper`) panel, one tone step down, so it
  reads as a sheet laid on the band rather than white on white; its wrapper carries `data-ui` because it is a real
  instrument report (its own table lines and readouts are the tester's, rule 4). It never overlaps anything: on
  phones it sits below the drawings, full width; from
  640 to 1023px it sits below the sheet in two columns (wire map left, PASS result top right, "Every cable gets
  tested" and the link bottom right) so the wire map keeps its drawn size instead of stretching across a tablet; from
  1024px the sheet takes columns 1 to 8 and the card columns 9 to 12, tops aligned and the same height (the few pixels
  left over centre the drawings). 1024 rather than the brief's "1000" because 1024 is the hero's own grid breakpoint
  and DESIGN.md allows no others.
- **Motion** (rule 10, no new motion types). The sheet uses the site-wide `data-reveal` rise. The four drawings also
  carry `data-reveal` with `--reveal-delay` 120, 200, 280 and 360 ms, but they only fade (`transform: none`), so nothing
  moves twice: the sheet lands, then the drawings print onto it one after another. Under reduced motion and without
  scripts everything shows at once (the site-wide rules handle it).

## Checks
Dev server: the main session's `astro dev` on port 4321 (Astro refuses a second dev server in the same folder, and
the Playwright browser was held by another session), so the pages were shot with Edge headless driven through the
DevTools protocol with true phone emulation (script `shoot.mjs` in this session's scratchpad).
- All six pages at 390px (mobile emulation) and 1440px, plus structured cabling at 768 and 1024: page width equals
  the viewport everywhere (nothing scrolls sideways), no element past the right edge, four drawings per page, every
  caption on one line, every reveal finished, console clean (no errors, no warnings). The sheet and the card are the
  same height at 1024 and 1440 (502px). The dev server reloads every open page whenever any session saves a file in
  this folder, so the script waits out reloads and only captures a settled page.
- `npx astro check`: 0 errors, 0 warnings, 0 hints (90 files).
- `npm run build` NOT run here: other sessions were mid-edit in the same folder (ContactForm, InstallDemo, tokens.css,
  the homepage explorer and process files). The main session should run it before anything publishes.
- PDF for the owner: `ai/exports/service-sheets-2026-11-06.pdf` (gitignored), 12 pages: the six pages at phone width
  (390px, retina), then the six at 1440px; remade after the anti-slop pass (the band version) and sent again. Astro's dev-only toolbar (the dark pill at the foot of every dev-server
  page) is hidden in those screenshots; it is not part of the site.

## Anti-slop pass (main session's request, same morning)
The `taste-skill` inspector (`scripts/inspect.mjs`, real browser at 1440, 768 and 390) ran on all six service pages
before and after, reports in `.taste-skill/sheets-before/` and `.taste-skill/sheets-after/` (gitignored).
- Before: 19 FAIL / 31 WARN over the six pages (cabling 4/5, networking 3/5, video 2/5, access 4/5, voice 3/5,
  AV 3/6). After: 13 FAIL / 25 WARN (3/4, 2/4, 2/4, 2/4, 1/4, 3/5).
- Honest reading of the drop: it is exactly the two rules the owner decided and the after-run allows by name
  (`--allow micro-label,few-pictures`): the red uppercase "What we install" label (owner 2026-11-06: eyebrow labels are
  the pattern; one per page) and "0 pictures" (the owner replaced the stock photos with generic drawings, which the
  inspector does not count as pictures; real Armak photos are still wanted). Nothing else the meter measures changed.
- Every remaining FAIL is outside this session's files: the four FAQ `details` hairlines on every page (rule 5 allows
  lines between real list rows), FAQ questions that wrap to three lines at 390px (22px h3), an eyebrow "optics" the
  meter sees above "Talk to us about your project." (ServiceCta), and "What we handle." / "Common questions." partly
  covered at some scroll position on a phone (the sticky header or button dock, page chrome). Remaining WARNs: the
  cream page background (brand token), no footage, the dev server, a 160-character paragraph on AV, and margins
  measured 80px left against 100-125px right (page-level, the same with or without the sheet).
- What changed in my files for the pass (not measured by the meter, judged from the screenshots with the skill's
  critique passes): the product sheet is a full-width white band instead of a third rounded white box under the
  hero's scope sheet; the test card is a paper panel on it, marked `data-ui`. No decorative icons, no boxed cards,
  no hairlines, no placeholder captions were there to remove. After this change: nothing sideways at 390, 768, 1024
  or 1440; console clean; `astro check` 0 errors; the band is 273px tall on the five pages at 1440 and 485px beside
  the card on cabling (the card the same).

## Left out, and open
- The drawings' quality is the artists'. The long, flat ones (patch panel, network switch, video recorder, AV encoder)
  read smaller than the upright ones inside the shared frame. Making them read bigger is a drawing change, not a
  layout change.
- PhotoBand.astro deletion needs the owner's yes (path above).
- Committed by the main session as bbac2d4 (2026-11-06). The drawing helper later moved to `src/lib/drawings.ts`,
  shared with the About page (0d00702).
