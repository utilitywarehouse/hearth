# ServicesDashboard — Assumptions

## Stack

- **TypeScript + React** — confirmed per task brief.
- **Plain CSS** — no custom `.css` file was needed; all styling is covered by Hearth style props,
  responsive prop objects, and Hearth's built-in `colorScheme` / `variant` tokens on `Card`.

## Data model

- Service data is passed in as a `services: Service[]` prop. Each service carries:
  - `id` — stable React key.
  - `name` — display label (e.g. "Energy").
  - `monthlyCost` — raw `number` in pounds; formatted to two decimal places by the component.
  - `manageHref` — the URL the "Manage" link points to.
  - `colorScheme` — one of `'energy' | 'broadband' | 'mobile'`, used to tint the `Card` and
    select the correct icon.
- Total monthly spend is **derived** inside the component (`Array.reduce`) — no prop needed.
- An optional `customerName` prop personalises the page heading; without it the heading falls
  back to "Your services".

## Layout

- **Mobile (single column):** `Grid columns={1}` — one card per row, full-width total-spend
  summary above the grid.
- **Tablet (two columns):** `Grid columns={2}`.
- **Desktop (three columns):** `Grid columns={3}`.
- Responsive props (`columns`, `gap`, `paddingY`, `size`) are used throughout; no media queries
  in custom CSS.

## Icons

Chosen from `@utilitywarehouse/hearth-react-icons`:

| Service   | Icon                  |
|-----------|-----------------------|
| Energy    | `ElectricityMediumIcon` |
| Broadband | `BroadbandMediumIcon`   |
| Mobile    | `MobileMediumIcon`      |

Icons are rendered `aria-hidden="true"` because the surrounding card heading provides the
accessible name.

## Cards

- Used `Card variant="subtle" colorScheme={colorScheme}` so each card carries the correct UW
  brand tint for energy / broadband / mobile.
- `shadowColor` is set to match `colorScheme` for a branded drop shadow.
- `CardInteraction asChild` wraps the `Link` for correct hover/focus ring treatment on the
  manage link — the card itself is not fully clickable, only the manage link is interactive.
- `aria-labelledby` on each `Card` points to its `Heading id` so screen readers announce the
  card's purpose.

## Total spend summary

- Rendered as a `Card variant="subtle" colorScheme="neutralStrong"` above the service grid.
- Hidden entirely when `services` is empty (there is nothing to sum).
- Displays the summed cost as `DetailText size={{ mobile: '3xl', desktop: '4xl' }}` for
  clear visual hierarchy.

## Empty state

- When `services` is empty, the grid is replaced by a card with a short explanatory message and
  an "Explore services" link.

## Accessibility

- WCAG 2.1 AA targeted throughout.
- One `<Heading as="h1">` per page.
- Heading levels do not skip: h1 (page title) → h2 (each service card / empty-state heading).
- `Badge colorScheme="positive"` marks each service as "Active" — colour alone is not used;
  the text "Active" is always visible.
- Icons are `aria-hidden` inside labelled contexts; standalone icons would require `title` +
  `titleId` (none are used standalone here).
- `CardInteraction asChild` ensures the manage link renders as a native `<a>` element with full
  keyboard focus behaviour.

## Not implemented (out of scope)

- **Loading state** — data is assumed to arrive synchronously via props; a Spinner/Skeleton
  wrapper could be added by the caller.
- **Error state** — error boundaries and retry UI are considered infrastructure concerns outside
  this component.
- **Dark mode** — no dark-mode overrides added; Hearth semantic tokens update automatically if
  a dark-mode class is applied at the root.
- **Router integration** — `href` strings are passed in as props; the component is router-agnostic.
  Use `asChild` on `Link` to integrate with React Router's `<NavLink>` if needed.
