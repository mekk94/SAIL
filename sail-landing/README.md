# SAIL — Smart Automated Integrated Logistics

Premium bilingual (EN/AR) landing page for SAIL, a freight forwarding and transportation company based in Dammam, Saudi Arabia.

Built with **Angular 18+**, standalone components, signals, SCSS, and TypeScript strict mode.

---

## Features

- **Persistent Animated Background** — Canvas-based logistics network with route lines, nodes, and particles
- **Bilingual EN/AR** — Runtime language switching with full RTL support
- **Floating Navigation** — Transparent → floating rounded bar on scroll with active section indicators
- **11 Content Sections** — Each with a distinct visual composition
- **Image Placeholder System** — Reusable `<app-image-placeholder>` components ready for asset replacement
- **Contact Form** — Angular reactive forms with validation, honeypot spam protection, and EmailJS integration
- **Responsive Design** — Mobile-first with intentional layouts for all breakpoints
- **Accessibility** — WCAG 2.1 AA: keyboard navigation, focus states, `aria-describedby`, reduced-motion support
- **SEO** — Semantic HTML, OG/Twitter meta, robots.txt, sitemap.xml

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node.js)

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The dev server runs at `http://localhost:4200`.

Production build outputs to `dist/sail-landing/`.

---

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── i18n/           # Translation service + JSON dictionaries
│   │   ├── services/       # ScrollService
│   │   └── models/         # TypeScript interfaces
│   ├── shared/
│   │   ├── components/     # ImagePlaceholder, SectionLabel, Buttons, etc.
│   │   └── directives/     # SectionReveal directive
│   ├── layout/
│   │   ├── header/         # Floating header + mobile menu
│   │   ├── footer/         # Compact footer
│   │   ├── page-shell/     # Shell wrapping header + content + footer
│   │   └── ambient-background/  # Canvas animation engine
│   ├── sections/           # All 11 content sections
│   ├── app.component.ts
│   └── app.config.ts
├── environments/           # EmailJS config placeholders
├── styles/                 # SCSS tokens, mixins, animations, globals
└── index.html
```

---

## Contact Form Setup (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Create an **Email Service** (e.g., Gmail, Outlook)
3. Create an **Email Template** with these variables:
   - `{{name}}` — Sender name
   - `{{company}}` — Company
   - `{{email}}` — Sender email
   - `{{phone}}` — Phone number
   - `{{service}}` — Service selected
   - `{{message}}` — Message body
4. Copy your **Service ID**, **Template ID**, and **Public Key**
5. Update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  emailjs: {
    serviceId: 'service_xxxxxxx',
    templateId: 'template_xxxxxxx',
    publicKey: 'your_public_key'
  }
};
```

6. Uncomment the actual EmailJS send call in `contact.component.ts` and remove the simulated delay.

> **Note:** EmailJS public keys are safe to include in frontend code — they are designed to be client-facing. Never expose private/secret keys.

---

## Adding Real Images

Image placeholder components (`<app-image-placeholder>`) are used in these sections:
- Transportation
- Bus Rental
- Customs Clearance
- Warehousing
- Industries

To replace a placeholder with a real image:

1. Add your optimized image (WebP/AVIF recommended) to `src/assets/images/`
2. Replace the `<app-image-placeholder>` component with:

```html
<picture>
  <source srcset="assets/images/your-image.avif" type="image/avif">
  <source srcset="assets/images/your-image.webp" type="image/webp">
  <img
    src="assets/images/your-image.jpg"
    alt="Descriptive alt text"
    loading="lazy"
    width="800"
    height="500"
  />
</picture>
```

---

## Deployment

### Netlify

1. Connect your repository on [Netlify](https://www.netlify.com/)
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist/sail-landing/browser`
3. Add a `_redirects` file in `public/`:
   ```
   /*    /index.html   200
   ```

### Vercel

1. Import your repository on [Vercel](https://vercel.com/)
2. Framework preset: **Angular**
3. Build command: `npm run build`
4. Output directory: `dist/sail-landing/browser`
5. Add a `vercel.json`:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### Static Nginx

```nginx
server {
    listen 80;
    server_name sail-freight.com;
    root /var/www/sail-landing/browser;
    index index.html;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.emailjs.com;" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|webp|avif|svg|ico|woff2?)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml image/svg+xml;
}
```

---

## Environment Configuration

| Variable | Location | Required | Notes |
|---|---|---|---|
| `emailjs.serviceId` | `environment.prod.ts` | Yes (for form) | EmailJS service identifier |
| `emailjs.templateId` | `environment.prod.ts` | Yes (for form) | EmailJS template identifier |
| `emailjs.publicKey` | `environment.prod.ts` | Yes (for form) | EmailJS public key (safe for frontend) |

---

## Brand Colors

| Token | Value | Usage |
|---|---|---|
| Ink | `#212226` | Primary text, dark backgrounds |
| Gold | `#C4892F` | Accents, icons, CTAs, decorative details |
| Off-White | `#F6F6F6` | Page background |
| White | `#FFFFFF` | Card/panel backgrounds |
| Ink Soft | `#54565C` | Secondary text |
| Border | `#E3E3E1` | Dividers, card borders |
| Gold Hover | `#A9701F` | Hover states |

> **Accessibility:** Do not use Gold (#C4892F) as small body text on Off-White (#F6F6F6). Gold is for accents, large typography, icons, and CTA backgrounds only.

---

## License

Private — All rights reserved. SAIL © 2026.
