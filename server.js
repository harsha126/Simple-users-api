const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    var localStorage = new LocalStorage('./data');
}

const app = express();
app.use(cors());
const port = 3000;
let totUsers = 30;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to Harsh`s server');
});

app.get('/users', (req, res) => {
    const users = JSON.parse(localStorage.getItem('users'));
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('User not found');
    res.json(user);
});

app.post('/users', (req, res) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = {
        id: totUsers + 1,
        name: req.body.name,
        email: req.body.email,
        dob:req.body.dob,
        company:req.body.company,
        city:req.body.city
    };
    totUsers++;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    console.log(req.params.id);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    var userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (!userIndex) res.status(404).send('User not found');
    users[userIndex] = {...users[userIndex],...req.body};
    localStorage.setItem('users', JSON.stringify(users));
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('User not found');
    const index = users.indexOf(user);
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    res.json(user);
});

app.get('/loadData',(req,res) => {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    const loadData = JSON.parse(localStorage.getItem("loadData"));
    users = loadData;
    localStorage.setItem("users",JSON.stringify(users));
    res.send("Loaded Data successfully got to index.html");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
