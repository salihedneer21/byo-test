# Sample Clinic - Clinic Information and Appointment Requests

## Overall Vision
Preserve the shipped clinic information page and add a minimal appointment-request service: patients submit their name, phone number, preferred date, and optional email without an account; clinic staff review saved requests and mark them contacted. The owner controls staff access. This remains a fictional deployment-test clinic, not a confirmed appointment-booking service.

## Personas
- **Patient / public visitor**: Reads clinic details and submits a preferred date for staff follow-up without signing in.
- **Clinic staff**: Uses an owner-created account to review requests and record that contact has occurred.
- **Clinic owner**: Creates staff accounts, manages access, and resets staff passwords through a private screen.

## User Flows
- **Find clinic information**: Open the public home page → read Sample Clinic's hours, phone, email, and address → see the fictional-listing notice. Information stays accessible without submitting a request.
- **Submit an appointment request**: Open the public home page → enter required name, phone number, and preferred date, plus an optional email in the request form → submit → save the request with a new status → display an on-page receipt only after successful persistence. Explain that receipt is not an appointment confirmation. Validation or saving errors keep entered values available for correction or retry. No patient account, visit type, reason for visit, payment, provider selection, time slot, cancellation, or rescheduling step.
- **Review and contact requests**: Open the shared staff/owner sign-in page → sign in with an owner-created email/password account → route to the protected request list → read saved names, phone numbers, preferred dates, submission times, and new/contacted status → contact the patient outside the app → mark the request contacted → see the persisted status on return. The app does not place calls or send messages, approve appointments, or reserve dates.
- **Manage staff access**: Open the shared sign-in page → sign in as owner → enter private staff account management → create an individual staff account with email and password → communicate credentials outside the app → reset a staff password or disable/re-enable access when needed. Only the owner manages accounts; disabled or unassigned accounts cannot read or change requests. Staff cannot create accounts or elevate their role.
- **Recover access**: Staff contacts the owner outside the app → owner resets that staff account's password in the private management screen → staff signs in again. Initial owner access and owner recovery use controlled project setup, not public signup or automated email. No transactional emails, OTP sign-in, or MFA are part of this revision.
- **Check deployment**: Open the deployed public page → verify existing information and notice → submit synthetic request data → later verify it through authorized staff access and persist a contacted status. Do not treat a source build as production verification.

## First Build Slice (Build Now)
### Goal
Extend the existing public front door with a real, narrowly scoped request form and saved-submission receipt. The shipped page remains the anchor; do not rebuild the clinic site. This slice proves public submission and persistence; the following slices add staff access and owner management to complete the MVP.

### Roles in First Build
- Patient / public visitor only; no patient account or authenticated patient screen.

### Screens in First Build (typically 3-4, landing page is non-negotiable)
1. Existing public home page, preserving clinic information and the fictional-listing notice, with the appointment-request form (required name, phone number, preferred date; optional email).
2. Successful-submission state on the same page, reflecting an actually saved request without promising an appointment. Validation, pending submission, and failure states belong to the same form, not additional routes.

### First Build Rules
- Preserve the shipped page and its existing content; this is an additive revision, not a replacement landing page.
- Persist real form submissions. Do not use mock requests or show success before saving succeeds. Store a server-assigned submission timestamp and return that same saved timestamp only after the request and inline audit succeed; show labeled submitted date/time in the visitor's local timezone with an explicit timezone and semantic time markup. No public lookup or patient-value echoes.
- Public access permits submission only, never listing or fetching stored patient requests. Show the immediate receipt without introducing a public request lookup or patient portal.
- Keep required name/phone/date and the explicitly authorized optional email field, with no other fields. Reject past preferred dates; dates are preferences, not available slots. Validate nonblank trimmed email in browser/server, save it trimmed, and omit blank email. Older rows and clients without email remain valid.
- Zero new third-party integrations. Do not add mock checkout, email, SMS, calendar, or notification UI.
- No authentication for patients. Staff and owner screens wait for subsequent focused slices, without placeholder dashboards.
- Target a focused engineer-day using existing infrastructure. No redesign or optional feature expansion.

## MVP Scope (P0)
- Preserve Sample Clinic and its sample contact details: +1 (202) 555-0147; clinic@example.com; 123 Example Street, Sample Town.
- Preserve the shipped local opening hours: Monday–Friday 9:00 AM–5:00 PM; Saturday–Sunday 10:00 AM–2:00 PM. Correct older documentation that still says weekends are closed.
- Preserve the exact visible notice: “Sample information for a deployment test. Not a real clinic listing.”
- Public name, phone number, preferred-date, and optional-email submission, successful-save receipt, and durable request storage. No patient account or email delivery. The latest optional-email request supersedes the earlier exactly-three-fields/no-email constraint only for this field.
- Request workflow has only new and contacted states. Submission creates a new request; staff action records contacted. Neither state confirms or reserves an appointment.
- A protected, simple request list displaying the saved fields, submission time, and status, ordered newest first; staff can mark new requests contacted. Repeated contact actions must not create contradictory states.
- Shared email/password sign-in with individual owner-created accounts and role-based routing. No open staff/owner signup; no automatic privileges for an arbitrary authenticated account.
- Active staff and owner can access this single clinic's request list and mark contacted. Only owner can create staff accounts, reset their passwords, and disable/re-enable access. Enforce these permissions on saved-data operations, not just screen visibility.
- Private owner account-management screen. Owner credentials are provisioned through controlled setup; owner recovery remains a controlled setup operation. Owner-managed staff resets replace automated email recovery in this small closed-account product.
- Reuse existing authentication and persistence infrastructure without undoing previously fixed behavior. No new automated email, SMS, calendar, payment, or notification integration is required for the agreed request workflow.
- Provide seeded owner/staff role access for development verification where needed, using synthetic credentials through controlled setup rather than public signup or public credential display. Do not seed patient requests as a substitute for real submission.

## Build Later
### Soon After MVP
- None beyond the complete request, staff, and owner workflows specified above.

### Later Improvements
- None requested. Patient accounts, confirmed appointments, availability scheduling, and additional provider/clinic structures are not planned enhancements in this revision.

## Deferred Integrations
- None planned. Automated email recovery is deliberately replaced by owner-managed staff resets; no notification or scheduling integration is needed to deliver this MVP.

## What's Been Implemented
- [x] Public one-page clinic site with sample name, hours, contact details, and fictional-content notice.
- [x] Latest hours update: weekdays 9:00 AM–5:00 PM; weekends 10:00 AM–2:00 PM.
- [x] Previously approved presentation and responsive behavior; frontend checks and production asset build passed. Rendered production verification remains pending.
- [x] Prior HIPAA-AC-012 fix (`1a3c685b-4b73-4b23-ae39-25b8419b9dee`): retired browser-storage credential replay in favor of secure HttpOnly cookie-managed sessions and deletion-only legacy cache cleanup. Targeted verification `b7e120aa-96b1-406e-80cb-db7b8c51a403` reported fixed. Preserve this behavior.
- [x] Prior HIPAA-LOG-002 fix (`9231cfa8-94a9-49fd-bb8f-9543deea5e0d`): static non-sensitive relay/provider failure errors without logging or attaching original exceptions. Targeted verification `c5116f40-0eb9-47f5-9d00-97ea7b8ff125` reported fixed. Preserve this behavior.
- [x] Slice 1: public form with required Name, Phone number, Preferred date, shared browser/server validation, retained entries on errors, first-invalid focus, inline saving/failure/real saved receipt, and pending duplicate guard. Existing dark clinic information and exact notice preserved.
- [x] Durable Convex `appointment_requests` creation with status `new`; public create-only endpoint returns no PHI or request ID. Inline atomic `PHI_WRITE` audit uses only non-sensitive metadata `{ op: "create" }`, with no fabricated anonymous actor/patient identity.
- [x] Backend synced; frontend lint/typecheck, backend typecheck, and Vite asset build passed. Anonymous synthetic submission and durable row/audit verified through existing backend tools; invalid/past dates and invalid name/phone rejected; today accepted. Source-calculated new control/error/focus contrast passed. No browser or production verification performed.
- [x] Optional Email field using existing styling, native email type/autocomplete, shared browser/server format and 254-character validation, associated static errors, retained values on failure, and clearing only on save success. Optional schema/mutation contract preserves legacy rows/clients; blank/whitespace email omitted, supplied email trimmed. No delivery, public reads, or receipt/audit PHI added.
- [x] Optional-email verification: lint/frontend+backend typechecks, Vite asset build, and backend sync passed. Shared synthetic validation and synced mutation/storage checks passed for omitted, blank, whitespace, valid trimmed, malformed, and overlength email; saved rows each retain metadata-only audit `{ op: "create" }`. No browser testing or production publishing performed.
- [x] Submission timestamp: server assigns `submittedAt` once, stores it with the request, and returns only saved outcome plus that same timestamp after the atomic write/audit. Optional schema field keeps historical rows valid. Inline receipt adds labeled local submitted date/time, explicit timezone, and semantic ISO time markup while preserving exact not-confirmed/no-care copy, optional email, retained errors, and duplicate guard. No new PHI read endpoints, IDs, patient echoes, timestamp logging/storage/URLs, or audit metadata keys.
- [x] Timestamp verification: lint/frontend+backend typechecks, Vite asset build, and backend sync passed. Native synthetic checks confirmed saved/returned timestamp equality, metadata-only write audit, optional-email preservation, and invalid-input rejection without timestamps or persisted requests. Native timezone formatting passed in three timezones after correcting a check's IANA alias assumption. No browser testing or production publishing.
- [x] Name-length refinement: shared browser/server validation rejects submitted names over 100 characters before saving, including excess surrounding whitespace, with static inline `errors.name`: “Name must be 100 characters or fewer.” Exactly 100 valid characters remain accepted; existing other name rules, form value retention/focus, create-only endpoint, optional email, timestamp receipt, and atomic metadata-only `PHI_WRITE` audit remain unchanged.
- [x] Name-length verification: lint/frontend+backend typechecks, Vite asset build, and backend sync passed. Native shared checks passed for 100/101 boundaries, padding, and prior invalid-name rules. Synced synthetic server submissions rejected 101-character and padded names with unchanged request/audit counts; a 100-character submission saved with matching timestamp, trimmed optional email, and audit metadata only `{ op: "create" }`. Form error association/retention verified by source inspection only; no browser testing, production publishing, or compliance scans performed.
- [ ] Closed-account sign-in, role gates, staff request list, and mark-contacted action.
- [ ] Private owner staff creation, access management, and password resets.
- [ ] Controlled owner bootstrap/recovery and synthetic seeded role access for verification.
- [ ] Production page and complete request workflow verified.

> Public submission and saving are implemented. Staff/owner access and account-management features remain deferred; no related placeholder UI or links shipped.

## Next Steps
- Slice 1, optional email, the saved submission-time receipt, and explicit server-enforced 100-character name validation are complete. Keep the current experience limited to public submission and saving; no email delivery. Staff and owner surfaces wait for a subsequent request.
- Slice 2: introduce staff email/password entry, closed-account role access, the real request list, and mark-contacted action. Use controlled owner/staff provisioning for access verification; no public signup.
- Slice 3: introduce the owner's private account-management screen with staff creation, access disable/re-enable, and owner-managed staff resets; verify owner bootstrap/recovery and finish the coherent MVP.
- Verify preservation of existing page content and previously fixed behavior, then test submission, unauthorized access denial, authorized reads, contacted persistence, and disabled-account denial with synthetic data at the deployed URL.
