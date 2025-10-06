import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/auth/login" element={<Login />} />
              
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/sales" element={<ComingSoon title="ขายหน้าร้าน (POS)" description="ระบบขายหน้าร้านกำลังพัฒนา" />} />
                <Route path="/claims" element={<ComingSoon title="เคลม/ประกัน" description="ระบบจัดการเคลมและการรับประกันกำลังพัฒนา" />} />
                <Route path="/finance" element={<ComingSoon title="การเงิน" description="ระบบจัดการการเงินกำลังพัฒนา" />} />
                <Route path="/reports" element={<ComingSoon title="รายงาน" description="ระบบรายงานกำลังพัฒนา" />} />
                <Route path="/settings" element={<ComingSoon title="ตั้งค่า" description="ตั้งค่าระบบกำลังพัฒนา" />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
