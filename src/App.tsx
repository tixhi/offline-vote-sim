import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BlockchainProvider } from "@/contexts/BlockchainContext";
import { VoterLogin } from "@/components/VoterLogin";
import { Navigation } from "@/components/Navigation";
import { useBlockchain } from "@/contexts/BlockchainContext";
import Voting from "./pages/Voting";
import Blockchain from "./pages/Blockchain";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { currentVoter } = useBlockchain();

  if (!currentVoter) {
    return <VoterLogin />;
  }

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Voting />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/results" element={<Results />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BlockchainProvider>
          <AppContent />
        </BlockchainProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
