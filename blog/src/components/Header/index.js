import React from 'react'
import "./style.css"
const Header = props => {
    return (
        <header className="header">
            <nav className="headerMenu">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact Us</a>
            </nav>
            <div>
                Social Media Link
            </div>
        </header>
    )
}

export default Header