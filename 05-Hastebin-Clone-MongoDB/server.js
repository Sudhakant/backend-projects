const express = require('express');
const app = express();
const path = require('path');
const {PORT} = require('../core/environment/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const code = `Welcome to Wastebin

Use the commands in the top right corner
to create a new file to share with others.`;

    res.render('code-display', {code});
})

app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));