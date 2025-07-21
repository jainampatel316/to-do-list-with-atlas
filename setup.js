#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Todo List Atlas - MongoDB Setup\n');
console.log('This script will help you configure your MongoDB connection.\n');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function validateConnectionString(uri) {
  if (!uri) return false;
  if (uri.includes('mongodb+srv://') || uri.includes('mongodb://')) {
    return true;
  }
  return false;
}

async function setup() {
  try {
    console.log('📋 Choose your MongoDB setup:\n');
    console.log('1. MongoDB Atlas (Cloud) - Recommended');
    console.log('2. Local MongoDB (Development only)');
    console.log('3. Skip setup (manual configuration)\n');

    const choice = await question('Enter your choice (1-3): ');

    let mongoUri = '';

    switch (choice) {
      case '1':
        console.log('\n📡 MongoDB Atlas Setup');
        console.log('Please follow these steps:');
        console.log('1. Go to https://www.mongodb.com/atlas');
        console.log('2. Create account and cluster');
        console.log('3. Set up database user and network access');
        console.log('4. Get your connection string\n');
        
        mongoUri = await question('Paste your MongoDB Atlas connection string: ');
        
        if (!validateConnectionString(mongoUri)) {
          console.log('❌ Invalid connection string format');
          console.log('Example: mongodb+srv://username:password@cluster0.abcdef.mongodb.net/todoapp');
          process.exit(1);
        }
        break;

      case '2':
        console.log('\n💻 Local MongoDB Setup');
        console.log('Make sure MongoDB is installed and running locally');
        mongoUri = 'mongodb://localhost:27017/todoapp';
        break;

      case '3':
        console.log('\n⚙️ Manual setup selected');
        console.log('Please edit the .env file manually with your MongoDB connection string');
        process.exit(0);

      default:
        console.log('❌ Invalid choice');
        process.exit(1);
    }

    const nodeEnv = await question('Environment (development/production) [development]: ') || 'development';
    const port = await question('Port number [3000]: ') || '3000';

    const envContent = `# MongoDB Configuration
MONGODB_URI=${mongoUri}
NODE_ENV=${nodeEnv}
PORT=${port}

# Generated on ${new Date().toISOString()}
# Do not commit this file to version control
`;

    fs.writeFileSync('.env', envContent);
    
    console.log('\n✅ Configuration saved to .env file!');
    console.log('\n🔧 Next steps:');
    console.log('1. Test connection: npm start');
    console.log('2. Open browser: http://localhost:' + port);
    console.log('3. Check SETUP.md for troubleshooting');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup();
