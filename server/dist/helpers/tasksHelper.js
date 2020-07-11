"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskHelper = exports.editTaskHelper = exports.getTaskHelper = exports.postTaskHelper = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
//!Before deploy check if req/res is needed
const getTaskHelper = (req, res) => {
    taskModel_1.default.find({})
        .then((tasks) => res.status(201).send(tasks))
        .catch((err) => res.status(404).send(err));
};
exports.getTaskHelper = getTaskHelper;
const postTaskHelper = (req, res) => {
    let { date, name, phone, email, description } = req.body;
    taskModel_1.default.create({
        date,
        name,
        phone,
        email,
        description,
    })
        .then((task) => res.status(201).send(task))
        .catch((err) => res.status(400).send(err));
};
exports.postTaskHelper = postTaskHelper;
const editTaskHelper = (req, res) => {
    let newTask = req.body;
    const id = req.params.id;
    taskModel_1.default.findByIdAndUpdate(id, newTask, { new: true })
        .then((task) => res.status(200).send(task))
        .catch((err) => res.status(400).send(err));
};
exports.editTaskHelper = editTaskHelper;
const deleteTaskHelper = (req, res) => {
    const id = req.params.id;
    taskModel_1.default.findByIdAndDelete(id)
        .then((task) => res.status(200).send("Task was deleted"))
        .catch((err) => res.status(400).send(err));
};
exports.deleteTaskHelper = deleteTaskHelper;
