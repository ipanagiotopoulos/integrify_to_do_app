const express = require('express')
const toDoController = require('../controllers/toDoController')
const {findToDos,insertToDo, updateToDo, deleteToDo } = toDoController

const todo_router = express.Router()


router.get('/todos', findToDos)
router.post('/todos', insertToDo)
router.put('/todos/:id', updateToDo)
router.delete('/todos/:id',deleteToDo)

module.exports = todo_router