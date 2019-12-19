const helmet = require('helmet');
const mongoose = require('mongoose');
const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const tasks = require('./routes/tasks');

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use('/api/', tasks);

//polaczenie z bazą
mongoose.connect('mongodb://localhost/todoList')
    .then(() => console.log('Connected to todo List Base'))
    .catch(err => console.error('Could not connect to todo List Base', err));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/index.html', async (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/registration.html', async (req, res) => {
    res.sendFile(path.join(__dirname + '/registration.html'));
});

app.get('/login.html', async (req, res) => {
    res.sendFile(path.join(__dirname + '/login.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));