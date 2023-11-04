const express = require('express');
const router = express.Router();

router.use(express.json()) // for parsing routerlication/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const Article = require('../domain/Article')
const CommentSet = require('../domain/CommentSet')
const Comment = require('../domain/Comment')

router
    .route('/:id')
    .all(async (req, res, next) => {
        res.type('application/json');
        const article_id = Number(req.params.id);
        const article = new Article();

        req.article = await article.get(article_id);

        if (req.article === null) {
            next(new Error(`no such an article`))
            return false;
        }
        next();
    })
    .get(async (req, res, next) => {
        const article = req.article;

        const comment_set = new CommentSet();
        const comments = await comment_set.get_by_article(article.id);

        const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`

        const context = {
            ...article,
            'comments': comments.toJSON(),
            'url': url
        }

        res.json(context);
    })
    .delete(async (req, res) => {
        const article = req.article;
        const result = await article.delete();

        const context = {
            "deletion success?" : (result === 1) ? true : false
        }
        res.json(context)
    })
    .put(async (req, res) => {
        const article = req.article;
        const [title, body] = [req.body.title, req.body.body]
        console.log(title,body)
        const result = await article.update(title, body);

        const context = {
            ...result
        }
        res.json(context)
    })
    .post(async (req, res) => {
        const content = req.body.content
        const article_id = Number(req.params.id);

        const comment = new Comment();
        const result = await comment.create(content, article_id)

        // console.log(result)

        const context = {
            ...result
        }

        res.json(context)
    })


router.use((err, req, res, next) => {
    res.status(500).json({statusCode: res.statusCode, errMessage:err.message});
  });

module.exports = router;