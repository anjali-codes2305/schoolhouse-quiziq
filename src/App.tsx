
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./components/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Auth from "./pages/Auth";
import CreateQuiz from "./pages/CreateQuiz";
import StudentAccess from "./pages/StudentAccess";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import AdminDashboard from "./pages/AdminDashboard";
import DemoQuiz from "./pages/DemoQuiz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/create-quiz" element={<CreateQuiz />} />
              <Route path="/student-access" element={<StudentAccess />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/results" element={<Results />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/demo-quiz" element={<DemoQuiz />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
