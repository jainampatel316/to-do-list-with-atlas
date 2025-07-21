require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/database');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes

// GET - Display all tasks with filtering
app.get('/', async (req, res) => {
  try {
    const filter = req.query.filter || 'all';
    let query = {};

    // Apply filters
    if (filter === 'high') {
      query.priority = 'high';
    } else if (filter === 'urgent') {
      query.priority = 'urgent';
    } else if (filter === 'low') {
      query.priority = 'low';
    } else if (filter === 'completed') {
      query.completed = true;
    } else if (filter === 'pending') {
      query.completed = false;
    }

    // Fetch tasks from MongoDB
    const tasks = await Task.find(query).sort({ createdAt: -1 });
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ completed: true });

    res.render('index', { 
      tasks: tasks, 
      filter: filter,
      totalTodos: totalTasks,
      completedTodos: completedTasks,
      success: req.query.success,
      error: req.query.error
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).render('index', { 
      tasks: [], 
      filter: 'all',
      totalTodos: 0,
      completedTodos: 0,
      error: 'Failed to load tasks'
    });
  }
});

// POST - Add new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, priority } = req.body;
    
    // Validate input
    if (!title || title.trim() === '') {
      return res.redirect('/?error=empty');
    }

    // Create new task
    const newTask = new Task({
      title: title.trim(),
      priority: priority || 'low'
    });

    await newTask.save();
    res.redirect('/?success=created');
  } catch (error) {
    console.error('Error creating task:', error);
    res.redirect('/?error=creation_failed');
  }
});

// PUT - Update task (edit or toggle completion)
app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, priority, completed } = req.body;
    const updateData = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.redirect('/?error=empty');
      }
      updateData.title = title.trim();
    }
    
    if (priority !== undefined) {
      updateData.priority = priority;
    }
    
    if (completed !== undefined) {
      updateData.completed = completed === 'true';
    }

    updateData.updatedAt = new Date();

    await Task.findByIdAndUpdate(req.params.id, updateData);
    
    if (title !== undefined) {
      res.redirect('/?success=updated');
    } else {
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.redirect('/?error=update_failed');
  }
});

// DELETE - Delete task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/?success=deleted');
  } catch (error) {
    console.error('Error deleting task:', error);
    res.redirect('/?error=delete_failed');
  }
});

// DELETE - Clear all completed tasks
app.delete('/tasks/completed/all', async (req, res) => {
  try {
    const result = await Task.deleteMany({ completed: true });
    if (result.deletedCount > 0) {
      res.redirect(`/?success=cleared&count=${result.deletedCount}`);
    } else {
      res.redirect('/?error=no_completed');
    }
  } catch (error) {
    console.error('Error clearing completed tasks:', error);
    res.redirect('/?error=clear_failed');
  }
});

// API endpoint for AJAX requests
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks via API:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'MongoDB Atlas Connected'
  });
});

// Error handling middleware
app.use((req, res) => {
  res.status(404).render('404');
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Todo List server is running on port ${PORT}`);
  console.log(`🌍 Visit: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
