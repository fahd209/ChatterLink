import React from 'react'
import './Chat.css'
import SenderComp from './SenderComp'
import ChatComp from './ChatComp'
import { useAuth } from '../context/AuthContext'

function Chatbox({ chatData, selectedUser, sendMessageToUser }) {
  const {currentUser} = useAuth();
  const noChatsSelectedStyle = {
    hieght: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const handleSendClick = (messageContent) => {
    //console.log(messageContent)
    const messagePayload = {
      senderId: currentUser.userId,
      receiverId: selectedUser.userId,
      content: messageContent
    }

    //console.log(messagePayload)
    sendMessageToUser(messagePayload)
  }

  return (
    <div className='chat-box'>
      {
        JSON.stringify(selectedUser) == "{}" ? (
          <div style={noChatsSelectedStyle}>
            <p style={{color: 'white', marginTop: '50px'}} >No chats are selected</p>
          </div>
        )  : (
          <>
          <ChatComp
            chatMessages={chatData.chatMessages}
           />
          <SenderComp 
            handleSendClick={handleSendClick}
           />
          </>
        )
      }
    </div>
  )
}

export default Chatbox
