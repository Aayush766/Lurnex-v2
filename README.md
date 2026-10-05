# lumex Website

Production-oriented Next.js App Router landing page based on the supplied reference screenshot.

## Stack

- Next.js App Router
- TypeScript
- React
- Tailwind CSS
- next/image
- Lucide React

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm run start
```

## Assets

Primary website images live in:

`public/assets/images/`

Replace:
- `herogirl.png`
- `jee.png`
- `neet.png`
- `ib.png`
- `sat.png`
- `ctaimage.png`

The current files are local fallback crops from the supplied reference because the individual source image files were not attached separately. Replace them with the original supplied assets for the intended full-resolution result.

## SEO

Edit global SEO metadata in:

`app/layout.tsx`

Edit canonical/site URL in:

`lib/seo.ts`

Structured data is in:

`lib/schema.ts`

Robots and sitemap are generated from:

`app/robots.ts`
`app/sitemap.ts`

Update `siteUrl` to the real production domain before deployment.

## Content

Course data, navigation, testimonials, programs and FAQs are centralized in:

`lib/constants.ts`

## Components

Home sections are in:

`components/home/`

Header and footer:

`components/layout/`

## Form

The final CTA form performs client-side validation and a local loading/success state. Connect the `submit` handler in `components/home/FinalCTA.tsx` to your production API when the backend is ready.

## Notes

- Only the FAQ, testimonial carousel and mobile navigation are client components.
- The main landing page and static sections remain server-rendered.
- No external image URLs are used.
- Navigation routes included in the sitemap are implemented so sitemap URLs are not intentionally broken.
