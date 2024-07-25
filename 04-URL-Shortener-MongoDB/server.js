const express = require('express');
const app = express();
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


app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/shortUrls', (req, res) => {
    
})

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));