const express = require('express')
const app = express()
const port = 3000

const api = require('./service/index')

// ...

app.use('/api', api)

app.get('/', (req, res) => {
  res.sendFile('게시판 만들기 #2.html', {'root': './documents/'});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})