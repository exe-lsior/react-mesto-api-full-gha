import React from "react";
import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  function handleCardNameChange(evt) {
    setCardName(evt.target.value);
  }

  function handleCardLinkChange(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddCard({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name={"add-card"}
      title={"Новое место"}
      buttonText={"Сохранить"}
      isLoading={isLoading}
      isLoadingText={"Создание карточки"}>
      <input
        type="text"
        placeholder="Название"
        className="popup__input"
        name="elementTitle"
        onChange={handleCardNameChange}
        value={cardName || ""}
        minLength={2}
        maxLength={30}
        required
      />
      <span className="popup__input-error name-error"></span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        name="elementLink"
        onChange={handleCardLinkChange}
        value={cardLink || ""}
        required
      />
      <span className="popup__input-error description-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
