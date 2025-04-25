
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TestPage from "./pages/TestPage";
import PracticePage from "./pages/PracticePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import DailyTestPage from "./pages/DailyTestPage";
import CustomTestPage from "./pages/CustomTestPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PlaceholderPage from "./pages/PlaceholderPage";
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
          <Route path="/test" element={<TestPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/daily-test" element={<DailyTestPage />} />
          <Route path="/custom-test" element={<CustomTestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Placeholder pages for other routes */}
          <Route path="/profile" element={<PlaceholderPage />} />
          <Route path="/history" element={<PlaceholderPage />} />
          <Route path="/settings" element={<PlaceholderPage />} />
          <Route path="/help" element={<PlaceholderPage />} />
          <Route path="/privacy" element={<PlaceholderPage />} />
          <Route path="/terms" element={<PlaceholderPage />} />
          <Route path="/result" element={<PlaceholderPage />} />
          <Route path="/notifications" element={<PlaceholderPage />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
