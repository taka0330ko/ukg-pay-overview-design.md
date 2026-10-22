import { timePeriods, minutes } from "../../data/payOverviewData";
import { overtimeMinutes, paidMinutes } from "../../data/shiftMath";

type Shift = (typeof timePeriods)[number]["shifts"][number];

export default function WorkHoursCard({ shift }: { shift: Shift }) {
  const late = minutes(shift.actual.clockIn) > minutes(shift.assigned.start);
  const early = minutes(shift.actual.clockOut) < minutes(shift.assigned.end);
  const overtime = shift.overtimeIntervals.length > 0;
  const startStatus = late ? "late" : "regular";
  const endStatus = early ? "early-leave" : overtime ? "overtime" : "regular";
  const otMinutes = overtimeMinutes(shift.record);
  const formatHours = (value: number) => Number((value / 60).toFixed(2)).toString();

  return (
    <article className="shift-card">
      <div className="timeline-entries">
      <div className="timeline-event">
        <i className={`status-${startStatus}`} />
        <div className="timeline-time">
          {late && <small className="timeline-status timeline-status-late">Late</small>}
          <strong>{shift.actual.clockIn}</strong>
        </div>
        <span>Clock in <img src="/assets/clock-in.svg" alt="" /></span>
      </div>
      {shift.breaks.map((item) => (
        <div className="timeline-break" key={item.start}>
          <i className="status-regular" />
          <div>
            <p>{item.start}<span>Start {item.paid ? "Paid" : "Unpaid"} break</span></p>
            <p>{item.end}<span>End {item.paid ? "Paid" : "Unpaid"} break</span></p>
          </div>
        </div>
      ))}
      <div className="timeline-event">
        <i className={`status-${endStatus}`} />
        <div className="timeline-time">
          {early && <small className="timeline-status timeline-status-early-leave">Early Leave</small>}
          {overtime && <small className={`timeline-status timeline-status-overtime${early ? " timeline-status-secondary" : ""}`}>Overtime</small>}
          <strong>{shift.actual.clockOut}</strong>
        </div>
        <span>Clock out <img src="/assets/clock-out.svg" alt="" /></span>
      </div>
      </div>
      <footer className="timeline-summary">
        <p>Assigned time:<span>{shift.assigned.start} ~ {shift.assigned.end}</span></p>
        <p>Total hours:<span>{otMinutes > 0
          ? `${formatHours(paidMinutes(shift.record) - otMinutes)} + ${formatHours(otMinutes)} h`
          : `${shift.workHours.toFixed(2)}h`}</span></p>
      </footer>
    </article>
  );
}
