import React, { useState } from "react";
import { Navbar, Nav} from 'react-bootstrap'
import "./NavBar.css";
const NavBar: React.FC = () => {
  const [activeLink, setActiveLink] = useState(1);

  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <a className="navbar-brand" href="#">
    //     <img
    //       alt="propit"
    //       src="./images/propitLogo.png"
    //       width="112"
    //       height="30"
    //     />
    //   </a>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarNav"
    //     aria-controls="navbarNav"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNav">
    //     <ul className="navbar-nav">
    //       <li className="nav-item active">
    //         <a
    //           href="#"
    //           className={
    //             activeLink === 1 ? "activeNavLink nav-link" : "nav-link"
    //           }
    //           onClick={() => setActiveLink(1)}
    //         >
    //           חיפוש
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a
    //           href="#"
    //           className={
    //             activeLink === 2 ? "activeNavLink nav-link" : "nav-link"
    //           }
    //           onClick={() => setActiveLink(2)}
    //         >
    //           מועדפים
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a
    //           href="#"
    //           className={
    //             activeLink === 3 ? "activeNavLink nav-link" : "nav-link"
    //           }
    //           onClick={() => setActiveLink(3)}
    //         >
    //           מחשבון שטחים
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a
    //           href="#"
    //           className={
    //             activeLink === 4 ? "activeNavLink nav-link" : "nav-link"
    //           }
    //           onClick={() => setActiveLink(4)}
    //         >
    //           הוספת נכס
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a
    //           href="#"
    //           className={
    //             activeLink === 5 ? "activeNavLink nav-link" : "nav-link"
    //           }
    //           onClick={() => setActiveLink(5)}
    //         >
    //           תגמול שותפים
    //         </a>
    //       </li>

    //       <li className="nav-item">
    //         <a
    //           href="#"
    //           className={
    //             activeLink === 6 ? "activeNavLink nav-link" : "nav-link"
    //           }
    //           onClick={() => setActiveLink(6)}
    //         >
    //           קבל הצעות אישיות
    //         </a>
    //       </li>
    //     </ul>
    //     <ul className="navbar-nav">
    //       <li className="nav-item">
    //         <a href="#" className={"nav-link"} onClick={() => setActiveLink(6)}>
    //           077-9985041
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
    <Navbar collapseOnSelect >
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
          <a
            className={activeLink === 1 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(1)}
            id="1"
            href="#"
          >
            חיפוש
          </a>
          <a
            className={activeLink === 2 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(2)}
            href="#"
          >
            מועדפים
          </a>
          <a
            className={activeLink === 3 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(3)}
            href="#"
          >
            מחשבון שטחים
          </a>
          <a
            className={activeLink === 4 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(4)}
            href="#"
          >
            הוספת נכס
          </a>
          <a
            className={activeLink === 5 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(5)}
            href="#"
          >
            תגמול שותים
          </a>
          <a
            className={activeLink === 6 ? "activeNavLink" : ""}
            onClick={() => setActiveLink(6)}
            href="#"
          >
            קבל הצעות אישיות
          </a>
        </Nav>
        <Nav>
          <a href="#memes">
            077-9985041
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
