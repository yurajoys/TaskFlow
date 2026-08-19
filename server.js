const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());




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
    if(req.headers.authorization === "my-secret-token"){
        next();

    } else{
        res.status(401).send("Unauthorized");
    }
});
app.get("/profile", (req, res) => {


    res.send("Welcome to Profile");
});

app.listen(3009, () => {
    console.log("TaskFlow server is running on port 3008");
});