import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_image ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__contain">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
        ></button>
        <figure className="popup__image-caption">
          <img src={card.link} alt={card.name} className="popup__image" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;