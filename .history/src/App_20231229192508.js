import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";
import data from "./data/cardData.js"

let allCards = data.map((data) => {
    return <Card 
                key={data.id}
                info={data}
            />
    }
)

export default function App() {
    return (
        <div className="container">
            <Navbar />
            <div className="cardsContainer">
                {allCards}
            </div>
        </div>
    )
}