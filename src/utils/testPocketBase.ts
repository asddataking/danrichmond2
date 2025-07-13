import { pb } from '../config/pocketbase';

export const testPocketBaseConnection = async () => {
  try {
    console.log('Testing PocketBase connection...');
    
    // Test basic connection
    const healthCheck = await pb.health.check();
    console.log('✅ PocketBase is running:', healthCheck);
    
    // Test collections
    const collections = await pb.collections.getFullList();
    console.log('📚 Available collections:', collections.map(c => c.name));
    
    // Test posts collection specifically
    try {
      const posts = await pb.collection('posts').getList(1, 1);
      console.log('✅ Posts collection is accessible');
      console.log('📝 Total posts:', posts.totalItems);
    } catch (error) {
      console.log('❌ Posts collection not found or not accessible');
      console.log('Make sure you have created the "posts" collection in PocketBase');
    }
    
    return true;
  } catch (error) {
    console.error('❌ PocketBase connection failed:', error);
    return false;
  }
}; 