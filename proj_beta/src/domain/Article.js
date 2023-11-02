const { get_article_by_id } = require('../db/mysql/article-query');

const Article = class {
    constructor(title = null, body = null, author_id = 1) {
        this.id = null;
        this.title = title;
        this.body = body;
        this.author_id = author_id;

        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 26).replace('T', ' ')
        
        this.created_at = formattedDate;
        this.updated_at = formattedDate;
    };

    setID(id) {
        this.id = id;
    };

    setAuthorID(author_id) {
        this.author_id = author_id;
    };

    setUpdatedAt() {
        const now = new Date();
        const formattedDate = now.toISOString().slice(0, 22).replace('T', ' ')
        this.updated_at = formattedDate;
    };

    setArticle(result) {
        this.id = result.id;
        this.title = result.title;
        this.body = result.body;
        this.author_id = result.author_id;
        this.created_at = result.created_at;
        this.updated_at = result.updated_at;
    }

    toJSON() {
        return {
          "id": this.id,
          "title": this.title,
          "body": this.body,
          "author_id": this.author_id,
          "created_at": this.created_at,
          "updated_at": this.updated_at
        };
      }

    // override
    toString() {
        return JSON.stringify(this.toJSON());
    }

    //c
    async create(title, body) {
        this.title = title;
        this.body = body;
        // this.setAuthorID();
        const result = await insert_into_article(
            this.title, 
            this.body, 
            this.author_id,
            this.created_at, 
            this.updated_at
        );

        this.setID = Number(result.id);

        return this.toJSON();
    };

    //r
    async get(id) {
        const result = await get_article_by_id(id);

        this.setArticle(result);

        return this.toJSON();
    };

    //u
    async update(title, body) {
        this.setUpdatedAt()
        const result = await insert_into_article(title, body, this.updated_at);

        this.setArticle(result);
        return result;
    };

    //d
    async delete() {
        if (this.id === null) {
            return false;
        }
        const result = await delete_article(this.id);
        return result;
    }
};


module.exports = Article;