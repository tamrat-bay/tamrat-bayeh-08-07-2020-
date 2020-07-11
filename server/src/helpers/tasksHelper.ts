import Task from "../models/taskModel";
import { Request, Response } from "express";

interface TaskModel {
  date: string;
  name: string;
  phone: string;
  email: string;
  description: string;
}


//!Before deploy check if req/res is needed
const getTaskHelper = (req: Request, res: Response) => {
  Task.find({})
    .then((tasks) => res.status(201).send(tasks))
    .catch((err) => res.status(404).send(err));
};

const postTaskHelper = (req: Request, res: Response) => {
  let { date, name, phone, email, description }: TaskModel = req.body;
  Task.create({
    date,
    name,
    phone,
    email,
    description,
  })
    .then((task) => res.status(201).send(task))
    .catch((err) => res.status(400).send(err));
};

const editTaskHelper = (req: Request, res: Response) => {
  let newTask: TaskModel = req.body;
  const id: string = req.params.id;

  Task.findByIdAndUpdate(id, newTask, { new: true })
    .then((task) => res.status(200).send(task))
    .catch((err) => res.status(400).send(err));
};

const deleteTaskHelper = (req: Request, res: Response) => {
  const id: string = req.params.id;

  Task.findByIdAndDelete(id)
    .then((task) => res.status(200).send("Task was deleted"))
    .catch((err) => res.status(400).send(err));
};

export { postTaskHelper, getTaskHelper, editTaskHelper, deleteTaskHelper };
