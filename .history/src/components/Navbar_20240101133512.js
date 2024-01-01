import React from "react";
import PreviewModeToggle from "./PreviewModeToggle";

export default function Navbar(props) {
    return (
        <nav className="navbar">
            <img src='/my-city-checklist/images/logo.png' alt="logo"/>
            <p>my city checklist</p>
            <PreviewModeToggle 
                preview={props.preview}
                handlePreviewToggle={(event) => props.handlePreviewToggle(event)}
            />
        </nav>
    )
}