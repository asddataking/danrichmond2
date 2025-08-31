import PocketBase from 'pocketbase';

// Create PocketBase client instance with better configuration
export const pb = new PocketBase('http://127.0.0.1:8090');

// Configure PocketBase for better error handling and CORS
pb.beforeSend = function(url, options) {
  // Add CORS headers and proper content type
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  };
  
  // Add credentials for cross-origin requests
  options.credentials = 'include';
  
  console.log('🌐 Making request to:', url);
  console.log('Request headers:', options.headers);
  
  return { url, options };
};

// Admin authentication function with detailed error handling
export const authenticateAdmin = async (email: string, password: string) => {
  try {
    console.log('🔐 Attempting admin authentication...');
    console.log('Email:', email);
    console.log('Password length:', password.length);
    
    // First check if PocketBase is reachable
    try {
      await pb.health.check();
      console.log('✅ PocketBase server is reachable');
    } catch (healthError) {
      console.error('❌ PocketBase server is not reachable:', healthError);
      throw new Error('Cannot connect to PocketBase server. Please ensure it is running at http://127.0.0.1:8090');
    }

    // Attempt authentication
    console.log('🔄 Sending authentication request...');
    const authData = await pb.admins.authWithPassword(email, password);
    console.log('✅ Admin authentication successful');
    console.log('Auth data structure:', authData);
    console.log('Auth store after login:', {
      isValid: pb.authStore.isValid,
      model: pb.authStore.model,
      token: pb.authStore.token ? 'Present' : 'Missing'
    });
    return authData;
  } catch (error: any) {
    console.error('❌ Authentication error:', error);
    console.error('Error details:', {
      status: error.status,
      message: error.message,
      data: error.data,
      url: error.url
    });
    
    // Check for CORS errors specifically
    if (error.message && error.message.includes('CORS')) {
      throw new Error('CORS error: PocketBase server is not configured to allow requests from this origin. Please check PocketBase CORS settings.');
    }
    
    // Provide specific error messages based on error type
    if (error.status === 400) {
      throw new Error('Invalid email or password format');
    } else if (error.status === 401) {
      throw new Error('Invalid email or password');
    } else if (error.status === 403) {
      throw new Error('Access denied. Please check your credentials');
    } else if (error.status === 404) {
      throw new Error('Admin account not found');
    } else if (error.status === 0 || error.status === undefined) {
      throw new Error('Network error. Please check your connection to PocketBase');
    } else {
      throw new Error(`Authentication failed: ${error.message || 'Unknown error'}`);
    }
  }
};

// Check if admin is authenticated with better validation
export const isAdminAuthenticated = () => {
  try {
    const isValid = pb.authStore.isValid;
    const isAdmin = pb.authStore.model?.type === 'admin';
    console.log('🔍 Auth check - Valid:', isValid, 'Admin:', isAdmin);
    console.log('Auth store details:', {
      isValid,
      model: pb.authStore.model,
      token: pb.authStore.token ? 'Present' : 'Missing'
    });
    return isValid && isAdmin;
  } catch (error) {
    console.error('❌ Error checking authentication:', error);
    return false;
  }
};

// Logout admin with cleanup
export const logoutAdmin = () => {
  try {
    pb.authStore.clear();
    console.log('✅ Admin logged out successfully');
  } catch (error) {
    console.error('❌ Error during logout:', error);
  }
};

// Test connection to PocketBase
export const testPocketBaseConnection = async () => {
  try {
    await pb.health.check();
    return { success: true, message: 'PocketBase is running and accessible' };
  } catch (error) {
    return { 
      success: false, 
      message: 'Cannot connect to PocketBase. Please ensure it is running at http://127.0.0.1:8090' 
    };
  }
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
  tags: string;
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