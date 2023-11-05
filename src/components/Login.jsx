import React from "react";
import Header from "./Header";

function Login() {
  return (
    <>
    <Header text="Регистрация" />
    <section className="login">
    <h2 className="login__heading">Вход</h2>
        <form className="login__form">
            <input type="email" className="login__input login__input_type_email" placeholder="Email" />
            <input type="password" className="login__input login__input_type_password" placeholder="Пароль" />
            <button type="submit" className="login__button">Войти</button>
        </form>
    </section>
    </>
  );
}

export default Login;