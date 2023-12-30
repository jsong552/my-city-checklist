import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";

export default function App() {
    return (
        <div className="container">
            <Navbar />
            <div className="cardsContainer">
                <Card />
                <Card />
            </div>
        </div>
    )
}