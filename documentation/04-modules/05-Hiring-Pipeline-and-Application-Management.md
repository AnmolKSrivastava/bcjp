# Module 5
# Hiring Pipeline & Application Management

---

# Module Overview

The Hiring Pipeline is responsible for managing the complete recruitment lifecycle after a worker submits a job application.

The Job Marketplace attracts candidates.

The Hiring Pipeline evaluates, tracks, communicates with, and converts candidates into employees.

Every application should have a clear status, complete history, and audit trail.

This module is designed to support organizations hiring:

- 5 workers
- 500 workers
- 50,000 workers

using the same workflow.

---

# Business Purpose

Recruitment is more than collecting applications.

Organizations need to:

- Review candidates
- Compare applicants
- Schedule interviews
- Collect feedback
- Make offers
- Hire workers
- Reject unsuitable applicants

The Hiring Pipeline standardizes this process across Bharat Gig's seven core industries: construction, manufacturing, showroom, retail, hospital, elderly-care, and restaurant.

Every job in the pipeline references the platform taxonomy (Industry → Department → Role) via IDs.

---

# Business Goals

Workers should be able to:

- Apply to jobs
- Track application status
- Receive updates
- Withdraw applications
- Accept offers

Employers should be able to:

- Review applications
- Filter candidates
- Shortlist
- Reject
- Schedule interviews
- Make offers
- Hire
- Archive applications

---

# Pipeline Philosophy

Every candidate moves through clearly defined stages.

```
Applied

↓

Screening

↓

Shortlisted

↓

Interview Scheduled

↓

Interview Completed

↓

Offer Sent

↓

Offer Accepted

↓

Hired

↓

Employee Created
```

Alternative paths

```
Applied

↓

Rejected
```

or

```
Offer Sent

↓

Offer Declined
```

---

# Application Lifecycle

```
Worker

↓

Applies

↓

Application Created

↓

Employer Reviews

↓

Decision

↓

Interview

↓

Offer

↓

Hiring

↓

Employee Record Created
```

No manual employee creation should be necessary.

Hiring creates the employee automatically.

---

# Firestore Collections

```
applications/

applicationStages/

interviews/

offers/

applicationNotes/

candidateRatings/
```

---

# Application Document

```
applications/

    applicationId

        jobId

        workerId

        organizationId

        industryId

        departmentId

        roleId

        currentStage

        appliedAt

        source

        aiScore

        status

        updatedAt
```

---

# Application Stage History

Never overwrite history.

Instead:

```
applicationStages/

    stageId

        applicationId

        previousStage

        currentStage

        changedBy

        changedAt

        notes
```

This provides a complete audit trail.

---

# Interview Collection

```
interviews/

    interviewId

        applicationId

        interviewType

        interviewerId

        scheduledAt

        status

        feedback

        score
```

Supported interview types:

- Phone
- Video
- In-person
- Group
- Technical
- HR

---

# Offer Collection

```
offers/

    offerId

        applicationId

        salary

        joiningDate

        expiryDate

        status

        acceptedAt
```

Offer status:

- Draft
- Sent
- Accepted
- Declined
- Expired

---

# Candidate Notes

Recruiters should maintain private notes.

```
applicationNotes/

    noteId

        applicationId

        authorId

        visibility

        content

        createdAt
```

Visibility:

- Recruiter Only
- HR
- Hiring Manager

Workers must never see internal notes.

---

# Candidate Rating

Interviewers may rate candidates.

Criteria:

- Communication
- Technical Skills
- Behaviour
- Reliability
- Experience
- Overall Recommendation

Ratings help compare candidates objectively.

---

# Worker Experience

Workers should always know:

Current Stage

↓

Next Step

↓

Expected Timeline

↓

Employer Messages

↓

Offer Status

The application timeline should be transparent.

---

# Employer Dashboard

Recruiters should see:

Open Jobs

↓

Applications

↓

Pipeline View

↓

Candidate Details

↓

Actions

Recommended views:

- Kanban Board
- List View
- Calendar (Interviews)

---

# Kanban Pipeline

```
Applied

│
├── Rahul
├── Amit
└── Ravi

↓

Shortlisted

│
├── Pooja
└── Neha

↓

Interview

│
├── Vikas
└── Priya

↓

Offer

↓

Hired
```

Recruiters should be able to drag candidates between stages (subject to business rules).

---

# AI Candidate Matching

Every application should receive an AI compatibility score.

Factors:

- Skill Match
- Experience
- Certifications
- Salary Expectations
- Distance
- Language
- Availability
- Past Employment
- Profile Completeness

The AI score assists recruiters but never replaces human decisions.

---

# AI Candidate Summary

Generate concise summaries.

Example:

> 5 years of warehouse experience, certified forklift operator, willing to relocate, expected salary ₹18,000/month.

This saves recruiters significant review time.

---

# Duplicate Detection

Prevent duplicate applications.

Rules:

Same Worker

+

Same Job

↓

Reject duplicate

Allow reapplication only after configurable cooling-off periods.

---

# Interview Scheduling

Recruiters should schedule interviews with:

- Date
- Time
- Interviewer
- Meeting Link (future)
- Location
- Instructions

Workers receive notifications automatically.

---

# Notifications

Examples:

Application Received

Shortlisted

Interview Scheduled

Interview Reminder

Offer Sent

Offer Expiring

Application Rejected

Welcome Employee

All notifications should be event-driven.

---

# Cloud Functions

Recommended:

submitApplication()

moveCandidateStage()

scheduleInterview()

generateAIScore()

createOffer()

hireCandidate()

rejectApplication()

notifyCandidate()

---

# Hiring Event

Hiring is a major business event.

```
Offer Accepted

↓

Employee Record Created

↓

Organization Membership Updated

↓

Attendance Enabled

↓

Payroll Enabled

↓

Welcome Notification

↓

Analytics Updated
```

Hiring should trigger automation across multiple modules.

---

# Security Rules

Workers:

- Read their own applications.
- Withdraw applications.
- Accept offers.

Recruiters:

- Manage applications within their organization.

HR:

- View interview data.
- Send offers.

Administrators:

- Moderate recruitment activity.

Every query must validate organization ownership.

---

# Search

Recruiters should filter by:

- Stage
- Skills
- Experience
- Education
- Rating
- AI Score
- Availability
- Salary
- Location
- Interview Status

---

# Performance Considerations

Use pagination.

Load candidate details lazily.

Precompute AI scores.

Index:

- organizationId
- jobId
- currentStage
- workerId
- aiScore

Avoid loading large note histories unless requested.

---

# Accessibility

Workers should be able to:

- Track applications easily.
- Understand current status.
- View interview details.
- Accept offers from mobile devices.

Recruiter dashboards should remain efficient on desktop while still functioning on tablets.

---

# MVP Scope

Included

✅ Apply to Job

✅ Pipeline

✅ Stage Management

✅ Interview Scheduling

✅ Offers

✅ Hiring

Excluded

❌ Video Interview Platform

❌ Background Verification

❌ Assessment Tests

❌ Offer Negotiation Portal

❌ External ATS Integration

---

# Acceptance Criteria

The module is complete when:

- Workers can apply.
- Duplicate applications are prevented.
- Recruiters manage structured pipelines.
- Interviews are schedulable.
- Offers are generated.
- Hiring automatically creates employees.
- Workers can track application progress.

---

# Cursor Implementation Prompt

Implement the Hiring Pipeline using:

- Firestore
- Cloud Functions
- Next.js
- TypeScript

Requirements:

- Application CRUD
- Pipeline Management
- Stage History
- Interview Scheduling
- Offer Management
- AI Compatibility Score
- Candidate Timeline
- Event-driven Hiring
- Responsive Kanban Interface

---

# Dependencies

Depends on:

- Authentication
- Profiles
- Organization Management
- Job Marketplace
- Master Data
- Event Architecture

Provides data to:

- Employee Management
- Attendance
- Payroll
- Notifications
- Analytics
- AI Services

This module bridges Recruitment and Workforce Operations.

---

# Developer Notes

Treat the Hiring Pipeline as a **state machine**, not just a status field.

Every stage transition should:

- Validate business rules.
- Record history.
- Publish a business event.
- Trigger notifications where appropriate.
- Update analytics.

Never overwrite historical recruitment data.

Every decision made during hiring becomes valuable for compliance, reporting, AI training, and future recruitment improvements.

---

# Key Takeaways

- The Hiring Pipeline converts applicants into employees through a structured, auditable workflow.
- Stage history should be immutable to preserve recruitment records.
- AI assists recruiters with scoring and summaries but does not replace human judgment.
- Hiring automatically triggers downstream workforce modules through events.
- A transparent experience benefits both employers and workers, improving trust and reducing administrative effort.

---