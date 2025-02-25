import { error } from 'ajv/dist/vocabularies/applicator/dependencies'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Chats = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/user-info', {withCredentials: true})
        .then(result => {
            setUser(result.data)
            console.log(result.data)
        })
        .catch(error => {
            console.log(error)
        }, [])
    })
    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
}

export default Chats