import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";
import data from "./data/cardData.js";
import '../node_modules/overlayscrollbars/styles/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from "../node_modules/overlayscrollbars-react/overlayscrollbars-react.cjs.js";

let allCards = data.map((data) => {
    return <Card 
                key={data.id}
                info={data}
             />
    }
)

export default function App() {
    return (
        <OverlayScrollbarsComponent defer className="container">
            <Navbar />
            <div className="cardsContainer">
                {allCards}
            </div>
        </OverlayScrollbarsComponent>
    )
}