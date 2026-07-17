# Chapter 4
# Complete Business Workflow

---

# Purpose

Before designing the database, APIs, or UI, every developer must understand **how the business actually operates**.

A common mistake during development is implementing isolated features without understanding where they fit into the overall workflow.

For example:

- Building Job Search without understanding Hiring.
- Building Attendance without understanding Payroll.
- Building Payroll without understanding Attendance.
- Building Notifications without understanding Events.

This chapter explains the entire business workflow from the perspective of the platform.

Think of this chapter as the "story" of the platform.

---

# The Workforce Lifecycle

Unlike traditional job portals, our platform manages workers throughout their employment journey.

The complete lifecycle looks like this:

```
Visitor

↓

Account Registration

↓

Identity Verification

↓

Profile Creation

↓

Resume Generation

↓

Job Discovery

↓

Job Application

↓

Employer Review

↓

Interview / Verification

↓

Offer

↓

Acceptance

↓

Onboarding

↓

Shift Assignment

↓

Attendance

↓

Payroll

↓

Performance

↓

Promotion / Internal Transfer

↓

Exit

↓

Future Employment
```

Every module in the platform exists somewhere in this workflow.

---

# Stage 1 — Visitor

## Business Goal

Convert an anonymous visitor into a registered user.

The visitor could be:

- Worker
- Employer
- Recruiter
- Hospital
- Factory
- Retail Company

---

## Entry Points

The visitor may arrive through:

- Google Search
- Facebook Advertisement
- WhatsApp Link
- QR Code
- Employer Invitation
- Referral Link
- Newspaper Advertisement
- Direct Website Visit

---

## UI

Landing Page

↓

Language Selection

↓

Register

---

## Firebase

No authentication required.

Analytics should record:

- Device
- Language
- Referral Source
- Campaign

---

# Stage 2 — Registration

The user chooses:

Worker

or

Employer

Registration should be extremely simple.

Only collect:

- Mobile Number
- OTP
- Name

Everything else can be completed later.

---

## Why?

Many users abandon registration forms that ask for too much information.

Progressive onboarding results in much higher completion rates.

---

Firebase

```
Firebase Auth

↓

OTP Verification

↓

Create Firestore User Document
```

---

# Stage 3 — Profile Completion

After registration, the user completes their profile.

Workers provide:

- Name
- Address
- Skills
- Experience
- Languages
- Preferred Location
- Documents

Employers provide:

- Company Name
- GST (optional initially)
- Industry
- Office Location
- Contact Person

---

Important Principle

Registration and profile creation are two different processes.

Never block registration because of incomplete profile data.

---

# Stage 4 — Verification

Verification increases trust.

Possible verification types:

Identity

Address

Employer Verification

Skill Verification

Police Verification (Care Module)

Medical Verification

Experience Verification

Not every verification is mandatory.

Verification requirements depend on industry.

---

Example

A warehouse helper may only need Aadhaar verification.

A caregiver may require:

- Police Verification
- Medical Certificate
- Care Training Certificate

---

# Stage 5 — Resume Generation

This is one of the platform's differentiators.

Instead of asking workers to upload resumes, the platform helps create them.

Possible methods:

Manual Form

↓

Voice Guided Builder

↓

AI Assisted Resume

↓

PDF Generation

This greatly reduces the barrier to employment.

---

Future AI Flow

```
Voice

↓

Speech to Text

↓

AI Structuring

↓

Resume

↓

Firestore

↓

PDF
```

---

# Stage 6 — Job Discovery

Workers search jobs.

Filtering options include:

Location

Salary

Industry

Distance

Experience

Accommodation

Shift Timing

Job Type

---

Future Recommendation Engine

Instead of searching,

the platform should recommend jobs.

Based on:

Location

↓

Experience

↓

Skills

↓

Previous Employment

↓

Availability

↓

Employer Preferences

---

# Stage 7 — Job Application

Worker clicks:

Apply

↓

Application Created

↓

Employer Notified

↓

Worker Receives Confirmation

The application enters the employer pipeline.

---

Firestore

```
jobs/

applications/

notifications/
```

---

# Stage 8 — Employer Review

Employer sees:

Applicant List

↓

Profile

↓

Resume

↓

Documents

↓

Experience

↓

Verification Status

↓

Decision

Possible outcomes:

Accepted

Rejected

Interview

Need More Information

Hold

---

# Stage 9 — Hiring

Employer selects candidate.

Offer generated.

Worker receives notification.

Worker accepts.

Employment begins.

At this point the worker becomes:

Employee

instead of

Candidate.

This distinction is important throughout the application.

---

# Stage 10 — Onboarding

After joining,

the employee receives:

Organization

Department

Supervisor

Shift

Joining Date

Site Assignment

Attendance Permissions

Payroll Profile

Without onboarding,

attendance should not begin.

---

# Stage 11 — Shift Assignment

Every employee belongs to one or more shifts.

Example

Morning

Evening

Night

Flexible

Rotational

The shift determines:

Working Hours

↓

Attendance Window

↓

Payroll

↓

Overtime

↓

Leave

---

# Stage 12 — Attendance

Worker arrives.

↓

Opens App

↓

GPS Verification

↓

Check-In

↓

Working Day Starts

↓

Check-Out

↓

Working Day Ends

Attendance becomes the source of truth for payroll.

This is a fundamental architectural principle.

---

# Stage 13 — Payroll

Payroll should never be manually entered.

Instead:

Attendance

+

Leave

+

Holiday Calendar

+

Overtime

+

Bonuses

+

Deductions

↓

Salary Calculation

↓

Payslip

↓

Payment

---

# Stage 14 — Communication

Communication occurs throughout employment.

Examples:

Job Alerts

Shift Reminder

Attendance Reminder

Payroll Completed

Leave Approved

Emergency Alerts

Employer Announcement

Future:

In-App Chat

Voice Messages

AI Assistant

---

# Stage 15 — Performance History

Every completed employment contributes to the worker's profile.

Examples:

Attendance %

Projects Completed

Employer Rating

Skill Growth

Promotions

Employment Duration

These records improve future employability.

---

# Stage 16 — Career Growth

Long-term workers should receive:

Skill Recommendations

Training

Better Jobs

Promotion Suggestions

Certification Programs

The platform should encourage continuous career development rather than one-time hiring.

---

# Stage 17 — Exit

Employment eventually ends.

Reasons:

Resignation

Contract Complete

Termination

Retirement

Transfer

The platform should preserve:

Employment History

Attendance

Payroll

Certificates

Experience

Future employers may use this history during hiring.

---

# Stage 18 — Future Employment

The worker returns to the marketplace.

Unlike first-time users,

they now possess:

Verified Experience

Employer Ratings

Employment History

Skills

Attendance Record

The hiring process becomes faster.

The platform becomes more valuable with every completed job.

---

# The Employer Workflow

Employer

↓

Create Organization

↓

Complete Verification

↓

Purchase Subscription (Future)

↓

Post Job

↓

Receive Applications

↓

Hire Worker

↓

Assign Supervisor

↓

Assign Shift

↓

Track Attendance

↓

Approve Leave

↓

Generate Payroll

↓

Analytics

↓

Retention

---

# The Admin Workflow

Administrator

↓

Approve Employer

↓

Monitor Platform

↓

Resolve Disputes

↓

View Analytics

↓

Moderate Reports

↓

Manage Announcements

↓

Support Users

---

# Business Principles

Several important principles emerge from the complete workflow.

## Employment is continuous.

Hiring is only the beginning.

---

## Attendance drives payroll.

Payroll should never exist independently.

---

## Verification builds trust.

Every verification increases platform credibility.

---

## Every action creates history.

History becomes valuable data.

---

## AI should reduce effort.

Users should type as little as possible.

---

## Simplicity is more valuable than feature count.

A worker with limited digital literacy must be able to complete every essential workflow.

---

# Firebase Mapping

| Business Stage | Firebase Service |
|----------------|------------------|
| Registration | Firebase Auth |
| Profile | Firestore |
| Documents | Cloud Storage |
| Resume | Firestore + Storage |
| Jobs | Firestore |
| Applications | Firestore |
| Notifications | Cloud Messaging |
| Attendance | Firestore |
| Payroll | Firestore + Cloud Functions |
| Analytics | Firebase Analytics |

---

# Developer Notes

This workflow is the backbone of the entire application.

Every future chapter—including database design, Firestore collections, APIs, Cloud Functions, UI components, and AI services—will map back to one or more stages described here.

If you ever wonder where a feature belongs, return to this chapter and locate the stage of the employment lifecycle it supports.

A feature that cannot be mapped to the lifecycle should be questioned before implementation. This discipline keeps the product focused and prevents unnecessary complexity.

---

# Key Takeaways

- The platform manages the complete employment lifecycle, not just hiring.
- Registration, verification, onboarding, attendance, payroll, and career growth are interconnected stages.
- Attendance is the operational source of truth for payroll.
- Employment history is a long-term asset that benefits both workers and employers.
- Every module in the system should support one or more stages of this workflow.

---