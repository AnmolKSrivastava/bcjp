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

- Industries (exactly seven)
- Departments (belong to one industry)
- Job Roles (belong to one department)
- Skills (supplementary, not a substitute for role)
- Languages
- States
- Cities
- Employment Types (Full-Time, Daily Wage, etc.)

Although master data represents only a small percentage of the database, it influences almost every module.

Poorly managed reference data eventually causes inconsistent reports, duplicate records, unreliable AI recommendations, and difficult maintenance.

This chapter defines how master data should be managed across the platform.

---

# What is Master Data?

Master Data represents standardized information shared by the entire platform.

Unlike business data, it is owned by the platform itself.

Examples include:

- Industries (fixed set of seven)
- Departments
- Job Roles
- Skills
- Languages
- Certifications
- States
- Districts
- Cities
- Shift Types
- Leave Types
- Employment Types

Users should select these values rather than creating arbitrary text whenever possible.

The employment taxonomy hierarchy is mandatory:

```
Industry
    ↓
Department
    ↓
Job Role
```

Never store free-text industry names on jobs or profiles when a master ID exists.

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

Workers and employers should not create new industries, departments, or job roles. Only platform admins may extend departments and roles. The seven industries themselves should rarely change.

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

## Industries (canonical — exactly seven)

| industryId | Name |
|------------|------|
| `construction` | Construction Workers |
| `manufacturing` | Manufacturing Company Workers |
| `showroom` | Showrooms & Mall Executives |
| `retail` | Retail Shop Workers |
| `hospital` | Hospital Staff |
| `elderly-care` | Elderly Care |
| `restaurant` | Restaurant Staff |

These are the only industries the platform supports. Do not add catch-all or “other” industries in product UI.

---

## Departments

Each department belongs to exactly one industry.

Examples:

| Department | Industry |
|------------|----------|
| Civil / Electrical / Plumbing / Carpentry / Painting / Welding | Construction |
| Production / Assembly / Packaging / Warehouse / Quality Control / Maintenance | Manufacturing |
| Sales / Customer Support / Cashier / Visual Merchandising / Store Management | Showroom |
| Sales / Inventory / Delivery / Counter / Store Assistant | Retail |
| Nursing / Ward / Lab / Reception / Housekeeping / Ambulance | Hospital |
| Home Nursing / Caregiving / Companionship / Dementia Care / Palliative Care | Elderly Care |
| Kitchen / Service / Operations | Restaurant |

---

## Job Roles

Each role belongs to exactly one department.

Examples:

| Role | Department | Industry |
|------|------------|----------|
| Electrician | Electrical | Construction |
| Machine Operator | Production | Manufacturing |
| Floor Executive | Sales | Showroom |
| Cashier | Counter | Retail |
| Ward Boy | Ward | Hospital |
| Caregiver | Caregiving | Elderly Care |
| Chef | Kitchen | Restaurant |
| Waiter | Service | Restaurant |

---

## Skills

Skills are optional tags that refine a role; they do **not** replace Industry → Department → Role.

Examples within scope:

Electrician wiring, Welder MIG, Machine Operator CNC, Retail upselling, Nursing vitals, Dementia care, Commis prep, Kitchen hygiene.

Out-of-scope standalone occupations (for example private security guard as an industry, logistics fleet driver as an industry) must not appear as top-level industries.

---

## Employment Types

Full-Time

Part-Time

Contract

Temporary

Internship

Daily Wage

Freelance

Seasonal

Permanent

Project Based

Apprenticeship

Employment type describes *how* someone is hired. It is separate from Industry → Department → Role (*what* work they do).

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

Examples aligned to supported industries:

Electrician License

Industrial Safety

Forklift Operator (Manufacturing warehouse)

Nursing License

Medical Clearance

First Aid

Fire Safety

Food Handler / FSSAI-related certifications (Restaurant)

Police Verification (where required by employer)

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
industries/          # exactly seven documents
departments/         # each has industryId
jobRoles/            # each has departmentId (+ industryId denormalized optional)
skills/
languages/
states/
districts/
cities/
certifications/
shiftTypes/
leaveTypes/
employmentTypes/
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
industries/construction

    industryId: construction
    name: Construction Workers
    icon: construction
    sortOrder: 1
    active: true
```

---

# Example Department Document

```
departments/construction-electrical

    departmentId: construction-electrical
    industryId: construction
    name: Electrical
    active: true
```

---

# Example Job Role Document

```
jobRoles/construction-electrical-electrician

    roleId: construction-electrical-electrician
    departmentId: construction-electrical
    industryId: construction
    name: Electrician
    active: true
```

Validate on write: role.departmentId must belong to role.industryId; department.industryId must be one of the seven industries.

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

Industries

Departments

Job Roles

Skills

Languages

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

"I fix electrical wiring on construction sites."

↓

AI

↓

Maps to

industryId: construction  
departmentId: construction-electrical  
roleId: construction-electrical-electrician

↓

Profile Updated

Recommendations then prioritize Industry match, then Department, then Role, then skills.

---

# Analytics

Reports should group data using master data IDs rather than free-text values.

Example

Good

```
industryId = construction
departmentId = construction-electrical
roleId = construction-electrical-electrician
```

Bad

```
industry = "Electrician work"
category = "Blue collar"
```

---

# Edge Cases

Inactive Roles / Departments

Duplicate Cities

Attempts to add unsupported industries

Invalid Industry → Department → Role combinations

Misspelled Data

Language Updates

Government Administrative Changes

Historical values should remain valid.

---

# MVP Scope

Included

✅ Industries (seven fixed documents)

✅ Departments

✅ Job Roles

✅ Skills (supplementary)

✅ States

✅ Cities

✅ Languages

✅ Employment Types

Excluded

❌ Unlimited / catch-all industries

❌ Free-text industry fields on jobs

❌ Government Sync

❌ Dynamic Translation

---

# Acceptance Criteria

Master data is complete when:

- Exactly seven industry documents exist and are used everywhere.
- Departments and job roles form a valid Industry → Department → Role hierarchy.
- Jobs and profiles store industryId / departmentId / roleId (not free-text industry).
- Autocomplete and dropdowns cascade: Industry → Department → Role.
- AI and reports use taxonomy IDs rather than free text.
- Only administrators can create/update departments and roles; industries change rarely.

---

# Cursor Implementation Prompt

Create Firestore collections for:

- Industries (seed seven)
- Departments
- Job Roles
- Skills
- Languages
- States
- Districts
- Cities
- Certifications
- Shift Types
- Leave Types
- Employment Types

Implement:

- Admin CRUD for departments and roles
- Cascading dropdowns Industry → Department → Role
- Cached frontend lookups
- Hierarchy validation on job/profile write
- Firestore Security Rules
- Search filtering by taxonomy IDs

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
- The employment taxonomy is exactly seven industries with Industry → Department → Role.
- Reference values should be selected from controlled collections rather than entered as arbitrary text.
- Master Data enables consistent analytics, multilingual support, and high-quality AI recommendations.
- These collections change infrequently and should be cached aggressively.
- Every new module should reuse Master Data before introducing new reference values.

---