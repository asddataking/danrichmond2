import PocketBase from 'pocketbase';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setupCompleteAuth() {
  try {
    console.log('🚀 Complete PocketBase Authentication Setup');
    console.log('==========================================\n');
    
    const pb = new PocketBase('http://127.0.0.1:8090');
    
    // Step 1: Check if PocketBase is running
    console.log('📡 Checking PocketBase connection...');
    try {
      await pb.health.check();
      console.log('✅ PocketBase is running at http://127.0.0.1:8090');
    } catch (error) {
      console.log('❌ PocketBase is not running!');
      console.log('Please start PocketBase first:');
      console.log('1. Go to the pocketbase folder');
      console.log('2. Run: pocketbase.exe serve');
      console.log('3. Or double-click start.bat');
      return;
    }
    
    // Step 2: Check if admin account exists
    console.log('\n🔐 Checking admin authentication...');
    const email = await askQuestion('Admin email: ');
    const password = await askQuestion('Admin password: ');
    
    try {
      const authData = await pb.admins.authWithPassword(email, password);
      console.log('✅ Authentication successful!');
      console.log(`Admin: ${authData.admin?.email || email}`);
      
      // Step 3: Create collections if they don't exist
      console.log('\n📚 Setting up collections...');
      
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
      
      // Step 4: Set up collection permissions
      console.log('\n🔐 Setting up collection permissions...');
      
      try {
        // Update posts collection permissions
        await pb.collections.update('posts', {
          options: {
            allowOAuth2Auth: false,
            allowUsernameAuth: false,
            allowEmailAuth: false,
            requireEmail: false,
            exceptEmailDomains: null,
            onlyEmailDomains: null,
            minPasswordLength: 8,
            onlyVerified: false,
            manageRule: null,
            createRule: null,
            updateRule: null,
            deleteRule: null,
            listRule: '@request.auth.id != "" || published = true',
            viewRule: '@request.auth.id != "" || published = true'
          }
        });
        console.log('✅ Posts collection permissions updated');
      } catch (error) {
        console.log('⚠️  Could not update posts permissions:', error.message);
      }
      
      // Step 5: Add sample data
      console.log('\n📝 Adding sample data...');
      
      try {
        // Add sample categories
        const sampleCategories = [
          { name: 'AI & Tech', slug: 'ai-tech', description: 'Artificial Intelligence and Technology' },
          { name: 'UFOs & Conspiracy', slug: 'ufos-conspiracy', description: 'UFO sightings and conspiracy theories' },
          { name: 'Simulation Theory', slug: 'simulation-theory', description: 'The simulation hypothesis' },
          { name: 'Digital Culture', slug: 'digital-culture', description: 'Modern digital culture and trends' }
        ];
        
        for (const category of sampleCategories) {
          try {
            await pb.collection('categories').create(category);
            console.log(`✅ Added category: ${category.name}`);
          } catch (error) {
            if (error.message.includes('already exists')) {
              console.log(`ℹ️  Category already exists: ${category.name}`);
            }
          }
        }
        
        // Add sample tags
        const sampleTags = [
          { name: 'AI', slug: 'ai' },
          { name: 'Technology', slug: 'technology' },
          { name: 'UFO', slug: 'ufo' },
          { name: 'Conspiracy', slug: 'conspiracy' },
          { name: 'Simulation', slug: 'simulation' },
          { name: 'Digital', slug: 'digital' }
        ];
        
        for (const tag of sampleTags) {
          try {
            await pb.collection('tags').create(tag);
            console.log(`✅ Added tag: ${tag.name}`);
          } catch (error) {
            if (error.message.includes('already exists')) {
              console.log(`ℹ️  Tag already exists: ${tag.name}`);
            }
          }
        }
        
        // Add sample post
        const samplePost = {
          title: 'Welcome to My Blog',
          excerpt: 'This is a sample blog post to test the system.',
          content: 'This is a sample blog post content. You can edit or delete this post from the admin panel.',
          slug: 'welcome-to-my-blog',
          category: 'AI & Tech',
          tags: 'AI,Technology',
          featured_post: true,
          read_time: 2,
          published: true
        };
        
        try {
          await pb.collection('posts').create(samplePost);
          console.log('✅ Added sample blog post');
        } catch (error) {
          if (error.message.includes('already exists')) {
            console.log('ℹ️  Sample post already exists');
          }
        }
        
      } catch (error) {
        console.log('⚠️  Could not add sample data:', error.message);
      }
      
      console.log('\n🎉 Setup complete!');
      console.log('==========================================');
      console.log('Your PocketBase authentication is now ready!');
      console.log('\nNext steps:');
      console.log('1. Start your React app: npm start');
      console.log('2. Click the "Admin" button in the navigation');
      console.log('3. Log in with your admin credentials');
      console.log('4. Create and manage your blog posts');
      console.log('\nAdmin Panel: http://127.0.0.1:8090/_/');
      console.log('React App: http://localhost:3000');
      
    } catch (authError) {
      console.log('❌ Authentication failed:', authError.message);
      console.log('\nPlease make sure you have:');
      console.log('1. Created an admin account at http://127.0.0.1:8090/_/');
      console.log('2. Used the correct email and password');
      console.log('3. PocketBase is running');
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    rl.close();
  }
}

setupCompleteAuth(); 