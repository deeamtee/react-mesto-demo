import Card from "../components/Card.js";

import { validationConfig as config } from "../utils/constants.js";

import { FormValidator } from "../components/FormValidator.js";

import Section from "../components/Section.js";

import PopupWithImage from "../components/PopupWithImage.js";

import PopupWithForm from "../components/PopupWithForm.js";

import UserInfo from "../components/UserInfo.js";

import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import "./index.css";
import { data } from "autoprefixer";

import api from "../components/Api.js";

const profileEditButton = document.querySelector(".profile__edit");
const popupOpenedProfile = document.querySelector(".popup_type_profile");

const confirmPopup = document.querySelector(".popup_type_confirm");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");

const profileAuthor = document.querySelector(".profile__author");
const profileDescription = document.querySelector(".profile__description");
const avatar = document.querySelector(".profile__avatar");
const avatarEditBtn = document.querySelector(".profile__vector");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarInput = document.querySelector(".popup__input_type_avatar");

const popupAddCard = document.querySelector(".popup_type_add-card");
const addButton = document.querySelector(".profile__button");

const popupTypeImage = document.querySelector(".popup_type_image");

const cardsList = document.querySelector(".cards__list");

let userId;

/*------- Создание секции -------*/

const cardList = new Section(
  {
    renderItems: (data) => {
      const cardElement = generateCard(data);
      cardList.addItem(cardElement);
    },
  },
  cardsList
);

/*------- Изначальная отрисовка карточек и информация о пользователе -------*/

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([items, user]) => {
    userId = user._id;
    cardList.renderItems(items);
    userInfo.setUserInfo(user);
  })
  .catch((error) => {
    console.log(error);
  });

/*------- Создание попап картинки, конфирмации и профиля -------*/

const imagePopup = new PopupWithImage(popupTypeImage);
imagePopup.setEventListeners();

const popupConfirm = new PopupWithConfirmation(confirmPopup);
popupConfirm.setEventListeners();

const userInfo = new UserInfo({
  userName: profileAuthor,
  userJob: profileDescription,
  avatar: avatar,
});

/*------- Создание попап форм -------*/

const popupCardAdd = new PopupWithForm(popupAddCard, handleSubmitFormCard);
popupCardAdd.setEventListeners();

const popupAvatar = new PopupWithForm(avatarPopup, handleSubmitFormAvatar);
popupAvatar.setEventListeners();

const popupProfileForm = new PopupWithForm(
  popupOpenedProfile,
  handleSubmitFormProfile
);
popupProfileForm.setEventListeners();

/*------- Создание валидации полей форм -------*/

const cardFormValidation = new FormValidator(config, ".popup_type_add-card");
cardFormValidation.enableValidation();

const profileFormValidation = new FormValidator(
  config,
  ".popup__form_type_profile"
);
profileFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(
  config,
  ".popup__form_type_avatar"
);
avatarFormValidation.enableValidation();

/*------- Создание функций для полей форм -------*/

function handleSubmitFormCard(data) {
  popupCardAdd.renderLoading(true);
  api
    .createCard(data)
    .then((data) => {
      const cardElement = generateCard(data);
      cardList.addItemPrep(cardElement);
    })
    .then(() => {
      popupCardAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupCardAdd.renderLoading(false);
    });
}

function handleSubmitFormAvatar(data) {
  popupAvatar.renderLoading(true);
  api
    .setAvatar(data)
    .then((data) => {
      avatar.src = data.avatar;
    })
    .then(() => {
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAvatar.renderLoading(false);
    });
}

function handleSubmitFormProfile(data) {
  popupProfileForm.renderLoading(true);
  api
    .setUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => {
      popupProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupProfileForm.renderLoading(false);
    });
}

/*------- Остальные функции -------*/

function deleteConfirmOpen(id) {
  popupConfirm.open(id);
}

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

/*------- Слушатели событий -------*/

avatarEditBtn.addEventListener("click", () => {
  popupAvatar.open();
  avatarFormValidation.resetValidation();
});

addButton.addEventListener("click", () => {
  popupCardAdd.open();
  cardFormValidation.resetValidation();
});

profileEditButton.addEventListener("click", () => {
  popupProfileForm.open();
  const profileFormValues = userInfo.getUserInfo();

  nameInput.value = profileFormValues.name;
  jobInput.value = profileFormValues.job;

  profileFormValidation.resetValidation();
});

/*------- Функция создания карточки -------*/

const generateCard = (item) => {
  const card = new Card(
    item,
    ".card-template_type_default",
    handleCardClick,
    (id) => {
      api
        .setLikes(id)
        .then((data) => {
          card.addLikeButton(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    (id) => {
      api
        .deleteLikes(id)
        .then((data) => {
          card.removeLikeButton(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteConfirmOpen,
    (card) => {
      popupConfirm.formSubmitCallback((id) => {
        api
          .deleteCard(id)
          .then(() => {
            card.delete();
          })
          .then(() => {
            popupConfirm.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    userId
  );
  const cardElement = card.generateCard();

  return cardElement;
};