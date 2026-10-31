# ART_DIRECTION.md: three ways armak.tech can look like Armak and nobody else

Written 2026-10-31 by the art director (Step 1 of the approved plan). No site files were changed.
The owner picks one direction (or mixes two) from pictures in Step 2. Then `ai/DESIGN.md` is rewritten from it.

## Words used here (glossary)
- **Field colour**: the colour that covers most of the page, like the paint on a wall.
- **Tone steps**: three or four shades of the field colour, used instead of lines and shadows to separate things.
- **Grain**: a very fine noise texture over a flat colour so it looks like a real surface, not a screen fill.
- **Pinned scene**: a part of the page that stays still on screen while you scroll, and the scroll moves the drawing inside it.
- **Tell**: a design habit that makes a page look AI-made (the lists we checked are at the end).
- **Dealt sheet**: a design brief the taste-skill tool picks from its library of 247 real award sites.

## What every direction keeps (owner decisions, not up for change)
- Headline "Built for the future." Logo red (#fe2322, logo only) and logo blue (#1d3f8f). Action red #d0101a on the one button per screen.
- Hero: a large photo with the cable test card on it, the three choice boxes "I need a quote" / "I'm planning a project" / "Something's broken", red button "Request a site assessment".
- Dark footer with a wire stripe. Smooth scroll, heading reveals, counting numbers (946+ projects).
- Every feature since Oct 30 (cable test, cutaway + "10 years" switch, five process demos, trace, job timeline, "Put in on day one" sheet, cable-plant chart, city search, glossary).
- Facts only from the owner. Rules 2, 3, 7 of DESIGN.md stay: product-style photos, codes only on real things (A-01..A-06, steps, cable IDs), red means the next action or FAIL.

## What every direction drops (this is why past rounds read as AI)
Geist and Geist Mono. Off-white + near-black + one red. Mono uppercase labels above headings ("PICK THE CLOSEST FIT", "B-01 PLATFORMS WE INSTALL"). Middle-dot strings ("LICENSED · BONDED · INSURED"). Red square separators. A hairline on top of every section. An arrow on every card. A stats strip. The same fade-up on every block. The logo wall in a 1px grid.

## Where the ideas come from (Armak's own world, not a template)
Cable jacket colours have fixed meanings in a building: blue Cat 6A for data, aqua for OM4 multimode fiber, yellow for OS2 singlemode fiber. Fiber carries light. A closet is a rack, patch panels and a bundle fanning out. TIA-606 labels name each end. As-built drawings show where every run went. Ceilings hide the grid and the pull strings. The brand angle: Armak builds the permanent layer (cable, 15 to 20 years) so the changeable layer (devices, 3 to 5 years) can keep changing.
All three directions are built from that. The colours below are meanings, not decoration: aqua always means fiber, yellow always means the backbone and the "10 years" layer, red always means "do this".

## What the reference sites taught (looked at in Edge, 1440 wide, 2026-10-31)
- **ui.com**: products are the pictures. Clean cut-outs at real scale, a rack photo bleeding off the left edge, a live topology drawing as the hero. Take: equipment as objects, a diagram as the hero's second half.
- **oxide.computer**: one dark tinted field (not black), one huge lit product photo, a thin diagram line joining a panel to the product. Take: the photo is the light source in a dark page. Leave: mono labels everywhere, cyan-green on dark.
- **meter.com**: a cool pale field (blue-grey, not cream), white isometric hardware floating at the same angle. Take: an isometric world for the cutaway; cool pale is fine.
- **basepowercompany.com/core**: real place photography at full screen, then the product revealed in square photo tiles that build up as you scroll. Take: the reveal by tiles; real light in photos.
- **anduril.com**: full-bleed footage inside a frame with a thin margin, very large condensed capitals. Take: condensed headline type at poster size. Leave: the defense mood.
- **teenage.engineering**: one object lit in a dark room, the menu drawn as small line icons. Take: one object, very large, lit.
Copied proportions and ideas only, never a look.

---

## Direction A: "The lit closet"
**Idea:** the page is a wiring closet with the lights off and the fiber lit. A deep field in the logo's own blue, and the only bright things are the photo, the test card and the light running through the cable routes.
**Dealt sheet:** `hero-object` (seed 1607128491) for the hero and sections; signature motion from `product-performs` (seed 4360126, "Pinned story").

**Palette**
| Hex | Role |
| --- | --- |
| #0e1f47 | Field, deepest step: footer and the pinned scene's background |
| #142a5e | Field, main: most of the page. Grain on top (SVG noise, 5% opacity) |
| #1d3f8f | Logo blue: raised panels, the choice boxes' ground, the cutaway's floor slabs |
| #2b53ad | Highest blue step: hover and the active tab |
| #f3f5f8 | Paper: headlines and body text on blue (14:1 on #142a5e), the test card's surface |
| #b9c5de | Secondary text on blue, metadata only (about 8:1) |
| #2cc5c9 | OM4 aqua: fiber routes in diagrams, and nothing else |
| #f5c518 | OS2 yellow: the backbone route, and the ten practices in the "10 years" moment |
| #d0101a | Action red: the one button per screen, FAIL |
| #1f8a4c | PASS green, only on the white test card |
| #fe2322 | Logo red, inside the logo only |
Depth comes from the four blue steps plus grain, never a glow or a gradient. The photo provides the light.

**Type**
- Headlines: **Archivo** variable, width 62 to 75 (condensed, like signage on a rack), weight 800, tracking -0.02em. https://fonts.google.com/specimen/Archivo (free, SIL Open Font License). Hero headline about 9vw on desktop.
- Body: **Hanken Grotesk** 400 and 600, 18px, line height 1.55. https://fonts.google.com/specimen/Hanken+Grotesk (OFL).
- **Martian Mono** only for real cable IDs and test readouts on the test card and diagrams (IDF2-A-024, 92.4 m, PASS). https://fonts.google.com/specimen/Martian+Mono (OFL).
- Sizes: 18 body, 24 lead, 56 section heads, 160 hero. Each step about 3x the one below it for the big ones; weights 300 vs 800.

**Hero.** The photo fills the whole first screen edge to edge (rack, blue Cat 6A bundles, a technician's hands at the patch panel), darkened at the left with a flat blue panel, not a gradient. "Built for the future." in two lines at 9vw, paper colour, flush left at mid-height. One sentence under it at 20px. The white test card sits on the photo's right half, overlapping the rack, with its wire map and PASS. Along the bottom edge, the three choice boxes as one row of solid #1d3f8f tiles (no outlines), each with its title at 24px and one plain line; the first tile holds the red "Request a site assessment" button. Phone: the photo crops to the technician's hands, headline at 13vw, test card shrinks to a strip under the photo, the three boxes stack full width.

**Signature scroll scene: "Lights on in the closet".** Pinned for three screens.
1. 0 to 20%: the dark scene shows only the rack in the closet, drawn in paper-colour lines at 1.5px. The patch panel's ports light one by one.
2. 20 to 55%: routes draw out from the closet floor by floor to every room (stroke drawing). Copper runs draw in paper white. The fiber backbone draws in aqua and a short bright segment of light travels along it once, closet to closet. Room names set in Hanken 15px arrive as each route reaches them.
3. 55 to 70%: a TIA-606 label appears at both ends of three runs (Martian Mono, real format).
4. 70 to 100%: the line "10 years from now." replaces the heading. The device layer (access points, cameras, displays, desks) dissolves and redraws as new shapes. The cable layer stays at full brightness, untouched. The ten confirmed practices light up in yellow where they physically are: spare strands in the backbone, empty conduit with pull string, rack headroom, two drops per access point, the consolidation point, ceiling-grid jacks, and so on. The Today / 10 years switch appears for anyone who wants to flip back.
Reduced motion: the finished drawing with the switch, no travel.

**How sections differ.** Hero = full photo. Signature = pinned dark drawing. Services = six large photos of equipment, two per row at different sizes, name under each in Archivo 40px. Process = the five demos one after another, each a full-width white sheet sitting on blue. Proof = 946+ set in Archivo at 30vw, counting up, cropped by the right edge, one sentence next to it. Brands = names set as text in a running line (no logo grid). No section starts with a small label; each starts with its own heading.

**Motion rules.** One signature (the closet). Elsewhere: the test card runs its wire map once, the demos animate when you press them, headings reveal line by line, numbers count. No fade on every block. Reduced motion shows final states.

**Footer.** The deepest blue #0e1f47. "Armak" in Archivo condensed spanning the full width. The wire stripe is a 12px bundle of the jacket colours used on the page (blue #2f6fe0, aqua #2cc5c9, yellow #f5c518, white #f3f5f8, red #d0101a) running edge to edge above it, like cables leaving a closet.

**Do / don't**
- Do keep aqua for fiber only. Don't let it become a glowing accent on dark (cyan-on-dark is a tell).
- Do separate surfaces by blue steps. Don't add shadows, outlines or gradient halos.
- Do put the red button on a solid blue tile or the white card. Don't put red text on blue.
- Don't let the page turn into "near-black plus one bright colour": the field is the logo's blue, and at least two light sections (the demo sheets) break it up.

---

## Direction B: "The specimen wall"
**Idea:** like ui.com, the equipment is the picture. Every part Armak installs (patch panel, access point, camera, fiber enclosure, jack, display) is photographed as an object and placed on a tile the colour of its own cable jacket. The page is a parts catalogue of a well-built building.
**Dealt sheet:** `specimen-catalogue` (seed 1646436783). Redraw the hero slot (`--redraw hero`): the dealt hero has no headline, and ours is fixed.

**Palette**
| Hex | Role |
| --- | --- |
| #dfe3e2 | Field: cool ceiling-tile grey, most of the page. Fine grain like acoustic tile |
| #eceeed | Raised step: the choice boxes, the test card's surround |
| #c9cfcd | Lower step: the cutaway floor, inactive tabs |
| #10151c | Ink: headlines and body (15:1 on the field) |
| #4a535c | Secondary text, metadata only (6.3:1) |
| #2f6fe0 | Cat 6A blue: tiles for network parts, copper routes in diagrams |
| #47c2c4 | OM4 aqua: tiles for fiber parts, fiber routes |
| #f2c200 | OS2 yellow: tiles for backbone parts, the "10 years" layer |
| #1d3f8f | Logo blue: the cutaway's building outline and one full-blue section (the closing band) |
| #d0101a | Action red: one button per screen, FAIL |
| #1f8a4c | PASS green, test card only |
Proportion: 70% ceiling grey, 20% jacket tiles, 10% ink and blue. Not cream, not white: a cool grey with real texture.

**Type**
- One family: **Schibsted Grotesk**, 800 for headlines (tracking -0.03em), 400 for body at 18px. https://fonts.google.com/specimen/Schibsted+Grotesk (OFL). It has the sturdy newspaper-grotesk shapes, closer to equipment lettering than Geist.
- **Martian Mono** only for part numbers and cable IDs printed on tiles and the test card.
- Sizes: 18, 24, 64, 144 (hero), plus the 13px part number.

**Hero.** Left half: "Built for the future." at 8vw in two lines, ink, then one sentence, then the three choice boxes stacked as wide raised tiles (#eceeed) with the red button in the first. Right half: the photo in a tall frame running off the top and right edges, a patch panel with blue and aqua cables in sharp light, and the white test card overlapping the photo's lower left corner, crossing onto the grey. Below the fold line, the first row of the specimen wall already peeks in. Phone: photo first at full width with the test card overlapping its bottom, then the headline, then the three boxes.

**Signature scroll scene: "The building, built from its parts".** Pinned for three screens.
1. The specimen tiles from the wall above fly into place inside a white isometric cutaway of a two-floor building (the meter.com angle): the rack lands in the closet, jacks land in walls, access points land on the ceiling grid.
2. Cables draw between them in their true jacket colours: blue copper to each room, aqua fiber up the riser, yellow singlemode to the next building. Labels appear at both ends.
3. "10 years from now.": the device tiles flip like cards and show the next generation (a new access point, a new display). Desks slide to new spots. The cables do not move. The ten practices appear as yellow tags pinned to the exact place (spare strands, empty conduit, headroom in the rack).
Reduced motion: the finished building with the switch.

**How sections differ.** Hero = split. Signature = isometric model. Services = the specimen wall itself: six parts on six jacket-colour tiles in a brick-offset grid, pointing at one shows that service's photo and one sentence in a fixed frame (the dealt "index with preview"). Process = the five demos as one horizontal strip you drag. Proof = one full-blue band (#1d3f8f) with 946+ in white at 24vw. FAQ = tabbed index cards on grey.

**Motion rules.** Signature is the parts landing. Tiles do not lift on hover (the sheet forbids it); the preview frame swaps in 240ms. Demos run on press. No other scroll effects.

**Footer.** Ink #10151c. The wire stripe is the jacket colours stacked as six 4px cables bending down from the closing blue band into the footer, ending at a drawn patch panel where the footer links sit as ports. "Armak Technologies" in Schibsted 800 at full width.

**Do / don't**
- Do photograph or cut out real parts only (manufacturer partner images, Step 4). Don't use stock scenes on tiles.
- Don't add rounded 16px cards or shadows under the objects. Tiles are square-cornered flat fills.
- Don't let the wall become "a grid of identical cards": tiles differ by colour meaning and the object inside.
- Risk: until real product photos arrive, this direction is weakest, because its pictures are the point.

---

## Direction C: "Jacket colours"
**Idea:** each section is a different cable. You scroll through the building's systems as full-screen fields in the real jacket colours, and each colour means that system: blue for the network, aqua for fiber, yellow for the backbone and the future, white for the plenum ceiling, ink for the closet at the end.
**Dealt sheet:** `colour-chapters` (seed 1290823646). Keep its hero composition only for the area under the photo; the photo + test card stay.

**Palette (each chapter is one field)**
| Hex | Role |
| --- | --- |
| #1d3f8f | Chapter 1, the opener: logo blue. Hero and services. Paper text |
| #f4f6f7 | Chapter 2, the quiet one: plenum white. Process demos. Ink text |
| #f2c200 | Chapter 3, the surprise: OS2 yellow. The signature scene and the "10 years" moment. Ink text (12:1) |
| #47c2c4 | Chapter 4: OM4 aqua. Proof and the cable-plant chart. Ink text |
| #0d1420 | Chapter 5, the closer: closet ink. Next step and footer. Paper text |
| #10151c / #f4f6f7 | Ink and paper text, chosen per chapter, never grey on a colour field |
| #d0101a | Action red: one button per screen (it sits on a white tile when the field is yellow or aqua) |
| #1f8a4c | PASS green, test card only |
Each field has three tone steps of its own (for tiles and tabs) and a fine grain. No field ever blends into the next; they butt edge to edge.

**Type**
- Headlines: **Sofia Sans Extra Condensed** 900, uppercase only for the two-word chapter titles, sentence case elsewhere. https://fonts.google.com/specimen/Sofia+Sans+Extra+Condensed (OFL). Section heads at 12vw, like stencilled riser labels.
- Body: **Sofia Sans** 400 and 600, 18px (same family, normal width). https://fonts.google.com/specimen/Sofia+Sans (OFL).
- **Martian Mono** only for cable IDs and readouts.
- Sizes: 18, 26, 72, 12vw. Weight 300 for the lead line against 900 for heads.

**Hero.** Blue field. The top 55% of the screen is a gutterless mosaic: the main photo (technician at the patch panel) spans four of six columns, the other cells are close crops (a labelled jack, an aqua fiber tray, a yellow singlemode coil) and two flat blue-step tiles. The white test card sits on the seam between the main photo and a crop. Under the mosaic: "Built for the future." at 11vw in two lines, paper colour, then the sentence and the three choice boxes as a row of #2b53ad tiles with the red button. Phone: the mosaic becomes the main photo plus a strip of three crops; headline at 15vw.

**Signature scroll scene: "The yellow chapter".** The page turns from white to OS2 yellow as the scene pins (the field change is the moment). Pinned for three screens.
1. On yellow, the building section is drawn in thick 4px ink lines like a stencil, closet first.
2. Routes draw out to every room in ink; the fiber riser draws in aqua; each room's name drops in.
3. "10 years from now.": devices (drawn as simple ink silhouettes) swap for new silhouettes with a quick vertical wipe. Cable stays. The ten practices appear as large white tags with ink text at their location, one after another, each tag with one plain line.
Reduced motion: the finished yellow drawing with the switch.

**How sections differ.** The colour changes per chapter, and the layout changes too: blue = mosaic hero, white = the demos side by side with a pinned heading on the left, yellow = the pinned drawing, aqua = 946+ at 30vw and the cable-plant chart filling the width, ink = one huge "Request a site assessment" line and the footer.

**Motion rules.** Signature is the yellow chapter. Headlines rise line by line from behind their baseline once (the dealt "masked headline"). Field colours do not crossfade; each chapter starts at its edge.

**Footer.** Ink #0d1420. The wire stripe is five thick cables in the chapter colours (blue, white, yellow, aqua, red), running across the top of the footer in the same order as the page, a recap of the scroll.

**Do / don't**
- Do tie every colour to a system; say it once in plain words ("yellow is the backbone fiber"). Don't use a colour field without a meaning.
- Don't use condensed capitals for sentences, only for short chapter titles.
- Risk: loud. Five full colours can read as a children's site if the photos are weak. It needs the best photos of the three.

---

## Tell check (all three)
Checked against impeccable.style/slop, Anthropic's frontend-design skill (2026), and taste-skill's `references/tells.md` (three waves).
- No Inter or Geist. No single font for everything without a reason (B is one family on purpose, with a mono for real IDs).
- No cream + terracotta. No near-black + one acid accent (A's field is the logo blue, with two other meaning colours). No purple. No gradient, gradient text, glow, glass or halo.
- No small label above a heading, no pill badge, no middle-dot strings, no arrows on every link, no 01/02/03 as decoration (real step numbers on the process demos stay, rule 3).
- No mono as a "technical" costume: Martian Mono appears only on the test card, cable labels and part numbers.
- No hairline on every section, no 1px logo grid, no identical card rows, no hero-metric strip (946+ gets one huge moment, not a row of stats).
- No fade-up on every section. One signature scene per page; other motion is tied to a demo or a number.
- Copy: no "seamless", "future-proof" as an empty claim, no "Not X. It's Y." The practices are named instead.

## For the builder
- Reprint a sheet: `node C:/Users/Aram/.claude/skills/taste-skill/scripts/draw.mjs --show --out .taste-skill/<id>` (sheets saved in `.taste-skill/hero-object`, `specimen-catalogue`, `colour-chapters`, `product-performs`, `page-is-the-object`). Or redeal with `--direction <id> --seed <seed>` and the same brief.
- Brief used: `--sector other --tone technical --keep palette,type --sections showcase,how-it-works,features,proof,faq,cta,footer`.
- Also dealt and not used: `page-is-the-object` (seed 1960623273): the owner already turned down a "closeout paperwork" look on 2026-10-31. `name-as-monument`, `uneven-photographs`, `dark-room` came up in the random three-way deal and did not fit (the hero is fixed; no own photos yet).
- Taste-skill bans mono and step numbers outright; DESIGN.md rules 3 and 4 allow them on real things. The owner's rules win; run `inspect.mjs` with `--allow` for those two only.
- Font packages: `@fontsource-variable/archivo` (check it ships the width axis, the "full" build), `@fontsource-variable/hanken-grotesk`, `@fontsource-variable/schibsted-grotesk`, `@fontsource-variable/sofia-sans`, `@fontsource/sofia-sans-extra-condensed`, `@fontsource-variable/martian-mono`.

## Image-generation prompts (Step 2)
Paste as written. Each asks for one 1440 x 2000 desktop design and one 390-wide phone hero.

**A, desktop.** "Website homepage design, 1440 x 2000 pixels, flat UI mockup, no device frame. Top third: a full-bleed photograph of a server rack in a wiring closet, bundles of blue Cat 6A cables neatly dressed into a patch panel, a technician's hands in black gloves seating a cable, sharp cool light from the right; the left 40% of the photo covered by a flat solid deep blue panel #142a5e. On it, headline 'Built for the future.' in two lines, very large condensed heavy grotesk like Archivo Condensed ExtraBold, colour #f3f5f8, left aligned. One short sentence below in a plain grotesk at small size. A white card #f3f5f8 overlaps the photo on the right: a cable test report with eight coloured wire pairs drawn as lines, a green PASS stamp, small monospaced cable ID 'IDF2-A-024'. Along the bottom of the hero, three solid tiles in #1d3f8f with white text: 'I need a quote', 'I'm planning a project', 'Something's broken'; the first has a solid red #d0101a rectangular button 'Request a site assessment'. Middle third: deep blue field #0e1f47 with fine grain; a cutaway line drawing of a three-storey office building in thin off-white lines, a rack in a ground-floor closet, cable routes running from it to every room, one route in aqua #2cc5c9 with a short bright segment of light on it, one riser in yellow #f5c518; small yellow tags at a few points; heading '10 years from now.' in the condensed heavy face. Bottom third: on #142a5e, the number '946+' enormous in the condensed face, cropped by the right edge, one sentence beside it. Then a footer in #0e1f47 with a stripe of five flat cable colours (blue, aqua, yellow, white, red) across its top and the word 'Armak' at full width. No gradients, no glow, no shadows, no small uppercase labels, no icons in boxes."
**A, phone.** "Phone website hero, 390 x 844, flat mockup. Top half: close photo of gloved hands seating a blue Cat 6A cable into a patch panel. Below, deep blue #142a5e with fine grain: 'Built for the future.' in two lines, heavy condensed grotesk, #f3f5f8. A narrow white cable test strip with a green PASS. Three stacked solid #1d3f8f tiles 'I need a quote', 'I'm planning a project', 'Something's broken', the first with a red #d0101a button 'Request a site assessment'. No gradients, no labels above the headline."

**B, desktop.** "Website homepage design, 1440 x 2000, flat UI mockup, no device frame. Ground: cool light grey #dfe3e2 with a faint acoustic-ceiling-tile texture. Top third: left half, headline 'Built for the future.' in two lines, heavy grotesk like Schibsted Grotesk ExtraBold, ink #10151c; one sentence; three wide flat tiles in #eceeed stacked: 'I need a quote' (with a solid red #d0101a button 'Request a site assessment'), 'I'm planning a project', 'Something's broken'. Right half: a tall photograph running off the top and right edges, a patch panel with blue and aqua cables in crisp studio light; a white cable test card with a wire map and a green PASS overlaps its lower left corner onto the grey. Middle third: a white isometric cutaway of a two-floor office, like product renders on a pale field, with real equipment objects placed in it (rack, ceiling access points, wall jacks, a camera), cables drawn in blue #2f6fe0, aqua #47c2c4 and yellow #f2c200; small yellow tags; heading '10 years from now.' Bottom third: a specimen wall, square flat tiles in brick offset, each a cable-jacket colour (blue, aqua, yellow, white) holding one cut-out product photo: patch panel, access point, fiber enclosure, keystone jack, security camera, display; names under the tiles in plain grotesk. No shadows, no rounded cards, no gradients, no small uppercase labels."
**B, phone.** "Phone website hero, 390 x 844, flat mockup, cool grey #dfe3e2 ground. Full-width photo of a patch panel with blue and aqua cables, a white cable test card with green PASS overlapping its bottom edge. Below: 'Built for the future.' in two lines, heavy grotesk, ink #10151c. Three stacked flat #eceeed tiles 'I need a quote', 'I'm planning a project', 'Something's broken', the first with a red #d0101a button 'Request a site assessment'."

**C, desktop.** "Website homepage design, 1440 x 2000, flat UI mockup, no device frame. Top third on solid logo blue #1d3f8f: a gutterless photo mosaic across the top, six columns, the main photo (technician's hands at a patch panel with blue cables) spanning four columns, the others close crops of a labelled wall jack, an aqua fiber tray, a yellow singlemode fiber coil, and two flat blue tiles #2b53ad. A white cable test card with green PASS sits across the seam between two photos. Below the mosaic: 'Built for the future.' huge, extra-condensed black-weight sans like Sofia Sans Extra Condensed, white, two lines; one sentence; a row of three #2b53ad tiles 'I need a quote', 'I'm planning a project', 'Something's broken', the first with a solid red #d0101a button 'Request a site assessment'. Middle third: a full field of OS2 yellow #f2c200, a cutaway of an office building drawn in thick 4px black lines like a stencil, closet at the bottom, routes to every room, one riser in aqua #47c2c4; large white tags with black text at a few points; heading '10 years from now.' in the extra-condensed face. Bottom third: a full aqua #47c2c4 field with '946+' at enormous size in black. Fields butt edge to edge with no lines between. No gradients, no shadows, no small uppercase labels."
**C, phone.** "Phone website hero, 390 x 844, flat mockup on logo blue #1d3f8f. Top: one photo of hands at a patch panel with a strip of three small crops below it (labelled jack, aqua fiber tray, yellow fiber coil). A white cable test strip with green PASS. 'Built for the future.' in two lines, extra-condensed black-weight sans, white. Three stacked #2b53ad tiles 'I need a quote', 'I'm planning a project', 'Something's broken', the first with a red #d0101a button 'Request a site assessment'."

## Recommendation
**Direction A, "The lit closet".** It gives Armak a colour no competitor owns, taken straight from its own logo, and makes fiber light the one moving thing, which is the most direct picture of "Built for the future" and the strongest scroll scene of the three. It also keeps the hero photo, test card and three boxes exactly where he liked them, and it works with today's stock photo while B needs real product photos first and C needs the best photos to avoid looking loud.
A mix worth showing him: A's colours and closet scene, with B's specimen wall for the services section once partner product photos arrive.
