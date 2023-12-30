import React from "react";

export default function Card(props) {

    const imageSource = "../images/stjohns.jpg";
    
    return (
        <div className="card">
            <img className="imageOfLocation" src={require("../images/stjohns.jpg")} alt="St. Johns Downtown" />
            <div className="cardInfo">
                <span className="cardLocation">
                    <img className="locationMarker" src={require('../images/location-marker.png')} />
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