// should do : npm install pg-promise

const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:4854@localhost:5432/bbs_express')

module.exports = db