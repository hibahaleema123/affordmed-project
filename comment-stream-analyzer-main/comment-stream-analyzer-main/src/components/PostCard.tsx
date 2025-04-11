
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock } from "lucide-react";
import { PostStats } from "@/services/analyticsService";

interface PostCardProps {
  postStats: PostStats;
  type: 'popular' | 'latest';
}

const PostCard = ({ postStats, type }: PostCardProps) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <img 
              src={postStats.user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${postStats.user?.name || 'Unknown'}`} 
              alt={postStats.user?.name || 'Unknown'}
            />
          </Avatar>
          <div>
            <h3 className="font-medium">{postStats.user?.name || 'Unknown User'}</h3>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(postStats.post.timestamp)}</span>
            </div>
          </div>
        </div>
        {type === 'popular' && (
          <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
            Popular
          </Badge>
        )}
        {type === 'latest' && (
          <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600">
            Latest
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <h4 className="text-lg font-semibold mb-2">{postStats.post.title}</h4>
        <p className="text-muted-foreground">{postStats.post.content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span>{postStats.commentCount} comments</span>
        </div>
        <Badge variant="outline" className="text-xs">
          Post ID: {postStats.post.id}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
