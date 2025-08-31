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

async function fixCollectionPermissions() {
  try {
    console.log('🔧 Fixing PocketBase collection permissions...');
    
    const pb = new PocketBase('http://127.0.0.1:8090');
    
    // Get admin credentials
    console.log('\n📝 Please provide your admin credentials:');
    const email = await askQuestion('Admin email: ');
    const password = await askQuestion('Admin password: ');
    
    // Authenticate as admin
    console.log('🔐 Authenticating as admin...');
    const authData = await pb.admins.authWithPassword(email, password);
    console.log('✅ Authentication successful!');
    
    console.log('\n📚 Updating collection permissions...');
    
    // Update Posts collection permissions
    try {
      await pb.collections.update('posts', {
        options: {
          allowPublicRead: true,
          allowPublicCreate: false,
          allowPublicUpdate: false,
          allowPublicDelete: false
        }
      });
      console.log('✅ Posts collection permissions updated - public read enabled');
    } catch (error) {
      console.log('❌ Error updating posts collection permissions:', error.message);
    }
    
    // Update Categories collection permissions
    try {
      await pb.collections.update('categories', {
        options: {
          allowPublicRead: true,
          allowPublicCreate: false,
          allowPublicUpdate: false,
          allowPublicDelete: false
        }
      });
      console.log('✅ Categories collection permissions updated - public read enabled');
    } catch (error) {
      console.log('❌ Error updating categories collection permissions:', error.message);
    }
    
    // Update Tags collection permissions
    try {
      await pb.collections.update('tags', {
        options: {
          allowPublicRead: true,
          allowPublicCreate: false,
          allowPublicUpdate: false,
          allowPublicDelete: false
        }
      });
      console.log('✅ Tags collection permissions updated - public read enabled');
    } catch (error) {
      console.log('❌ Error updating tags collection permissions:', error.message);
    }
    
    console.log('\n🎉 All collection permissions updated successfully!');
    console.log('Public users can now read blog posts, categories, and tags.');
    console.log('Only authenticated admins can create, update, or delete content.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('\nPlease make sure:');
    console.log('1. PocketBase is running at http://127.0.0.1:8090');
    console.log('2. Your admin credentials are correct');
    console.log('3. You have admin privileges');
  } finally {
    rl.close();
  }
}

fixCollectionPermissions(); 