import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import {
  postTaskHelper,
  getTaskHelper,
  editTaskHelper,
  deleteTaskHelper
} from "./helpers/tasksHelper";

const app: Application = express();
const Port: number = 5000;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/propit-task", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));



app.get("/tasks", (req: Request, res: Response) => {
  getTaskHelper(req, res);
});

app.post("/tasks", (req: Request, res: Response) => {
  return postTaskHelper(req, res);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  return editTaskHelper(req, res);
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  return deleteTaskHelper(req, res);
});


app.listen(Port, () => console.log(`Server is listening on port ${Port}`));
