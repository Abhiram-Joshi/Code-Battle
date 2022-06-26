import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../../images/Logo.svg";
import cookie from "react-cookies";
import { logOut } from "../../../services/firebase";
import logout_icon from "../../../images/log_icon.svg";
import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();
  const email = cookie.load("key");

  return (
    <nav className="navbar navbar-expand-lg fixed-top "> 
      <a href="/" className="logo-margin">
        <img src={logo} className="logo-" alt="timemator"/>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="nav-center" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <h2 className='navbar-heading'>Code Battle</h2>
          </div>
      </div> 
      {email ?               
        <li className="nav-end navbar-right">
          <button className="logout-btn" onClick={logOut}>
            <img src={logout_icon} className="logoutBtn" alt="doc-diff"/>
          </button> 
        </li> : <></>}
    </nav>
  );
};

export default Navbar;
