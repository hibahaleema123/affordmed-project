
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserStats } from "@/services/analyticsService";

interface UserCardProps {
  userStats: UserStats;
  rank: number;
}

const UserCard = ({ userStats, rank }: UserCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="h-8 w-8 rounded-full p-0 flex items-center justify-center text-sm font-bold">
            {rank}
          </Badge>
          <Avatar className="h-10 w-10">
            <img 
              src={userStats.user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${userStats.user.name}`} 
              alt={userStats.user.name}
            />
          </Avatar>
          <h3 className="font-medium text-lg">{userStats.user.name}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-2 py-1">
            {userStats.commentedPostsCount} commented posts
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
