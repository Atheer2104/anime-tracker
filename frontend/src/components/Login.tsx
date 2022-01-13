import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface LoginUser {
    email: string,
    password: string
}

interface IProps {
    setLoggedin: (loggedin: Boolean) => void
}

const Login: React.FC<IProps> = ({ setLoggedin}) => {
    const history = useHistory();
    const [input, setInput] = useState<LoginUser>({
        email: '',
        password: '',
    })

    // TODO: refactor for later duplicate code in login and signup
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();

        if (!input.email || !input.password) {
            alert("make sure everything is filled out");
            return
        }

        await axios.post('http://localhost:3001/api/sessions',
            {
                email: input.email,
                password: input.password
            },{withCredentials: true})
            .then(res => {
                //console.log(res.data);
                // TODO: redierect user to homepage after they have signed
                setLoggedin(true);
                history.push('/');
            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
            <ul>
            <li>
                <label>Email</label>
                <input type='email' placeholder='Enter Email' name='email' value={input.email} onChange={handleChange} />
            </li>
            <li>
                <label>Password</label>
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
