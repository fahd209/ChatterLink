import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const SenderComp = ({ handleSendClick }) => {
    const [textFieldValue, setTextFieldValue] = useState('')

    const handleTextFieldChange = (e) => {
        const value = e.target.value;
        setTextFieldValue(value)
    }

    const handleSend = (e) => {
        handleSendClick(textFieldValue)
        setTextFieldValue('')
    }

    return (
        <div className="send-message-container">
            <TextField onChange={handleTextFieldChange} value={textFieldValue}
                sx={{
                    width: '400px',
                    marginRight: '20px',
                    backgroundColor: '#f4f1fa',
                    borderRadius: '5px'
                }} />
            <Button variant="contained"
                onClick={handleSend}
                sx={{
                    height: '50px',
                    width: '100px',
                    backgroundColor: '#5e4b8b', // optional: matches dark theme
                    '&:hover': {
                        backgroundColor: '#7a65a1',
                    }
                }}>Send</Button>
        </div>
    )
}

export default SenderComp