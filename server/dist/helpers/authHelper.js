"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function register(req, res) {
    let { name, email, phone, password, type } = req.body;
    if (email !== 'admin@admin.com') {
        type = 'user';
    }
    else {
        type = 'admin';
    }
    //check if the user exist in the db
    userModel_1.default.findOne({ email }, (err, user) => {
        if (err)
            return res.status(400).send(err);
        if (!user) {
            //hash password
            bcrypt_1.default.hash(password, 10)
                .then((hashedPassword) => {
                //create user
                const user = new userModel_1.default({ name, email, type, phone, password: hashedPassword });
                user.save()
                    .then((newUser) => res.status(201).send(newUser))
                    .catch(err => res.status(400).send(err));
            })
                .catch(err => res.status(400).send(err));
        }
        else {
            return res.status(400).send('User already exist');
        }
        ;
    });
}
exports.register = register;
;
function login(req, res) {
    const { email, password } = req.body;
    //check if the user exist in the db
    userModel_1.default.findOne({ email }, (err, user) => {
        if (err)
            return res.status(400).send(err);
        if (user) {
            const { name, id, email, type } = user;
            //check if password is correct
            bcrypt_1.default.compare(password, user.password)
                .then(result => {
                if (result) {
                    //create and assign token
                    let TOKEN_SECRET = "anythingiwant"; //todo - make this an env var later
                    const token = jsonwebtoken_1.default.sign({ _id: id }, TOKEN_SECRET);
                    res.header('auth-token', token).send({ name, id, type, email, token });
                }
                else {
                    return res.status(403).send('incorrect password');
                }
                ;
            })
                .catch(err => console.log(err));
        }
        else {
            return res.status(400).send('User not found');
        }
        ;
    });
}
exports.login = login;
;
