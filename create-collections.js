import PocketBase from 'pocketbase';

// Replace these with your actual admin credentials
const ADMIN_EMAIL = 'your-admin-email@example.com';
const ADMIN_PASSWORD = 'your-admin-password';

async function createCollections() {
  try {
    console.log('🔧 Creating PocketBase collections...');
    
    const pb = new PocketBase('http://127.0.0.1:8090');
    
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    const authData = await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Authentication successful!');
    
    console.log('\n📚 Creating collections...');
    
    // Create Posts collection
    try {
      const postsCollection = await pb.collections.create({
        name: 'posts',
        type: 'base',
        schema: [
          {
            name: 'title',
            type: 'text',
            required: true,
            options: { min: 1, max: 200 }
          },
          {
            name: 'excerpt',
            type: 'text',
            options: { max: 500 }
          },
          {
            name: 'content',
            type: 'text',
            options: { max: 100000 }
          },
          {
            name: 'slug',
            type: 'text',
            required: true,
            options: { unique: true, max: 200 }
          },
          {
            name: 'category',
            type: 'text',
            options: { max: 100 }
          },
          {
            name: 'tags',
            type: 'text',
            options: { max: 500 }
          },
          {
            name: 'featured_image',
            type: 'file',
            options: { maxSelect: 1, maxSize: 5242880, mimeTypes: ['image/jpeg', 'image/png', 'image/webp'] }
          },
          {
            name: 'featured_post',
            type: 'bool',
            options: { defaultValue: false }
          },
          {
            name: 'read_time',
            type: 'number',
            options: { min: 1, max: 1000 }
          },
          {
            name: 'published',
            type: 'bool',
            options: { defaultValue: false }
          }
        ]
      });
      console.log('✅ Posts collection created');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Posts collection already exists');
      } else {
        console.log('❌ Error creating posts collection:', error.message);
      }
    }
    
    // Create Categories collection
    try {
      const categoriesCollection = await pb.collections.create({
        name: 'categories',
        type: 'base',
        schema: [
          {
            name: 'name',
            type: 'text',
            required: true,
            options: { min: 1, max: 100 }
          },
          {
            name: 'slug',
            type: 'text',
            required: true,
            options: { unique: true, max: 100 }
          },
          {
            name: 'description',
            type: 'text',
            options: { max: 500 }
          }
        ]
      });
      console.log('✅ Categories collection created');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Categories collection already exists');
      } else {
        console.log('❌ Error creating categories collection:', error.message);
      }
    }
    
    // Create Tags collection
    try {
      const tagsCollection = await pb.collections.create({
        name: 'tags',
        type: 'base',
        schema: [
          {
            name: 'name',
            type: 'text',
            required: true,
            options: { min: 1, max: 100 }
          },
          {
            name: 'slug',
            type: 'text',
            required: true,
            options: { unique: true, max: 100 }
          }
        ]
      });
      console.log('✅ Tags collection created');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Tags collection already exists');
      } else {
        console.log('❌ Error creating tags collection:', error.message);
      }
    }
    
    console.log('\n🎉 All collections created successfully!');
    console.log('You can now use your React app with these collections.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\nPlease make sure:');
    console.log('1. PocketBase is running at http://127.0.0.1:8090');
    console.log('2. You have updated the ADMIN_EMAIL and ADMIN_PASSWORD in this script');
    console.log('3. Your admin credentials are correct');
  }
}

createCollections(); 