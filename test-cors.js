import PocketBase from 'pocketbase';

async function testCORS() {
  console.log('🧪 Testing CORS Configuration...\n');
  
  const pb = new PocketBase('http://127.0.0.1:8090');
  
  try {
    console.log('1️⃣ Testing basic health check...');
    await pb.health.check();
    console.log('✅ PocketBase server is reachable\n');
    
    console.log('2️⃣ Testing admin authentication (this will fail if CORS is not configured)...');
    
    // This should work if CORS is properly configured
    try {
      const authData = await pb.admins.authWithPassword('test@example.com', 'wrongpassword');
      console.log('❌ Unexpected: Authentication succeeded with wrong credentials');
    } catch (authError) {
      if (authError.message && authError.message.includes('CORS')) {
        console.log('❌ CORS Error detected:', authError.message);
        console.log('\n🔧 CORS is not properly configured!');
        console.log('Please follow the CORS setup instructions.');
      } else if (authError.status === 401) {
        console.log('✅ CORS is working! (Got expected 401 error for wrong credentials)');
        console.log('The request reached PocketBase successfully.');
      } else {
        console.log('⚠️  Unexpected error:', authError.message);
      }
    }
    
    console.log('\n3️⃣ Testing from browser context...');
    console.log('Open your browser console and run this test:');
    console.log(`
fetch('http://127.0.0.1:8090/api/health', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => console.log('✅ CORS working:', data))
.catch(error => console.log('❌ CORS error:', error));
    `);
    
  } catch (error) {
    console.log('❌ Server connection failed:', error.message);
  }
}

// Run the test
testCORS().catch(console.error); 