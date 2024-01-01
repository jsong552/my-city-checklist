import React from "react";

export default function Card(props) {
    return (
        <div className="card">
            <button
                className="cardMenuDots"
                onClick={(event) => props.handleMenuDotsClick(props.id, event)}
            >
            </button>

            {props.info.showCardMenu && <div className="cardMenu">
                <button
                    className="cardDelete"
                    onClick={() => props.handleDelete(props.id)}
                >Delete</button>

                <span className="border"></span>

                <button 
                    className="cardEdit"
                    onClick={() => props.handleEdit(props.id)}
                >Edit</button>
            </div>}

            <img className="imageOfLocation" src={props.info.image} alt={props.info.alt} />
            <div className="cardInfo">
                <span className="cardLocation">
                    <img className="locationMarker" src='/my-city-checklist/images/location-marker.png' alt=""/>
                    {props.info.showEditMenu && <input 
                        type="text"
                        name="editProvince"
                        className="newProvince"
                        onChange={props.handleEditChange}
                         />
                    }
                    {!props.info.showEditMenu && <h4>{props.info.province}</h4>}
                    <a href={props.info.link}>View on Google Maps</a>
                </span>
                {!props.info.showEditMenu && <h1>{props.info.city}</h1>}
                {props.info.showEditMenu && <br />}
                {props.info.showEditMenu && <input 
                    type="text"
                    name="editCity"
                    className="newCity"
                    onChange={props.handleEditChange}
                     />
                }
                <h3>Population: {props.info.population}</h3>
                {!props.info.showEditMenu && <p>{props.info.desc}
                </p>}
                {props.info.showEditMenu && <textarea
                    name="editDesc"
                    className="newDesc"
                    onChange={props.handleEditChange}
                    
                    ></textarea>
                }
                {props.info.showEditMenu && <br />}
                {props.info.showEditMenu && <input Edit
                    type="submit"
                    name="city"
                    className="saveChanges"
                    onClick={(event) => props.handleSaveClick(props.id, event)}
                    value="Save" />
                }
            </div>
        </div>
    )
}