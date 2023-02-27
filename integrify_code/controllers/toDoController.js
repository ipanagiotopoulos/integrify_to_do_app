const { toDoAppDb } = require('../db/dbConnection')

const ToDo = toDoAppDb.toDos

const findToDos = async (req, res) => {
    try {
        const data = {
            userId: req.id,
        }
        if (req.query.status) data.status=req.query.status
        var toDoItems = await ToDo.findAll({
            where:data
        })
        res.status(200).send({items:toDoItems})
    }
    catch (err) {
       console.log(err)
       res.status(500).send({message:'Server error', error:'Something went worng, please try again later'})
    }
}

const insertToDo = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            description: req.body.description,
            userId: req.id,
            status: req.body.status
        }
        const todoItem = await ToDo.create(data)
        if (!todoItem) return res.status(500).send({message:'Server error', error:'Something went worng, please try again later'})
        return res.status(201).send({message:'success', data:todoItem})
    } catch (error) {
        res.status(500).send({message:'Server error', error:'Something went worng, please try again later'})
    }
}

const updateToDo = async (req, res) => {
    try {
        const data = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            userId: req.id,
            status: req.body.status
        }
        const toDoItem = await ToDo.findOne({
            where: {
                id: data.id,
            }
        })
        if (!toDoItem) return res.status(404).send({ message:'Item not found',error: 'Item with id' + data.id + ' was not found' })
        if(toDoItem.userId !== req.id) return res.status(403).send({message:'Forbidden resourse',error:'You do not have access to this resource'})
        toDoItem.set({
            name: data.name,
            description: data.description,
            status: data.status
        })
        await toDoItem.save().then((item) => {
            res.status(201).send({message:'success', data:toDoItem})
        }).catch((err) => {
            return res.status(500).send({ message: 'Error occured.Please try again later!', error: err })
        })
    } catch (err) {
        res.status(500).send({message:'Server error', error:'Something went worng, please try again later'})
    }
}

const deleteToDo = async (req, res) => {
    const toDoItem = await ToDo.findOne({
            where: {
                id: req.params.id,
            }
    })
    if (!toDoItem) return res.status(404).send({message:'Item not found', error: 'Item with id' + req.params.id + ' was not found' })
    if(toDoItem.userId !== req.id) return res.status(403).send({message:'Forbidden resourse',error:'You do not have access to this resource'})
    await ToDo.destroy({
            where: {
                id: req.params.id
            }
    }).then((item) => {
        console.log(item)
        return res.status(204).send({
            message:'success',
            response: 'Item with id' +
                req.params.id + 'was deleted successfully'
        })
    }).catch((err) => {
        console.log(err)
        return res.status(500).send({message:'Something went wrong.Try later again'})
    })

}

module.exports = {
    findToDos,
    insertToDo,
    updateToDo,
    deleteToDo
}