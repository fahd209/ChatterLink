import React from "react";
import { TextField, Button } from "@mui/material";

const SenderComp = () => {
    return (
        <div className="send-message-container">
            <TextField sx={{ width: '400px', marginRight: '20px', backgroundColor: '#f4f1fa', borderRadius: '5px' }} />
            <Button variant="contained" 
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