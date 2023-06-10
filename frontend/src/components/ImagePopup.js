function ImagePopup({ isOpen, onClose, card }) {
  return (
    <div className={`popup popup_card ${isOpen ? "popup_active" : ""}`}>
      <div className="popup__element">
        <button
          className="popup__close-icon"
          type="button"
          id="cd_close_popup"
          onClick={onClose}
        />
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__description">{card?.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
