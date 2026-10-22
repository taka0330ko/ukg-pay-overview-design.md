# Implementation notes

Built from taka0330ko/ukg-pro-redesign, retaining its React 19, TypeScript, Vite, Tailwind, Highcharts, Lucide, and pnpm lockfile.

Run `pnpm install --frozen-lockfile`, then `pnpm dev`. Production: `pnpm build`; checks: `pnpm lint`.

Figma mapping: `Semantic/color/text/primary` → `--color-text-primary`; `Components/work-cell/bg` → `--work-cell-bg`; `Components/chart/primary` → `--chart-primary`; `Components/chart/secondary` → `--chart-secondary`; `calendar/grid/height` → `--calendar-grid-height`; `calendar/day/width` → `--calendar-day-width`; `calendar/shift/width` → `--calendar-shift-width`; `calendar/shift/inset-inline` → `--calendar-shift-inset-inline`. Primitive → Semantic → Component aliases are in src/index.css. DM Sans is the primary font; Inter is used in shift details, time labels, and date numerals. Figma icons are local in public/assets.

The reference repository assigns the late shift to Sunday April 5 and the regular shift to Thursday April 9; the supplied screenshot reverses those two shifts. This implementation retains the dated reference data, consistent with design.md’s instruction that records take precedence. Week totals are derived from integer paid minutes: 1001 + 1020 = 2021 (33.68 displayed hours). Overtime is a subset of paid time.

Date selection, PDF export, secondary navigation destinations, and backend connections remain unspecified and display-only. Shift details use desktop hover and mobile tap; the mobile modal closes through its close button or backdrop. Only the week indicator and sidebar animate.


Hover and spacing token mappings: Figma `sidebar/hover` → `--sidebar-hover`; `color/surface/tertiary` → `--color-surface-tertiary` → `--sidebar-control-hover`; `button/primary/hover` and `button/secondary/hover` → matching `--button-*-hover` aliases. `spacing/2xs`, `spacing/xs`, `spacing/m`, `spacing/l` → `--spacing-2xs` (4), `--spacing-xs` (8), `--spacing-m` (16), `--spacing-l` (24), backed by Primitive Numbers tokens. Sidebar rows reference Component padding aliases; their horizontal inset is 8px, with 24px for nested pay links.


### ShiftTimelineCardOptionB — Figma 3:2964
The shared card stylesheet is src/styles/shift-card.css. Exact base frame: 188 × 177; `spacing/xs` → padding 8; `spacing/m` → timeline gap 16; `spacing/3xs` → summary inset 2; the summary row gap is Figma’s fixed 6. Timeline rows are 167 wide, with a 9px event marker and an 8 × 35 break marker. Inter time/label/value fonts are 16/10/12; status text uses DM Sans, 8 for Late/Early Leave and 10 for Overtime. All values are mapped through Primitive → Semantic → Component CSS tokens. Timeline and summary are separate layout groups, with no extra gap between them. The modal uses scale 1.5 consistently for geometry, spacing, text, markers and icons, preserving the user-requested larger presentation (282 × 265.5). Payroll values remain derived from the same records; confirmed overtime is a subset of paid hours.
