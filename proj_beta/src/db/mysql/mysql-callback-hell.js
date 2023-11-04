const mysql = require('mysql')

async function queryExecutor(query) {
    let result_value;

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tkffkels4854',
        database: 'bbs_express'
    })
    
    connection.connect((err) => {
        if (err) {
            console.error('Connection Error:', err);
            return;
        }
        console.log('connected as id ' + connection.threadId);
        
        connection.query(query, (err, results, fields) => {
            if (err) {
                console.error('Query Error:', err);
                return;
            }

            console.log('Query Results:', results);
            result_value = results;

            connection.end();
        });
    })

    return result_value;
}

module.exports = queryExecutor;

// connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
//     if (err) throw err
    
//     console.log('The solution is: ', rows[0].solution)
// })