import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";

import "./NavBar.css";
const NavBar = () => {
  return (

        // <span><img alt="PropiT" src="./images/propitLogo.png" /></span>
        <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <img
            alt="propit"
            src="./images/propitLogo.png"
            width="112"
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Navbar>
  );
};

export default NavBar;
