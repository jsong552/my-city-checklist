import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";
import data from "./data/cardData.js"
import 'overlayscrollbars/overlayscrollbars.css';
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";

let allCards = data.map((data) => {
    return <Card 
                key={data.id}
                info={data}
            />
    }
)

export default function App() {
    return (
        <OverlayScrollbarsComponent defer element="div" className="container">
                <Navbar />
                <div className="cardsContainer">
                    {allCards}
                </div>
        </OverlayScrollbarsComponent>
    )
}