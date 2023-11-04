const { makeConnection, makeQuery, makeClose } = require('./mysql-promise');


const get_comments_with_article_id = async (article_id, pass_close = false) => {
    try {
        var result = await makeConnection();
        // console.log(result);
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'SELECT * FROM `comment` WHERE `article_id` = ?',
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
        // console.log('pass_close')
    }

    return result_value;
}


const get_comment_by_id = async (comment_id, pass_close = false) => {
    try {
        var result = await makeConnection();
        // console.log(result);
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'SELECT * FROM `comment` WHERE `id` = ?',
            timeout: 40000, // 40s
            values: [comment_id]
        }, 
            function (error, results, fields) {
                return results;
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


const get_comments_with_pagination = async (pageNum, pass_close = false) => {
    try {
        var result = await makeConnection();
        console.log('start get_article connection');
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'SELECT * FROM `comment` ORDER BY `id` LIMIT 10 OFFSET ?',
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
        // console.log('pass_close')
    }


    return result_value;
}


const insert_into_comment = async ( content, article_id, created_at, updated_at, pass_close = false ) => {
    try {
        var result = await makeConnection();
        // console.log(result);
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'INSERT INTO `comment` SET ?',
            timeout: 40000, // 40s
            values: {
                content: `${content}`,
                article_id: article_id,
                created_at: `${created_at}`,
                updated_at: `${updated_at}`
            }
        }, 
            function (error, results, fields) {
                return results;
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


const delete_comment = async ( comment_id, pass_close = false ) => {
    try {
        var result = await makeConnection();
        // console.log(result);
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'DELETE FROM `comment` WHERE `id` = ?',
            timeout: 40000, // 40s
            values: [comment_id]
        }, 
        function (error, results, fields) {
            return results;
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
        // console.log('pass_close')
    }

    return result_value.affectedRows;
}


const update_comment = async ( comment_id, content, updated_at, pass_close = false ) => {
    try {
        var result = await makeConnection();
        // console.log(result);
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'UPDATE `content` SET ? WHERE `id` = ?',
            timeout: 40000, // 40s
            values: [{ 
                content: `${content}`,
                updated_at: `${updated_at}`
            }, comment_id]
        }, 
            function (error, results, fields) {
                return results;
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

    return result_value.changedRows;
}


module.exports = {
    get_comments_with_article_id,
    get_comment_by_id,
    get_comments_with_pagination,
    insert_into_comment,
    update_comment,
    delete_comment
}