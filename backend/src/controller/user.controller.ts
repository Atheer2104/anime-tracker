import { Request, Response, NextFunction} from "express";
import log from "../logger/logger";
import User from "../model/user.model"
import { createUser, findUser } from '../service/user.service'

export const registerUserHandler = async (req: Request, res: Response, next: NextFunction) => {
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

        // set user info to body 
        req.body = user;

        return next();

    } catch(error) {
        log.error(error)
    }
}
