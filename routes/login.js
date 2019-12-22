const {
    User,
    validate
} = require('../models/user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const path = require('path');

router.get('/', async (req, res) => {
    res.sendFile(path.resolve('login.html'));
});

router.get('/all', async (req, res) => {
    const users = await User.find();
    let logins = [];
    users.forEach(el => {
        logins.push(el.login);
    });
    res.send(logins);
});

router.post('/', async (req, res) => {
    let user = await User.findOne({
        login: req.body.login
    });

    if (!user) return res.status(400).send('Something invalid');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Something invalid');

    res.send(user);
});

module.exports = router;