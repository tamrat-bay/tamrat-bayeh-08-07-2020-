import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { TaskModel } from "./tasksHelper";
import Joi from "joi";

export interface UserModel {
  [x: string]: any;
  name: string;
  phone: string;
  email: string;
  password: string;
  type: string;
  tasks: TaskModel[];
  id?: string;
}

function register(req: Request, res: Response) {
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { name, email, phone, password, type }: UserModel = req.body;
  if (email === "admin@admin.com") {
    type = "admin";
  } else {
    type = "user";
  }
  //check if the user exist in the db
  User.findOne({ email }, (err, user: UserModel) => {
    if (err) return res.status(400).send(err);
    if (!user) {
      //hash password
      bcrypt
        .hash(password, 10)
        .then((hashedPassword: string) => {
          //create user
          const user = new User({
            name,
            email,
            type,
            phone,
            password: hashedPassword,
          });
          user
            .save()
            .then((newUser) => res.status(201).send(newUser))
            .catch((err) => res.status(400).send(err));
        })
        .catch((err) => res.status(400).send(err));
    } else {
      return res.status(400).send("User already exist");
    }
  });
}

interface LoginModel {
  email: string;
  password: string;
  type: string;
}

function login(req: Request, res: Response) {
  const { email, password }: LoginModel = req.body;

  //check if the user exist in the db
  User.findOne({ email }, (err, user: UserModel) => {
    if (err) return res.status(400).send(err);
    if (user) {
      const { name, id, email, type, phone } = user;
      //check if password is correct
      bcrypt
        .compare(password, user.password)
        .then((result) => {
          if (result) {
            //create and assign token
            let TOKEN_SECRET = "anythingiwant"; //todo - make this an env var later
            const token = jwt.sign({ _id: id }, TOKEN_SECRET);
            res
              .header("auth-token", token)
              .send({ name, id, type, email, token, phone });
          } else {
            return res.status(403).send("incorrect password");
          }
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(400).send("User not found");
    }
  });
}

function userValidation(user: TaskModel) {
  let schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(2).required(),
    phone: Joi.string().length(10).required(),
  });
  return schema.validate(user);
}

export { register, login };
