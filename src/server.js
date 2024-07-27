require("dotenv").config();
const express = require("express");
const indexRouter = require("./router");
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");

const router = express.Router();

const app = express();
const URL = process.env.DATABASE_URL;

router.get("/health-check", (req, res) => {
  res.send("true");
});


mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull"))
  .catch((err) => console.log("error in db connection", err));

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(port, () => {
  "Server is running on" + port;
});
