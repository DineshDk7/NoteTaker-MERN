const Task = require("../models/task")

const addNotes = async (req, res) => {
    try{
        const task = new Task({
            ...req.body, //ES-6 feature to use all the properties inside the body
            owner : req.user._id
        })
       
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
}

const listNotes = async (req, res) => {
    try{
        const match = {}
        const sort = {}
        match.owner = req.user._id

        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }

        const findOptions = {
            limit : 10,
            skip : 0,
            sort
        }

        if(req.query.limit){
            findOptions.limit = parseInt(req.query.limit)
        }

        if(req.query.skip){
            findOptions.skip = parseInt(req.query.skip)
        }

        if(req.query.sortBy){
            const sortArr = req.query.sortBy.split(':')
            sort[sortArr[0]] = sortArr[1] === 'asc' ? 1 : -1
            findOptions.sort = sort
        }

        const tasks = await Task.find(match, null, findOptions)
        res.json(tasks)
    }catch(e){
        res.status(500).send(new Error('No tasks found'))
    }
}

const updateNotes = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Title','Description','completed']
    const isValid = updates.every((update) => allowedUpdates.includes(update))
    if(!isValid){
        return res.status(400).send({Error : 'Invalid updates!'})
    }

    const _id = req.params.id
    try{
        //const task = await Task.findByIdAndUpdate(_id, req.body, { new : true, runValidators : true})//New is used so that it returns the updated data
        
        const task = await Task.findOne({_id, owner : req.user._id})
        
        if(!task){
           return res.status(404).send('Task not found!')
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
}

const deleteNotes = async (req, res) => {
    const _id = req.params.id
    try{
        const task = await Task.findOneAndDelete({_id, owner : req.user._id})

        if(!task){
            return res.status(404).send('Task not found')
        }
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
}

module.exports = { addNotes, listNotes, updateNotes, deleteNotes }