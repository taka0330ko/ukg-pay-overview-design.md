import { useState, type MouseEvent } from "react";
import { timePeriods, minutes } from "../../data/payOverviewData";

type Shift = (typeof timePeriods)[number]["shifts"][number];
type Props = {
  shift: Shift;
  segment?: { startMinute: number; endMinute: number; offsetMinute: number };
  onActivate?: (shift: Shift, event: MouseEvent<HTMLDivElement>) => void;
  onDeactivate?: () => void;
  onMove?: (event: MouseEvent<HTMLDivElement>) => void;
  topPadding?: number;
};

export default function WorkHoursCell({ shift, segment, onActivate, onDeactivate, onMove }: Props) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const start = minutes(shift.actual.clockIn);
  const end = minutes(shift.actual.clockOut);
  const late = start > minutes(shift.assigned.start);
  const early = end < minutes(shift.assigned.end);
  const overtime = shift.overtimeIntervals.length > 0;
  const status = late ? "late" : early ? "early-leave" : overtime ? "overtime" : "regular";
  // Figma's 8px bottom stripe is a status indicator, not a duration on the time axis.
  // Keep the entire outline inside the actual clock-in/out interval.
  const bottomStatus = early ? "early-leave" : overtime ? "overtime" : undefined;

  function updateCursor(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setCursorPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    onMove?.(event);
  }

  return (
    <div
      className={`work-cell${bottomStatus ? ` work-cell-${bottomStatus}` : ""}${late ? " work-cell-late" : ""}`}
      style={{
        top: (segment?.startMinute ?? start) / 4,
        height: ((segment?.endMinute ?? end) - (segment?.startMinute ?? start)) / 4,
      }}
      aria-label={`${shift.date} ${shift.actual.clockIn}-${shift.actual.clockOut}`}
      onMouseEnter={(event) => { onActivate?.(shift, event); updateCursor(event); }}
      onMouseMove={updateCursor}
      onMouseLeave={onDeactivate}
      onClick={(event) => { if (window.matchMedia("(max-width: 767px)").matches) onActivate?.(shift, event); }}
    >
      <div className="work-cell-body" aria-hidden="true" />
      <div className="work-cell-cursor" aria-hidden="true" style={{ left: cursorPosition.x, top: cursorPosition.y }} />
      <div className="shift-label">
        <i className={`status-${status}`} />
        <span>{shift.actual.clockIn}-{shift.actual.clockOut}</span>
      </div>
    </div>
  );
}
