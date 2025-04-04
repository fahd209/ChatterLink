import React, { createContext, useState, useContext } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const saveUser = (user) => {
        const userData = {
            username: user.username,
            token: user.token,
            userId: user.userId 
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const isUserLoggedIn = () => !!user;

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    } 
    
    return (
        <AuthContext.Provider value={{ saveUser, isUserLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);