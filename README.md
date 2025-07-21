# Todo List Atlas 📝

A dynamic and responsive Todo List web application built with EJS (Embedded JavaScript), Express.js, Node.js, and MongoDB Atlas. This application provides users with an intuitive interface to efficiently manage their daily tasks with persistent data storage.

## 🌟 Features

### User Interface
- ✨ **Modern Design**: Clean and responsive interface with smooth animations
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- 🎨 **Priority-based Color Coding**: Visual distinction for Low, Urgent, and High priorities
- 🔍 **Advanced Filtering**: Filter tasks by status and priority levels
- 📊 **Real-time Statistics**: Track total and completed tasks
- 🚨 **Smart Alerts**: Success and error notifications for all actions

### Core Functionality
- ➕ **Add Tasks**: Create new tasks with title and priority levels (Low, Urgent, High)
- ✏️ **Edit Tasks**: Modify existing tasks with an intuitive modal using pencil icon
- ✅ **Mark Complete**: Toggle task completion status
- 🗑️ **Delete Tasks**: Remove individual tasks using trash icon with confirmation
- 🧹 **Clear Completed**: Remove all completed tasks at once
- 🚨 **Form Validation**: Prevents empty task creation with comprehensive alerts

### Advanced Features
- 🎯 **Priority Levels**: Low, Urgent, and High priority options
- 🔄 **Dynamic Updates**: Real-time interface updates using EJS templates
- 💾 **Persistent Storage**: All data stored in MongoDB Atlas cloud database
- ⌨️ **Keyboard Shortcuts**: Quick actions with keyboard commands
- 🎭 **Smooth Animations**: Enhanced user experience with CSS animations
- 📱 **Responsive Alerts**: Context-aware success and error messages

## 🌐 Live Demo

**Deploy Link**: [https://to-do-list-with-atlas.onrender.com](https://to-do-list-with-atlas.onrender.com)

*✅ Application is now live and deployed on Render!*

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud NoSQL Database)
- **ODM**: Mongoose for MongoDB object modeling
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: CSS3 with Flexbox and Grid
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)
- **HTTP Methods**: GET, POST, PUT, DELETE (RESTful API)
- **Environment**: dotenv for configuration management

## 📊 Database Structure

### MongoDB Atlas Collection: `tasks`

Each task document contains:
```javascript
{
  _id: ObjectId,
  title: String (required, 1-200 characters),
  priority: String (enum: ["low", "urgent", "high"]),
  completed: Boolean (default: false),
  createdAt: Date (default: Date.now),
  updatedAt: Date (auto-updated)
}
```

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB Atlas account

### MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Watch this tutorial: [MongoDB Atlas Setup](https://youtu.be/QyYMvdFwBKA?si=5KHrrSO4VSZZus0F)

2. **Create a Cluster**
   - Create a new cluster (free tier available)
   - Set up database access (username/password)
   - Configure network access (allow your IP or 0.0.0.0/0 for development)

3. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd todo-list-atlas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your MongoDB Atlas connection string
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.abc123.mongodb.net/todoapp?retryWrites=true&w=majority
   NODE_ENV=development
   PORT=3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌐 Deployment to Render

### Step-by-Step Deployment Guide

1. **Prepare your code**
   - Ensure all files are committed to your Git repository
   - Verify `package.json` has the correct start script

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up or log in with your GitHub account

3. **Deploy the Application**
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
   - Configure the deployment:
     - **Name**: `todo-list-atlas`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Auto-Deploy**: `Yes`

4. **Environment Variables** (if needed)
   - `NODE_ENV`: `production`
   - `PORT`: (Render will set this automatically)

5. **Deploy**
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Your app will be available at `https://your-app-name.onrender.com`

### 📺 Deployment Tutorial
For detailed deployment instructions, watch this helpful video:
[Deploy Node.js App to Render](https://youtu.be/tNpoc86cHrQ?si=EeMCQBl7YO2bWrdE)

### Environment Variables for Render

When deploying to Render, add these environment variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=production
```

## 📁 Project Structure

```
todo-list-atlas/
├── config/
│   └── database.js            # MongoDB connection configuration
├── models/
│   └── Task.js                # Mongoose Task model
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   └── js/
│       └── script.js          # Client-side JavaScript
├── views/
│   ├── index.ejs              # Main todo list page
│   └── 404.ejs                # Error page
├── .env                       # Environment variables (not in repo)
├── .env.example               # Example environment file
├── index.js                   # Main server file
├── package.json               # Project dependencies
└── README.md                  # Project documentation
```

## 🎯 HTTP Methods Implementation

The application correctly implements RESTful HTTP methods:

- **GET /**: Display all tasks with optional filtering
- **POST /tasks**: Create a new task
- **PUT /tasks/:id**: Update an existing task (edit or toggle completion)
- **DELETE /tasks/:id**: Delete a specific task
- **DELETE /tasks/completed/all**: Clear all completed tasks

## 🗄️ MongoDB Atlas Integration

### Connection Features
- **Cloud Database**: Secure connection to MongoDB Atlas
- **Error Handling**: Comprehensive database error management
- **Connection Monitoring**: Real-time connection status
- **Graceful Shutdown**: Proper database disconnection

### Data Validation
- **Schema Validation**: Mongoose schema with built-in validation
- **Required Fields**: Title is mandatory
- **Data Types**: Proper type enforcement
- **Enumerated Values**: Priority limited to specific values

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- 📱 **Mobile devices** (320px and up)
- 📱 **Tablets** (768px and up)
- 💻 **Desktop computers** (1024px and up)
- 🖥️ **Large screens** (1200px and up)

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + N`: Focus on new task input
- `Enter`: Submit the current form
- `Escape`: Close modal dialogs

## 🧪 Features Demonstration

### Task Management
- Add tasks with different priority levels (Low, Urgent, High)
- Edit existing tasks through an intuitive modal with pencil icon
- Mark tasks as complete/incomplete
- Delete individual tasks with trash icon and confirmation
- Clear all completed tasks with bulk action

### Filtering System
- **All**: View all tasks
- **Pending**: View incomplete tasks
- **Completed**: View finished tasks
- **Urgent Priority**: View urgent tasks
- **High Priority**: View high-priority tasks
- **Low Priority**: View low-priority tasks

### Alert System
- **Success Alerts**: Task created, updated, deleted successfully
- **Error Alerts**: Empty input, database errors, validation failures
- **Confirmation Dialogs**: Before deleting tasks
- **Auto-dismiss**: Alerts automatically disappear after 5 seconds

### Visual Feedback
- Priority-based color coding (Orange for Urgent, Red for High, Green for Low)
- Smooth hover effects and transitions
- Loading states for actions
- Real-time statistics updates
- Pencil icon for edit functionality
- Trash icon for delete functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Font Awesome for beautiful icons
- Google Fonts for typography
- Render for hosting platform
- Express.js and EJS communities

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ using EJS, Express.js, and modern web technologies**
