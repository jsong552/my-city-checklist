import React from "react";
import PreviewModeToggle from "./PreviewModeToggle";

export default function Navbar(props) {
    return (
        <nav className="navbar">
            <span className="logo">
            <img src='/my-city-checklist/images/logo.png' alt="logo"/>
            <p>my city checklist</p></span>
            <PreviewModeToggle 
                preview={props.preview}
                handlePreviewToggle={(event) => props.handlePreviewToggle(event)}
            />
        </nav>
    )
}