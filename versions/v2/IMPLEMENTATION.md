# Implementation notes

Built from taka0330ko/ukg-pro-redesign, retaining its React 19, TypeScript, Vite, Tailwind, Highcharts, Lucide, and pnpm lockfile.

Run `pnpm install --frozen-lockfile`, then `pnpm dev`. Production: `pnpm build`; checks: `pnpm lint`.

Figma mapping: `Semantic/color/text/primary` → `--color-text-primary`; `Components/work-cell/bg` → `--work-cell-bg`; `Components/chart/primary` → `--chart-primary`; `Components/chart/secondary` → `--chart-secondary`; `calendar/grid/height` → `--calendar-grid-height`; `calendar/day/width` → `--calendar-day-width`; `calendar/shift/width` → `--calendar-shift-width`; `calendar/shift/inset-inline` → `--calendar-shift-inset-inline`. Primitive → Semantic → Component aliases are in src/index.css. DM Sans is the primary font; Inter is used in shift details, time labels, and date numerals. Figma icons are local in public/assets.

The reference repository assigns the late shift to Sunday April 5 and the regular shift to Thursday April 9; the supplied screenshot reverses those two shifts. This implementation retains the dated reference data, consistent with design.md’s instruction that records take precedence. Week totals are derived from integer paid minutes: 1001 + 1020 = 2021 (33.68 displayed hours). Overtime is a subset of paid time.

Date selection, PDF export, secondary navigation destinations, and backend connections remain unspecified and display-only. Shift details use desktop hover and mobile tap; the mobile modal closes through its close button or backdrop. Only the week indicator and sidebar animate.
