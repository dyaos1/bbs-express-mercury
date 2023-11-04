const express = require('express');
const router = express.Router();

router.use(express.json()) // for parsing routerlication/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const Comment = require('../domain/Comment')

router
    .route('/:id')
    .all(async (req, res, next) => {
        res.type('application/json');
        const comment_id = Number(req.params.id);
        const comment = new Comment();

        req.comment = await comment.get(comment_id);

        if (req.comment === null) {
            next(new Error(`no such an article`))
            return false;
        }
        next();
    })
    .get(async (req, res) => {
        const comment = req.comment;

        const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`

        const context = {
            ...comment,
            'url': url
        }
        
        res.json(context);
    })
    .delete(async (req, res) => {
        const comment = req.comment;
        const result = await comment.delete();

        const context = {
            "deletion success?" : (result === 1) ? true : false
        }
        res.json(context)
    })
    .put(async (req, res) => {
        const comment = req.comment;
        const content = req.body.content
        console.log(content)
        const result = await comment.update(content);

        const context = {
            ...result
        }
        res.json(context)
    })


router.use((err, req, res, next) => {
    res.status(500).json({statusCode: res.statusCode, errMessage:err.message});
  });

module.exports = router;