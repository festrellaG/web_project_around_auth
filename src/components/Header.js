import { useEffect, useState } from "react";
import { checkToken } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";
import imageLogo from "../images/logo_header.png";
import "../blocks/header.css";
import Navbar from "./Navbar";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isMainPage = location.pathname === "/main";
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (isMainPage) {
      async function fetchEmail() {
        try {
          const token = localStorage.getItem("jwt");
          const data = await checkToken(token);
          console.log(data);
          if (data) {
            setUserEmail(data.email);
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchEmail();
    }
  }, [isMainPage]);

  let buttonText = "";
  if (isLoginPage) {
    buttonText = "Registrate";
  } else if (isRegisterPage) {
    buttonText = "Inicia sesión";
  } else if (isMainPage) {
    buttonText = "Cerrar sesión";
  }

  const handleButtonClick = () => {
    if (isLoginPage) {
      navigate("/register");
    } else if (isRegisterPage) {
      navigate("/");
    }
  };

  function handleButtonSessionClick() {
    if (isMainPage) {
      navigate("/");
      localStorage.removeItem("jwt");
      setUserEmail("");
    }
  }

  return (
    <header className="header">
      <img
        src={imageLogo}
        alt="Logototipo de una Página iteractiva"
        className="header__logo"
        id="image-logo"
      />
      {isLoginPage || isRegisterPage ? (
        <button className="header_btn" onClick={handleButtonClick}>
          {buttonText}
        </button>
      ) : (
        <div className="header__container">
          <Navbar
            userEmail={userEmail}
            handleButtonClick={handleButtonSessionClick}
            buttonText={buttonText}
          />
        </div>
      )}
      <span className="header__item-divider"></span>
    </header>
  );
}
