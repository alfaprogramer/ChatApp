const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");



const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

mongoose
    .connect("mongodb+srv://adsha615:chatapp@61724@cluster0.vqneqn9.mongodb.net/")
    .then(() => {
    console.log("connected to mongodb");
    })
    .catch(error => {
        console.log("Error connecting to mongodb");
    });


app.listen(port, () => {
    console.log("server runnning on 8000");
})