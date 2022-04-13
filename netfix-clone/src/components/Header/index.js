import React, { Component } from "react";
import "./style.css";

import { NavLink, Link } from "react-router-dom";
import {Icon} from "react-icons-kit"
import {ic_keyboard_arrow_right} from "react-icons-kit/md/ic_keyboard_arrow_right"

class Header extends Component {
  render() {
    return (
      <div>
        <div className="header-container">
          <div className="header-top">
            <img src={require("../../assets/svg/logo.svg")} alt="Logo" />
            <NavLink className="sign-in-btn" to="#">Sign In</NavLink>
          </div>
          <div className="header-content">
            <h1>See What Next</h1>
            <h2>WATCH ANYWHERE, CANCEL ANYTIME</h2>
            <Link className="offer-btn">Try It Now!
            <Icon className="icon" icon={ic_keyboard_arrow_right} size={32}/> </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

