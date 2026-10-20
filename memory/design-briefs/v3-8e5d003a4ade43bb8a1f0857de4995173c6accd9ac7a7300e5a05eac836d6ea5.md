# Sample Clinic Design Brief

## Product Context
- **App type**: Minimal public one-page clinic information site with an appointment-request form for a production deployment test. All clinic content is fictional.
- **Primary personas**: Visitors reading clinic information and submitting a preferred date without an account; the project owner verifying deployment with synthetic data.
- **Primary jobs to be done**: Read the clinic name, hours, phone, email, and address without submitting information; optionally enter name, phone number, and preferred date and receive an honest saved-request receipt.

## Direction Summary
Preserve the existing quiet, dark typography-led information sheet and add a modest, inline appointment-request section below its information and fictional-listing notice. Keep the plum-tinted charcoal canvas, warm off-white text, muted plum accent, system typography, and existing responsive information layout. Three familiar labeled controls and clear saving feedback extend the page without suggesting a working clinic, guaranteed follow-up, or confirmed booking. This extension follows the approved roadmap and existing identity, not new external references.

## Brand and Mood
- **Brand personality**: Plainspoken, careful, understated.
- **Mood**: Calm and immediately legible, with no implication that the fictional clinic is an operating care service.
- **Keywords**: Quiet, readable, orderly, honest, minimal.
- **Viewing scene**: A visitor reads the brief hours/contact listing on a phone, and the project owner checks it on a desktop, under variable ambient light. Your explicit dark-mode choice determines the canvas; high-contrast text keeps the information readable without assuming a nighttime-only audience.

## Color System
- **Backgrounds / neutrals**: Plum-tinted charcoal canvas `oklch(0.20 0.008 310)`, with the same color for the flat surface; warm off-white main text `oklch(0.92 0.006 75)`, muted labels `oklch(0.73 0.01 310)`, fine separators `oklch(0.36 0.008 310)`. Do not use pure white or black. Preserve the notice in main text color and verify final rendered text contrast against the canvas.
- **Primary accent**: Light muted plum `oklch(0.76 0.065 325)` used sparingly, under 10% of the surface, for the existing section headings or a focus indicator if needed. Main content remains warm off-white. Avoid reusing the original dark plum on the dark background.
- **Secondary accents**: None. Avoid adding a decorative palette.
- **Semantic colors**: Saved receipt and pending feedback use main text, with optional existing plum emphasis; the sample-data notice remains ordinary text. Inline validation and submission errors may use muted light rose `oklch(0.78 0.09 20)` plus explicit wording, never color alone. Verify text contrast and 3:1 contrast for control boundaries/focus indicators; decorative separators are not input borders. Hours remain ordinary information, not availability states.

## Typography Direction
- **Display / emphasis**: A deliberate system humanist sans stack, `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Clinic name at 36–56px, weight 600, line-height 1.1, tracking around -0.025em. No downloaded font dependency.
- **Body / UI text**: Same family at 16–18px, weight 400, line-height 1.5–1.6. Section headings 20–24px, weight 600; short field labels may use 14px at weight 500.
- **Hierarchy notes**: Keep at least 1.25 scale contrast between body, section headings, and title. Left align all information, cap text width at 65ch, and preserve readable numbers without decorative treatments. Notice text stays at least 14px and readable.

## Layout and Navigation
- **Layout direction**: A single dark document canvas, maximum content width approximately 880px, centered horizontally with left-aligned content. Use roughly 64–88px top/bottom padding on desktop and 32–40px on mobile, with 24px mobile side gutters.
- **Navigation pattern**: None. No menu, sidebar, tabs, sticky header, or additional routes are warranted.
- **Screen rhythm**: Clinic name first, then a generous 40–56px separation before the information area. Hours and contact sit in two columns above approximately 640px, with a 48–64px gutter, and stack in that order below it. Use fine horizontal rules and open space instead of cards. Keep the exact sample-data notice after both sections, then add the request section after 40–56px of space and a fine rule. Use a left-aligned single-column form, approximately 480px maximum width, within the existing canvas on desktop and full available width on mobile. Do not force the page to fill the viewport or hide content to fit one screen.

## Component Style
- **Surfaces**: Flat canvas, no shadows, card grid, rounded panel treatment, hero image, logo asset, or decorative icons. The clinic name is the identity.
- **Inputs and forms**: One section headed "Request an appointment", with exactly three required fields in order: "Name", "Phone number", "Preferred date". Use visible associated labels, text/name autocomplete, telephone input with tel autocomplete, and a native date input with dark color-scheme. Controls use the canvas, a contrast-qualified neutral border, modest 4–6px radius, 16px text, and at least 44px height; separate field groups by 20–24px. No email, reason, time, consent checkbox, or other field. Above the fields state: "Deployment test only. Use a made-up name and phone number. Your preferred date is a request, not a confirmed appointment." Accept usable names and phone numbers without a letters-only name rule or one rigid phone mask; require a valid date today or later. Do not derive availability or disallow weekends from displayed hours. Display specific inline errors tied to each control, retaining all entered values and focusing the first invalid field after submit.
- **Buttons and actions**: One "Save request" submit button, using muted plum fill with charcoal text, modest radius, and visible focus; minimum 44px target. Hover/pressed feedback is a restrained color change; pending reads "Saving…" with duplicate submission disabled. Display the fictional contact details as selectable text, with no operational contact claims or integrations.
- **Data display**: Use simple labeled text or semantic description lists. Opening hours: Monday–Friday, 9:00 AM–5:00 PM; Saturday–Sunday, 10:00 AM–2:00 PM. Contact: +1 (202) 555-0147; clinic@example.com; 123 Example Street, Sample Town. Allow email and address to wrap naturally on narrow screens. Do not add live open/closed status, maps, service listings, or invented credentials.

## Motion and Feedback
- **Motion tone**: No decorative motion; clinic information renders immediately. Optional short color transitions respect reduced motion.
- **Interaction notes**: Keep validation, pending, failure, and saved receipt inline on the same page, with no modal, overlay, skeleton, or new route. Preserve native selection, zoom, date picker, keyboard behavior, and visible focus. Use aria-invalid and associated error descriptions; politely announce saving and receipt, and announce submission failures.
- **Save feedback**: Keep entered values visible during saving; never show success optimistically. Only after actual persistence replace the form with a plain receipt: "Request saved. This is not a confirmed appointment. This fictional deployment-test clinic does not provide care or follow-up." Do not promise calls, messages, or a reserved date. Receipt is immediate acknowledgement only, not a public record lookup, share link, or patient portal. Do not repeat name/phone in the receipt or place submitted values in the URL or browser storage.
- **Failure feedback**: Show "We couldn't save your request. Your entries are still here. Please try again." inline with retained inputs and an enabled "Save request" retry after pending ends. Use static, non-sensitive failure copy, not raw backend exceptions. Retain values in page state through validation and saving failure; do not claim reload-resume support.

## References
- No screenshots, reference URLs, or brand assets supplied. The design direction was delegated explicitly; do not imply external reference approval.
- Internal visual analogy: a neatly typeset clinic information sheet, used as a hierarchy and restraint cue rather than an additional asset requirement.

## Anti-Patterns / Constraints
- Exactly one public page. Only the three-field request form, real saved receipt, and its inline states extend the information sheet. No patient authentication, confirmed booking, scheduling funnel, integrations, tracking, dashboards, staff/owner/auth surfaces, or placeholder links to deferred screens. Do not add MFA or related screens.
- Dark theme only, independent of system theme preference; use native dark color-scheme behavior. Do not add a theme toggle, preference storage, or light-mode variant. Preserve existing font metrics, information-section layout, spacing, and sample content; the additive form must not undo prior HIPAA remediation.
- Encourage synthetic data beside the form while retaining the exact existing fictional-listing notice. Public submission never exposes stored requests; reuse existing required audit handling for saved submissions without patient values in audit metadata. No audit viewer or security-feature expansion.
- Use the exact approved sample name, hours, phone, email, and address. Include a concise visible notice: "Sample information for a deployment test. Not a real clinic listing."
- Avoid stock clinician photography, medical icons, generic teal healthcare templates, gradient heroes, promotional copy, testimonials, invented services, and claims of availability or care quality.
- Avoid oversized full-screen heroes that push the actual information out of view, repeated cards, glassmorphism, shadows, and unnecessary animation.
- Meet WCAG AA text contrast, use one h1 with meaningful section headings, keep reading order aligned with visual order, and avoid horizontal scrolling at 320px or at 200% zoom.
- Content must remain readable without remote images, external fonts, scripts for information display, or extra assets. No visual status should imply production verification has already succeeded.
