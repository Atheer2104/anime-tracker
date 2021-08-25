import {Express, Request, Response} from 'express';
import { registerUserHandler, loginUserHandler} from './controller/user.controller';
import { verifyToken } from './middleware/auth';

export default function(app: Express) {

    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

    app.post("/register", registerUserHandler);

    app.post("/login", loginUserHandler);

    app.post("/welcome", verifyToken, (req: Request, res:Response) => res.status(200).send(req.body.user));
}

