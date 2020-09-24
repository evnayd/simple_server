const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')


app.get('/', (req, res) => {
    fs.readFile('./users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    res.json(users);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})