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

async function createAdminAccount() {
  try {
    console.log('🔧 Creating PocketBase admin account...');
    console.log('Note: This will only work if no admin account exists yet.');
    console.log('If an admin account already exists, you will need to use the existing credentials.\n');
    
    const pb = new PocketBase('http://127.0.0.1:8090');
    
    console.log('📝 Please provide admin account details:');
    const email = await askQuestion('Admin email: ');
    const password = await askQuestion('Admin password: ');
    const passwordConfirm = await askQuestion('Confirm password: ');
    
    if (password !== passwordConfirm) {
      console.log('❌ Passwords do not match!');
      return;
    }
    
    try {
      // Try to create admin account
      const adminData = await pb.admins.create({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
      });
      
      console.log('✅ Admin account created successfully!');
      console.log('Admin ID:', adminData.id);
      console.log('Admin email:', adminData.email);
      
      console.log('\n🎉 You can now authenticate with these credentials.');
      console.log('Run the setup script again to create your collections.');
      
    } catch (createError) {
      console.log('❌ Failed to create admin account:', createError.message);
      console.log('\nThis might mean:');
      console.log('1. An admin account already exists');
      console.log('2. The email format is invalid');
      console.log('3. The password is too weak');
      console.log('4. You need to access the admin panel first');
      
      console.log('\nTry accessing http://127.0.0.1:8090/_/ in your browser');
      console.log('to see if an admin account already exists.');
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    rl.close();
  }
}

createAdminAccount(); 