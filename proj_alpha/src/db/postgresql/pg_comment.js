const db = require('./postgres')

async function select_comments_all() {
    const result_value = db.any(
        'SELECT * FROM comment ORDER BY id'
    )
    .then((result) => {
        console.log(`returned data: ${result}`);
        return result;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
    });
    return result_value;
};

async function select_comments_with_pagination(page_num) {
    const offset_num = page_num*10;
    const result_value = db.any(
        'SELECT * FROM comment ORDER BY id LIMIT 10 OFFSET $1',
        [offset_num]
    )
    .then((result) => {
        console.log(`returned data: ${result}`);
        return result;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
    })
    return result_value;
};

async function select_comment_with_id(comment_id) {
    const result_value = db.one(
        'SELECT * FROM comment WHERE id = $1',
        [comment_id]
    )
    .then((result) => {
        return result;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
    });
    return result_value;
};

async function select_comments_with_article_id(article_id) {
    const result_value = db.any(
        'SELECT * FROM comment WHERE (article_id) = $1',
        [article_id]
    )
    .then((result) => {
        console.log(`returned data: ${result}`);
        return result;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
    })
    return result_value;
};

async function create_comment(article_id, data) {
    let obj_data = (typeof(data) == `string`) ? JSON.parse(data) : data;
    obj_data['article_id'] = article_id;

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 22).replace('T', ' ');
    obj_data['updated_at'] = formattedDate;

    const result_value = await db.one(
        `INSERT INTO 
        comment(content, article_id, updated_at) 
        VALUES ($<content>, $<article_id>, $<updated_at>) 
        RETURNING id`, 
        obj_data
    )
    .then((result) => {
        return result
    })
    .catch((e) => {
        console.log(`error: ${e}`)
    });

    return result_value;
};


async function update_comment(comment_id, data) {
    let obj_data = (typeof(data) == `string`) ? JSON.parse(data) : data;
    obj_data['id'] = comment_id;

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 22).replace('T', ' ');

    obj_data['updated_at'] = formattedDate;

    const result_value = await db.one(
        `UPDATE comment 
        SET content = $<content>, updated_at = $<updated_at> 
        WHERE id = $<id>
        RETURNING *`,
        obj_data
    )
    .then((result) => {
        return result;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
    });

    return result_value;
};

async function delete_comment(comment_id) {
    const result_value = await db.query(
        `DELETE FROM comment WHERE id = $1`, 
        [comment_id]
    )
    .then((result) => {
        console.log(result);
        return true;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
        return false;
    });

    return result_value;
};

module.exports = {
    select_comments_all,
    select_comments_with_pagination,
    select_comments_with_article_id,
    select_comment_with_id,
    create_comment,
    update_comment,
    delete_comment
};
