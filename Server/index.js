const express = require("express");
require("dotenv").config();
const route = require('./routes')
const db = require("./config/db/index");
const cors = require('cors')

const app = express();
db.connected();

// use middleware
app.use(express.json()); // Xử lý dữ liệu gửi từ code js
app.use(cors());

route(app);

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.listen(process.env.POST, () => {
  console.log(`App listening post http://localhost:${process.env.POST}`);
});
