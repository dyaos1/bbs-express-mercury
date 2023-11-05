const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'host.docker.internal',
  port: '3308',
  user: 'root',
  password: 'pass123#',
  database: 'bbs_express'
})

const makeConnection = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        // console.error('error connecting: ' + err.stack);
        reject(err);
      } else {
        // console.log('connected as id ' + connection.threadId);
        resolve(connection.threadId);
      }
    })   
    if (true) {
      resolve('hi');
    } else {
      reject();
    }
  })
}


const makeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        // console.log(results);
        // console.log(fields);
        resolve(results);
      }
    })
  })
}


const makeClose = () => {
  return new Promise((resolve, reject) => {
    connection.end((err) => {
      if (err) {
        reject(err);
      } else {
        resolve('connection closed successfully');
      }
    });
  })
}


module.exports = {
  makeConnection,
  makeQuery,
  makeClose,
}