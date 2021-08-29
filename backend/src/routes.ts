import {Express, Request, Response} from 'express';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler} from './controller/session.controller';
import { registerUserHandler} from './controller/user.controller';
import { verifyToken } from './middleware/auth';
import { requiresUser } from './middleware/requiresUser';

export default function(app: Express) {

    app.get('/api/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    // create user 
    app.post("/api/users", registerUserHandler);

    // user sign in via this to create a session 
    app.post("/api/sessions", createUserSessionHandler);

    // logout the user 
    app.delete("/api/sessions" ,requiresUser, invalidateUserSessionHandler);

    // get all user sessions 
    app.get("/api/sessions", requiresUser, getUserSessionsHandler);
    
}

