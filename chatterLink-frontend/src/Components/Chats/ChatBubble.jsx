import React from 'react';

const ChatBubble = ({ isSender, message }) => {
    const chatBubbleContainerStyle = {
        width: '100%',
        display: 'flex',
        //border: '1px solid white',
        padding: '10px',
        justifyContent: isSender ? 'flex-end' : 'flex-start'
    }

    const chatBubbleStyle = {
        backgroundColor: isSender ? '#4f46e5' : '#1f2937',
        //border: '1px solid wheat',
        padding: '10px 15px',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: '25px',
        wordWrap: 'break-word',
        borderTopLeftRadius: isSender ? '20px' : '0px',
        borderTopRightRadius: isSender ? '0px' : '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    }

    return (
        <div style={chatBubbleContainerStyle}>
            <div style={chatBubbleStyle}>
                <p style={{color: 'white'}} >{message}</p>
            </div>
        </div>
    )
}

export default ChatBubble