import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface IProps {
    loggedIn: Boolean,
    accessToken: string, 
    refreshToken: string, 
}

const Header:React.FC<IProps> = ({ loggedIn, accessToken, refreshToken }) => {
    const history = useHistory();
    const userNotSignedIn = ():JSX.Element => {
        return (
            <div>
                <Link to="/Login" >Login</Link>
                <Link to="/Signup" id='signupLink'>Signup</Link>
            </div>
        )
    }

    const signUserOut = async(): Promise<void> => {
        axios.delete('http://localhost:3001/api/sessions', {
            headers: {
                'x-refresh': `${refreshToken}`,
                'authorization': `${accessToken}`
            }
        })
        .then(res => {
            console.log(res.data);
            console.log(res.status);
            history.push('/');
        })
        .catch(error => {
            console.log(error);
            alert(error);
        })
    }

    const userSignedIn = (): JSX.Element => {
        return (
            <div>
                <Link id='browselist'to="/Browselist" >Browse List</Link>
                <Link id='logoutLink'to="/" onClick={signUserOut}>Log out</Link>

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
