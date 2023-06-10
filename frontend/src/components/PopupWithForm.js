import React from "react";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  buttonText,
  isLoading,
  isLoadingText,
  onSubmit,
}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_active" : ""}`}>
      <div className={"popup__container"}>
        <button type="button" className="popup__close-icon" onClick={onClose} />
        <h2 className="popup__label">{title}</h2>
        <form
          className={"popup__form"}
          name={`${name}_form`}
          onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            {isLoading ? isLoadingText : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
