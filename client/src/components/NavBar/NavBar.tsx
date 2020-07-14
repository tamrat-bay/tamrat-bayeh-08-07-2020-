import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { IsUserLoggedContext } from "../../contexts/IsUserLoggedContext";

const NavBar: React.FC = () => {
  const [activeLink, setActiveLink] = useState(1);
  const { isUserLogged, setIsUserLogged } = useContext(IsUserLoggedContext);

  const logOut: () => void = () => {
    setIsUserLogged(false);
    localStorage.clear();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img
          alt="propit"
          src="./images/propitLogo.png"
          width="112"
          height="30"
        />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {isUserLogged ? (
            <Link
              to="/tasks"
              className={
                activeLink === 7 ? "activeNavLink nav-link" : "nav-link"
              }
              onClick={() => setActiveLink(7)}
            >
              ניהול משימות
            </Link>
          ) : (
            ""
          )}
          <Link
            to="#"
            className={activeLink === 1 ? "activeNavLink nav-link" : "nav-link"}
            onClick={() => setActiveLink(1)}
          >
            חיפוש
          </Link>

          <Link
            to="#"
            className={activeLink === 2 ? "activeNavLink nav-link" : "nav-link"}
            onClick={() => setActiveLink(2)}
          >
            מועדפים
          </Link>

          <Link
            to="#"
            className={activeLink === 3 ? "activeNavLink nav-link" : "nav-link"}
            onClick={() => setActiveLink(3)}
          >
            מחשבון שטחים
          </Link>

          <Link
            to="#"
            className={activeLink === 4 ? "activeNavLink nav-link" : "nav-link"}
            onClick={() => setActiveLink(4)}
          >
            הוספת נכס
          </Link>

          <Link
            to="#"
            className={activeLink === 5 ? "activeNavLink nav-link" : "nav-link"}
            onClick={() => setActiveLink(5)}
          >
            תגמול שותפים
          </Link>

          <Link
            to="#"
            className={activeLink === 6 ? "activeNavLink nav-link" : "nav-link"}
            onClick={() => setActiveLink(6)}
          >
            קבל הצעות אישיות
          </Link>
        </ul>
        <ul className="navbar-nav">
          {isUserLogged ? (
            <Link onClick={logOut} className={"nav-link"} to="/">
              התנתקות
            </Link>
          ) : (
            <>
              <Link
                className={"nav-link"}
                to="/register"
                onClick={() => setActiveLink(0)}
              >
                הרשמה
              </Link>

              <Link
                className="nav-link"
                to="/login"
                onClick={() => setActiveLink(0)}
              >
                התחברות
              </Link>
            </>
          )}

          <Link to="#" className={"nav-link"} onClick={() => setActiveLink(0)}>
            077-9985041
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
