import React from 'react'
import '../styles/Avatar.css'

import Me from '../assets/me2.jpg'

const Avatar: React.FC = () => {
    return (
        <div>
            {/* <div className="overlay" /> */}
            <img src={Me} className="me" />
        </div>
    )
}

export default Avatar