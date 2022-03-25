const express = require('express')
const path = require('path');
const app = express()
const port = 3000


app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(express.static(path.resolve(__dirname, 'dist', 'public')))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
