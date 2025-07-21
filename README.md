# Todo List Atlas 📝

A dynamic and responsive Todo List web application built with EJS (Embedded JavaScript), Express.js, Node.js, and MongoDB Atlas. This application provides users with an intuitive interface to efficiently manage their daily tasks with persistent data storage.

## � Live Demo

**Deploy Link**: [https://to-do-list-with-atlas.onrender.com](https://to-do-list-with-atlas.onrender.com)

## �🌟 Features

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
- 📱 **Responsive Alerts**: Context-aware success and error messages

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud NoSQL Database)
- **ODM**: Mongoose for MongoDB object modeling
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: CSS3 with Flexbox and Grid
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)
- **HTTP Methods**: GET, POST, PUT, DELETE (RESTful API)

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

## 🎯 HTTP Methods Implementation

The application implements RESTful HTTP methods:

- **GET /**: Display all tasks with optional filtering
- **POST /tasks**: Create a new task
- **PUT /tasks/:id**: Update an existing task (edit or toggle completion)
- **DELETE /tasks/:id**: Delete a specific task
- **DELETE /tasks/completed/all**: Clear all completed tasks

## 📱 Responsive Design

The application works seamlessly across all device sizes:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up) 
- 💻 Desktop computers (1024px and up)
- 🖥️ Large screens (1200px and up)

### 📺 Deployment Tutorial
For detailed deployment instructions, watch this helpful video:
[Deploy Node.js App to Render](https://youtu.be/tNpoc86cHrQ?si=EeMCQBl7YO2bWrdE)

### Environment Variables for Render

When deploying to Render, add these environment variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=production
```

## 🎯 HTTP Methods Implementation

The application correctly implements RESTful HTTP methods:

- **GET /**: Display all tasks with optional filtering
- **POST /tasks**: Create a new task
- **PUT /tasks/:id**: Update an existing task (edit or toggle completion)
- **DELETE /tasks/:id**: Delete a specific task
- **DELETE /tasks/completed/all**: Clear all completed tasks
- **DELETE /tasks/completed/all**: Clear all completed tasks

## 🗄️ MongoDB Atlas Integration

### Connection Features
- **Cloud Database**: Secure connection to MongoDB Atlas
- **Error Handling**: Comprehensive database error management
- **Connection Monitoring**: Real-time connection status
- **Graceful Shutdown**: Proper database disconnection

### Data Validation
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

### Visual Feedback
- Priority-based color coding (Orange for Urgent, Red for High, Green for Low)
- Smooth hover effects and transitions
- Real-time statistics updates
- Pencil icon for edit functionality
- Trash icon for delete functionality

---

**Built with ❤️ using EJS, Express.js, MongoDB Atlas, and modern web technologies**
2. Create a new issue with detailed information
3. Contact the development team

---

**Built with ❤️ using EJS, Express.js, and modern web technologies**
