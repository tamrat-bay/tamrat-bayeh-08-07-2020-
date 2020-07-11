import React, { useState } from "react";
import { Navbar, NavItem } from 'react-bootstrap'
import "./NavBar.css";
const NavBar: React.FC = () => {
  const [activeLink, setActiveLink] = useState(1);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavItem className="navbar-brand" href="#">
        <img
          alt="propit"
          src="./images/propitLogo.png"
          width="112"
          height="30"
        />
      </NavItem>
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
          <li className="nav-item active">
            <NavItem
              href="#"
              className={
                activeLink === 1 ? "activeNavLink nav-link" : "nav-link"
              }
              onClick={() => setActiveLink(1)}
            >
              חיפוש
            </NavItem>
          </li>
          <li className="nav-item">
            <NavItem
              href="#"
              className={
                activeLink === 2 ? "activeNavLink nav-link" : "nav-link"
              }
              onClick={() => setActiveLink(2)}
            >
              מועדפים
            </NavItem>
          </li>
          <li className="nav-item">
            <NavItem
              href="#"
              className={
                activeLink === 3 ? "activeNavLink nav-link" : "nav-link"
              }
              onClick={() => setActiveLink(3)}
            >
              מחשבון שטחים
            </NavItem>
          </li>
          <li className="nav-item">
            <NavItem
              href="#"
              className={
                activeLink === 4 ? "activeNavLink nav-link" : "nav-link"
              }
              onClick={() => setActiveLink(4)}
            >
              הוספת נכס
            </NavItem>
          </li>
          <li className="nav-item">
            <NavItem
              href="#"
              className={
                activeLink === 5 ? "activeNavLink nav-link" : "nav-link"
              }
              onClick={() => setActiveLink(5)}
            >
              תגמול שותפים
            </NavItem>
          </li>

          <li className="nav-item">
            <NavItem
              href="#"
              className={
                activeLink === 6 ? "activeNavLink nav-link" : "nav-link"
              }
              onClick={() => setActiveLink(6)}
            >
              קבל הצעות אישיות
            </NavItem>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavItem href="#" className={"nav-link"} onClick={() => setActiveLink(6)}>
              077-9985041
            </NavItem>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
