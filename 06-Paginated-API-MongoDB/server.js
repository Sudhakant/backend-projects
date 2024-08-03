const express = require('express');
const app = express();
const {PORT, DB_URL} = require('../core/environment/index');

const mongoose = require('mongoose');
const User = require('./models/users');

mongoose.connect(DB_URL)
.then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log(err);
});


app.get('/users', paginatedResults(User), (req, res)=>{
    const results = res.paginatedResults;

    res.json(results);
});

function paginatedResults(model){
    return (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if(endIndex < model.length){
            results.next = {
                page: page + 1,
                limit
            }
        }

        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit
            }
        }
        
        results.results = model.slice(startIndex, endIndex);
        
        // res.json(results);
        res.paginatedResults = results;
        next();
    }
}


app.listen(PORT, ()=>console.log(`Server is Listening on PORT ${PORT}`));
