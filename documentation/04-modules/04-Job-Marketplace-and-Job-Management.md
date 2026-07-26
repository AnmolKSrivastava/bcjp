# Module 4
# Job Marketplace & Job Management

---

# Module Overview

The Job Marketplace is the primary interaction point between workers and employers.

For workers, it is a discovery platform that helps them find suitable employment opportunities.

For employers, it is a recruitment engine that enables them to create, manage, publish, and fill vacancies efficiently.

Unlike traditional job portals, this marketplace is deeply integrated with the rest of the Workforce Management Platform.

A published job is not an isolated advertisement.

It is the starting point of a complete workforce lifecycle:

Job

↓

Applications

↓

Hiring

↓

Employee

↓

Attendance

↓

Payroll

↓

Career History

---

# Business Purpose

The goal of this module is to make hiring simple for employers while making job discovery effortless for workers.

The platform should:

- Reduce hiring time.
- Improve candidate quality.
- Increase application rates.
- Support AI-powered matching.
- Support multilingual job postings.
- Support mobile-first job discovery.

---

# Business Goals

Employers should be able to:

- Create jobs.
- Save drafts.
- Publish jobs.
- Pause hiring.
- Close vacancies.
- Duplicate existing jobs.
- Archive completed jobs.

Workers should be able to:

- Discover jobs.
- Filter jobs.
- Save jobs.
- Apply.
- Track applications.
- Receive recommendations.

---

# Job Lifecycle

Every job follows a predictable lifecycle.

```
Draft

↓

Under Review (optional)

↓

Published

↓

Applications Open

↓

Interviewing

↓

Filled

↓

Closed

↓

Archived
```

The job status controls user visibility and business rules.

---

# Job Ownership

Every job belongs to exactly one organization and must also sit in the platform taxonomy.

```
Organization

↓

Branch / Location

↓

Job
```

Taxonomy (required on every job; independent of org structure):

```
Industry

↓

Department

↓

Role
```

Only authorized members of the organization may modify the job.

---

# Industry Taxonomy

Bharat Gig supports exactly seven industries. Every job must reference IDs from Master Data—no free-text industry and no flat “Job Category” as a substitute.

Supported industry IDs:

- `construction`
- `manufacturing`
- `showroom`
- `retail`
- `hospital`
- `elderly-care`
- `restaurant`

Hierarchy:

```
Industry → Department → Role
```

Example:

```
restaurant → Kitchen → Chef
```

Employment type (full-time, daily wage, etc.) is separate from taxonomy and must not be used as an industry substitute.

---

# Job Types

Supported types (employment classification only):

- Full-Time
- Part-Time
- Contract
- Temporary
- Internship
- Apprenticeship
- Daily Wage
- Seasonal
- Freelance

Reference values come from Master Data. These values describe how the worker is paid/engaged, not which industry they work in.

---

# Employment Modes

Examples:

- On-site
- Remote
- Hybrid

Future:

- Work from Home
- Project Assignment

---

# Job Information

Every job contains:

Taxonomy (required IDs + denormalized names)

- industryId / industryName
- departmentId / departmentName
- roleId / roleName

Basic Information

- Job Title
- Organization
- Branch
- Work Location
- City / State

Employment

- Employment Type
- Shift Type
- Working Days
- Working Hours

Compensation

- Salary Range
- Overtime Policy
- Incentives
- Benefits

Requirements

- Required Skills
- Preferred Skills
- Experience
- Education
- Certifications
- Languages
- Gender Preference (optional)

Hiring

- Number of Openings
- Hiring Manager
- Application Deadline
- Joining Date

Visibility

- Public
- Internal
- Invitation Only

---

# Employer Job Post Flow

Employers must not type industries or invent categories.

Use cascading dropdowns driven by Master Data:

```
Industry

↓

Department (filtered by industry)

↓

Role (filtered by department)
```

Then collect salary, city, shift, employment type, skills, and other fields.

Invalid combinations (role not under selected department, department not under industry) must be rejected on save.

---

# Required vs Preferred Skills

Employers often confuse mandatory and optional skills.

The system should distinguish between:

Required

- Driving License
- Heavy Vehicle Experience

Preferred

- English Speaking
- Computer Knowledge

AI matching should prioritize required skills first.

---

# Job Description

Rather than storing a single long paragraph, structure the content.

Sections:

- About the Role
- Responsibilities
- Requirements
- Benefits
- Working Conditions
- Growth Opportunities

Structured content improves search and AI analysis.

---

# Salary Model

Support:

Fixed Salary

Salary Range

Hourly Rate (future)

Daily Wage

Monthly Salary

Performance Incentive

Benefits

Examples:

- PF
- ESI
- Accommodation
- Meals
- Transport
- Medical Insurance

---

# Multi-Location Hiring

One job may recruit for multiple locations.

Example:

```
Industry: hospital
Department: Nursing
Role: Staff Nurse

↓

Patna

↓

Muzaffarpur

↓

Bhagalpur
```

Do not duplicate jobs unnecessarily.

Instead, associate multiple work locations with a single job posting.

---

# Firestore Collections

```
jobs/

jobLocations/

jobSkills/

jobBenefits/

jobViews/

savedJobs/
```

Large arrays should be modeled carefully to avoid document growth.

---

# Job Document

```
jobs/

    jobId

        organizationId

        industryId

        industryName

        departmentId

        departmentName

        roleId

        roleName

        title

        description

        experience

        salaryMin

        salaryMax

        city

        state

        employmentType

        shift

        genderPreference

        languages

        skills

        status

        openings

        createdBy

        publishedAt

        expiresAt

        createdAt

        updatedAt
```

`industryId`, `departmentId`, and `roleId` are required and must resolve to Master Data. Names are denormalized for display and search. Do not store free-text industry in place of IDs.

---

# Job Skills

```
jobSkills/

    jobSkillId

        jobId

        skillId

        required

        minimumExperience
```

This enables flexible querying and AI matching.

---

# Job Locations

```
jobLocations/

    locationId

        jobId

        branchId

        workLocationId
```

---

# Saved Jobs

Workers should be able to bookmark jobs.

```
savedJobs/

    savedJobId

        userId

        jobId

        savedAt
```

---

# Job Views

Useful for analytics.

```
jobViews/

    viewId

        userId

        jobId

        viewedAt
```

Future AI recommendations can use this behavior.

---

# Search Experience

Workers should filter and search using:

- Industry
- Department
- Role
- City
- Experience
- Salary
- Shift
- Employment Type
- Language
- Skills

Optional supporting filters:

- Job Title
- Organization

Industry, Department, and Role filters should cascade (same hierarchy as posting). Filters for unsupported industries or legacy flat categories must not appear.

Filters should be combinable.

---

# AI-Assisted Job Creation

Employers may describe a job in natural language.

Example:

> "Need 5 staff nurses for night shift at our Patna hospital, full-time."

AI should extract and map to taxonomy:

- industryId / departmentId / roleId (within the seven industries)
- Title
- Skills
- Shift
- Employment Type
- Openings
- City / Location
- Suggested Salary
- Certifications

The employer reviews cascading dropdown selections before publishing. AI must never invent an out-of-scope industry (for example security or logistics as a top-level industry).

---

# AI Job Recommendations

Recommendations should prioritize:

1. Industry match
2. Department match
3. Role match
4. Skills
5. Experience
6. City
7. Salary

Also consider:

- Language
- Past Applications
- Saved Jobs
- Employer Preferences

The recommendation engine should explain *why* a job is recommended.

---

# Job Expiry

Jobs should expire automatically after the configured deadline.

Expired jobs:

- No longer appear in search.
- Remain available for historical reporting.
- Can be republished.

Cloud Functions should handle expiration.

---

# SEO Strategy

Since the platform is web-first, public jobs should be indexable.

Each public job page should include:

- Structured metadata.
- Open Graph tags.
- Canonical URLs.
- JSON-LD JobPosting schema.
- Search-friendly URLs.

Example:

```
/jobs/staff-nurse-patna-abc-hospital
```

This improves discoverability through search engines.

---

# Notifications

Events:

Job Published

↓

Notify matching workers

Job Closing Soon

↓

Notify employer

Application Deadline

↓

Reminder

Job Filled

↓

Stop recommendations

---

# Security Rules

Workers:

- Read published jobs.
- Save jobs.
- Apply.

Employers:

- Create jobs.
- Update their own jobs.
- Archive jobs.

Administrators:

- Moderate.
- Remove fraudulent postings.
- Feature selected jobs.

---

# Cloud Functions

Recommended:

publishJob()

expireJob()

duplicateJob()

calculateJobScore()

updateSearchIndex()

notifyMatchingWorkers()

archiveJob()

---

# Performance Considerations

- Paginate job listings.
- Use composite Firestore indexes.
- Cache master data.
- Lazy-load company logos.
- Avoid loading full descriptions in list views.
- Precompute search fields where appropriate.

The marketplace should remain responsive with hundreds of thousands of active jobs.

---

# Accessibility

- Large touch targets.
- Readable typography.
- Voice-over compatibility.
- High contrast.
- Simple filters.
- Clear application buttons.

---

# MVP Scope

Included

✅ Job CRUD

✅ Drafts

✅ Publishing

✅ Search

✅ Filtering

✅ Saved Jobs

✅ Multi-location support

Excluded

❌ AI Job Writing

❌ Sponsored Jobs

❌ Paid Promotions

❌ External ATS Integration

❌ Job Templates Marketplace

---

# Acceptance Criteria

The module is complete when:

- Employers can create and publish jobs.
- Workers can discover and filter jobs.
- Jobs support structured requirements.
- Search performs efficiently.
- Saved jobs work.
- Job lifecycle is enforced.
- SEO metadata is generated for public listings.

---

# Cursor Implementation Prompt

Implement the Job Marketplace module using:

- Next.js App Router
- TypeScript
- Firebase Firestore
- Cloud Functions
- Tailwind CSS

Requirements:

- Job CRUD with required industryId, departmentId, roleId
- Cascading Industry → Department → Role dropdowns on post
- Draft workflow
- Publishing lifecycle
- Multi-location jobs
- Structured requirements
- Search & filters (Industry, Department, Role, City, Experience, Salary, Shift, Employment Type, Language, Skills)
- Saved jobs
- SEO-friendly public job pages
- Responsive worker and employer interfaces

---

# Dependencies

Depends on:

- Authentication
- Profiles
- Organization Management
- Master Data (`industries`, `departments`, `jobRoles`)
- Event Architecture

Provides data to:

- Hiring Pipeline
- AI Matching
- Notifications
- Analytics
- Search
- Administration

This module is the foundation of the Recruitment Engine.

---

# Developer Notes

Treat jobs as structured business objects rather than text advertisements.

Every job must store taxonomy IDs from Master Data. Employment type and shift are orthogonal fields—never treat them as industry or category.

Every field should be designed to support:

- Search
- AI matching
- Reporting
- Analytics
- Automation

Avoid storing important information only inside free-text descriptions. If a piece of information will be filtered, searched, or analyzed, it should exist as a structured field in Firestore.

The quality of the Job Marketplace directly influences hiring success, recommendation accuracy, and long-term data quality across the entire platform.

---

# Key Takeaways

- The Job Marketplace is the entry point into the recruitment lifecycle.
- Every job uses Industry → Department → Role IDs from the seven supported industries.
- Jobs are structured entities with clear ownership, lifecycle, and relationships.
- AI should assist both job creation and candidate discovery within the taxonomy.
- Firestore schemas should optimize search, filtering, and scalability.
- A web-first SEO strategy helps attract workers through search engines while maintaining a responsive mobile experience.

---