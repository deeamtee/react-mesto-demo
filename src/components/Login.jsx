import React from "react";

const Login = ({ onLogin }) => {
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
    onLogin(email, password);
  };

  return (
    <>
      <section className="login">
        <h2 className="login__heading">Вход</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="login__input login__input_type_email"
            placeholder="Email"
            onChange={handleChangeEmail}
            value={email}
          />
          <input
            type="password"
            className="login__input login__input_type_password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            value={password}
          />
          <button type="submit" className="login__button">
            Войти
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;
