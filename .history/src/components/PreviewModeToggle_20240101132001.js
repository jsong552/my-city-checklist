import React from "react";

export default function PreviewModeToggle(props) {
    return (
        <button
            className="previewMode"
            onClick={props.handlePreviewToggle}>
        Enter Preview Mode</button>
    )
}