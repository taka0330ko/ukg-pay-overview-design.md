# UKG Pro — Weekly Calendar Design Specification

## Figma Fidelity and Prohibited Behavior

- Do not add any behavior, interaction, animation, transition, navigation, or feature that is not defined in the Figma designs, their documented interaction specifications, or the explicit supplemental requirements below.
- Do not infer behavior from appearance alone. A visual element does not authorize adding click, hover, tap, drag, or keyboard behavior.
- Disable library defaults, including tooltips, hover effects, selection effects, and animations, unless explicitly specified in Figma or the supplemental requirements below.
- Do not invent missing states or interactions. Record any unspecified behavior as an open question and obtain an explicit update to Figma or this supplemental specification before implementing it.
- The supplemental requirements below explicitly authorize the listed behavior where Figma alone does not fully explain it. They take precedence for those behaviors; all other implementation guidance remains subject to the restrictions above.

## Supplemental Interaction Requirements Not Fully Explained in Figma

This section documents explicitly required behavior that cannot be fully communicated through the Figma designs alone. Use the Figma visuals together with these requirements.

### Shift Cell Details: ShiftTimelineCardOptionB

- On non-mobile layouts, hovering over a shift cell displays `ShiftTimelineCardOptionB` for that shift as an overlay.
- On Mobile, clicking or tapping a shift cell opens `ShiftTimelineCardOptionB` in a modal instead of a hover overlay.
- Both presentations use the same underlying Shift data and the Figma-defined card content and appearance.
- Displaying the overlay or modal must not change shift-cell dimensions, time-grid dimensions, or shift positions.

### WeekToggle Slide Animation

- Animate the selected-state indicator of `WeekToggle` with a horizontal sliding transition when switching weeks.
- Keep the indicator aligned with the selected week at the end of the transition.
- This requirement authorizes the toggle's slide animation; it does not authorize additional calendar-content transition effects.

### Sidebar Open and Close Animation

- Use a horizontal slide animation when opening and closing the Sidebar.
- Animate between the open and closed states shown in Figma, preserving their final layout and dimensions.

### Sidebar Button Overflow and Vertical Scrolling

- When the screen height is insufficient to display all Sidebar buttons, constrain the button area to the available height and enable vertical overflow scrolling.
- Allow the buttons to scroll up and down within this area rather than extending beyond the Sidebar.
- Clip the scrolling content around the upper edge of the `Myself` area so buttons disappear at that boundary as they scroll out of view.
- Size the scrollable area according to the available screen height while preserving the Figma-defined button sizes and spacing.

## Base Dimensions

Design the time grid at 602px wide × 360px high.

| Item | Dimension |
| --- | ---: |
| Displayed time range | 00:00–24:00 |
| Time grid height | 360px |
| Column width per day | 86px |
| Grid width for seven days | 602px |
| One hour | 15px |
| 30 minutes | 7.5px |
| 15 minutes | 3.75px |
| One minute | 0.25px |

The 360px height applies only to the time grid. It excludes the week toggle, date labels, width reserved for time-axis labels, scrollbars, weekly summary, and card padding.

## Time Axis and Grid Lines

Set the top of the grid to y = 0 and the bottom to y = 360.

| Time | y-coordinate |
| --- | ---: |
| 00:00 | 0px |
| 06:00 | 90px |
| 12:00 | 180px |
| 18:00 | 270px |
| 24:00 | 360px |

Do not reduce the time calculation area to accommodate grid-line strokes or date-label height. Center each time label on its corresponding grid line.

## Shift Positioning and Sizing

Convert start and end times into minutes for calculations. Place each shift as a child of its corresponding date column; do not position it using coordinates relative to the entire screen or card.

```text
startMinutes = startHour × 60 + startMinute
endMinutes = endHour × 60 + endMinute
shiftTop = startMinutes × 0.25px
shiftHeight = (endMinutes − startMinutes) × 0.25px
```

Preserve fractional coordinates; do not round them to integers. Treat breaks as a separate visual representation and do not subtract them from the outer shift height spanning clock-in to clock-out. Split overnight shifts by date and place each segment in its corresponding column.

| Shift time | Top | Height |
| --- | ---: | ---: |
| 14:19–22:15 | 214.75px | 119px |
| 17:25–22:15 | 261.25px | 72.5px |
| 17:50–22:45 | 267.5px | 73.75px |
| 13:30–23:00 | 202.5px | 142.5px |
| 17:25–21:00 | 261.25px | 53.75px |

Keep status color bands and borders inside the shift outline without extending its end position. If Overtime or Early leave bands represent durations, define their boundary times separately. Do not infer times from color-band dimensions.

## Horizontal Layout and Figma Structure

- Arrange seven days horizontally, each 86px wide, with a 0px gap.
- Provide a 360px-high time area inside each date column.
- Position shifts absolutely relative to that day's time area.
- Set shift width to 80px, with 3px of space on each side.
- Place date labels below their respective columns, outside the time-area height.
- Treat detail cards as display overlays; they must not change shift or grid dimensions.
- Define horizontal subdivision rules for overlapping shifts separately.

Recommended hierarchy:

```text
Calendar
├─ Week Toggle
├─ Calendar Body
│  ├─ Time Axis (fixed)
│  └─ Horizontal Scroll Viewport
│     └─ Week Grid (width: 602px)
│        └─ Day Column × 7 (width: 86px each)
│           ├─ Time Area (height: 360px)
│           │  └─ Shift (top and height calculated from times)
│           └─ Date Label
├─ Week Summary
└─ Shift Detail Overlay
```

Maintain the 360px time-area height and 86px date-column width on Mobile and Tablet. When the available width is insufficient, scroll the date grid horizontally while keeping the time axis fixed. Date labels and shifts must move within the same scrolling area. The total Calendar Body width, including the time axis, is 602px plus the width occupied by the time axis.

## Proposed Token-to-Implementation Mapping

Define the following shared dimension tokens, adding or mapping them according to the existing naming conventions.

| Purpose | Proposed Figma variable | Value | Proposed web equivalent |
| --- | --- | ---: | --- |
| Time-area height | calendar/grid/height | 360px | --calendar-grid-height |
| Date-column width | calendar/day/width | 86px | --calendar-day-width |
| Shift width | calendar/shift/width | 80px | --calendar-shift-width |
| Shift horizontal inset | calendar/shift/inset-inline | 3px | --calendar-shift-inset-inline |

Derive the seven-day width of 602px, 15px per hour, and 0.25px per minute from these dimensions. Do not create numerous fixed spacing tokens for shift tops and heights that vary by time. Use existing Semantic/Component tokens for colors, typography, and corner radii.

## Verification Checklist

- 00:00, 06:00, 12:00, 18:00, and 24:00 align with 0, 90, 180, 270, and 360px respectively.
- Each shift's start and end positions align with the time axis.
- Total shift height, including status bands, matches the calculated value.
- Horizontal scrolling preserves alignment between dates, shifts, and grid lines.
- Opening or closing the Desktop sidebar does not change a shift's assigned column or time position.
- This specification changes calendar dimensions and positioning. Payroll amounts and weekly paid-hours calculation rules belong to separate specifications.
- No behavior absent from Figma or the explicit supplemental requirements is introduced, including library-default interactions or animations.
- Shift-cell hover details, the Mobile detail modal, WeekToggle sliding, Sidebar sliding, and Sidebar overflow scrolling follow the supplemental requirements.

## Technology Stack and Libraries

Continue using the structure of the existing repository, `taka0330ko/ukg-pro-redesign`. The versions below are the declarations in the reviewed package.json; do not automatically upgrade them to the latest versions during installation. Use pnpm-lock.yaml as the source of truth for resolved versions.

| Purpose | Technology | package.json declaration |
| --- | --- | --- |
| UI | React / React DOM | ^19.2.5 |
| Language | TypeScript | ~6.0.2 |
| Development server and build | Vite | ^8.0.10 |
| React build integration | @vitejs/plugin-react | ^6.0.1 |
| Styling | Tailwind CSS | ^4.2.4 |
| Tailwind Vite integration | @tailwindcss/vite | ^4.2.4 |
| Pie chart | Highcharts | ^12.6.0 |
| Icons | lucide-react | ^1.3.0 |
| Code checks | ESLint / typescript-eslint | ^10.2.1 / ^8.58.2 |
| Package management | pnpm | Retain the existing lockfile |
| State management | React Context / useState | Built-in React features |
| Design tokens | CSS Custom Properties | Standard browser features |
| Weekly calendar | React + CSS Grid + absolute positioning within date columns | Custom implementation |

### UI and State Management

Retain the existing division of responsibilities among AppLayout, SideMenu, PayOverviewPage, PaySummarySection, and HoursBreakdownSection. Manage sidebar visibility through Context and the selected week and shift details through useState. Do not introduce additional state-management or calendar libraries for this screen.

### Styling and Tokens

Use Tailwind CSS for layout and state styling. Manage colors, shared spacing, typography, corner radii, and calendar dimensions through CSS variables mapped to Figma. Preserve the three-layer structure: Primitive → Semantic → Component.

- Components should generally reference Semantic or Component tokens appropriate to their purpose.
- Do not reuse tokens across unrelated purposes, such as using an overtime status color for an Avatar.
- Explicitly document the mapping between Figma Code syntax and CSS variable names.
- Reproduce the actual font settings in Figma. Where DM Sans and Inter coexist, verify their intended uses and load the required fonts and weights.
- Use Lucide React for icons by default. If an icon's shape differs from Figma, use an SVG from Figma.

### Pie Chart: Highcharts

Retain the existing PieChart.tsx and use Highcharts directly without adding a React wrapper. Destroy the chart with chart.destroy() when the component unmounts.

- Use numeric Net pay and Deductions inputs to render their proportions of the total.
- The current data is Net pay $591.52, Deductions $40.04, and total $631.56.
- Use Figma's 180px circle diameter as the reference. Design the outer area containing labels separately from the circle diameter.
- Compare label positions, connector lines, borders, start angle, and fonts against Figma. Do not assume Highcharts automatic positioning matches the design.
- Map colors to chart Component tokens.
- Retain the existing hover slice offset and animations only if explicitly defined in Figma. Otherwise, disable them, along with any other unspecified Highcharts default behavior.
- Reflect amount changes from the data rather than duplicating hardcoded values across screens.

### Weekly Calendar: Custom Implementation

Build on the existing TimeRow, TimeColumn, WorkHoursCell, and WorkHoursCard. Do not use additional libraries such as FullCalendar; follow this document's 602px × 360px grid specification.

- Set HOUR_HEIGHT to 15 and DAY_HEIGHT to 360 in timeScale.ts.
- Treat the existing 16px TOP_PADDING as outside the time area; do not add it to the time origin more than once.
- Arrange seven 86px columns, with shifts 80px wide and 3px of space on either side.
- Replace the existing design that divides a minimum 760px area into seven equal parts with this fixed-column-width design.
- Do not distort the time scale with the existing 36px minimum shift height. If Figma specifies a larger interaction target for short shifts, keep it separate from the visible shape.
- End the Early leave outline at the actual clock-out time, not the scheduled end time. If Figma specifies a display of the difference from the schedule, use a separate element.
- Distinguish whether Overtime bands are decorative or represent time. If they represent time, calculate their dimensions from minutes.
- Keep the time axis outside the horizontal scrolling area and scroll date labels and shifts together.
- Follow the supplemental requirements for ShiftTimelineCardOptionB: show it on shift-cell hover in non-mobile layouts and open it in a modal on click or tap on Mobile. Use Figma for visual placement and appearance. Do not add other unspecified detail-card behavior.

### Data and Calculations

Use the existing payOverviewData.ts as the starting point for separating data. Keep dates, clock-in/out times, breaks, and payroll data separate from display components.

- Base time calculations on integer minutes and round to two decimal places for display.
- Distinguish regular hours, overtime hours, and total hours to avoid counting overtime twice.
- Verify consistency between weekly totals, period totals, and payslips.
- Use the same target period for payroll and the work calendar; do not hardcode header dates independently.
- PDF export, date selection, and backend integration are not implemented in the current code. Do not implement them unless their behavior is defined in Figma and the necessary functional specifications have been established.

### Validation

Run the existing TypeScript build and ESLint checks. Compare browser output at the same viewport widths as the Figma Desktop, Tablet, and Mobile designs, checking fonts, spacing, line wrapping, charts, and shift positions. Playwright may be considered as a development dependency if image comparison is automated, but it is not included in the current dependencies.

Reference repository: https://github.com/taka0330ko/ukg-pro-redesign

## Work Data as the Shared Source of Truth

This section takes precedence for the relationship between work data and its presentation. As in the reference repository, consolidate work information as data and derive shift-cell appearance, details, and summaries from it. Do not store screen or Figma coordinates as work data.

### Work Data Structure

Each shift has an ID, work date, scheduled start and end, actual clock-in and clock-out, and breaks. To avoid ambiguity for overnight shifts, store times as integer minutes relative to 00:00 on the work date, using values of 1440 or greater for the following day. For example, 01:00 the following day is 1500.

```ts
type Break = {
  startMinute: number;
  endMinute: number;
  paid: boolean;
};

type Shift = {
  id: string;
  date: string; // YYYY-MM-DD; local date at the workplace
  scheduled: { startMinute: number; endMinute: number };
  actual: { startMinute: number; endMinute: number };
  breaks: Break[];
  // Confirmed overtime intervals, each within the actual work interval.
  overtimeIntervals: { startMinute: number; endMinute: number }[];
};
```

A pay period references its start date, end date, and the shifts belonging to that period. Specify the workplace time zone separately. When the storage or input layer handles date-time values, convert them into this rendering data structure.

### Values Derived from Data

| Display or value | Derivation rule |
| --- | --- |
| Date column | Difference between shift.date and the selected week's start date |
| Cell top | actual.startMinute × 0.25px, calculated after splitting overnight shifts by date |
| Cell height | Difference between actual end and start minutes × 0.25px |
| Cell width | Shared 80px token |
| Late | Actual start is later than scheduled start |
| Early leave | Actual end is earlier than scheduled end |
| Overtime | Confirmed overtime intervals exist |
| Detail card | Show the schedule, actual times, and breaks from the same Shift |
| Paid work minutes | Actual elapsed work minutes − unpaid break minutes |
| Overtime minutes | Minutes within confirmed overtime intervals that overlap paid work |
| Regular work minutes | Paid work minutes − overtime minutes |
| Weekly and period totals | Sum paid work minutes for the relevant shifts |

Do not classify time as overtime solely because someone worked longer than scheduled. Obtain overtime intervals from confirmed data or explicitly defined calculation rules. If late-arrival or early-departure grace periods are needed, add those rules explicitly.

Late, Early leave, and Overtime can apply simultaneously. Derive independent flags rather than losing information through a single status value. Define color and marker precedence for simultaneous flags in shared display rules.

### Applying Data to Cell Appearance

Pass Shift to WorkHoursCell and calculate position, dimensions, labels, and states through shared transformation functions. Do not store individual top, height, or background-color values in components or screen-specific data.

- The cell body references the existing work-cell tokens.
- Select regular, late, early-leave, and overtime Semantic tokens from the state flags. Do not store color codes or Tailwind class names in work data.
- Generate start and end labels from actual.
- If overtime intervals are drawn as time, calculate their tops and heights using the same 0.25px-per-minute scale and overlay them inside the cell.
- If unworked late-arrival or early-departure intervals are displayed, draw them in a separate scheduled-time layer without extending the cell outline.
- Apply paid/unpaid break status to summaries, while the cell outline represents elapsed time from actual clock-in to actual clock-out.
- Switching weeks changes only the selected week ID; update date columns, cells, and selection markers from the same data.
- Desktop, Tablet, and Mobile use the same work data and calculation functions.

### Aggregation and Display Precision

Do not manually enter and maintain duplicate workHours or weeklyTotal values for individual shifts. Calculate totals in integer minutes, then convert to hours and round to two decimal places for display. Do not sum already-rounded shift display values.

The reference data includes the following unpaid breaks, which, combined with the clock-in/out times above, explain the weekly totals:

- 2026-04-05: 16:15–17:15, 60 unpaid minutes.
- 2026-04-12: 16:15–17:15, 60 unpaid minutes.
- The other reference shifts have paid 15-minute breaks. Refer to payOverviewData.ts in the reference repository for each break's details.

In this case, Week1 totals 1001 minutes (16.6833… hours), Week2 totals 1020 minutes (17.00 hours), and the period total is 2021 minutes (33.6833… hours). Display these as 16.68, 17.00, and 33.68 hours respectively.

Treat the reference repository as sample data for the existing implementation. When replacing it with actual records, give those records precedence. Avoid double counting, such as the existing “8.5 hours + 0.5 overtime hours”; manage overtime as a subset of total paid hours.

Do not infer or generate payroll amounts from work hours alone. Reference confirmed payslip data separately. If payroll calculation is implemented, explicitly define regular rates, overtime rates, deductions, and rounding rules.

### Requirements When Updating Data

1. Changing actual clock-in/out times updates cell position, height, labels, details, and weekly totals from the same data.
2. Changing unpaid breaks updates paid-hours totals without changing the cell's clock-in/out positions.
3. Changing scheduled times recalculates Late/Early leave without changing actual clock-in/out positions.
4. Changing overtime intervals updates the overtime display and the regular/overtime breakdown without adding to total paid hours twice.
5. Changing a date moves the shift to the corresponding date column; changes across weeks also update the relevant summary totals.
6. After data updates, the shared 602px × 360px grid and presentation across devices remain consistent.
7. Validate invalid time ranges, overlapping breaks, and breaks or overtime intervals outside actual work at input time; do not silently include them in summaries.

# UKG Pro Redesign Design Guidelines

## Source
- Figma file: UKG Pro Redesign
- Figma page: Page 1
- Extracted at: 2026-10-22T05:49:15.357Z

## Variable Collections
- Semantic
- Primitive
- Components

## Color Tokens
- Semantic/color/status/regular: alias(VariableID:7fbc98eee58e195daba4e3c3c9a55cf0167183be/540:143)
- Semantic/color/border/secondary: alias(VariableID:a9cf4b8edc6ec441a2072712abb94edd83280b96/540:281)
- Primitive/Color/lime/700: #BCC000
- Components/toggle/bg: alias(VariableID:7fbc98eee58e195daba4e3c3c9a55cf0167183be/540:143)
- Semantic/color/text/primary: alias(VariableID:bc64e24f6b2c5b407383005b1a22b771bb148dbb/540:303)
- Semantic/color/icon/primary: alias(VariableID:61b45ad9372cde77face7bce8930d0b54e8a8dd1/540:148)
- Components/shift-card/bg: alias(VariableID:97a39eff687e9e1e6d37f6be68d44270058cad91/540:304)
- Semantic/color/status/late: alias(VariableID:30cf3980d7a0ed31285aa86cd54a1be2564662f9/540:180)
- Primitive/Color/accent/red: #FF828E
- Components/button/secondary/bg: alias(VariableID:b5da2e2c1b27083a8a5e4c967f55104a42e60c3e/545:435)
- Components/calendar/bg: alias(VariableID:ea67a83550038e90a260f22bec4fe8a7b9ac90e1/540:346)
- Components/chart/primary: alias(VariableID:f808b0c07fb61c04f50e103428352e705be48a00/540:145)
- Components/sidebar/bg: alias(VariableID:97a39eff687e9e1e6d37f6be68d44270058cad91/540:304)
- Primitive/Color/brand-teal/50: #EEFDFA
- Primitive/Color/accent/skyblue: #8DD7FF
- Semantic/color/text/subtle: alias(VariableID:67c96526807ed1d0a81e202af8daa0632b960b74/540:293)
- Components/sidebar/selected: alias(VariableID:9da2280f0a8f229f2f3762d3a6257587bee242e1/540:327)
- Components/button/secondary/text: alias(VariableID:c19c5e451ef55e2926377d16b06f1881bc42c1fc/540:214)
- Semantic/color/border/primary: alias(VariableID:a99bc44a0085a0e4a6c0515049e9a6d29e7f4c38/540:290)
- Components/toggle/hover: alias(VariableID:f0d8cd2d1ef4c53d9e8a0ce45da54ce519ab1a60/540:144)
- Semantic/color/text/secondary: alias(VariableID:ba9680a42e4ca659a17aa343908f10943212eaf8/540:297)
- Components/toggle/btn: alias(VariableID:b5da2e2c1b27083a8a5e4c967f55104a42e60c3e/545:435)
- Components/workspace/bg: alias(VariableID:ea67a83550038e90a260f22bec4fe8a7b9ac90e1/540:346)
- Components/chart/secondary: alias(VariableID:dfd5beacfe34be5a6d412085ad4e515cc62b4aa1/540:141)
- Primitive/Color/brand-teal/100: #CEF5F1
- Semantic/color/text/inverse: alias(VariableID:ebf6cb32fe66e2fc118b46179cc0200244e1e23b/540:151)
- Components/sidebar/hover: alias(VariableID:33726441fba534074bc52faab3ab0d16b6675023/540:288)
- Components/sidebar/text: alias(VariableID:c3a3a9448882f29bc7f33b7ac6fb635c41295c30/540:305)
- Primitive/Color/netral/0: #FFFFFF
- Components/work-cell/text: alias(VariableID:ebf6cb32fe66e2fc118b46179cc0200244e1e23b/540:151)
- Components/button/primary/text: alias(VariableID:212d618def4735b433d0d53c6c90ff598feba648/540:312)
- Primitive/Color/accent/darkyellow: #F0C059
- Primitive/Color/brand-teal/600: #009789
- Components/work-cell/bg: alias(VariableID:25a30eb37228e537dceac44fc240bcf2d5eda986/540:204)
- Components/button/primary/hover: alias(VariableID:3c52dcdd426a1cf762a3534b3c840408cb3abe27/540:334)
- Semantic/color/icon/inverse: alias(VariableID:ebf6cb32fe66e2fc118b46179cc0200244e1e23b/540:151)
- Components/button/primary/bg: alias(VariableID:9da2280f0a8f229f2f3762d3a6257587bee242e1/540:327)
- Semantic/color/status/overtime: alias(VariableID:83d23ebed784ed47164b13cca75ec9d57645f711/540:181)
- Primitive/Color/brand-teal/400*: #30CEBB
- Semantic/color/status/early-leave: alias(VariableID:46440568706275dbd82c751aaf8fe6003bfbcd7b/540:220)

## Typography Tokens
- No local text styles found.

## Spacing Tokens
- Semantic/spacing/3xs: alias(VariableID:1c9f3d2fb1a8dd7e0f895675c95bb296328b9df3/540:341)
- Semantic/spacing/s: alias(VariableID:1dd08da7bb919e6937444264429b05fe262ad922/541:417)
- Semantic/spacing/l: alias(VariableID:58c3aa2a1d3681e0c0460f0702b71a46893b54e6/540:111)
- Semantic/spacing/2xs: alias(VariableID:05c3493462cc6407993d4880597c9360da40e60f/540:108)
- Semantic/spacing/none: alias(VariableID:3e9bdbc10d3677333bafc3577fd1d0410bb913ec/540:107)
- Semantic/spacing/xl: alias(VariableID:1f9acf213d1738272a358e3a8dae76268720b866/540:112)
- Semantic/spacing/m: alias(VariableID:a350d9799d73fdaeae9f9aa134096d76dc0491bf/540:110)
- Semantic/spacing/xs: alias(VariableID:a43bc859407ce04bdc4638746b5c8c5b915a7392/540:109)
- Semantic/spacing/2xl: alias(Numbers/48)
- Semantic/spacing/3xl: alias(Numbers/64)
- Semantic/spacing/4xl: alias(Numbers/80)
- Semantic/spacing/5xl: alias(Numbers/120)

## Radius Tokens
- Semantic/radius/full: 999
- Semantic/radius/s: alias(VariableID:05c3493462cc6407993d4880597c9360da40e60f/540:108)
- Semantic/radius/m: alias(VariableID:a43bc859407ce04bdc4638746b5c8c5b915a7392/540:109)
- Semantic/radius/l: alias(Numbers/16)

## Motion Tokens
- No motion variables found.

## Effect Styles
- No local effect styles found.

## Grid Styles
- No local grid styles found.

## Component Families
- ShiftTimelineCard
- ShiftTimelineCardOptionC
- MenuBarBtn
- SidebarButtons
- ShiftCell
- WeekSummary
- PaydayBtn
- PayStatementsBtn
- PieChart
- WeekToggle
- Calendar
- StatusLump
- ShiftTimelineCardOptionB
- Button - Close side menu
- Button - Toggle side menu
- SideBar
- Property 1=Regular
- Property 1=Early leave
- Property 1=OT
- Property 1=Late
- Property 1=Default
- Property 1=Variant2
- Property 1=Variant3
- Property 1=active
- Property 1=hover
- Property 1=inactive
- Navigation item=Time
- Navigation item=Pay
- Navigation item=My profile
- Navigation item=Career & development
- Navigation item=Benefits
- Navigation item=Company
- Navigation item=Home
- Navigation item=Sign out
- Property 1=early-leave
- Property 1=week1
- Property 1=week2
- Property 1=Hover
- Property 1=default
- Property 1=week1-hover

## Editing Notes
- Refine this file after extraction to add brand context and rationale.
- Keep token names synchronized with Figma styles and variables.
- Add usage examples and anti-patterns for critical components.
