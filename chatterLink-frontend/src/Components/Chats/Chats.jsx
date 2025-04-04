import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css'
import Button from '@mui/material/Button';
import Contacts from './Contacts';
import Chatbox from './Chatbox';
import { useAuth } from '../context/AuthContext'
import { useNavigate, userNavigate } from 'react-router-dom'

const Chats = () => {
    const { logout } = useAuth();
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    return (
        <div className='chat-container'>
            <div className='container'>
                <div className='chat-header d-flex justify-content-left'>
                    <Button onClick={handleLogout} variant='contained' sx={{ height: '40px' }} >Logout</Button>
                </div>
                <div className='chat-window'>
                    <Contacts />
                    <Chatbox />
                </div>
            </div>
        </div>
    )
}

export default Chats