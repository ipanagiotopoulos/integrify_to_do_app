const express = require('express')
const toDoController = require('../controllers/toDoController')
const {findToDos,insertToDo, updateToDo, deleteToDo } = toDoController

const todo_router = express.Router()


todo_router.get('/todos', findToDos)
todo_router.post('/todos', insertToDo)
todo_router.put('/todos/:id', updateToDo)
todo_router.delete('/todos/:id',deleteToDo)

module.exports = todo_router