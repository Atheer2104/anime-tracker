import React from 'react'

const Login: React.FC = () => {
    return (
        <div>
            <form>
            <ul>
            <li>
                <label>Username</label>
                <input type='text' placeholder='Enter username' value='' />
            </li>
            <li>
                <label>password</label>
                <input type='password' placeholder='Enter password' value='' />
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
