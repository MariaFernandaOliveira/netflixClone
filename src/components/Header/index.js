import React from 'react';
import './Header.css';


export default({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className='header--logo'>
                <a href='"/'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Logonfx.png" alt='Netflix'/>
                </a>
            </div>
            <div className='header--user'>
                <a href='/'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt='Usuario'/>
                </a>
            </div>
        </header>
    );
}