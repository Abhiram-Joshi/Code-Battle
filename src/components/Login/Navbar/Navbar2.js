import React from 'react';
import { useNavigate } from "react-router-dom";
import logo from "../../../images/Logo.svg";
import "./Navbar.css";

const Navbar = () => {

  const navigate = useNavigate();

  return (

    <nav className="navbar navbar-expand-lg fixed-top "> 
      <a href="/" className="logo-margin">
        <img src={logo} className="logo-" alt="timemator"/>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="#home" onClick={() => navigate('/#home')}>Home </a>
            <a className="nav-link dot px-5 disabled" href="/#">      ●      </a> 
            <a className="nav-item nav-link" href="#aboutus" onClick={() => navigate('/#aboutus')}>About us</a>  
          </div>
      </div> 
    </nav>
  );
};

export default Navbar;
