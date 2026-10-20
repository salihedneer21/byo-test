# Project Summary

- Source: project creation
- Captured At: 2026-10-11T11:12:31.059Z

## Initial Request

Production deploy test clinic: a simple one-page clinic site with the clinic name, opening hours and a contact section. Keep it minimal.

## Locked Product Context
- You authorized sample content by replying “go” to the initial clarification.
- Original shipped scope: exactly one public page with clinic name, opening hours, and displayed phone/email/address; no product authentication, booking, form, integrations, dashboards, or data collection. The approved appointment-request revision supersedes these original exclusions only where stated below.
- Implemented fictional content: Sample Clinic; Monday–Friday 9:00 AM–5:00 PM, Saturday–Sunday 10:00 AM–2:00 PM (latest shipped hours change); +1 (202) 555-0147; clinic@example.com; 123 Example Street, Sample Town. The visible notice identifies it as deployment-test sample information.
- Original first build and MVP were the same one-page scope. The original success criterion is correct display at the deployed public URL.
- Approved roadmap: v6. Dark design v2 is the shipped visual baseline; its additive public-request design extension preserves that identity. The static home page, approved presentation revision, and latest weekend hours are implemented. TypeScript/ESLint checks and Vite production asset build passed. Production URL display verification remains pending; no browser testing was performed.

## Appointment Request Revision — Approved, Public Submission Only Now
- Roadmap v6 is approved. Latest instruction: “Approve, but only build the first step for now: the public form and saving the requests. Leave the staff screens for later.” Slice 1 is implemented: public submission and durable saving only. Staff screens remain deferred.
- Requested addition: public form with exactly patient name, phone number, and preferred date; persist submissions for clinic staff. Preferred dates are requests, not confirmed bookings; no visit types, reasons, time slots, availability rules, providers, payments, cancellation, or rescheduling.
- Confirmed: the owner creates individual staff accounts; staff can mark requests contacted. No patient accounts. Statuses are new/contacted; contact happens outside the app.
- Approved defaults for deferred account surfaces: private owner staff-management screen; shared email/password sign-in with role-based routing; owner-created closed accounts; owner can create, disable/re-enable, and reset staff accounts. No public staff signup or self-assigned roles. Owner bootstrap/recovery uses controlled project setup. Staff recovery is owner-managed, so no automated email or other integration is added.
- Current slice: existing public page + exactly three fields + real saved receipt. Staff sign-in/list/contacted actions and owner account management are deferred, with no placeholder UI or links. Synthetic role access belongs to later verification, never a public credential listing or mocked patient data.
- Preserve shipped content, exact fictional listing notice, approved identity, and prior HIPAA fixes. The design extension corrects stale weekend text to 10:00 AM–2:00 PM and replaces obsolete no-form constraints only for public request submission.
- Implementation continuity constraint, not expanded compliance scope: new request submission, staff/owner reads, and contacted updates must reuse existing required audit handling. Treat request name/phone/date records as the new patient-data surface; record resource references without patient values in audit metadata. Anonymous submit has no patient account identity; public receipt grants no stored-record lookup. Reads/updates are restricted to active staff/owner of this single clinic; account operations are owner-only. Audited reads may refresh on entry, focus, or action rather than needing live streaming. Do not add an audit viewer, reviewer role, retention jobs, auth-event consolidation, exports, MFA, or generalized hardening.
- Implemented public request surface: `appointment_requests` stores name, phoneNumber, preferredDate, status `new`, and Convex creation time. Public `appointmentRequests.submit` validates then saves and inline-audits atomically; returns only saved outcome/static field errors, never PHI or record ID. No public read/list endpoints. `PHI_WRITE` metadata has only `op: "create"`; anonymous actor/patient identity remains unspecified. Date validation uses a shared UTC calendar-day boundary in browser/server; no availability rules. Backend-tool synthetic persistence/audit and rejection checks passed; lint/frontend+backend typechecks and Vite build passed. Browser and production verification remain pending.
- Existing infrastructure: Convex persistence/provider, Better Auth email/password with cookie-managed sessions, audit_logs and recordAuditLog helper; no product auth screens yet. Existing OTP/two-factor plugins and email utilities are infrastructure only, not authorization to expose those features. Preserve HIPAA-AC-012 secure HttpOnly-session fix and HIPAA-LOG-002 non-sensitive error handling.

## Visual and Interaction Direction
- Existing build uses an understated dark information sheet, system humanist sans typography, no images or remote font assets.
- Implemented approved design v2: plum-tinted charcoal `oklch(0.20 0.008 310)`, warm off-white text `oklch(0.92 0.006 75)`, muted labels `oklch(0.73 0.01 310)`, light plum headings `oklch(0.76 0.065 325)`, and fine rules `oklch(0.36 0.008 310)`, with native dark color-scheme. Source-calculated text contrast exceeds WCAG AA (main text/notice 14.30:1, labels 7.56:1, headings 8.22:1); rendered/production display verification is still pending.
- Fixed dark theme with no toggle, preference storage, remote fonts, or new assets. Preserve existing font metrics and information-section spacing/layout; prior HIPAA fixes remain intact.
- Left-aligned clinic name followed by hours and contact in two desktop columns, stacked on mobile. Fine rules and whitespace instead of cards; no navigation. Add the request section below the exact notice, single-column at approximately 480px maximum width and full available mobile width.
- Contact details remain selectable display text; no decorative animations or live open/closed status.
- Public form: visible required Name, Phone number, Preferred date labels; native inputs/date picker; today or later, no availability restrictions. One Save request button; synthetic-data guidance beside form; no extra fields.
- Pending Saving… disables duplicate submit. Inline validation/failure retain entries; associated errors and visible focus support keyboard/screen readers. Receipt appears only after persistence: request saved, not confirmed, no care or follow-up promise. No public request lookup, patient values in URL/browser storage, or optimistic success.
- Visible notice: “Sample information for a deployment test. Not a real clinic listing.” Preserve readable contrast, semantic headings, and narrow-screen/zoom support.
