const express = require('express');
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

//In-memory data storage: Create an array to store tasks
let tasks = [];

// Create (POST) route:
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required.' });
    }

    const task = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
    };

    tasks.push(task);
    res.status(201).json(task);
});

//Read (GET) route:
//Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//Get a single task by ID
app.get('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found.' });

    res.json(task);
});


//Update (PUT) route:
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ error: 'Task not found.' });

    const { title, description, completed } = req.body;

    if (title) task.title = title;
    if (description) task.description = description;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
});


//Delete (DELETE) route:
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).json({ error: 'Task not found.' });

    tasks.splice(taskIndex, 1);
    res.status(204).send();
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
