const { makeConnection, makeQuery, makeClose } = require('./mysql-promise');

const get_article_by_id = async (article_id, pass_close = false) => {
    try {
        var result = await makeConnection();
        // console.log(result);
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'SELECT * FROM `article` WHERE `id` = ?',
            timeout: 40000, // 40s
            values: [article_id]
        }, 
            function (error, results, fields) {
                
            }
        );
        
    } catch (err) {
        console.error(err)
    }

    if (pass_close) {
        try {
            var result = await makeClose();
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log('pass_close')
    }

    return result_value;
}

const get_articles_with_pagination = async (pageNum, pass_close = false) => {
    try {
        var result = await makeConnection();
        console.log('start get_article connection');
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'SELECT * FROM `article` ORDER BY `id` LIMIT 10 OFFSET ?',
            timeout: 40000, // 40s
            values: [pageNum]
        }, 
            function (error, results, fields) {
                
            }
        );

        console.log('start get_article query');
    } catch (err) {
        console.error(err)
    }

    if (pass_close) {
        try {
            var result = await makeClose();
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log('pass_close')
    }


    return result_value;
}


const insert_into_article = async ( title, body, author_id, created_at, updated_at, pass_close = false ) => {
    try {
        var result = await makeConnection();
        // console.log(result);
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'INSERT INTO `article` SET ?',
            timeout: 40000, // 40s
            values: {
                title: `${title}`, 
                body: `${body}`,
                author_id: author_id,
                created_at: `${created_at}`,
                updated_at: `${updated_at}`
            }
        }, 
            function (error, results, fields) {
                
            }
        );
    } catch (err) {
        console.error(err)
    }

    if (pass_close) {
        try {
            var result = await makeClose();
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log('pass_close')
    }


    return result_value.insertId;
}


module.exports = {
    get_article_by_id,
    get_articles_with_pagination,
    insert_into_article
}