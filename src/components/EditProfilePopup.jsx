import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-span">
        <input
          type="text"
          id="name"
          className="popup__input popup__input_type_name"
          name="name"
          required
          minLength="2"
          maxLength="40"
          value={name || ''}
          onChange={handleChangeName}
        />
        <span className="popup__error name-error"></span>
      </fieldset>
      <fieldset className="popup__input-span">
        <input
          type="text"
          id="job"
          className="popup__input popup__input_type_job"
          name="job"
          required
          minLength="2"
          maxLength="200"
          value={description || ''}
          onChange={handleChangeDescription}
        />
        <span className="popup__error job-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}