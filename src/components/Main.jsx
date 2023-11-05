import React from "react";
import vector from "../images/Vector.svg";
import editButton from "../images/edit-button.svg";
import plusIcon from "../images/plus.svg";
import Api from "../utils/Api.js";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__avatar-info">
            <div className="profile__container">
              <img
                src={avatar}
                alt="Жак-Ив Кусто"
                className="profile__avatar"
              />
              <div className="profile__overlay">
                <img
                  className="profile__vector"
                  src={vector}
                  alt="Иконка редактирования"
                  onClick={onEditAvatar}
                />
              </div>
            </div>
            <div className="profile__info">
              <div className="profile__author-edit">
                <h1 className="profile__author">{name}</h1>
                <button
                  className="profile__edit"
                  type="button"
                  onClick={onEditProfile}
                >
                  <img
                    src={editButton}
                    alt="Карандаш"
                    className="profile__edit-button"
                  />
                </button>
              </div>
              <p className="profile__description">{about}</p>
            </div>
          </div>
          <button
            className="profile__button"
            type="button"
            onClick={onAddPlace}
          >
            <img
              src={plusIcon}
              alt="Знак плюс"
              className="profile__add-button"
            />
          </button>
        </section>
        <section className="cards">
          <ul className="cards__list">
            {cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;