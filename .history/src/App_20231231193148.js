import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";
import data from "./data/cardData.js";
import AddItem from "./components/AddItem.js";

// TO DO LIST:
//     add a delete/edit menu  FINALLY DONE !!!!! 
//     make delete/edit menu functional 

// this step, i need to take everything formData holds and put it into allData
// or another idea is to just create another state. we will need to pass 
// through an id so that each form edits its own thing rather than all the cards
// the default value should be what was there originally.
// if we create a new state, initializaing default value doesnt make sense
// we have to add these values to the allData objects?

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

    // menu dots functions (open, edit, delete) ------------------------
    function handleMenuDotsClick(id, event) {
        event.stopPropagation();
        setAllData(prevData => {
            return prevData.map((cardData) => {
                return cardData.id === id ? {...cardData, showCardMenu: !cardData.showCardMenu} : cardData;
            })
        })
    }

    function handleDelete(id) {
        setAllData(prevData => {
            let newData = [];
            for (let i = 0; i < prevData.length; i++) {
                if (prevData[i].id !== id) {
                    newData.push(prevData[i]);
                }
            }

            return newData;
        })
    }

    function handleEdit(id) {
        setAllData(prevData => {
            return prevData.map((cardData) => {
                return cardData.id === id ? {...cardData, showEditMenu: !cardData.showEditMenu} : cardData;
            })
        })
    }

    function handleEditChange(event) {
        let target = event.target;
        // function not finished
    }

    function handleSaveClick(event) {
        event.preventDefault();
        // function not finished
    }

    function closeCardMenu() {
        setAllData(prevData => {
            return prevData.map(cardData => {
                return {...cardData, showCardMenu: false};
            })
        })
    }

    // add new card form functions -------------------------------------
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
                    link: "",
                    editProvince: "",
                    editCity: "",
                    editDesc: ""
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

    // MAPPING CARD COMPONENTS FOR USAGE -----------------------------
    let allCards = allData.map((data) => {
        return <Card 
                    key={data.id}
                    id={data.id}
                    info={data}
                    handleMenuDotsClick={handleMenuDotsClick}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleChange={handleEditChange}
                    handleSaveClick={handleSaveClick}
                    formData={formData}
                />
        }
    )

    // JSX <APP /> COMPONENT -----------------------------------------
    return (
        <div 
            className="container"
            onClick={closeCardMenu}
        >
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