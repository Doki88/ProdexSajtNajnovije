import React from "react"
import "../../styles/imageModal.css"

export default function ImageModal({ src, onClose }) {
    if (!src) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <img src={src} alt="Full view" />
                <button className="closeButton" onClick={onClose}>×</button>
            </div>
        </div>
    )
}
