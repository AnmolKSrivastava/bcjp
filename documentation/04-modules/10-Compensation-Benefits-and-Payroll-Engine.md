# Module 10
# Compensation, Benefits & Payroll Engine

---

# Module Overview

The Payroll Engine is responsible for transforming workforce activity into employee compensation.

Unlike traditional payroll software, this module separates:

- Compensation Rules
- Salary Structures
- Payroll Calculations
- Statutory Compliance
- Salary Processing

This separation allows organizations to configure their own compensation policies while using the same payroll engine.

Payroll consumes data from:

- Employee Management
- Attendance
- Leave
- Shift Scheduling
- Overtime
- Organization Policies

and produces:

- Payslips
- Salary Registers
- Payroll Journals
- Compliance Reports
- Analytics

---

# Business Purpose

Organizations need to answer:

How much should each employee be paid?

How much overtime was worked?

How much salary should be deducted for unpaid leave?

Which statutory deductions apply?

What is the total payroll cost this month?

Payroll should answer all these automatically.

---

# Design Philosophy

Payroll should **calculate**, not define salary rules.

Salary rules belong to the Compensation Framework.

```
Compensation Framework

↓

Payroll Engine

↓

Payslip

↓

Bank Transfer

↓

Reports
```

This separation keeps payroll flexible and maintainable.

---

# Payroll Lifecycle

```
Attendance

↓

Leave

↓

Overtime

↓

Compensation Rules

↓

Payroll Calculation

↓

Manager Review

↓

Payroll Approval

↓

Salary Release

↓

Payslip Generation

↓

Accounting Export

↓

Archive
```

Every payroll run should be reproducible and auditable.

---

# Compensation Framework

The framework defines:

- Salary Structures
- Pay Grades
- Earnings
- Deductions
- Benefits
- Statutory Rules

Organizations configure these once.

Payroll consumes them every pay cycle.

---

# Salary Structure

Example

```
Basic Salary

↓

House Rent Allowance

↓

Transport Allowance

↓

Special Allowance

↓

Gross Salary

↓

PF

↓

ESI

↓

Professional Tax

↓

Income Tax

↓

Net Salary
```

Organizations may define custom components.

---

# Earnings Components

Examples:

- Basic Pay
- HRA
- Conveyance
- Medical Allowance
- Special Allowance
- Shift Allowance
- Night Shift Allowance
- Performance Bonus
- Incentives
- Overtime Pay
- Reimbursements

Every component should be configurable.

---

# Deduction Components

Examples:

- PF
- ESI
- Professional Tax
- Income Tax
- Loan Recovery
- Advance Recovery
- Unpaid Leave
- Uniform Charges
- Penalties

Each deduction should define:

- Formula
- Applicability
- Maximum Limit
- Effective Date

---

# Benefits

Organizations may provide:

- Health Insurance
- Meal Benefits
- Fuel Allowance
- Internet Reimbursement
- Mobile Reimbursement
- Travel Benefits
- Education Assistance

Benefits should be modeled separately from salary.

---

# Pay Grades

Example

```
Grade A

↓

₹15,000–₹20,000

Grade B

↓

₹20,001–₹35,000

Grade C

↓

₹35,001–₹60,000
```

Employees belong to one pay grade.

---

# Payroll Period

Supported periods:

- Monthly
- Weekly
- Bi-weekly
- Fortnightly

The engine should support multiple payroll frequencies.

---

# Firestore Collections

```
salaryStructures/

salaryComponents/

payGrades/

payrollRuns/

payrollItems/

payslips/

benefits/

statutoryRules/
```

---

# Payroll Run

```
payrollRuns/

    payrollRunId

        organizationId

        payPeriodStart

        payPeriodEnd

        status

        generatedAt

        approvedAt

        releasedAt
```

Statuses:

Draft

Calculated

Approved

Released

Archived

---

# Payroll Item

```
payrollItems/

    payrollItemId

        payrollRunId

        employeeId

        grossSalary

        deductions

        overtimeAmount

        leaveDeduction

        netSalary
```

---

# Payslip

Each payslip contains:

Employee Details

↓

Salary Breakdown

↓

Attendance Summary

↓

Leave Summary

↓

Statutory Deductions

↓

Employer Contributions

↓

Net Salary

↓

Digital Signature (future)

Payslips should be stored as PDFs in Firebase Storage.

---

# Payroll Calculation

Payroll combines:

Attendance

+

Approved Leave

+

Shift Allowances

+

Overtime

+

Compensation Rules

↓

Gross Salary

↓

Deductions

↓

Net Salary

The calculation engine should be deterministic.

---

# Overtime Calculation

Attendance Summary

↓

Approved Overtime

↓

Organization Policy

↓

Payroll Component

↓

Salary

Never calculate overtime directly from raw attendance events.

---

# Leave Impact

Paid Leave

↓

No deduction

Unpaid Leave

↓

Salary deduction

Half-Day Leave

↓

Partial deduction

Policies determine the final calculation.

---

# Payroll Approval Workflow

Suggested flow:

```
Payroll Generated

↓

Payroll Executive

↓

Finance Approval

↓

Organization Admin

↓

Released
```

Released payroll should become immutable.

---

# Payroll Adjustments

Support manual adjustments:

- Bonus
- Recovery
- Reimbursement
- Correction
- Advance Salary

Every adjustment must create an audit record.

---

# Compliance

The payroll engine should support configurable statutory rules.

Examples (India):

- Provident Fund (PF)
- Employee State Insurance (ESI)
- Professional Tax
- Tax Deducted at Source (TDS)

Keep the engine country-agnostic by storing rules as configuration rather than code.

---

# Payroll Analytics

Generate:

- Total Payroll Cost
- Average Salary
- Overtime Cost
- Leave Deductions
- Department Payroll
- Branch Payroll
- Payroll Trend
- Compensation Distribution

---

# Notifications

Examples:

Payroll Generated

Payroll Approved

Salary Released

Payslip Available

Payroll Correction

Bonus Credited

---

# Cloud Functions

Recommended

generatePayroll()

calculatePayroll()

applyCompensationRules()

generatePayslip()

approvePayroll()

releasePayroll()

publishPayrollEvents()

---

# Firestore Indexes

Recommended:

organizationId + payPeriodEnd

employeeId + payrollRunId

organizationId + status

employeeId + payPeriodStart

---

# Security Rules

Employees:

View own payslips.

View payroll history.

Payroll Team:

Generate payroll.

Approve payroll.

HR:

View payroll.

Finance:

Release payroll.

Platform Admin:

Diagnostics only.

Sensitive salary data must never be publicly queryable.

---

# Performance

Payroll calculations should execute through Cloud Functions.

Long-running payroll jobs should be processed asynchronously.

Large organizations should support batch processing.

---

# Accessibility

Employees should:

- View salary summary
- Download payslip
- Compare previous payslips
- View deduction explanations

All payroll pages should remain mobile-friendly.

---

# MVP Scope

Included

✅ Salary Structures

✅ Payroll Runs

✅ Payslips

✅ Overtime

✅ Leave Deductions

✅ Payroll Approval

Excluded

❌ Bank Integration

❌ Income Tax Filing

❌ International Payroll

❌ Multi-Currency Payroll

❌ Accounting ERP Integration

---

# Acceptance Criteria

The Payroll Engine is complete when:

- Organizations define salary structures.
- Payroll consumes attendance and leave summaries.
- Payroll runs are generated automatically.
- Payslips are produced.
- Approval workflows function correctly.
- Released payroll becomes immutable.
- Historical payroll remains searchable.

---

# Cursor Implementation Prompt

Implement the Compensation & Payroll Engine using:

- Firestore
- Cloud Functions
- Firebase Storage
- Next.js
- TypeScript

Requirements:

- Salary Structure Management
- Earnings & Deduction Components
- Payroll Calculation Engine
- Payroll Runs
- Approval Workflow
- Payslip PDF Generation
- Payroll Analytics
- Responsive Employee Payroll Dashboard

Design the engine so statutory rules, additional salary components, and international payroll support can be added through configuration rather than rewriting business logic.

---

# Dependencies

Depends on:

- Employee Management
- Attendance Engine
- Leave Management
- Workforce Planning
- Authorization
- Organization Management
- Master Data
- Event Architecture

Provides data to:

- Analytics
- Employee Dashboard
- Compliance
- Finance Integrations
- AI Workforce Insights

This module is the financial engine of the Workforce Management Platform.

---

# Developer Notes

Never hardcode payroll formulas.

Treat every earning, deduction, benefit, and statutory rule as configurable data.

Separate:

Compensation Rules

↓

Payroll Calculation

↓

Payroll Output

This architecture allows different organizations, industries, and countries to use the same payroll engine.

Released payroll should never be recalculated.

Instead, corrections should generate adjustment records while preserving historical payroll integrity.

---

# Future Enhancements

- Direct Bank Transfer Integration
- Multi-Currency Payroll
- Country-Specific Compliance Packs
- Flexible Benefits Portal
- Employee Stock Option Support
- Tax Planning Dashboard
- AI Payroll Anomaly Detection
- ERP & Accounting Integration
- Salary Benchmarking
- Compensation Planning

---

# Key Takeaways

- Compensation rules and payroll calculations are separate concerns.
- Payroll consumes operational data rather than defining it.
- Salary structures, benefits, and statutory deductions are configurable.
- Released payroll is immutable and fully auditable.
- The architecture is designed for multi-tenant SaaS today and international expansion in the future.

---