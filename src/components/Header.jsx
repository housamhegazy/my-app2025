import React from "react";
import { NavLink } from "react-router-dom";
import './header.css'

const Header = () => {
  return (
    <>
      <header className="hide-when-mobile">
        <h1> <NavLink to="/">Courses 4 Arab</NavLink> </h1>
        <ul className="flex">
          <li className="main-list">
            <NavLink className="main-link" to="/html">
              HTML
            </NavLink>
          </li>
          <li className="main-list">
            <NavLink className="main-link" to="/css">
              CSS
            </NavLink>
          </li>
          <li className="main-list">
            <NavLink className="main-link" to="/javascript">
              JavaScript
            </NavLink>
          </li>
        </ul>
      </header>

      {/* Header for mobile (hidden on desktop) */}
      <header className="show-when-mobile">
        <h1> <NavLink href="/">Courses 4 Arab</NavLink> </h1>
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
      </header>
    </>
  );
};

export default Header;
