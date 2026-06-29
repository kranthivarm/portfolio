# Kranthi — Developer Portfolio

A professional portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 16 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Email:** Resend (for contact form)
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install dependencies

```bash
npm install
```

### Environment variables

Copy the `.env.local` file and fill in your values:

```bash
# Contact form email recipient
CONTACT_EMAIL=your@email.com

# Resend API key (get one at https://resend.com)
# Leave empty for dev — submissions log to console
RESEND_API_KEY=
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel dashboard:
   - `CONTACT_EMAIL` — your email address
   - `RESEND_API_KEY` — your Resend API key
4. Deploy

## Where to Fill In Personal Details

### Project Data — `src/data/projects.ts`

- **Connectify**: Update `tags` and `modalDescription` with your actual stack and details (marked with `[FILL IN]`)
- **All projects**: Replace placeholder `liveUrl`, `githubUrl`, and `imageUrl` with actual values (marked with `/* TODO: replace */`)

### Education — `src/components/sections/Education.tsx`

- Replace `[Institution Name]` and `[Graduation Year]` with your actual details

### Contact & Social Links — `src/components/sections/Contact.tsx`

- LinkedIn, GitHub, email, and phone links are pre-filled with the provided URLs
- Update if they change

### SEO & Domain — Multiple files

- `src/app/layout.tsx` — Update `openGraph.url` with your actual domain
- `src/app/sitemap.ts` — Update `BASE_URL` with your actual domain
- `src/app/robots.ts` — Update sitemap URL with your actual domain
- Add an `og-image.png` (1200×630px) to the `public/` directory

### Project Images

- Add project screenshots to `public/projects/` directory
- Files should be named: `killscroll.png`, `tunetogether.png`, `gaminghub.png`, `connectify.png`, `coding-platform.png`, `bookmind.png`

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts    ← Contact form handler
│   ├── globals.css             ← Design system & tokens
│   ├── layout.tsx              ← Root layout with fonts & metadata
│   ├── page.tsx                ← Main page (assembles sections)
│   ├── robots.ts               ← SEO robots.txt
│   └── sitemap.ts              ← SEO sitemap
├── components/
│   ├── ui/
│   │   ├── Badge.tsx           ← Tech tag pills
│   │   ├── Button.tsx          ← Polymorphic button/link
│   │   ├── Modal.tsx           ← Accessible modal
│   │   └── SectionWrapper.tsx  ← Scroll-triggered animations
│   ├── sections/
│   │   ├── Hero.tsx            ← Hero with animated dot grid
│   │   ├── Services.tsx        ← Five capability tiles
│   │   ├── Projects.tsx        ← Filterable project grid + modal
│   │   ├── Skills.tsx          ← Tech stack grid
│   │   ├── About.tsx           ← Bio with availability badge
│   │   ├── Education.tsx       ← Academic background
│   │   └── Contact.tsx         ← Contact form + social links
│   ├── Navbar.tsx              ← Sticky nav with scroll spy
│   └── Footer.tsx              ← Copyright footer
└── data/
    ├── projects.ts             ← Project data (typed)
    └── skills.ts               ← Skill categories
```

## License

© 2025 Kranthi. All rights reserved.
