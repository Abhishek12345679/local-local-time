import React from 'react'
import { Link } from 'react-router-dom'

import '../App.css'

export const NavBar: React.FC = () => {
    return (
        <nav className='navbar'>
            <div className='title'><a href="/" style={{ textDecorationLine: 'none', color: '#ffffff' }}>Local Local Time</a></div>
            <div className='title-short'><a href="/" style={{ textDecorationLine: 'none', color: '#ffffff' }}>LLT</a></div>
            <ul>
                <Link className="page" to="about">Meet the Developer</Link>
                {/* <Link className="page" to="support">Support</Link> */}
                <Link className="page" to="contactus">Contact Us</Link>
            </ul>
        </nav>
    )
}

