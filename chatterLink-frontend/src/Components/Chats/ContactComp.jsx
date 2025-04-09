import React, { useState } from 'react'
import './Chat.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ContactComp({ username, onContactClick, index, userId, selectedIndex }) {
    const [isHovered, setIsHovered] = useState(false);

    const contactTabStyle = {
        display: "flex",
        borderBottom: ".5px solid rgba(255, 255, 255, 0.327)",
        padding: "10px",
        alignItems: "center",
        color: "white",
        backgroundColor: selectedIndex === index ? "#221d37" : "#05001e",
        backgroundColor: selectedIndex === index 
        ? "#221d37" 
        : isHovered 
            ? "#2d2547" 
            : "#05001e",
        cursor: "pointer",
        color: "white"
    }

    return (
        <div className='contact-tab'
            style={contactTabStyle}
            onClick={() => onContactClick(username, index, userId)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
            <AccountCircleIcon sx={{ height: '50px', width: '50px', color: 'white' }} />
            <p>{username}</p>
        </div>
    )
}


export default ContactComp
