const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const fs = require('fs');


const app = express();

app.use(cors());
app.use(bodyParser.json());
//app.use(express.urlencoded({urlencoded: true}));

const dbConfig = require("./config/database.config");
mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch(err => {
    console.log(err);
    process.exit();
  });

require("./app/routes/routes.config")(app);

app.get("/", (req, res) => {
  res.json({ message: "success" });
});


app.get("/jwt", (req, res) => {
    let privateKey = fs.readFileSync('./private.pem','utf8');
    let jToken = jwt.sign({"body": "stuff"},privateKey,{algorithm: 'HS256'});
    res.send(jToken);
  });



app.listen(3000, () => {
  console.log("Running at port 3000");
});
