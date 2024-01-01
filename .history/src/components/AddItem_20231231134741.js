import React from "react";

export default function AddItem() {
    let [showForm, setShowForm] = React.useState(false);

    return (
        <div className="addItemFormContainer">
            {/* <button className="addItemButton"></button> */}
            <form className="addItemForm">
                <div className="inputContainer">
                    <label className="provinceLabel">Province
                        <input
                            type="text"
                            name="province"
                        / >
                    </label>
                </div>
                <div className="inputContainer">
                    <label className="cityLabel">City
                        <input
                            type="text"
                            name="city"
                        / >
                    </label>
                </div>
                <label className="descLabel">Description
                    <textarea></textarea>
                </label>
            </form>
        </div>
    )
}