# Chapter 6
# Data Ownership & Firestore Architecture

---

# Purpose

Modern software projects fail not because developers cannot write code, but because they do not agree on **who owns the data**.

When data ownership is unclear, applications quickly suffer from:

- Duplicate information
- Inconsistent records
- Difficult debugging
- Slow performance
- Complex security rules
- Expensive database reads
- Impossible scalability

This chapter defines the architectural rules that every module in the Workforce Management Platform must follow.

It serves as the foundation for all future database and backend decisions.

---

# The Single Source of Truth Principle

Every piece of information must have exactly one owner.

That owner is responsible for creating, updating, validating, and maintaining that data.

Other modules may read the data.

Other modules may reference the data.

But they must never own it.

---

## Example

Worker Name

Owner

```
Profile Module
```

Attendance

Needs worker name?

Read it.

Do NOT store another copy.

Payroll

Needs worker name?

Read it.

Do NOT duplicate it.

Notifications

Needs worker name?

Read it.

Never own it.

---

This single principle eliminates hundreds of synchronization bugs.

---

# Data Ownership Matrix

| Data | Owner Module | Consumers |
|----------|-------------|------------|
| User Identity | Authentication | Entire Platform |
| Worker Details | Profile | Jobs, Attendance, Payroll |
| Employer Details | Organization | Jobs, Reports |
| Jobs | Job Marketplace | Hiring |
| Applications | Hiring | Notifications |
| Attendance | Attendance | Payroll |
| Payroll | Payroll | Reports |
| Documents | Document Module | Profile |
| Notifications | Notification Module | Everyone |
| Analytics | Analytics | Admin |

Every row above has exactly one owner.

---

# Firestore Design Philosophy

Firestore is not a relational database.

It is a document database optimized for:

- Fast reads
- Real-time updates
- Horizontal scaling
- Offline support
- Simple queries

Therefore we optimize for:

Read speed

instead of

Database normalization.

However,

we avoid unnecessary duplication.

---

# Architecture Overview

```
Authentication

↓

Users

↓

Organizations

↓

Jobs

↓

Hiring

↓

Employees

↓

Attendance

↓

Payroll

↓

Reports
```

Supporting Modules

```
Documents

Notifications

AI

Analytics

Settings
```

---

# Root Collections

The platform should begin with a small number of top-level collections.

```
users/

organizations/

jobs/

applications/

employees/

attendance/

payroll/

notifications/

documents/

settings/

audit_logs/
```

Avoid creating dozens of unrelated root collections.

---

# Why Root Collections?

Every major business domain deserves its own collection.

Good

```
jobs/

attendance/

users/
```

Bad

```
worker_jobs/

worker_attendance/

employee_jobs/

attendance_history/

daily_attendance/

monthly_attendance/
```

Organize around business concepts, not UI pages.

---

# Document IDs

Never use sequential IDs.

Good

```
Auto Generated Firebase IDs
```

or

```
UUID
```

Bad

```
User001

Worker12

Attendance99
```

Random IDs improve scalability.

---

# Users Collection

Authentication creates the user.

```
users/

    uid

        displayName

        phoneNumber

        role

        organizationId

        profileStatus

        accountStatus

        createdAt

        updatedAt
```

Never store:

Attendance

Payroll

Applications

Large documents

inside the user document.

---

# Organizations

```
organizations/

    organizationId

        companyName

        type

        industry

        locations

        subscription

        createdAt
```

Organization data belongs only here.

---

# Jobs

```
jobs/

    jobId

        title

        location

        salary

        employerId

        status

        createdAt
```

Applications should NOT live inside job documents.

Large arrays become expensive.

Instead

```
applications/
```

stores references.

---

# Applications

```
applications/

    applicationId

        workerId

        jobId

        employerId

        status

        createdAt
```

This makes querying much easier.

---

# Employees

An applicant becomes an employee after hiring.

```
employees/

    employeeId

        workerId

        organizationId

        joiningDate

        supervisorId

        shiftId

        status
```

Notice

Employees

≠

Users

Not every user is an employee.

---

# Attendance

Attendance owns attendance.

```
attendance/

    attendanceId

        employeeId

        date

        checkIn

        checkOut

        gps

        status
```

Never embed attendance inside employee documents.

---

# Payroll

```
payroll/

    payrollId

        employeeId

        month

        attendanceSummary

        salary

        deductions

        status
```

Payroll references attendance.

Payroll never edits attendance.

---

# Notifications

```
notifications/

    notificationId

        userId

        title

        body

        read

        createdAt
```

Keep notifications independent.

Every module may create notifications.

Only Notification Module owns them.

---

# Documents

```
documents/

    documentId

        ownerId

        type

        storagePath

        verification

        uploadedAt
```

Actual files remain inside Firebase Storage.

Firestore stores metadata only.

---

# Audit Logs

Every critical action should be recorded.

```
audit_logs/

    logId

        actor

        action

        target

        timestamp
```

Examples

Attendance Approved

Payroll Generated

Worker Suspended

Employer Verified

---

# Relationships

Instead of joins,

Firestore uses references.

Example

Attendance

↓

employeeId

↓

Employee

↓

workerId

↓

User

Never duplicate the entire user document.

---

# Denormalization Strategy

Firestore allows limited denormalization.

Acceptable example

Attendance

```
employeeName
```

stored for reporting.

Not acceptable

Entire employee profile copied.

Rule

Duplicate small immutable values.

Never duplicate large mutable objects.

---

# Soft Deletes

Never immediately delete business data.

Instead

```
status

active

deleted

archived
```

This preserves history.

---

# Timestamps

Every document should include

```
createdAt

updatedAt
```

Optional

```
deletedAt

lastViewed

lastModifiedBy
```

Always use Firestore server timestamps.

---

# Ownership Rules

Only one module owns each document.

Example

Attendance Module

Can

Create attendance

Update attendance

Close attendance

Payroll Module

Can

Read attendance

Cannot modify attendance

---

# Cloud Functions Philosophy

Cloud Functions should perform

Business Logic

Examples

Generate Payroll

Verify Attendance

Generate Resume

Send Notification

Create Audit Log

The frontend should remain thin.

---

# Security Philosophy

Security is enforced in layers.

```
Authentication

↓

Authorization

↓

Firestore Rules

↓

Cloud Functions

↓

Audit Logs
```

Never rely on frontend validation.

---

# Event-Driven Design

Modules communicate using events.

Example

Attendance Created

↓

Notification

↓

Payroll Update

↓

Analytics Update

Instead of calling every module directly.

Future versions may introduce Eventarc or Pub/Sub, but the architectural principle remains the same.

---

# Read Optimization

Firestore charges per document read.

Design documents to minimize reads.

Good

One employee document

Bad

Twenty nested lookups for a dashboard

Think about reads before writing collections.

---

# Scaling Strategy

Current Architecture

```
Firebase

↓

Firestore

↓

Cloud Functions
```

Future

```
Firebase

↓

Cloud Run

↓

Microservices

↓

BigQuery

↓

Data Warehouse
```

The database design should support this migration without breaking clients.

---

# Naming Conventions

Collections

```
users

jobs

attendance
```

lowercase plural.

Fields

camelCase

```
createdAt

organizationId

phoneNumber
```

Document IDs

Auto generated.

Avoid abbreviations.

Write descriptive names.

---

# Anti-Patterns

Avoid

❌ Nested collections everywhere

❌ Massive documents

❌ Duplicate profile data

❌ Client-generated permissions

❌ Business logic in React components

❌ Direct payroll editing

❌ Firestore reads inside loops

---

# Developer Rules

Every developer should ask:

Who owns this data?

Should this be a new collection?

Can this document become too large?

Can another module reuse this?

Will this query remain fast with one million records?

If these questions are answered correctly, the architecture will remain healthy as the platform grows.

---

# Key Takeaways

- Every piece of business data has a single owner.
- Firestore collections should represent business domains rather than UI pages.
- References are preferred over duplication.
- Cloud Functions own business logic.
- Firestore Security Rules enforce authorization.
- Event-driven communication keeps modules independent.
- Good data architecture today prevents costly migrations tomorrow.

---