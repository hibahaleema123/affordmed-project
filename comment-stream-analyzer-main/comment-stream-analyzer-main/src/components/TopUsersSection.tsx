
import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analyticsService";
import UserCard from "./UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TopUsersSection = () => {
  const { data: topUsers, isLoading, error } = useQuery({
    queryKey: ["topUsers"],
    queryFn: () => analyticsService.getTopUsers(5),
    staleTime: 60000, // 1 minute
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Top Users</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load top users. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Top Users</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topUsers?.map((userStats, index) => (
          <UserCard key={userStats.user.id} userStats={userStats} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default TopUsersSection;
