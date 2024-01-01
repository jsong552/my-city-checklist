import React from "react";

export default function Card(props) {
    return (
        <div className="card">
            <button 
                className="cardMenuDots"
                onClick={props.handleMenuDotsClick}
            ></button>

            {props.showCardMenu && <div className="cardMenu">
                <button className="cardDelete">Delete</button>
                <span className="border"></span>
                <button className="cardEdit">Edit</button>
            </div>}

            <img className="imageOfLocation" src={props.info.image} alt={props.info.alt} />
            <div className="cardInfo">
                <span className="cardLocation">
                    <img className="locationMarker" src='/my-city-checklist/images/location-marker.png' alt=""/>
                    <h4>{props.info.province}</h4>
                    <a href={props.info.link}>View on Google Maps</a>
                </span>
                <h1>{props.info.city}</h1>
                <h3>Population: {props.info.population}</h3><p>{props.info.desc}
                </p>
            </div>
        </div>
    )
}