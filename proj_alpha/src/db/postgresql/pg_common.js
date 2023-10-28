const db = require('./postgres')

async function get_count_table(table_name) {
    const result_value = await db.one(`SELECT COUNT(*) FROM $1:name`, [table_name])
    .then((result) => {
        return result
    })
    .catch((e) => {
        console.log(`error: ${e}`)
    })
    return result_value.count
}

module.exports = {
    get_count_table
}