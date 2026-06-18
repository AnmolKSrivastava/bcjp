# KaamSetu - Tech Stack Overview

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      KaamSetu Landing Page                    │
│                   (React 18 + TypeScript)                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                            │
        ▼                                            ▼
┌───────────────┐                          ┌──────────────────┐
│   Vite 5      │                          │  Tailwind CSS 3  │
│  Build Tool   │                          │     Styling      │
│  ⚡ Fast HMR  │                          │  🎨 Utilities    │
└───────────────┘                          └──────────────────┘
        │                                            │
        └─────────────────────┬─────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   App.tsx       │
                    │  (Main Entry)   │
                    │  - Lang State   │
                    │  - Routing      │
                    └─────────────────┘
                              │
                              │
        ┌─────────────────────┴─────────────────────────────────┐
        │                     Components                          │
        ├─────────────────────────────────────────────────────────┤
        │                                                          │
        │  1. LanguageModal  ────────────► First Visit           │
        │                                                          │
        │  2. Navbar         ────────────► Navigation            │
        │                                                          │
        │  3. HeroSection    ────────────► Landing               │
        │                                                          │
        │  4. HowItWorks     ────────────► Process               │
        │                                                          │
        │  5. JobCategories  ────────────► Categories            │
        │                                                          │
        │  6. FeaturedJobs   ────────────► Listings              │
        │                                                          │
        │  7. LanguageSection ───────────► Multilingual          │
        │                                                          │
        │  8. EmployerSection ───────────► For Businesses        │
        │                                                          │
        │  9. SuccessStories  ───────────► Testimonials          │
        │                                                          │
        │  10. CTABanner     ────────────► Final CTA             │
        │                                                          │
        │  11. Footer        ────────────► Footer Links          │
        │                                                          │
        └──────────────────────────────────────────────────────────┘
                              │
                              │
        ┌─────────────────────┴─────────────────────┐
        │                                            │
        ▼                                            ▼
┌──────────────────┐                      ┌────────────────────┐
│  UI Components   │                      │    Libraries       │
│  (shadcn/ui)     │                      │                    │
│  - Button        │                      │  - Motion          │
│  - Card          │                      │  - Lucide Icons    │
│  - Dialog        │                      │  - date-fns        │
│  - Input         │                      │  - clsx            │
│  - Select        │                      │  - MUI             │
│  - 40+ more      │                      │                    │
└──────────────────┘                      └────────────────────┘
```

---

## 📦 Dependency Tree

```
KaamSetu
├── react (18.x) ─────────────────► Core framework
├── react-dom (18.x) ─────────────► DOM rendering
├── typescript (5.x) ─────────────► Type safety
│
├── vite (5.x) ───────────────────► Build tool
│   └── @vitejs/plugin-react ────► React plugin
│
├── tailwindcss (3.x) ────────────► Styling
│   ├── @tailwindcss/vite ───────► Vite integration
│   └── postcss ──────────────────► CSS processing
│
├── motion (12.x) ────────────────► Animations
│   └── (successor to framer-motion)
│
├── @radix-ui/* ──────────────────► UI Primitives (shadcn/ui)
│   ├── react-dialog
│   ├── react-dropdown-menu
│   ├── react-select
│   ├── react-tabs
│   └── 30+ more components
│
├── @mui/material (7.x) ──────────► Additional UI
│   └── @mui/icons-material ──────► MUI icons
│
├── lucide-react (0.x) ───────────► Icon library
│
├── date-fns (3.x) ───────────────► Date utilities
│
└── Utilities
    ├── clsx ─────────────────────► Conditional classes
    ├── class-variance-authority ► CVA for variants
    ├── embla-carousel-react ─────► Carousels
    └── canvas-confetti ──────────► Celebrations
```

---

## 🔄 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  App Component  │
                    │                 │
                    │  State:         │
                    │  - lang         │
                    │  - showModal    │
                    └─────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ First Visit │  │   Toggle    │  │   Persist   │
    │             │  │  Language   │  │  to Storage │
    │ Show Modal  │  │             │  │             │
    └─────────────┘  └─────────────┘  └─────────────┘
              │               │               │
              └───────────────┼───────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  LocalStorage   │
                    │                 │
                    │  Key:           │
                    │  kaamsetu-lang  │
                    │  Value: hi|en   │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Pass lang prop │
                    │  to all child   │
                    │  components     │
                    └─────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
        [Component 1]   [Component 2]   [Component 3]
              │               │               │
              ▼               ▼               ▼
        Get text from   Get text from   Get text from
        translation     translation     translation
        object t[lang]  object t[lang]  object t[lang]
```

---

## 🎨 Component Hierarchy

```
App
│
├── LanguageModal (conditional)
│   └── Language selection buttons
│
└── Main Content (when lang is selected)
    │
    ├── Navbar
    │   ├── Logo
    │   ├── Navigation Links
    │   ├── Language Toggle
    │   └── Mobile Menu
    │
    ├── main
    │   │
    │   ├── HeroSection
    │   │   ├── Badge
    │   │   ├── Headline
    │   │   ├── CTA Buttons
    │   │   ├── Feature Chips
    │   │   └── Worker Images
    │   │
    │   ├── HowItWorks
    │   │   ├── Section Header
    │   │   └── Step Cards (x3)
    │   │       ├── Icon
    │   │       ├── Title
    │   │       └── Description
    │   │
    │   ├── JobCategories
    │   │   ├── Section Header
    │   │   └── Category Cards (x6)
    │   │       ├── Image
    │   │       ├── Name
    │   │       └── Job Count
    │   │
    │   ├── FeaturedJobs
    │   │   ├── Section Header
    │   │   └── Job Cards (x4)
    │   │       ├── Icon
    │   │       ├── Title & Company
    │   │       ├── Details (location, type)
    │   │       └── Action Buttons
    │   │
    │   ├── LanguageSection
    │   │   ├── Language Badges (x6)
    │   │   └── Phone Mockup
    │   │       └── Voice Animation
    │   │
    │   ├── EmployerSection
    │   │   ├── Dashboard Mockup
    │   │   │   ├── Stats
    │   │   │   └── Candidate List
    │   │   └── Feature List
    │   │
    │   ├── SuccessStories
    │   │   ├── Story Cards (x3)
    │   │   │   ├── Quote
    │   │   │   ├── Rating
    │   │   │   ├── Profile
    │   │   │   └── Salary Badge
    │   │   └── Stats Bar
    │   │
    │   └── CTABanner
    │       ├── Headline
    │       ├── CTA Buttons
    │       └── Worker Image
    │
    └── Footer
        ├── Brand Section
        ├── Workers Links
        ├── Employers Links
        └── Copyright
```

---

## 🔌 Integration Points (Future)

```
Current State (Frontend Only)
┌─────────────────────────────┐
│     KaamSetu Frontend       │
│     (React + Vite)          │
│                             │
│  - Static content           │
│  - Client-side routing      │
│  - Local state management   │
│  - No API calls yet         │
└─────────────────────────────┘


Future State (Full Stack)
┌─────────────────────────────┐
│     KaamSetu Frontend       │
│     (React + Vite)          │
└──────────┬──────────────────┘
           │ REST/GraphQL API
           ▼
┌─────────────────────────────┐
│      Backend Server         │
│   (Node.js + Express)       │
│                             │
│  Endpoints:                 │
│  - POST /api/jobs           │
│  - GET  /api/jobs           │
│  - POST /api/resume/voice   │
│  - POST /api/auth/login     │
└──────────┬──────────────────┘
           │
           ▼
┌─────────────────────────────┐
│       Database              │
│  (MongoDB/PostgreSQL)       │
│                             │
│  Collections:               │
│  - users                    │
│  - jobs                     │
│  - applications             │
│  - companies                │
└─────────────────────────────┘
```

---

## 📊 File Size Breakdown

```
Component Files (JS/TSX)
├── App.tsx                   2 KB
├── Navbar.tsx                5 KB
├── HeroSection.tsx           6 KB
├── HowItWorks.tsx            4 KB
├── JobCategories.tsx         5 KB
├── FeaturedJobs.tsx          6 KB
├── LanguageSection.tsx       6 KB
├── EmployerSection.tsx       7 KB
├── SuccessStories.tsx        7 KB
├── CTABanner.tsx             5 KB
├── Footer.tsx                4 KB
├── LanguageModal.tsx         4 KB
└── UI Components (40+)      80 KB
                    Total:  ~140 KB

Build Output (Production)
├── HTML                      2 KB
├── JavaScript (minified)   350 KB
├── CSS (minified)           50 KB
└── Vendor (React, etc.)    200 KB
                    Total:  ~600 KB
                 Gzipped:  ~150 KB
```

---

## 🎯 Performance Optimization Strategy

```
Development Mode
    ├── Hot Module Replacement (HMR)
    ├── Fast Refresh
    └── Source Maps for debugging

Production Build
    ├── Code Splitting
    │   ├── Main bundle
    │   ├── Vendor bundle (React, etc.)
    │   └── Dynamic imports (future)
    │
    ├── Minification
    │   ├── JavaScript (Terser)
    │   ├── CSS (cssnano)
    │   └── HTML (minify)
    │
    ├── Tree Shaking
    │   └── Remove unused code
    │
    ├── Asset Optimization
    │   ├── Image optimization
    │   └── Font subsetting
    │
    └── Gzip/Brotli Compression
        └── Server-level compression
```

---

## 🚀 Deployment Flow

```
Local Development
     │
     │ npm run build
     ▼
  Build Process (Vite)
     │
     │ Outputs to dist/
     ▼
Production Bundle
     │
     ├─► Vercel
     │   ├── Push to GitHub
     │   ├── Auto-deploy on commit
     │   └── CDN distribution
     │
     ├─► Netlify
     │   ├── Drag & drop dist/
     │   └── CDN distribution
     │
     ├─► GitHub Pages
     │   ├── gh-pages branch
     │   └── GitHub CDN
     │
     ├─► Firebase
     │   ├── firebase deploy
     │   └── Firebase CDN
     │
     └─► AWS S3 + CloudFront
         ├── Upload to S3
         └── CloudFront CDN
```

---

## 🔐 Security Considerations

```
Current Implementation
├── No sensitive data stored
├── Client-side only (no backend yet)
├── localStorage for preferences only
└── External images from trusted CDNs

Future Implementation (when adding backend)
├── Authentication
│   ├── JWT tokens
│   ├── OAuth integration
│   └── Secure cookie storage
│
├── API Security
│   ├── HTTPS only
│   ├── CORS configuration
│   ├── Rate limiting
│   └── Input validation
│
├── Data Protection
│   ├── Encrypted passwords (bcrypt)
│   ├── Sensitive data encryption
│   └── GDPR compliance
│
└── Voice Data
    ├── Encrypted transmission
    ├── Temporary storage only
    └── User consent required
```

---

## 📱 Responsive Breakpoints

```
Mobile Devices (320px - 639px)
    │
    ├── Stack all sections vertically
    ├── Single column layouts
    ├── Mobile menu (hamburger)
    ├── Touch-optimized buttons
    └── Reduced animations

Tablets (640px - 1023px)
    │
    ├── 2-column layouts
    ├── Larger typography
    ├── Show navigation menu
    └── Full animations

Desktop (1024px+)
    │
    ├── 3-column layouts
    ├── Side-by-side content
    ├── Hover effects
    ├── Full features
    └── Optimal spacing

Large Screens (1280px+)
    │
    ├── Max width constraints
    ├── Centered content
    └── Enhanced visuals
```

---

**This is your complete tech stack overview!**

For more details, see:
- [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for complete documentation
- [COMPONENT_API.md](./COMPONENT_API.md) for component details
- [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guides
