# BroadbandServiceCard — Clarifying Question Assumptions

The following assumptions were made in lieu of direct user input.

---

## Stack

- **TypeScript + React:** Yes — confirmed in the brief.
- **CSS approach:** Plain CSS for any custom styles beyond Hearth's style props. No custom CSS was ultimately needed; all layout and spacing is handled by Hearth components and their responsive props.

---

## Purpose & Scope

- **Feature purpose:** A customer-facing summary card shown on a broadband account dashboard or services overview page, giving the customer a quick snapshot of their broadband service.
- **Standalone or embedded:** A reusable component designed to be embedded in a larger page (e.g. alongside other service cards for energy, mobile, etc.). It is not a standalone page.
- **Figma spec:** No spec provided; built from written requirements only.

---

## Responsiveness

- **Viewports:** Mobile and desktop, as stated in the brief.
- **Layout adaptation:** The card scales naturally with its parent container. No fundamentally different layout was required between mobile and desktop — the content stacks vertically on all sizes, which is the correct pattern for a summary card. Hearth responsive props are used on layout components where appropriate.

---

## User Journey

- **Entry:** The user arrives at this card from a services overview, home dashboard, or account page.
- **Next step:** The primary action ("Manage broadband") navigates the user to a dedicated broadband management page.
- **States handled:**
  - Default (hub online): displays package name, cost, contract date, and manage link.
  - Hub offline: additionally displays an `Alert` with a `warning` colour scheme.
  - Loading and error states were not included — the assumption is that the parent page/component handles data fetching and only renders this card once data is available. Skeleton loading could be added separately if needed.

---

## Data & Content

- **Data source:** Props only — the parent component is responsible for fetching and passing data. This component is purely presentational.
- **Props:**
  - `packageName: string` — e.g. "Full Fibre 500"
  - `monthlyCost: string` — pre-formatted display string, e.g. "£35.00"
  - `contractEndDate: string` — pre-formatted display string, e.g. "31 March 2026"
  - `manageHref: string` — URL for the manage link
  - `isHubOffline?: boolean` — defaults to `false`
- **Formatting:** Date and currency are passed in as pre-formatted strings. The component does not perform formatting itself, keeping it flexible for different locales or formatting conventions used by the consuming application.

---

## Interactions

- **Primary action:** "Manage broadband" link — navigates to a management page. Implemented as a `CardActionLink` (renders as an `<a>` tag) rather than a `Button`, because the intent is navigation.
- **No other interactions:** The card is read-only. The hub offline warning is informational only; no dismiss or action was added (the alert does not have an `onClose` prop) as no dismissal behaviour was specified.

---

## Accessibility

- **Standard:** WCAG 2.1 AA, as stated in the brief.
- **Card labelling:** The `Card` element carries `aria-labelledby` pointing to the package name `Heading`, so screen readers announce the card's context when it receives focus.
- **Heading level:** `as="h2"` was chosen. The assumption is that this card appears within a page that has an existing `h1`. If the card is used in a context where no `h1` exists above it, the `as` prop should be adjusted by the consumer.
- **Manage link:** Implemented using `CardActionLink` which renders a semantic `<a>` element with a visible label — no additional aria attributes needed.
- **Hub offline alert:** Uses Hearth's `Alert` component with `colorScheme="warning"`, which renders with the appropriate ARIA `role="alert"` automatically, ensuring screen readers announce it when it appears.
- **Decorative icons:** Icons inside `CardActionLink` are decorative (the link label provides the accessible name), so no `title`/`titleId` props are added to the icons.

---

## Existing Context

- **Codebase:** Assumed to be a standard Hearth-based React application with `HearthProvider` and `@utilitywarehouse/hearth-tokens/css` already imported at the app root.
- **Visual consistency:** The card uses `colorScheme="broadband"` and `shadowColor="broadband"` to match the broadband service brand colour — consistent with how energy, mobile, and other service cards are typically styled in UW products.
- **No custom CSS required:** All styling is achieved through Hearth component props and built-in token-backed styles. A `BroadbandServiceCard.css` file was therefore omitted.
