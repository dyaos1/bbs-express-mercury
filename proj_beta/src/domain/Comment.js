const { insert_into_comment, get_comment_by_id, update_comment, delete_comment } = require('../db/mysql/comment-query')

const Comment = class {
    constructor() {
        this.id = null;
        this.content = null;
        this.article_id = null;

        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 22).replace('T', ' ')
         
        this.created_at = formattedDate;
        this.updated_at = formattedDate;
    };

    setID(id) {
        this.id = id;
    };

    setArticleID(article_id) {
        this.article_id = article_id;
    };

    setUpdatedAt() {
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 22).replace('T', ' ')
        this.updated_at = formattedDate;
    };

    setComment(result) {
        this.id = result.id;
        this.content = result.content;
        this.article_id = result.article_id;
        this.created_at = result.created_at;
        this.updated_at = result.updated_at;
    }

    toJSON() {
        return {
          id: this.id,
          content: this.content,
          article_id: this.article_id,
          created_at: this.created_at,
          updated_at: this.updated_at
        };
      }

    // override
    toString() {
        return JSON.stringify(this.toJSON());
    }

    //c
    async create(content, article_id) {
        this.content = content;
        this.article_id = article_id;
        // this.setAuthorID();
        const result = await insert_into_comment(
            this.content, 
            this.article_id,
            this.created_at, 
            this.updated_at
        );

        this.setID(Number(result));

        return this.toJSON();
    };

    //r
    async get(id) {
        const [result] = await get_comment_by_id(id);

        if (result === undefined) {
            return null;
        }

        this.setComment(result);
        
        return this;
    };

    //u
    async update(content) {
        this.setUpdatedAt()
        const result = await update_comment(content, this.updated_at);

        this.setArticle(result);
        return this.toJSON();
    };

    //d
    async delete() {
        if (this.id === null) {
            return false;
        }
        const result = await delete_comment(this.id);
        console.log(result)
        return result;
    }
};


module.exports = Comment;