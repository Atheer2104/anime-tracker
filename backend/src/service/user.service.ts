import User from "../model/user.model";

export async function createUser(first_name: string, last_name:string, email: string, password: string) {
    try {
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password
        })

        return user;
    } catch (error) {
        throw new Error(error);
    }
}
