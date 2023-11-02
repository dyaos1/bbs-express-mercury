const express = require('express')
const router = express.Router()

const articles = require('./article-list');
const article = require('./article');
const comments = require('./comment-list');
const comment = require('./comment');

// middleware that is specific to this router
router.use('/articles', articles);
// router.use('/article', article);
// router.use('/comments', comments);
// router.use('/comment', comment);

// define the home page route
router.get('/', (req, res) => {
  res.send('api')
})

module.exports = router