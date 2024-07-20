require('dotenv').config();
const express = require("express");
const indexRouter = require("./router");
const mongoose = require("mongoose");
var cors = require('cors')


const app = express();
const ulri =process.env.DATABASE_URL

mongoose
  .connect(ulri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err) => console.log("error in db connection", err));

const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(port, () => {
  "Server is running on" + port;
});
