import { UserDocument } from '../model/user.model';
import Session, { SessionDocument } from '../model/session.model';
import { LeanDocument } from 'mongoose';
import { sign } from '../utils/jwt.utils';
import config from '../../config/config';

export async function createSession(userId: string, userAgent: string) {
   const session = await Session.create({userId, userAgent});

   return session.toJSON();
}

export async function createAccessToken({
    user,
    session    
    } : {
        user: 
            | UserDocument
            | LeanDocument<UserDocument>;
        session: 
            | SessionDocument
            | LeanDocument<SessionDocument>;

    }) {
        const accessToken = sign(
            // payload is object with user not we have in this case the password here
            // with session id 
            {...user, session: session._id},
            {expiresIn: config.access_token_expires_in});

        return accessToken;
    }