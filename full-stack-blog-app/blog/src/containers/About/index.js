import React, { Component } from "react";
import CardArticle from "../../components/UI/Card/CardArticle";
import "./style.css";

const URL_SERVER = "http://localhost:5000";

class About extends Component {
  constructor() {
    super();
    this.state = {
      test: [],
    };
  }

  componentDidMount() {
    fetch(URL_SERVER + "/api/test")
      .then((res) => res.json())
      .then((test) =>
        this.setState({ test }, () => console.log("Customer fetched..", test))
      );
  }

  render() {
    return (
      <div className="about">
        <div className="welcome">
          <h1>WELCOME</h1>
          <h2>
            We're Eight Hour Day, a creative studio that loves to learn,
            collaborate and create.
          </h2>
        </div>
        <div className="image">
          <img
            src={require("../../assets/images/others/bled-2608425_1920.jpg")}
            alt=""
          />
        </div>
        <div className="introduce">
          <p>
            Hi! We are Nathan Strandberg and Katie Kirk, two individuals with a
            passion for creativity — creativity makes us happy. We truly believe
            in the transformative power of illustration and design and their
            ability to simplify communications, elevate experiences, engage and
            inspire people everywhere. Good design and good relationships come
            from collaboration. We're excited to start a visual dialogue, learn
            about you, and make something beautiful together.
          </p>
        </div>
        <div className="aboutOur">
          <div className="about left">
            <div className="title">
              <span> OUR PROCESS</span>
            </div>
            <img
              src={require("../../assets/images/others/EHD_Process.jpg")}
              alt=""
            />
          </div>
          <div className="about right">
            <div className="title">
            <span> OUR MARIT</span>
            </div>
            <img
              src={require("../../assets/images/others/EHD_Merit.jpg")}
              alt=""
            />
          </div>
        </div>
        <div className="more">
          <div className="address">
            <div className="content">
              <span>612 224 9945</span>
              <span>HELLO@EIGHTHOURDAY.COM</span>
              <span>EIGHTHOURDAY.COM</span>
              <span>SUITE 210</span>
              <span>MINNEAPOLIS, MN 55401</span>
            </div>
            <div className="bottom">
              <span>CONNECT</span>
              <div className="social">
                <ul>
                  <li>
                    <i className="fab fa-facebook-f"></i>
                  </li>
                  <li>
                    <i className="fab fa-twitter"></i>
                  </li>
                  <li>
                    <i className="fab fa-github"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="imageAddress">
            <img
              src="http://eighthourday.com/uploads/site/EHD_Studio_Dog.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
