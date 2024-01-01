import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";
import data from "./data/cardData.js";
import AddItem from "./components/AddItem.js";

export default function App() {
    let [showForm, setShowForm] = React.useState(false);
    let [formData, setFormData] = React.useState(
        {
            province: "",
            city: "",
            desc: ""
        }
    )

    function handleChange(event) {
        let target = event.target;
        setFormData(prevData => (
            {
                ...prevData,
                [target.name]: target.value
            }
        ))
    }

    function handleSubmitClick(event) {
        event.preventDefault();
        setShowForm(false);
        alert(formData.province);
        alert(formData.city);
        alert(formData.desc);
    }

    function handleButtonClick() {
        setShowForm(true);
        setFormData({
            province: "",
            city: "",
            desc: ""
        })
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
                handleChange={handleChange}
                formData={formData}
            />
        </div>
    )
}