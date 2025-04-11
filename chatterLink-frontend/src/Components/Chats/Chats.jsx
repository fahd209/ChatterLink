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
import baseUrl from '../config/baseUrl';
import axios from 'axios';

const Chats = () => {
    const { logout, currentUser } = useAuth();
    const navigate = useNavigate()
    const [selectedUser, setSelectedUser] = useState({})
    const [stompClient, setStompClient] = useState(null)
    const [chatData, setChatData] = useState([])

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    // connect to websocket
    useEffect(() => {
        const url = baseUrl + '/ws-chatter-link';
        const socket = new SockJS(url)
        const stompClient = Stomp.over(socket)

        stompClient.connect(
            {
                Authorization: `Bearer ${currentUser.token}`
            }, (frame) => {
                //console.log("connected: ", frame)  
                setStompClient(stompClient)
            },
            (error) => {
                setStompClient(null)
                // console.log(error)
            }
        )
        return () => {
            stompClient.disconnect(() => {
                setStompClient(null)
            })
        }
    }, [])

    useEffect(() => {
        const uri = `${baseUrl}/api/v1/chat?senderId=${currentUser.userId}&receiverId=${selectedUser.userId}`;
        axios.get(uri, {
            headers: {
                "Authorization": `Bearer ${currentUser.token}`
            }
        }).then(res => {
            setChatData(res.data)
        })
            .catch(error => [
                // console.log(error)
            ])
    }, [selectedUser])

    const onSelectedUser = (username, userId) => {
        // if the stomp is already subscribed to a topic
        // when a contact is clicked then unsubscribe and subscribe
        // to the new contact topic
        if (JSON.stringify(selectedUser) == '{}') {
            subscribeToTopic(userId)
        } else {
            stompClient.unsubscribe();
            subscribeToTopic(userId)
        }
        setSelectedUser({
            username: username,
            userId: userId
        })
    }

    const subscribeToTopic = (userId) => {
        const topic = `/topic/message/${userId}/${currentUser.userId}`
            stompClient.subscribe(topic, (message) => {
                setChatData(prevData => ({
                    ...prevData,
                    chatMessages: [...prevData.chatMessages, JSON.parse(message.body)]
                }))
            })
    } 

    const sendMessage = (messagePayload) => {
        if (stompClient != null) {
            stompClient.send("/app/chat.send", {}, JSON.stringify(messagePayload))
            setChatData(prevData => ({
                ...prevData,
                chatMessages: [...prevData.chatMessages, messagePayload]
            }))
        }
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
                        chatData={chatData}
                        sendMessageToUser={sendMessage}
                        selectedUser={selectedUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default Chats