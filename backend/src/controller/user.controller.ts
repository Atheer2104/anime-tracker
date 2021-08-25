import { Request, Response} from "express";
import log from "../logger/logger";
import User from "../model/user.model"
import bcrypt from 'bcryptjs';
import { createUser} from '../service/user.service'
import {sign} from '../utils/jwt.utils';

export async function registerUserHandler(req: Request, res: Response) {
    try {
        // get user input from http body 
        const {first_name, last_name, email, password } = req.body;

        // check user input 
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User already exist. please login");
        }

        // encrypt user password with weak salt 
        let encryptedPassword = await bcrypt.hash(password, 10);
        
        // creating user 
        const user = await createUser(first_name, last_name, email, encryptedPassword);
        
        // create jwt token
        const token = sign(
            {user_id: user._id, email},
            {expiresIn: "2h"});
        
        // settings the user token 
        user.token = token;

        // return user was created
        res.status(201).json(user);

    } catch(error) {
        log.error(error)
    }
}

export async function loginUserHandler(req: Request, res: Response) {
    try {
        // get creditantels 
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        //check if user exits in db 
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // create jwt token
            const token = sign(
                {user_id: user._id, email},
                {expiresIn: "2h"});

            user.token = token;

            res.status(200).json(user);
        } else {
            res.status(400).json("Invalid Credentials");
        }
    } catch (error) {
        log.error(error)
    }
}