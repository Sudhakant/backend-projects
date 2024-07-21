const express = require('express');
const app = express();
const {PORT, DB_URL} = require('../core/environment/index');

const mongoose = require('mongoose');
const uri = DB_URL;
mongoose.connect(uri)
.then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log(err);
});



// Establish Database Connection
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017';

// MongoClient.connect(url, (err, client) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log('Database Connected');
//     }
// });





app.get('/', (req, res) => {
    
    // res.send('Hello World!');
})


app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));