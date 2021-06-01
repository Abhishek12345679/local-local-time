import { NavBar } from "../components/NavBar";
import '../styles/About.css'

function ContactUs() {
    return (
        <div>
            <NavBar />
            <div className="header">
                <h2 style={{ color: '#fff', fontSize: 40 }}>Email me</h2>
                <p style={{ color: '#fff', fontSize: 25 }}>sah755146@gmail.com</p>
            </div>
        </div>
    )
}

export default ContactUs
