import { useState } from "react";
import TimeColumn from "./TimeColumn";
import { timePeriods, weeklySummaries } from "../../data/payOverviewData";
import TimeRow from "./TimeRow";
import WeekToggle from "./WeekToggle";

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${month}/${day}/${year}`;
}

function formatHours(hours: number) {
  return `${hours.toFixed(2)} hours`;
}

export default function HoursBreakdownSection() {
  const [selectedWeekId, setSelectedWeekId] = useState(timePeriods[0].id);
  const selectedPeriod =
    timePeriods.find((period) => period.id === selectedWeekId) ??
    timePeriods[0];
  const totalHours = weeklySummaries.reduce(
    (sum, summary) => sum + summary.totalHours,
    0,
  );

  return (
    <section className="panel-card calendar-card min-h-[520px] min-w-0">
      <div className="flex items-start justify-between">
        <h3 className="section-title">Hours breakdown</h3>
      </div>
      <div className="flex justify-center mt-2">
        <WeekToggle
          selectedWeekId={selectedWeekId}
          onChange={setSelectedWeekId}
        />
      </div>
      <figure className="calendar-body"><div className="time-axis"><TimeColumn/></div><div className="calendar-scroll"><TimeRow key={selectedPeriod.id} period={selectedPeriod}/></div></figure>

      <div className="text-primary mx-auto mt-4 w-full max-w-[720px] text-base">
        <div className="space-y-3">
          {timePeriods.map((period) => {
            const summary = weeklySummaries.find(
              (weeklySummary) => weeklySummary.weekId === period.id,
            );
            const isSelected = period.id === selectedWeekId;

            return (
              <div
                key={period.id}
                className="grid grid-cols-[1fr_auto] items-center gap-4"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`h-6 w-2 shrink-0 rounded-full ${
                      isSelected ? "week-marker-active" : "bg-transparent"
                    }`}
                  />
                  <span className="shrink-0">{period.label}</span>
                  <span className="text-secondary truncate">
                    {formatDate(period.range.start)} -{" "}
                    {formatDate(period.range.end)}
                  </span>
                </div>
                <span className="text-right">
                  {formatHours(summary?.totalHours ?? period.totalHours)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="divider-primary mt-2 border-t pt-5">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 font-bold">
            <span>Total hours</span>
            <span>{totalHours.toFixed(2)} Hours</span>
          </div>
        </div>
      </div>
    </section>
  );
}
