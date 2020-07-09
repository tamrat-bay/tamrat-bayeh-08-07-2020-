import React, { useEffect } from 'react'
import axios from 'axios'

interface HeaderProps {
    buttonText: string;
}

const Header = ({buttonText}: HeaderProps) => {

    useEffect(() => {
        axios.get('/tasks')
        .then(res => console.log(res.data))
        .catch(err => console.log(err))    

        return () => {
        }
    }, [])

    return (
        <div>
            <h1>Header</h1>
            <button>{buttonText}</button>
        </div>
    )
}

export default Header
