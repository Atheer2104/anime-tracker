import React from 'react';
import { Link } from 'react-router-dom';


interface IProps {
    loggedIn: Boolean
}

// TODO: when placing logo here make sure when it is clicked it returns to homepage
const Header:React.FC<IProps> = ({ loggedIn }) => {
    const userNotSignedIn = ():JSX.Element => {
        return (
            <div>
                <Link to="/Login" >Login</Link>
                <Link to="/Signup" id='signupLink'>Signup</Link>
            </div>
        )
    }

    const userSignedIn = (): JSX.Element => {
        return (
            <div>
                <Link to="/Browselist" >Browse List</Link>
                <div></div>
            </div>
        )
    }
    
    return (
        <header>
            <Link to='/'>
            <div className="divImg"></div>
            </Link>
            <div></div>
            <div></div>
            {loggedIn ? userSignedIn() : userNotSignedIn()}
        </header>
    )
}

export default Header;
