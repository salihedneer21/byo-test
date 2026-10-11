# Sample Clinic Design Brief

## Product Context
- **App type**: Minimal public one-page clinic information site for a production deployment test. All clinic content is fictional.
- **Primary personas**: Visitors looking for opening hours and contact details; the project owner checking that the public deployment displays the intended information.
- **Primary jobs to be done**: Read the clinic name, hours, phone, email, and address quickly, without signing in or submitting information.

## Direction Summary
Keep the existing quiet, typography-led information sheet and change only its theme to dark mode, as requested. A plum-tinted charcoal canvas, warm off-white text, and a lighter muted plum accent translate the warm-paper identity without adding assets or visual noise. Preserve the current typography, spacing, content, and responsive arrangement. The dark palette is selected by design judgment from the existing direction, not from new external references.

## Brand and Mood
- **Brand personality**: Plainspoken, careful, understated.
- **Mood**: Calm and immediately legible, with no implication that the fictional clinic is an operating care service.
- **Keywords**: Quiet, readable, orderly, honest, minimal.
- **Viewing scene**: A visitor reads the brief hours/contact listing on a phone, and the project owner checks it on a desktop, under variable ambient light. Your explicit dark-mode choice determines the canvas; high-contrast text keeps the information readable without assuming a nighttime-only audience.

## Color System
- **Backgrounds / neutrals**: Plum-tinted charcoal canvas `oklch(0.20 0.008 310)`, with the same color for the flat surface; warm off-white main text `oklch(0.92 0.006 75)`, muted labels `oklch(0.73 0.01 310)`, fine separators `oklch(0.36 0.008 310)`. Do not use pure white or black. Preserve the notice in main text color and verify final rendered text contrast against the canvas.
- **Primary accent**: Light muted plum `oklch(0.76 0.065 325)` used sparingly, under 10% of the surface, for the existing section headings or a focus indicator if needed. Main content remains warm off-white. Avoid reusing the original dark plum on the dark background.
- **Secondary accents**: None. Avoid adding a decorative palette.
- **Semantic colors**: No status system is needed. Closed weekend hours are ordinary text, not an error state. If a genuine semantic state becomes necessary within approved scope, use text plus color, and verify contrast rather than inventing badges.

## Typography Direction
- **Display / emphasis**: A deliberate system humanist sans stack, `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Clinic name at 36–56px, weight 600, line-height 1.1, tracking around -0.025em. No downloaded font dependency.
- **Body / UI text**: Same family at 16–18px, weight 400, line-height 1.5–1.6. Section headings 20–24px, weight 600; short field labels may use 14px at weight 500.
- **Hierarchy notes**: Keep at least 1.25 scale contrast between body, section headings, and title. Left align all information, cap text width at 65ch, and preserve readable numbers without decorative treatments. Notice text stays at least 14px and readable.

## Layout and Navigation
- **Layout direction**: A single dark document canvas, maximum content width approximately 880px, centered horizontally with left-aligned content. Use roughly 64–88px top/bottom padding on desktop and 32–40px on mobile, with 24px mobile side gutters.
- **Navigation pattern**: None. No menu, sidebar, tabs, sticky header, or additional routes are warranted.
- **Screen rhythm**: Clinic name first, then a generous 40–56px separation before the information area. Hours and contact sit in two columns above approximately 640px, with a 48–64px gutter, and stack in that order below it. Use fine horizontal rules and open space instead of cards. Place a short sample-data notice after both sections; do not force the page to fill the viewport or hide content to fit one screen.

## Component Style
- **Surfaces**: Flat canvas, no shadows, card grid, rounded panel treatment, hero image, logo asset, or decorative icons. The clinic name is the identity.
- **Inputs and forms**: None. No contact form, search, newsletter field, or data collection.
- **Buttons and actions**: No call-to-action buttons. Display the fictional contact details as selectable text, with no operational contact claims or integrations.
- **Data display**: Use simple labeled text or semantic description lists. Opening hours: Monday–Friday, 9:00 AM–5:00 PM; Saturday–Sunday, closed. Contact: +1 (202) 555-0147; clinic@example.com; 123 Example Street, Sample Town. Allow email and address to wrap naturally on narrow screens. Do not add live open/closed status, maps, service listings, or invented credentials.

## Motion and Feedback
- **Motion tone**: None required; the page is static and should render immediately.
- **Interaction notes**: No entrance animation, hover-lift surfaces, skeletons, or loading overlay. Preserve native text selection, browser zoom, and any native keyboard behavior. If an interactive element is introduced by an approved later change, it must have a visible focus indicator and respect reduced motion.

## References
- No screenshots, reference URLs, or brand assets supplied. The design direction was delegated explicitly; do not imply external reference approval.
- Internal visual analogy: a neatly typeset clinic information sheet, used as a hierarchy and restraint cue rather than an additional asset requirement.

## Anti-Patterns / Constraints
- Exactly one public page, no authentication, booking, forms, integrations, dashboards, backend management, tracking, or collection of personal information. Do not add MFA or related screens.
- Dark theme only, independent of system theme preference; use native dark color-scheme behavior. Do not add a theme toggle, preference storage, or light-mode variant. This revision changes palette only: preserve current font metrics, layout, spacing, content, and static behavior; do not touch backend or prior HIPAA remediation.
- Use the exact approved sample name, hours, phone, email, and address. Include a concise visible notice: "Sample information for a deployment test. Not a real clinic listing."
- Avoid stock clinician photography, medical icons, generic teal healthcare templates, gradient heroes, promotional copy, testimonials, invented services, and claims of availability or care quality.
- Avoid oversized full-screen heroes that push the actual information out of view, repeated cards, glassmorphism, shadows, and unnecessary animation.
- Meet WCAG AA text contrast, use one h1 with meaningful section headings, keep reading order aligned with visual order, and avoid horizontal scrolling at 320px or at 200% zoom.
- Content must remain readable without remote images, external fonts, scripts for information display, or extra assets. No visual status should imply production verification has already succeeded.
