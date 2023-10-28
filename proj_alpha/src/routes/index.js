const express = require('express');
const app = express()

const article = require('./article')
const comment = require('./comment')


// middleware that is specific to this router
app.use(function timeLog(req, res, next) {
    // console.log('Time: ', Date.now());
    next();
  });

app.use('/article', article);

app.use('/comment', comment);

app.get('/', (req, res) => {
    res.send('api')
});

module.exports = app;