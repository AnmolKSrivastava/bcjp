# Chapter 10
# Authorization, Roles & Permission Architecture

---

# Purpose

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

This chapter defines the authorization model used throughout the Workforce Management Platform.

The system should support organizations of all sizes while remaining flexible enough to introduce enterprise-grade permission models in future releases.

---

# Design Principles

The authorization system should be:

- Secure
- Organization-aware
- Scalable
- Easy to understand
- Easy to audit
- Future-proof

Authorization decisions should always be enforced on the backend.

The frontend should only improve user experience by hiding unavailable actions.

---

# Authentication vs Authorization

Authentication

↓

Identity

↓

Firebase Authentication

Authorization

↓

Permissions

↓

Firestore + Security Rules

Cloud Functions

Every request must satisfy both.

---

# Core Concepts

The platform uses four concepts.

```
User

↓

Organization Membership

↓

Role

↓

Permissions
```

Permissions are never granted directly to users.

Permissions belong to roles.

Users inherit permissions through organization membership.

---

# Default Platform Roles

The MVP includes:

- Worker
- Supervisor
- Recruiter
- HR Executive
- Payroll Executive
- Branch Manager
- Organization Admin
- Platform Admin
- Super Admin

Each role has progressively broader access.

---

# Role Hierarchy

```
Super Admin

↓

Platform Admin

↓

Organization Admin

↓

Branch Manager

↓

HR Executive

↓

Payroll Executive

↓

Recruiter

↓

Supervisor

↓

Worker
```

This hierarchy is conceptual.

Permissions should still be explicitly assigned.

Never rely solely on hierarchy.

---

# Worker Permissions

Workers may:

- View own profile
- Edit profile
- Apply for jobs
- Track applications
- View attendance
- Request leave
- View payroll
- Download payslips
- Upload documents

Workers may never:

- View other employees
- Edit payroll
- Create jobs
- Manage attendance for others

---

# Supervisor Permissions

Supervisors may additionally:

- View team members
- Mark attendance for team
- Approve attendance corrections
- Recommend leave
- View shift schedules
- Submit performance feedback

Supervisors cannot:

- Approve payroll
- Manage organization settings
- Create departments

---

# Recruiter Permissions

Recruiters may:

- Create jobs
- Edit jobs
- Review applications
- Schedule interviews
- Reject candidates
- Send offers (subject to policy)

Recruiters cannot:

- Access payroll
- Modify attendance
- Delete organizations

---

# HR Executive Permissions

HR may:

- Manage employees
- Approve leave
- Assign managers
- Transfer employees
- Update departments
- Complete onboarding
- Process exits

HR should not modify financial payroll data unless granted additional permissions.

---

# Payroll Executive Permissions

Payroll teams may:

- Generate payroll
- Approve payroll
- Release salary
- View attendance summaries
- Export payroll reports

Payroll should not manage recruitment.

---

# Branch Manager Permissions

Branch Managers operate only within assigned branches.

They may:

- View branch employees
- Approve attendance
- Review branch analytics
- Manage local operations

They cannot access data from other branches.

---

# Organization Admin

Organization Admins may:

- Manage organization settings
- Invite members
- Create departments
- Manage branches
- Configure policies
- Assign roles

Organization Admins cannot manage other organizations.

---

# Platform Admin

Platform Admins work for the platform provider.

They may:

- Moderate organizations
- Verify companies
- Review reports
- Suspend organizations
- Manage platform-wide configuration

They do not participate in daily HR operations.

---

# Super Admin

Reserved for platform owners.

Responsibilities:

- Platform configuration
- Billing management
- Feature flags
- Emergency maintenance
- Global analytics
- Security monitoring

Access should be tightly controlled and audited.

---

# Permission Categories

Permissions are grouped by domain.

Examples:

Users

Organizations

Jobs

Applications

Employees

Attendance

Leave

Payroll

Reports

Analytics

Notifications

Administration

---

# Permission Naming Convention

Use a consistent format.

```
resource.action
```

Examples:

```
jobs.create

jobs.update

jobs.delete

employees.read

employees.update

attendance.mark

attendance.approve

payroll.generate

reports.export
```

Avoid ambiguous names.

---

# Firestore Collections

```
roles/

permissions/

rolePermissions/

organizationMembers/
```

---

# Role Document

```
roles/

    roleId

        name

        description

        systemRole

        active
```

---

# Permission Document

```
permissions/

    permissionId

        name

        description

        category
```

---

# Role Permission Mapping

```
rolePermissions/

    mappingId

        roleId

        permissionId
```

This many-to-many design allows future custom roles.

---

# Organization Membership

The membership document determines:

- User
- Organization
- Role

```
organizationMembers/

    membershipId

        userId

        organizationId

        roleId

        status
```

Authorization is evaluated from this document.

---

# Scope-Based Access

Not every permission applies globally.

Possible scopes:

- Self
- Team
- Department
- Branch
- Organization
- Platform

Example:

```
attendance.read

↓

Branch Scope
```

A Branch Manager sees only employees in assigned branches.

---

# Attribute-Based Rules (Future)

For Enterprise customers, permissions may depend on attributes.

Examples:

- Branch
- Department
- Employment Type
- Shift
- Location
- Time of Day

This extends Role-Based Access Control (RBAC) into Attribute-Based Access Control (ABAC).

---

# Approval Workflows

Some actions require approval.

Examples:

Leave Request

↓

Supervisor

↓

HR

Payroll

↓

Payroll Executive

↓

Organization Admin

Roles define who participates in each workflow.

---

# Security Rules

Firestore rules should verify:

- Authentication
- Organization membership
- Active status
- Required permission
- Scope

Never trust frontend role checks.

---

# Cloud Functions

Sensitive operations should always execute through Cloud Functions.

Examples:

- Payroll Approval
- Role Assignment
- Organization Verification
- User Suspension

This centralizes authorization logic.

---

# Audit Logging

Every permission-sensitive action should create an audit event.

Examples:

- Role Changed
- Payroll Approved
- Employee Deleted
- Leave Rejected
- Organization Suspended

Audit logs should record:

- Actor
- Action
- Target
- Timestamp
- Previous Value
- New Value

---

# Delegation (Future)

Managers may delegate responsibilities temporarily.

Example:

HR Manager on leave

↓

Temporary HR Executive

↓

Permissions expire automatically.

---

# Emergency Access

The platform should support emergency administrative access.

Requirements:

- Time-limited
- Fully audited
- Multi-factor authentication
- Explicit justification

---

# Performance

Cache permissions after login.

Refresh only when:

- Membership changes
- Role changes
- Permission updates

Avoid reading permission collections on every request.

---

# MVP Scope

Included

✅ System Roles

✅ Permission Mapping

✅ Organization Membership

✅ Firestore Authorization

Excluded

❌ Custom Roles

❌ Temporary Delegation

❌ Dynamic Policies

❌ Enterprise ABAC

---

# Acceptance Criteria

The authorization system is complete when:

- Roles are separated from permissions.
- Organization membership determines access.
- Backend enforces authorization.
- Scope restrictions prevent cross-organization access.
- Audit logs record privileged actions.

---

# Cursor Implementation Prompt

Implement a Role-Based Access Control system using:

- Firebase Authentication
- Firestore
- Cloud Functions
- Firestore Security Rules

Requirements:

- System roles
- Permission collections
- Role-permission mapping
- Organization-scoped membership
- Backend authorization helpers
- Permission caching
- Audit logging

Design the architecture so custom roles and ABAC can be introduced without redesigning the database.

---

# Dependencies

Depends on:

- Authentication
- Organization Management
- Employee Management

Provides authorization for:

- Attendance
- Leave
- Payroll
- Recruitment
- Analytics
- Administration

Every operational module depends on this architecture.

---

# Developer Notes

Never hardcode permissions inside UI components.

The UI should ask a centralized authorization service:

> "Can this user perform this action in this organization?"

This keeps business rules consistent across web pages, Cloud Functions, and future mobile applications.

Treat authorization as infrastructure, not application logic.

---

# Key Takeaways

- Authentication identifies users; authorization controls capabilities.
- Roles inherit permissions through organization membership.
- Permissions should be resource-based and consistently named.
- Backend services must enforce every authorization decision.
- A flexible RBAC foundation allows seamless evolution to enterprise-grade authorization in the future.

---