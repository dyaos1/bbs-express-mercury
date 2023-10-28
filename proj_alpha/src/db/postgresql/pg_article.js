const db = require('./postgres');

async function select_articles_all() {
    const result_value = await db.any(
        'SELECT * FROM article ORDER BY id'
    )
    .then((result) => {
        return result;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
    });
    return result_value;
}

async function select_articles_with_pageination(page_num) {
    const offset_num=page_num*10;
    const result_value = await db.any(
        'SELECT * FROM article ORDER BY id LIMIT 10 OFFSET $1', 
        [offset_num]
    )
    .then((result) => {
        return result;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
    });

    return result_value;
};

async function select_article_by_id(id) {
    const result_value = await db.one('SELECT * FROM article WHERE (id=$1)', [id])
    .then((result) => {
        console.log(`returned data: ${result}`)
        return result
    })
    .catch((e) => {
        console.log(`error: ${e}`)
    })

    return result_value
}

async function create_article(data) {
    let obj_data = (typeof(data) == `string`) ? JSON.parse(data) : data

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 22).replace('T', ' ');
    // 26까지가 postgres default, but javascript는 23까지만 되는듯. 22정도가 좋을듯(소수점 2자리)

    let list_data = [obj_data.title, obj_data.body, 1, formattedDate];

    const result_value = await db.one(
        'INSERT INTO article(title, body, author_id, updated_at) VALUES ($1, $2, $3, $4) RETURNING id', 
        list_data
    )
    .then((result) => {
        return result;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
    });

    return result_value;
}

async function update_article(article_id, data) {
    let obj_data = (typeof(data) == `string`) ? JSON.parse(data) : data;
    obj_data['id'] = article_id;

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 22).replace('T', ' ');

    obj_data['updated_at'] = formattedDate;

    console.log(obj_data);

    // 혹시라도 named parameter로 하게 되면 title 이나 body 가 없는 경우에도 대응이 될까 해서 해봤는데 그냥 list parameter랑 차이가 없었다.
    const result_value = await db.one(
        `UPDATE article 
        SET title = $<title>, body = $<body>, updated_at = $<updated_at> 
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

async function delete_article(article_id) {
    const result_value = await db.query(
        `DELETE FROM article WHERE id = $1`, 
        [Number(article_id)]
    )
    .then((result) => {
        console.log(result);
        return true;
    })
    .catch((e) => {
        console.log(`error: ${e}`);
        return false;
    });

    return result_value
};

module.exports = {
    select_articles_with_pageination,
    select_article_by_id,
    select_articles_all,
    create_article,
    update_article,
    delete_article
};