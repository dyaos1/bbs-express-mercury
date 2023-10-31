const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tkffkels4854',
  database: 'bbs_express'
})

const makeConnection = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        reject(err);
      } else {
        console.log('connected as id ' + connection.threadId);
        resolve();
      }
    })   
  })
}

const makeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results, fields) => {
      if (err) {
        reject(err)
      } else {
        console.log(results);
        resolve(results);
      }
    })
  })
}

const makeClose = () => {
  return new Promise((resove, reject) => {
    connection.end()
  })

}


const main = async (query) => {
  // makeConnection()
  //   .then(() => {
  //     makeQuery(query)  
  //   })
  //   .then((results) => {
  //     console.log(results);
  //   })
  //   .catch((err) => {
  //     console.error('ERROR: ', err);
  //   })
  //   .finally(() => {
  //     makeClose()
  //   })

  makeQuery(query)
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      console.error('ERROR: ', err);
    })
    // .finally(() => {
    //   makeClose()
    // })
}

module.exports = {
  makeQuery,
  makeClose,
}