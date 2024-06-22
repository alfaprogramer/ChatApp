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




app.get("/users/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const users = await User.find({ _id: { $ne: userId } });
        res.json(users);

    } catch (error) {
        console.log("Error", error);
    }
});



app.post("/sendrequest", async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    console.log(senderId);
    console.log(receiverId);
    console.log(message);
    const receiver = await User.findById(receiverId);
    if (!receiver) {
        return res.status(404).json({ message: "Receiver not found" });

    }

    receiver.requests.push({ from: senderId, message });
    await receiver.save();

    res.status(200).json({ message: "Request is been send " });


});


app.get("/getrequests/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate(
            "requests.from", 
            "name email image"
        );

        if (user) {
            res.json(user.requests)
        } else {
            res.status(400);
            throw new Error("User not found");
        }
    } catch (error) {
        console.log("error", error)
    }
});



app.post("/acceptrequest", async (req, res) => {
    try {
        const { userId, requestId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull: { requests: { from: requestId } }
        }, { new: true },
        );

        if(!updatedUser){
            return res.stutus(404).json({message:"Request not found "})
        }

        await User.findByIdAndUpdate(userId,{
            $push:{friends:requestId},
        });

        const friendUser = await User.findByIdAndUpdate(requestId,{
            $push: {friends:userId}
        });

        if(!friendUser){
            return res.status(404).json({message:"Friend not found "})
        }

        res.status(200).json({message:"Request accepted successfully"})

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: "Server Error" });
    }
});





app.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const users = await User.findById(userId).populate(
        'friends',
        'name email image',
      );
  
      res.json(users.friends);
    } catch (error) {
      console.log('Error fetching user', error);
    }
  });



  const http = require('http').createServer(app);  
  const io = require('socket.io')(http);
  
  const userSocketMap = {};
  
  io.on('connection', socket => {
    console.log('a user is connected', socket.id);
  
    const userId = socket.handshake.query.userId;
  
    if (userId && userId !== 'undefined') {
      userSocketMap[userId] = socket.id;
      console.log('user connected:', userId);
    } else {
      console.log('Invalid userId:', userId);
    }
  
    console.log('user socket data', userSocketMap);
  
    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
      Object.keys(userSocketMap).forEach(key => {
        if (userSocketMap[key] === socket.id) {
          delete userSocketMap[key];
        }
      });
      console.log('updated user socket data', userSocketMap);
    });
  
    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
      const receiverSocketId = userSocketMap[receiverId];
      console.log('receiver Id', receiverId);
  
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newMessage', {
          senderId,
          message,
          timeStamp: new Date().toISOString(),
        });
      } else {
        console.log('Receiver socket ID not found for', receiverId);
      }
    });
  });
  
  http.listen(3000, () => {
    console.log('Socket.IO running on port 3000');
  });
  
  app.post('/sendMessage', async (req, res) => {
    try {
      const { senderId, receiverId, message } = req.body;
  
      const newMessage = new Message({
        senderId,
        receiverId,
        message,
      });
  
      await newMessage.save();
  
      const receiverSocketId = userSocketMap[receiverId];
  
      if (receiverSocketId) {
        console.log('emitting newMessage event to the receiver', receiverId);
        io.to(receiverSocketId).emit('newMessage', newMessage);
      } else {
        console.log('Receiver socket ID not found');
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log('ERROR', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/messages', async (req, res) => {
    try {
      const { senderId, receiverId } = req.query;
  
      const messages = await Message.find({
        $or: [
          { senderId: senderId, receiverId: receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      }).populate('senderId', '_id name');
  
      res.status(200).json(messages);
    } catch (error) {
      console.log('Error', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });