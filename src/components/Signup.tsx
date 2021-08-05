import React from 'react'

const Signup: React.FC = () => {
    return (
        <form>
            <ul>
            <li>
                <label>Email</label>
                <input type='email' placeholder='Enter email' value='' />
            </li>
            <li>
                <label>Username</label>
                <input type='text' placeholder='Enter username' value='' />
            </li>
            <li>
                <label>password</label>
                <input type='password' placeholder='Enter password' value='' />
            </li>

            <li>
                <input type='submit' value='Signup' />
            </li>
            </ul>
        </form>
    )
}

export default Signup
