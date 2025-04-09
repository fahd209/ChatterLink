import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Chat.css'
import Button from '@mui/material/Button';
import Contacts from './Contacts';
import Chatbox from './Chatbox';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';

const Chats = () => {
    const { logout } = useAuth();
    const navigate = useNavigate()
    const [selectedUser, setSelectedUser] = useState({})
    const { currentUser } = useAuth()

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    // connect to websocket
    useEffect(() => {
        const socket = new SockJS("http://localhost:8081/ws-chatter-link")
        const stompClient = Stomp.over(socket)

        stompClient.connect(
            {
                headers: {
                    "Authorization": `Bearer ${currentUser.token}`
                }
            }, () => {
            console.log("connected")   
        })

        return () => {
            stompClient.disconnect(() => {

            })
        }
    }, [])

    useEffect(() => {
        // fetch chat and pass it chatCOMP
    }, [selectedUser])

    const onSelectedUser = (username, userId) => {
        setSelectedUser({
            username: username,
            userId: userId
        })
    }

    return (
        <div className='chat-container'>
            <div className='container'>
                <div className='chat-header d-flex justify-content-left'>
                    <Button onClick={handleLogout} variant='contained' 
                    sx={{
                        height: '50px',
                        width: '100px',
                        backgroundColor: '#5e4b8b', // optional: matches dark theme
                        '&:hover': {
                            backgroundColor: '#7a65a1',
                        }
                    }} >Logout</Button> 
            </div>
            <div className='chat-window'>
                <Contacts
                    onUserClick={onSelectedUser}
                 />
                <Chatbox
                    selectedUser={selectedUser}
                 />
            </div>
        </div>
        </div>
    )
}

export default Chats