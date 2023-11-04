const { get_articles_with_pagination } = require('../db/mysql/article-query');
const { get_count } = require('../db/mysql/common-query');


const ArticleSet = class {
    constructor() {
        this.count = null;
        this.article_list = [];
    }

    async init() {
        var result = await get_articles_with_pagination(0);
        this.article_list = result;

        const [result_count] = await get_count('article');
        this.count = result_count['COUNT(*)'];

        return this;
    }

    async filter() {
        // pass
    }

    async get(queryString = 1) {
        let pageNum = queryString.toString().startsWith('page=') ? Number(queryString.replace('page=', '')) : Number(queryString)

        var result = await get_articles_with_pagination(pageNum);
        this.article_list = result;
        return this.article_list;
    }

    async count() {
        const result_count = await get_count('article');
        const count = result_count;
        return count;
    }

    toJSON() {
        return {
            "count": this.count,
            "result": this.article_list
        };
      }

    toString() {
        return JSON.stringify(this.toJSON());
    }
}

module.exports = ArticleSet;