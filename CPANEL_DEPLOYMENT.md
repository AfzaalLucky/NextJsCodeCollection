# cPanel Deployment Guide

## Architecture on cPanel
```
yourdomain.com         → Next.js frontend  (Node.js app, port 3000)
api.yourdomain.com     → NestJS backend    (Node.js app, port 3001)
yourdomain.com/wp-json → WordPress REST API (already on cPanel)
```

---

## Step 1: Prepare Local Builds

### Build NestJS
```bash
cd backend-nestjs
npm install
npm run build
# Output: dist/ folder
```

### Build Next.js
```bash
cd frontend-nextjs
npm install
npm run build
# Output: .next/ folder
```

---

## Step 2: Upload Files to cPanel

### Via File Manager or FTP

**NestJS** → Upload to: `~/nestjs-api/`
Upload these folders/files:
- `dist/` (built output)
- `package.json`
- `package-lock.json`
- `.env` (create from .env.example)
- `ecosystem.config.js`

**Next.js** → Upload to: `~/nextjs-app/`
Upload these folders/files:
- `.next/` (built output)
- `public/`
- `package.json`
- `package-lock.json`
- `.env` (create from .env.example)
- `ecosystem.config.js`
- `next.config.js`

---

## Step 3: Setup Node.js Apps in cPanel

### For NestJS API (api.yourdomain.com)

1. cPanel → **Setup Node.js App**
2. Click **Create Application**
3. Fill in:
   - **Node.js version**: 20.x (LTS)
   - **Application mode**: Production
   - **Application root**: `nestjs-api`
   - **Application URL**: `api.yourdomain.com`
   - **Application startup file**: `dist/main.js`
4. Click **Create**
5. Click **Run NPM Install** (installs production deps)
6. Set environment variables (click "+" to add each):
   ```
   NODE_ENV=production
   PORT=3001
   WP_BASE_URL=https://yourdomain.com
   WP_API_URL=https://yourdomain.com/wp-json/wp/v2
   WP_USERNAME=your_wp_username
   WP_APP_PASSWORD=your_wp_app_password
   API_KEY=your_secure_api_key
   ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   CACHE_TTL=300
   ```
7. Click **Restart**

### For Next.js Frontend (yourdomain.com)

1. cPanel → **Setup Node.js App**
2. Click **Create Application**
3. Fill in:
   - **Node.js version**: 20.x (LTS)
   - **Application mode**: Production
   - **Application root**: `nextjs-app`
   - **Application URL**: `yourdomain.com`
   - **Application startup file**: `node_modules/.bin/next` (args: `start`)
     > If startup file field doesn't support args, use a wrapper: see Step 3b
4. Click **Create**
5. Click **Run NPM Install**
6. Set environment variables:
   ```
   NODE_ENV=production
   PORT=3000
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=Dubai Movers Pro
   NEST_API_URL=https://api.yourdomain.com
   NEST_API_KEY=your_secure_api_key
   ```
7. Click **Restart**

### Step 3b: Next.js Startup Wrapper (if needed)

Create `~/nextjs-app/server.js`:
```js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Next.js ready on port ${port}`);
  });
});
```
Then set **Application startup file** to `server.js`.

---

## Step 4: Configure Subdomains & SSL

1. cPanel → **Subdomains** → Create `api.yourdomain.com`
   - Set document root to the NestJS app folder

2. cPanel → **SSL/TLS** → Enable AutoSSL for both domains

3. cPanel → **Redirects** → Force `http://` → `https://`

---

## Step 5: Verify Everything

```bash
# Test NestJS API
curl https://api.yourdomain.com/api/services

# Test Next.js
curl https://yourdomain.com

# Test sitemap
curl https://yourdomain.com/sitemap.xml
```

---

## Updating the App

```bash
# 1. Build locally
cd backend-nestjs && npm run build
cd frontend-nextjs && npm run build

# 2. Upload new dist/ or .next/ via FTP

# 3. In cPanel Node.js App → Restart the app
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| API returns 502 | Check NestJS env vars, especially WP_API_URL |
| Pages show empty | Check NEST_API_URL in Next.js env |
| CORS error | Add your domain to ALLOWED_ORIGINS in NestJS |
| Static pages stale | Trigger ISR revalidation or rebuild + redeploy |
| WP REST 401 | Check WP_USERNAME and WP_APP_PASSWORD |
