import { FilterQuery } from "mongoose";
import User, { UserDocument } from "../model/user.model";

export async function createUser(name:string, email: string, password:string) {
    try {
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password
        })

        return user;
    } catch (error) {
        throw new Error(error);
    }
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return await User.findOne(query);
}

export async function validatePassword({
    email, 
    password
    } : {
    email: UserDocument["email"];
    password: string;    
    }) {
        const user = await User.findOne({ email });

        if (!user) return false;

        const valid = user.comparePassword(password);

        if (!valid) return false;

        return user.toJSON();
    }
