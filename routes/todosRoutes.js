const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todoController');

router.get('/', todosController.getAllTodos);

router.get('/:id', todosController.getTodoById);

router.post('/', todosController.validateAdding(), todosController.createTodo);

router.put('/:id', todosController.validateUpdating(), todosController.updateTodo);

router.delete('/:id', todosController.deleteTodo);

module.exports = {
    router,
    todos: todosController.todos
};