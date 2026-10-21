# Fiyinfoluwa Tomiwa IKUYAJOLU — Portfolio

A modern, high-converting portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **Framer Motion** and **Lenis** smooth scrolling. Light & dark themes, Webflow-style scroll animations, and a booking form that emails you through **Nodemailer + Gmail**.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Email setup (Nodemailer + Gmail)

All settings live in **`.env.local`** (already created — it's git-ignored).

1. Turn on **2-Step Verification** for `mdigital1196@gmail.com`.
2. Create an **App Password**: https://myaccount.google.com/apppasswords
3. Paste the 16-character password into `GMAIL_APP_PASSWORD` in `.env.local`.
4. Restart `npm run dev`.

When someone submits the booking form you get a styled email (with Reply / WhatsApp buttons) and they get an automatic confirmation.

| Variable | What it does |
| --- | --- |
| `GMAIL_USER` | Gmail address that sends the emails |
| `GMAIL_APP_PASSWORD` | Gmail App Password (not your normal password) |
| `SMTP_HOST` / `SMTP_PORT` | `smtp.gmail.com` / `465` |
| `CONTACT_TO_EMAIL` | Where booking requests are delivered |
| `CONTACT_FROM_NAME` | Sender name shown in the inbox |
| `NEXT_PUBLIC_SITE_URL` | Your live domain (used for SEO, sitemap, OG image) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email shown on the site |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number, digits only (`2348145488504`) |
| `NEXT_PUBLIC_CALENDLY_URL` | Optional — adds a "Book a call" scheduling link |

> On Vercel: add the same variables under **Project → Settings → Environment Variables**.

## Editing content

| File | What's inside |
| --- | --- |
| `src/data/site.ts` | Name, role, contact details, social links, nav |
| `src/data/projects.ts` | Your 13 website projects (case-study text, colors, featured flag) |
| `src/data/content.ts` | Services, process, pricing, FAQ, comparison table, testimonials |
| `public/images/fiyinfoluwa.jpg` | Your portrait — replace with a larger photo any time |
| `public/projects/` | Project screenshots (`<slug>.jpg` + `<slug>-mobile.jpg`) |

- **Pricing**: the starting prices are placeholders — edit them in `content.ts` or set `showPrices = false`.
- **Testimonials**: add real client quotes to `testimonials` in `content.ts` and the section appears automatically.
- **New project**: add an entry to `projects.ts`, then run `npm run capture -- <slug>` to grab its screenshots.

## Refresh project screenshots

```bash
npm run capture               # all projects
npm run capture -- sea-moss-me
```

Uses your installed Microsoft Edge or Chrome. Desktop shots are 1440×900; mobile shots power the phone mockups on case-study pages (set `mobile: true` on a project once its `-mobile.jpg` exists).

## Pages

- `/` — Home: hero, client marquee, stacked featured work, horizontal project gallery, services, stats, process, about, comparison, pricing, FAQ, booking
- `/work` — All projects with category filter
- `/work/[slug]` — Case study for each project
- `/contact` — Booking form, email & WhatsApp options
- `/api/contact` — Nodemailer endpoint (honeypot + rate limiting)
- SEO: metadata, Open Graph image, `sitemap.xml`, `robots.txt`, JSON-LD schema

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com). Add the environment variables, set `NEXT_PUBLIC_SITE_URL` to your domain, and deploy.
