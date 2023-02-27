const express = require('express')
const toDoController = require('../controllers/toDoController')
const { toDoPostValidate } = require('../validators/todos/PostToDoItemValidator')
const { updateToDoValidate } = require('../validators/todos/UpdateToDoItemValidator')
const { deleteToDoValidate } = require('../validators/todos/DeleteToDoItemValidator')
const { getToDoValidate } = require('../validators/todos/GetToDoItemValidator')
const {checkIfLoggedIn} = require('../middleware/userAuth')
const {findToDos,insertToDo, updateToDo, deleteToDo } = toDoController

const todo_router = express.Router()

todo_router.get('/todos',checkIfLoggedIn,getToDoValidate, findToDos)
todo_router.post('/todos',checkIfLoggedIn, toDoPostValidate,insertToDo)
todo_router.put('/todos/:id',checkIfLoggedIn,updateToDoValidate,updateToDo)
todo_router.delete('/todos/:id',checkIfLoggedIn, deleteToDoValidate, deleteToDo)

module.exports = todo_router