const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');
const PORT = process.env.PORT || 7070

app.use('/writer', expressJwt({ secret: process.env.SECRET }));
app.use('/auth', require('./routes/auth'));
app.use('/writer/outline', require('./routes/outline'))
app.use('/writer/story', require('../routes/story'))

app.use((err, req, res, next) => {
    console.error(err);
    if(err.name === 'UnauthorizedError') {
        res.status(err.status)
    }
    return res.send({ message: err.message })
});

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/todo-auth-example', 
    // { useUnifiedTopology: true },
    { useNewUrlParser: true }, 
    (err) => {
        if(err) throw err;
        console.log('Connected to the database');
    }
);

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`)
});