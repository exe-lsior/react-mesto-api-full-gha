import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={"edit-profile"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
      isLoading={isLoading}
      isLoadingText={"Сохранение"}>
      <input
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_name"
        name="name"
        value={name || ""}
        minLength={2}
        maxLength={40}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error name-error"></span>
      <input
        type="text"
        placeholder="Вид деятельности"
        className="popup__input popup__input_description"
        name="description"
        value={description || ""}
        minLength={2}
        maxLength={200}
        onChange={handleDescriptionChange}
        required
      />
      <span className="popup__input-error description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
