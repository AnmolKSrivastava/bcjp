# Bharat Gig Documentation Migration Plan
## Refactoring the Platform Around 7 Core Employment Categories

**Document Version:** 2.0  
**Purpose:** Documentation Migration & Architecture Update  
**Target Audience:** AI Coding Agent (Cursor), Developers, Product Team

---

# Objective

This document updates the existing Bharat Gig documentation and architecture.

The previous version of the project was designed to support almost every blue-collar and grey-collar industry in India through a large number of job categories and modules.

The product strategy has now changed.

Bharat Gig will become a **specialized hiring platform** focused only on seven industries.

The purpose of this migration is to simplify:

- Product Architecture
- Database Structure
- AI Recommendation Engine
- Resume Builder
- Search & Filters
- Employer Job Posting
- Analytics
- User Experience

This document should be treated as a migration guide.

Cursor should update the existing documentation instead of creating parallel documentation.

---

# New Product Scope

The platform now officially supports only the following industries.

## 1. Construction Workers

Includes

- Civil
- Electrical
- Plumbing
- Carpentry
- Painting
- Welding
- Machine Operators
- Helpers

---

## 2. Manufacturing Company Workers

Includes

- Production
- Assembly
- Packaging
- Warehouse
- Quality Control
- Maintenance
- Factory Helpers
- Supervisors

---

## 3. Showrooms & Mall Executives

Includes

- Sales
- Customer Support
- Cashier
- Billing
- Reception
- Visual Merchandising
- Floor Executive
- Store Management

---

## 4. Retail Shop Workers

Includes

- Salesman
- Cashier
- Billing
- Inventory
- Delivery
- Counter Executive
- Store Assistant
- Shop Helper

---

## 5. Hospital Staff

Includes

- Nurses
- Ward Boys
- Patient Care Assistants
- Lab Staff
- Reception
- Billing
- Housekeeping
- Ambulance Drivers
- Technicians

---

## 6. Elderly Care

Includes

- Home Nurses
- Caregivers
- Patient Attendants
- Companions
- Live-in Care
- Dementia Care
- Palliative Care

---

## 7. Restaurant Staff

Includes

Kitchen

- Chef
- Cook
- Commis
- Kitchen Helper
- Dishwasher

Service

- Waiter
- Steward
- Captain
- Hostess
- Cashier

Operations

- Restaurant Manager
- Shift Manager
- Delivery Executive

---

# Migration Strategy

This is NOT a new project.

This is a controlled refactor.

Existing documentation should be updated instead of duplicated.

---

# Documentation Update Rules

Search the complete documentation folder.

Update every document that references:

- Generic blue collar jobs
- Unlimited industries
- Multi-industry architecture
- Future support for all occupations

Replace those concepts with the new seven-category architecture.

Do not create duplicate documents.

Update the originals.

---

# New Industry Hierarchy

Every job must now belong to the following hierarchy.

```
Industry
    ↓
Department
        ↓
Job Role
```

Example

```
Industry
Construction

Department
Electrical

Role
Electrician
```

Example

```
Industry
Restaurant

Department
Kitchen

Role
Chef
```

This hierarchy becomes the single source of truth across the platform.

---

# Database Changes

Every Job document should follow this structure.

```
industryId

industryName

departmentId

departmentName

roleId

roleName

experience

salary

city

state

employmentType

shift

genderPreference

languages

skills

status
```

Avoid storing free-text industry names.

Use IDs wherever possible.

---

# Master Data Changes

Create three master collections.

## industries

Contains only seven documents.

```
construction

manufacturing

showroom

retail

hospital

elderly-care

restaurant
```

---

## departments

Each department belongs to one industry.

Example

```
Electrical

belongsTo

Construction
```

---

## jobRoles

Each role belongs to one department.

Example

```
Electrician

belongsTo

Electrical
```

---

This creates a strict hierarchy.

---

# Resume Builder Changes

The AI Resume Builder should no longer ask users to select from hundreds of industries.

Instead ask

Industry

↓

Department

↓

Job Role

The AI should generate resumes only using experience relevant to those selected values.

---

# Voice Resume Builder

Update voice prompts.

Instead of asking

"What type of job are you looking for?"

Ask

"Which industry do you want to work in?"

Then

Construction

Manufacturing

Showroom

Retail

Hospital

Elderly Care

Restaurant

After industry selection

Ask for Department

Then Job Role

---

# Employer Dashboard Changes

Employers should no longer type industries manually.

Replace text fields with dropdowns.

Flow

Industry

↓

Department

↓

Role

This prevents duplicate data.

---

# Candidate Registration Changes

Candidate Profile should contain

Preferred Industry

Preferred Department

Preferred Job Role

Experience

Expected Salary

Preferred City

Preferred Shift

Languages

Skills

---

# Search Engine Changes

Filters become

Industry

Department

Role

City

Experience

Salary

Shift

Employment Type

Gender Preference

Language

Skills

Remove any filters related to unsupported industries.

---

# Recommendation Engine

Recommendations should prioritize

1. Industry Match

2. Department Match

3. Role Match

4. Skills

5. Experience

6. City

7. Salary

Industry becomes the strongest recommendation signal.

---

# Analytics Changes

Dashboards should aggregate data by

Industry

Department

Role

Examples

Top Hiring Industry

Top Department

Most Demanded Role

Applications per Industry

Salary Distribution per Industry

Hiring Trend by Industry

---

# Admin Panel Changes

Admin should manage

Industries

Departments

Roles

NOT arbitrary categories.

Industry management should rarely change.

Departments and Roles should remain configurable.

---

# Firestore Rules

Validate hierarchy.

Example

Role must belong to Department.

Department must belong to Industry.

Reject invalid combinations.

---

# API Changes

Every API accepting jobs should validate

Industry

Department

Role

before saving.

---

# AI Features

Update every AI module.

Resume Generation

Job Matching

Skill Suggestions

Interview Preparation

Voice Assistant

Recommendation Engine

All should understand only the seven supported industries.

---

# UI Changes

Landing Page

Replace old large category grid.

Show only seven industry cards.

Job Search

Replace category selector.

Use

Industry

↓

Department

↓

Role

Navigation

Update menus accordingly.

---

# Icons

Assign one icon to every industry.

Construction

Manufacturing

Showroom

Retail

Hospital

Elderly Care

Restaurant

Keep icon usage consistent across the application.

---

# Documentation Cleanup

Cursor should scan every markdown file.

Update

Examples

Screenshots

Architecture

Diagrams

Workflows

ER Diagrams

Firestore Examples

API Examples

Database Examples

Replace old category examples with the new hierarchy.

---

# Files Likely Requiring Updates

This list is indicative; update any additional files that reference the old taxonomy.

- Product Vision
- Business Workflow
- User Personas
- System Architecture
- Firestore Architecture
- Master Data Management
- UI/UX Design System
- Search & Recommendation
- Authentication & User Profiles
- Resume Builder
- AI Modules
- Employer Module
- Candidate Module
- Admin Module
- Analytics
- APIs
- Seed Data
- Test Data
- Firebase Functions
- Firestore Security Rules
- Developer Handbook

---

# Non-Goals

Do NOT redesign unrelated platform features.

Do NOT change authentication.

Do NOT change payment architecture.

Do NOT change notification architecture.

Do NOT change localization.

Do NOT change Firebase project structure.

Only refactor the product around the new seven-industry taxonomy.

---

# Acceptance Criteria

The migration is complete when:

- Every document consistently references the seven supported industries.
- All database models use the `Industry → Department → Role` hierarchy.
- Resume Builder, Employer Dashboard, Candidate Profile, Search, AI, Analytics, and Admin modules all consume the same taxonomy.
- Legacy "catch-all" categories and unsupported industries are removed from documentation, examples, and seed data.
- No duplicate documentation exists; existing files are updated in place.
- The seven-industry taxonomy becomes the single source of truth across the entire codebase and documentation.