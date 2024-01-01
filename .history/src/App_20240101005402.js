import React from "react";
import Navbar from "./components/Navbar.js";
import Card from "./components/Card.js";
import data from "./data/cardData.js";
import AddItem from "./components/AddItem.js";

// TO DO LIST:
//     add a delete/edit menu  FINALLY DONE !!!!! 
//     make delete/edit menu functional FINALLY DONE!!!!!!!
//     add link google maps link functionality example link below  DONE!!
// https://www.google.com/maps/search/?api=1&query=centurylink+field
// URL encodings: encodeURIComponent()
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

    function handleEditChange(id, event) {
        let target = event.target;
        setAllData(prevData => {
            return prevData.map(cardData => {
                if (cardData.id === id) {
                    return (
                        {
                            ...cardData,
                            [target.name]: target.value
                        }
                    )
                }
                else {
                    return cardData;
                }
            })
        })
    }

    function handleSaveClick(id, event) {
        event.preventDefault();
        setAllData((prevData) => {
            return prevData.map(cardData => {
                if (cardData.id === id) {
                    let query = encodeURIComponent(cardData.city);
                    return {
                        ...cardData,
                        showEditMenu: false,
                        link: `https://www.google.com/maps/search/?api=1&query=${query}`
                    }
                }
                else {
                    return cardData;
                }
            })
        })
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

        // alert("formData.city: " + formData.city);
        // alert("formData.province: " + formData.province);

        async function getImages() {
            const res = await fetch(`https://pixabay.com/api/?key=41573030-f1169bdc2df9b8a1ffff0daec&q=${encodeURIComponent(`${formData.city} ${formData.province} city}`)}`);
            const data = await res.json();
            return data.hits;
        }
        let imageLinks = getImages();

        setAllData(prevData => (
            [
                ...prevData,
                {
                    id: prevData[prevData.length - 1].id + 1,
                    province: formData.province,
                    city: formData.city,
                    alt: `A picture of ${formData.city}`,
                    image: `${imageLinks[0].largeImageURL}`,
                    population: "unknown",
                    desc: formData.desc,
                    link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.city)}`,
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
                    handleChange={handleChange}
                    handleEditChange={handleEditChange}
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