import React from "react";

export default function Navbar() {
    return (
        <nav className="navbar">
            <img src={require('../images/logo.png')}/>
            <p>my travel journal.</p>
        </nav>
    )
}