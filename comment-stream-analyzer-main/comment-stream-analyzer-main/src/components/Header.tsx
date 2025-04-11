
import { Button } from "@/components/ui/button";
import { RefreshCw, BarChart2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Header = () => {
  const queryClient = useQueryClient();
  
  const handleRefresh = () => {
    toast.info("Refreshing data...");
    queryClient.invalidateQueries();
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Social Media Analytics</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>
    </header>
  );
};

export default Header;
