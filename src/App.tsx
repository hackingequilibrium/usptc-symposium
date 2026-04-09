import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import Speakers from "./pages/Speakers.tsx";
import Agenda from "./pages/Agenda.tsx";
import Leadership from "./pages/Leadership.tsx";
import Partner from "./pages/Partner.tsx";
import Hotels from "./pages/Hotels.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/speakers" element={<Speakers />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/hotels" element={<Hotels />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
