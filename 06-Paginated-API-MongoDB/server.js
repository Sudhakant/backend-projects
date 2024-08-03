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

const db = mongoose.connection;
db.once('open', async () => {
    if(await User.countDocuments().exec() > 0) return

    Promise.all([
        User.create({name: 'User 1'}),
        User.create({name: 'User 2'}),
        User.create({name: 'User 3'}),
        User.create({name: 'User 4'}),
        User.create({name: 'User 5'}),
        User.create({name: 'User 6'}),
        User.create({name: 'User 7'}),
        User.create({name: 'User 8'}),
        User.create({name: 'User 9'}),
        User.create({name: 'User 10'}),
        User.create({name: 'User 11'}),
        User.create({name: 'User 12'}),
        User.create({name: 'User 13'}),
        User.create({name: 'User 14'}),
    ]).then(() => console.log('All Users Created'));
})


app.get('/users', paginatedResults(User), (req, res)=>{
    const results = res.paginatedResults;

    res.json(results);
});

function paginatedResults(model){
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const results = {};

        if(endIndex < await model.countDocuments().exec()){
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
        
        try{
            results.results = await model.find().limit(limit).skip(startIndex).exec();
            // res.json(results);
            res.paginatedResults = results;
            next();
        }  catch(error){
            res.status(500).json({message: error.message});
        }
        
    }
}


app.listen(PORT, ()=>console.log(`Server is Listening on PORT ${PORT}`));
