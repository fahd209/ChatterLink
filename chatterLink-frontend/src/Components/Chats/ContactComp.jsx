import React from 'react'
import './Chat.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ContactComp({ username }) {
    return (
        <div className='contact-tab'>
            <AccountCircleIcon sx={{ height: '50px', width: '50px', color: 'white' }} />
            <p>{username}</p>
        </div>
    )
}


export default ContactComp
