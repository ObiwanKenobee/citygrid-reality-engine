
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import UnitManager from "./pages/UnitManager";
import MaintenanceAI from "./pages/MaintenanceAI";
import Energy from "./pages/Energy";
import Tenants from "./pages/Tenants";
import Admin from "./pages/Admin";
import Simulation from "./pages/Simulation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/units" element={<UnitManager />} />
          <Route path="/maintenance" element={<MaintenanceAI />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/tenants" element={<Tenants />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/simulation" element={<Simulation />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
