import { UserDocument } from '../model/user.model';
import Session, { SessionDocument } from '../model/session.model';
import { LeanDocument, FilterQuery,UpdateQuery } from 'mongoose';
import { sign, decode } from '../utils/jwt.utils';
import config from '../../config/config';
import { get } from 'lodash';
import { findUser } from './user.service';

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

    export async function reIssueAccessToken({
        refreshToken
      }: {
        refreshToken: string;
      }) {
        // decode the refresh token
        const { decoded } = decode(refreshToken);
      
        if (!decoded || !get(decoded, "_id")) return false;
      
        // get the session
        const session = await Session.findById(get(decoded, "_id"));
      
        // make sure the session is still valid
        if (!session || !session?.valid) return false;
      
        const user = await findUser({ _id: session.userId });
      
        if (!user) return false;
      
        const accessToken = createAccessToken({ user, session });
      
        return accessToken;
      }
      

export async function deleteSession(query: FilterQuery<SessionDocument>) {
    return Session.deleteOne(query);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean()
}