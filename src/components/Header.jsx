import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import "../theme.css";
import ThemeContexttt from "../context/themeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [user, loading, error] = useAuthState(auth);
  const { theme, changeTheme } = useContext(ThemeContexttt);
  const [showLangs, setShowLangs] = useState(false);
  const dropdownRef = useRef(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // دالة للتحقق من النقر خارج القائمة
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLangs(false); // إذا كان النقر خارجها، أغلق القائمة
      }
    }

    // إضافة مستمع لحدث 'mousedown' على كامل النافذة
    document.addEventListener("mousedown", handleClickOutside);

    // 4. إزالة المستمع عند إلغاء تحميل المكون
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]); // أعد تشغيل التأثير عند تغير المرجع

  const handleOpenMenu = () => {
    setShowLangs(!showLangs);
  };

  return (
    <>
      <header className=" hide-when-mobile">
        <h1 className="logo">
          {" "}
          <NavLink to="/">Courses 4 Arab</NavLink>{" "}
        </h1>
        <button
          onClick={() => {
            changeTheme(theme === "light" ? "dark" : "light");
          }}
          className="theme-btn"
        >
          <i className="fa-solid fa-moon" />
          <i className="fa-solid fa-sun" />
        </button>

        <ul className="flex">
          <li className="main-list">
            <p onClick={handleOpenMenu} className="lang">
              {t("lang")} 
            </p>
            {showLangs && (
              <ul ref={dropdownRef} className="lang-box">
                <li
                  onClick={() => {
                    i18n.changeLanguage("ar");
                  }}
                >
                  العربيه{" "}
                  {i18n.language == "ar" && (
                    <i className="fa-solid fa-check"></i>
                  )}{" "}
                </li>
                <li
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  English{" "}
                  {i18n.language == "en" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
                <li
                  onClick={() => {
                    i18n.changeLanguage("fr");
                  }}
                >
                  French{" "}
                  {i18n.language == "fr" && (
                    <i className="fa-solid fa-check"></i>
                  )}
                </li>
              </ul>
            )}
          </li>

          {!user && (
            <>
              <li className="main-list">
                <NavLink to="/signin"> {t("signin")} </NavLink>
              </li>
              <li className="main-list">
                <NavLink to="/signup"> {t("signup")} </NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="main-list">
                <NavLink className="main-link" to="/html">
                  HTML
                </NavLink>
              </li>

              <li className="main-list">
                <NavLink className="main-link" to="/javascript">
                  JavaScript
                </NavLink>
              </li>
              <li className="main-list">
                {/* sign out  */}
                <button
                  onClick={() => {
                    signOut(auth)
                      .then(() => {
                        // Sign-out successful.
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                  className="main-link"
                >
                  {t("signout")}
                </button>
              </li>
              <li className="main-list">
                {/* sign out  */}
                <NavLink to={"/profile"}>{t("profile")} </NavLink>
              </li>
            </>
          )}
        </ul>
      </header>

      {/* Header for mobile (hidden on desktop) */}
      {/* <header className="show-when-mobile">
        <h1>
          {" "}
          <NavLink href="/">Courses 4 Arab</NavLink>{" "}
        </h1>
        <label className="absolute" htmlFor="burger">
          <i className="fas fa-bars"></i>
        </label>
        <input id="burger" type="checkbox" />

        <div className="show-on-click">
          <div className="main-div">
            <label htmlFor="html">
              HTML <i className="fas fa-plus"></i>{" "}
            </label>
            <input id="html" type="checkbox" />
            <ul className="sub-div">
              <li>
                <a href="">Full Course</a>
              </li>
              <li>
                <a href="">Crash Course</a>
              </li>
              <li>
                <a href="">learn in 1h</a>
              </li>
            </ul>
          </div>

          <div className="main-div">
            <label htmlFor="css">
              CSS <i className="fas fa-plus"></i>{" "}
            </label>
            <input id="css" type="checkbox" />
            <ul className="sub-div">
              <li>
                <NavLink href="">Full Course</NavLink>
              </li>
              <li>
                <a href="">CSS Examples</a>
              </li>
              <li>
                <label className="mini-projects" htmlFor="mini">
                  mini projects <i className="fas fa-plus"></i>{" "}
                </label>
                <input id="mini" type="checkbox" />
                <ul className="sub-sub-div">
                  <li>
                    <a href="">project 1</a>
                  </li>
                  <li>
                    <a href="">project 2</a>
                  </li>
                  <li>
                    <a href="">project 3</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="main-div">
            <label htmlFor="js">
              JavaScript <i className="fas fa-plus"></i>{" "}
            </label>
            <input id="js" type="checkbox" />
            <ul className="sub-div">
              <li>
                <a href="">coming soon&#128293;</a>
              </li>
            </ul>
          </div>
        </div>
      </header> */}
    </>
  );
};

export default Header;
