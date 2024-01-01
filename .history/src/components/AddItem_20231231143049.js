import React from "react";

export default function AddItem() {
    let [showForm, setShowForm] = React.useState(false);

    function handleSubmitClick(event) {
        event.preventDefault();
        setShowForm(false);
    }

    function handleButtonClick() {
        setShowForm(true);
    }

    return (
        <div className="addItemFormContainer">
            {!showForm && <><button 
                className="addItemButton"
                onClick={handleButtonClick}>
            </button>
            <div class="empty"></div></>}


            {showForm && <form className="addItemForm">
                <div className="allButSubmit">
                    <div className="inputContainers">
                        <label className="provinceLabel">Province:
                            <input
                                type="text"
                                name="province"
                            / >
                        </label><br />
                        <label className="cityLabel">City:
                            <input
                                type="text"
                                name="city"
                            / >
                        </label>
                    </div>
                    <label className="descLabel">Description:
                        <textarea></textarea>
                    </label>
                </div>
                <div className="addCityButtonContainer">
                    <input 
                        type="submit" 
                        value="Add City!" 
                        className="addCityButton"
                        onClick={handleSubmitClick}
                    />
                </div>
            </form>}
        </div>
    )
}