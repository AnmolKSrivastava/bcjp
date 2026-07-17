# Chapter 8
# Master Data & Reference Data Management

---

# Purpose

Every enterprise application contains two categories of data:

1. Business Data
2. Master Data

Business Data changes continuously.

Examples:

- Jobs
- Attendance
- Payroll
- Notifications

Master Data changes very rarely.

Examples:

- Skills
- Industries
- Languages
- States
- Cities
- Job Categories

Although master data represents only a small percentage of the database, it influences almost every module.

Poorly managed reference data eventually causes inconsistent reports, duplicate records, unreliable AI recommendations, and difficult maintenance.

This chapter defines how master data should be managed across the platform.

---

# What is Master Data?

Master Data represents standardized information shared by the entire platform.

Unlike business data, it is owned by the platform itself.

Examples include:

- Industries
- Skills
- Languages
- Certifications
- States
- Districts
- Cities
- Shift Types
- Leave Types

Users should select these values rather than creating arbitrary text whenever possible.

---

# Business Goals

Master data should:

- Standardize terminology.
- Improve search accuracy.
- Improve AI recommendations.
- Improve reporting.
- Reduce duplicate values.
- Simplify translations.
- Simplify analytics.

---

# Master Data Principles

## Principle 1

Users should choose from existing values whenever practical.

Example

Instead of typing:

```
Electrician
```

Choose:

```
Electrician
```

from a standardized list.

---

## Principle 2

Platform administrators own master data.

Workers should not create new industries or job categories.

---

## Principle 3

Master data should be reusable.

One Skills collection should support:

- Profiles
- Jobs
- AI Matching
- Resume Builder
- Analytics

---

# Master Data Categories

## Skills

Examples

Electrician

Welder

Driver

Security Guard

Machine Operator

Retail Sales

Warehouse Worker

Plumber

Cook

Caregiver

---

## Industries

Manufacturing

Healthcare

Retail

Hospitality

Construction

Education

Security

Facility Management

Domestic Services

Logistics

Transportation

---

## Job Categories

Full-Time

Part-Time

Contract

Temporary

Internship

Daily Wage

Freelance

Seasonal

---

## Employment Types

Permanent

Contract

Temporary

Project Based

Apprenticeship

---

## Languages

Hindi

English

Bengali

Marathi

Tamil

Telugu

Gujarati

Kannada

Malayalam

Punjabi

Odia

Urdu

Future versions may support dozens of languages.

---

## Education Levels

No Formal Education

Primary

Secondary

Higher Secondary

ITI

Diploma

Graduate

Post Graduate

Doctorate

---

## Certifications

Forklift Operator

Driving License

Nursing License

Electrician License

Fire Safety

Industrial Safety

First Aid

Police Verification

Medical Clearance

---

## Shift Types

Morning

Evening

Night

Rotational

Flexible

Split Shift

---

## Leave Types

Paid Leave

Sick Leave

Emergency Leave

Casual Leave

Maternity Leave

Paternity Leave

Compensatory Off

---

## Attendance Status

Present

Absent

Late

Half Day

Holiday

Weekend

Leave

Work From Home (future)

---

## Payroll Status

Pending

Processing

Approved

Paid

Failed

Cancelled

---

## Notification Templates

Welcome

Attendance Reminder

Interview Scheduled

Offer Letter

Payroll Completed

Leave Approved

Emergency Alert

These templates should be configurable.

---

# Geographic Master Data

The platform should maintain standardized geographic information.

Country

↓

State

↓

District

↓

City

↓

PIN Code

Avoid allowing users to manually type locations whenever possible.

This improves search quality.

---

# Firestore Collections

```
masterData/

skills/

industries/

languages/

states/

districts/

cities/

certifications/

shiftTypes/

leaveTypes/

notificationTemplates/
```

---

# Example Skill Document

```
skills/

    skillId

        name

        category

        synonyms

        active

        createdAt
```

Example

```
name

Electrician

synonyms

Electrical Technician

Electrical Worker
```

AI can use synonyms during matching.

---

# Example Industry Document

```
industries/

    industryId

        name

        icon

        active
```

---

# Example State Document

```
states/

    stateId

        name

        code
```

---

# Example City Document

```
cities/

    cityId

        stateId

        districtId

        name
```

---

# Why Separate Collections?

Avoid embedding all master data into one document.

Bad

```
masterData

skills[]

cities[]

industries[]

```

Firestore document limits will eventually become a problem.

Separate collections also allow selective caching.

---

# Search Optimization

Master data should support:

Autocomplete

Search Suggestions

Synonyms

Misspelling Tolerance

Future AI Search

---

# Caching Strategy

Master data changes infrequently.

The frontend should cache:

Skills

Languages

Industries

States

Cities

for extended periods.

This reduces Firestore reads.

---

# Localization

Each master data item should support multiple languages.

Example

```
Electrician

↓

English

↓

Hindi

↓

Bengali

↓

Tamil
```

The identifier remains constant while display names change.

---

# Versioning

Some master data changes over time.

Instead of deleting values:

```
active

true

false
```

Inactive values remain available for historical records.

---

# Cloud Functions

Recommended

syncMasterData()

validateSkill()

generateSearchIndex()

importGovernmentData()

updateTranslations()

---

# Security Rules

Only Administrators

may

Create

Update

Delete

Master Data

All authenticated users

may

Read

Master Data

---

# AI Integration

Master data becomes the vocabulary for AI.

Example

Worker says:

"I fix electrical wiring."

↓

AI

↓

Maps to

Electrician

↓

Profile Updated

This standardization significantly improves recommendation quality.

---

# Analytics

Reports should group data using master data IDs rather than free-text values.

Example

Good

```
skillId = electrician
```

Bad

```
Electrician

electrician

Electrical Worker

Electrician

```

---

# Edge Cases

Inactive Skills

Duplicate Cities

Merged Industries

Deleted Categories

Misspelled Data

Language Updates

Government Administrative Changes

Historical values should remain valid.

---

# MVP Scope

Included

✅ Skills

✅ Industries

✅ States

✅ Cities

✅ Languages

✅ Job Categories

Excluded

❌ Government Sync

❌ AI Auto Classification

❌ Dynamic Translation

---

# Acceptance Criteria

Master data is complete when:

- Shared lookup collections exist.
- Autocomplete uses standardized values.
- AI can reference master data.
- Reports rely on IDs rather than free text.
- Only administrators can modify reference data.

---

# Cursor Implementation Prompt

Create Firestore collections for:

- Skills
- Industries
- Languages
- States
- Districts
- Cities
- Certifications
- Shift Types
- Leave Types

Implement:

- Admin CRUD
- Cached frontend lookups
- Autocomplete
- Search filtering
- Firestore Security Rules

---

# Dependencies

Provides data to:

Profiles

Organizations

Jobs

Hiring

Attendance

Payroll

Analytics

Notifications

AI Services

Almost every module depends on Master Data.

---

# Developer Notes

Treat Master Data as the platform's shared vocabulary.

Whenever a new module requires a selectable value, first ask:

> "Should this come from Master Data?"

If the answer is yes, do not create a new hardcoded list or free-text field.

Instead, extend the existing master data collections.

This approach keeps the application consistent, simplifies localization, improves reporting, and gives AI models a reliable vocabulary for search and recommendations.

---

# Key Takeaways

- Master Data is shared, standardized information used across the entire platform.
- Reference values should be selected from controlled collections rather than entered as arbitrary text.
- Master Data enables consistent analytics, multilingual support, and high-quality AI recommendations.
- These collections change infrequently and should be cached aggressively.
- Every new module should reuse Master Data before introducing new reference values.

---