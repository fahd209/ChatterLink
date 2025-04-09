import React from 'react'
import './Chat.css'
import SenderComp from './SenderComp'
import ChatComp from './ChatComp'

function Chatbox({ selectedUser }) {
  const noChatsSelectedStyle = {
    hieght: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
          <ChatComp />
          <SenderComp />
          </>
        )
      }
    </div>
  )
}

export default Chatbox
