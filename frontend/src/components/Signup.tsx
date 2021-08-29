import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';

interface IProps {
    setLoggedin: (loggedin: Boolean) => void
}

const Signup: React.FC<IProps> = ({ setLoggedin }) => {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();

        if (!input.email || !input.username || !input.password) {
            alert("make sure everything is filled out");
            return
        }
        
        /*
        setUsers([
            ...users,
            {
                email: input.email,
                username: input.username,
                password: input.password
            }
        ])
        */

        await axios.post('http://localhost:3001/api/users', 
            {
                name: input.username,
                email: input.email,
                password: input.password
            })
            .then(res => {
                //console.log(res.data);
                //console.log(res.status);
                // TODO: redierect user to homepage after they have signed
                //setLoggedin(true);
                setInput({
                    email: '',
                    username: '',
                    password: ''
                })
                history.push('/login');
            })
            .catch(error => {
                console.log(error);
                alert(error);
            })
        
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
