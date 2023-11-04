const express = require('express');
const router = express.Router();

router.use(express.json()) // for parsing routerlication/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const CommentSet = require('../domain/CommentSet')

router
    .route('/')
    .all(async (req, res, next) => {
        res.type('application/json');
        const comment_set = new CommentSet();
        await comment_set.init();

        req.comment_set = comment_set

        console.log(req.comment_set)

        if (req.comment_set === null) {
            next(new Error(`no such an article`))
            return false;
        }
        next();
    })
    .get(async (req, res) => {
        const comment_set = req.comment_set;

        const page_num = (req.query.page === undefined) ? 0 : Number(req.query.page)-1;
        const offset_page_num = (page_num > 0) ? page_num*10 : 0
        await comment_set.get(offset_page_num)

        const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;
        const next = `${url}?page=${(page_num + 2).toString()}`;
        const previous = Number(page_num) > 0
            ? `${url}?page=${page_num.toString()}` 
            : '';

        const result = comment_set.comments;
        const count = comment_set.count;

        result.forEach((e) => {
            e['url'] = `${url}${e.id}`
        })

        const context = {
            "count": count,
            "next": next,
            "previous": previous,
            "results": result
        }

        res.json(context);
    })


router.use((err, req, res, next) => {
    res.status(500).json({statusCode: res.statusCode, errMessage:err.message});
  });

module.exports = router;