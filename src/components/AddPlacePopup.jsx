import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onUpdateUser }) {
  const [link, setLink] = React.useState("");
  const [place, setPlace] = React.useState("");

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleChangePlace(e) {
    setPlace(e.target.value);
  }

  React.useEffect(() => {
    if(!isOpen) {
      setLink('');
      setPlace('');
    }
  })

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: place,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-span">
        <input
          type="text"
          id="place"
          className="popup__input popup__input_type_place"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={place}
          onChange={handleChangePlace}
        />
        <span className="popup__error place-error"></span>
      </fieldset>
      <fieldset className="popup__input-span">
        <input
          type="url"
          id="src"
          className="popup__input popup__input_type_src"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__error src-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}