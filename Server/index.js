const express = require('express')
require('dotenv').config()
const router = express.Router

const app = express()

router(app)

app.get('/',(req, res)=>{
    res.send('Welcome')
})
app.listen(process.env.POST, () => {
    console.log(`App listening post http://localhost:${process.env.POST}`)
  })