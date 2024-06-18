const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");



const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");

mongoose
    .connect("mongodb+srv://adsha615:chatapp@cluster0.vqneqn9.mongodb.net/")
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch(error => {
        console.error(error);
    });


app.listen(port, () => {
    console.log("server runnning on 8000");
});



const User = require("./models/user");
const Message = require("./models/message");


app.post("/register", async(req, res) => {
    const { name, email, password, image } = req.body;

    const newUser = new User({ name, email, password, image });

    newUser.save().then(() => {
        res.status(200).json({ message: "User registered succesfully" })
    }).catch((error) => {
        console.error(error);
        res.status(500).json({ message: "error registering the user " })
    });
});



app.post("/login", async(req,res)=>{
    try{
       
        const {email, password}= req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({ message: "invalid email"});
        }

        if(user.password !== password){
            return res.status(401).json({ message:"invalid password"});
        }

        const secretKey= crypto.randomBytes(32).toString('hex');

        const token = jwt.sign({userId: user_id}, secretKey) ;
        res.status(200).json({token});
    }catch(error){
        console.log("error login in ", error);
        res.status(500).json({message:"error logging in"})
    }
});