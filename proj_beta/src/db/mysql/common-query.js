const { makeConnection, makeQuery, makeClose } = require('./mysql-promise');

const get_count = async (table) => {
    try {
        var result = await makeConnection();
        console.log('start get_count connection');
    } catch (err) {
        console.error(err);
    }

    try {
        var result_value = await makeQuery({
            sql: 'SELECT COUNT(*) FROM ??;',
            timeout: 40000, // 40s
            values: [table]
        }, 
            function (error, results, fields) {
                
            }
        );
        console.log('start get_count query');
    } catch (err) {
        console.error(err)
    }

    // try {
    //     var result = await makeClose();
    //     console.log(result);
    // } catch (err) {
    //     console.error(err);
    // }

    return result_value;
}

module.exports = {
    get_count,
}