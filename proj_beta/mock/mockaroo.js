const db = require('../db/mysql/mysql-callback-hell');
const db_promise = require('../db/mysql/mysql-promise');

let main = new Promise((resolve, reject) => {
        console.log('start')
        if (true) {
            resolve("start")
        } else {
            reject("fail")
        }
    })
    // await db_promise(`DROP TABLE IF EXISTS comment`);

    // await db_promise(`DROP TABLE IF EXISTS article`);

    // await db_promise(`CREATE TABLE article(
    //     id          INT         NOT NULL       AUTO_INCREMENT,
    //     title       VARCHAR(50) NOT NULL,
    //     body        TEXT        NOT NULL,
    //     author_id   INT         NOT NULL,
    //     created_at  DATETIME    DEFAULT CURRENT_TIMESTAMP,
    //     updated_at  DATETIME    DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    //     PRIMARY KEY (id)
    // )`);
    
    // await db_promise(`CREATE TABLE comment(
    //     id          INT         NOT NULL        AUTO_INCREMENT,
    //     content     VARCHAR(200)   NOT NULL,
    //     article_id  INT         NOT NULL,
    //     created_at  DATETIME    DEFAULT CURRENT_TIMESTAMP,
    //     updated_at  DATETIME    DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    //     PRIMARY KEY (id), 
    //     FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE
    // )`);

main
    .then(async () => {
        console.log('drop comment')
        await db_promise(`DROP TABLE IF EXISTS comment`)
    })
    .then(async () => {
        console.log('drop article')
        await db_promise(`DROP TABLE IF EXISTS article`)
    })
    .then(async () => {
        console.log('create article')
        await db_promise(`CREATE TABLE article(
            id          INT         NOT NULL       AUTO_INCREMENT,
            title       VARCHAR(50) NOT NULL,
            body        TEXT        NOT NULL,
            author_id   INT         NOT NULL,
            created_at  DATETIME    DEFAULT CURRENT_TIMESTAMP,
            updated_at  DATETIME    DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )`)
    })
    .then(async () => {
        console.log('create comment')
        await db_promise(`CREATE TABLE comment(
            id          INT         NOT NULL        AUTO_INCREMENT,
            content     VARCHAR(200)   NOT NULL,
            article_id  INT         NOT NULL,
            created_at  DATETIME    DEFAULT CURRENT_TIMESTAMP,
            updated_at  DATETIME    DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id), 
            FOREIGN KEY (article_id) REFERENCES article(id) ON DELETE CASCADE
        )`)
    })



