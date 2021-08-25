import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    first_name: string | null;
    last_name: string | null;
    email: string; 
    password: string; 
    token: string;   
}

const UserShema = new mongoose.Schema({
    first_name: { type: String, default: null},
    last_name: {type: String, default: null}, 
    email: {type: String, unique: true}, 
    password: { type: String}, 
    token: { type: String} 
})

const User = mongoose.model<UserDocument>("user", UserShema);

export default User;