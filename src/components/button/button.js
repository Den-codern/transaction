import React from 'react'
import './button.css'

const Button = ({onClick,children,disabled,type}) => {
    return (
        <button className={`Button ${type}`} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button