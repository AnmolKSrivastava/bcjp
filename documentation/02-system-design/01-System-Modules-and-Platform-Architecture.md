# Chapter 5
# System Modules & Platform Architecture

---

# Purpose

The previous chapters described **what the platform does**.

This chapter explains **how the platform should be divided into software modules**.

A common mistake in software projects is treating every screen as a separate feature.

Instead, we organize the system into **business modules**.

Each module has:

- A clear business responsibility
- Independent data ownership
- Well-defined APIs
- Firebase collections
- Cloud Functions
- UI screens
- Future scalability

The goal is to build a platform where modules are loosely coupled but work together seamlessly.

---

# High-Level Architecture

```
                    Workforce Platform

                            │

    ┌───────────────────────┼────────────────────────┐

    │                       │                        │

 Core Platform        Workforce Engine        Administration

    │                       │                        │

    ▼                       ▼                        ▼

Authentication        Jobs                 Admin Portal

Profiles              Hiring              Reports

Organizations         Attendance          User Management

Documents             Payroll             Platform Settings

Notifications         Scheduling          Analytics

AI                    Master Data         Monitoring
```

Although the platform appears as a single application to users, internally it is composed of independent modules.

Hospital and elderly-care hiring needs live inside the seven-industry taxonomy (Jobs, Profiles, Organizations)—not as a separate peer “Care Economy” platform module.

---

# Core Design Principles

Every module must satisfy five principles.

## 1. Single Responsibility

Each module should own one business capability.

Examples:

Authentication owns login.

Attendance owns attendance.

Payroll owns salary.

Notifications own communication.

Avoid mixing responsibilities.

---

## 2. Loose Coupling

Modules should communicate through data and events instead of directly depending on each other.

Example:

Attendance should not modify Payroll directly.

Instead:

Attendance updates attendance records.

↓

Payroll calculates salary from attendance.

This keeps both modules independent.

---

## 3. Shared User Identity

Every module shares the same authenticated user.

Firebase Authentication acts as the central identity provider.

No module should create its own authentication mechanism.

---

## 4. Shared Organization Context

Every user belongs to an organization.

All business modules operate within that organization.

Example:

Organization

↓

Workers

↓

Jobs

↓

Attendance

↓

Payroll

↓

Reports

Organization isolation is enforced through Firestore Security Rules.

---

## 5. Mobile First

Although the platform supports desktop browsers,

every module should be designed for smartphone users first.

Large desktop layouts are enhancements—not the primary design target.

---

# Platform Modules

The complete platform consists of the following primary modules.

---

## Module 1

Authentication

Purpose

Authenticate users securely.

Responsibilities

- Login
- Registration
- OTP
- Session Management
- Passwordless Authentication

Firebase Services

- Authentication

Dependencies

None

Priority

★★★★★

---

## Module 2

User Profiles

Purpose

Maintain digital identities.

Responsibilities

- Personal Information
- Skills
- Experience
- Documents
- Languages
- Preferred Industry / Department / Role (taxonomy IDs)
- Profile Completion

Firebase

Firestore

Storage

Priority

★★★★★

---

## Module 3

Organization Management

Purpose

Manage employers and companies.

Responsibilities

Organization

Industry (one of the seven, or multi-industry only among the seven)

Org Departments (operational)

Branches

Sites

Business Units

Subscriptions

Priority

★★★★★

---

## Module 4

Job Marketplace

Purpose

Connect workers with employers within the seven-industry taxonomy.

Responsibilities

Job Posting (cascading Industry → Department → Role)

Search

Filtering (Industry, Department, Role, City, Experience, Salary, Shift, Employment Type, Language, Skills)

Recommendations

Applications

Shortlisting

Priority

★★★★★

---

## Module 5

Hiring Pipeline

Purpose

Move candidates through recruitment.

Stages

Applied

↓

Shortlisted

↓

Interview

↓

Selected

↓

Rejected

↓

Hired

Priority

★★★★★

---

## Module 6

Resume Builder

Purpose

Generate professional resumes.

Methods

Manual

Voice

AI

PDF

Future

Multi-language Resume

Priority

★★★★☆

---

## Module 7

Attendance

Purpose

Digitally record working hours.

Responsibilities

Check-In

GPS

Check-Out

Working Hours

Late Arrival

Overtime

Attendance History

Priority

★★★★★

---

## Module 8

Scheduling

Purpose

Assign shifts.

Responsibilities

Morning Shift

Night Shift

Flexible Shift

Rotational Shift

Holiday Calendar

Priority

★★★★☆

---

## Module 9

Payroll

Purpose

Calculate salaries.

Inputs

Attendance

Leave

Overtime

Bonuses

Deductions

Outputs

Payslip

Salary

Reports

Priority

★★★★★

---

## Module 10

Leave Management

Purpose

Manage employee leave.

Types

Paid Leave

Casual Leave

Sick Leave

Emergency Leave

Future

Half-Day

Priority

★★★★☆

---

## Module 11

Notifications

Purpose

Deliver platform communication.

Examples

Job Alert

Attendance Reminder

Offer Letter

Payroll

Announcements

Firebase

Cloud Messaging

Priority

★★★★★

---

## Module 12

Documents

Purpose

Securely store files.

Examples

Resume

Aadhaar

PAN

Certificates

Medical Reports

Police Verification

Storage

Firebase Storage

Priority

★★★★★

---

## Module 13

AI Services

Purpose

Reduce manual work.

Capabilities

Voice Resume

Job Matching

Profile Suggestions

Resume Improvements

Document Extraction

Future

Interview Assistant

Priority

★★★★☆

---

## Module 14

Analytics

Purpose

Business intelligence.

Dashboards

Worker Statistics

Hiring Funnel

Attendance

Payroll

Retention

Future

AI Insights

Priority

★★★☆☆

---

## Module 15

Master Data

Purpose

Own the platform’s shared taxonomy and reference values.

Responsibilities

- `industries` (exactly seven: construction, manufacturing, showroom, retail, hospital, elderly-care, restaurant)
- `departments` (each belongs to one industry)
- `jobRoles` (each belongs to one department)
- Employment types, shifts, skills, languages, and other reference lists
- Admin-managed extensions of departments and roles (industries change rarely)

Jobs, Profiles, Organizations, Search, Resume Builder, AI, and Analytics all consume this module. No free-text industry and no flat “Job Category” as an industry substitute.

Care-related roles (nurses, caregivers, patient attendants, etc.) are modeled under `hospital` and `elderly-care` industries—not as a separate Care Economy module.

Priority

★★★★★

---

## Module 16

Administration

Purpose

Operate the platform.

Responsibilities

User Moderation

Employer Approval

Reports

Settings

Audit Logs

Master Data administration (industries, departments, roles)

Priority

★★★★★

---

# Module Dependency Graph

```
Authentication
      │
      ▼
Master Data
      │
      ▼
Profiles
      │
      ▼
Organizations
      │
      ▼
Jobs
      │
      ▼
Hiring
      │
      ▼
Onboarding
      │
      ▼
Attendance
      │
      ▼
Payroll
      │
      ▼
Reports
```

Supporting Modules

```
Notifications

Documents

AI

Analytics

Administration
```

These modules integrate with multiple business modules. Master Data is a prerequisite for Profiles, Organizations, and Jobs because of the Industry → Department → Role hierarchy.

---

# MVP Module Selection

Not every module should be built immediately.

## Phase 1

Authentication

Master Data (seven industries, departments, jobRoles)

Profiles

Organizations

Jobs

Hiring

Notifications

Documents

---

## Phase 2

Attendance

Scheduling

Payroll

Leave

---

## Phase 3

Resume Builder

AI Matching

Analytics

Admin Portal

---

## Phase 4

Training

Learning

Finance

Third-party Integrations

(Hospital and elderly-care deep workflows, if any, extend industry-specific features inside Jobs/Profiles/Attendance—not a separate Care Economy module.)

---

# Recommended Firebase Mapping

| Module | Firebase Services |
|---------|------------------|
| Authentication | Firebase Authentication |
| Master Data | Firestore (`industries`, `departments`, `jobRoles`, other refs) |
| Profiles | Firestore + Storage |
| Organizations | Firestore |
| Jobs | Firestore |
| Hiring | Firestore + Cloud Functions |
| Attendance | Firestore |
| Payroll | Firestore + Cloud Functions |
| Notifications | Cloud Messaging |
| AI | Cloud Run + Firestore |
| Documents | Cloud Storage |
| Analytics | Firebase Analytics + BigQuery (future) |
| Administration | Firestore + Cloud Functions |

---

# Why We Are Not Using Microservices (Yet)

The original TDD recommends:

- Kafka
- Go Services
- Java Payroll Service
- Redis
- Kubernetes

These technologies are appropriate for very large enterprise deployments.

For the current implementation, we recommend a Firebase-first architecture because it provides:

- Faster development
- Lower infrastructure cost
- Built-in authentication
- Real-time database
- Push notifications
- Serverless backend
- Automatic scaling for MVP traffic

The business capabilities remain the same; only the implementation approach changes.

As the platform grows, individual modules (such as Payroll or AI Services) can be extracted into dedicated services without redesigning the product.

---

# Developer Notes

Think of these modules as independent products that happen to share the same platform.

When implementing a feature, ask:

- Which module owns this responsibility?
- Which module consumes the data?
- Should this module modify another module's data directly?
- Can this interaction be event-driven instead?

Keeping module boundaries clean today will make scaling, testing, and future refactoring much easier.

---

# Key Takeaways

- The platform is divided into business modules rather than pages.
- Each module has a single responsibility and clear ownership.
- Master Data owns the seven-industry taxonomy (`industries` → `departments` → `jobRoles`); Jobs and Profiles require those IDs.
- Hospital and elderly-care are industries inside that taxonomy, not a peer Care Economy module.
- Firebase provides sufficient capabilities for the MVP without introducing unnecessary infrastructure complexity.
- The module dependency graph defines the recommended implementation order.
- This chapter serves as the architectural foundation for all subsequent module-specific documentation.

---