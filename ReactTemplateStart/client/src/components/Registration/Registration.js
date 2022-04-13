import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user_action";

export class Registration extends Component {
  constructor(props) {
    this.state = {
      email: "",
      name: "",
      password: "",
      errors: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    };

    if (this.isFormValid(this.state)) {
      this.setState({ errors: [] });

      this.props.dispatch(loginUser(data)).then((response) => {
        if (response.payload.loginSuccess) {
          this.props.history.push('/')
        } else {
          this.setState({errors: "Autheticate failed. Please try again."})
        }
      });
    } else {
      this.setState({
        errors: this.state.errors.concat("Form is not valaid")
      })
    }
  };

  isFormValid = ({ email, password }) => {
    return email && password;
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <form
            action=""
            className="col 12"
            onSubmit={(event) => this.submitForm(event)}
          >
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
                <label htmlFor="password">Password</label>
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
                ></button>
              </div>
            </div>
            {/*  */}
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
