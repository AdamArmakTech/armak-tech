# Site audit: armak.tech (live), 2026-10-14

Scope: live site https://armak.tech (`main`). Covers / , /services/ + 6 service pages, /industries/,
/about/, /glossary/, /contact/, /projects/, the 404 page, robots, sitemap and the share image.
Read-only audit: no site changes were made. Checks used curl, HTML parsing, the old-site commit
`757cf43`, and a browser at 375×812 and 1280×800 (keyboard paths, overflow, console).
Status: COMPLETE.

**Verified OK (no action needed):**
- All 12 public routes return 200. Unknown URLs return a real 404 status with a helpful page. http→https redirects with 308.
- Every internal link and in-page anchor resolves (0 broken across 13 pages). No external links to break.
  No `aria-*` reference or `label for` points at a missing id, and there are no duplicate ids.
- Every `<img>` has alt text. The logo uses `alt=""` inside a link that has an aria-label, which is correct.
- Each page has exactly one `<h1>`, and only /contact/ skips a heading level (see SHOULD FIX 4).
- All JSON-LD parses: ProfessionalService+WebSite on every page, Service+FAQPage+Breadcrumb on
  service pages, ItemList on /services/, and DefinedTermSet (140 terms) on /glossary/. Canonicals point to
  the page itself, the sitemap lists exactly the 12 public pages, robots.txt is valid, and the og-image (1200×630)
  looks right. All 97 referenced assets return 200.
- 375px: no horizontal overflow on any page. No console errors (only the expected 404 on the 404 page).
- Keyboard: skip link works, and focus is visible everywhere (2px red outline). The System explorer and the "How every job
  runs" stepper use the ARIA tabs pattern correctly (roving tabindex, arrow/Home/End keys). Glossary search announces
  "6 of 140 terms". The glossary drawer is a modal `<dialog>`: focus moves to Close, Escape closes it,
  focus returns to the term and the URL updates to `#term`. Contact form step 1 validates, announces the error,
  moves focus to step 2's heading and handles send failures. The form was not submitted.
- Reduced motion: `motion.ts`, `demo.ts` (all 5 demos) and the global CSS kill switch respect it. Reveal
  animations have a CSS fallback that shows content if JS fails.

---

## MUST FIX

1. **www.armak.tech shows a browser security error because there is no TLS certificate for www.**
   - Where: Vercel domain config (not in the repo). `www.armak.tech` CNAMEs to the apex (216.198.79.1),
     but Vercel serves a certificate that covers only `armak.tech`. Browsers show "Your connection is not
     private" (`SEC_E_WRONG_PRINCIPAL`). `http://www.armak.tech/` 308s to `https://www.armak.tech/`, which then fails.
   - Why: anyone who types "www.armak.tech" (from business cards, email signatures or old Google results) gets a
     security warning instead of the site.
   - Fix: Vercel → Project → Settings → Domains → Add `www.armak.tech` → "Redirect to armak.tech" (308).
     Vercel issues the certificate automatically because DNS already points at Vercel. Verify with
     `curl -I https://www.armak.tech/`, which should return `308` with `location: https://armak.tech/`.

2. **The site promises "24/7 emergency response" to everyone in some places and only to contracted clients in others.**
   - Where: no qualifier in `src/data/content.ts:84` (`credentials`). That text renders in the homepage hero
     (`src/components/home/Hero.astro:32`), the /about/ hero and Credentials block (`src/pages/about.astro:64,150`) and
     /services/ (`src/pages/services/index.astro`). The qualified version, "For contracted clients.", is in
     `src/components/home/Numbers.astro:24`, and "24/7 support for contracted clients" is in `src/data/site.ts:24`
     (footer and contact page).
   - Why: a prospect who reads the hero expects someone to answer at 2 AM, but the footer says only contract customers
     get that. On / and /about/ the two versions are one scroll apart. It is a service promise Armak can be held to.
   - Fix: once Armak confirms the policy (see NEEDS FROM ARMAK), use one wording everywhere. For example, change
     `content.ts:84` to `'24/7 response for contracted clients'` and leave `site.support` and `Numbers.astro:24` as
     they are. If Armak really answers emergencies for anyone, drop the qualifier from `site.ts:24` and `Numbers.astro:24` instead.

3. **There is no privacy policy, but the contact form collects names, emails and phone numbers.**
   - Where: site-wide. No privacy page exists and the footer (`src/components/layout/Footer.astro`) has no link to one.
     The form (`src/components/forms/ContactForm.astro`) sends data to a third party, Web3Forms.
   - Why: California's CalOPPA requires a commercial website that collects personal information from California
     residents to post a conspicuous privacy policy. A missing policy also looks unprofessional to larger
     clients doing vendor checks.
   - Fix: add `src/pages/privacy.astro`, a short plain-English policy covering what the form collects, that it is
     emailed via Web3Forms, that it is not sold or shared, how to request deletion (sales@armak.tech) and an effective
     date. Link it from the footer bottom row and with one line under the form's submit button ("We only use
     this to reply. Privacy policy"). Armak should approve the text.

## SHOULD FIX

1. **The /projects/ "redirect" is a 2-second meta-refresh page that returns 200 instead of a real redirect.**
   - Where: `src/pages/projects/index.astro:15`. `Astro.redirect('/')` in a static build produces a tiny HTML page
     ("Redirecting from /projects/ to /", `refresh 2;url=/`).
   - Why: phone users see a bare "Redirecting…" flash, and search engines get a soft 200.
   - Fix: add `"redirects": [{ "source": "/projects/:path*", "destination": "/", "permanent": false }]` to `vercel.json`.
     Make it temporary so it can be removed when real projects launch, and keep the Astro guard as a fallback.

2. **Green success/PASS text fails WCAG AA contrast.**
   - Where: `src/styles/tokens.css:24` `--pass: #1f8a4c` is 3.94:1 on paper and 4.38:1 on white. Small text needs 4.5:1. It is
     used as text color in `ContactForm.astro:312` ("Request received"), `CableTest.astro:725,868`, `404.astro:141`
     and the demo "✓ … ready" lines (`AssessDemo.astro:342`, `DesignDemo.astro:403`, `SupportDemo.astro:328,371,497`).
     White text on green badges (`CableTest.astro:659,764`, `SupportDemo.astro:267`) is also 4.38:1.
   - Fix: change one line to `--pass: #187a43`. That gives 4.84:1 on paper, 5.38:1 on white and 5.38:1 for white text on it.

3. **Form fields have a near-invisible underline, which fails WCAG 1.4.11 non-text contrast.**
   - Where: `src/styles/global.css:251` `.field__control { border-bottom: 1px solid var(--hairline-strong) }` gives
     #b9b6ad on paper = 1.83:1, and 2.03:1 on the white form card. Input boundaries need 3:1.
   - Why: in daylight on a phone the inputs barely read as fields.
   - Fix: `border-bottom: 1px solid #85827a` (3.46:1 on paper, 3.84:1 on white). Add it as a `--field-line` token in
     `tokens.css` so the hover state (`--steel`) still reads as darker.

4. **On /contact/ the form step titles skip a heading level (h1 → h3).**
   - Where: `<h3>` at `src/components/forms/ContactForm.astro:43,69,110`. The page h1 is in `src/pages/contact.astro`, and /contact/
     has no h2 between them. On the homepage the form sits under an h2, so it is fine there.
   - Fix: add a `headingLevel` prop to ContactForm (default 3) and pass `2` from `contact.astro`. Render
     `` const H = `h${headingLevel}` `` and keep the `t-h3` class so it looks the same.

5. **The mobile menu lets keyboard focus escape behind it, and Escape loses focus.**
   - Where: `src/components/layout/Header.astro:86` (menu) and `:145-163` (toggle/Escape script). At 375px, the 13th Tab press
     after the menu's last link moves focus into the page *under* the fixed full-screen menu, so focus is hidden
     (WCAG 2.4.11). Escape closes the menu but does not return focus to the Menu button.
   - Fix: in the `menuToggle` click handler, set `document.getElementById('main').inert = open` and do the same for
     `.site-footer`. In the Escape handler, capture `menuWasOpen` before `closeAll()` and call `menuToggle.focus()`.
     Clear `inert` in `closeAll()`.

6. **In the desktop Services mega-menu, focus order is confusing and the panel stays open after focus leaves.**
   - Where: `src/components/layout/Header.astro:61-84`. The panel comes after the header actions in the DOM. After you press
     Enter on "Services", Tab goes to Industries → About → Glossary → phone → Request assessment and only then into
     the opened panel. Tabbing out of the panel leaves it open over the page.
   - Fix: when the panel opens, focus the first `.mega__item` (`mega.querySelector('a')?.focus()`). Add
     `header.addEventListener('focusout', e => { if (!header.contains(e.relatedTarget)) closeAll(); })`.

7. **The System explorer keeps auto-advancing while a keyboard or mouse user is reading it (WCAG 2.2.2).**
   - Where: `src/components/home/BuildingExplorer.astro:155-163`. Only `pointerdown`, a click or arrow keys stop the timer.
     Tabbing to "Explore structured cabling →" or hovering over the panel leaves it running, so the content
     changes under the user's focus.
   - Fix: add `root.addEventListener('focusin', takeOver)`, and pause on hover:
     `root.addEventListener('mouseenter', stopAuto); root.addEventListener('mouseleave', startAuto);`.

8. **The homepage quick-links strip on phones leaves out Services, wraps awkwardly and has small tap targets.**
   - Where: `src/components/home/Hero.astro:13-20` (markup) and `:75-98` (CSS). At 375px it shows
     "INDUSTRIES ■ ABOUT ■ GLOSSARY ■" with a dangling separator, then "CONTACT" on a second line. The links are 21px tall
     (WCAG 2.5.8 asks for 24px), and the most important link for a visitor, Services, is missing.
   - Fix: add `<li><a href="/services/">Services</a></li>` first. Below 480px either hide the strip (the
     hamburger already has everything) or use `flex-wrap: nowrap; overflow-x: auto`. Give the links
     `padding-block: 0.75rem` for a ≥44px tap area.

9. **The About "Milestones" block has only two entries (founded, and today's total), so it looks unfinished.**
   - Where: `src/pages/about.astro:100-122`. With `SHOW_PLACEHOLDERS = false`, the visible "timeline" is "1998 · Armak
     Technologies established." and "2026 · 946+ projects delivered…", which reads like an empty template.
   - Fix: wrap the whole `.timeline` block in `{SHOW_PLACEHOLDERS && …}` until Armak supplies real milestones. The
     "Since 1998" story card above it already covers the founding year.

10. **The glossary still has about 85 em-dashes after the "AI-slop cleanup".**
    - Where: `src/data/glossary/d-h.ts` (29), `i-n.ts` (30), `o-r.ts` (26), `a-c.ts` (3). `s-z.ts` is already clean, so
      the files are inconsistent with each other.
    - Why: heavy em-dash use is the main "written by AI" tell, and the 2026-10-13 cleanup removed it everywhere else.
    - Fix: give these files the same treatment and replace each "X — Y" with a colon, comma, parentheses or a new sentence.

11. **"actually" is used as filler throughout the copy, which sounds AI-written.**
    - Where: `src/data/content.ts:59` ("what's actually there", shown on 8 pages through the process steps),
      `content.ts:108` ("residents actually like using"), `src/components/process/AssessDemo.astro:32` ("what's actually on
      site"), `src/data/services-detail.ts:156,160` ("how your building actually works", "devices you actually run"),
      and the `src/pages/glossary.astro:42` meta description ("questions people actually ask").
    - Fix: delete the word, which changes nothing. Example: "write down what's there". For multifamily, use "entry systems
      residents find easy to use".

## NICE TO HAVE

1. **The 404 page's screen-reader caption still lists "projects".** `src/pages/404.astro:56` hardcodes "Suggested pages: home,
   services, projects, contact" even though the Projects link is hidden. Build it from `routes` instead:
   `` {`Page not found. Suggested pages: ${routes.map(r => r.label.toLowerCase()).join(', ')}.`} ``

2. **The homepage Industries section has a duplicate "G-01" label.** `src/components/home/Industries.astro:31` gives the section
   `code="G-01"`, and the first card is also G-01 (line 44). Use `code="G-00"`, which is what /industries/ and Services ("A-00") already use.

3. **Bookmarks from the old one-page site to `/#about` land at the top of the homepage.** The old site (`757cf43`) used `#home`,
   `#services`, `#about` and `#contact`. `#services` and `#contact` still exist on `/`, but `#about` does not. Add an inline
   script to `src/pages/index.astro`: `if (location.hash === '#about') location.replace('/about/');`

4. **Small vercel.json hygiene items** (they can go in the same change as SHOULD FIX 1):
   - `"trailingSlash": true` so `/services`, `/about` and `/index.html` 308 to the canonical URL. Today they serve duplicate 200s, which is
     harmless because the canonical tags are correct.
   - Redirect `/sitemap.xml` → `/sitemap-index.xml`, since it currently 404s and many tools try that path first.
   - Basic security headers for `/(.*)`: `X-Content-Type-Options: nosniff`,
     `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`,
     `Permissions-Policy: camera=(), microphone=(), geolocation=()`. Today only HSTS is sent.

5. **/styleguide/ is publicly reachable.** It is noindex, but robots.txt `Disallow: /styleguide` stops Google from ever reading
   that noindex, and 6 images on the page have empty alt. Either remove the `Disallow` line in `public/robots.txt` so noindex
   takes effect, or exclude the page from production builds.

6. **Footer links are 19px tall on phones,** below the WCAG 2.5.8 minimum of 24px. Add `padding-block: 0.25rem` (or
   `display:inline-block; min-height:24px`) to `.site-footer__col a` in `src/components/layout/Footer.astro:150`.

7. **Form placeholders look like filled-in values.** "Jane Cooper" and "(818) 555-0100" (`ContactForm.astro:75,89`) are
   grey text on a phone and can look pre-filled. Replace them with hints ("Your name", "Best number to reach you")
   or remove them, since the labels already say what goes in each field.

8. **The form's failure message offers only the phone number.** Also offer the email:
   `ContactForm.astro:463-467` → "…or call us at (818) 858-4615 or email sales@armak.tech."

9. **About repeats the three credentials twice on one page,** in the hero spec strip (`about.astro:64`) and in the Credentials
   block (`about.astro:150`). Drop `...credentials` from the hero `spec` array.

10. **The homepage meta description is 158 characters,** but its own comment in `src/data/seo.ts:14` says 120–155. Change "In business since 1998."
    to "Since 1998."

11. **The Assess demo caption repeats the step text** right above it almost word for word
    (`AssessDemo.astro:32` vs `content.ts:59`). Make the caption say what the demo shows instead, for example "Each finding goes into
    a written site report, and the price comes from that report."

## NEEDS FROM ARMAK

- **Project count "946+ projects delivered"** (`src/data/site.ts:27`, shown in the homepage numbers, the About milestone and
  the Projects hero). The old site said **"1,000+"**. 946 first appears in the redesign plan with no source given. What is the real figure?
- **24/7 policy:** is emergency response open to anyone, or only to contracted clients? (MUST FIX 2)
- **Free site assessment:** the Services mega-menu says "Book a free site assessment" (`Header.astro:78`). Is it always
  free? If so, consider saying it on /contact/ too, because "is this going to cost me?" is the first question a business owner asks.
- **"Licensed · Bonded · Insured":** confirm, and send the license number and classification. These go in `site.license`, which unhides the
  License row on About.
- **"BICSI-certified technicians":** confirm at least one current BICSI credential (RCDD, Installer or Technician).
- **Partner/brand logos:** confirm Armak actively installs each of the 14 (Cisco, Meraki, Fortinet, Aruba, Ubiquiti, Netgear, Axis, Bosch,
  Hikvision, LTS, Honeywell, CommScope, Panduit, Crestron), all carried over from the old site. Note that **Hikvision**
  is on the FCC Covered List (NDAA §889 restrictions). Showing it next to "Public sector" may put off
  government and some enterprise buyers, so Armak may want to drop it.
- **Cat 8:** the site lists it as a headline offering (`site.ts:55,58`, structured-cabling hero). Cat 8 is a 30 m data-center
  cable. Does Armak install it, or should the line say "Cat 6A and fiber"?
- **Industries:** which of the 8 sectors in `content.ts:102-111` does Armak actually serve?
- **Service area:** confirm the 24 cities in 7 counties, especially the edges (Santa Barbara, San Bernardino, Chula Vista).
- **Hours "Mon–Fri · 8 AM – 6 PM"** (`site.ts:23`, also in the business JSON-LD): confirm.
- **Privacy policy:** approve the wording for the new page (MUST FIX 3).
- **Already tracked in PROJECT_STATE (still open):** street address and ZIP, social profiles, real projects, testimonials,
  milestones, team, job-site photos, vector logo.
