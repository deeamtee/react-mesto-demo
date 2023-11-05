import React from "react";
import Header from "./Header";

function Register() {
  return (
    <>
    <Header text="Войти" />
    <section className="register">
    <h2 className="register__heading">Регистрация</h2>
        <form className="register__form">
            <input type="email" className="register__input register__input_type_email" placeholder="Email" />
            <input type="password" className="register__input register__input_type_password" placeholder="Пароль" />
            <button type="submit" className="register__button">Зарегистрироваться</button>
        </form>
        <div className="register__about">
          <p className="register__question">Уже зарегистрированы?</p>
          <p className="register__login">Войти</p>
        </div>
    </section>
    </>
  );
}

export default Register;