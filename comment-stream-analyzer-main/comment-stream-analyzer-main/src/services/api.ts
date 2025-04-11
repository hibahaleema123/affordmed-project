
interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  timestamp: number;
  commentCount: number;
}

interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  timestamp: number;
}

// Simulated API endpoints for the social media platform
// In a real implementation, this would point to the actual test server API
const API_BASE_URL = 'http://hostname';

// Cache implementation to reduce API calls
class ApiCache {
  private cache: Map<string, { data: any, timestamp: number }> = new Map();
  private CACHE_TTL = 60000; // Cache TTL in milliseconds (1 minute)

  get(key: string): any | null {
    const cachedItem = this.cache.get(key);
    if (cachedItem && (Date.now() - cachedItem.timestamp) < this.CACHE_TTL) {
      return cachedItem.data;
    }
    return null;
  }

  set(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  clear(): void {
    this.cache.clear();
  }

  invalidate(key: string): void {
    this.cache.delete(key);
  }
}

const cache = new ApiCache();

// Simulated API client
const apiClient = {
  async fetchUsers(): Promise<User[]> {
    const cachedData = cache.get('users');
    if (cachedData) return cachedData;
    
    try {
      // In a real implementation, this would be a fetch call to the actual API
      // const response = await fetch(`${API_BASE_URL}/users`);
      // const data = await response.json();
      
      // For demo purposes, we're returning mock data
      const mockUsers: User[] = [
        { id: "u1", name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "u2", name: "Bob Smith", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "u3", name: "Charlie Brown", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: "u4", name: "Diana Prince", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: "u5", name: "Edward Cullen", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: "u6", name: "Fiona Apple", avatar: "https://i.pravatar.cc/150?img=6" },
        { id: "u7", name: "George Lucas", avatar: "https://i.pravatar.cc/150?img=7" },
      ];

      cache.set('users', mockUsers);
      return mockUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async fetchPosts(): Promise<Post[]> {
    const cachedData = cache.get('posts');
    if (cachedData) return cachedData;
    
    try {
      // In a real implementation, this would be a fetch call to the actual API
      // const response = await fetch(`${API_BASE_URL}/posts`);
      // const data = await response.json();
      
      // For demo purposes, we're returning mock data
      const mockPosts: Post[] = [
        { id: "p1", userId: "u1", title: "First Post", content: "This is my first post!", timestamp: Date.now() - 1000000, commentCount: 5 },
        { id: "p2", userId: "u2", title: "Hello World", content: "Hello to everyone out there!", timestamp: Date.now() - 800000, commentCount: 3 },
        { id: "p3", userId: "u1", title: "Another Post", content: "This is another post from me.", timestamp: Date.now() - 600000, commentCount: 7 },
        { id: "p4", userId: "u3", title: "My Thoughts", content: "Just sharing my thoughts.", timestamp: Date.now() - 400000, commentCount: 2 },
        { id: "p5", userId: "u4", title: "Important News", content: "Check out this important update!", timestamp: Date.now() - 200000, commentCount: 8 },
        { id: "p6", userId: "u2", title: "Random Stuff", content: "Just some random thoughts.", timestamp: Date.now() - 100000, commentCount: 1 },
        { id: "p7", userId: "u5", title: "Latest Update", content: "Here's my latest update.", timestamp: Date.now(), commentCount: 0 },
        { id: "p8", userId: "u1", title: "Third Post", content: "This is my third post!", timestamp: Date.now() - 50000, commentCount: 4 },
        { id: "p9", userId: "u3", title: "Random Thoughts", content: "More random thoughts.", timestamp: Date.now() - 150000, commentCount: 8 },
        { id: "p10", userId: "u4", title: "Weekend Plans", content: "Sharing my weekend plans.", timestamp: Date.now() - 250000, commentCount: 6 },
      ];

      cache.set('posts', mockPosts);
      return mockPosts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async fetchComments(): Promise<Comment[]> {
    const cachedData = cache.get('comments');
    if (cachedData) return cachedData;
    
    try {
      // In a real implementation, this would be a fetch call to the actual API
      // const response = await fetch(`${API_BASE_URL}/comments`);
      // const data = await response.json();
      
      // For demo purposes, we're returning mock data
      const mockComments: Comment[] = Array.from({ length: 40 }, (_, i) => {
        const postId = `p${Math.floor(Math.random() * 10) + 1}`;
        const userId = `u${Math.floor(Math.random() * 5) + 1}`;
        return {
          id: `c${i + 1}`,
          postId,
          userId,
          content: `This is comment ${i + 1} on post ${postId} by user ${userId}`,
          timestamp: Date.now() - Math.floor(Math.random() * 1000000)
        };
      });

      cache.set('comments', mockComments);
      return mockComments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }
};

export type { User, Post, Comment };
export { apiClient };
