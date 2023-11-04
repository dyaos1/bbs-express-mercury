const { get_comments_with_article_id, get_comments_with_pagination } = require('../db/mysql/comment-query');
const { get_count } = require('../db/mysql/common-query');


const CommentSet = class {
    constructor() {
        this.count = null;
        this.comments = [];
    }

    async init() {
        const comment_list = await get_comments_with_pagination(0);
        this.comments = comment_list;

        const [ count ] = await get_count('comment');
        this.count = count['COUNT(*)'];

        return this;
    }

    async filter() {
        // pass
    }

    async get_by_article(article_id) {
        var result = await get_comments_with_article_id(article_id);
        this.comments = result;
        this.count = result.length;
        return this;
    }

    async get(pageNum) {
        var result = await get_comments_with_pagination(pageNum);
        this.comments = result;
        // this.count = result.length;
        return this;
    }

    async count() {
        const count = this.comments.length;
        this.count = count;
        return this.count;
    }

    toJSON() {
        return {
            "count": this.count,
            "comments": this.comments
        };
      }

    toString() {
        return JSON.stringify(this.toJSON());
    }
}

module.exports = CommentSet;