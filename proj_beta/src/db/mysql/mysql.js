const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tkffkels4854',
    database: 'bbs_express'
})

const main = () => {
    connection.connect()

    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
      if (err) throw err
    
      console.log('The solution is: ', rows[0].solution)
    })
    
    connection.end()
}

module.exports = main
