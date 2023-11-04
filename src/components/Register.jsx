import React from "react";
import { Link } from "react-router-dom";

const Register = ({ onSubmit }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <>
      <section className="register">
        <h2 className="register__heading">Регистрация</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            id="email"
            onChange={handleChangeEmail}
            className="register__input register__input_type_email"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            id="password"
            onChange={handleChangePassword}
            className="register__input register__input_type_password"
            placeholder="Пароль"
          />
          <button type="submit" className="register__button">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__about">
          <p className="register__question">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__login">
            Войти
          </Link>
        </div>
      </section>
    </>
  );
};

export default Register;
