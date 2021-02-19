import React from 'react'
import { Link } from 'react-router-dom'

import '../App.css'

export const NavBar: React.FC = () => {
    return (
        <nav className='navbar'>
            <div className='title'>Local Local Time</div>
            <div className='title-short'>LLT</div>
            <ul>
                <Link className="page" to="about">About</Link>
                <Link className="page" to="support">Support</Link>
                <Link className="page" to="contactus">Contact Us</Link>
            </ul>
        </nav>
    )
}

