var express = require('express');
var router = express.Router();

const pg_comment = require('../db/postgresql/pg_comment');
const pg_common = require('../db/postgresql/pg_common');

router.use(express.json()); // for parsing application/json
router.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// define article list here
router
  .route('/')
  .all((req, res, next) => {
    res.type('application/json');
    next();
  })
  .get(async function(req, res) {
    const count = await pg_common.get_count_table('comment')

    const page_num = req.query.page === undefined ? 0 : Number(req.query.page)-1
    let result = await pg_comment.select_comments_with_pagination(page_num)

    const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
    const next = `${url}?page=${(page_num + 2).toString()}`
    const previous = Number(page_num) > 0
      ? `${url}?page=${page_num.toString()}`
      : '';

    result.forEach((e) => {
      e['url'] = `${url}${e.id}`
    });

    const context = {
      "count": count,
      "next": next,
      "previous": previous,
      "results": result
    }

    res.status(200);
    res.send(context);
  });

// param
router.param('id', (req, res, next, val) => {
    req.params.comment_id = val
    next()
})

// define each article routes here
router
  .route('/:comment_id')
  .all(function (req, res, next) {
      // runs for all HTTP verbs first
      // think of it as route specific middleware!
      console.log(`router recognize: ${req.params.comment_id}`)
      next()
  })
  .get(async function (req, res, next) {
    const comment_id = req.params.comment_id;
    const result = await pg_comment.select_comment_with_id(comment_id)
    const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`

    const context = {
      ...result,
      "url": url
    }
    res.status(200);
    res.json(context)
  })
  .put(async function (req, res, next) {
    const comment_id = req.params.comment_id;
    const data = req.body;

    const result = await pg_comment.update_comment(comment_id, data);

    const url = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`

    const context = {
      ...result,
      "url": url
    };
    res.status(200);
    res.json(context);
  })
  .delete(async function (req, res, next) {
    const comment_id = req.params.comment_id;
    const result = await pg_comment.delete_comment(comment_id);

    res.status(200);
    res.json({
      "deletion": result 
    });
  });

module.exports = router;