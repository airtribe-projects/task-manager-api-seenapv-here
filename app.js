const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

const tasksFilePath = path.join(__dirname, 'task.json');

// Utility function to read tasks
const readTasksFromFile = () => {
  const data = fs.readFileSync(tasksFilePath, 'utf-8');
  return JSON.parse(data);
};

// Utility function to write tasks
const writeTasksToFile = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
};

// Create a new task
app.post('/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    
     // Validate required fields
     if (!req.body.title || typeof req.body.title !== 'string' || !req.body.description || typeof req.body.description !== 'string' ) {
        return res.status(400).json({ error: "Title is required and must be a string." });
    }
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
});

// Read all tasks
app.get('/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});
  
// Read a task by ID
app.get('/tasks/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
});

// Update a task by ID
app.put('/tasks/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });
    if (typeof req.body.title !== 'string' || typeof req.body.description !== 'string' || typeof req.body.completed !== 'boolean') 
        return res.status(400).json({ error: "Title is required and must be a string." });
  
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasksToFile(tasks);
    res.json(tasks[taskIndex]);
});

// Delete a task by ID
app.delete('/tasks/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const updatedTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    if (tasks.length === updatedTasks.length) return res.status(404).json({ message: 'Task not found' });
  
    writeTasksToFile(updatedTasks);
    res.status(200).send();
});

//Error Handling

//Handle invalid routes:
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

//Handle other errors:
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
