# How to Create Content by Type in WordPress

Your WordPress is at: http://localhost:81/cms/wp-admin

---

## Content Type Map

| What you want on the site | WordPress post type | URL in Next.js |
|---|---|---|
| Blog article | Posts (default) | `/blog/your-post-slug` |
| Service page (Packing, Moving…) | Services (CPT) | `/services/your-service-slug` |
| City landing page (Dubai, Sharjah…) | Locations (CPT) | `/locations/your-city-slug` |

---

## 1. Creating a Blog Post

1. WP Admin → **Posts** → **Add New**
2. Add title, write content in the editor
3. Set a **Category** (right sidebar) — e.g. "Packing Tips", "Moving Guide"
4. Set a **Featured Image** (right sidebar, bottom)
5. Fill in **Yoast SEO** fields (below editor) — title + meta description
6. Click **Publish**

### Creating Categories (for blog filtering)
1. WP Admin → **Posts** → **Categories**
2. Add name: `Packing Tips`, slug: `packing-tips`
3. Add as many as needed: `Moving Guide`, `Storage Tips`, `UAE Locations`
4. Assign them when writing posts

**Result in Next.js:**
- `/blog` shows all posts
- `/blog/category/packing-tips` shows only posts in "Packing Tips"

---

## 2. Creating a Service

> Requires `services` CPT to be registered — see WORDPRESS_SETUP.md

1. WP Admin → **Services** → **Add New**
2. Add title: e.g. "Professional Packing Services"
3. Slug will auto-generate: `professional-packing-services`
4. Write content in the editor
5. Set Featured Image
6. Fill in ACF fields (right sidebar or below editor):
   - **Icon**: paste emoji or icon code — e.g. `📦`
   - **Price**: e.g. `From AED 299`
   - **Features**: add repeater rows — e.g. `Free boxes`, `Bubble wrap included`
7. Publish

**Result in Next.js:** `/services/professional-packing-services`

---

## 3. Creating a Location Page

> Requires `locations` CPT to be registered — see WORDPRESS_SETUP.md

1. WP Admin → **Locations** → **Add New**
2. Title: e.g. "Dubai Marina Movers"
3. Slug: `dubai-marina`
4. Content: write area-specific copy
5. ACF fields:
   - **City**: `Dubai Marina`
   - **Region**: `Dubai`
   - **Phone**: `+971-50-XXX-XXXX`
6. Publish

**Result in Next.js:** `/locations/dubai-marina`

---

## 4. How the API Flow Works

```
WordPress Admin (you create content)
         ↓
WordPress REST API
  http://localhost:81/cms/wp-json/wp/v2/posts
  http://localhost:81/cms/wp-json/wp/v2/services
  http://localhost:81/cms/wp-json/wp/v2/locations
  http://localhost:81/cms/wp-json/wp/v2/categories
         ↓
NestJS API (port 3001) — proxies + transforms
  GET /api/posts                    → all blog posts
  GET /api/posts?category=packing   → posts in "packing" category
  GET /api/posts/:slug              → single post
  GET /api/services                 → all services
  GET /api/services/:slug           → single service
  GET /api/locations/:slug          → single location
  GET /api/categories               → list of categories
         ↓
Next.js (port 3000) — fetches from NestJS, renders pages
  /blog                        → all posts
  /blog/category/packing-tips  → filtered by category (SSG)
  /services                    → all services
  /services/packing            → single service
  /locations/dubai             → single location
```

---

## 5. Quick Test

After creating a post, test the API directly:

```bash
# All posts
curl http://localhost:3001/api/posts -H "x-api-key: dev-key"

# Posts in category "packing-tips"
curl "http://localhost:3001/api/posts?category=packing-tips" -H "x-api-key: dev-key"

# All categories
curl http://localhost:3001/api/categories -H "x-api-key: dev-key"

# All services
curl http://localhost:3001/api/services -H "x-api-key: dev-key"
```

> In development (`NODE_ENV=development`) with no `API_KEY` set, the API key guard is skipped automatically.
