# Module 3
# Organization Management & Multi-Tenancy

---

# Module Overview

Organizations are the foundation of the employer side of the platform.

Every employer, supervisor, HR executive, recruiter, payroll officer, and worker (after hiring) belongs to an organization.

Organizations own:

- Jobs
- Employees
- Attendance
- Payroll
- Departments
- Locations
- Reports
- Permissions

Without organizations there is no data isolation.

This module transforms the platform from a simple job portal into a true enterprise workforce management system.

---

# Business Purpose

The platform should support companies of every size within Bharat Gig’s seven supported industries.

Examples:

- Construction Company
- Manufacturing Company
- Showroom / Mall Operator
- Retail Shop or Retail Chain
- Hospital
- Elderly Care Provider
- Restaurant Kitchen, Service & Operations

Each organization’s industry must be one of these seven (or multiple selections only among the seven if the tenant spans more than one). Out-of-scope industries such as security agency or logistics-as-industry are not supported as organization industries.

Each organization should feel like it owns its own private version of the platform.

No organization should ever see another organization's information.

---

# Business Goals

The Organization module should allow companies to:

- Register
- Verify ownership
- Invite employees
- Create departments
- Create work locations
- Manage teams
- Assign permissions
- Manage subscriptions (Future)

---

# Why Multi-Tenancy?

Imagine these companies use the platform:

ABC Hospital

Sunrise Manufacturing

City Bites Restaurant

All three use the same website.

However,

ABC Hospital should never see

- Sunrise workers

or

- Sunrise attendance

or

- Sunrise payroll

The system therefore operates as:

```
Platform

↓

Organization

↓

Department

↓

Users

↓

Business Data
```

---

# Organization Lifecycle

```
Employer Registration

↓

Organization Created

↓

Verification

↓

Profile Completed

↓

Departments Added

↓

Locations Added

↓

Employees Invited

↓

Jobs Published

↓

Hiring Begins
```

---

# Organization Types

Organization industry must map to one (or more, only among) of the seven Master Data industries:

- construction
- manufacturing
- showroom
- retail
- hospital
- elderly-care
- restaurant

Operational labels (for display) may refine the type—for example Factory under manufacturing, Mall under showroom, Care Home under elderly-care—but must not introduce a new top-level industry.

Future (still constrained to the seven industries):

Staffing Agency (placing workers into the seven industries)

Training Institute (skills for the seven industries)

---

# Organization Structure

```
Organization

│

├── Branch

│

├── Department

│

├── Site

│

├── Employees

│

├── Jobs

│

├── Attendance

│

└── Payroll
```

Organizations may have multiple branches.

Each branch may have multiple sites.

---

# Organization Profile

Basic Information

- Organization Name
- Industry (industryId — required; one of the seven, or a list of industryIds only from the seven)
- Registration Number
- GST (optional for MVP)
- Company Logo
- Contact Details
- Website
- Description

Do not store free-text industry. Resolve names from Master Data.

---

# Contact Information

Primary Contact

Email

Phone

Support Number

Office Address

Head Office

Emergency Contact

---

# Verification Status

Possible states:

```
Pending

Verified

Rejected

Suspended
```

Verification is managed by administrators.

---

# Departments

Distinguish two concepts:

1. **Taxonomy departments** (Master Data) — part of Industry → Department → Role used on jobs and candidate preferences (for example Kitchen under restaurant, Nursing under hospital). Owned by Master Data, not created ad hoc by employers as industry substitutes.

2. **Organization departments** — internal units for reporting and permissions within a tenant.

Organizations may create operational units such as:

Human Resources

Operations

Finance

Sales

Maintenance

Administration

Nursing Floor (hospital)

Kitchen / Service (restaurant)

Care Unit (elderly-care)

Do not model out-of-scope peer modules (for example a standalone “Care Economy” org type). Hospital and elderly-care cover care-related hiring and workforce needs.

---

# Work Locations

Examples:

Factory 1 (manufacturing)

Production Floor Warehouse Bay (manufacturing location, not a platform industry)

Hospital Wing B (hospital)

Retail Store 12 (retail)

Showroom Floor A (showroom)

Construction Site 5 (construction)

Restaurant Outlet 3 (restaurant)

Care Home Unit 2 (elderly-care)

Every employee should be assigned to a location.

Attendance and analytics depend on this assignment.

---

# Branches

Large organizations may operate in multiple cities.

Example:

```
ABC Hospital

│

├── Patna

├── Delhi

├── Kolkata

└── Ranchi
```

Branches inherit organization settings but maintain separate operational data.

---

# Invitation Flow

The recommended employee onboarding flow is:

```
HR

↓

Invite Employee

↓

SMS / WhatsApp Link

↓

Employee Registers

↓

Employee Joins Organization
```

This reduces manual data entry.

---

# Organization Settings

Examples:

Working Hours

Time Zone

Attendance Policy

Payroll Cycle

Holiday Calendar

Leave Policy

Notification Preferences

Future modules should read these settings instead of storing duplicates.

---

# Firestore Collections

```
organizations/

organizationMembers/

departments/

branches/

locations/
```

---

# Organization Document

```
organizations/

    organizationId

        name

        slug

        industryId

        industryIds

        verificationStatus

        logo

        ownerId

        subscriptionPlan

        createdAt

        updatedAt
```

`industryId` is the primary industry. Optional `industryIds` may list additional industries only from the seven supported values. Both must validate against Master Data `industries`.

---

# Members Collection

```
organizationMembers/

    membershipId

        organizationId

        userId

        role

        status

        joinedAt
```

This design allows users to belong to multiple organizations in the future.

---

# Department Collection

```
departments/

    departmentId

        organizationId

        name

        managerId
```

---

# Branch Collection

```
branches/

    branchId

        organizationId

        city

        address

        status
```

---

# Location Collection

```
locations/

    locationId

        organizationId

        branchId

        name

        latitude

        longitude

        radius
```

GPS attendance later depends on these coordinates.

---

# Why Separate Membership Collection?

Avoid storing large employee arrays inside the organization document.

Bad

```
organization

employees[]

```

This eventually exceeds Firestore document limits.

Better

```
organizationMembers

↓

Organization

↓

User
```

---

# Cloud Functions

Recommended:

createOrganization()

inviteEmployee()

acceptInvitation()

verifyOrganization()

createDefaultDepartments()

createAuditLog()

---

# Security Rules

Users may read only organizations they belong to.

Workers cannot modify organization settings.

HR cannot delete organizations.

Administrators may verify organizations.

Super Admin manages platform-wide settings.

Every query must include organization validation.

---

# Organization Switching

Future feature.

A consultant may work with:

Organization A

Organization B

Organization C

The application should support organization switching without logging out.

---

# Notifications

Examples:

Organization Verified

Invitation Received

Invitation Accepted

Department Assigned

Location Changed

Branch Added

---

# Search

Employers should search:

Departments

Employees

Locations

Branches

Jobs

Workers should search only jobs belonging to organizations.

---

# Analytics

Examples:

Employees Per Department

Attendance By Branch

Hiring Funnel

Payroll Cost

Open Positions

Worker Distribution

---

# Subscription Ready

Although not required for MVP, the architecture should support:

Free

Starter

Professional

Enterprise

Subscription should control feature availability, not data ownership.

---

# Edge Cases

Duplicate Organization Name

Duplicate GST

Multiple Invitations

Organization Suspension

Owner Deleted

Branch Closed

Department Removed

Location Archived

Member Leaves Organization

Every case should preserve historical data.

---

# Performance Considerations

Never load every employee when loading an organization.

Load:

Organization

↓

Departments

↓

Current Page of Employees

↓

Additional Data On Demand

Use pagination for large datasets.

---

# Accessibility

Large employers may primarily use desktop.

Workers remain mobile-first.

Therefore organization dashboards should support both layouts equally well.

---

# MVP Scope

Included

✅ Organization Creation

✅ Departments

✅ Locations

✅ Membership

✅ Invitations

Excluded

❌ Subscription Billing

❌ ERP Integration

❌ Multiple Owners

❌ Organization Merging

---

# Acceptance Criteria

The module is complete when:

- Organizations can register.
- Members can be invited.
- Departments exist.
- Locations exist.
- Firestore enforces organization isolation.
- Employees only access their organization's data.

---

# Cursor Implementation Prompt

Implement the Organization Management module using:

- Firestore
- Firebase Authentication
- Cloud Functions
- TypeScript
- Next.js App Router

Requirements:

- Organization CRUD
- Department CRUD
- Branch CRUD
- Location CRUD
- Membership Management
- Invitation Workflow
- Firestore Security Rules
- Responsive UI

---

# Dependencies

Depends on:

Authentication

Profiles

Master Data (`industries` — and taxonomy departments/roles when posting jobs)

Provides data to:

Jobs

Hiring

Attendance

Payroll

Analytics

Notifications

Administration

Every employer-facing module depends on Organization Management.

---

# Developer Notes

Think of the Organization module as the **tenant boundary**.

Every business query must first answer:

> "Which organization owns this data?"

If that question cannot be answered confidently, the data model or security model is incomplete.

Organization industry must be constrained to the seven Master Data industries. Taxonomy departments/roles for jobs come from Master Data; org departments are for internal structure only.

Never rely on the frontend to enforce organization boundaries. Every Firestore rule, Cloud Function, and query should validate organization ownership.

As the platform grows to support hundreds or thousands of companies, this discipline will ensure data isolation, simplify compliance, and enable future SaaS subscription models without major architectural changes.

---

# Key Takeaways

- Organizations are tenants, not just company profiles.
- Organization industry is always one of the seven supported industries (multi-industry only among those seven).
- Every piece of business data belongs to exactly one organization.
- Membership is modeled separately to support scalability and future multi-organization users.
- Org departments, branches, and locations provide operational hierarchy; job taxonomy departments come from Master Data.
- Strong organization boundaries are the foundation of security, reporting, and scalability.

---