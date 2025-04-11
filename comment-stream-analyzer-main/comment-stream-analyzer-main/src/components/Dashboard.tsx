
import TopUsersSection from "./TopUsersSection";
import PostsSection from "./PostsSection";
import { Separator } from "@/components/ui/separator";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <TopUsersSection />
      <Separator className="my-8" />
      <PostsSection />
    </div>
  );
};

export default Dashboard;
