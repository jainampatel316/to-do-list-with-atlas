# 🚀 Quick Setup Guide - Todo List Atlas

## Option 1: MongoDB Atlas (Recommended for Production)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)

### Step 2: Configure Database Access
1. Go to "Database Access" in your Atlas dashboard
2. Add a new database user
3. Choose "Password" authentication
4. Set username and password (remember these!)
5. Grant "Read and write to any database" permissions

### Step 3: Configure Network Access
1. Go to "Network Access" in your Atlas dashboard
2. Click "Add IP Address"
3. For development: Click "Allow access from anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses

### Step 4: Get Connection String
1. Go to "Clusters" in your Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `todoapp`

Example connection string:
```
mongodb+srv://myusername:mypassword@cluster0.abcdef.mongodb.net/todoapp?retryWrites=true&w=majority
```

### Step 5: Configure Application
Run the setup script:
```bash
npm run setup
```

Or manually edit the `.env` file:
```
MONGODB_URI=your_connection_string_here
NODE_ENV=development
PORT=3000
```

## Option 2: Local MongoDB (For Development Only)

### Install MongoDB Locally
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service
3. Use this connection string in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/todoapp
```

## Quick Test

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run setup (for Atlas only):**
   ```bash
   npm run setup
   ```

3. **Start the application:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Troubleshooting

### Common Error: "ENOTFOUND"
- ❌ Your connection string is incorrect
- ✅ Copy the exact connection string from MongoDB Atlas
- ✅ Replace `<password>` with your actual password
- ✅ Replace `<dbname>` with `todoapp`

### Common Error: "Authentication failed"
- ❌ Wrong username or password
- ✅ Check your database user credentials in Atlas
- ✅ Make sure you're using the database user (not your Atlas login)

### Common Error: "IP not whitelisted"
- ❌ Your IP address is not allowed
- ✅ Add your IP to Network Access in Atlas
- ✅ Or temporarily allow all IPs (0.0.0.0/0) for testing
