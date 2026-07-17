# Phase 1 Development Reading Guide
## Workforce Management Platform
### Version 1.0

---

# Purpose

This document defines **which documentation should be used during the initial development phase** of the Workforce Management Platform.

The complete documentation repository covers the vision of the product for several years of development. Reading every document before writing code is unnecessary and will slow down development.

Instead, the development team should follow a **Just-In-Time Documentation Strategy**, where only the documentation relevant to the current phase or feature is referenced.

This guide should be considered the official reading order for all developers and AI coding agents.

---

# Current Development Goal

The project is currently **NOT** building the complete HRMS.

The immediate objective is to launch a modern **Job Marketplace Platform** that allows:

- Job Seekers to register
- Employers to register
- Employers to post jobs
- Candidates to search jobs
- Candidates to apply for jobs
- Employers to manage applications

The application will be:

- Progressive Web App (PWA)
- Built with Next.js
- Firebase Backend
- Cloud Firestore
- Firebase Authentication
- Cloud Functions
- Firebase Storage
- Firebase Hosting

Everything else should be considered future phases.

---

# Phase 1 Scope

The coding agent should focus ONLY on implementing:

## Candidate

- Registration
- Login
- Profile
- Resume Upload
- Skills
- Education
- Experience
- Dashboard
- Search Jobs
- Save Jobs
- Apply to Jobs
- Track Applications

---

## Employer

- Registration
- Login
- Company Profile
- Post Jobs
- Edit Jobs
- Close Jobs
- View Applicants
- Manage Applications

---

## Platform

- Authentication
- Authorization
- Organization Management
- Job Management
- Application Management
- Responsive UI
- Progressive Web App
- Firebase Integration

---

Everything outside this scope should be ignored until later phases.

---

# Documentation Reading Order

The documentation should be consumed in the following order.

---

# Step 1 — Product Understanding

Read these documents completely before writing any code.

```
01-product/
├── 01-What-Are-We-Building.md
├── 02-Business-Problem-and-Product-Vision.md
├── 03-Stakeholders-User-Personas-and-Access-Control.md
└── 04-Complete-Business-Workflow.md
```

Purpose:

Understand

- Business goals
- Users
- Product vision
- Recruitment workflow
- Platform objectives

These documents explain **why** the platform exists.

---

# Step 2 — System Design

Read completely.

```
02-system-design/
├── 01-System-Modules-and-Platform-Architecture.md
├── 02-Data-Ownership-and-Firestore-Architecture.md
├── 03-Frontend-Architecture-and-Design-System.md
├── 06-Authorization-Roles-and-Permission-Architecture.md
└── 07-UI-UX-Design-System-and-Design-Language.md
```

Purpose

Understand

- Overall architecture
- Firestore structure
- Frontend architecture
- Permission system
- UI consistency

---

Do NOT spend time on these documents yet.

```
04-Master-Data-and-Reference-Data-Management.md

05-Event-Driven-Architecture-and-Automation.md
```

They become important during later phases.

---

# Step 3 — Technical Development Standards

Read completely.

```
03-development/
├── 01-Firebase-Architecture-and-Development-Guide.md
├── 02-State-Management-and-Data-Fetching-Architecture.md
├── 03-API-Design-and-Integration-Standards.md
├── 04-Development-Environment-and-Onboarding-Guide.md
├── 05-Git-Workflow-and-Branching-Strategy.md
├── 06-Firestore-Security-Rules-and-Indexing-Guide.md
├── 07-Cost-Optimization-and-Performance-Engineering.md
├── 09-Architecture-Decision-Records.md
└── 10-AI-Assisted-Engineering-Guide.md
```

Purpose

These documents define how every line of code should be written.

Topics include

- Firebase architecture
- State management
- API standards
- Git workflow
- Firestore rules
- Coding standards
- AI coding workflow
- Performance
- Cost optimization

---

Skip this document for now.

```
08-Disaster-Recovery-and-Business-Continuity.md
```

It becomes relevant before production deployment.

---

# Step 4 — System Architecture

Read all documents.

```
08-architecture/
├── 01-System-Architecture-and-Technical-Blueprint.md
├── 02-Database-Architecture-and-Data-Model.md
└── 03-Project-Structure-and-Coding-Standards.md
```

Purpose

Understand

- Folder structure
- Database model
- Coding conventions
- Project architecture

These documents define the project's engineering foundation.

---

# Step 5 — Engineering Standards

Read completely.

```
07-engineering/
├── 01-DevOps-CI-CD-and-Release-Management.md
└── 02-Quality-Assurance-Testing-and-Code-Quality.md
```

Purpose

Ensure

- Clean commits
- Testing
- CI/CD
- Code quality

These standards apply from the first day of development.

---

# Step 6 — Product Roadmap

Read these documents.

```
09-product/
├── 01-Implementation-Roadmap-and-Delivery-Plan.md
└── 03-Product-Evolution-and-Feature-Rollout.md
```

Purpose

Understand

- Current milestone
- Future milestones
- Product evolution
- Feature rollout strategy

---

Only skim this document.

```
02-Product-Launch-Growth-and-Scaling-Strategy.md
```

It becomes useful after the MVP is completed.

---

# Feature-Based Documentation Strategy

Once the foundational documents have been read, developers should only open module documentation related to the feature currently being implemented.

---

## Authentication

Before implementing authentication, read

```
04-modules/

01-Authentication-and-Identity-Management.md
```

---

## Candidate Profile

Before implementing candidate profiles, read

```
04-modules/

02-User-Profile-and-Digital-Identity.md
```

---

## Organization

Before implementing company accounts, read

```
04-modules/

03-Organization-Management-and-Multi-Tenancy.md
```

---

## Job Marketplace

Before implementing jobs, read

```
04-modules/

04-Job-Marketplace-and-Job-Management.md
```

---

## Hiring Pipeline

Before implementing application management, read

```
04-modules/

05-Hiring-Pipeline-and-Application-Management.md
```

Only the functionality related to recruitment is required during Phase 1.

Employee lifecycle management is out of scope.

---

# Ignore These Modules For Now

The following modules belong to later phases of the platform and should not influence Phase 1 development.

```
06-Employee-Lifecycle-and-Employee-Management.md

07-Attendance-and-Time-Tracking-Engine.md

08-Workforce-Planning-and-Shift-Scheduling.md

09-Leave-Management-and-Workforce-Availability.md

10-Compensation-Benefits-and-Payroll-Engine.md

11-Analytics-Reporting-and-Business-Intelligence.md

12-Notification-Communication-and-Workflow-Automation.md
```

These modules become relevant after successful recruitment functionality has been delivered.

---

# AI Documentation

Read only:

```
05-ai-platform/

01-AI-Services-Layer-and-Agent-Architecture.md
```

Purpose

Understand

- Future AI architecture
- AI service abstraction
- AI gateway

---

Ignore these documents for now.

```
02-AI-Recruitment-Intelligence.md

03-AI-Workforce-Assistant.md

04-AI-Workforce-Intelligence-and-Predictive-Analytics.md
```

AI implementation is planned for later phases.

---

# Platform Documentation

Read

```
06-platform/

01-Platform-Administration-and-SaaS-Operations.md

05-Progressive-Web-App-and-Offline-Architecture.md
```

Purpose

Understand

- SaaS platform management
- Progressive Web App behavior
- Offline capabilities

---

Only skim

```
02-Security-Compliance-and-Audit-Architecture.md

03-Observability-Monitoring-and-Operational-Excellence.md

04-Integration-Framework-and-Public-APIs.md
```

These become increasingly important as the platform matures.

---

# Appendix

Do not read the Appendix during Phase 1.

It serves as reference material for future development.

---

# Development Philosophy

The project should follow a **Just-In-Time Documentation Strategy**.

Developers should not attempt to understand the complete system before implementation.

Instead:

1. Understand the business.
2. Understand the architecture.
3. Understand the engineering standards.
4. Build one feature at a time.
5. Read the corresponding module before implementing that feature.
6. Keep documentation synchronized with implementation.

---

# AI Coding Agent Instructions

The AI coding agent should follow these rules:

- Do not implement features outside the current phase.
- Respect the documented architecture.
- Follow the project coding standards.
- Use Firebase-first architecture.
- Maintain multi-tenant design.
- Follow Firestore security principles.
- Reuse existing components whenever possible.
- Avoid introducing new architectural patterns unless approved by an Architecture Decision Record (ADR).
- Keep implementations simple, modular, and scalable.
- Ensure all code is production-ready, responsive, and consistent with the project's design system.

---

# Current Phase Deliverable

The Phase 1 MVP is considered complete when the platform supports:

### Candidate

- Registration
- Authentication
- Profile
- Resume Upload
- Job Search
- Job Application
- Application Tracking

### Employer

- Registration
- Company Profile
- Job Posting
- Job Management
- Applicant Management

### Platform

- Firebase Authentication
- Firestore Database
- Cloud Storage
- Cloud Functions
- Responsive UI
- Progressive Web App
- Secure Multi-Tenant Architecture

No attendance, payroll, leave management, employee lifecycle management, or advanced AI features should be implemented during this phase.

---

# Summary

The documentation repository is intentionally designed for the platform's entire lifecycle, spanning multiple years of development.

For Phase 1, developers and AI coding agents should focus only on the documents that establish the product vision, architecture, engineering standards, and recruitment-related modules.

Additional documentation should be consulted only when the corresponding feature enters active development, ensuring a focused, maintainable, and incremental implementation process.