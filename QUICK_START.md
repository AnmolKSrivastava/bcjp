# 🚀 Quick Start Guide - KaamSetu

## Step 1: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

## Step 2: Start Development Server

```bash
npm run dev
```

You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:5173
```

## Step 4: Explore the Application

1. **Language Selection**: You'll first see a modal asking you to select Hindi or English
2. **Navigate**: Scroll through all sections of the landing page
3. **Test Features**: 
   - Click the language toggle in the navbar
   - Hover over job cards and category cards
   - Try all interactive elements

## 🔧 Development Tips

### Hot Reload
Vite provides instant hot module replacement (HMR). Save any file and see changes immediately without refreshing!

### File Locations
- **Components**: `src/app/components/`
- **Styles**: `src/styles/`
- **UI Components**: `src/app/components/ui/`

### Common Tasks

#### Change Text Content
Edit the translation objects in each component:
```tsx
const t = {
  en: { title: "Your English Text" },
  hi: { title: "आपका हिंदी टेक्स्ट" }
};
```

#### Change Colors
Update hex colors in the component files:
- Primary Blue: `#2563EB`
- Orange: `#F97316`
- Green: `#22C55E`

#### Add New Section
1. Create new file in `src/app/components/YourSection.tsx`
2. Import in `App.tsx`
3. Add to the render tree

## 📦 Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

To preview the production build locally:
```bash
npm run preview
```

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically try 5174, 5175, etc.

Or specify a different port:
```bash
npm run dev -- --port 3000
```

### Dependencies Issues
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
Check for TypeScript errors:
```bash
npx tsc --noEmit
```

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Motion (Framer Motion)](https://motion.dev)

## 🎯 Next Steps

1. ✅ Run the development server
2. ✅ Explore all components
3. 📝 Customize text and images
4. 🎨 Adjust colors and styling
5. 🔧 Connect to backend API
6. 🚀 Deploy to production

---

**Need help?** Check PROJECT_OVERVIEW.md for detailed documentation.
