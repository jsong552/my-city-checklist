import React from "react";

export default function Navbar() {
    return (
        <nav className="navbar">
            <img src={require('../images/logo.png')} alt="logo"/>
            <p>my travel journal.</p>
        </nav>
    )
}