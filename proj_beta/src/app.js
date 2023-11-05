const express = require('express')
const app = express()
const port = 3000

const api = require('./service/index')
const data_init = require('../mock/mockaroo');

// ...

app.use('/api', api)

app.get('/', (req, res) => {
  res.sendFile('게시판 만들기 #2.html', {'root': './documents/'});
})

app.get('/dbinit', async (req, res) => {
  await data_init();
  res.send('data init')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})