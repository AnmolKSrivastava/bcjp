# Module 2
# User Profile & Digital Identity

---

# Module Overview

Authentication answers one question:

> **Who is this user?**

The Profile module answers a completely different question:

> **Who is this person professionally?**

The platform's core asset is not authentication.

It is the digital identity that workers gradually build over months and years.

Unlike social media profiles, this profile represents a worker's professional life.

Every completed profile increases:

- Hiring probability
- Trust
- AI recommendation quality
- Employer confidence
- Future employment opportunities

The profile becomes a living professional record.

---

# Business Purpose

The majority of India's workforce has:

- No resume
- No employment history
- No digital portfolio
- No verified skills
- No standardized professional identity

As a result, workers repeatedly start from zero every time they apply for a job.

The objective of this module is to create a persistent digital identity that grows throughout the worker's career.

---

# Design Principles

A profile should never feel like filling a government form.

Instead:

Registration

↓

Basic Profile

↓

Employment

↓

Skills

↓

Documents

↓

Experience

↓

Verification

↓

Ratings

↓

Career History

The profile evolves naturally.

---

# Module Responsibilities

This module owns:

- Personal Information
- Contact Information
- Professional Information
- Skills
- Languages
- Work Experience
- Education
- Certifications
- Documents
- Profile Completion
- Profile Visibility

It does NOT own:

Authentication

Attendance

Payroll

Job Applications

Notifications

Those belong to separate modules.

---

# Supported User Types

The profile module supports:

Worker

Employer

Recruiter

Supervisor

HR

Administrator

Each role extends a common base profile.

---

# Profile Lifecycle

```
User Registers

↓

Empty Profile

↓

Basic Information

↓

Skills Added

↓

Documents Uploaded

↓

Experience Added

↓

Profile Verified

↓

Resume Generated

↓

Job Applications

↓

Employment History Grows

↓

Trusted Professional Identity
```

---

# Profile Completion Strategy

Never force users to complete everything at once.

Instead, guide them with progressive completion.

Example:

Level 1

✅ Name

✅ Phone

↓

20%

---

Level 2

Photo

Address

Skills

↓

45%

---

Level 3

Experience

Education

Languages

↓

70%

---

Level 4

Documents

Certificates

Verification

↓

100%

A visible completion indicator encourages users to finish their profile.

---

# Worker Profile

A worker profile consists of the following sections.

## Personal Information

- Full Name
- Date of Birth
- Gender
- Photo
- Mobile Number
- Email (optional)

---

## Address

Permanent Address

Current Address

Preferred Work Location

State

District

PIN Code

---

## Professional Details

Current Occupation

Years of Experience

Preferred Industry (industryId / industryName — one of the seven)

Preferred Department (departmentId / departmentName)

Preferred Role (roleId / roleName)

Preferred Salary

Preferred City

Preferred Shift

Employment Type (full-time, daily wage, etc. — separate from taxonomy)

Languages

Skills

Availability

Notice Period

Preferred Industry, Department, and Role must use cascading Master Data selections. Do not store free-text industry or a flat “Job Category.”

Supported industries only:

- construction
- manufacturing
- showroom
- retail
- hospital
- elderly-care
- restaurant

---

## Skills

Examples aligned to supported industries:

Electrician

Welder

Plumber

Machine Operator

Retail Sales

Cashier

Kitchen Helper

Cooking

Housekeeping

Patient Care

Caregiving (elderly-care / hospital roles)

Packaging

Quality Control

Each skill should include:

Skill Name

Experience

Proficiency

Verified?

---

## Languages

Hindi

English

Bengali

Tamil

Marathi

Telugu

Gujarati

Punjabi

Odia

etc.

Include:

Read

Write

Speak

---

## Education

Highest Qualification

School

ITI

Diploma

Degree

Passing Year

---

## Work Experience

Company

Role

Location

Joining Date

Leaving Date

Responsibilities

Achievements

Reason for Leaving

Future versions may import employment automatically from previous employers.

---

## Certifications

Examples:

Forklift License

Driving License

Nursing Certificate

Electrician License

Fire Safety

Industrial Training

Each certificate should have:

Issue Date

Expiry Date

Verification Status

Document

---

## Documents

Supported documents:

Aadhaar

PAN

Driving License

Passport

Medical Certificate

Police Verification

Skill Certificates

Resume PDF

Documents are stored separately from profile metadata.

---

# Employer Profile

Employer profiles differ significantly.

Fields include:

Company Name

Industry (industryId — must be one of the seven supported industries)

GST (optional)

Business Type

Website

Head Office

Branches

Contact Person

Organization Size

Verification Status

Employer Rating

If an employer operates across multiple lines of business, each industry selection must still be among the seven. Do not allow out-of-scope industries (for example security agency or logistics as a top-level industry).

---

# Profile Visibility

Workers should control visibility.

Options:

Public

Only Employers

Private

Hidden

Future:

Anonymous Job Search

---

# Resume Generation

The profile is the source of truth for resume generation.

Resume

↓

Generated from

↓

Personal Details

Preferred Industry / Department / Role

Skills

Experience

Education

Certificates

Employment History

Resume and voice builders should ask Industry → Department → Role (cascading), not open-ended “what type of job.” AI should generate content only for experience relevant to those selected values.

Users should never edit the resume directly.

They edit the profile.

The resume updates automatically.

---

# Firestore Structure

```
users/

    uid/

        basic/

        professional/

        skills/

        experience/

        education/

        certifications/

        preferences/

        settings/
```

Large collections should not be stored in a single document to avoid Firestore size limits.

---

# Suggested Collections

```
users/

skills/

certifications/

experience/

languages/

education/

documents/
```

Keep reusable reference data separate from user-specific data.

---

# Cloud Storage

Store:

Profile Photos

Documents

Certificates

Generated Resume PDFs

Future:

Voice Recordings

Video Introductions

---

# Cloud Functions

Recommended functions:

calculateProfileCompletion()

generateResume()

verifyCertificate()

indexSearchProfile()

updateSearchRanking()

These functions should run automatically when profile data changes.

---

# Search Index

Every profile should generate a searchable index.

Search fields include:

Preferred Industry (industryId)

Preferred Department (departmentId)

Preferred Role (roleId)

Location / City

Skills

Experience

Availability

Language

Expected Salary

Employment Type

Shift

Verification Status

This index supports employer search and AI recommendations within the seven-industry taxonomy.

---

# Notifications

Examples:

Complete Your Profile

Upload Documents

Verification Approved

Resume Generated

Profile Viewed

Profile 100% Complete

---

# Security Rules

Workers:

Can edit only their own profile.

Employers:

Cannot modify worker profiles.

Administrators:

May verify but not impersonate users.

Documents should only be readable by authorized users.

Sensitive information (such as Aadhaar numbers) should never be publicly accessible.

---

# Edge Cases

Duplicate skills

Expired certificates

Missing documents

Deleted experience

Invalid dates

Future joining dates

Conflicting employment history

Multiple current employers

Incomplete profiles

The system should gracefully handle inconsistent information.

---

# Performance Considerations

Do not load the entire profile on every page.

Load only required sections.

Examples:

Dashboard

↓

Basic Profile

Job Search

↓

Skills

Experience

Employer Search

↓

Professional Information

Documents only when needed.

---

# Accessibility

Support:

Voice input

Regional languages

Large buttons

Simple forms

Save and continue later

Progress indicators

---

# MVP Scope

Included

✅ Personal Information

✅ Skills

✅ Experience

✅ Documents

✅ Resume Generation

✅ Profile Completion

Excluded

❌ AI Resume Optimization

❌ Video Introductions

❌ Skill Assessments

❌ Blockchain Verification

---

# Future Enhancements

AI Profile Suggestions

Automatic Skill Detection

Experience Verification

Digital Employment Passport

QR Code Resume

Video Resume

Government Verification APIs

LinkedIn-style Professional Network

---

# Testing Checklist

Create Profile

Edit Profile

Upload Photo

Delete Experience

Add Skill

Remove Skill

Upload Document

Generate Resume

Profile Completion

Role Restrictions

Slow Network

Offline Retry

Mobile Browser

Desktop Browser

---

# Dependencies

Depends on:

Authentication

Master Data (`industries`, `departments`, `jobRoles`)

Provides data to:

Jobs

Hiring

AI

Attendance

Payroll

Analytics

Administration

Resume Builder

Everything that understands the worker depends on this module.

---

# Developer Notes

Treat the profile as the **single source of truth** for all professional information.

Never duplicate profile fields inside other modules.

Candidate preferences must store industryId, departmentId, and roleId from Master Data—not free-text industry labels.

For example:

The Jobs module should reference the user's skills rather than storing a separate copy.

The Resume module should generate documents from the profile rather than maintaining an independent resume editor.

This principle keeps the platform consistent and prevents data synchronization issues.

---

# Key Takeaways

- Authentication establishes identity; the Profile module establishes professional identity.
- Candidate preferences use Preferred Industry / Department / Role within the seven supported industries.
- Profiles evolve throughout a worker's career rather than being completed once.
- Resume generation should always derive from profile data and the taxonomy hierarchy.
- Progressive profile completion improves user onboarding.
- Other modules should consume profile data rather than duplicating it.

---