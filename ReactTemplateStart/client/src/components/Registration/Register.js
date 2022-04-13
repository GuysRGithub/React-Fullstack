import React, { Component } from "react";


export class Register extends Component {
  state = {
    lastname: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  
  submitForm = (e) => {
      e.preventDefault();
      
      let data = {
          email: this.state.email,
          name: this.state.name,
          lastname: this.state.lastname,
          password: this.state.password,
          passwordConfirmation: this.state.passwordConfirmation
      }


  }

  isFormValid = ({ email, password }) => {
    let errors = []
  };

  ifFormEmpty = ({email, name, lastname, password, passwordConfirmation}) => {
      return (
          !name.length ||
          !lastname.length ||
          !password.length ||
          !passwordConfirmation.length ||
          !email.length
      )
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <form
            action=""
            className="col 12"
            onSubmit={(event) => this.submitForm(event)}
          >
            {/*  */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="validate"
                  value={this.state.lastname}
                  onChange={(e) => this.handleChange(e)}
                />
                <label className="active" htmlFor="lastname">
                  Last Name
                </label>
                <span
                  className="helper-text"
                  data-error="Please use more than 5 charaters"
                  data-success="Congrate!"
                />
              </div>
            </div>
            {/* Name */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="validate"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                />
                <label className="active" htmlFor="name">
                  Name
                </label>
                <span
                  className="helper-text"
                  data-error="Please use more than 5 charaters"
                  data-success="Congrate!"
                />
              </div>
            </div>
            {/* Email */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="validate"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                />
                <label htmlFor="email">Email</label>
                <span
                  className="helper-text"
                  data-error="Please use correct email"
                  data-success="Congrate!"
                />
              </div>
            </div>

            {/* Password */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="validate"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                />
                <label className="active" htmlFor="password">
                  Password
                </label>
                <span
                  className="helper-text"
                  data-error="Please use more than 5 charaters"
                  data-success="Congrate!"
                />
              </div>
            </div>

            {/* Password */}
            <div className="row">
              <div className="input-field col s12">
                <input
                  type="passwordConfirmation"
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  className="validate"
                  value={this.state.passwordConfirmation}
                  onChange={(e) => this.handleChange(e)}
                />
                <label className="active" htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
                <span
                  className="helper-text"
                  data-error="Please use more than 5 charaters"
                  data-success="Congrate!"
                />
              </div>
            </div>
            {/*  */}
            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighter-2"
                  type="submit"
                  onClick={this.submitForm}
                >
                  Create Account
                </button>
              </div>
            </div>
            {/*  */}
          </form>
        </div>
      </div>
    );
  }
}
