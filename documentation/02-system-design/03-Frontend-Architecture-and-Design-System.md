# Chapter 7
# Frontend Architecture & Design System

---

# Purpose

The frontend is much more than a collection of pages.

It is the primary interface between users and the workforce platform.

Since our users include first-time smartphone users, employers, HR teams, administrators, and supervisors, the frontend must be:

- Fast
- Consistent
- Accessible
- Mobile-first
- Easy to extend

This chapter defines the architecture that every frontend developer should follow.

---

# Core Principles

The frontend should follow six principles.

## 1. Mobile First

The majority of workers will access the platform using Android smartphones.

Every screen should therefore be designed for a width of approximately 360–430 pixels first.

Desktop layouts are enhancements.

Never design desktop first.

---

## 2. Progressive Enhancement

Users with older devices should still have a functional experience.

Modern browsers receive richer animations and interactions, while core functionality remains available to everyone.

---

## 3. Consistency

Every page should use the same:

- Colors
- Typography
- Buttons
- Forms
- Cards
- Icons
- Navigation
- Spacing
- Feedback patterns

Users should never feel like they are moving between different applications.

---

## 4. Simplicity

Every additional click increases the chance of abandonment.

When designing a workflow, ask:

> Can this be completed with fewer steps?

If the answer is yes, redesign it.

---

## 5. Offline Awareness

Many workers will experience unreliable internet connectivity.

The UI should:

- Show connection status.
- Cache previously viewed information where practical.
- Clearly indicate when actions are pending synchronization.

Offline editing of critical business data should be carefully controlled.

---

## 6. Accessibility

The platform should be usable regardless of:

- Digital literacy
- Language
- Vision limitations
- Device quality

Accessibility is a core product requirement, not an optional enhancement.

---

# Technology Stack

Frontend Framework

```
Next.js (App Router)
```

Language

```
TypeScript
```

Styling

```
Tailwind CSS
```

Animations

```
Framer Motion
```

Icons

```
Lucide React
```

Forms

```
React Hook Form
```

Validation

```
Zod
```

State Management

```
Zustand
```

Data Fetching

```
TanStack Query
```

Firebase SDK

```
Authentication

Firestore

Storage

Cloud Messaging

Analytics
```

---

# Why Zustand Instead of Redux?

The application does not require a large centralized global state.

Firebase already manages much of the application's state.

Zustand is:

- Smaller
- Easier to understand
- Less boilerplate
- Faster to develop

Redux should only be considered if future complexity clearly demands it.

---

# Recommended Folder Structure

```
src/

    app/

    components/

    features/

    hooks/

    lib/

    services/

    stores/

    providers/

    types/

    utils/

    styles/

    constants/

    config/

    middleware/

    firebase/
```

Feature-specific code should live inside `features/`.

Reusable UI components belong in `components/`.

---

# Feature-Based Organization

Avoid organizing by file type.

Bad:

```
components/

pages/

hooks/

utils/

services/
```

for the entire project.

Preferred:

```
features/

    authentication/

    profile/

    jobs/

    attendance/

    payroll/

    notifications/
```

Each feature contains:

- Components
- Hooks
- Services
- Types
- Validation
- Tests

This keeps modules self-contained.

---

# App Router Structure

```
app/

    (public)/

        login/

        register/

        about/

    (worker)/

        dashboard/

        jobs/

        attendance/

        payroll/

    (employer)/

        dashboard/

        jobs/

        employees/

    (admin)/

        dashboard/

        analytics/

        users/
```

Route groups simplify layout management and access control.

---

# Design System

Every visual element should originate from the design system.

Core components include:

- Button
- Input
- Select
- Checkbox
- Radio
- Card
- Avatar
- Badge
- Dialog
- Drawer
- Sheet
- Tabs
- Table
- Pagination
- Empty State
- Loading Skeleton
- Toast
- Alert
- Tooltip

Developers should avoid creating one-off UI components when a shared component already exists.

---

# Layout Strategy

Worker Layout

```
Top App Bar

↓

Page Content

↓

Bottom Navigation
```

Employer Layout

```
Sidebar

+

Top Header

+

Main Content
```

Admin Layout

```
Sidebar

+

Header

+

Analytics Panels
```

Each user type should have a dedicated layout while sharing common components.

---

# Navigation Philosophy

Workers should never see more than five primary navigation items.

Suggested navigation:

- Home
- Jobs
- Attendance
- Notifications
- Profile

Employers and administrators may use side navigation because they typically work on larger screens.

---

# Forms

Every form should support:

- Auto-save where appropriate.
- Inline validation.
- Clear error messages.
- Keyboard accessibility.
- Mobile-friendly input controls.

Long forms should be divided into logical sections with progress indicators.

---

# Feedback Patterns

Users should always know what is happening.

Examples:

Loading

↓

Skeleton UI

Success

↓

Toast

Failure

↓

Inline Error

Long Operation

↓

Progress Indicator

Never leave users wondering whether an action succeeded.

---

# Internationalization

The platform should be multilingual from the beginning.

Recommended initial languages:

- English
- Hindi

Future languages:

- Bengali
- Marathi
- Tamil
- Telugu
- Gujarati
- Kannada
- Malayalam
- Odia
- Punjabi

Text should never be hardcoded inside components.

---

# Responsive Breakpoints

Suggested breakpoints:

```
Mobile

0–639px

Tablet

640–1023px

Desktop

1024px+

Large Desktop

1440px+
```

Design decisions should prioritize mobile layouts.

---

# Performance Guidelines

- Use dynamic imports for heavy modules.
- Lazy-load images.
- Optimize bundle size.
- Avoid unnecessary client-side rendering.
- Prefer Server Components where possible.
- Cache Firestore queries intelligently.

Aim for a fast first load even on low-end Android devices.

---

# Error Handling

Provide dedicated UI for:

- 404
- 500
- Offline
- Unauthorized
- Forbidden
- Maintenance Mode

These pages should match the overall design system.

---

# Accessibility Guidelines

- Minimum touch target of 44x44 pixels.
- Sufficient color contrast.
- Semantic HTML.
- Keyboard navigation.
- Screen reader labels.
- Focus indicators.
- Avoid relying solely on color to convey information.

---

# PWA Readiness

Although a native mobile app is not planned initially, the frontend should be designed as a Progressive Web App.

Benefits include:

- Installable on Android.
- Home screen icon.
- Offline caching.
- Push notifications.
- App-like experience.

Firebase Hosting integrates well with PWA deployment.

---

# Developer Rules

Every new feature must answer:

- Does it reuse existing components?
- Is it mobile-friendly?
- Is it accessible?
- Does it support dark mode (future)?
- Is text localized?
- Does it introduce unnecessary dependencies?

Consistency is more valuable than visual novelty.

---

# Acceptance Criteria

The frontend architecture is considered complete when:

- All modules follow the same folder structure.
- Shared components are reused across the application.
- Responsive layouts exist for worker, employer, and admin users.
- Forms are validated consistently.
- Navigation is role-aware.
- Internationalization is supported.
- Performance targets are met.

---

# Cursor Implementation Prompt

Implement the frontend architecture using:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand
- TanStack Query
- Firebase SDK
- Feature-based folder organization

Create reusable layouts for:

- Public
- Worker
- Employer
- Admin

Build the shared design system before implementing business modules.

---

# Key Takeaways

- The frontend is organized around business features, not pages.
- Mobile-first design is a mandatory requirement.
- Shared components and layouts ensure consistency.
- The design system should be established before feature development.
- A well-defined frontend architecture accelerates future module implementation and reduces technical debt.

---