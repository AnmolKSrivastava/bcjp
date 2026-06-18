# KaamSetu - Blue Collar Job Portal

## 🚀 Project Overview

**KaamSetu** is a voice-first job portal designed specifically for India's blue-collar workforce. The platform enables workers to create resumes and find jobs using voice input in Hindi or English, removing literacy barriers.

## ✨ Key Features

### 1. **Bilingual Support** (🇮🇳 Hindi & English)
- Language selection modal on first visit
- Toggle between languages anytime
- Persistent language preference

### 2. **Voice-First Approach**
- AI-powered resume creation via voice
- No traditional resume required
- Accessible to non-literate workers

### 3. **Complete Landing Page Sections**
- **Hero Section**: Eye-catching introduction with CTA buttons
- **How It Works**: 3-step process explanation
- **Job Categories**: 6 popular categories (Electrician, Plumber, Driver, etc.)
- **Featured Jobs**: Job listings with salary, location, and type
- **Language Section**: Highlighting multilingual support
- **Employer Section**: For businesses looking to hire
- **Success Stories**: Testimonials from users
- **CTA Banner**: Final call-to-action
- **Footer**: Links and information

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** with TypeScript
- **Vite** for blazing-fast development and builds

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom CSS** with design system tokens

### UI Components
- **shadcn/ui** (Radix UI primitives)
  - Accordion, Alert Dialog, Avatar, Badge
  - Button, Card, Carousel, Checkbox
  - Dialog, Dropdown Menu, Form, Input
  - Popover, Select, Sheet, Tabs, Textarea
  - Tooltip, and 20+ more components
- **Material UI** (@mui/material)
  - Additional component library
  - MUI Icons

### Animations
- **Motion** (Framer Motion successor)
  - Smooth page transitions
  - Scroll-triggered animations
  - Interactive micro-interactions

### Icons & Assets
- **Lucide React** - Beautiful icon library
- **MUI Icons Material** - Additional icons

### Additional Libraries
- **date-fns** - Date formatting
- **clsx** & **class-variance-authority** - Conditional classes
- **embla-carousel-react** - Carousel functionality
- **canvas-confetti** - Celebratory animations

## 📁 Project Structure

```
blueCollarJobPortal/
├── src/
│   ├── app/
│   │   ├── App.tsx                 # Main app component
│   │   └── components/             # Removed (restructured)
│   ├── shared/                     # Shared components
│   │   ├── common/                 # Common components
│   │   │   └── LanguageModal.tsx   # Language selector
│   │   ├── layout/                 # Layout components
│   │   │   ├── Navbar.tsx          # Navigation bar
│   │   │   └── Footer.tsx          # Footer component
│   │   └── index.ts                # Barrel exports
│   ├── lib/
│   │   ├── ui/                     # shadcn/ui components (47 files)
│   │   └── firebase.ts             # Firebase config
│   ├── features/
│   │   ├── auth/                   # Authentication features
│   │   │   └── components/
│   │   ├── landing/                # Landing page sections
│   │   │   └── components/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── HowItWorks.tsx
│   │   │       ├── JobCategories.tsx
│   │   │       ├── FeaturedJobs.tsx
│   │   │       ├── LanguageSection.tsx
│   │   │       ├── EmployerSection.tsx
│   │   │       ├── SuccessStories.tsx
│   │   │       └── CTABanner.tsx
│   │   └── profile/                # Profile features
│   │       └── components/
│   ├── assets/                     # Images and static files
│   ├── styles/
│   │   ├── index.css               # Main styles
│   │   ├── tailwind.css            # Tailwind imports
│   │   └── fonts.css               # Custom fonts
│   ├── hooks/                      # Custom React hooks
│   ├── utils/                      # Utility functions
│   └── main.tsx                    # Entry point
├── docs/
│   └── figma/                      # Figma-related documentation
├── guidelines/
│   └── Guidelines.md               # Design system guidelines
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration
├── postcss.config.mjs              # PostCSS config
├── package.json                    # Dependencies
└── README.md                       # Quick start guide
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#2563EB` - Primary actions, links
- **Orange**: `#F97316` - Accents, highlights
- **Green**: `#22C55E` - Success, positive states
- **Gray Scale**: `#0F172A` to `#F8FAFC` - Text and backgrounds

### Typography
- **Headings**: Bold, 4xl-7xl sizes
- **Body**: Regular, 16px base
- **Sans-serif** font family

### Components Style
- **Rounded corners**: 2xl (16px) for cards, xl (12px) for buttons
- **Shadows**: Subtle on hover, elevation on active states
- **Transitions**: 300ms ease for smooth interactions

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ (recommended: Node 20 LTS)
- npm, pnpm, or yarn package manager

### Installation

1. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

2. **Start development server:**
```bash
npm run dev
# or
pnpm dev
```

3. **Open in browser:**
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
# or
pnpm build
```

Build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
# or  
pnpm preview
```

## 🌐 Deployment

The built `dist/` folder can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push `dist/` to gh-pages branch
- **Firebase Hosting**: `firebase deploy`
- **AWS S3**: Upload `dist/` contents

## 📱 Responsive Design

The application is fully responsive:
- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔧 Customization

### Adding New Components

1. Create component in `src/app/components/`
2. Import in `App.tsx`
3. Add translations for both Hindi and English
4. Use existing UI components from `ui/` folder

### Changing Colors

Update color values in your Tailwind config or inline styles.

Primary color pattern: `text-[#2563EB]`, `bg-[#2563EB]`

### Adding New Sections

Follow the pattern in existing components:
```tsx
interface Props {
  lang: "hi" | "en";
}

const translations = {
  en: { /* English text */ },
  hi: { /* Hindi text */ }
};

export function NewSection({ lang }: Props) {
  const txt = translations[lang];
  return <section>...</section>;
}
```

## 🎯 Key Components Breakdown

### App.tsx
- Manages language state
- Handles localStorage persistence
- Orchestrates all sections
- Shows language modal on first visit

### HeroSection.tsx
- Main landing section
- Voice input CTA
- Feature badges
- Worker image collage

### JobCategories.tsx
- 6 category cards with images
- Hover animations
- Job count display

### FeaturedJobs.tsx
- Job listing cards
- Location, salary, type info
- Apply and Save buttons
- Badge indicators (Urgent, New, etc.)

### LanguageModal.tsx
- First-time language selection
- Smooth fade-in animation
- Sets language preference

## 🧪 Testing Checklist

- [ ] Language toggle works correctly
- [ ] All animations are smooth
- [ ] Responsive on mobile/tablet/desktop
- [ ] Images load correctly
- [ ] All buttons are clickable
- [ ] Form components work (if any)
- [ ] Language preference persists

## 🚀 Next Steps

### Phase 1: Enhancement
1. Connect to a real backend API
2. Implement actual voice recording functionality
3. Add authentication system
4. Create job application flow

### Phase 2: Features
1. User dashboard for job seekers
2. Employer dashboard
3. Resume builder with voice input
4. Job search and filters
5. Application tracking

### Phase 3: Scale
1. SMS notifications
2. WhatsApp integration
3. Mobile app (React Native)
4. Admin panel
5. Analytics dashboard

## 📄 License

Private project - All rights reserved

## 👥 Contributors

Built with ❤️ for India's blue-collar workforce
