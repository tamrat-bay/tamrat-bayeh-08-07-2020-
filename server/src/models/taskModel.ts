import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  date: String,
  email: String,
  name: String,
  phone: String,
  description: String,
});

const Task = mongoose.model("task", taskSchema);

export default Task;
