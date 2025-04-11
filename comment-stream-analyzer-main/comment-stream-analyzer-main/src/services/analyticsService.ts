
import { apiClient, User, Post, Comment } from './api';

interface UserStats {
  user: User;
  commentedPostsCount: number;
}

interface PostStats {
  post: Post;
  commentCount: number;
  user?: User;
}

class AnalyticsService {
  private userCache = new Map<string, User>();
  
  async getTopUsers(limit: number = 5): Promise<UserStats[]> {
    try {
      const [users, posts, comments] = await Promise.all([
        this.getAllUsers(),
        this.getAllPosts(),
        this.getAllComments()
      ]);
      
      // Store users in cache for quick lookup
      users.forEach(user => this.userCache.set(user.id, user));
      
      // Count commented posts per user
      const userPostComments = new Map<string, Set<string>>();
      
      comments.forEach(comment => {
        if (!userPostComments.has(comment.userId)) {
          userPostComments.set(comment.userId, new Set());
        }
        userPostComments.get(comment.userId)!.add(comment.postId);
      });
      
      // Create user stats
      const userStats: UserStats[] = users.map(user => ({
        user,
        commentedPostsCount: userPostComments.get(user.id)?.size || 0
      }));
      
      // Sort by most commented posts and take top limit
      return userStats
        .sort((a, b) => b.commentedPostsCount - a.commentedPostsCount)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting top users:', error);
      throw error;
    }
  }
  
  async getPopularPosts(): Promise<PostStats[]> {
    try {
      const [posts, users] = await Promise.all([
        this.getAllPosts(),
        this.getAllUsers()
      ]);
      
      users.forEach(user => this.userCache.set(user.id, user));
      
      const postStats: PostStats[] = posts.map(post => ({
        post,
        commentCount: post.commentCount,
        user: this.userCache.get(post.userId)
      }));
      
      // Find the maximum comment count
      const maxCommentCount = Math.max(...postStats.map(stats => stats.commentCount));
      
      // Filter posts with the maximum comment count
      return postStats
        .filter(stats => stats.commentCount === maxCommentCount)
        .sort((a, b) => b.post.timestamp - a.post.timestamp);
    } catch (error) {
      console.error('Error getting popular posts:', error);
      throw error;
    }
  }
  
  async getLatestPosts(limit: number = 5): Promise<PostStats[]> {
    try {
      const [posts, users] = await Promise.all([
        this.getAllPosts(),
        this.getAllUsers()
      ]);
      
      users.forEach(user => this.userCache.set(user.id, user));
      
      const postStats: PostStats[] = posts.map(post => ({
        post,
        commentCount: post.commentCount,
        user: this.userCache.get(post.userId)
      }));
      
      // Sort by timestamp (newest first) and take top limit
      return postStats
        .sort((a, b) => b.post.timestamp - a.post.timestamp)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting latest posts:', error);
      throw error;
    }
  }
  
  private async getAllUsers(): Promise<User[]> {
    return await apiClient.fetchUsers();
  }
  
  private async getAllPosts(): Promise<Post[]> {
    return await apiClient.fetchPosts();
  }
  
  private async getAllComments(): Promise<Comment[]> {
    return await apiClient.fetchComments();
  }
}

const analyticsService = new AnalyticsService();

export { analyticsService };
export type { UserStats, PostStats };
