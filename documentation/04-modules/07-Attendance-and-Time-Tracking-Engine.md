# Module 7
# Attendance & Time Tracking Engine

---

# Module Overview

The Attendance Engine is responsible for tracking the daily working activity of every employee.

Unlike traditional attendance systems, this engine records complete workforce activity rather than simple clock-in and clock-out events.

Attendance data powers:

- Payroll
- Overtime
- Leave
- Compliance
- Productivity Analytics
- Workforce Planning
- AI Insights

For many organizations, attendance becomes the single largest dataset generated every day.

Therefore the module must be designed for scalability from the beginning.

---

# Business Purpose

Organizations need to answer questions such as:

Who is present today?

Who arrived late?

Who worked overtime?

Who missed their shift?

Who is currently on-site?

How many hours were worked this month?

Which branch has the highest absenteeism?

Attendance should answer all of these automatically.

---

# Design Philosophy

Attendance is not a button.

Attendance is a timeline.

Every employee generates events throughout the day.

Example

```
08:55

↓

Entered Office

↓

09:01

↓

Checked In

↓

13:05

↓

Lunch Started

↓

13:42

↓

Lunch Ended

↓

18:03

↓

Checked Out

↓

Attendance Summary Generated
```

The timeline becomes the source of truth.

---

# Attendance Lifecycle

```
Shift Assigned

↓

Check-In Window Opens

↓

Employee Arrives

↓

Attendance Recorded

↓

Breaks

↓

Overtime

↓

Check-Out

↓

Daily Summary

↓

Payroll Calculation

↓

Analytics
```

---

# Attendance Status

Recommended values

Present

Late

Absent

Half Day

Holiday

Weekend

Leave

Overtime

Early Departure

Missed Check-Out

Pending Review

Attendance status should be computed rather than manually entered whenever possible.

---

# Attendance Methods

The architecture should support multiple attendance methods.

Current MVP

- Manual Check-In
- GPS Check-In
- QR Code

Future

- Face Recognition
- NFC Card
- Fingerprint Device
- Bluetooth Beacon
- Geofence Auto Check-In
- Biometric Integration

The attendance engine should not depend on one specific method.

---

# Attendance Event Model

Instead of one attendance document, capture events.

Examples

```
CHECK_IN

CHECK_OUT

BREAK_START

BREAK_END

SHIFT_STARTED

SHIFT_COMPLETED

OVERTIME_STARTED

OVERTIME_ENDED
```

Daily attendance summaries are generated from these events.

---

# Firestore Collections

```
attendanceEvents/

attendanceSummaries/

attendanceCorrections/

attendanceApprovals/

attendancePolicies/

attendanceDevices/
```

---

# Attendance Event Document

```
attendanceEvents/

    eventId

        employeeId

        organizationId

        eventType

        timestamp

        source

        latitude

        longitude

        accuracy

        deviceId

        createdAt
```

Events are immutable.

Never edit attendance events.

---

# Daily Summary

Generated automatically.

```
attendanceSummaries/

    summaryId

        employeeId

        organizationId

        date

        checkIn

        checkOut

        totalHours

        overtimeHours

        breakDuration

        attendanceStatus

        payrollEligibleHours
```

Payroll reads summaries, not raw events.

---

# GPS Attendance

GPS attendance should validate:

Employee Location

↓

Work Location

↓

Allowed Radius

↓

GPS Accuracy

↓

Attendance Accepted

Example

```
Manufacturing plant warehouse (site under manufacturing)

Radius

100 meters
```

Employees outside the radius require approval.

---

# QR Attendance

Each work location may generate a rotating QR code.

Workflow

```
Employee

↓

Scan QR

↓

GPS Verified

↓

Attendance Event

↓

Summary Updated
```

QR codes should expire periodically to reduce misuse.

---

# Shift Awareness

Attendance depends on assigned shifts.

Example

Morning Shift

09:00 – 18:00

Attendance engine should know:

Early Arrival

Late Arrival

Early Departure

Overtime

Missing Check-Out

---

# Break Management

Support:

Lunch Break

Tea Break

Custom Breaks

Each break records:

Start

↓

End

↓

Duration

Break policies should be organization configurable.

---

# Attendance Corrections

Employees may request corrections.

Example

Forgot Check-Out

↓

Correction Request

↓

Supervisor Review

↓

HR Approval

↓

Summary Updated

Raw events remain unchanged.

Corrections generate adjustment records.

---

# Attendance Approval

Certain attendance requires approval.

Examples

- Outside Geofence
- Manual Entry
- Missed Punch
- Overtime
- Night Shift Exception

Approval workflow should use the authorization system.

---

# Overtime

Overtime begins only after configured policies.

Example

```
Shift Ends

18:00

↓

Employee Leaves

20:15

↓

2h 15m Overtime
```

Policies should define:

Minimum Duration

Approval Required

Maximum Daily Hours

Payroll Eligibility

---

# Shift Violations

Automatically detect:

Late Arrival

Early Departure

Missed Check-In

Missed Check-Out

Long Break

Multiple Check-Ins

GPS Failure

Managers should receive alerts.

---

# Attendance Dashboard

Employees

Today's Status

Current Shift

Working Hours

Break Status

Monthly Attendance

Corrections

Overtime

Managers

Present Employees

Absent Employees

Late Employees

Live Check-Ins

Attendance Corrections

Shift Compliance

---

# Attendance Calendar

Employees should see a monthly calendar.

Example

```
P

P

L

A

H

P

P
```

Legend

P = Present

A = Absent

L = Leave

H = Holiday

---

# Notifications

Examples

Shift Starting Soon

Late Arrival

Forgot Check-Out

Correction Approved

Overtime Approved

Attendance Recorded

Geofence Violation

---

# Cloud Functions

Recommended

recordAttendance()

generateDailySummary()

calculateWorkingHours()

calculateOvertime()

validateGPS()

approveCorrection()

detectAttendanceViolations()

publishAttendanceEvents()

---

# Integration

Attendance updates

↓

Payroll

↓

Analytics

↓

Notifications

↓

Compliance

↓

Performance

Attendance becomes a shared platform service.

---

# Firestore Indexes

Composite indexes

organizationId + date

employeeId + date

organizationId + attendanceStatus

organizationId + shiftId

employeeId + timestamp

Indexes are essential for monthly reporting.

---

# Security Rules

Employees

Read own attendance.

Create attendance events.

Request corrections.

Managers

View team attendance.

Approve corrections.

HR

View organization attendance.

Administrators

Platform diagnostics.

Every request validates organization membership.

---

# Offline Support

PWA should allow temporary offline attendance capture.

Workflow

```
Attendance Recorded

↓

Stored Locally

↓

Network Available

↓

Sync to Firestore

↓

Conflict Validation

↓

Summary Updated
```

Offline entries should be clearly marked until verified.

---

# Performance Considerations

Never load attendance history indefinitely.

Load:

Current Month

↓

Previous Month

↓

Older Data On Demand

Use summary collections for reports.

Raw events are primarily for audits.

---

# Analytics

Generate metrics:

Attendance %

Late %

Average Working Hours

Overtime %

Branch Attendance

Department Attendance

Shift Compliance

Monthly Trends

Heatmaps

Future AI can predict absenteeism trends.

---

# Accessibility

Large check-in button.

Simple attendance timeline.

Readable status colors.

Offline indicator.

Voice-friendly confirmations.

Optimized for outdoor workers using low-end Android devices.

---

# MVP Scope

Included

✅ GPS Attendance

✅ QR Attendance

✅ Daily Summaries

✅ Corrections

✅ Overtime

✅ Monthly Calendar

Excluded

❌ Face Recognition

❌ Fingerprint Devices

❌ NFC

❌ Bluetooth Beacon

❌ Auto Check-In

---

# Acceptance Criteria

Attendance Engine is complete when:

- Events are immutable.
- Daily summaries are generated automatically.
- GPS validation works.
- QR attendance works.
- Overtime is calculated.
- Attendance corrections follow approval workflows.
- Payroll reads attendance summaries rather than raw events.

---

# Cursor Implementation Prompt

Implement the Attendance & Time Tracking Engine using:

- Firestore
- Cloud Functions
- Firebase Authentication
- Next.js
- TypeScript
- PWA APIs

Requirements:

- Event-based attendance model
- Daily summary generation
- GPS validation
- QR attendance
- Break management
- Overtime calculation
- Attendance corrections
- Approval workflow
- Offline synchronization
- Responsive employee dashboard

Design the module so additional attendance methods (Face Recognition, NFC, Biometrics) can be added without redesigning the data model.

---

# Dependencies

Depends on:

- Authentication
- Organization Management
- Employee Management
- Authorization
- Event Architecture
- Master Data

Provides data to:

- Shift Scheduling
- Leave Management
- Payroll
- Analytics
- Performance Management
- Compliance
- AI Services

This module is the operational heartbeat of the Workforce Management Platform.

---

# Developer Notes

Treat attendance as an event stream rather than a single daily record.

Raw events should never be modified after creation.

Instead, corrections, approvals, and summaries should layer on top of immutable events.

This approach provides:

- Accurate payroll
- Strong auditability
- Regulatory compliance
- Easier debugging
- Better analytics
- Future AI capabilities

Whenever implementing a new attendance feature, ask:

> "Is this a new attendance event, or is it a derived summary?"

Keeping those concepts separate will greatly simplify the system.

---

# Future Enhancements

- Face Recognition Attendance
- Fingerprint Device Integration
- Bluetooth Beacon Attendance
- NFC Smart Card Support
- Indoor Positioning
- Auto Check-In/Check-Out
- Wearable Device Integration
- Fatigue Detection
- AI Attendance Anomaly Detection
- Workforce Heatmaps
- Predictive Absenteeism Analytics

---

# Key Takeaways

- Attendance is modeled as an immutable stream of events rather than editable daily records.
- Daily summaries serve as the operational source for payroll and reporting.
- The engine supports multiple attendance methods through a common event model.
- GPS, QR, approvals, and corrections are built into the architecture from the start.
- The design is scalable, auditable, and ready for future biometric and AI-powered attendance technologies.

---