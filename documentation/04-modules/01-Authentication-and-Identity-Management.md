# Module 1
# Authentication & Identity Management

---

# Module Overview

Authentication is the foundation of the entire Workforce Management Platform.

Every user—whether a worker, employer, recruiter, HR executive, supervisor, administrator, or future partner—enters the platform through this module.

Unlike traditional enterprise software that requires usernames and passwords, this platform is designed primarily for India's workforce, many of whom are first-time digital users.

Therefore the authentication experience must be:

- Fast
- Simple
- Mobile-first
- Secure
- Passwordless

This module establishes digital identity while minimizing friction.

---

# Why This Module Exists

Without authentication there is:

- No trusted identity
- No ownership of data
- No personalized dashboard
- No attendance
- No payroll
- No job applications

Authentication is therefore the root module from which every other business capability grows.

---

# Business Goals

The module should allow users to:

• Register in less than one minute.

• Login using only their mobile number.

• Continue onboarding later.

• Access the correct dashboard automatically.

• Stay logged in securely.

• Recover access without remembering passwords.

---

# Supported User Types

Authentication is shared across the platform.

Users include:

Worker

Employer

Recruiter

Supervisor

HR

Payroll

Operations

Finance

Administrator

Super Administrator

Future:

Government Officer

Training Partner

Insurance Partner

API Client

---

# Design Philosophy

Authentication should never become a barrier.

Bad Example

```
Register

↓

Fill 25 fields

↓

Upload Documents

↓

Verify Email

↓

Choose Password

↓

Confirm Password

↓

Login
```

Good Example

```
Enter Mobile Number

↓

Receive OTP

↓

Login

↓

Complete Profile Later
```

The first experience should always lead users into the application as quickly as possible.

---

# User Journey

## First Time User

```
Landing Page

↓

Select Language

↓

Continue

↓

Enter Mobile Number

↓

Receive OTP

↓

Verify OTP

↓

Account Created

↓

Choose Role

↓

Dashboard
```

---

## Returning User

```
Open Website

↓

Enter Mobile Number

↓

OTP

↓

Dashboard
```

No additional steps should be required.

---

# Authentication Flow

```
User

↓

Firebase Authentication

↓

Phone Verification

↓

Firebase UID Generated

↓

Firestore User Document Created

↓

Default Role Assigned

↓

Redirect to Dashboard
```

Firebase Authentication becomes the source of truth for identity.

Firestore becomes the source of truth for user information.

---

# Responsibilities

Authentication owns:

Registration

Login

Logout

OTP Verification

Session Management

Device Authentication

Role Resolution

Passwordless Authentication

Authentication does NOT own:

User Profile

Employer Details

Documents

Permissions

Payroll

Attendance

Those belong to other modules.

---

# Firebase Services

Required

✅ Firebase Authentication

Recommended

✅ Firestore

Optional Future

Firebase App Check

Firebase Dynamic Links

Firebase Analytics

---

# Firestore Structure

```
users/

    uid

        displayName

        phoneNumber

        role

        organizationId

        onboardingCompleted

        profileCompleted

        language

        createdAt

        updatedAt

        lastLogin

        accountStatus
```

Authentication stores only identity-related information.

Large profile data belongs elsewhere.

---

# Account Status

Every account should have one of the following states.

```
Pending

Active

Suspended

Blocked

Deleted
```

Never permanently delete accounts immediately.

Soft deletion preserves audit history.

---

# User Roles

Recommended roles

```
worker

employer

recruiter

supervisor

hr

payroll

operations

finance

admin

super_admin
```

Store roles as lowercase strings.

Avoid numeric role IDs.

---

# Organization Mapping

Every business user belongs to an organization.

```
users

↓

organizationId

↓

organizations/

↓

organization document
```

Workers without an employer may temporarily have

```
organizationId = null
```

until hired.

---

# Session Strategy

Firebase Authentication manages sessions.

The application should:

Restore session automatically

Refresh tokens automatically

Redirect expired users to login

Never manually store authentication tokens.

---

# Route Protection

Example

```
/

↓

Authenticated?

↓

YES

↓

Role?

↓

Worker Dashboard

Employer Dashboard

Admin Dashboard

```

Unauthenticated users should only access:

Landing Page

Privacy Policy

Terms

Support

Login

Registration

---

# Recommended Folder Structure

```
modules/

authentication/

components/

hooks/

services/

types/

validators/

pages/

middleware/
```

---

# UI Components

Landing Page Login

OTP Dialog

Country Code Selector

Loading Screen

Authentication Guard

Unauthorized Screen

Session Expired Dialog

Language Selector

---

# React Hooks

```
useAuth()

useCurrentUser()

useSession()

usePermissions()
```

Authentication state should never be duplicated.

---

# Firestore Security Rules

Example principles

Workers can read only themselves.

Users cannot edit role.

Users cannot edit UID.

Users cannot edit organization.

Administrators may update status.

Only Cloud Functions should assign roles.

---

# Cloud Functions

Recommended

Create User Profile

```
Trigger

onAuthCreate
```

Purpose

Create Firestore document.

---

Update Last Login

```
HTTPS Function
```

Purpose

Track activity.

---

Deactivate Account

Purpose

Soft delete.

---

Assign Role

Purpose

Admin controlled.

Never trust frontend role assignment.

---

# Notifications

Possible events

Welcome

OTP Success

Profile Incomplete

Verification Required

Account Suspended

Passwordless login reduces notification complexity.

---

# Edge Cases

User changes phone.

User has multiple organizations.

Duplicate registration.

OTP expires.

Network interruption.

Device clock incorrect.

Blocked account.

Deleted account.

Role removed.

Organization removed.

Every edge case should have a defined user experience.

---

# Error Handling

OTP expired

↓

Request again.

Invalid OTP

↓

Retry.

Blocked User

↓

Contact Support.

Firebase unavailable

↓

Maintenance message.

Profile missing

↓

Automatically recreate.

Never expose technical errors.

---

# Performance

Authentication should complete in

< 5 seconds

Target:

Registration

< 60 seconds

including OTP.

---

# Accessibility

Support:

Large buttons

Regional languages

Screen readers

Minimal typing

High contrast

Future:

Voice authentication assistance.

---

# Security Considerations

Never trust client-side role.

Never trust client-side organization.

Never expose Firebase Admin credentials.

Use HTTPS only.

Enable Firebase App Check in production.

Restrict API keys appropriately.

Audit admin logins.

---

# MVP Scope

Included

✅ Phone OTP

✅ Session

✅ Roles

✅ Firestore User Document

✅ Logout

Excluded

❌ Multi-factor Authentication

❌ Biometric Login

❌ Email Login

❌ Social Login

❌ Enterprise SSO

These can be introduced later if required.

---

# Future Enhancements

Google Login

Employer Email Login

Passkeys

Biometrics

Single Sign-On

Government Digital Identity

Face Authentication

Offline Authentication

Device Trust Score

---

# Testing Checklist

Registration

Login

Logout

OTP Failure

OTP Retry

Slow Network

Invalid Role

Missing Profile

Deleted Account

Suspended Account

Expired Session

Browser Refresh

Multiple Tabs

Incognito Mode

Mobile Browser

Desktop Browser

PWA Installation

---

# Cursor Implementation Notes

The authentication module should be implemented before every other module.

Completion Criteria

✓ Phone Authentication works.

✓ Firestore user document created automatically.

✓ Dashboard routing works.

✓ Roles stored correctly.

✓ Protected routes implemented.

✓ Session restoration works.

No additional module should begin until authentication is stable.

---

# Dependencies

This module has no dependencies.

Every other module depends on Authentication.

```
Authentication

↓

Profiles

↓

Organizations

↓

Jobs

↓

Hiring

↓

Attendance

↓

Payroll

↓

Everything Else
```

---

# Developer Notes

Treat Firebase Authentication as the single source of truth for user identity.

Do not duplicate authentication logic inside business modules.

Business modules should request the authenticated user through a shared authentication service rather than managing sessions independently.

Keeping authentication centralized reduces bugs, improves security, and simplifies future migrations if authentication providers change.

---

# Key Takeaways

- Authentication is the root module of the platform.
- Firebase Authentication manages identity; Firestore stores business metadata.
- Passwordless phone authentication provides the best onboarding experience for the target audience.
- Roles and permissions should be assigned server-side.
- Every other module depends on a stable authentication foundation.

---