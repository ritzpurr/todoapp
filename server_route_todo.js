const express = require('express')
const router = express.Router()
const todoController = require('../controller/todo')
const todo = require('../models/todo')

router.put('/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', todoController.getAllTodos )

router.post('/', todoController.createTodo )

router.patch('/:id', todoController.updateTodo)

router.delete('/:id', todoController.deleteTodo)

module.exports = router;
