const express = require("express");
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MongoDB_url;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const routes = require("./routes");

app.use("/", routes);

mongoose.connect(url, (err) => {
    if(err) {
        console.log(err);
    }
    else { 
        console.log('connected to database successfully')
    }
});

const PORT = process.env.PORT || 4000;

module.exports = app.listen(PORT, () => {
    console.log("start")
});