import PayOverviewHeader from './components/PayOverviewHeader';
import PaySummarySection from './components/pay-summary/PaySummarySection';
import HoursBreakdownSection from './components/hours-breakdown/HoursBreakdownSection';
export function PayOverviewPage(){return <div className="pay-page"><PayOverviewHeader/><div className="pay-panels"><PaySummarySection/><HoursBreakdownSection/></div></div>}
