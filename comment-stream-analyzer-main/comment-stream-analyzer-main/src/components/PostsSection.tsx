
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/services/analyticsService";
import PostCard from "./PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const PostsSection = () => {
  const [activeTab, setActiveTab] = useState<"popular" | "latest">("popular");

  const popularPostsQuery = useQuery({
    queryKey: ["popularPosts"],
    queryFn: () => analyticsService.getPopularPosts(),
    staleTime: 60000, // 1 minute
  });

  const latestPostsQuery = useQuery({
    queryKey: ["latestPosts"],
    queryFn: () => analyticsService.getLatestPosts(5),
    staleTime: 30000, // 30 seconds for latest posts (more frequent updates)
  });

  const isLoading = activeTab === "popular" ? popularPostsQuery.isLoading : latestPostsQuery.isLoading;
  const error = activeTab === "popular" ? popularPostsQuery.error : latestPostsQuery.error;
  const data = activeTab === "popular" ? popularPostsQuery.data : latestPostsQuery.data;

  const renderSkeletons = () => (
    <div className="space-y-4">
      {Array.from({ length: activeTab === "popular" ? 3 : 5 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <Skeleton className="h-24 w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Posts</h2>
      
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "popular" | "latest")} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="latest">Latest</TabsTrigger>
        </TabsList>
        
        <TabsContent value="popular" className="space-y-4 mt-4">
          {popularPostsQuery.isLoading && renderSkeletons()}
          
          {popularPostsQuery.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to load popular posts. Please try again later.
              </AlertDescription>
            </Alert>
          )}
          
          {popularPostsQuery.data && popularPostsQuery.data.length > 0 && (
            <div className="space-y-4">
              {popularPostsQuery.data.map((postStats) => (
                <PostCard key={postStats.post.id} postStats={postStats} type="popular" />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="latest" className="space-y-4 mt-4">
          {latestPostsQuery.isLoading && renderSkeletons()}
          
          {latestPostsQuery.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to load latest posts. Please try again later.
              </AlertDescription>
            </Alert>
          )}
          
          {latestPostsQuery.data && latestPostsQuery.data.length > 0 && (
            <div className="space-y-4">
              {latestPostsQuery.data.map((postStats) => (
                <PostCard key={postStats.post.id} postStats={postStats} type="latest" />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostsSection;
