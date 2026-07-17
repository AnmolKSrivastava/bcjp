# Module 35
# Development Environment & Developer Onboarding Guide

---

# Module Overview

This document defines the official development environment, project setup process, coding workflow, local tooling, and onboarding procedures for engineers contributing to the Workforce Management Platform.

Its purpose is to ensure that every developer—whether joining the project for the first time or returning after a long period—can establish a fully functional local development environment with minimal effort.

The document also standardizes development practices, environment configuration, emulator usage, repository organization, debugging techniques, and local testing.

This guide is mandatory reading for all contributors before making changes to the codebase.

---

# Objectives

This guide establishes:

- Local development setup
- Required software
- Repository structure
- Firebase Emulator Suite usage
- Environment configuration
- Development workflow
- Debugging practices
- Local testing
- Coding conventions
- Contribution expectations

---

# Supported Development Platforms

Officially supported operating systems:

- Windows 11
- macOS
- Ubuntu LTS

Development on unsupported operating systems should not be relied upon for production work.

---

# Required Software

Every developer should install:

- Node.js (LTS)
- npm (or pnpm)
- Git
- Visual Studio Code
- Firebase CLI
- Google Cloud SDK (optional)
- Chrome
- Android Studio (future, optional)

---

# Recommended VS Code Extensions

Recommended extensions include:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Importer
- Firebase Explorer
- GitLens
- Error Lens
- Path Intellisense
- Markdown All in One
- EditorConfig

AI-assisted development:

- Cursor
- GitHub Copilot
- ChatGPT Extension (optional)

---

# Repository Structure

The repository follows a feature-first organization.

Example:

```
apps/
  web/

packages/
  ui/
  types/
  utils/
  firebase/
  config/

docs/

scripts/

functions/

public/
```

Business modules remain isolated from shared libraries.

---

# Local Development Workflow

The recommended workflow:

```
Clone Repository

↓

Install Dependencies

↓

Configure Environment

↓

Start Firebase Emulator

↓

Start Next.js Development Server

↓

Develop

↓

Run Tests

↓

Lint

↓

Commit

↓

Push
```

---

# Environment Variables

Separate environment files should exist for:

- Development
- Staging
- Production

Sensitive values should never be committed.

Examples include:

- Firebase Configuration
- AI Provider Keys
- Analytics Keys
- API Tokens

Secrets should be managed using Google Secret Manager where appropriate.

---

# Firebase Emulator Suite

The emulator should include:

- Authentication
- Firestore
- Storage
- Functions
- Hosting

Developers should perform most feature development against the local emulator.

---

# Local Authentication

Use dedicated development accounts.

Never use production credentials for local development.

Example roles:

- Super Admin
- Organization Admin
- HR Manager
- Employee
- Recruiter

Test accounts should be seeded automatically.

---

# Local Seed Data

Provide scripts to generate:

- Organizations
- Departments
- Employees
- Jobs
- Attendance Records
- Leave Requests

Seed data should be deterministic and repeatable.

---

# Project Scripts

Common scripts include:

```
npm install

npm run dev

npm run build

npm run lint

npm run typecheck

npm run test

npm run emulator

npm run seed

npm run format
```

Scripts should behave consistently across operating systems.

---

# Branch Strategy

Recommended branch naming:

```
main

develop

feature/<name>

bugfix/<name>

hotfix/<name>

release/<version>
```

Branch names should be descriptive.

---

# Commit Message Convention

Follow Conventional Commits.

Examples:

```
feat(attendance): add offline sync

fix(auth): prevent duplicate login

docs(api): update webhook specification

refactor(employee): simplify repository layer

test(payroll): improve integration coverage
```

Consistent commit messages improve release automation.

---

# Code Formatting

Formatting should be automated.

Use:

- ESLint
- Prettier
- EditorConfig

Formatting should run before every commit.

---

# TypeScript Standards

The project uses strict TypeScript.

Avoid:

- any
- implicit types
- ignored compiler errors

Prefer explicit typing and shared interfaces.

---

# Local Testing

Developers should verify:

- Authentication
- Firestore rules
- Cloud Functions
- UI responsiveness
- Offline mode
- Accessibility basics

No feature should be merged without local verification.

---

# Debugging

Preferred debugging tools:

- Browser DevTools
- React DevTools
- Firebase Emulator Logs
- Cloud Function Logs
- Network Inspector

Avoid debugging directly in production.

---

# Logging

Use structured logging.

Include:

- Request ID
- User ID (when appropriate)
- Organization ID
- Module
- Severity

Never log secrets or personal information.

---

# Feature Development Checklist

Before implementing a feature:

- Understand business requirements
- Review related modules
- Identify Firestore collections
- Define permissions
- Review UI standards

After implementation:

- Test locally
- Run linting
- Run type checking
- Update documentation
- Verify accessibility

---

# Pull Request Checklist

Every pull request should include:

- Clear description
- Linked issue
- Screenshots (if UI changes)
- Test results
- Documentation updates

Reviewers should verify architectural consistency.

---

# Local Performance Checks

Developers should monitor:

- Bundle size
- Firestore reads
- Function latency
- Page load time
- Lighthouse score

Performance regressions should be addressed before merging.

---

# Working with AI Tools

AI assistants should be used to:

- Generate boilerplate
- Suggest refactoring
- Explain unfamiliar code
- Draft tests
- Produce documentation

Developers remain responsible for reviewing and validating AI-generated code.

---

# Common Troubleshooting

Typical issues include:

- Emulator connection failures
- Authentication misconfiguration
- Missing environment variables
- Firestore index errors
- Dependency conflicts

Maintain an internal troubleshooting section with known solutions.

---

# Firestore Collections

No new collections are introduced.

This document governs the development environment rather than application data.

---

# Cloud Functions

No additional Cloud Functions are defined.

Development should rely on the existing function architecture.

---

# Dependencies

Depends on:

- Firebase Architecture & Development Guide
- Project Structure & Coding Standards
- DevOps, CI/CD & Release Management
- State Management & Data Fetching Architecture

Provides guidance to:

- New Developers
- Full-stack Engineers
- Frontend Engineers
- Backend Engineers
- QA Engineers

This document serves as the official onboarding guide for all contributors.

---

# Future Enhancements

- Automated project bootstrap script
- Docker development environment
- One-command local setup
- Remote development containers
- Internal developer portal
- Automated seed data generator
- Architecture walkthrough videos
- Interactive onboarding checklist

---

# Acceptance Criteria

The onboarding guide is complete when:

- Developers can set up the project from scratch.
- Local Firebase emulators are documented.
- Repository workflow is standardized.
- Environment configuration is defined.
- Coding expectations are clear.
- Local testing procedures are documented.
- AI-assisted development guidelines are established.

---

# Key Takeaways

- A standardized development environment reduces onboarding time and eliminates configuration inconsistencies.
- Local development should prioritize Firebase emulators, repeatable seed data, and automated tooling.
- Consistent workflows, coding standards, and review practices improve long-term maintainability.
- Every contributor should be able to clone the repository, run the project locally, and deliver features confidently using this guide.

---