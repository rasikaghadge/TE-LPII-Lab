const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Define a schema for the data
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean
});

// Create a Todo model
const Todo = mongoose.model('Todo', todoSchema);

// Parse JSON request bodies
app.use(bodyParser.json());

// Define routes for CRUD operations
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Error retrieving todos', error);
    res.status(500).json({ error: 'Error retrieving todos' });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: false
    });
    await todo.save();
    console.log(todo)
    res.json(todo);
  } catch (error) {
    console.error('Error creating todo', error);
    res.status(500).json({ error: 'Error creating todo' });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo', error);
    res.status(500).json({ error: 'Error updating todo' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error('Error deleting todo', error);
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
