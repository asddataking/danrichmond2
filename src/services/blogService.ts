import { pb, COLLECTIONS, Post, Category, Tag, getImageUrl } from '../config/pocketbase';

// Posts API
export const blogService = {
  // Get all published posts
  async getPosts(): Promise<Post[]> {
    try {
      const records = await pb.collection(COLLECTIONS.POSTS).getList(1, 50, {
        filter: 'published = true',
        sort: '-created',
      });
      return records.items as unknown as Post[];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  // Get a single post by slug
  async getPostBySlug(slug: string): Promise<Post | null> {
    try {
      const record = await pb.collection(COLLECTIONS.POSTS).getFirstListItem(`slug = "${slug}" && published = true`);
      return record as unknown as Post;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  },

  // Get featured posts
  async getFeaturedPosts(): Promise<Post[]> {
    try {
      const records = await pb.collection(COLLECTIONS.POSTS).getList(1, 10, {
        filter: 'featured_post = true && published = true',
        sort: '-created',
      });
      return records.items as unknown as Post[];
    } catch (error) {
      console.error('Error fetching featured posts:', error);
      return [];
    }
  },

  // Get posts by category
  async getPostsByCategory(category: string): Promise<Post[]> {
    try {
      const records = await pb.collection(COLLECTIONS.POSTS).getList(1, 50, {
        filter: `category = "${category}" && published = true`,
        sort: '-created',
      });
      return records.items as unknown as Post[];
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }
  },

  // Create a new post
  async createPost(postData: Omit<Post, 'id' | 'created' | 'updated' | 'featured_image'> & { featured_image?: File }): Promise<Post | null> {
    try {
      // Prepare form data for file upload
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', postData.title);
      formData.append('excerpt', postData.excerpt);
      formData.append('content', postData.content);
      formData.append('slug', postData.slug);
      formData.append('category', postData.category);
      formData.append('tags', postData.tags);
      formData.append('featured_post', postData.featured_post.toString());
      formData.append('read_time', postData.read_time.toString());
      formData.append('published', postData.published.toString());
      
      // Add file if provided
      if (postData.featured_image) {
        formData.append('featured_image', postData.featured_image);
      }
      
      const record = await pb.collection(COLLECTIONS.POSTS).create(formData);
      return record as unknown as Post;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  },

  // Update a post
  async updatePost(id: string, postData: Partial<Post>): Promise<Post | null> {
    try {
      const record = await pb.collection(COLLECTIONS.POSTS).update(id, postData);
      return record as unknown as Post;
    } catch (error) {
      console.error('Error updating post:', error);
      return null;
    }
  },

  // Delete a post
  async deletePost(id: string): Promise<boolean> {
    try {
      await pb.collection(COLLECTIONS.POSTS).delete(id);
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  },
};

// Categories API
export const categoryService = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    try {
      const records = await pb.collection(COLLECTIONS.CATEGORIES).getList(1, 50, {
        sort: 'name',
      });
      return records.items as unknown as Category[];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    try {
      const record = await pb.collection(COLLECTIONS.CATEGORIES).getFirstListItem(`slug = "${slug}"`);
      return record as unknown as Category;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  },
};

// Tags API
export const tagService = {
  // Get all tags
  async getTags(): Promise<Tag[]> {
    try {
      const records = await pb.collection(COLLECTIONS.TAGS).getList(1, 100, {
        sort: 'name',
      });
      return records.items as unknown as Tag[];
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  },

  // Get tag by slug
  async getTagBySlug(slug: string): Promise<Tag | null> {
    try {
      const record = await pb.collection(COLLECTIONS.TAGS).getFirstListItem(`slug = "${slug}"`);
      return record as unknown as Tag;
    } catch (error) {
      console.error('Error fetching tag:', error);
      return null;
    }
  },
};

// Utility functions
export const blogUtils = {
  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  // Calculate read time from content
  calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  },

  // Get image URL for a post
  getPostImageUrl(post: Post): string | null {
    if (!post.featured_image) return null;
    return getImageUrl(COLLECTIONS.POSTS, post.id, post.featured_image);
  },
}; 