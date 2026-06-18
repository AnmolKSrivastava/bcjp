# Component API Reference

## Core Components

### App.tsx
**Main application component with language management**

**Features:**
- Language state management (Hindi/English)
- localStorage persistence
- Language modal control
- Component orchestration

**State:**
```tsx
const [lang, setLang] = useState<"hi" | "en" | null>(null);
```

**Methods:**
- `handleLangSelect(selected: "hi" | "en")` - Sets language preference
- `toggleLang()` - Switches between languages

---

### Navbar
**Sticky navigation bar with language toggle**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
  onLangToggle: () => void;
}
```

**Features:**
- Logo with Mic icon
- Desktop navigation menu
- Responsive mobile menu
- Language toggle button
- Login and Create Profile CTAs
- Smooth scroll to sections

**Customization:**
```tsx
// Change navigation items
const navItems = [
  { label: txt.findJobs, id: "jobs" },
  { label: txt.categories, id: "categories" },
  // Add more items...
];
```

---

### HeroSection
**Main landing section with headline and CTAs**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Features:**
- Animated badge
- Large headline with underline decoration
- Two CTA buttons (Voice & Browse)
- Feature chips (No Resume, Bilingual, Free)
- Worker image collage (4 images)
- Background decorations (blurred circles, dot pattern)

**Animations:**
- Left content: `opacity 0→1`, `x -30→0`
- Right content: `opacity 0→1`, `x 30→0`
- Duration: 0.6-0.7s

**Images:**
Uses Unsplash images - replace with your own:
```tsx
const workerImages = [
  { src: "your-image-url", alt: "Description", label: "Role", rotate: "-2deg" },
  // ...
];
```

---

### HowItWorks
**3-step process explanation**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Structure:**
```tsx
const steps = [
  { icon: "🎤", title: {...}, desc: {...} },
  { icon: "🤖", title: {...}, desc: {...} },
  { icon: "🎯", title: {...}, desc: {...} },
];
```

**Features:**
- Numbered steps (1, 2, 3)
- Icon badges
- Connector lines between steps
- Scroll-triggered animations

**Customization:**
- Change icons (emojis or replace with Lucide icons)
- Update step descriptions
- Add/remove steps

---

### JobCategories
**Grid of job category cards**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Features:**
- 6 category cards by default
- Background images
- Job count display
- Hover effects (scale, shadow, arrow animation)
- Gradient overlays

**Category Structure:**
```tsx
const categories = [
  {
    name: { en: "Electrician", hi: "इलेक्ट्रिशियन" },
    count: "2,340+ Jobs",
    img: "image-url",
    color: "#FEF3C7", // Background color
  },
  // ...
];
```

**Adding New Category:**
```tsx
{
  name: { en: "New Job", hi: "नई नौकरी" },
  count: "X+ Jobs",
  img: "https://your-image-url",
  color: "#COLORHEX",
}
```

---

### FeaturedJobs
**Job listing cards with details**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Job Structure:**
```tsx
const jobs = [
  {
    title: { en: "Job Title", hi: "नौकरी शीर्षक" },
    company: "Company Name",
    location: { en: "City", hi: "शहर" },
    salary: "₹XX-₹XX",
    type: { en: "Full Time", hi: "पूर्णकालिक" },
    icon: "🔧", // Emoji icon
    color: "#HEXCOLOR", // Badge background
    iconBg: "#HEXCOLOR", // Icon background
    badge: { en: "Label", hi: "लेबल" },
    badgeColor: "bg-red-50 text-red-600 border-red-100",
  },
];
```

**Features:**
- Job title, company, location
- Salary range
- Job type (Full/Part Time)
- Badge (Urgent, New, Top Pay, Hot)
- Apply Now button
- Save button
- Hover animations

---

### LanguageSection
**Highlights multilingual support**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Features:**
- Large microphone icon/illustration
- Feature list with checkmarks
- CTA button
- Background decorations

**Customization:**
Add/remove features:
```tsx
const features = [
  { en: "Feature 1", hi: "विशेषता 1" },
  { en: "Feature 2", hi: "विशेषता 2" },
];
```

---

### EmployerSection
**Information for businesses/employers**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Features:**
- Employer value propositions
- Statistics/metrics
- Post Job CTA
- Illustration/image

---

### SuccessStories
**User testimonials carousel**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Story Structure:**
```tsx
const stories = [
  {
    name: { en: "Name", hi: "नाम" },
    role: { en: "Role", hi: "भूमिका" },
    story: { en: "Testimonial...", hi: "प्रशंसापत्र..." },
    avatar: "image-url",
    rating: 5,
  },
];
```

**Features:**
- User avatar
- Name and role
- Testimonial text
- Star ratings
- Carousel/grid layout

---

### CTABanner
**Final call-to-action section**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Features:**
- Bold headline
- Subheadline
- Primary CTA button
- Background gradient/decoration
- High contrast design

---

### Footer
**Site footer with links**

**Props:**
```tsx
interface Props {
  lang: "hi" | "en";
}
```

**Sections:**
1. Brand (Logo + Description + Social links)
2. For Workers (Links)
3. For Employers (Links)
4. Copyright + Legal links

**Customization:**
```tsx
// Add link sections
const footerLinks = {
  workers: [
    { en: "Link", hi: "लिंक" },
    // ...
  ],
  employers: [
    { en: "Link", hi: "लिंक" },
    // ...
  ],
};
```

---

### LanguageModal
**First-time language selection modal**

**Props:**
```tsx
interface Props {
  onSelect: (lang: "hi" | "en") => void;
}
```

**Features:**
- Full-screen overlay
- Two language buttons (Hindi & English)
- Fade-in animation
- Auto-dismiss on selection

**Animation:**
```tsx
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
exit={{ opacity: 0, scale: 0.95 }}
```

---

## UI Components (shadcn/ui)

Located in `src/app/components/ui/`

### Button
**Versatile button component**

**Variants:**
- `default` - Primary blue
- `destructive` - Red
- `outline` - Bordered
- `secondary` - Gray
- `ghost` - Transparent
- `link` - Text link

**Sizes:**
- `sm` - Small
- `default` - Medium
- `lg` - Large
- `icon` - Icon only

**Usage:**
```tsx
import { Button } from "@/app/components/ui/button";

<Button variant="default" size="lg">
  Click Me
</Button>
```

---

### Card
**Container component**

**Components:**
- `Card` - Root container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Subtitle
- `CardContent` - Main content
- `CardFooter` - Footer section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/app/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

---

### Dialog
**Modal dialog component**

**Components:**
- `Dialog` - Root
- `DialogTrigger` - Opens dialog
- `DialogContent` - Modal content
- `DialogHeader` / `DialogFooter`
- `DialogTitle` / `DialogDescription`

**Usage:**
```tsx
import { Dialog, DialogTrigger, DialogContent } from "@/app/components/ui/dialog";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogTitle>Modal Title</DialogTitle>
    {/* Content */}
  </DialogContent>
</Dialog>
```

---

### Input
**Form input field**

**Usage:**
```tsx
import { Input } from "@/app/components/ui/input";

<Input type="text" placeholder="Enter text..." />
```

---

### Select
**Dropdown select component**

**Components:**
- `Select` - Root
- `SelectTrigger` - Dropdown button
- `SelectContent` - Dropdown menu
- `SelectItem` - Menu option

**Usage:**
```tsx
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/app/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

### Badge
**Small label/tag component**

**Variants:**
- `default` - Primary
- `secondary` - Gray
- `destructive` - Red
- `outline` - Bordered

**Usage:**
```tsx
import { Badge } from "@/app/components/ui/badge";

<Badge variant="default">New</Badge>
```

---

## Animation Patterns

### Fade In on Scroll
```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4 }}
>
  Content
</motion.div>
```

### Staggered Animation
```tsx
{items.map((item, i) => (
  <motion.div
    key={i}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.1 }}
  >
    {item}
  </motion.div>
))}
```

### Hover Scale
```tsx
<motion.div whileHover={{ scale: 1.05 }}>
  Hover me
</motion.div>
```

---

## Styling Patterns

### Container
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
  {/* Content */}
</div>
```

### Section
```tsx
<section className="bg-white py-20 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Section content */}
  </div>
</section>
```

### Button (Primary)
```tsx
<button className="bg-[#2563EB] text-white font-bold px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all hover:shadow-xl">
  Click Me
</button>
```

### Card
```tsx
<div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0] hover:shadow-lg transition-all">
  {/* Card content */}
</div>
```

---

## Translation Pattern

Every component follows this pattern:

```tsx
interface Props {
  lang: "hi" | "en";
}

const t = {
  en: {
    key1: "English text",
    key2: "More text",
  },
  hi: {
    key1: "हिंदी पाठ",
    key2: "अधिक पाठ",
  },
};

export function Component({ lang }: Props) {
  const txt = t[lang];
  return <div>{txt.key1}</div>;
}
```

---

## Best Practices

### 1. Always add translations
When adding new text, add both English and Hindi:
```tsx
const t = {
  en: { newText: "English" },
  hi: { newText: "हिंदी" },
};
```

### 2. Use semantic HTML
```tsx
<section> for major sections
<article> for standalone content
<nav> for navigation
<header> for headers
<footer> for footers
```

### 3. Accessibility
- Add `alt` text to images
- Use semantic elements
- Ensure keyboard navigation works
- Maintain color contrast

### 4. Responsive Design
```tsx
// Mobile first approach
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### 5. Performance
- Lazy load images
- Use `viewport={{ once: true }}` for animations
- Optimize images (WebP, proper sizes)
- Code splitting where needed

---

**Need more details?** Check specific component files in `src/app/components/`
