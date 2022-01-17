import session from 'express-session';
import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import * as redis from 'redis';

let redisStore = require('connect-redis')(session)
const portRedis = process.env.PORT_REDIS || '6379';

const redisClient = redis.createClient({legacyMode: true});

const connect = async() => {
    await redisClient.connect();
}

connect();

// const set = async() => {
//     await redisClient.set("salim", "1234");
// }

// set();


const oneDay = 1000 * 60 * 60 * 24;
var sessionMiddleware = session({
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient}),
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