import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    date: String,
    name: String,
    phone: String,
    email: String,
    description: String
});

const Task = mongoose.model('task', taskSchema);

export default Task;