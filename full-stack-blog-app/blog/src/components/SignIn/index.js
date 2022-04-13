import React, { Component } from "react";
import "./style.css";
export class SignIn extends Component {
  render() {
    return (
      <div className="container">
        <div className="formSignIn">
        <h1>LOGIN</h1>
          <form action="">
            <input type="text" name="username" placeholder="Username" />
            <input
              type="text"
              name="password"
              id="signInPassword"
              placeholder="Password"
            />
            <button type="submit" className="signInSubmit-btn">
              LogIn
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
