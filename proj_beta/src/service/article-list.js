const express = require('express');
const router = express.Router();

const ArticleSet = require('../domain/ArticleSet')

router
    .route('/')
    .all(async (req, res, next) => {
        res.type('application/json');
        let article_set = new ArticleSet();
        await article_set.init();
        req.article_set = article_set;
        next();
    })
    .get(async (req, res) => {
        const article_set = req.article_set;
        
        const page_num = (req.query.page === undefined) ? 0 : Number(req.query.page)-1;
        const offset_page_num = (page_num > 0) ? page_num*10 : 0
        await article_set.get(offset_page_num)

        const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
        const next = `${url}?page=${(page_num + 2).toString()}`
        const previous = Number(page_num) > 0
            ? `${url}?page=${page_num.toString()}` 
            : ''

        const result = article_set.article_list;
        const count = article_set.count;

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

module.exports = router;