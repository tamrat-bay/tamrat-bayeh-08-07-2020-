import bcrypt from 'bcrypt';
import User from '../models/userModel';
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";


interface UserModel {
    name: string;
    phone: string;
    email: string;
    password: string;
    type: string;
    id?: string;
  }
  

function register(req: Request, res: Response) {

    let { name, email,phone, password, type } : UserModel = req.body;
         
    if (email !== 'admin@admin.com') {
        type='user'
    }else {
        type='admin'
    }
    //check if the user exist in the db
    User.findOne({ email }, (err, user : UserModel) => {
        if (err) return res.status(400).send(err);
        if (!user) {
            //hash password
            bcrypt.hash(password, 10)
                .then((hashedPassword : string) => {
                    //create user
                    const user = new User({ name, email, type, phone, password: hashedPassword } ) ;
                    user.save()
                        .then((newUser) => res.status(201).send(newUser))
                        .catch(err => res.status(400).send(err))
                })
                .catch(err => res.status(400).send(err))

        } else {
            return res.status(400).send('User already exist');
        };
    });
};

interface LoginModel {
    email: string;
    password: string;
    type: string;
  }

function login (req: Request, res: Response) {
    const { email, password } :LoginModel = req.body;

    //check if the user exist in the db
    User.findOne({ email }, (err, user:UserModel ) => {
        if (err) return res.status(400).send(err);
        if (user) {
           
            
            const { name, id, email, type }  = user;
            //check if password is correct
            bcrypt.compare(password, user.password)
                .then(result => {
                    if (result) {
                        console.log('user resu found',result);
                        //create and assign token
                        let TOKEN_SECRET = "anythingiwant" //todo - make this an env var later
                        const token = jwt.sign({ _id: id }, TOKEN_SECRET);
                        res.header('auth-token', token).send({ name, id, type, email,token });
                    } else {
                        return res.status(403).send('incorrect password');
                    };
                })
                .catch(err => console.log(err))
        } else {
            return res.status(400).send('User not found');
        };
    })
};

//exports
export { register, login };