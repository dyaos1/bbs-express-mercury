const pg = require('../src/db/postgresql/postgres')

const data_list_articles = require('./MOCK_DATA_A.json')
const data_list_comments = require('./MOCK_DATA_C.json')

// data_list.forEach(async (e) => {
//     const jsone = JSON.stringify(e)
//     console.log(typeof(e))
//     console.log(jsone)
//     console.log(typeof(jsone))
//     const objecte = JSON.parse(jsone)
//     console.log(objecte)
//     console.log(typeof(objecte))
// })

// const now = new Date()
// console.log(now)
// const formattedDate = now.toISOString().slice(0, 26).replace('T', ' ');
// console.log(formattedDate)

async function reset_tables() {
    await pg.query(`DROP TABLE IF EXISTS article`);
    await pg.query(`DROP TABLE IF EXISTS comment`);
    await pg.query(`CREATE TABLE article (
        id          SERIAL      PRIMARY KEY,
        title       VARCHAR(50) NOT NULL,
        body        TEXT        NOT NULL,
        author_id   INTEGER     NOT NULL,
        created_at  TIMESTAMP   DEFAULT NOW,
        updated_at  TIMESTAMP,
    );`);
    await pg.query(`CREATE TABLE comment (
        id          SERIAL      PRIMARY KEY,
        content     VARCHAR(200)    NOT NULL,
        article_id  INTEGER     NOT NULL,
        created_at  TIMESTAMP   DEFAULT NOW,
        updated_at  TIMESTAMP,
        FOREIGN KEY(article_id) REFERENCES article(id) ON DELETE CASCADE
    );`);
}

async function insert_mocking_article() {
    data_list_articles.forEach(async (e) => {
        const returned = await pg.any(e);
        console.log(returned);
    });
};

async function insert_mocking_comment() {
    data_list_comments.forEach(async (e) => {
        const returned = await pg.any(e);
        console.log(returned);
    });
};

// reset_tables();

// insert_mocking_article();
// insert_mocking_comment();
