import React from "react";

export default function AddItem(props) {
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
                        <label className="provinceLabel">Province/State:
                            <input
                                type="text"
                                name="province"
                                onChange={props.handleEditChange}
                                value={props.formData.province}
                            / >
                        </label><br />
                        <label className="cityLabel">City:
                            <input
                                type="text"
                                name="city"
                                onChange={props.handleEditChange}
                                value={props.formData.city}
                            / >
                        </label>
                    </div>
                    <label className="descLabel">Description:
                        <textarea
                            onChange={props.handleEditChange}
                            value={props.formData.desc}
                            name="desc"
                        >
                        </textarea>
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