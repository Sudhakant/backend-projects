require('dotenv');
const express = require('express');
const app = express();
const {PORT} = require('../core/environment/index');

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));