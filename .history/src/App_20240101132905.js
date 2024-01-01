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
//     add fetchAPI for images (maybe generate new image option) done 
//     add populationAPI? done

// TODO TOMMORROW:
//  error handling for API calls (there should be 4) done 
// change default page to just one card with data given by APIs 
// not neccesarily an API call, but just download their information and
// log it in the cardData.js. This way, we can add the image clicking
// functionality on the card that already exists as well.

//     add changeImage on clicking the image functionality  DONE!!!

// last feature prob? ADD PREVIEW MODE

export default function App() {
    let [showForm, setShowForm] = React.useState(false);
    let [formData, setFormData] = React.useState(
        {
            province: "",
            city: "",
            desc: ""
        }
    )
    let [previewMode, setPreviewMode] = React.useState(false);

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

    function addSpacesToNum(num) {
        let numStr = num.toString();
        let counter = 1;
        for (let i = numStr.length-1; i > 0; i--) {
            if (counter % 3 === 0) {
                numStr = numStr.slice(0, i) + " " + numStr.slice(i);
            }
            counter++
        }
        return numStr;
    }

    function handleSaveClick(id, event) {
        event.preventDefault();

        let index = 0;
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].id === id) {
                index = i;
                break;
            }
        }

        async function getInfo() {
            const res = await fetch(`https://pixabay.com/api/?key=41573030-f1169bdc2df9b8a1ffff0daec&q=${encodeURIComponent(`${allData[index].city} ${allData[index].province} city`)}`);
            const imageData = await res.json();

            const name = allData[index].city;
            const apiKey = 'pFA5kUB4bM4JzM1OukNadQ==mGBf8trcncp9XlfY';
  
            const apiUrl = `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(name)}`;
  
            const popResponse = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            });

            const popRes = await popResponse.json();
            let pop;
            try {
                pop = addSpacesToNum(popRes[0].population);
            }
            catch (error) {
                pop = "Unknown";
            }

            let allImages;
            let newAlt;
            let currentImageIndex = 0;
            try {
                allImages = imageData.hits;
                const test = allImages[0].largeImageURL;
                newAlt = `Picture of ${allData[index].city}`;
            }
            catch (error) {
                allImages = "";
                newAlt = "Unable to generate image";
            }

            setAllData((prevData) => {
                return prevData.map(cardData => {
                    if (cardData.id === id) {
                        let query = encodeURIComponent(cardData.city);
                        return {
                            ...cardData,
                            showEditMenu: false,
                            link: `https://www.google.com/maps/search/?api=1&query=${query}`,
                            image: allImages === "" ? allImages : allImages[currentImageIndex].largeImageURL,
                            images: allImages,
                            imageIndex: currentImageIndex,
                            alt: newAlt,
                            population: pop
                        }
                    }
                    else {
                        return cardData;
                    }
                })
            })
        }
        getInfo();
    }

    function closeCardMenu() {      // also turns off preview mode!
        setPreviewMode(false);
        setAllData(prevData => {
            return prevData.map(cardData => {
                return {...cardData, showCardMenu: false};
            })
        })
    }

    // generate new image on click function ----------------------------
    function handleImageClick(id) {
        let index = 0;
        for (let i = 0; i < allData.length; i++) {
            if (allData[i].id === id) {
                index = i;
                break;
            }
        }

        let imageListLength = allData[index].images.length;
        let nextIndex = indexLoop(allData[index].imageIndex, imageListLength-1);

        setAllData(prevData => {
            return prevData.map((cardData) => {
                if (cardData.id === id) {
                    return (
                        {
                            ...cardData,
                            imageIndex: nextIndex,
                            image: cardData.images[nextIndex].largeImageURL
                        }
                    )
                }
                else {
                    return {...cardData};
                }
            })
        })
        
    }

    function indexLoop(currentIndex, maxIndex) {
        if (currentIndex === maxIndex) {
            return 0;
        }
        let newIndex = currentIndex + 1;
        return newIndex;
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

        async function getInfo() {
            const imageRes = await fetch(`https://pixabay.com/api/?key=41573030-f1169bdc2df9b8a1ffff0daec&q=${encodeURIComponent(`${formData.city} ${formData.province} city`)}`);
            const imageData = await imageRes.json();

            const name = formData.city;
            const apiKey = 'pFA5kUB4bM4JzM1OukNadQ==mGBf8trcncp9XlfY';
  
            const apiUrl = `https://api.api-ninjas.com/v1/city?name=${encodeURIComponent(name)}`;
  
            const popResponse = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            });

            const popRes = await popResponse.json();
            let pop;
            try {
                pop = addSpacesToNum(popRes[0].population);
            }
            catch (error) {
                pop ="Unknown";
            }

            let allImages;
            let newAlt;
            let currentImageIndex = 0;
            try {
                allImages = imageData.hits;
                const test = allImages[0].largeImageURL;
                newAlt = `Picture of ${formData.city}`;
            }
            catch (error) {
                allImages = "";
                newAlt = "Unable to generate image";
            }

            let newID;
            if (allData.length > 0) {
                newID = allData[allData.length - 1].id + 1;
            }
            else {
                newID = 1;
            }

            setAllData(prevData => (
                [
                    ...prevData,
                    {
                        id: newID,
                        province: formData.province,
                        city: formData.city,
                        alt: newAlt,
                        images: allImages,
                        imageIndex: currentImageIndex,
                        image: allImages === "" ? allImages : allImages[currentImageIndex].largeImageURL,
                        population: pop,
                        desc: formData.desc,
                        link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.city)}`,
                        editProvince: "",
                        editCity: "",
                        editDesc: ""
                    }
                ]
            ))
        }
        getInfo();

        // setAllData(prevData => (
        //     [
        //         ...prevData,
        //         {
        //             id: prevData[prevData.length - 1].id + 1,
        //             province: formData.province,
        //             city: formData.city,
        //             alt: `A picture of ${formData.city}`,
        //             image: `${imageLinks[0].largeImageURL}`,
        //             population: "unknown",
        //             desc: formData.desc,
        //             link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.city)}`,
        //             editProvince: "",
        //             editCity: "",
        //             editDesc: ""
        //         }
        //     ]
        // ))
    }

    function handleButtonClick() {
        setShowForm(true);
        setFormData({
            province: "",
            city: "",
            desc: ""
        })
    }

    function hideForm() {
        setShowForm(false);
    }

    // PREVIEW MODE FUNCTION -----------------------------------------
    function handlePreviewToggle(event) {
        event.stopPropagation();
        setPreviewMode(prevState => !prevState);
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
                    handleImageClick={handleImageClick}
                />
        }
    )

    // JSX <APP /> COMPONENT -----------------------------------------
    return (
        <div 
            className="container"
            onClick={closeCardMenu}
        >
            <Navbar 
                handlePreviewToggle={handlePreviewToggle} />
            <div className="cardsContainer">
                {allCards}
            </div>
            {!previewMode && <AddItem 
                showForm={showForm}
                handleButtonClick={handleButtonClick}
                handleSubmitClick={handleSubmitClick}
                handleChange={handleChange}
                formData={formData}
                hideForm={hideForm}
            />}
        </div>
    )
}