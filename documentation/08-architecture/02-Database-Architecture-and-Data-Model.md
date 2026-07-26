# Module 25
# Database Architecture & Data Model

---

# Module Overview

The Database Architecture defines how information is structured, stored, secured, queried, indexed, archived, and maintained throughout the Workforce Management Platform.

The platform uses **Google Cloud Firestore** as the primary operational database during Phase 1 due to its serverless architecture, scalability, real-time synchronization, offline capabilities, and native integration with Firebase services.

This document establishes standards for:

- Firestore Collections
- Document Structure
- Relationships
- Transactions
- Data Integrity
- Query Optimization
- Indexing
- Versioning
- Data Lifecycle
- Multi-Tenant Isolation

The objective is to create a database architecture that remains efficient from the first customer to millions of employees across thousands of organizations.

---

# Database Objectives

The database should provide:

- High Availability
- Automatic Scalability
- Low Latency
- Strong Security
- Tenant Isolation
- Offline Synchronization
- Real-time Updates
- Efficient Querying
- AI-ready Data Structures
- Future Analytics Support

---

# Why Firestore

Firestore was selected because it provides:

- Serverless Infrastructure
- Automatic Scaling
- Global Availability
- Native Firebase Integration
- Offline Persistence
- Real-time Listeners
- Security Rules
- Flexible Document Model
- Cost-effective MVP Deployment

Firestore aligns well with the product's Phase 1 architecture.

---

# Database Design Principles

The platform follows these principles:

- Tenant First
- Document Oriented
- Flat Structures
- Denormalize Carefully
- Read Optimization
- Immutable History
- Event Driven
- Secure by Default
- AI Friendly
- Future Analytical Compatibility

---

# High-Level Database Architecture

```
Users

↓

Next.js

↓

Cloud Functions

↓

Firestore

↓

Cloud Storage

↓

Analytics Pipeline (Future)

↓

BigQuery (Future)
```

Firestore remains the operational database.

---

# Database Domains

Primary collections include:

organizations/

users/

employees/

industries/

departments/

jobRoles/

branches/

roles/

attendance/

leaveRequests/

shifts/

payroll/

recruitment/

notifications/

auditLogs/

subscriptions/

aiRequests/

reports/

systemSettings/

Each business domain owns its data.

---

# Platform Taxonomy (Master Data)

Bharat Gig uses a fixed **Industry → Department → Role** hierarchy as platform-wide reference data. Jobs, candidate profiles, applications, and analytics reference these masters by ID — never by free-text labels.

## Canonical Industries

The `industries/` collection contains exactly seven documents:

```
construction

manufacturing

showroom

retail

hospital

elderly-care

restaurant
```

## Taxonomy Collections

```
industries/

departments/        # platform taxonomy departments (scoped to industryId)

jobRoles/           # platform job roles (scoped to departmentId)
```

Example hierarchy:

```
Industry: construction
    Department: electrical
        Role: electrician

Industry: restaurant
    Department: kitchen
        Role: chef
```

## Job Document (Taxonomy Fields)

Every job and application-linked posting should store:

```
industryId

industryName        # denormalized for display

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

Use IDs for queries and filters; denormalize names only for read optimization.

## Validation Rules

- Every `departmentId` must reference a department whose `industryId` matches the job's `industryId`.
- Every `roleId` must reference a job role whose `departmentId` matches the job's `departmentId`.
- Invalid hierarchy combinations must be rejected at Cloud Functions and Firestore Security Rules.

Platform administrators manage industries (rarely), departments, and roles — not arbitrary job categories.

---

# Tenant Isolation

Every document belongs to exactly one organization.

Example:

```
organizationId

↓

Employees

↓

Attendance

↓

Payroll

↓

Recruitment

↓

Reports
```

Every query must include organization filtering.

Cross-tenant queries are prohibited except for platform administrators under controlled conditions.

---

# Collection Naming Standards

Rules:

- Lowercase
- Plural Names
- No Spaces
- Consistent Terminology
- Domain-based Organization

Example:

```
employees/

attendance/

leaveRequests/

notifications/
```

---

# Document Structure

Every document should contain common metadata.

Example:

```
id

organizationId

createdBy

createdAt

updatedBy

updatedAt

status

version
```

This metadata supports auditing and synchronization.

---

# Employee Collection

```
employees/

    employeeId

        organizationId

        employeeCode

        firstName

        lastName

        email

        phone

        departmentId

        branchId

        jobRoleId

        industryId

        reportingManager

        employmentType

        joiningDate

        status

        createdAt

        updatedAt
```

Sensitive fields should be classified according to Module 18.

---

# Attendance Collection

```
attendance/

    attendanceId

        organizationId

        employeeId

        date

        checkIn

        checkOut

        location

        source

        status

        shiftId

        workingHours
```

Attendance records should remain immutable after payroll closure unless authorized.

---

# Leave Requests

```
leaveRequests/

    requestId

        organizationId

        employeeId

        leaveType

        startDate

        endDate

        reason

        approvalStatus

        approvedBy

        createdAt
```

---

# Payroll

```
payroll/

    payrollId

        organizationId

        employeeId

        payrollMonth

        earnings

        deductions

        taxes

        netSalary

        generatedAt

        approvedAt
```

Payroll history should never be overwritten.

---

# Recruitment

```
candidates/

jobOpenings/

interviews/

offers/

applications/
```

Recruitment entities remain separate from employee records until onboarding.

---

# Notification Collection

```
notifications/

    notificationId

        organizationId

        recipientId

        type

        title

        message

        status

        createdAt

        deliveredAt

        readAt
```

---

# AI Collections

```
aiRequests/

aiConversations/

promptTemplates/

modelConfigurations/

aiUsage/
```

Sensitive prompts should never expose confidential customer information.

---

# Relationships

Firestore does not support joins.

Relationships should use document references or IDs.

Example:

```
Employee

↓

departmentId

↓

Department Document
```

Avoid excessive nesting.

---

# Denormalization Strategy

Duplicate only stable information.

Good candidates:

Industry Name

Department Name

Role Name

Organization Name

Employee Code

Avoid duplicating frequently changing data.

---

# Transactions

Use Firestore transactions for:

Payroll Generation

Leave Approval

Attendance Correction

Employee Creation

Role Changes

Subscription Updates

Transactions ensure consistency.

---

# Batch Operations

Use batch writes for:

Bulk Employee Import

Notification Creation

Settings Updates

Reference Data

Batch size should remain within Firestore limits.

---

# Indexing Strategy

Create composite indexes for:

Organization + Status

Organization + Date

Employee + Date

Department + Status

industryId + status

industryId + departmentId + roleId

Payroll Month + Organization

Avoid unnecessary indexes.

Review index usage periodically.

---

# Query Optimization

Guidelines:

Always filter by organizationId.

Limit returned fields where possible.

Paginate large datasets.

Avoid client-side filtering.

Use indexed queries.

Prefer cursor pagination.

Optimize read costs.

---

# Soft Delete Strategy

Business records should use soft deletion.

Fields:

```
status

deletedAt

deletedBy
```

Critical records should never be physically removed immediately.

---

# Archiving Strategy

Archive:

Old Notifications

Historical Logs

Expired Sessions

Old AI Requests

Temporary Reports

Archived data should remain recoverable according to retention policies.

---

# Versioning

Documents may include:

```
version

schemaVersion
```

Schema evolution should remain backward compatible.

---

# Audit References

Critical documents should reference audit events.

Example:

```
employeeId

↓

auditLogId
```

Audit data remains immutable.

---

# Data Validation

Validation occurs at:

Client

↓

Cloud Function

↓

Firestore Security Rules

↓

Database

No document should enter Firestore without validation.

---

# Firestore Security Rules

Rules validate:

Authentication

Organization Ownership

Permissions

Subscription

Document Ownership

Security Rules should deny access by default.

---

# Offline Synchronization

Firestore offline persistence should support:

Employee Profiles

Attendance

Leave Requests

Schedules

Settings

Synchronization conflicts should follow Module 21 policies.

---

# Data Retention

Suggested retention:

Attendance

7 Years

Payroll

10 Years

Audit Logs

7 Years

Notifications

180 Days

Sessions

30 Days

AI Requests

90 Days

Organizations should configure retention where regulations permit.

---

# Backup Strategy

Use:

Automatic Firestore Backups

Export Jobs

Encrypted Archives

Disaster Recovery Procedures

Backups should be tested periodically.

---

# Future Analytics

Operational database remains optimized for transactions.

Future analytical workloads should move to:

BigQuery

Data Warehouse

Business Intelligence Platform

Operational queries should not become analytical queries.

---

# Firestore Collections

```
organizations/

users/

employees/

industries/

departments/

jobRoles/

branches/

roles/

attendance/

leaveRequests/

shifts/

payroll/

jobOpenings/

applications/

candidates/

interviews/

offers/

notifications/

auditLogs/

subscriptions/

aiRequests/

aiConversations/

promptTemplates/

reports/

systemSettings/

featureFlags/
```

---

# Cloud Functions

Recommended

createEmployee()

recordAttendance()

approveLeave()

generatePayroll()

archiveOldRecords()

cleanupExpiredSessions()

syncOfflineChanges()

generateReports()

validateDocument()

---

# Monitoring

Monitor:

Firestore Reads

Firestore Writes

Storage Growth

Document Count

Index Usage

Slow Queries

Transaction Failures

Batch Failures

Database Costs

Monitoring integrates with Module 19.

---

# Security

Protect:

Tenant Isolation

Sensitive Fields

Encrypted Backups

Secure Queries

Audit Logging

Least Privilege Access

Database security follows Module 18.

---

# Accessibility

Database architecture has no direct accessibility requirements.

Administrative database tools should remain accessible where applicable.

---

# MVP Scope

Included

✅ Firestore

✅ Cloud Storage

✅ Real-time Synchronization

✅ Offline Persistence

✅ Transactions

✅ Batch Operations

✅ Composite Indexes

✅ Soft Deletes

Excluded

❌ Relational Database

❌ Graph Database

❌ Event Store Database

❌ Dedicated Search Engine

❌ Data Warehouse

---

# Acceptance Criteria

The database architecture is complete when:

- Every domain has defined collections.
- Tenant isolation is enforced.
- Queries are optimized.
- Indexes support production workloads.
- Transactions maintain consistency.
- Security Rules protect all collections.
- Backup and retention strategies are documented.
- Future analytics architecture is defined.

---

# Cursor Implementation Prompt

Implement the Firestore database architecture using:

- Cloud Firestore
- Cloud Functions
- Firebase Authentication
- Firebase Storage
- TypeScript

Requirements:

- Domain-based Collections
- Multi-tenant Isolation
- Composite Indexes
- Transactions
- Batch Operations
- Offline Compatibility
- Security Rules
- Audit Integration
- Soft Deletes
- Data Retention Policies

Ensure the schema remains scalable, cost-efficient, and compatible with future migration to analytical databases without requiring major restructuring.

---

# Dependencies

Depends on:

- Authentication
- Security & Audit Architecture
- Observability & Monitoring
- Progressive Web App
- System Architecture

Provides services to:

- Every Business Module
- AI Platform
- Reporting Engine
- Notification Engine
- Platform Administration
- Future Analytics Platform

The database architecture serves as the persistent foundation of the Workforce Management Platform.

---

# Developer Notes

Firestore should be treated as the source of truth for operational data.

Design documents to optimize reads, as Firestore pricing and performance are read-sensitive.

Avoid deeply nested collections, unnecessary duplication, and client-side joins.

Every schema change should include:

- Security Rule updates
- Index review
- Migration strategy
- Documentation update
- Backward compatibility review
- Test coverage

Schema evolution should be deliberate, incremental, and fully documented.

---

# Future Enhancements

- BigQuery Data Pipeline
- Search Index (Algolia/OpenSearch)
- Time-series Storage
- Data Lake
- Event Store
- Data Catalog
- Automated Data Lifecycle Management
- AI-driven Query Optimization
- Cross-region Replication
- Multi-database Strategy
- Read Model Optimization (CQRS)

---

# Key Takeaways

- Firestore is the operational database optimized for real-time, serverless, multi-tenant workloads.
- Data structures prioritize scalability, security, and efficient querying while remaining compatible with offline synchronization.
- Platform taxonomy (Industry → Department → Role) is shared master data referenced by ID across jobs, profiles, and analytics.
- Tenant isolation, auditability, indexing, and validation are fundamental database design principles.
- The schema is designed for long-term evolution, allowing future analytics and search platforms to be introduced without disrupting operational workloads.
- The database architecture supports every platform capability while remaining aligned with Firebase-first engineering principles.

---