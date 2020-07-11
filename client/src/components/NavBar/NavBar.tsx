import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";

import "./NavBar.css";
const NavBar = () => {
  const [activeLink, setActiveLink] = useState(1);

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="#home">
        <img
          alt="propit"
          src="./images/propitLogo.png"
          width="112"
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className={activeLink === 1 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(1)}
            id="1"
            href="#"
          >
            חיפוש
          </Nav.Link>
          <Nav.Link
            className={activeLink === 2 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(2)}
            href="#"
          >
            מועדפים
          </Nav.Link>
          <Nav.Link
            className={activeLink === 3 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(3)}
            href="#"
          >
            מחשבון שטחים
          </Nav.Link>
          <Nav.Link
            className={activeLink === 4 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(4)}
            href="#"
          >
            הוספת נכס
          </Nav.Link>
          <Nav.Link
            className={activeLink === 5 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(5)}
            href="#"
          >
            תגמול שותים
          </Nav.Link>
          <Nav.Link
            className={activeLink === 6 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(6)}
            href="#"
          >
            קבל הצעות אישיות
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2} href="#memes">
            077-9985041
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
