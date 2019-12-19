const Joi = require('joi');
const mongoose = require('mongoose');

const Task = mongoose.model('Task', new mongoose.Schema({
    task: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    },
    author: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}));

function validateToDoList(newTask) {

    const schema = {
        task: Joi.string().min(1).max(100).required(),
        author: Joi.string().min(1).max(50).required()
    };

    return Joi.validate(newTask, schema);
}

module.exports.validate = validateToDoList;
module.exports.Task = Task;