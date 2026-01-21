# Basic Template Website

A production-ready Next.js website template with Sanity CMS integration. Built for agencies to quickly deploy custom client websites.

## ✨ Features

### Core Features
- **Next.js 15** with App Router
- **Sanity CMS** for content management
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Responsive design** (mobile-first)
- **SEO optimized** with meta tags, Open Graph, and Twitter Cards

### Content Management
- **Site Settings** - Site name, logo, description, social links, contact info
- **Pages** - Create unlimited pages with modular sections
- **Navigation** - CMS-editable header and footer navigation
- **Section Blocks**:
  - Hero Section
  - Text/Rich Text Section
  - Features/Services Section
  - Call-to-Action (CTA) Section
  - Contact Section with form
  - FAQ Section (accordion)

### SEO & Performance
- Page-level meta titles and descriptions
- Open Graph and Twitter metadata
- Canonical URLs
- Auto-generated sitemap (`/sitemap.xml`)
- Robots file (`/robots.txt`)
- Semantic HTML structure
- Optimized images with `next/image`
- Font optimization with `next/font`
- Static generation by default

### Legal & EU Compliance
- Privacy policy page template
- Cookie consent banner (with localStorage)
- Company contact info display
- VAT/Chamber of Commerce number support

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
# Using GitHub template
gh repo create my-client-site --template your-org/basic-template

# Or clone directly
git clone https://github.com/your-org/basic-template.git my-client-site
cd my-client-site
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Sanity

1. Create a new Sanity project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

3. Update the environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Add CORS origins in Sanity:
   - Go to [sanity.io/manage](https://www.sanity.io/manage) → Your Project → API → CORS Origins
   - Add `http://localhost:3000` for development
   - Add your production URL when deploying

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 5. Access the CMS Studio

Navigate to [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

---

## 📁 Project Structure

```
├── app/
│   ├── [slug]/            # Dynamic page routes
│   ├── privacy-policy/    # Privacy policy page
│   ├── studio/            # Sanity Studio embedded
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout with header/footer
│   ├── not-found.tsx      # 404 page
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # Robots.txt generator
│   └── sitemap.ts         # Sitemap generator
│
├── components/
│   ├── layout/            # Header, Footer, MobileNav
│   ├── sections/          # Page section components
│   └── ui/                # Reusable UI components
│
├── lib/
│   └── utils.ts           # Utility functions (cn)
│
├── sanity/
│   ├── lib/               # Sanity client, queries, fetchers
│   ├── schemaTypes/       # Content schemas
│   │   ├── documents/     # Document types (page, settings, nav)
│   │   ├── objects/       # Object types (SEO, links, etc.)
│   │   └── sections/      # Section block schemas
│   └── structure.ts       # Studio structure configuration
│
├── types/
│   └── sanity.ts          # TypeScript types for content
│
├── public/                # Static assets
├── sanity.config.ts       # Sanity configuration
└── .env.example           # Environment variables template
```

---

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `app/globals.css`:

```css
:root {
  --primary-500: #3b82f6;  /* Your brand color */
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  /* ... */
}
```

### Adding New Section Types

1. Create schema in `sanity/schemaTypes/sections/`
2. Add to `sanity/schemaTypes/index.ts`
3. Add to page sections array in `sanity/schemaTypes/documents/page.ts`
4. Create component in `components/sections/`
5. Add case to `SectionRenderer.tsx`

---

## 🌐 Deployment

### Deploy to Vercel

1. Push your repository to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `NEXT_PUBLIC_SITE_URL` (your production URL)
4. Deploy!

### Update Sanity CORS

Add your production URL to Sanity CORS origins:
- Go to [sanity.io/manage](https://www.sanity.io/manage) → API → CORS Origins
- Add your Vercel URL (e.g., `https://your-site.vercel.app`)

---

## 📝 Content Setup Checklist

After deploying, set up content in the CMS Studio (`/studio`):

1. **Site Settings**
   - [ ] Add site name
   - [ ] Add site description
   - [ ] Upload logo
   - [ ] Add contact information
   - [ ] Add social media links
   - [ ] Configure cookie notice

2. **Navigation**
   - [ ] Create "Header Navigation" (identifier: `header`)
   - [ ] Create "Footer Navigation" (identifier: `footer`)
   - [ ] Add navigation items

3. **Pages**
   - [ ] Create homepage (check "Is Homepage")
   - [ ] Add About page
   - [ ] Add Services page
   - [ ] Add Contact page

---

## 🔧 Development Commands

```bash
# Development
pnpm dev          # Start dev server

# Build
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

---

## 📄 License

MIT License - feel free to use this template for client projects.

---

## 🤝 Support

For issues and feature requests, please create an issue in the repository.
