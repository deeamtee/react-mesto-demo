class Api {
    constructor({ url, headers }) {
      this._url = url;
      this._headers = headers;
    }
  
    _resAccepted(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        method: "GET",
        headers: this._headers,
      }).then((res) => this._resAccepted(res));
    }
  
    createCard(cardData) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(cardData),
      }).then((res) => this._resAccepted(res));
    }
  
    getUserInfo() {
      return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: this._headers,
      }).then((res) => this._resAccepted(res));
    }
  
    setUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ name: data.name, about: data.about }),
      }).then((res) => this._resAccepted(res));
    }
  
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._resAccepted(res));
    }
  
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers,
      }).then((res) => this._resAccepted(res));
    }
  
    setAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({ avatar: data.avatar }),
      }).then((res) => this._resAccepted(res));
    }
  }
  
  const optionsApi = {
    url: "https://mesto.nomoreparties.co/v1/cohort-75",
    headers: {
      authorization: "a2e53856-d081-4f31-b654-cd6028925996",
      "Content-Type": "application/json",
    },
  };
  
  const api = new Api(optionsApi);
  
  export default api;