import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string; 
    password: string; 
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

const UserShema = new mongoose.Schema({
    name: { type: String, required: true},
    email: {type: String, unique: true, reuired: true,}, 
    password: { type: String, required: true}, 
})

UserShema.pre('save', async function(next: mongoose.HookNextFunction) {
    let user = this as UserDocument;
    
    // we are hashing only if passowrd is not modified or is new 
    if (!user.isModified("password")) return next();

    // salt work factor
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(user.password, salt);

    user.password = hashPassword;

    return next();
})

UserShema.methods.comparePassword = async function(candidatePassword: string) {
    const user = this as UserDocument;

    return await bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

const User = mongoose.model<UserDocument>("user", UserShema);

export default User;