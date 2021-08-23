import React from 'react'
import { useState } from 'react'
import { Users } from "../App";
import { useHistory } from 'react-router-dom';

interface IProps {
    users: Users['users'],
    setUsers: (user: Users['users']) => void,
    setLoggedin: (loggedin: Boolean) => void
}

const Signup: React.FC<IProps> = ({ users, setUsers, setLoggedin }) => {
    const history = useHistory();
    const [input, setInput] = useState({
        email: "",
        username: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();

        if (!input.email || !input.username || !input.password) {
            alert("make sure everything is filled out");
            return
        }

        setUsers([
            ...users,
            {
                email: input.email,
                username: input.username,
                password: input.password
            }
        ])

        setInput({
            email: '',
            username: '',
            password: ''
        })
        setLoggedin(true);
        history.push('/');
        // TODO: redierect user to homepage after they have signed
    }


    return (
        <form onSubmit={handleSubmit}>
            <ul>
            <li>
                <label>Email</label>
                <input type='email' placeholder='Enter email' name='email' value={input.email} onChange={handleChange} />
            </li>
            <li>
                <label>Username</label>
                <input type='text' placeholder='Enter username' name='username' value={input.username} onChange={handleChange}/>
            </li>
            <li>
                <label>password</label>
                <input type='password' placeholder='Enter password' name='password' value={input.password} onChange={handleChange}/>
            </li>

            <li>
                <input type='submit' value='Signup'/>
            </li>
            </ul>
        </form>
    )
}

export default Signup
