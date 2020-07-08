import React from 'react'

interface HeaderProps {
    buttonText: string;
}

const Header = ({buttonText}: HeaderProps) => {
    return (
        <div>
            <h1>Header</h1>
            <button>{buttonText}</button>
        </div>
    )
}

export default Header
