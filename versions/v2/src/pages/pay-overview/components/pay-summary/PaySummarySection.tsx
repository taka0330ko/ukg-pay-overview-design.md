
import { paySummaries, totalPaidHours } from "../../data/payOverviewData";
import PieChart from "./PieChart";

function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");

  return `${month}/${day}/${year}`;
}

export default function PaySummarySection() {
  const paySummary = paySummaries[0];
  const summaryRows = [
    [
      "Pay period",
      `${formatDate(paySummary.period.start)} - ${formatDate(
        paySummary.period.end,
      )}`,
    ],
    ["Total hours", `${totalPaidHours.toFixed(2)} Hours`],
    ["Earnings", formatCurrency(paySummary.grossPay)],
    ["Deductions", formatCurrency(paySummary.deductions.total)],
  ];

  return (
    <section className="panel-card summary-card min-h-[520px] min-w-0">
      <h3 className="section-title">Pay Summary</h3>

      <PieChart
        deductions={paySummary.deductions.total}
        netPay={paySummary.netPay}
      />

      <div className="text-primary space-y-4 text-base">
        {summaryRows.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-6">
            <span>{label}</span>
            <span className="text-right">{value}</span>
          </div>
        ))}

        <div className="divider-primary border-t pt-4">
          <div className="flex items-center justify-between gap-6 font-bold">
            <span>Take home pay</span>
            <span>{formatCurrency(paySummary.netPay)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="button-primary inline-flex cursor-not-allowed items-center gap-4 rounded-full px-6 py-3 text-base font-medium"
        >
          <span className="relative flex size-8 shrink-0 items-center justify-center">
            <img src="/assets/pdf.svg" alt=""/>

          </span>
          <span>View Pay Statements PDF</span>
        </button>
      </div>
    </section>
  );
}
