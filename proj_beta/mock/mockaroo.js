const {makeConnection, makeQuery, makeClose} = require('../src/db/mysql/mysql-promise');

const article_mock = require('./MOCK_DATA_A.json');
const comment_mock = require('./MOCK_DATA_C.json');

async function data_init() {
    console.log('drop comment')
    var result1 = await makeQuery(`DROP TABLE IF EXISTS comment`)
    console.log(result1)

    console.log('drop article')
    var result2 = await makeQuery(`DROP TABLE IF EXISTS article`)
    console.log(result2)

    console.log('create article')    
    var result3 = await makeQuery(`CREATE TABLE article(
            id          INT         NOT NULL       AUTO_INCREMENT,
            title       VARCHAR(50) NOT NULL,
            body        TEXT        NOT NULL,
            author_id   INT         NOT NULL,
            created_at  DATETIME    DEFAULT CURRENT_TIMESTAMP,
            updated_at  DATETIME    DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )`)
    console.log(result3)

    console.log('create comment')
    var result4= await makeQuery(`CREATE TABLE comment(
            id          INT         NOT NULL        AUTO_INCREMENT,
            content     VARCHAR(200)   NOT NULL,
            article_id  INT         NOT NULL,
            created_at  DATETIME    DEFAULT CURRENT_TIMESTAMP,
            updated_at  DATETIME    DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id), 
            FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE
        )`)
    console.log(result4)

    console.log('article input start')
    article_mock.forEach(async (e) => {
        const title = e.title;
        const body = e.body;
        const author_id = e.author_id;
        const query = `INSERT INTO article(title, body, author_id) VALUES ("${title}", "${body}", 1)`;

        console.log(query)
        var result = await makeQuery(query)
        console.log(result)
    })

    console.log('comment input start')
    comment_mock.forEach(async (e) => {
        const content = e.content;
        const article_id = e.article_id;
        const query = `INSERT INTO comment(content, article_id) VALUES ("${content}", ${article_id})`;

        console.log(query)
        var result = await makeQuery(query);
        console.log(result);
    })

    // await makeClose();
    }


module.exports = data_init

// mock()