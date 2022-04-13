import React, { Component } from "react";
import "./style.css";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => val.length > 0 && (valid = false));

  return valid;
};

export default class Register extends Component {
  URL_SERVER_REGISTER = "http://localhost:5000/register";

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
        username: "",
        email: "",
        password: "",
      },
    };
  }

  formValid = (formErrors) => {
    let valid = true;

    Object.values(formErrors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
  };

  handleRegister(event) {
    event.preventDefault();

    if (formValid(this.state.formErrors)) {
    } else {
      console.log("Error");
    }
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let formErrors = this.state.formErrors;

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3
            ? "minimun 3 charaters is required"
            : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3
            ? "minimun 3 charaters is required"
            : "";
        break;
      case "email":
        formErrors.email =
          emailRegex.test(value)
            ? ""
            : "Invalid Email";
        break;
      case "password":
        formErrors.password =
          value.length < 6
            ? "minimun 6 charaters is required"
            : "";
        break;
      case "username":
        formErrors.username =
          value.length < 6
            ? "minimun 3 charaters is required"
            : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors: formErrors });

  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    let formErrors = this.state.formErrors;

    formErrors.firstName =
      firstName.length < 3 ? "minimun 3 charaters is required" : "";

    formErrors.lastName =
      lastName.length < 3 ? "minimun 3 charaters is required" : "";

    formErrors.username =
      username.length < 3 ? "minimun 3 charaters is required" : "";

    formErrors.email = emailRegex.test(email) ? "" : "Invalid Email";
    formErrors.password =
      password.length < 6 ? "minimun 6 charaters is required" : "";

    console.log(formErrors);
    console.log(formValid(formErrors));

    this.setState({ formErrors: formErrors });
    var user = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    if (formValid(formErrors)) {
      fetch(this.URL_SERVER_REGISTER, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "content-type": "application/json" },
      })
    }

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
            <div className="row">
              <div className="firstName">
                <label
                  htmlFor="firstName"
                  className={
                    this.state.formErrors.firstName.length > 0 ? "error" : null
                  }
                >
                  First Name
                </label>
                <input
                  className="firstNameInput"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  
                  onChange={this.handleChange}
                />
                {this.state.formErrors.firstName.length > 0 && (
                  <span className="errorMessage">
                    {this.state.formErrors.firstName}
                  </span>
                )}
              </div>
              <div className="lastName">
                <label
                  htmlFor="lastName"
                  className={
                    this.state.formErrors.lastName.length > 0 ? "error" : null
                  }
                >
                  Last Name
                </label>
                <input
                  className="firstNameInput"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                />
                {this.state.formErrors.lastName.length > 0 && (
                  <span className="errorMessage">
                    {this.state.formErrors.lastName}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="inputBox">
            <label
              htmlFor="username"
              className={
                this.state.formErrors.username.length > 0 ? "error" : null
              }
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={this.handleChange}
              placeholder="Username"
            />
            {this.state.formErrors.username.length > 0 && (
              <span className="errorMessage">
                {this.state.formErrors.username}
              </span>
            )}
          </div>
          <div className="inputBox">
            <label
              htmlFor="email"
              className={
                this.state.formErrors.lastName.length > 0 ? "error" : null
              }
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={this.handleChange}
            />
            {this.state.formErrors.email.length > 0 && (
              <span className="errorMessage">
                {this.state.formErrors.email}
              </span>
            )}
          </div>
          <div className="inputBox">
            <label
              htmlFor="password"
              className={
                this.state.formErrors.lastName.length > 0 ? "error" : null
              }
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Password"
            />
            {this.state.formErrors.password.length > 0 && (
              <span className="errorMessage">
                {this.state.formErrors.password}
              </span>
            )}
          </div>
          <div className="inputBox">
            <input type="submit" value="SingUp" />
          </div>
        </div>
        <p className="forget">
          Forget Password ? <a href="#">Click Here</a>
        </p>
      </form>
    );
  }
}
