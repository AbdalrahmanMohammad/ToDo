const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

// express app
const app = express();

// register ejs view engine
app.set('view engine', 'ejs');

// listen for requests
app.listen(3000);

// middlewares & staic files
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// todos array
let todos = [
    // { id: 1, task: 'Buy groceries', description: 'Purchase vegetables and fruits', completed: false },
    // { id: 2, task: 'Clean the house', description: 'Vacuum and dust all rooms', completed: true },
    // { id: 3, task: 'Do homework', description: 'Complete math and science assignments', completed: false }
];


// main route
app.get('/', (req, res) => {
    res.render('index', { title: "To-Do" });
});

// redirect /main to / route
app.get('main', (req, res) => {
    res.redirect('/');
});

// api routes
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
    const { title, description = "", completed = false } = req.body;// completed default as flase, description as null and title is required

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = {
        id: uuidv4(),
        title,
        description,
        completed,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id == req.params.id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.put('/todos/:id', (req, res) => {
    const { title, description, completed } = req.body;

    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    // Update fields
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    // Update timestamp
    todo.updatedAt = new Date();

    res.json(todo);
});





// show 404 page for any other route
app.use((req, res) => {
    res.status(404).render('404', { title: "404" });
})
