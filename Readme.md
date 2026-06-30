🚀 Master Prompt: Headless WordPress + NestJS Service Business (SEO + SSG)

You are a senior full-stack architect and developer.

I want to build a service-based business website using:

WordPress (Headless CMS)
NestJS (Backend API layer)
Next.js (Frontend with SSG/ISR for SEO)
Local development environment (Windows)
SEO-first architecture (Google-friendly, fast, static generation)
🎯 Project Goal

Build a scalable, SEO-optimized service business platform where:

WordPress is used only as a CMS (no frontend rendering)
NestJS acts as a secure API gateway between frontend and WordPress
Next.js renders pages using SSG/ISR for SEO performance
All services, pages, blogs, and metadata are SEO optimized
Fully working in local environment first (XAMPP / LocalWP / Docker optional)
🧠 Core Requirements
1. Architecture Rules
WordPress = Headless CMS only (REST API or WPGraphQL)
NestJS = Middleware API (auth, caching, data shaping)
Next.js = Frontend (SSG + ISR for SEO pages)
No direct frontend calls to WordPress (must go through NestJS)
2. SEO Requirements (Very Important)

Implement:

Static Site Generation (SSG)
Incremental Static Regeneration (ISR)
Dynamic meta tags (title, description, OG tags)
Sitemap.xml generation
robots.txt
Canonical URLs
Schema markup (LocalBusiness / Service / Article)
Clean URL structure:
/services/packing
/blog/how-to-pack-house
/locations/dubai-movers
3. Tech Stack
WordPress (CMS)
NestJS (API backend)
Next.js (frontend)
MySQL (WordPress DB)
Redis (optional caching layer in NestJS)
Axios (API calls)
Tailwind CSS (UI)
📁 Required Folder Structure

Create a professional monorepo structure:

project-root/
│
├── cms-wordpress/              # WordPress headless CMS
│   ├── wp-content/
│   ├── themes/
│   ├── plugins/
│   └── docker/ (optional)
│
├── backend-nestjs/             # API Layer
│   ├── src/
│   │   ├── modules/
│   │   │   ├── services/
│   │   │   ├── posts/
│   │   │   ├── pages/
│   │   │   ├── seo/
│   │   │   └── common/
│   │   ├── config/
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── test/
│   └── .env
│
├── frontend-nextjs/            # SEO frontend
│   ├── pages/ or app/
│   │   ├── index.tsx
│   │   ├── services/[slug].tsx
│   │   ├── blog/[slug].tsx
│   │   ├── locations/[slug].tsx
│   │   └── _app.tsx
│   ├── components/
│   ├── lib/
│   │   ├── api.ts
│   │   ├── seo.ts
│   │   └── sitemap.ts
│   ├── styles/
│   └── next.config.js
│
├── shared/                     # Shared types/interfaces
│   ├── types/
│   └── dto/
│
├── docker/
│   ├── wordpress.yml
│   ├── nestjs.yml
│   └── nextjs.yml
│
└── README.md
🧩 Step-by-Step Implementation Plan
STEP 1: Setup Local Environment
Install WordPress locally (XAMPP or LocalWP)
Enable REST API or install WPGraphQL plugin
Create basic content types:
Services
Blog Posts
Pages
Locations
STEP 2: Setup NestJS Backend

Create NestJS project:

Modules:
WordPressModule (API integration)
ServicesModule
PostsModule
SeoModule

Responsibilities:

Fetch data from WordPress
Transform API responses
Add caching layer
Protect API endpoints (optional JWT or API key)
Centralized SEO metadata generator
STEP 3: Setup Next.js Frontend

Create Next.js app with:

SSG for:
Services pages
Blog pages
Location pages
ISR for:
Blog updates
Service updates

Pages:

Home page
Services listing
Service detail page
Blog listing
Blog detail page
Location-based landing pages
STEP 4: API Flow

Frontend → NestJS → WordPress

Example:

Next.js page
   ↓
NestJS API (/services)
   ↓
WordPress REST API / GraphQL
STEP 5: SEO Implementation

Implement:

Dynamic metadata in Next.js:
title
description
open graph
twitter cards
Sitemap generation in NestJS or Next.js
Schema.org structured data:
LocalBusiness
Service
BlogPosting
STEP 6: Performance Optimization
Enable caching in NestJS
Use ISR for frequently updated pages
Optimize images via Next.js Image component
Lazy loading components
STEP 7: Deployment Strategy (Local First)

Start local:

WordPress on localhost
NestJS on port 3001
Next.js on port 3000

Later upgrade to:

VPS (DigitalOcean / AWS / Hostinger)
Nginx reverse proxy
SSL setup
🧪 Expected Output From You (AI)

You must generate:

Full folder structure (already defined above, improve if needed)
Step-by-step setup commands
NestJS API boilerplate code
Next.js SSG page examples
WordPress API integration examples
SEO implementation code (meta + sitemap + schema)
Local development setup guide
Best practices for scalability
⚠️ Constraints
Must work in local Windows environment
Must be production scalable
Must be SEO optimized from day 1
Must avoid direct WordPress frontend coupling
Must follow clean architecture principles

✅ Generate full NestJS starter code (ready to run)
✅ Generate Next.js SEO SSG boilerplate
✅ Or design a complete database + content model for your service business (Dubai movers niche)