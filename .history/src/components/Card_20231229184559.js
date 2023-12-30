import React from "react";

export default function Card() {
    return (
        <div className="card">
            <img className="imageOfLocation" src={require('../images/stjohns.jpg')} alt="St. Johns Downtown" />
            <div className="cardInfo">
                <span className="cardLocation">
                    <img src={require('../images/location-marker.png')} />
                    <h4>NEWFOUNDLAND</h4>
                    <a href="https://www.google.com/maps/place/St.+John's,+NL/@47.4825126,-52.9947887,11z/data=!3m1!4b1!4m6!3m5!1s0x4b0ca38e6b0aa261:0x9e1fd4001f12261f!8m2!3d47.5556097!4d-52.7452511!16zL20vMGo4cDY?hl=en&entry=ttu">View on Google Maps</a>
                </span>
                <h1>St. John's</h1>
                <h3>August 8, 2022</h3>
                <p>St. John's is the zaza city.</p>
            </div>
        </div>
    )
}