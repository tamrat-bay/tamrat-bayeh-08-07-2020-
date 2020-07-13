import Task from "../models/taskModel";
import { Request, Response } from "express";
import User from "../models/userModel";
import Joi from "joi";
import { UserModel } from "./authHelper";

export interface TaskModel {
  date: string;
  description: string;
  email: string;
  name: string;
  phone: string;
}

//!Before deploy check if req/res is needed
const getTaskHelper = (req: Request, res: Response) => {
  const userId: string = req.params.userId;

  User.findOne({ _id: userId }, function (err: any, user: UserModel) {
    if (user.type === "admin") {
      Task.find({})
        .then((tasks) => res.status(200).send(tasks))
        .catch((err) => res.status(404).send(err));
    } else {
      User.findOne({ _id: userId })
        .populate("tasks")
        .exec(function (err: any, user: UserModel) {
          if (err) return res.status(500).send(`server problem - ${err}`);
          return res.status(200).send(user.tasks);
        });
    }
  });
};

const postTaskHelper = (req: Request, res: Response) => {
  const userId: string = req.params.userId;
  const { error } = taskValidation(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  let { date, description, name, email, phone }: TaskModel = req.body;
  Task.create(
    {
      date,
      email,
      name,
      phone,
      description,
    },
    function (err: any, task: TaskModel) {
      if (err) return res.status(500).send(`server problem - ${err}`);
      User.findOne({ _id: userId }, function (err, user: UserModel) {
        if (err) return res.status(404).send(err);
        user.tasks.push(task);
        user.save(function (err: any) {
          if (err) return res.status(500).send(`server problem - ${err}`);
          return res.status(201).send(task);
        });
      });
    }
  );
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

// ! Validation
function taskValidation(task: TaskModel) {
  let schema = Joi.object({
    description: Joi.string().min(1).max(200).required(),
    name: Joi.string().min(1).required(),
    email: Joi.string().email(),
    phone: Joi.string().length(10).required(),
    date: Joi.string().required(),
    _id: Joi.optional(),
  });
  return schema.validate(task);
}

export { postTaskHelper, getTaskHelper, editTaskHelper, deleteTaskHelper };
