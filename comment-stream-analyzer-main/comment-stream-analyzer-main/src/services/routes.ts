
import { analyticsService } from "./analyticsService";

// This file simulates the HTTP endpoints that would be implemented in a real backend
// For the purposes of this project, we're using client-side data handling

// GET /users - Returns the top 5 users with the most commented posts
async function getTopUsers(req: any, res: any) {
  try {
    const topUsers = await analyticsService.getTopUsers(5);
    return topUsers;
  } catch (error) {
    console.error('Error in /users endpoint:', error);
    throw error;
  }
}

// GET /posts?type=popular|latest - Returns posts based on type
async function getPosts(req: any, res: any) {
  try {
    const type = req.query?.type || 'popular';
    
    if (type === 'popular') {
      return await analyticsService.getPopularPosts();
    } else if (type === 'latest') {
      return await analyticsService.getLatestPosts(5);
    } else {
      throw new Error('Invalid post type. Use "popular" or "latest".');
    }
  } catch (error) {
    console.error('Error in /posts endpoint:', error);
    throw error;
  }
}

export const routes = {
  getTopUsers,
  getPosts
};
