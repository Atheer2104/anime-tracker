import {Express, Request, Response} from 'express';
import { createUserSessionHandler } from './controller/session.controller';
import { registerUserHandler} from './controller/user.controller';
import { verifyToken } from './middleware/auth';

export default function(app: Express) {

    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    // create user 
    app.post("/api/users", registerUserHandler);

    // user sign in via this to create a session 
    app.post("/api/session", createUserSessionHandler);

}

