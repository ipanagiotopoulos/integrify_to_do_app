//const bcrypt = require("bcrypt")
//const db = require("../db")




const findToDos = async (req, res) => {
    return res.status(501).send('HTTP.GET /api/v1/todos?status=[status] is not'+ 
    'implemented')
}


const insertToDo = async (req, res) => {
    return res.status(501).send('HTTP.POST /api/v1/todos is not implemented')
}

const updateToDo = async (req, res) => {
    return res.status(501).send('HTTP.UPDATE /api/v1/todos/:id is not implemented')
}

const deleteToDo = async (req, res) => {
    return res.status(501).send('HTTP.DELETE /api/v1/todos/:id is not implemented')
}


module.exports = {
    findToDos,
    insertToDo,
    updateToDo,
    deleteToDo
}











































//findToDos, insertToDo, updateToDo, deleteToDo