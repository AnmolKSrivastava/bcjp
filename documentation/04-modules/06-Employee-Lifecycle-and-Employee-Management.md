# Module 6
# Employee Lifecycle & Employee Management

---

# Module Overview

The Employee Management module begins the operational phase of the workforce lifecycle.

A worker becomes an employee only after successfully completing the hiring process.

Once hired, the employee becomes the center of all workforce operations.

Everything from attendance, shift scheduling, payroll, leave management, performance, and compliance revolves around the employee record.

Unlike the Profile module, which represents a person's professional identity, the Employee module represents the person's relationship with a specific organization.

A worker may have:

- One profile
- Multiple employments over time
- Multiple organizations (future)
- Multiple historical employment records

The platform should preserve every employment relationship throughout the worker's career.

---

# Business Purpose

Organizations require much more than employee names.

They need to manage:

- Employment Status
- Department
- Reporting Manager
- Branch
- Shift
- Payroll Eligibility
- Attendance Eligibility
- Documents
- Performance
- Exit Process

This module becomes the master record for every active employee.

---

# Core Philosophy

One User

↓

One Professional Profile

↓

Many Employment Records

Never confuse a Profile with an Employee.

Example

Rahul

↓

Works for ABC Hospital

↓

Employee Record A

↓

Leaves Company

↓

Joins XYZ Logistics

↓

Employee Record B

The profile remains unchanged.

Employment changes.

---

# Employee Lifecycle

```
Worker

↓

Application Submitted

↓

Interview

↓

Offer Accepted

↓

Employee Created

↓

Onboarding

↓

Active Employee

↓

Promotion / Transfer

↓

Leave

↓

Resignation

↓

Exit Process

↓

Former Employee
```

Every transition should be recorded permanently.

---

# Employment Status

Recommended statuses:

```
Pending Joining

Active

Probation

Confirmed

Notice Period

Suspended

On Leave

Transferred

Resigned

Terminated

Retired

Archived
```

Status changes should generate business events.

---

# Employee Identifier

Every employee should receive:

- Employee Code
- Employee ID
- Joining Date

Example

```
EMP-2026-000145
```

The employee code should be configurable by organization.

---

# Employee Record

Each employee record contains:

Employment Information

- Employee Code
- Organization
- Department
- Branch
- Location
- Reporting Manager
- Designation

Employment Details

- Joining Date
- Confirmation Date
- Employment Type
- Shift Assignment
- Salary Grade

Operational Status

- Attendance Enabled
- Payroll Enabled
- Leave Eligibility

Future:

- Asset Assignment
- Uniform Assignment
- Equipment Tracking

---

# Employment History

Never overwrite previous employment.

```
Employment History

↓

ABC Hospital

2026-2028

↓

XYZ Logistics

2028-Present
```

Historical employment remains available for reporting.

---

# Firestore Collections

```
employees/

employeeHistory/

employeeManagers/

employeeTransfers/

employeeDocuments/

employeeAssets/
```

---

# Employee Document

```
employees/

    employeeId

        userId

        organizationId

        employeeCode

        departmentId

        branchId

        locationId

        designationId

        managerId

        employmentStatus

        joiningDate

        confirmationDate

        attendanceEnabled

        payrollEnabled

        createdAt

        updatedAt
```

The employee document should contain only employment-specific information.

---

# Employment History

```
employeeHistory/

    historyId

        employeeId

        action

        previousValue

        newValue

        changedBy

        changedAt
```

Examples:

Department Changed

Manager Changed

Promotion

Transfer

Salary Grade Updated

Confirmation

Exit

This provides a complete employment audit trail.

---

# Reporting Hierarchy

Every employee may report to another employee.

```
CEO

↓

Director

↓

HR Manager

↓

Supervisor

↓

Worker
```

Store the hierarchy using manager references.

Avoid recursive nesting.

---

# Departments

Every employee belongs to exactly one department.

Examples:

Operations

HR

Finance

Security

Maintenance

Housekeeping

Nursing

Manufacturing

Sales

Departments come from Organization Management.

---

# Designations

Master Data examples:

- Security Guard
- Staff Nurse
- Supervisor
- HR Executive
- Machine Operator
- Delivery Executive
- Driver

Designations should be standardized.

---

# Transfers

Employees may transfer between:

Departments

Branches

Locations

Managers

Shifts

Every transfer becomes part of employment history.

---

# Employee Onboarding

Suggested workflow

```
Offer Accepted

↓

Employee Record Created

↓

Documents Verified

↓

Attendance Activated

↓

Payroll Activated

↓

Shift Assigned

↓

Welcome Notification

↓

Employee Active
```

Onboarding should be largely automated.

---

# Employee Exit

Suggested workflow

```
Resignation Submitted

↓

Manager Approval

↓

HR Approval

↓

Notice Period

↓

Asset Return

↓

Payroll Settlement

↓

Exit Interview

↓

Employment Closed

↓

Archive Record
```

Never delete employee records.

---

# Employee Search

Search by:

- Employee Code
- Name
- Department
- Manager
- Branch
- Shift
- Designation
- Employment Status
- Joining Date

Filters should support combinations.

---

# Employee Dashboard

Each employee should see:

My Attendance

My Leave

My Payroll

My Documents

My Manager

My Shift

Announcements

Performance (future)

The employee dashboard becomes the operational home screen.

---

# Employer Dashboard

HR should view:

Active Employees

New Joiners

Probation Employees

Notice Period

Department Distribution

Organization Hierarchy

Recent Transfers

Upcoming Confirmations

---

# Notifications

Examples:

Employee Joined

Probation Ending

Manager Changed

Department Changed

Transfer Approved

Confirmation Due

Exit Approved

Welcome Employee

---

# Cloud Functions

Recommended:

createEmployee()

assignManager()

transferEmployee()

confirmEmployee()

archiveEmployee()

generateEmployeeCode()

updateEmploymentHistory()

---

# Security Rules

Employees:

Read their own employment record.

Managers:

Read direct reports.

HR:

Manage employees within their organization.

Administrators:

Platform-wide oversight.

Every query must validate organization membership.

---

# Performance Considerations

Use pagination.

Load organization hierarchy lazily.

Index:

- organizationId
- employeeCode
- managerId
- departmentId
- employmentStatus

Avoid loading historical records by default.

---

# Accessibility

Employee dashboards should remain simple.

Large buttons.

Minimal text.

Clear status indicators.

Suitable for mobile devices.

HR dashboards should optimize desktop productivity.

---

# MVP Scope

Included

✅ Employee Creation

✅ Employment Status

✅ Reporting Managers

✅ Departments

✅ Transfers

✅ Employee Search

Excluded

❌ Asset Management

❌ Performance Reviews

❌ Equipment Tracking

❌ Training Management

❌ Medical Records

---

# Acceptance Criteria

The module is complete when:

- Hiring creates employee records automatically.
- Employment history is immutable.
- Managers are assignable.
- Transfers preserve history.
- Employees have operational dashboards.
- Exit processes archive rather than delete records.

---

# Cursor Implementation Prompt

Implement the Employee Management module using:

- Firestore
- Cloud Functions
- Next.js
- TypeScript

Requirements:

- Employee CRUD
- Employee Code Generation
- Reporting Hierarchy
- Department Assignment
- Transfer Workflow
- Employment History
- Responsive HR Dashboard
- Employee Self-Service Dashboard

---

# Dependencies

Depends on:

- Authentication
- Profiles
- Organization Management
- Hiring Pipeline
- Master Data
- Event Architecture

Provides data to:

- Attendance
- Shift Scheduling
- Leave Management
- Payroll
- Analytics
- Performance Management
- Administration

This module becomes the operational foundation of Workforce Management.

---

# Developer Notes

Treat the Employee module as the **operational identity** of a worker.

The Profile module describes **who the person is**.

The Employee module describes **how that person works within an organization**.

This distinction is essential.

A user may have one professional profile but many employment records over the course of their career.

Never merge profile data with employment data.

Doing so would make historical reporting, rehiring, multi-organization support, and career tracking significantly more difficult.

Maintain clear separation between personal identity and employment relationships.

---

# Future Enhancements

- Organizational Chart Visualization
- Internal Employee Directory
- Digital Employee ID Card (QR Code)
- Employee Asset Management
- Employee Recognition Program
- Internal Job Transfers
- Multi-Organization Employment
- Contractor & Vendor Workforce Support
- Compliance Tracking
- Training & Certification Expiry Monitoring

---

# Key Takeaways

- Employee records represent employment relationships, not personal identities.
- Hiring automatically creates operational employee records.
- Employment history should be immutable and fully auditable.
- Every operational module depends on Employee Management.
- A clear separation between Profile and Employee modules enables long-term scalability, compliance, and accurate workforce analytics.

---