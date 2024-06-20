const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose
    .connect("mongodb+srv://adsha615:chatapp@cluster0.vqneqn9.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.error(error);
    });

// Models
const User = require("./models/user");
const Message = require("./models/message");

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Registration endpoint
app.post("/register", async (req, res) => {
    const { name, email, password, image } = req.body;

    const newUser = new User({ name, email, password, image });

    newUser.save()
        .then(() => {
            res.status(200).json({ message: "User registered successfully" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: "Error registering the user" });
        });
});

// Login endpoint
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const secretKey = crypto.randomBytes(32).toString('hex');
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.status(200).json({ token });
    } catch (error) {
        console.log("Error logging in", error);
        res.status(500).json({ message: "Error logging in" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});