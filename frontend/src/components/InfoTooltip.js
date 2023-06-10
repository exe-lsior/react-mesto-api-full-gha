import successIcon from "../images/Success.svg";
import errorIcon from "../images/Error.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_active" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-icon" onClick={onClose} />
        <div className="popup__tooltip">
          <img
            className="popup__tooltip-icon"
            src={isSuccess ? successIcon : errorIcon}
            alt={isSuccess ? "success" : "error"}
          />
          <p className="popup__tooltip-text">
            {isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
