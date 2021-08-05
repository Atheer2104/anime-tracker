import React from 'react';

// TODO: when placing logo here make sure when it is clicked it returns to homepage
const Header:React.FC = () => {
    return (
        <header>
            <div className="divImg">
                
            </div>
            <div></div>
            <div></div>
            <div>
                <a href="#">Login</a>
                <a href="#" id='signupLink'>Signup</a>
            </div>
        </header>
    )
}

export default Header;
