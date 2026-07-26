# What Are We Building?

> **Developer Handbook**
>
> Next Generation Workforce Management Platform
>
> Version 1.0
>
> Firebase + Next.js Architecture Edition

---

# 1. Introduction

Bharat Gig is a specialized hiring and workforce platform for India's frontline workers — focused on **seven employment industries only**, not an unlimited multi-industry marketplace.

The seven supported industries are:

1. Construction Workers
2. Manufacturing Company Workers
3. Showrooms & Mall Executives
4. Retail Shop Workers
5. Hospital Staff
6. Elderly Care
7. Restaurant Staff

Unlike traditional job portals that stop after connecting employers with candidates, this platform manages the employment journey within these industries — from worker registration through hiring, and later attendance, payroll, and analytics.

Every job, profile preference, search filter, and AI recommendation uses the same hierarchy:

**Industry → Department → Role**

The long-term vision is to become the operating system for workforce management **within these seven industries**, enabling employers in those verticals to recruit, manage, monitor, and retain workers on a single platform.

---

# 2. Why This Platform Exists

India has one of the world's largest informal workforces.

Millions of workers find employment through:

- Personal references
- Contractors
- WhatsApp groups
- Local labour markets
- Newspaper advertisements

These methods suffer from several problems.

### Workers

Workers often:

- Do not have professional resumes.
- Have limited digital literacy.
- Change jobs frequently.
- Cannot easily verify employers.
- Lose employment records.
- Receive delayed payments.
- Have limited visibility into available opportunities.

### Employers

Employers struggle with:

- Finding verified workers.
- Tracking attendance.
- Managing payroll.
- Preventing attendance fraud.
- Monitoring multiple work locations.
- Maintaining compliance records.
- Communicating with a distributed workforce.

### Administrators

Operations teams often rely on spreadsheets and manual processes.

This leads to:

- Duplicate data
- Payroll errors
- Compliance risks
- Slow hiring
- Poor reporting
- Lack of operational visibility

The platform addresses these problems by creating a single digital ecosystem where every stakeholder operates on shared, real-time information.

---

# 3. Vision Statement

To become India's most trusted workforce management platform by digitizing every stage of employment while making advanced technology accessible to workers regardless of their educational background or digital literacy.

---

# 4. Mission

Build a platform that allows every worker to:

- Create a professional identity.
- Discover employment opportunities.
- Join organizations faster.
- Record attendance digitally.
- Receive accurate payments.
- Build long-term employment history.

At the same time, enable employers to manage thousands of workers through a unified, intelligent platform.

---

# 5. The Core Philosophy

The platform is built around one simple principle:

> Employment should be managed as a continuous lifecycle, not as disconnected software products.

Traditional software divides workforce management into multiple applications:

- Recruitment software
- HR software
- Payroll software
- Attendance software
- Compliance software
- Communication software

This platform combines all of them into one integrated system.

---

# 6. Who Uses This Platform?

The platform serves multiple types of users.

## Workers

Workers create profiles, verify identities, apply for jobs, record attendance, receive notifications, and manage employment records.

Examples (within the seven industries) include:

- Construction electricians, plumbers, welders, helpers
- Manufacturing production, assembly, warehouse, and QC staff
- Showroom sales, cashier, and floor executives
- Retail shop assistants, inventory, and counter staff
- Hospital nurses, ward boys, lab staff, and housekeeping
- Elderly-care caregivers, home nurses, and companions
- Restaurant cooks, waiters, captains, and kitchen helpers

---

## Employers

Organizations use the platform to:

- Post jobs
- Search candidates
- Hire workers
- Assign shifts
- Track attendance
- Process payroll
- Monitor workforce productivity

---

## Supervisors

Supervisors oversee workers at individual job sites.

Responsibilities include:

- Shift monitoring
- Attendance verification
- Incident reporting
- Workforce communication

---

## Administrators

Administrators configure the platform.

Responsibilities include:

- User verification
- Compliance monitoring
- Employer onboarding
- Workforce analytics
- Operational reporting

---

# 7. High-Level Product Capabilities

The platform consists of several integrated modules.

| Module | Purpose |
|----------|----------|
| Authentication | Secure user registration and login |
| Worker Profiles | Digital worker identity |
| Employer Portal | Workforce management |
| Job Marketplace | Job posting and applications within the seven industries |
| Industry Taxonomy | Master data: industries, departments, job roles |
| AI Resume Builder | Voice/guided resume creation using Industry → Department → Role |
| Candidate Matching | Matching prioritized by industry, department, then role |
| Attendance | GPS-based attendance tracking |
| Payroll | Salary calculation and payments |
| Notifications | Real-time communication |
| Analytics | Reporting by industry, department, and role |
| Administration | Platform and taxonomy management |

Each module is designed to operate independently while sharing a common data model.

---

# 8. The Employment Lifecycle

The platform follows a complete employment lifecycle.

```
Worker Registration
        │
        ▼
Identity Verification
        │
        ▼
Profile Completion
        │
        ▼
Resume Generation
        │
        ▼
Job Discovery
        │
        ▼
Application
        │
        ▼
Employer Review
        │
        ▼
Hiring
        │
        ▼
Shift Assignment
        │
        ▼
Attendance
        │
        ▼
Payroll
        │
        ▼
Performance History
        │
        ▼
Future Employment Opportunities
```

Unlike traditional job portals, the relationship between employer and worker continues after hiring.

---

# 9. Primary Business Domains

Although presented as one application, the platform actually combines multiple business domains.

## Recruitment

Connecting employers with suitable workers.

## Human Resources

Managing employee records throughout employment.

## Workforce Operations

Attendance, scheduling, communication, and supervision.

## Payroll

Salary processing and financial reporting.

## Compliance

Identity verification, documentation, and regulatory tracking.

## Industry Taxonomy

Standardizing every job and preference as Industry → Department → Role across the seven supported industries (including Hospital Staff and Elderly Care as distinct industries, not a separate product line).

Each domain can eventually deepen within the seven industries while remaining part of the same ecosystem.

---

# 10. Long-Term Vision

The initial release focuses on workforce management.

Future versions may include:

- AI-based workforce recommendations.
- Predictive staffing.
- Skill certification.
- Digital employment history.
- Worker reputation scoring.
- Financial services.
- Insurance integration.
- Learning and certification.
- Government compliance integrations.
- Enterprise workforce analytics.

The platform is therefore designed to evolve into a comprehensive workforce operating system rather than remaining a simple job portal.

---

# 11. Scope of This Handbook

This handbook serves as the primary technical reference for the development team.

It explains:

- Business objectives.
- Functional requirements.
- Technical architecture.
- Firebase implementation strategy.
- Development roadmap.
- Database design.
- Security model.
- AI integration.
- Deployment strategy.

The original BRD, TDD, and User Stories define *what* the company wants to build.

This handbook explains *how* those requirements should be implemented using the chosen technology stack while preserving the original business vision.

---

# Key Takeaways

After reading this chapter, every developer should understand:

- Bharat Gig is a **specialized seven-industry** hiring and workforce platform — not an unlimited category marketplace.
- Every job and preference follows **Industry → Department → Role**.
- The platform is more than a job portal; recruitment is one stage of a longer employment lifecycle.
- Modules share one taxonomy and one data model across hiring, HR, attendance, payroll, compliance, and analytics.
- The Firebase architecture recommended in this handbook implements that specialized product scope.

---