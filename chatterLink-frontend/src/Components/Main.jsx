import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './Authentication/AuthenticationPage'; 
import Chats from './Chats/Chats'; 
import { useAuth } from './context/AuthContext';

const Main = () => {
    const { isUserLoggedIn } = useAuth()
    return(
        <Router>
            <Routes>
                { isUserLoggedIn() ? (
                    <>
                        <Route path="/chats" Component={Chats} />
                    </>
                ) :
                (
                    <>
                        <Route path="/" Component={AuthenticationPage} />
                    </>
                )
                }
            </Routes>
        </Router>
    )
}

export default Main