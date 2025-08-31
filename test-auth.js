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

async function testAuthentication() {
  console.log('🔍 Testing PocketBase Authentication...\n');
  
  const pb = new PocketBase('http://127.0.0.1:8090');
  
  try {
    // Test 1: Check if PocketBase is running
    console.log('1️⃣ Testing server connection...');
    await pb.health.check();
    console.log('✅ PocketBase server is running and accessible\n');
    
    // Test 2: Check if admin account exists
    console.log('2️⃣ Testing admin authentication...');
    console.log('Please enter your admin credentials:');
    
    const testEmail = await askQuestion('Admin email: ');
    const testPassword = await askQuestion('Admin password: ');
    
    console.log(`\nTesting with email: ${testEmail}`);
    
    try {
      const authData = await pb.admins.authWithPassword(testEmail, testPassword);
      console.log('✅ Admin authentication successful!');
      
      // Safely access auth data
      if (authData && authData.admin) {
        console.log('Admin ID:', authData.admin.id);
        console.log('Admin email:', authData.admin.email);
      } else {
        console.log('Admin data structure:', JSON.stringify(authData, null, 2));
      }
      
      console.log('Token:', authData.token ? 'Present' : 'Missing');
      
      // Test 3: Check if authenticated
      console.log('\n3️⃣ Testing authentication state...');
      const isAuthenticated = pb.authStore.isValid && pb.authStore.model?.type === 'admin';
      console.log('Is authenticated:', isAuthenticated);
      console.log('Auth store valid:', pb.authStore.isValid);
      console.log('Model type:', pb.authStore.model?.type);
      console.log('Auth store model:', pb.authStore.model);
      
      // Test 4: Check collections
      console.log('\n4️⃣ Testing collections...');
      try {
        const collections = await pb.collections.getFullList();
        console.log('Available collections:', collections.map(c => c.name));
      } catch (collectionsError) {
        console.log('❌ Could not fetch collections:', collectionsError.message);
      }
      
    } catch (authError) {
      console.log('❌ Admin authentication failed');
      console.log('Error:', authError.message);
      console.log('Full error:', authError);
      console.log('\nPossible solutions:');
      console.log('1. Check your email and password');
      console.log('2. Go to http://127.0.0.1:8090/_/ to verify your admin account');
      console.log('3. Reset your password if needed');
    }
    
  } catch (error) {
    console.log('❌ Server connection failed');
    console.log('Error:', error.message);
    console.log('\nPlease ensure:');
    console.log('1. PocketBase is running at http://127.0.0.1:8090');
    console.log('2. No firewall is blocking the connection');
    console.log('3. The port 8090 is not in use by another process');
  } finally {
    rl.close();
  }
}

// Run the test
testAuthentication().catch(console.error); 