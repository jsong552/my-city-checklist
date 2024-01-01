import React from "react";

export default function PreviewModeToggle(props) {
    return (
        <button
            className="previewMode"
            onClick={(event) => props.handlePreviewToggle(event)}>
        {!props.preview && <span>Enter Preview Mode</span>}
        {props.preview && <span>Exit Preview Mode</span>}
        </button>
    )
}