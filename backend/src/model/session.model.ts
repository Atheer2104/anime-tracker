import mongoose from 'mongoose'
import {UserDocument} from './user.model';

export interface SessionDocument extends mongoose.Document {
    userId: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
}

const SessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "user"},
    valid: {type: Boolean, default: true},
    userAgent: {type: String}
})

const Session = mongoose.model<SessionDocument>("session", SessionSchema);

export default Session;