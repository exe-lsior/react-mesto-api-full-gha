import React, { useState } from "react";

function Login({ onLogin }) {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(data.password, data.email);
  };

  return (
      <div className="auth">
        <h1 className="auth__title">Вход</h1>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={data.email || ""}
          />
          <input
            className="auth__input"
            placeholder="Пароль"
            name="password"
            type="password"
            onChange={handleChange}
            value={data.password || ""}
          />
          <button className="auth__button">Войти</button>
        </form>
      </div>
  );
}

export default Login;
