const express = require('express');
const app = express();
const path = require('path');
const {DB_URL, PORT} = require('../core/environment/index');
const Document = require('./models/document');
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

    res.render('code-display', {code, language: "plaintext"});
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/save', async (req, res) => {
    const {value} = req.body;
    // console.log(value);
    // res.render('code-display', {code: value});
    try {
        const document = await Document.create({value});
        res.redirect(`/${document._id}`);
    } catch (error) {
        console.log(error);
        res.render('new', {value});
    }
});

app.get('/:id/duplicate', async (req, res) => {
    const {id} = req.params;
    try {
        const document = await Document.findById(id);
        res.render('new', {value: document.value});
    } catch (error) {
        console.log(error);
        res.redirect(`/${id}`);
    }
});

app.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const document = await Document.findById(id);
        res.render('code-display', {code: document.value, id});
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
   
});

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));