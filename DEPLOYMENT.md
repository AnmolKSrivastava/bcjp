# 🚀 Deployment Guide - KaamSetu

This guide covers deploying your React + Vite application to various hosting platforms.

## Pre-Deployment Checklist

- [ ] Test the application locally (`npm run dev`)
- [ ] Build successfully (`npm run build`)
- [ ] Preview the production build (`npm run preview`)
- [ ] Check for console errors
- [ ] Test on different devices/browsers
- [ ] Optimize images
- [ ] Update environment variables (if any)

---

## 1. Vercel (Recommended ⭐)

**Best for:** Quick deployment, automatic CI/CD, excellent DX

### Method 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite config
6. Click "Deploy"

**Configuration:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Custom Domain:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

---

## 2. Netlify

**Best for:** Simple deployment, form handling, serverless functions

### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Method 2: Drag & Drop

1. Build your project: `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `dist` folder to the upload area

### Method 3: GitHub Integration

1. Connect your GitHub repo
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

**Create `netlify.toml`** (optional):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 3. GitHub Pages

**Best for:** Free hosting for public repos

### Setup

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Update `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```ts
export default defineConfig({
  base: '/repo-name/', // Your repo name
  // ... other config
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages:
   - Go to repo Settings → Pages
   - Source: `gh-pages` branch

---

## 4. Firebase Hosting

**Best for:** Integration with Firebase services

### Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init hosting
```

Configure:
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub integration: Optional

4. Build and deploy:
```bash
npm run build
firebase deploy
```

**Create `firebase.json`**:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## 5. AWS S3 + CloudFront

**Best for:** Scalability, custom infrastructure

### Setup

1. Build your project:
```bash
npm run build
```

2. Create S3 bucket:
   - Enable static website hosting
   - Make bucket public (or use CloudFront)

3. Upload `dist/` contents to S3:
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

4. (Optional) Set up CloudFront:
   - Create CloudFront distribution
   - Point origin to S3 bucket
   - Configure error pages → `/index.html` (for SPA routing)

---

## 6. Docker Deployment

**Best for:** Containerized environments, Kubernetes

### Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Build and run:

```bash
# Build image
docker build -t kaamsetu .

# Run container
docker run -p 8080:80 kaamsetu
```

---

## 7. Azure Static Web Apps

**Best for:** Microsoft ecosystem integration

```bash
# Install Azure Static Web Apps CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy
```

Or use Azure Portal:
1. Create Static Web App resource
2. Connect GitHub repo
3. Build configuration:
   - App location: `/`
   - API location: (leave empty)
   - Output location: `dist`

---

## 8. Cloudflare Pages

**Best for:** Fast global CDN, Workers integration

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy

---

## Environment Variables

### Create `.env` file:

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=KaamSetu
```

### Access in code:

```ts
const apiUrl = import.meta.env.VITE_API_URL;
```

### Platform-specific:

**Vercel:**
- Project Settings → Environment Variables

**Netlify:**
- Site settings → Environment variables

**GitHub Pages:**
- Replace with build-time values or use GitHub Secrets

---

## Performance Optimization

### 1. Image Optimization

Replace Unsplash URLs with optimized local images:

```tsx
// Before
<img src="https://images.unsplash.com/..." />

// After
import electricianImg from '@/assets/electrician.webp';
<img src={electricianImg} loading="lazy" />
```

### 2. Code Splitting

```tsx
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <HeavyComponent />
</Suspense>
```

### 3. Bundle Analysis

```bash
# Install
npm install --save-dev rollup-plugin-visualizer

# Update vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    // ... other plugins
    visualizer({ open: true }),
  ],
});

# Build to see bundle analysis
npm run build
```

### 4. Preload Critical Assets

In `index.html`:
```html
<link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossorigin>
```

---

## CI/CD Pipeline Example (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Custom Domain Setup

### DNS Records

**For root domain (example.com):**
- Type: `A`
- Name: `@`
- Value: [Provider's IP]

**For subdomain (www.example.com):**
- Type: `CNAME`
- Name: `www`
- Value: [Provider's domain]

### SSL Certificate

Most platforms (Vercel, Netlify, Cloudflare) provide **free SSL automatically**.

---

## Monitoring & Analytics

### Add Google Analytics

1. Get GA4 tracking ID
2. Add to `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Error Tracking

Install Sentry:
```bash
npm install @sentry/react
```

Configure in `main.tsx`:
```tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-dsn",
  environment: "production",
});
```

---

## Troubleshooting

### Issue: 404 on refresh (SPA routing)

**Solution:** Configure server to serve `index.html` for all routes

**Netlify:** Already handled by redirects
**Vercel:** Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Issue: Environment variables not working

- Must start with `VITE_`
- Restart dev server after adding
- For production, set on hosting platform

### Issue: Large bundle size

- Lazy load components
- Remove unused dependencies
- Use dynamic imports
- Optimize images

---

## Cost Comparison

| Platform | Free Tier | Bandwidth | Build Time |
|----------|-----------|-----------|------------|
| Vercel | ✅ Generous | 100GB/mo | Fast |
| Netlify | ✅ Good | 100GB/mo | Fast |
| GitHub Pages | ✅ Unlimited (public) | Soft limit | N/A (manual) |
| Firebase | ✅ 10GB/mo | 360MB/day | Medium |
| Cloudflare | ✅ Unlimited | Unlimited | Fast |

---

## Recommended: Vercel

For KaamSetu, **Vercel** is recommended because:

1. ✅ Zero-config deployment
2. ✅ Automatic CI/CD from GitHub
3. ✅ Excellent performance
4. ✅ Free SSL
5. ✅ Preview deployments for PRs
6. ✅ Easy environment variable management
7. ✅ Great DX

### Quick Deploy to Vercel:

```bash
npm install -g vercel
vercel --prod
```

Done! 🎉

---

**Questions?** Check the [Vite deployment docs](https://vitejs.dev/guide/static-deploy.html)
