import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { api } from "../utils/api.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPoput.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip.js";
import usePopupClose from "../utils/hooks/usePopupClose.js";

function App() {
  //стейты всех попапов
  const [isEditProfilePopupOpen, setEditProfilePopupIsOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupIsOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupIsOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const [selectedCard, setCardSelected] = useState({ name: "", link: "" });

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [isLoggedIn, setLoggedIn] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isTooltipOpen

  usePopupClose(isOpen, closeAllPopups);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((response) => {
          if (response) {
            setUserEmail(response.data.email);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((response) => {
        setCurrentUser(response.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((response) => {
        setCards(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onLogin(password, email) {
    auth
      .authorize(password, email)
      .then((response) => {
        if (response.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", response.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsSuccess(false);
        handleTooltipOpen();
      });
  }

  function onRegister(password, email) {
    auth
      .register(password, email)
      .then(() => {
        navigate("/sign-in", { replace: true });
        setIsSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setIsSuccess(false);
      })
      .finally(() => handleTooltipOpen());
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
  }

  //функции открытия
  function handleEditProfileClick() {
    setEditProfilePopupIsOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupIsOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupIsOpen(true);
  }

  function handleCardClick(card) {
    setCardSelected(card);
    setIsImagePopupOpen(true);
  }

  function handleTooltipOpen() {
    setIsTooltipOpen(true);
  }

  //функция закрытия всех попапов
  function closeAllPopups() {
    setEditProfilePopupIsOpen(false);
    setEditAvatarPopupIsOpen(false);
    setAddPlacePopupIsOpen(false);
    setIsImagePopupOpen(false);
    setIsTooltipOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .setLike(card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard)
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api
      .deleteElement(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(info) {
    setIsLoading(true);

    api
      .editProfile(info)
      .then((response) => {
        setCurrentUser(response.data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);

    api
      .editAvatar(avatar)
      .then((response) => {
        setCurrentUser(response);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);

    api
      .addNewElement(cardData)
      .then((response) => {
        setCards([response, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          isLoggedIn={isLoggedIn}
          onSignOut={onSignOut}
          userEmail={userEmail}
        />
        <Routes>
          <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            }
          />
        </Routes>

        {isLoggedIn ? <Footer /> : null}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
