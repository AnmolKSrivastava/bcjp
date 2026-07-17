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

Every job belongs to exactly one organization.

```
Organization

↓

Department

↓

Location

↓

Job
```

Only authorized members of the organization may modify the job.

---

# Job Types

Supported types:

- Full-Time
- Part-Time
- Contract
- Temporary
- Internship
- Apprenticeship
- Daily Wage
- Seasonal
- Freelance

Reference values come from Master Data.

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

Basic Information

- Job Title
- Job Category
- Department
- Organization
- Branch
- Work Location

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
Security Guard

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

        departmentId

        title

        description

        employmentType

        status

        salaryMin

        salaryMax

        openings

        createdBy

        publishedAt

        expiresAt

        createdAt

        updatedAt
```

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

Workers should search using:

- Job Title
- Skill
- Industry
- Salary
- Experience
- Location
- Shift
- Employment Type
- Organization

Filters should be combinable.

---

# AI-Assisted Job Creation

Employers may describe a job in natural language.

Example:

> "Need 20 security guards for a warehouse in Patna, night shift."

AI should extract:

- Title
- Skills
- Shift
- Openings
- Location
- Suggested Salary
- Certifications

The employer reviews and edits before publishing.

---

# AI Job Recommendations

Recommendations should consider:

- Skills
- Experience
- Preferred Location
- Expected Salary
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
/jobs/security-guard-patna-abc-hospital
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

- Job CRUD
- Draft workflow
- Publishing lifecycle
- Multi-location jobs
- Structured requirements
- Search & filters
- Saved jobs
- SEO-friendly public job pages
- Responsive worker and employer interfaces

---

# Dependencies

Depends on:

- Authentication
- Profiles
- Organization Management
- Master Data
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
- Jobs are structured entities with clear ownership, lifecycle, and relationships.
- AI should assist both job creation and candidate discovery.
- Firestore schemas should optimize search, filtering, and scalability.
- A web-first SEO strategy helps attract workers through search engines while maintaining a responsive mobile experience.

---