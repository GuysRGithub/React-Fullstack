import React, { Component } from "react";
import "./style.css";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\/[a-zA-Z0-9]+)*$/
);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach(
    (val) => val.length > 0 && (valid = false)
  );

  return valid
};

export default class Form extends Component {
  URL_SERVER = "http://localhost:5000/register";

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  }

  handleRegister(event) {
    event.preventDefault();

    if (formValid(this.state.formErrors)) {
    } else {
      console.log("Error");
    }
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 6 && value.length > 0
            ? "minimun 3 charaters is required"
            : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 6 && value.length > 0
            ? "minimun 3 charaters is required"
            : "";
        break;
      case "email":
        formErrors.email =
         emailRegex.test(value) && value.length > 0
            ? "minimun 3 charaters is required"
            : "";
        break;
      case "password":
        formErrors.firstName =
          value.length < 6 && value.length > 0
            ? "minimun 6 charaters is required"
            : "";
        break;
      case "rePassword":
        formErrors.firstName =
          value.length < 6 && value.length > 0
            ? "minimun 3 charaters is required"
            : "";
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    var user = {
      username,
      password,
    };

    fetch(this.URL_SERVER, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    });
    // .then((res) => res.json())
    // .then((result) => {
    //   console.log(result);
    // });

    console.log(JSON.stringify(user));
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="formLogin">
        <h2>Register</h2>
        <div className="input">
          <div className="inputBox">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder="Email Address" onChange={this.handleChange}/>
          </div>
          <div className="inputBox">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password"
            onChange={this.handleChange} />
          </div>
          <div className="inputBox">
            <input type="submit" value="SignIn" />
          </div>
        </div>
        <p className="forget">
          Forget Password ? <a href="#">Click Here</a>
        </p>
      </form>
    );
  }
}
