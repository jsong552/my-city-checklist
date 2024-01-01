import React from "react";

export default function AddItem() {
    let [showForm, setShowForm] = React.useState(false);

    return (
        <div className="addItemFormContainer">
            {/* <button className="addItemButton"></button> */}
            <form className="addItemForm">
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
                    </label><br />
                </div>
                <label className="descLabel">Description:
                    <textarea></textarea>
                </label>
            </form>
        </div>
    )
}