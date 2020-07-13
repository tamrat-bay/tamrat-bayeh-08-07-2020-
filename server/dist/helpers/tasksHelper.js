"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskHelper = exports.editTaskHelper = exports.getTaskHelper = exports.postTaskHelper = void 0;
const taskModel_1 = __importDefault(require("../models/taskModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const joi_1 = __importDefault(require("joi"));
//!Before deploy check if req/res is needed
const getTaskHelper = (req, res) => {
    const userId = req.params.userId;
    userModel_1.default.findOne({ _id: userId }, function (err, user) {
        if (user.type === "admin") {
            taskModel_1.default.find({})
                .then((tasks) => res.status(200).send(tasks))
                .catch((err) => res.status(404).send(err));
        }
        else {
            userModel_1.default.findOne({ _id: userId })
                .populate("tasks")
                .exec(function (err, user) {
                if (err)
                    return res.status(500).send(`server problem - ${err}`);
                return res.status(200).send(user.tasks);
            });
        }
    });
};
exports.getTaskHelper = getTaskHelper;
const postTaskHelper = (req, res) => {
    const userId = req.params.userId;
    const { error } = taskValidation(req.body);
    if (error) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }
    let { date, description, name, email, phone } = req.body;
    taskModel_1.default.create({
        date,
        email,
        name,
        phone,
        description,
    }, function (err, task) {
        if (err)
            return res.status(500).send(`server problem - ${err}`);
        userModel_1.default.findOne({ _id: userId }, function (err, user) {
            if (err)
                return res.status(404).send(err);
            user.tasks.push(task);
            user.save(function (err) {
                if (err)
                    return res.status(500).send(`server problem - ${err}`);
                return res.status(201).send(task);
            });
        });
    });
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
// ! Validation
function taskValidation(task) {
    let schema = joi_1.default.object({
        description: joi_1.default.string().min(1).max(200).required(),
        name: joi_1.default.string().min(1).required(),
        email: joi_1.default.string().email(),
        phone: joi_1.default.string().length(10).required(),
        date: joi_1.default.string().required(),
        _id: joi_1.default.optional(),
    });
    return schema.validate(task);
}
