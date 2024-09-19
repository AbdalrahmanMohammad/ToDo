const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');

let todos = [
    { id: uuidv4(), title: 'Buy groceries', description: 'Purchase vegetables and fruits', completed: false, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), title: 'Clean the house', description: 'Vacuum and dust all rooms', completed: true, createdAt: new Date(), updatedAt: new Date() },
    { id: uuidv4(), title: 'Do homework', description: 'Complete math and science assignments', completed: false, createdAt: new Date(), updatedAt: new Date() }
];

const getAllTodos = (req, res) => {
    res.status(200).json(todos);
};

const getTodoById = (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
};

const createTodo = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description = "", completed = false } = req.body;

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
};

const updateTodo = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
};

const deleteTodo = (req, res) => {
    const index = todos.findIndex(t => t.id == req.params.id);
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
};

const validateAdding = () => [
    body('title').isString().withMessage('Title must be a string').notEmpty().withMessage('Title is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
];

const validateUpdating = () => [
    body('title').optional().isString().withMessage('Title must be a string').notEmpty().withMessage('title cannot be empty'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
];

module.exports = {
    todos,
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
    validateUpdating,
    validateAdding
};
