import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import active from "../images/active.svg"

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) 
{
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="width">
      <section className="profile">
        <div
          className="profile__image-container"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button
            className="profile__image-edit"
            type="button"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name" id="name-info">
            {currentUser.name}
          </h1>
          <button
            className="profile__button-edit"
            type="button"
            id="open_popup"
            onClick={onEditProfile}
          />
          <p className="profile__info-description" id="description-info">
            {currentUser.about}
          </p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          id="open_el_popup"
          onClick={onAddPlace}
        />
      </section>
      <section id="elements">
        <ul className="elements"></ul>
      </section>

      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
            ))}
        </ul>
      </section>
      <div className={active}></div>
    </main>
  );
}

export default Main;
