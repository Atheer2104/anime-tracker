import session from 'express-session';
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';

const oneDay = 1000 * 60 * 60 * 24;
var sessionMiddleware = session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay, }
});

export const sessionHandler = (req: Request, res: Response, next: NextFunction ) => {
    sessionMiddleware(req, res, next);
}

export const sessionAlreadyExists = (req: Request, res: Response) => {
    const user = get(req, "user");

    if (user) {
        return res.status(200).send("Session already exist");
    }

    return res.status(403).send("Session does not exists");
}