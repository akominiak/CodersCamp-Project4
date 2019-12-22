const {Task, validate} = require('../models/task');
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

router.get('/:login', async (req, res) => {
    const tasks = await Task.find({
        author: req.params.login
    });
    res.send(tasks);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const newTask = new Task({
        task: req.body.task,
        author: req.body.author
    });
    res.send(await newTask.save());
});

router.delete('/:id', async (req, res) => {
    const task = await Task.findByIdAndRemove(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    res.send(task);
});

module.exports = router;