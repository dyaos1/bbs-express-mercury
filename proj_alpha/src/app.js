const express = require('express');
const app = express();
const port = 3000;
const api = require('./routes/index');
const path = require('path');

app.use('/api', api);



app.get('/', (req, res) => {
  // res.sendFile(path.resolve(__dirname+'/../documents/info.html'));
  res.sendFile('info.html', {'root': './documents/'});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});