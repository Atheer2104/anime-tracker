import { Request, Response } from "express";
import log from "../logger/logger";
import User from "../model/user.model"
import { createUser, findUser } from '../service/user.service'

export async function registerUserHandler(req: Request, res: Response) {
    try {
        // get user input from http body 
        const {name, email, password } = req.body;

        // check user input 
        if (!(email && password && name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await findUser({ email });

        if (oldUser) {
            return res.status(409).send("User already exist. please login");
        }
        
        // creating user 
        const user = await createUser(name, email, password);

        // return user was created
        res.status(201).json(user);

    } catch(error) {
        log.error(error)
    }
}
