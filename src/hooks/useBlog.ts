import { useState, useEffect, useCallback } from 'react';
import { blogService, categoryService, tagService, blogUtils } from '../services/blogService';
import { Post, Category, Tag } from '../config/pocketbase';

export const useBlog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPosts = await blogService.getPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const fetchedCategories = await categoryService.getCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  // Fetch tags
  const fetchTags = useCallback(async () => {
    try {
      const fetchedTags = await tagService.getTags();
      setTags(fetchedTags);
    } catch (err) {
      console.error('Error fetching tags:', err);
    }
  }, []);

  // Get featured posts
  const getFeaturedPosts = useCallback(async () => {
    try {
      const featuredPosts = await blogService.getFeaturedPosts();
      return featuredPosts;
    } catch (err) {
      console.error('Error fetching featured posts:', err);
      return [];
    }
  }, []);

  // Get posts by category
  const getPostsByCategory = useCallback(async (category: string) => {
    try {
      const categoryPosts = await blogService.getPostsByCategory(category);
      return categoryPosts;
    } catch (err) {
      console.error('Error fetching posts by category:', err);
      return [];
    }
  }, []);

  // Create a new post
  const createPost = useCallback(async (postData: {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string;
    featured_image?: File;
    featured_post?: boolean;
    published?: boolean;
  }) => {
    try {
      const slug = blogUtils.generateSlug(postData.title);
      const readTime = blogUtils.calculateReadTime(postData.content);

      const { featured_image, ...rest } = postData;
      const newPost = await blogService.createPost({
        ...rest,
        slug,
        read_time: readTime,
        featured_post: postData.featured_post || false,
        published: postData.published !== false, // Default to true
        featured_image, // Pass the File separately for upload
      });

      if (newPost) {
        // Refresh posts list
        await fetchPosts();
        return newPost;
      }
      return null;
    } catch (err) {
      setError('Failed to create post');
      console.error('Error creating post:', err);
      return null;
    }
  }, [fetchPosts]);

  // Update a post
  const updatePost = useCallback(async (id: string, postData: Partial<Post>) => {
    try {
      const updatedPost = await blogService.updatePost(id, postData);
      if (updatedPost) {
        // Refresh posts list
        await fetchPosts();
        return updatedPost;
      }
      return null;
    } catch (err) {
      setError('Failed to update post');
      console.error('Error updating post:', err);
      return null;
    }
  }, [fetchPosts]);

  // Delete a post
  const deletePost = useCallback(async (id: string) => {
    try {
      const success = await blogService.deletePost(id);
      if (success) {
        // Refresh posts list
        await fetchPosts();
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to delete post');
      console.error('Error deleting post:', err);
      return false;
    }
  }, [fetchPosts]);

  // Get a single post by slug
  const getPostBySlug = useCallback(async (slug: string) => {
    try {
      const post = await blogService.getPostBySlug(slug);
      return post;
    } catch (err) {
      console.error('Error fetching post:', err);
      return null;
    }
  }, []);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([
        fetchPosts(),
        fetchCategories(),
        fetchTags(),
      ]);
    };

    initializeData();
  }, [fetchPosts, fetchCategories, fetchTags]);

  return {
    // State
    posts,
    categories,
    tags,
    loading,
    error,
    
    // Actions
    fetchPosts,
    fetchCategories,
    fetchTags,
    getFeaturedPosts,
    getPostsByCategory,
    createPost,
    updatePost,
    deletePost,
    getPostBySlug,
    
    // Utils
    generateSlug: blogUtils.generateSlug,
    calculateReadTime: blogUtils.calculateReadTime,
    getPostImageUrl: blogUtils.getPostImageUrl,
  };
}; 