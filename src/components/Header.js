import React from 'react';
import './Header.css';

const Header = ( {black} ) => {
    return (
        <header className={black ? "black" : ""}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-6.png" alt="Netflix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="user_profile.png" alt="User"/>
                </a>
            </div>
        </header>
    );
}

export default Header;
