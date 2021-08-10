import React from 'react'
import { useState } from 'react'
import { Users } from "../App";

interface LoginUser {
    username: string,
    password: string
}

interface IProps {
    users: Users['users']
}

const Login: React.FC<IProps> = ({ users }) => {
    const [input, setInput] = useState<LoginUser>({
        username: '',
        password: '',
    })

    // TODO: refactor for later duplicate code in login and signup
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();

        if (!input.username || !input.password) {
            alert("make sure everything is filled out");
            return
        }

        if (users.map((user) => user.username === input.username).includes(true)) {
            alert('logged in');
            setInput({
                username: '',
                password: '',
            })
            return
        } else {
            alert('user not found');    

            return
        }

        // TODO: redierect user to homepage after they have signed
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <ul>
            <li>
                <label>Username</label>
                <input type='text' placeholder='Enter username' name='username' value={input.username} onChange={handleChange} />
            </li>
            <li>
                <label>password</label>
                <input type='password' placeholder='Enter password' name='password' value={input.password} onChange={handleChange}/>
            </li>
            <li>
                <input type='submit' value='Login' />
            </li>
            </ul>
        </form>
        </div>
    )
}

export default Login
