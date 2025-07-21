const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MongoDB URI is provided
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    console.log('🔌 Connecting to MongoDB...');
    console.log(`📍 URI: ${process.env.MONGODB_URI.replace(/\/\/.*@/, '//*****@')}`);

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // In development, show more details and suggestions
    if (process.env.NODE_ENV === 'development') {
      console.error('\n🔧 Troubleshooting Tips:');
      console.error('1. Check if your MongoDB Atlas connection string is correct');
      console.error('2. Ensure your IP address is whitelisted in MongoDB Atlas');
      console.error('3. Verify your database username and password');
      console.error('4. Make sure your cluster is running');
      console.error('\n📝 Example connection string:');
      console.error('mongodb+srv://username:password@cluster0.abcdef.mongodb.net/todoapp?retryWrites=true&w=majority');
      console.error('\n🔧 To set up MongoDB Atlas, run: npm run setup');
    }
    
    // Exit process with failure
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔒 MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error during MongoDB disconnect:', error);
    process.exit(1);
  }
});

module.exports = connectDB;
