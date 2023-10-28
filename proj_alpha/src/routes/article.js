var express = require('express');
var router = express.Router();

const pg_common = require('../db/postgresql/pg_common');
const pg_article = require('../db/postgresql/pg_article');
const pg_comment = require('../db/postgresql/pg_comment');

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// get artilcle list
router.route('/').
  all((req, res, next) => {
    res.type('application/json');
    next();
  })
  .get(async function(req, res) {
    const count = await pg_common.get_count_table('article')
    const page_num = req.query.page === undefined ? 0 : Number(req.query.page)-1;

    const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
    const next = `${url}?page=${(page_num + 2).toString()}`
    const previous = Number(page_num) > 0
      ? `${url}?page=${page_num.toString()}` 
      : ''
    let result = await pg_article.select_articles_with_pageination(page_num);

    result.forEach((e) => {
      e['url'] = `${url}${e.id}`
    })

    const context = {
      "count": count,
      "next": next,
      "previous": previous,
      "results": result
    }

    res.status(200);
    res.send(context);
})
  .post(async function(req, res, next) {
    const data = req.body;

    const result = await pg_article.create_article(data);

    if (result === undefined) {
      next(new Error(`post article failed! data: ${JSON.stringify(data)}`));
      return;
    };

    const context = {
      ...result
    };

    res.status(201);
    res.json(context);
  });


// param
router.param('id', (req, res, next, val) => {
  req.params.article_id = val
  next();
})

// each article CRUD
router
  .route('/:id')
  .all(function (req, res, next) {
    res.type('application/json');
    next();
  })
  .get(async function (req, res) {
    const article_id = req.params.article_id
    const result_article = await pg_article.select_article_by_id(article_id)
    const result_comment = await pg_comment.select_comments_with_article_id(article_id)

    const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`

    const context={
      ...result_article,
      "comments": result_comment,
      "url": url,
    }
    res.status(200);
    res.json(context);
  })
  .put(async function (req, res) {
    const article_id = req.params.article_id
    const data = req.body
    const result = await pg_article.update_article(article_id, data)

    const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`

    const context={
      ...result,
      "url": url
    }
  
    res.status(200);
    res.json(context);
  })
  .delete(async function(req, res) {
    const article_id = req.params.article_id
    const success = await pg_article.delete_article(article_id)

    res.status(200);
    res.json(
      {"deletion": success}
    );
  })
  .post(async function(req, res, next) {
    const article_id = req.params.article_id;
    const data = req.body;
    const result = await pg_comment.create_comment(article_id, data);

    if (result === undefined) {
      next(new Error(`post comment failed! data: ${JSON.stringify(data)}`)); // data가 예상과 다르게 출력됨;;
      return;
    };

    const context = {
      ...result
    }
    res.status(201);
    res.json(context);
  });

router.use((err, req, res, next) => {
  res.status(500).json({statusCode: res.statusCode, errMessage:err.message});
});

module.exports = router;