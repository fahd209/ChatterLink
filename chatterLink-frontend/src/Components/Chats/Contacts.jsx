import React from 'react'
import './Chat.css'
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactComp from './ContactComp';

function Contacts() {

  const handleClick = () => {
    console.log("Clicked")
  }

  const names = ["User", "User", "User", "User", "User", "User", "User", "User", "User"]

  return (
    <div className='contacts-column'>
      <div className='add-contact-container' style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid black'
      }}>
        <TextField id="standard-basic" label="Add Contact" variant="standard" id="standard-basic"
          label="Add Contact"
          variant="standard"
          sx={{
            "& label": { color: "white" },  // Label color
            "& .MuiInput-underline:before": { borderBottomColor: "white" },  // Bottom border before click
            "& .MuiInput-underline:hover:before": { borderBottomColor: "white" }, // Border on hover
            "& .MuiInputBase-input": { color: "white" } // Text color
          }} />
        <Tooltip title="Add Contact" sx={{
          "& .MuiTooltip-tooltip": {
            backgroundColor: "white",  // Background color
            color: "black",  // Text color
            border: "1px solid gray"  // Optional border
          }
        }}>
          <IconButton onClick={handleClick} sx={{ height: '40px', width: '40px', color: 'white' }}>
            <AddIcon sx={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </div>
      <div className='contacts-container'>
        {
          names.map((user, index) => (
            <ContactComp
              username={user}
             /> 
          ))
        }
      </div>
    </div>
  )
}

export default Contacts
