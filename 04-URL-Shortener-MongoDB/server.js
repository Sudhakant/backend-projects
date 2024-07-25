const express = require('express');
const app = express();
const ShortUrl = require('./models/shortUrl');
const {PORT, DB_URL} = require('../core/environment/index');
const path = require('path');

const mongoose = require('mongoose');

const uri = DB_URL;
mongoose.connect(uri)
.then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log(err);
});


// Converting the received data from JSON to JS Object
app.use(express.json());
// Converting the form data to JS Object
app.use(express.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls });
});

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({full: req.body.fullUrl})
    // .then(shortUrl => {
    //     res.send(shortUrl);
    // });
    res.redirect('/');
})

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));