import { SideMenuProvider } from "./contexts/SideMenuProvider";
import { AppLayout } from "./layouts/AppLayout";
import { PayOverviewPage } from "./pages/pay-overview";

function App() {
  return (
    <SideMenuProvider>
      <AppLayout>
        <PayOverviewPage/>
      </AppLayout>
    </SideMenuProvider>
  );
}

export default App;
