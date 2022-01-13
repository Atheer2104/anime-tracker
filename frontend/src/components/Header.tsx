import React, {Dispatch, SetStateAction} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface IProps {
    loggedIn: Boolean,
    setLoggedIn: Dispatch<SetStateAction<Boolean>>
}

const Header:React.FC<IProps> = ({ loggedIn, setLoggedIn }) => {
    const history = useHistory();

    const userNotSignedIn = ():JSX.Element => {
        return (
            <div>
                <a onClick={checkUserAlreadySignedIn} >Login</a>
                <Link to="/Signup" id='signupLink'>Signup</Link>
            </div>
        )
    }

    const signUserOut = async(): Promise<void> => {
        axios.delete('http://localhost:3001/api/sessions', {
            withCredentials: true
        })
        .then(res => {
            //console.log(res.data);
            //console.log(res.status);
            setLoggedIn(false);
            history.push('/');
            
        })
        .catch(error => {
            console.log(error);
            alert(error);
        })
    }

    const checkUserAlreadySignedIn = async() => {
        axios.get('http://localhost:3001/api/sessionexists', {
            withCredentials: true
        })
        .then(res => {
            if (res.status === 200) {
                setLoggedIn(true);
                history.push('/');
                //console.info("sessionalready exists")
                
            }

            
        })
        .catch(err => {
            console.error(err);
            history.push('/Login');
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
