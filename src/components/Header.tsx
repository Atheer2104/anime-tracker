import React from 'react';
import { Link } from 'react-router-dom';

// TODO: when placing logo here make sure when it is clicked it returns to homepage
const Header:React.FC = () => {
    return (
        <header>
            <Link to='/'>
            <div className="divImg"></div>
            </Link>
            <div></div>
            <div></div>
            <div>
                <Link to="/Login" >Login</Link>
                <Link to="/Signup" id='signupLink'>Signup</Link>
            </div>
        </header>
    )
}

export default Header;
