import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './Components/Authentication/AuthenticationPage'; 
import ChatsPage from './Components/Chats/Chats'; 

const Main = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<AuthenticationPage />} />
                <Route path="/chats" element={<ChatsPage />} />
            </Routes>
        </Router>
    )
}

export default Main