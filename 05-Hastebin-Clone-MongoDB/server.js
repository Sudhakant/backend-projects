const express = require('express');
const app = express();
const path = require('path');
const {PORT} = require('../core/environment/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('code-display');
})

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));