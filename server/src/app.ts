import express, { Application, Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";
import verifyToken from "./helpers/verifyToken";
import { register, login } from "./helpers/authHelper";
import {
  postTaskHelper,
  getTaskHelper,
  editTaskHelper,
  deleteTaskHelper,
} from "./helpers/tasksHelper";

const app: Application = express();
const Port: number | string = process.env.PORT || 5000;
const MongoURI: string = "mongo"


app.use(express.json());

mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDb is Connected"))
  .catch((err) => console.log(err));

//Authentication
app.post("/users/register", (req: Request, res: Response) => {
  return register(req, res);
});

app.post("/users/login", (req: Request, res: Response) => {
  return login(req, res);
});

app.get("/tasks/:userId", verifyToken, (req: Request, res: Response) => {
  return getTaskHelper(req, res);
});

app.post("/tasks/:userId", verifyToken, (req: Request, res: Response) => {
  return postTaskHelper(req, res);
});

app.put("/tasks/:id", verifyToken, (req: Request, res: Response) => {
  return editTaskHelper(req, res);
});

app.delete("/tasks/:id", verifyToken, (req: Request, res: Response) => {
  return deleteTaskHelper(req, res);
});

if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "..", "..", "client", "build");
  app.use(express.static(buildPath));
  // --- handle unknown route
  app.get("*", (req: Request, res: Response) => {
    const indexHtmlPath = path.join(buildPath, "index.html");
    res.sendFile(indexHtmlPath);
  });
} else {
  console.log("development mode");
}

app.listen(Port, () => console.log(`Server is listening on port ${Port}`));
