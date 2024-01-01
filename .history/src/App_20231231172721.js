import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";
import data from "./data/cardData.js";
import AddItem from "./components/AddItem.js";

// TO DO LIST:
//     add a delete/edit menu
//     add link google maps link functionality
//     add fetchAPI for images (maybe generate new image option)
//     add populationAPI?

export default function App() {
    let [showForm, setShowForm] = React.useState(false);
    let [formData, setFormData] = React.useState(
        {
            province: "",
            city: "",
            desc: ""
        }
    )
    let [allData, setAllData] = React.useState(data);
    let [cardMenu, setCardMenu] = React.useState(
        {
            showCardMenu: false,
            showEditMenu: false,
            delete: false
        }
    );

    function handleMenuDotsClick() {
        setCardMenu(prevState => (
            {
                ...prevState,
                showCardMenu: !prevState.showCardMenu
            }
        ))
    }

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
        setAllData(prevData => (
            [
                ...prevData,
                {
                    id: prevData[prevData.length - 1].id + 1,
                    province: formData.province,
                    city: formData.city,
                    alt: `A picture of ${formData.city}`,
                    image: "/my-city-checklist/images/stjohns.jpg",  //not done
                    population: "unknown",
                    desc: formData.desc,
                    link: ""
                }
            ]
        ))
    }

    function handleButtonClick() {
        setShowForm(true);
        setFormData({
            province: "",
            city: "",
            desc: ""
        })
    }

    let allCards = allData.map((data) => {
        return <Card 
                    key={data.id}
                    id={data.id}
                    info={data}
                    cardMenu={cardMenu}
                    handleMenuDotsClick={handleMenuDotsClick}
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