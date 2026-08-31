const express = require("express");
const Task = require("../modals/Task");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
router.post("/", authMiddleware, async (req, res) => {
 const { title, description, status}= req.body;
 const task = await Task.create({
    title,
    description,
    status, 
    userId: req.user.userId
 });

 res.status(201).json({
    message: "Task created successfully",
    task
 });
});