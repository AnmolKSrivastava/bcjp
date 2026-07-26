# Chapter 2
# Business Problem and Product Vision

---

# Purpose of this Chapter

Before writing a single line of code, every developer should understand **why this product exists**.

Technology choices, UI decisions, database design, and AI features all originate from the business problems this platform is trying to solve.

This chapter explains those problems from the perspective of workers, employers, administrators, and the company building this platform.

---

# 1. The Workforce Industry Today

India has one of the largest labour forces in the world.

Bharat Gig focuses on seven employment industries where hiring is still highly informal:

1. Construction Workers
2. Manufacturing Company Workers
3. Showrooms & Mall Executives
4. Retail Shop Workers
5. Hospital Staff
6. Elderly Care
7. Restaurant Staff

The platform does **not** aim to cover every blue-collar or grey-collar occupation in India. Unsupported verticals (for example logistics-only fleets, private security agencies, or domestic-only staffing as standalone industries) are out of product scope.

Unlike highly skilled professionals, workers in these industries rarely use platforms like LinkedIn.

Most employment still happens through:

- Contractors
- Personal references
- Friends and relatives
- WhatsApp groups
- Local labour markets
- Newspaper advertisements
- Recruitment agencies

This creates a fragmented hiring ecosystem with very little transparency.

---

# 2. Problems Faced by Workers

## 2.1 No Professional Identity

Many workers possess valuable experience but have no professional profile.

Their work history exists only in memory.

When applying for a new job they often cannot provide:

- Employment history
- Skill certificates
- Experience records
- Employer references
- Digital resume

As a result, every new job application starts from zero.

---

## 2.2 Digital Literacy

Many workers:

- Cannot type efficiently.
- Are uncomfortable using English.
- Have never created a resume.
- Have limited understanding of online applications.

Traditional job portals assume users already know how to navigate digital systems.

This platform assumes the opposite.

The platform should guide users step-by-step using simple language, voice assistance, and intuitive interfaces.

---

## 2.3 Unverified Employers

Workers often accept jobs without knowing:

- Salary reliability
- Working conditions
- Employer reputation
- Payment history
- Shift expectations

The lack of verified employer information increases the risk of exploitation.

---

## 2.4 Income Instability

Many workers:

- Frequently change jobs.
- Experience delayed salary payments.
- Lack employment continuity.
- Cannot demonstrate stable work history.

A digital employment record improves long-term employability.

---

# 3. Problems Faced by Employers

Hiring frontline workers in these seven industries presents challenges very different from hiring office employees.

---

## 3.1 Candidate Discovery

Employers often struggle to find workers with:

- Required skills
- Correct location
- Immediate availability
- Verified identity
- Previous experience

Hiring becomes slow and expensive.

---

## 3.2 High Attrition

Worker turnover is common.

This requires employers to continuously recruit new workers.

Recruitment becomes a recurring operational task instead of a one-time activity.

---

## 3.3 Attendance Fraud

Attendance is frequently managed using:

- Paper registers
- Excel sheets
- Manual signatures
- WhatsApp attendance photos

Common issues include:

- Buddy punching
- Incorrect timestamps
- Missing records
- Payroll disputes

Digitizing attendance improves operational accuracy.

---

## 3.4 Payroll Complexity

Payroll depends on multiple variables:

- Attendance
- Overtime
- Leave
- Shift timing
- Holidays
- Incentives
- Penalties

Manual payroll calculations increase administrative workload and introduce errors.

---

## 3.5 Multi-site Operations

Many organizations operate across multiple sites within a supported industry — for example:

- Construction sites
- Manufacturing plants and factory warehouses
- Showrooms and mall floors
- Retail shops
- Hospitals
- Elderly-care homes and patient residences
- Restaurants

Managers need a centralized system to monitor workers across those locations.

---

# 4. Problems Faced by Administrators

Administrative teams often spend more time managing data than making decisions.

Common challenges include:

- Duplicate records
- Missing documentation
- Manual verification
- Spreadsheet dependency
- Inconsistent reporting
- Delayed communication

As organizations grow, these inefficiencies become more expensive.

---

# 5. Why Existing Software Falls Short

Most workforce software focuses on only one part of the employment lifecycle.

Examples include:

| Software Type | Primary Focus |
|--------------|---------------|
| Job Portals | Recruitment |
| HRMS | Employee Records |
| Attendance Systems | Time Tracking |
| Payroll Systems | Salary Processing |
| Compliance Tools | Regulatory Requirements |

Organizations often purchase several disconnected products.

This results in:

- Duplicate data entry
- Multiple logins
- Poor integration
- Data inconsistencies
- Higher operational costs

---

# 6. Our Vision

The platform aims to replace fragmented workforce tools with a unified ecosystem.

Instead of separate applications for hiring, attendance, payroll, and communication, users interact with a single platform throughout the employment lifecycle.

Every stakeholder shares a common source of truth.

---

# 7. The Digital Employment Lifecycle

The core philosophy of the platform is that employment is a continuous journey.

```
Candidate

↓

Worker Registration

↓

Identity Verification

↓

Industry → Department → Role Profile

↓

Resume Creation

↓

Job Discovery (filtered by taxonomy)

↓

Application

↓

Hiring

↓

Joining

↓

Attendance

↓

Payroll

↓

Performance History

↓

Career Growth

↓

Future Employment
```

Each stage produces information that becomes useful in later stages.

For example:

- Attendance influences payroll.
- Payroll contributes to employment history.
- Employment history improves future hiring.
- Employer ratings improve candidate credibility.

The platform is designed so that information flows naturally between modules instead of remaining isolated.

---

# 8. Product Principles

The platform follows several guiding principles.

---

## Simplicity

Most users are not technical.

Interfaces should require minimal training.

---

## Mobile-First

Although implemented as a responsive web application, every interface should be designed primarily for mobile devices.

Desktop layouts are secondary.

---

## Real-Time

Information should update immediately whenever practical.

Examples include:

- New job applications
- Attendance
- Notifications
- Employer approvals
- Shift updates

Firebase Firestore's real-time capabilities support this principle.

---

## Trust

Trust is essential.

Workers must trust employers.

Employers must trust workers.

The platform must therefore support:

- Identity verification
- Employer verification
- Attendance validation
- Secure communication
- Audit trails

---

## Accessibility

The platform should accommodate users with varying levels of literacy.

Where possible:

- Use icons.
- Use regional languages.
- Minimize typing.
- Support voice interactions.
- Avoid technical terminology.

---

# 9. Business Goals

The success of the platform should not be measured solely by the number of registered users.

Meaningful metrics include:

### Worker Metrics

- Profile completion rate
- Resume generation rate
- Job application rate
- Successful placements
- Employment retention

### Employer Metrics

- Time to hire
- Hiring success rate
- Attendance accuracy
- Payroll processing time
- Worker retention

### Platform Metrics

- Active users
- Daily attendance events
- Monthly job postings
- Successful hires
- Notification engagement
- Employer satisfaction

---

# 10. MVP Goals

The first production release should focus on solving the most critical problems.

The MVP should include:

- User authentication
- Worker profiles with preferred Industry → Department → Role
- Employer profiles tied to a supported industry
- Job posting using Industry → Department → Role dropdowns (no free-text industry)
- Job applications and hiring workflow
- Search/filters by Industry, Department, Role, city, experience, salary, shift
- Voice/AI resume builder guided by the same taxonomy
- Notifications
- Admin management of industries, departments, and roles
- Basic attendance / payroll only where already in scope for the current phase

Advanced predictive analytics should be introduced after validating the core marketplace within the seven industries.

---

# 11. Long-Term Vision

Over time, the platform can evolve beyond workforce management.

Potential future capabilities include:

- AI hiring assistants
- Workforce demand prediction
- Digital skill certification
- Learning and training
- Financial products
- Insurance partnerships
- Government integrations
- API ecosystem for third-party developers

The long-term goal is to become the digital operating system for workforce management in India.

---

# Developer Notes

As developers, it is easy to focus on APIs, databases, and UI components.

However, every technical decision should ultimately support one or more business goals.

When implementing a feature, always ask:

1. Which user problem does this solve?
2. Does it reduce operational complexity?
3. Does it increase trust?
4. Does it improve hiring efficiency?
5. Can a first-time smartphone user understand it?

If the answer to these questions is "yes," the implementation is likely aligned with the product vision.

---

# Key Takeaways

- Bharat Gig is a specialized seven-industry platform, not a catch-all job board.
- Industry → Department → Role is the single taxonomy for jobs, profiles, search, and AI.
- This is not merely a recruitment platform; it digitizes the employment lifecycle within those industries.
- Every feature should solve a measurable business problem for in-scope verticals.
- Simplicity and accessibility matter more than expanding into unsupported industries.
- Technology choices should support the specialized product vision rather than drive unlimited category growth.

---