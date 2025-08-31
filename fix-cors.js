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

async function fixCORS() {
  console.log('🔧 Fixing CORS Issues...\n');
  
  try {
    console.log('1️⃣ Testing current PocketBase connection...');
    const pb = new PocketBase('http://127.0.0.1:8090');
    
    // Test basic connection
    await pb.health.check();
    console.log('✅ PocketBase server is running\n');
    
    console.log('2️⃣ Testing admin authentication to access settings...');
    const email = await askQuestion('Admin email: ');
    const password = await askQuestion('Admin password: ');
    
    try {
      await pb.admins.authWithPassword(email, password);
      console.log('✅ Admin authentication successful\n');
      
      console.log('3️⃣ CORS Configuration Instructions:');
      console.log('=====================================');
      console.log('Since PocketBase doesn\'t expose CORS settings via API,');
      console.log('you need to configure it manually in the admin panel.\n');
      
      console.log('📋 Steps to fix CORS:');
      console.log('1. Open PocketBase admin panel: http://127.0.0.1:8090/_/');
      console.log('2. Log in with your admin credentials');
      console.log('3. Go to Settings → API Rules');
      console.log('4. In the CORS section, add these origins:');
      console.log('   - http://localhost:3000');
      console.log('   - http://127.0.0.1:3000');
      console.log('   - http://localhost:3001 (if using different port)');
      console.log('5. Save the settings');
      console.log('6. Restart PocketBase server\n');
      
      console.log('🔧 Alternative: Create a PocketBase config file');
      console.log('Create a file called "pb_config.json" in your pocketbase folder:');
      console.log(`
{
  "origins": [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001"
  ],
  "allowHeaders": ["*"],
  "allowMethods": ["*"],
  "allowCredentials": true
}
      `);
      
      console.log('Then restart PocketBase with:');
      console.log('pocketbase.exe serve --config=pb_config.json\n');
      
      console.log('4️⃣ Testing CORS after configuration...');
      console.log('After you\'ve configured CORS, run this test:');
      console.log('node test-cors.js\n');
      
    } catch (authError) {
      console.log('❌ Admin authentication failed:', authError.message);
      console.log('Please check your credentials and try again.');
    }
    
  } catch (error) {
    console.log('❌ Cannot connect to PocketBase:', error.message);
    console.log('Please ensure PocketBase is running at http://127.0.0.1:8090');
  } finally {
    rl.close();
  }
}

// Run the fix
fixCORS().catch(console.error); 