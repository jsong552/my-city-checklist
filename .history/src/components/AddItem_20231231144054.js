import React from "react";

export default function AddItem(props) {
    // let [showForm, setShowForm] = React.useState(false);

    // function handleSubmitClick(event) {
    //     event.preventDefault();
    //     setShowForm(false);
    // }

    // function handleButtonClick() {
    //     setShowForm(true);
    // }

    return (
        <div className="addItemFormContainer">
            {!props.showForm && <><button 
                className="addItemButton"
                onClick={props.handleButtonClick}>
            </button>
            <div class="empty"></div></>}


            {props.showForm && <form className="addItemForm">
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
                        onClick={props.handleSubmitClick}
                    />
                </div>
            </form>}
        </div>
    )
}