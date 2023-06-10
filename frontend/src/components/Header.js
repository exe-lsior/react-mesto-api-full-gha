import { Route, Routes, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ onSignOut, userEmail }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="место" />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__container">
              <p className="header__email">{userEmail}</p>
              <button className="header__button" onClick={onSignOut}>
                Выход
              </button>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to={"/sign-in"}>
              Вход
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to={"/sign-up"}>
              Регистрация
            </Link>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
