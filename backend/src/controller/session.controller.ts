import {Request, Response} from 'express';
import { validatePassword } from '../service/user.service';
import { createAccessToken, createSession, deleteSession, findSessions} from '../service/session.service';
import { sign } from '../utils/jwt.utils';
import config from '../../config/config';
import { get } from 'lodash';


export async function createUserSessionHandler(req: Request, res: Response) {
    // validate user 
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid username or password");
    }

    // create a session 
    const session = await createSession(user._id, req.get("user-agent") || "");

    // creata token
    const accessToken = await createAccessToken({ user, session });

    // create refreshToken
    const refreshToken = sign(session, {expiresIn: config.refresh_token_expires_in});

    // sending back access & refresh Token
    res.send({ accessToken, refreshToken })
}


export async function invalidateUserSessionHandler(req: Request, res: Response) {
    const sessionId = get(req, "user.session");

    await deleteSession({ _id: sessionId});

    return res.sendStatus(200); 
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");

    const sessions = await findSessions({ userId, valid: true});

    return res.send(sessions);
}