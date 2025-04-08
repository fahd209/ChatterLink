import React, { useEffect, useState } from 'react'
import './Chat.css'
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ContactComp from './ContactComp';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import baseUrl from '../config/baseUrl'
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';

function Contacts() {

  const { currentUser } = useAuth()
  const [targetUserContact, setTargetUserContact] = useState('');
  const [contactList, setContactList] = useState([])

  const handleContactTextFieldChange = (e) => {
    const value = e.target.value;
    setTargetUserContact(value)
  }

  const handleClick = () => {
    if (targetUserContact !== '') {
      const addContactPayload = {
        userId: currentUser.userId,
        targetUserContact: targetUserContact
      }
      const url = baseUrl + '/api/v1/contacts/add';
      axios.post(url,
        addContactPayload,
        {
          headers: {
            "Authorization": `Bearer ${currentUser.token}`,
          }
        })
        .then(res => {
          setContactList(res.data.contactList)
        })
        .catch(error => {
          console.log(error.toJSON())
        })
      setTargetUserContact('')
    }
  }

  useEffect(() => {
    const fetchUserContactList = () => {
      const url = baseUrl + `/api/v1/contacts/get?userId=${currentUser.userId}`;
      axios.get(url, {
        headers: {
          "Authorization": `Bearer ${currentUser.token}`
        }
      })
        .then(res => {
          setContactList(res.data.contactList)
        })
        .catch(err => {
          console.log(err)
        })
    }
    fetchUserContactList()
  }, [])

  const handleContactClick = (username, index, userId) => {
  }

  return (
    <div className='contacts-column'>
      <div className='add-contact-container' style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid black'
      }}>
        <TextField
          id="standard-basic"
          label="Add Contact"
          variant="standard"
          value={targetUserContact}
          onChange={handleContactTextFieldChange}
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
          contactList?.length > 0 ? (
            contactList.map((contact, index) => (
              <ContactComp
                index={index}
                onContactClick={handleContactClick}
                username={contact.username}
                userId={contact.userId}
              />))

            ) : (
              <div className='not-contacts-container'>
                <p>No contacts found</p>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Contacts
