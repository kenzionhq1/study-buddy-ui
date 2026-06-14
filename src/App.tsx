import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ResultPage from "./pages/ResultPage";
import LibraryPage from "./pages/LibraryPage";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import CookieBanner from "./components/CookieBanner";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./components/AdminRoute";
import ScrollObserver from "./components/ScrollObserver";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Routes>
              {/* Public */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/legal/privacy" element={<PrivacyPage />} />
              <Route path="/legal/terms" element={<TermsPage />} />
              <Route path="/legal/cookies" element={<CookiesPage />} />

              {/* Auth-protected app */}
              <Route path="/app" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/app/result/:id" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
              <Route path="/app/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
              <Route path="/app/library" element={<ProtectedRoute><LibraryPage /></ProtectedRoute>} />
              <Route
                path="/app/admin"
                element={
                  <ProtectedRoute>
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <CookieBanner />
            <ScrollObserver />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
