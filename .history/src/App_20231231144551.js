import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";
import data from "./data/cardData.js";
import AddItem from "./components/AddItem.js";

export default function App() {

    let [showForm, setShowForm] = React.useState(false);

    function handleSubmitClick(event) {
        event.preventDefault();
        setShowForm(false);

    }

    function handleButtonClick() {
        setShowForm(true);
    }

    let [allData, setAllData] = React.useState(data);

    let allCards = allData.map((data) => {
        return <Card 
                    key={data.id}
                    info={data}
                 />
        }
    )

    

    return (
        <div className="container">
            <Navbar />
            <div className="cardsContainer">
                {allCards}
            </div>
            <AddItem 
                showForm={showForm}
                handleButtonClick={handleButtonClick}
                handleSubmitClick={handleSubmitClick}
            />
        </div>
    )
}