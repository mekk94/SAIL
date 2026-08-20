# Antigravity Implementation Prompt — SAIL Logistics Premium Bilingual Landing Page

## 0. Mission

Build and deliver a **complete, production-ready, deployable Angular landing page** for:

**SAIL — Smart Automated Integrated Logistics**

Industry: Freight forwarding & transportation  
Location: Dammam, Saudi Arabia  
Website: sail-freight.com  
Phone: +966 53 202 3587  
Email: BDM@sail-freight.com

The supplied project specification is the source of truth for company content, brand colors, required sections, bilingual behavior, technical constraints, performance, SEO, accessibility, and security. Preserve its terminology and supplied content. Do not invent company facts.

The final result must feel like a **premium modern logistics brand website**, not a generic corporate template.

---

# 1. Core Design Direction

## Visual concept

Create the page as a **single immersive visual journey**.

The entire website uses **one continuous animated environment/background**. Individual sections appear as intentional foreground compositions placed over that environment.

The background must NOT be:
- one flat color,
- one static image,
- a normal gradient-only background,
- or a conventional hero background that stops after the hero.

Instead, build a subtle, elegant, always-present visual system inspired by:
- logistics routes,
- cargo movement,
- global connections,
- navigation,
- precision,
- transportation flow,
- data/network movement.

The background animation should react to:
- page scroll progress,
- entering/leaving sections,
- pointer movement on desktop,
- touch/scroll behavior on mobile where appropriate.

Keep the motion **premium and restrained**. It should support the content rather than compete with it.

### Recommended background model

Use a fixed or persistent visual layer behind all major sections:

1. Deep/soft neutral base derived from the SAIL brand palette.
2. Fine animated route lines / arcs.
3. Small moving particles representing logistics points.
4. Subtle grid or geometric network structure.
5. Gold accent pulses at selected connection points.
6. Scroll-driven movement so the network slowly changes as the visitor moves through the website.
7. Section-aware intensity: slightly more active during transitions, calmer while the visitor reads.

Use the lightest implementation capable of achieving the effect. Prefer:
- CSS,
- SVG,
- Canvas,
- native browser APIs,
- IntersectionObserver,
- requestAnimationFrame with throttling,

over unnecessary heavyweight libraries.

If a library is used for motion, it must be justified and optimized.

---

# 2. Brand / Design Tokens

Use exactly these supplied SAIL colors:

```scss
$ink: #212226;
$gold: #C4892F;
$off-white: #F6F6F6;
$white: #FFFFFF;

$ink-soft: #54565C;
$border: #E3E3E1;
$gold-hover: #A9701F;
```

### Important accessibility rule

Do NOT use `#C4892F` as small body text on `#F6F6F6`.

Gold is primarily for:
- accents,
- icons,
- large typography,
- borders,
- active indicators,
- CTA backgrounds when text contrast is sufficient,
- decorative details.

Use Ink / White for normal readable text where required.

Create a centralized design-token layer using CSS custom properties / SCSS variables.

---

# 3. Design Model / Page Composition

Use this as the visual architecture of the whole website:

```text
                 PERSISTENT ANIMATED ENVIRONMENT
 ┌──────────────────────────────────────────────────────────────┐
 │                                                              │
 │      floating route / network / logistics visual layer       │
 │                                                              │
 │   ┌──────────────────────────────────────────────────────┐   │
 │   │                    ACTIVE CONTENT                    │   │
 │   │                                                      │   │
 │   │  section-specific layout / cards / typography        │   │
 │   │                                                      │   │
 │   └──────────────────────────────────────────────────────┘   │
 │                                                              │
 │       background motion changes as user scrolls              │
 │                                                              │
 └──────────────────────────────────────────────────────────────┘
```

Do NOT force every section into the same visual pattern.

Each section must have a distinct presentation while still belonging to the same design system.

### Sections that should remain more open / editorial

These should NOT be boxed like the later service sections:
- Hero
- Overview / Who We Are
- Vision & Mission

### Sections that should use floating foreground compositions

Use floating panels / cards / compositions for:
- Freight Forwarding Services
- Transportation Services
- Bus Rental
- Customs Clearance
- Warehousing & Value-Added Services
- Industries We Serve
- Why Choose Us
- Contact form/content where appropriate

The floating elements should feel layered above the animated environment, with:
- controlled radius,
- subtle shadow,
- restrained border,
- glass-like or opaque surfaces only when useful,
- clear hierarchy,
- enough whitespace,
- no excessive "dashboard" aesthetic.

Avoid excessive cards inside cards.

---

# 4. Header / Navbar

## Desktop

The header must NOT look like a generic full-width bootstrap navbar.

### At page top

The header starts as part of the page composition and can use a wide transparent / integrated layout.

### After scrolling

Transform into a **floating rectangular navigation bar**:

- horizontally centered,
- not touching the left/right viewport edges,
- visible gap from viewport edges,
- rounded corners,
- subtle shadow,
- compact height,
- elevated above the background,
- smooth transition from top-state to scrolled-state.

Example mental model:

```text
        viewport edge
  ┌──────────────────────────────────────────────┐
  │                                              │
  │      ┌────────────────────────────────┐      │
  │      │ LOGO  NAV ...  EN/AR  CTA      │      │
  │      └────────────────────────────────┘      │
  │                                              │
```

Do NOT make it stretch from edge to edge while scrolled.

### Behavior

Implement:
- scroll state signal,
- smooth state transition,
- active section indication,
- mobile menu,
- language switch,
- CTA,
- keyboard accessibility,
- reduced-motion fallback.

### Navigation

Desktop:
- Overview
- Services
- Transportation
- Bus Rental
- Customs
- Warehousing
- Industries
- Contact

Also include:
- EN / AR language toggle
- Get a Quote CTA

On smaller screens:
- compact floating menu button,
- full-screen or large floating mobile navigation panel,
- easy one-handed interaction.

---

# 5. Hero

The Hero is the most open and cinematic area.

Do NOT put the hero inside a normal rectangular card.

### Hero should contain

- SAIL brand presence
- Strong headline
- Short supporting text
- Primary CTA
- Secondary CTA
- animated background environment
- optional route visualization / moving logistics nodes

### Layout

Desktop:
- two-dimensional composition with strong typography and visual movement.
- left/right balance depending on language direction.
- strong use of negative space.

Arabic:
- automatically switch to RTL composition.

Mobile:
- prioritize typography and CTA usability.
- simplify background effects to preserve performance.
- avoid overly tall hero sections that delay content.

### CTA direction

Primary:
- Get a Quote / احصل على عرض سعر

Secondary:
- Explore Services / اكتشف خدماتنا

CTAs should scroll to real sections.

---

# 6. Overview / Who We Are

Keep this section open and editorial rather than a boxed grid.

Create a visually distinctive composition using:
- oversized section number or micro-label,
- large heading,
- strong company statement,
- supporting copy,
- subtle route-line visual,
- animated typography reveal.

Content must use the supplied company overview in both languages.

The animation should communicate confidence and precision.

---

# 7. Vision & Mission

Do not create a generic two-column Bootstrap card layout.

Design it as a **dual statement composition**.

Possible visual model:

```text
                    VISION
          large statement / gold accent

                 connecting line

                   MISSION
          large statement / supporting mark
```

Use:
- large typography,
- thin gold divider/route,
- subtle reveal motion,
- different positioning for desktop vs mobile.

On mobile stack naturally while keeping visual distinction.

Use supplied Vision and Mission content exactly.

---

# 8. Freight Forwarding Services

This section introduces the stronger "floating content" language.

Services:
- Sea Freight (FCL & LCL)
- Air Freight (Import & Export)
- Multimodal Transport
- Door-to-Door Solutions

Create a distinctive visual composition rather than a simple four-card grid.

Recommended approach:
- section intro anchored to one side,
- staggered floating service items,
- animated connecting route line,
- each item reacts subtly on hover/focus,
- active item has stronger gold indicator.

Potential interaction:
- hovering a service highlights its route/connection animation in the shared background.

On mobile:
- convert to a vertical sequence,
- avoid tiny cards,
- maintain good tap targets.

---

# 9. Transportation Services — IMAGE SECTION

This is one of the image-driven sections.

Services:
- Container Transportation
- Local & Cross-Border Transport
- FTL & LTL Services
- Project & Heavy Cargo

Create a premium image-led composition.

IMPORTANT:

Where the final visual should contain an image, put:

> **IMAGE WILL BE HERE**

inside the implementation as a clear placeholder.

Do not invent final stock images.

The placeholder should:
- preserve intended aspect ratio,
- show the future image location,
- be visually integrated into the design,
- include useful alt-placeholder semantics,
- be easy for another developer/designer to replace.

### Suggested desktop layout

Large image panel + floating text/content panel.

Example concept:

```text
 ┌───────────────────────────────────────────────┐
 │                                               │
 │             IMAGE WILL BE HERE                │
 │                                               │
 │                           ┌───────────────┐   │
 │                           │ Transportation│   │
 │                           │ content       │   │
 │                           └───────────────┘   │
 └───────────────────────────────────────────────┘
```

Avoid making it look like a conventional service card.

---

# 10. Bus Rental Service — IMAGE SECTION

Content:

Intro:
"We provide buses on rent anywhere in Saudi Arabia — for corporate transport, employee shuttles, events, tourism, Hajj/Umrah groups, and airport transfers."

Fleet:
- Luxury VIP Coaches
- Coach — 45–50 seats
- Mini Bus — 33–35 seats
- Toyota Coaster — 20–30 seats
- Passenger Vans — 7–15 passengers

Arabic content must come from the supplied specification.

### Design direction

Make this feel more human and transportation-focused.

Use:
- one large image placeholder,
- vertical fleet selector/list,
- capacity badges,
- subtle hover/focus transitions,
- smooth reveal of additional fleet details,
- moving route-line visual linking the fleet items.

For mobile:
- image first,
- fleet list below,
- each fleet item large enough to tap,
- no desktop-style overlap that causes horizontal scrolling.

Use:

> **IMAGE WILL BE HERE**

for the image placement.

---

# 11. Customs Clearance — IMAGE SECTION

Services:
- HS Code & Duty Consultation
- Documentation & Compliance
- Import & Export Clearance

Design the section around:
- a strong customs/documentation visual,
- one large image placeholder,
- three service points,
- document / clearance visual language,
- subtle animated path from "documents" to "cleared".

Use:

> **IMAGE WILL BE HERE**

for the intended image location.

Make the visual language consistent with the overall logistics network theme.

---

# 12. Warehousing & Value-Added Services — IMAGE SECTION

Services:
- Warehousing & Storage
- Distribution & Last-Mile Delivery
- Cargo Insurance
- Packing & Palletization

Design concept:
- large storage / warehouse image placeholder,
- stacked floating information blocks,
- subtle grid/network animation,
- visual sequence suggesting storage → handling → distribution → delivery.

Use:

> **IMAGE WILL BE HERE**

for the image placeholder.

Do not over-animate the cards.

---

# 13. Industries We Serve — IMAGE SECTION

Industries:
- FMCG & Retail
- Construction & Infrastructure
- Oil & Gas
- Manufacturing & Industrial
- Automotive & Pharmaceuticals

Make this visually different from all preceding sections.

Possible treatment:
- horizontal/vertical industry selector,
- one large dynamic image area,
- active industry changes visual accent and supporting text,
- background route network changes subtly when industry changes.

Use:

> **IMAGE WILL BE HERE**

for the intended visual area.

The section should feel premium and industrial rather than corporate-template-like.

---

# 14. Why Choose Us

Items:
- Competitive Pricing
- Strong Global Network
- Experienced Logistics Team
- Customer-Focused Service
- On-Time Delivery

This section can become a visually strong "proof" / brand-confidence moment.

Avoid a regular 5-card grid.

Possible direction:
- large statement,
- five values orbiting / aligning along a route,
- central "SAIL" identity,
- sequential reveal,
- active value expands slightly.

On mobile:
- transform into an elegant vertical timeline / stack.

---

# 15. Contact

Contact details:
- +966 53 202 3587
- BDM@sail-freight.com
- sail-freight.com
- Dammam, Saudi Arabia

Form:
- Name
- Company
- Email
- Phone
- Service dropdown
- Message

### Design

Create a strong closing composition.

Use:
- large contact statement,
- contact information,
- polished form,
- subtle map/grid/network background cue,
- gold CTA,
- strong completion state.

Do not make the form feel like a generic website contact form.

### Form requirements

Frontend only.

Use EmailJS or Formspree as the delivery mechanism.

Implement:
- Angular reactive forms or signal-based equivalent,
- validation,
- accessible labels,
- error states,
- `aria-describedby`,
- honeypot spam field,
- submission throttling/basic client-side protection,
- success state,
- failure state,
- no private API secrets in frontend.

All real service credentials must come from environment/runtime configuration.

Never place private keys directly in source code.

---

# 16. Footer

The footer must be intentionally minimal.

User requirement:

**Low empty spaces.**

Do NOT create:
- giant footer,
- huge newsletter block,
- multiple columns with unnecessary content,
- oversized social areas,
- excessive legal links.

Footer should contain:

1. SAIL logo
2. Company name under logo
3. Simple quick links
4. Copyright
5. Optional small contact/location line where useful

Recommended visual structure:

```text
┌──────────────────────────────────────────────────────┐
│                                                      │
│  [SAIL LOGO]                 Quick Links              │
│  Smart Automated             Overview                  │
│  Integrated Logistics        Services                  │
│                              Contact                   │
│                                                      │
│  © 2026 SAIL. All rights reserved.                  │
└──────────────────────────────────────────────────────┘
```

Keep the footer visually compact.

---

# 17. Image Placeholder System

Every future content-image position from:

- Transportation
- Bus Rental
- Customs
- Warehousing
- Industries

must visibly contain:

**IMAGE WILL BE HERE**

Do not use random stock photos.

Create a reusable Angular component such as:

```text
<app-image-placeholder
  label="IMAGE WILL BE HERE"
  aspectRatio="16 / 10"
  section="transportation">
</app-image-placeholder>
```

It should make future asset replacement trivial.

When real images are inserted later:
- use semantic `<img>` or `<picture>`,
- use optimized WebP/AVIF,
- provide real alt text,
- lazy-load below-the-fold images,
- preserve layout dimensions to avoid CLS.

---

# 18. Animation System

Animation is a major part of this implementation, but performance and restraint are more important than quantity.

## Required animation types

### A. Page entrance
- subtle hero reveal,
- typography reveal,
- route network activation.

### B. Section reveal
Each section should animate when entering the viewport.

Use IntersectionObserver or an equivalent performant mechanism.

Examples:
- fade + translate,
- clip-path reveal,
- line draw,
- staggered content,
- image placeholder reveal,
- number/label reveal.

### C. Section transitions

Moving from one section to another should feel like one continuous journey.

Use:
- route lines,
- background movement,
- changing active node,
- subtle vertical/orbital movement.

### D. Hover/focus
For desktop:
- subtle elevation,
- gold line movement,
- icon motion,
- background highlight.

### E. Scroll-linked motion

Implement restrained scroll-linked motion:
- background route drift,
- particle movement,
- section progress,
- header transition,
- active nav indicator.

Avoid expensive effects on every scroll event.

Prefer:
- `requestAnimationFrame`,
- passive listeners,
- CSS transforms,
- IntersectionObserver.

### F. Reduced motion

When:

```css
@media (prefers-reduced-motion: reduce)
```

disable or simplify:
- parallax,
- particles,
- large movement,
- automatic loops,
- dramatic transitions.

The website must remain fully understandable and usable.

---

# 19. Responsive Strategy

Mobile is a first-class design target.

Do NOT simply shrink desktop layouts.

## Breakpoint philosophy

Design intentionally for:
- small mobile
- standard mobile
- tablet
- laptop
- large desktop

Use responsive typography with `clamp()` where appropriate.

Use:
- CSS Grid
- Flexbox
- logical properties
- fluid spacing

Never introduce:
- horizontal page scrolling,
- cropped interactive controls,
- tiny text,
- overlapping inaccessible cards.

### Mobile-specific rules

Header:
- floating compact bar,
- menu button,
- language toggle accessible.

Hero:
- shorter visual hierarchy,
- fewer simultaneous animated elements.

Image sections:
- image placeholder becomes a full-width visual block,
- content flows naturally below/around it.

Floating desktop cards:
- become normal stacked blocks on mobile where overlap becomes harmful.

Navigation:
- minimum touch target approximately 44×44px.

Forms:
- single-column layout,
- comfortable spacing,
- keyboard-friendly controls.

---

# 20. Bilingual Architecture

The page is EN + AR with runtime language switching.

Follow the specification:

- lightweight translation service,
- Angular signals for active language state,
- JSON dictionaries,
- no separate build per language,
- `<html lang>` must update,
- `<html dir>` must update,
- CSS must use logical properties.

Example:

```ts
lang = signal<'en' | 'ar'>('en');
```

Avoid hardcoding translated strings directly throughout templates.

Organize translation data cleanly.

Example:

```text
src/app/core/i18n/
  en.json
  ar.json
  translation.service.ts
```

All section content, nav labels, CTA text, form labels, metadata, and accessibility strings should be translatable.

---

# 21. RTL Requirements

Arabic must be real RTL, not an English site with text alignment reversed.

Use:
- `margin-inline-start`
- `margin-inline-end`
- `padding-inline`
- `inset-inline-start`
- `inset-inline-end`
- logical border radius where useful

Avoid:
- unnecessary `left/right`,
- hard-coded positioning that breaks in RTL.

Technical strings such as:
- phone numbers,
- URLs,
- HS codes,
- email addresses

must use directional isolation when necessary.

---

# 22. Angular Architecture

Use modern Angular.

Minimum:
- Angular 18+
- standalone components
- signals
- TypeScript
- SCSS
- strict TypeScript
- no NgRx

Recommended project structure:

```text
src/
  app/
    core/
      i18n/
      services/
      models/
    shared/
      components/
      directives/
      utilities/
    layout/
      header/
      footer/
      page-shell/
    sections/
      hero/
      overview/
      vision-mission/
      freight-forwarding/
      transportation/
      bus-rental/
      customs/
      warehousing/
      industries/
      why-choose-us/
      contact/
    app.component.ts
    app.routes.ts

  assets/
    images/
    icons/
    fonts/
    data/

  styles/
    _tokens.scss
    _mixins.scss
    _animations.scss
    styles.scss
```

Use reusable components wherever there is real repetition.

Do not over-engineer the application.

This is a marketing website, not an enterprise dashboard.

---

# 23. Shared Components

Create reusable primitives where appropriate, for example:

```text
AppLogo
FloatingHeader
MobileMenu
SectionLabel
SectionTitle
PrimaryButton
SecondaryButton
ServiceItem
FloatingPanel
ImagePlaceholder
RouteDecoration
SectionReveal
LanguageToggle
ContactForm
Footer
```

Keep components focused.

---

# 24. Background Engine

Create one reusable page-level background system.

Recommended concept:

```text
<AppAmbientBackground>
   <svg/canvas logistics network>
   <route lines>
   <nodes>
   <particles>
   <scroll-aware movement>
</AppAmbientBackground>
```

The component must remain behind content and should not interfere with:
- pointer events,
- text selection,
- keyboard navigation,
- screen readers.

Use:

```css
pointer-events: none;
```

where appropriate.

Do not make the animation consume excessive CPU.

---

# 25. Performance Requirements

Target:

- Lighthouse Performance ≥ 90
- strong Core Web Vitals
- low Cumulative Layout Shift
- quick first paint
- no huge JavaScript payload
- lazy-loaded below-fold images
- compressed assets
- no render-blocking unnecessary scripts

Use:
- WebP/AVIF,
- responsive image sizing,
- route-level/component-level lazy loading only where it materially helps,
- CSS transforms for animation,
- passive scroll listeners,
- reduced DOM complexity.

Enforce Angular bundle budgets in `angular.json`.

Do not add libraries merely for visual effects if the same result can be achieved natively.

---

# 26. SEO

Implement:

- semantic HTML
- exactly one H1
- proper H2/H3 hierarchy
- meaningful `<title>`
- meta description
- language-aware metadata
- Open Graph metadata
- Twitter Card metadata
- canonical strategy if appropriate
- robots.txt
- sitemap.xml

Use the company identity and supplied content.

Do not keyword-stuff.

If SSR is added, keep the implementation production-safe and justified. It is not mandatory for v1 unless needed by the deployment environment.

---

# 27. Accessibility

Target WCAG 2.1 AA.

Required:

- keyboard navigation
- visible focus states
- sufficient contrast
- semantic HTML
- accessible buttons/links
- real labels for fields
- `aria-describedby` for validation feedback
- descriptive alt text when real images are added
- decorative animation marked appropriately
- no color-only communication
- reduced-motion support
- accessible mobile menu
- language toggle announced correctly

Do not sacrifice usability for visual effects.

---

# 28. Security

Frontend-only security requirements:

- rely on Angular template sanitization,
- never use unsafe `innerHTML` for untrusted content,
- never use `bypassSecurityTrust*` for user-controlled content,
- keep dependencies maintained,
- run `npm audit`,
- do not expose private secrets,
- use HTTPS,
- configure CSP at deployment layer,
- configure anti-clickjacking headers,
- avoid third-party scripts unless required,
- use SRI for CDN-hosted scripts when CDN loading is unavoidable.

Contact-form integration is the trust boundary.

---

# 29. No Fake Data Rule

Do NOT invent:
- customer logos,
- statistics,
- years in business,
- fleet counts,
- international offices,
- certifications,
- awards,
- testimonials,
- reviews,
- social media profiles,
- warehouse sizes,
- performance percentages.

Only use what is in the provided company specification.

Where the design needs a visual but the source does not provide one, use the explicit placeholder:

**IMAGE WILL BE HERE**

---

# 30. Content Source of Truth

Implement the supplied section content:

### Brand
SAIL — Smart Automated Integrated Logistics

### Overview
EN:
SAIL is a professional freight forwarding and transportation company providing end-to-end logistics solutions for domestic and international cargo movement. We are committed to efficiency, transparency, and timely delivery.

AR:
نحن شركة متخصصة في الشحن والنقل، نقدم حلولاً لوجستية متكاملة وشاملة لنقل البضائع محلياً ودولياً. نلتزم بالكفاءة والشفافية والإنجاز في الوقت المحدد.

### Vision
EN:
To become a trusted logistics partner recognized for service excellence.

AR:
أن نصبح شريكاً لوجستياً موثوقاً، يُشار إليه بالتميز في تقديم الخدمات.

### Mission
EN:
To deliver safe, cost-effective, and timely logistics solutions.

AR:
تقديم حلول لوجستية آمنة وفعالة من حيث التكلفة والتسليم في الوقت المناسب.

### Freight Forwarding
- Sea Freight (FCL & LCL)
- Air Freight (Import & Export)
- Multimodal Transport
- Door-to-Door Solutions

### Transportation
- Container Transportation
- Local & Cross-Border Transport
- FTL & LTL Services
- Project & Heavy Cargo

### Bus Rental
- Luxury VIP Coaches
- Coach — 45–50 seats
- Mini Bus — 33–35 seats
- Toyota Coaster — 20–30 seats
- Passenger Vans — 7–15 passengers

### Customs
- HS Code & Duty Consultation
- Documentation & Compliance
- Import & Export Clearance

### Warehousing
- Warehousing & Storage
- Distribution & Last-Mile Delivery
- Cargo Insurance
- Packing & Palletization

### Industries
- FMCG & Retail
- Construction & Infrastructure
- Oil & Gas
- Manufacturing & Industrial
- Automotive & Pharmaceuticals

### Why Choose Us
- Competitive Pricing
- Strong Global Network
- Experienced Logistics Team
- Customer-Focused Service
- On-Time Delivery

---

# 31. Implementation Details

## Header navigation

Use section IDs such as:

```text
#hero
#overview
#vision-mission
#freight-forwarding
#transportation
#bus-rental
#customs
#warehousing
#industries
#why-choose-us
#contact
```

Use `scroll-behavior: smooth` with reduced-motion fallback.

Ensure sticky/floating header does not cover destination headings.

---

# 32. Interaction Quality

Every interactive element must feel intentional.

Examples:

### Nav
- active section indicator
- subtle underline/route marker
- smooth hover transition

### Buttons
- animated background or line movement
- clear hover/focus/pressed states
- no exaggerated scaling

### Service items
- icon movement
- border accent
- subtle lift

### Image areas
- reveal mask
- slow ambient zoom only where appropriate
- no aggressive parallax

### Background
- route path follows global page progression
- visual nodes correspond to active section
- subtle pointer response on desktop

---

# 33. Loading Experience

Create a very lightweight initial loading experience if needed.

Do NOT create a long preloader.

A simple:
- logo mark,
- thin gold line,
- micro transition

is enough.

Do not delay content unnecessarily.

---

# 34. Build / Deployment

The output must be a real deployable Angular project.

Provide:

```text
package.json
angular.json
tsconfig*.json
src/
public/
README.md
```

Add deployment documentation for at least:

- Netlify
- Vercel
- static Nginx hosting

Explain:
- build command
- output directory
- SPA fallback
- environment configuration
- contact-form provider setup
- optional security headers

The final project must build successfully with:

```bash
npm install
npm run build
```

and, if a test suite exists:

```bash
npm test
```

No placeholder TODOs should prevent deployment.

---

# 35. Environment Configuration

Create a safe configuration strategy.

Example:

```text
src/environments/
  environment.ts
  environment.prod.ts
```

For EmailJS / Formspree:
- public identifiers may be exposed where the provider requires it,
- private secrets must never be exposed.

Document exactly which values the deployer must provide.

---

# 36. Quality Assurance Checklist

Before finishing, verify:

### Visual
- [ ] Premium modern logistics aesthetic
- [ ] One persistent animated background
- [ ] Background reacts to scroll
- [ ] Sections have distinct visual compositions
- [ ] Hero is open, not boxed
- [ ] Overview is open, not boxed
- [ ] Vision/Mission are editorial, not generic cards
- [ ] Later sections use floating surfaces
- [ ] Image sections contain "IMAGE WILL BE HERE"
- [ ] Header becomes floating rectangular after scrolling
- [ ] Scrolled header has viewport side spacing
- [ ] Footer is compact
- [ ] No unnecessary empty footer space

### Responsive
- [ ] No horizontal overflow
- [ ] Mobile is intentionally redesigned
- [ ] Touch targets are comfortable
- [ ] Mobile menu works
- [ ] Image sections stack correctly
- [ ] Arabic layout works correctly

### Functional
- [ ] All nav links scroll correctly
- [ ] CTA works
- [ ] EN/AR toggle works
- [ ] `lang` and `dir` update
- [ ] Contact form validates
- [ ] Contact form provides success/failure states
- [ ] External website/email/phone links work

### Accessibility
- [ ] Keyboard navigation works
- [ ] Visible focus states
- [ ] Labels and validation messages are accessible
- [ ] Contrast is acceptable
- [ ] Reduced motion works
- [ ] Decorative animation does not interfere with screen readers

### Performance
- [ ] Lazy loading for below-fold images
- [ ] No giant animation library unless justified
- [ ] Scroll handlers are optimized
- [ ] No excessive DOM effects
- [ ] Angular production build succeeds
- [ ] Bundle budgets are configured

### SEO
- [ ] Title updates for EN/AR
- [ ] Meta description updates for EN/AR
- [ ] OG metadata
- [ ] semantic headings
- [ ] robots.txt
- [ ] sitemap.xml

### Security
- [ ] No private keys committed
- [ ] Angular sanitization preserved
- [ ] no unsafe HTML handling
- [ ] deployment headers documented
- [ ] HTTPS assumed/enforced in deployment

---

# 37. Deliverables

The final output from Antigravity must include:

1. Complete Angular source code.
2. Complete styling/animation system.
3. All bilingual content from the supplied specification.
4. Responsive desktop/tablet/mobile layouts.
5. Floating scroll-state header.
6. Persistent animated logistics background.
7. Distinct section compositions.
8. Image placeholder system using "IMAGE WILL BE HERE".
9. Functional frontend contact form integration structure.
10. SEO files.
11. Deployment-ready configuration.
12. README with setup and deployment instructions.
13. No broken routes, console errors, or missing imports.
14. No unnecessary packages.
15. No invented company information.

---

# 38. Final Design Standard

The visual result should feel comparable to a **premium logistics / transportation brand website designed by a strong product design team**, not:
- a Bootstrap landing page,
- a template,
- a dashboard,
- a collection of generic cards,
- an AI-generated collage of unrelated UI components.

The design language should communicate:

**Precision + Movement + Trust + Scale + Modern Logistics**

Use the SAIL gold sparingly and intentionally.

The page should feel like one continuous system where:
- the background creates movement,
- sections create rhythm,
- imagery creates depth,
- typography creates authority,
- animations create continuity,
- and the content remains easy to read.

---

# 39. Non-Negotiable Rules

1. Do not invent company facts.
2. Do not replace supplied brand colors with blue/teal/navy.
3. Do not use a static hero image as the entire page background.
4. Do not make the scrolled header full-bleed.
5. Do not create a giant footer.
6. Do not make every section identical.
7. Do not use fake photos.
8. For every specified image location, display **IMAGE WILL BE HERE** until real assets are supplied.
9. Do not ignore Arabic RTL behavior.
10. Do not optimize desktop at the expense of mobile.
11. Do not add heavy animation that harms performance.
12. Do not expose private secrets.
13. Do not ship placeholder TODO functionality.
14. The project must compile and be deployable.
15. Prefer clean, maintainable Angular architecture over unnecessary abstraction.

---

# 40. Antigravity Execution Instruction

Do not merely describe the implementation.

**Actually implement the full project.**

Start by creating the Angular application structure, then implement:
1. design tokens,
2. global animated environment,
3. layout shell,
4. header/navigation,
5. hero,
6. all content sections,
7. image placeholder system,
8. bilingual service,
9. contact form,
10. footer,
11. responsive behavior,
12. SEO/accessibility,
13. production optimization,
14. deployment files,
15. README.

After implementation:
- run the production build,
- fix all compiler and runtime errors,
- verify there is no horizontal overflow,
- verify EN/AR switching,
- verify header scroll state,
- verify section navigation,
- verify mobile layout,
- verify reduced-motion mode,
- verify placeholders are visible,
- verify form validation,
- verify production build output.

Do not stop at scaffolding.
Do not provide pseudo-code instead of implementation.
Do not leave sections as empty placeholders except the intentionally requested image placeholders.

The expected final result is a **fully deployable Angular website** that matches this specification and design direction.
