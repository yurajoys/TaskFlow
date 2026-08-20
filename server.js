const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./modals/User");
const app = express();

app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/TaskFlow")
   .then(() => {
    console.log("MongoDB connected");
   })
   .catch((err) => {
    console.log("MongoDB connection error:", err);
   });

app.use((req, res, next) => {
    console.log("middleware running");
    next();
});
app.use("/test", (req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send("Data received");
});
app.get("/generate-token", (req,res) => {
    const token = jwt.sign(
        {
            userId: 101,
            role: "user"
        },
        "mysecretkey"
    );
    console.log(token);
    res.send(token);
});
app.post("/test", (req, res) => {
    console.log(req.body);
    res.send("Data received");
});



app.use("/profile", (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(401).send("Token required");
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "mysecretkey", (err, decoded) => {

        if (err) {
            return res.status(401).send("Invalid token");
        }
        
        req.user = decoded;
        next();
        
    });
});
app.get("/profile", (req, res) => {
    console.log(req.user);

    res.send(`Welcome User ${req.user.userId}`);
});

app.post("/register", async (req, res) => {
    const { Username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        Username: Username,
        email: email,
        password: hashedPassword,
        role: role

    });
});
app.listen(3009, () => {
    console.log("TaskFlow server is running on port 3009");
});