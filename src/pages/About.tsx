import { NavBar } from '../components/NavBar';
import '../styles/About.css'

import Avatar from '../components/Avatar';

const About: React.FC = () => {
    return (
        <div className="container">
            <NavBar />
            <div className="header">
                <h2 style={{ color: '#fff', fontSize: 50 }}>Hello Lovely Hoomans :3 , Dev here.</h2>
                <p style={{ color: '#fff', fontSize: 40 }}>I am a self-taught Web and Mobile App Developer.</p>
                <p style={{ color: '#fff', fontSize: 30, marginTop: 0 }}>
                    I love to play around with Javascript (TS) Frameworks and sometimes create websites like these for you guys to play around with.
                </p>
                <p style={{ color: '#fff', fontSize: 30, marginTop: 0 }}>
                    I also play around with automation ( basically i am a scriptkiddie LOL ) with python, nodeJs and a bit of unix shell scripting.
                </p>
            </div>
        </div>
    )
}

export default About
