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

async function setupAdminAuth() {
  try {
    console.log('🔧 Setting up PocketBase admin authentication...');
    
    const pb = new PocketBase('http://127.0.0.1:8090');
    
    console.log('\n📝 Please provide your admin credentials:');
    const email = await askQuestion('Admin email: ');
    const password = await askQuestion('Admin password: ');
    
    try {
      // Try to authenticate as admin
      const authData = await pb.admins.authWithPassword(email, password);
      console.log('✅ Authentication successful!');
      console.log('Admin ID:', authData.admin.id);
      console.log('Admin email:', authData.admin.email);
      
      // Test creating a simple collection to verify permissions
      console.log('\n🧪 Testing collection creation...');
      
      try {
        const testCollection = await pb.collections.create({
          name: 'test_auth',
          type: 'base',
          schema: [
            {
              name: 'test_field',
              type: 'text',
              required: true
            }
          ]
        });
        console.log('✅ Test collection created successfully!');
        
        // Clean up test collection
        await pb.collections.delete('test_auth');
        console.log('✅ Test collection cleaned up');
        
        console.log('\n🎉 Authentication and permissions are working correctly!');
        console.log('You can now run the main setup script to create your collections.');
        
      } catch (collectionError) {
        console.log('❌ Collection creation failed:', collectionError.message);
        console.log('This might indicate permission issues.');
      }
      
    } catch (authError) {
      console.log('❌ Authentication failed:', authError.message);
      console.log('\nPossible solutions:');
      console.log('1. Make sure PocketBase is running at http://127.0.0.1:8090');
      console.log('2. Check if you have created an admin account');
      console.log('3. Verify your email and password are correct');
      console.log('4. Try accessing the admin panel at http://127.0.0.1:8090/_/');
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    rl.close();
  }
}

setupAdminAuth(); 