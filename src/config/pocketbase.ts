import PocketBase from 'pocketbase';

// Create PocketBase client instance
export const pb = new PocketBase('http://127.0.0.1:8090');

// Admin authentication function
export const authenticateAdmin = async (email: string, password: string) => {
  try {
    const authData = await pb.admins.authWithPassword(email, password);
    return authData;
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

// Check if admin is authenticated
export const isAdminAuthenticated = () => {
  return pb.authStore.isValid && pb.authStore.model?.type === 'admin';
};

// Logout admin
export const logoutAdmin = () => {
  pb.authStore.clear();
};

// Collection names
export const COLLECTIONS = {
  POSTS: 'posts',
  CATEGORIES: 'categories',
  TAGS: 'tags',
} as const;

// Types for our data
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  tags: string[];
  featured_image?: string;
  featured_post: boolean;
  read_time: number;
  published: boolean;
  created: string;
  updated: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created: string;
  updated: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created: string;
  updated: string;
}

// Helper function to get full URL for images
export const getImageUrl = (collectionId: string, recordId: string, fileName: string) => {
  return `http://127.0.0.1:8090/api/files/${collectionId}/${recordId}/${fileName}`;
}; 