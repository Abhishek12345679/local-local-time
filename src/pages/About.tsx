import { NavBar } from '../components/NavBar';
import './About.css';

import WorldMapBanner from '../assets/worldtzmap.png'

const About: React.FC = () => {
    return (
        <div className="container">
            <NavBar />
            <div className="header-banner">
                <img src={WorldMapBanner} height="400" width="100%" />
            </div>
        </div>
    )
}

export default About
