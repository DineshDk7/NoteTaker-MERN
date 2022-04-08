const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    Title : {
        type: String,
        required : true
    },
    Description : {
        type : String,
        required : true,
        trim : true,
        minlength : 4
    },
    completed : {
        type : Boolean,
        default : false
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId
    }
},
{
    timestamps : true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task