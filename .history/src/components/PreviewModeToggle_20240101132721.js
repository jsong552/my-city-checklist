import React from "react";

export default function PreviewModeToggle(props) {
    return (
        <button
            className="previewMode"
            onClick={(event) => props.handlePreviewToggle(event)}>
        Enter Preview Mode</button>
    )
}