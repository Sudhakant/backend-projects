const express = require('express');
const app = express();
const path = require('path');
const {DB_URL, PORT} = require('../core/environment/index');
const mongoose = require('mongoose');

const uri = DB_URL;
mongoose.connect(uri)
.then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log(err);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    const code = `Welcome to Wastebin

Use the commands in the top right corner
to create a new file to share with others.`;

    res.render('code-display', {code});
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/save', (req, res) => {
    const {value} = req.body;
    console.log(value)
    // res.render('code-display', {code: value});
})

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));