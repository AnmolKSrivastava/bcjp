# Chapter 3
# Stakeholders, User Personas & Access Control

---

# Purpose of this Chapter

Before designing the database, authentication system, or dashboards, we must clearly understand **who uses the platform** and **what each user is allowed to do**.

Every feature in the platform exists because one or more stakeholders require it.

This chapter defines:

- Every stakeholder
- Their goals
- Their responsibilities
- Their permissions
- Their dashboards
- Their interactions with other users

These definitions will later become:

- Firebase Authentication Roles
- Firestore Security Rules
- Application Routing
- Dashboard Navigation
- Permission Management

---

# 1. Stakeholder Overview

The Workforce Management Platform serves multiple categories of users.

Unlike a traditional job portal that only has employers and job seekers, this platform manages an entire workforce ecosystem.

The primary stakeholders are:

| User Type | Primary Purpose |
|------------|-----------------|
| Worker | Find jobs and manage employment |
| Employer | Hire and manage workforce |
| Supervisor | Monitor workers at sites |
| Recruiter | Manage hiring pipeline |
| HR Executive | Employee lifecycle management |
| Payroll Executive | Salary processing |
| Operations Executive | Daily operational management |
| Finance Team | Financial reporting |
| Compliance Officer | Documentation & audits |
| Care Coordinator | Hospital Staff and Elderly Care operations |
| System Administrator | Platform administration |
| Super Administrator | Complete platform control |

Not every customer will use every role.

Small businesses may only require Workers and Employers.

Large enterprises may use all available roles.

---

# 2. Design Philosophy

Instead of creating separate applications for every user type, the platform uses a **single authentication system**.

Each authenticated user receives a role.

The application dynamically changes:

- Navigation
- Available pages
- Dashboard
- API permissions
- Firestore permissions

based on that role.

This significantly reduces maintenance complexity.

---

# 3. Worker

## Description

Workers are the primary users of the platform.

They represent frontline workers within Bharat Gig's seven industries, for example:

- Construction electricians, plumbers, welders, and helpers
- Manufacturing machine operators, assembly, packaging, and factory helpers
- Showroom floor executives, cashiers, and sales staff
- Retail shop assistants, counter executives, and inventory staff
- Hospital nurses, ward boys, lab staff, and housekeeping
- Elderly-care caregivers, home nurses, and companions
- Restaurant chefs, cooks, waiters, and kitchen helpers

Workers select preferred **Industry → Department → Role** from master data (`industries`, `departments`, `jobRoles`). Free-text industries are not supported.

---

## Primary Goals

Workers want to:

- Find employment
- Build professional identity
- Maintain employment history
- Record attendance
- Receive salary
- Improve career opportunities

---

## Worker Dashboard

The worker dashboard should provide:

Home

Jobs

Attendance

Profile

Notifications

Documents

Payroll

Support

Future modules:

Training

Certificates

Wallet

Rewards

---

## Worker Permissions

Workers can:

✅ Create profile

✅ Update profile

✅ Upload documents

✅ Apply for jobs

✅ Accept offers

✅ View assigned shifts

✅ Mark attendance

✅ View salary

✅ Receive notifications

Workers cannot:

❌ Modify payroll

❌ Edit employer information

❌ View other workers

❌ Approve attendance

❌ Delete organization data

---

# 4. Employer

## Description

Employers create employment opportunities and manage workers.

Examples (within the seven industries only):

- Construction firms
- Manufacturing companies
- Showrooms and malls
- Retail shops
- Hospitals
- Elderly-care homes and agencies
- Restaurants

Each employer organization is tied to a supported industry from master data. Jobs they post must use **Industry → Department → Role** (no free-text industry).

---

## Primary Goals

Employers want to:

- Hire workers

- Verify candidates

- Assign shifts

- Monitor attendance

- Process payroll

- Improve productivity

---

## Employer Dashboard

Dashboard

Job Management

Applications

Employees

Attendance

Payroll

Reports

Notifications

Settings

---

## Employer Permissions

Employers can:

Create jobs

Hire workers

Assign shifts

Approve leave

Manage attendance

View reports

Download payroll reports

Communicate with workers

Cannot:

Modify platform configuration

Access other companies

Change system settings

---

# 5. Supervisor

Supervisors manage workers on-site.

They bridge operations between workers and employers.

---

Responsibilities

Daily attendance

Shift verification

Worker communication

Issue reporting

Emergency handling

Performance observations

---

Dashboard

Today's Shift

Attendance

Worker List

Incidents

Announcements

SOS Alerts

---

Permissions

Approve attendance

Close shifts

Verify worker location

Submit incident reports

Cannot:

Hire workers

Modify payroll

Delete workers

Access financial reports

---

# 6. Recruiter

Recruiters focus exclusively on hiring.

Responsibilities:

Post jobs

Review applications

Shortlist candidates

Schedule interviews

Generate offers

Track hiring pipeline

They do not manage attendance or payroll.

---

# 7. HR Executive

Responsibilities

Employee onboarding

Document verification

Leave management

Policy communication

Employment records

Performance documentation

Offboarding

HR is responsible for the employee lifecycle after hiring.

---

# 8. Payroll Executive

Responsibilities

Attendance verification

Salary calculations

Bonus management

Overtime

Deductions

Payslip generation

Payroll reports

Payroll should always be generated from attendance records rather than manual data entry.

---

# 9. Operations Executive

Responsible for day-to-day platform operations.

Examples:

Site monitoring

Worker allocation

Shift management

Emergency coordination

Resource utilization

Operational reporting

---

# 10. Finance Team

Responsibilities

Salary payments

Invoice management

Employer billing

Financial reports

Tax reporting

Accounting integration

Future:

ERP integration

---

# 11. Compliance Officer

Responsible for regulatory compliance.

Responsibilities

Identity verification

Background verification

Medical verification

Police verification

License validation

Audit preparation

Compliance reports

This role becomes especially important for Hospital Staff and Elderly Care hiring, where police, medical, and certification checks are often required.

---

# 12. Care Coordinator

Specific to the **Hospital Staff** and **Elderly Care** industries (not a separate Care Economy product module).

Responsibilities

Assign caregivers and hospital support staff

Manage patient / family relationships

Track medical certifications

Respond to SOS alerts

Coordinate emergencies

Maintain caregiver and ward-staff availability

This role supports operations within those two industries inside the same platform.

---

# 13. System Administrator

Responsible for operating the platform.

Responsibilities

Manage users

Manage organizations

Moderate content

Monitor system health

Manage notifications

View analytics

Resolve disputes

Administrators should never modify business data directly unless performing approved administrative actions.

---

# 14. Super Administrator

The highest privilege level.

Can:

Manage administrators

Configure platform

Access analytics

Manage feature flags

Configure Firebase

Manage billing

View audit logs

Perform maintenance

This account should be extremely limited.

Ideally only a handful of trusted administrators should possess it.

---

# 15. Role Hierarchy

```
Super Admin

↓

System Admin

↓

Employer

↓

HR

↓

Recruiter

↓

Supervisor

↓

Worker
```

Some organizations may choose to disable intermediate roles.

The platform should support flexible role assignment.

---

# 16. Role Relationships

```
Employer

├── HR

├── Recruiter

├── Payroll

├── Operations

├── Supervisor

└── Workers
```

The Employer owns the organization.

Internal staff inherit permissions based on assigned roles.

---

# 17. Firebase Authentication Strategy

Authentication should remain simple.

Each authenticated user receives:

UID

↓

Role

↓

Organization ID

↓

Permissions

↓

Dashboard

Example

```
User

↓

Firebase Authentication

↓

Firestore User Profile

↓

Role Lookup

↓

Organization Lookup

↓

Load Dashboard
```

No custom authentication server is required for the MVP.

Firebase Authentication with custom claims is sufficient.

---

# 18. Firestore Role Structure

Recommended document

```
users/

    uid

        displayName

        role

        organizationId

        status

        permissions

        profileCompleted

        createdAt
```

Organizations

```
organizations/

    organizationId

        name

        industryId          // one of the seven: construction, manufacturing, showroom, retail, hospital, elderly-care, restaurant

        status

        subscription

        settings
```

Industry must reference the `industries` master collection. Departments and roles used in jobs reference `departments` and `jobRoles`.

---

# 19. Security Philosophy

Never trust the frontend.

Every operation must be validated by:

Firestore Security Rules

or

Cloud Functions

Examples:

A worker cannot update another worker's profile.

A supervisor cannot approve payroll.

An employer cannot access another employer's data.

A recruiter cannot delete organizations.

Permissions must always be enforced on the server side.

---

# 20. Future Expansion

The architecture should allow new roles without redesigning the platform.

Potential future roles:

Training Manager

Vendor

Government Inspector

Insurance Partner

Learning Coordinator

API Client

Auditor

Because permissions are role-based, new user types can be added with minimal architectural changes.

---

# Developer Notes

Do **not** hardcode roles throughout the frontend.

Instead:

- Create a centralized Role & Permission service.
- Use route guards for protected pages.
- Derive navigation menus from permissions.
- Check permissions again in Firestore Security Rules and Cloud Functions.
- Treat the frontend as a convenience layer—not a security boundary.

This approach keeps the system maintainable as roles evolve.

---

# Key Takeaways

- The platform supports multiple stakeholder types beyond Workers and Employers, within the seven industries.
- Workers and employers use Industry → Department → Role from master data; Hospital Staff and Elderly Care are industries, not a separate Care Economy module.
- Roles determine both UI and backend permissions.
- A single authentication system with role-based authorization keeps the architecture simple.
- Firestore Security Rules should enforce permissions independently of the frontend.
- The role model is designed to scale as new user types are introduced within the supported industries.

---