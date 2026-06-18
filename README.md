# KaamSetu - Voice-First Blue Collar Job Portal 🇮🇳

> India's first bilingual (Hindi/English) voice-powered job portal for blue-collar workers

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2020-yellow?logo=javascript)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan?logo=tailwindcss)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 5 minutes
- **[PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)** - Comprehensive project documentation
- **[COMPONENT_API.md](./COMPONENT_API.md)** - Component reference and API docs
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to Vercel, Netlify, and more

## ✨ Features

- 🎤 **Voice-First Interface** - AI-powered resume creation via voice
- 🌐 **Bilingual** - Complete Hindi & English support
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- ⚡ **Fast & Modern** - Built with React 18 + Vite
- 🎨 **Beautiful UI** - Tailwind CSS + shadcn/ui components
- ✨ **Smooth Animations** - Motion (Framer Motion) powered
- ♿ **Accessible** - WCAG compliant components

## 🛠️ Tech Stack

- **Framework:** React 18 with JavaScript (JSX)
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Components:** shadcn/ui (Radix UI) + Material UI
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React + MUI Icons
- **Date Handling:** date-fns

## 📂 Project Structure

```
src/
├── app/
│   ├── App.jsx                 # Main app component
│   └── components/             # Removed (consolidated)
├── shared/                     # Shared components
│   ├── common/
│   │   └── LanguageModal.jsx   # Language selector modal
│   ├── layout/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── Footer.jsx          # Footer
│   └── index.ts                # Barrel exports
├── lib/
│   └── ui/                     # shadcn/ui components (47 files)
├── features/
│   ├── auth/                   # Authentication features
│   ├── landing/                # Landing page sections
│   │   └── components/
│   │       ├── HeroSection.jsx
│   │       ├── HowItWorks.jsx
│   │       ├── JobCategories.jsx
│   │       ├── FeaturedJobs.jsx
│   │       ├── LanguageSection.jsx
│   │       ├── EmployerSection.jsx
│   │       ├── SuccessStories.jsx
│   │       └── CTABanner.jsx
│   └── profile/                # Profile features
├── assets/                     # Images and static files
├── styles/
│   └── index.css               # Global styles
└── main.jsx                    # Entry point
```

## 🎨 Sections

1. **Hero** - Voice-first job search introduction
2. **How It Works** - 3-step process (Speak → AI → Get Hired)
3. **Job Categories** - 6 popular blue-collar categories
4. **Featured Jobs** - Top job listings with details
5. **Language** - Multilingual support showcase
6. **Employers** - Value proposition for businesses
7. **Success Stories** - Worker testimonials
8. **CTA** - Final call-to-action
9. **Footer** - Links and information

## 🧩 Key Components

### Bilingual Support
Every component supports Hindi and English with easy toggling:
```tsx
const t = {
  en: { title: "Get Hired" },
  hi: { title: "नौकरी पाएं" }
};
```

### Animations
Scroll-triggered animations for smooth UX:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
/>
```

### Responsive Design
Mobile-first Tailwind classes:
```tsx
className="text-sm md:text-base lg:text-lg"
```

## 🚀 Build & Deploy

```bash
# Production build
npm run build

# Preview build
npm run preview
```

**Deploy to:**
- ⚡ Vercel (Recommended) - `vercel --prod`
- 🌐 Netlify - `netlify deploy --prod`
- 📄 GitHub Pages - `npm run deploy`
- 🔥 Firebase - `firebase deploy`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides.

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 PWA Ready

Convert to Progressive Web App by adding:
- `manifest.json`
- Service Worker
- Offline support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

Private project - All rights reserved

## 🙏 Acknowledgments

- Icons: [Lucide](https://lucide.dev)
- UI Components: [shadcn/ui](https://ui.shadcn.com)
- Images: [Unsplash](https://unsplash.com)

---

**Made with ❤️ for India's workforce**
  