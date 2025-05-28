import { Routes, Route, BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import ClientsPage from "./pages/ClientsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import AdminPanel from "./pages/AdminPanel";
import ProceduresPage from "./pages/ProceduresPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import StaffPage from "./pages/StaffPage";
import NotFound from "./pages/NotFound";
import IntegrationsPage from "./pages/IntegrationsPage";
import ProductsPage from "./pages/ProductsPage";
import InventoryPage from "./pages/InventoryPage";
import ReportsPage from "./pages/ReportsPage";
import SuppliersPage from "./pages/SuppliersPage";
import BranchesPage from "./pages/BranchesPage"; // Add the new page
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientProcedurePage from "./pages/client/ClientProcedurePage";
import SpecialistDashboard from "./pages/specialist/SpecialistDashboard";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BranchProvider } from "./contexts/BranchContext"; // Add the new context
import { TooltipsProvider } from "./contexts/TooltipsContext";
import { TooltipProvider } from "./components/ui/tooltip";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <BranchProvider>
        <TooltipsProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/procedures" element={<ProceduresPage />} />
                <Route path="/book-appointment" element={<BookAppointmentPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/integrations" element={<IntegrationsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/suppliers" element={<SuppliersPage />} />
                <Route path="/branches" element={<BranchesPage />} /> {/* Add the new route */}
                <Route path="/client/dashboard" element={<ClientDashboard />} />
                <Route path="/client/procedure/:id" element={<ClientProcedurePage />} />
                <Route path="/specialist/dashboard" element={<SpecialistDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </TooltipsProvider>
      </BranchProvider>
    </ThemeProvider>
  );
}

export default App;
