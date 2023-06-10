import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ onRegister }) {
  const [data, setData] = useState({
    email: "",
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
    onRegister(data.password, data.email);
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Регистрация</h1>
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
        <button className="auth__button">Зарегистрироваться</button>
      </form>
      <Link to={"/sign-in"} className="auth__link">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
