import React from "react";

import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import * as auth from "../utils/Auth.jsx";
import ProtectedRouteElement from "./ProtectedRoute";
import { useNavigate } from "react-router-dom";

import unionSuccess from "../images/Union-success.svg";
import unionFail from "../images/Union-fail.svg";

import Header from "./Header.jsx";
import Main from "./Main.jsx";
import ImagePopup from "./ImagePopup.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Api from "../utils/Api.js";

import "../pages/index.css";

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [userData, setUserData] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [infoToolTipImage, setInfoToolTipImage] = React.useState("");
  const [infoToolTipTitle, setInfoToolTipTitle] = React.useState("");

  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([Api.getInitialCards(), Api.getUserInfo()])
      .then(([items, user]) => {
        setCards(items);
        setCurrentUser(user);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkToken(jwt).then((data) => {
        if (data) {
          setLoggedIn(true);
          setEmail(data.data.email);
          setUserData(userData);
          navigate("/", { replace: true });
        }
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
    setEmail(null);
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        console.log(res);
        setInfoToolTipImage(unionSuccess);
        setInfoToolTipTitle("Вы успешно зарегистрировались!");
        navigate("/signin", { replace: true });
      })
      .catch(() => {
        setInfoToolTipImage(unionFail);
        setInfoToolTipTitle("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoToolTipOpen);
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setEmail(email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch(() => {
        setInfoToolTipImage(unionFail);
        setInfoToolTipTitle("Что-то пошло не так! Попробуйте ещё раз.");
        handleInfoToolTipOpen();
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardDelete(cardId) {
    Api.deleteCard(cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardId));
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleInfoToolTipOpen = () => {
    setIsInfoToolTipOpen(!isInfoToolTipOpen);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(!selectedCard);
  };

  const handleUpdateUser = (userInfo) => {
    Api.setUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (avatarInfo) => {
    Api.setAvatar(avatarInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (info) => {
    Api.createCard(info)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
         
          <Route path="/signup" element={
              <>
                <Header title="Войти" route="/signin" />
                <Register onSubmit={handleRegister} />
              </>
            }
          />
          <Route path="/signin" element={ <> <Header title="Регистрация" route="/signup" /> <Login onLogin={handleLogin} /> </>}/>
          <Route path="/" element={<> <Header title="Выйти" route="/signin" onSignOut={signOut} email={email}/>
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  userData={userData}
                  cards={cards}
                />
              </>
            }
          />
        </Routes>

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          img={infoToolTipImage}
          title={infoToolTipTitle}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;