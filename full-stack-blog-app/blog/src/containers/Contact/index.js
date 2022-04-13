import React from "react";
import "./style.css";

const Contact = (props) => {
  return (
    <div className="contact">
      <div className="title">
        <h1>HAVE SOME QUESTIONS?</h1>
        <span>
          HAVE SOME QUESTIONS? MOLDOVA UK : Strada 31 August 1989 78, Chisinau,
          MD-2012
        </span>
      </div>
      <div className="content">
        <div className="image">
          <img
            src={require("../../assets/images/others/letter.svg")}
            alt=""
          />
        </div>
        <div className="form">
          <form action="">
            <div className="input">
              <input type="text" placeholder="First Name" />
            </div>
            <div className="input">
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="input">
              <input type="text" placeholder="Email" />
            </div>
            <div className="input">
              <textarea type="text" placeholder="Question..." />
            </div>
            <div className="button">
              <button>SEND MESSAGE</button>
            </div>
          </form>
        </div>
      </div>
      <div className="more">
        <h1>WHAT TYPE OF PROJECT WORKS BEST FOR YOU?</h1>
        <div className="pay">
          <div className="form left">
            <div className="name">AGILE PROJECT</div>
            <div className="description">
              For complex projects with full customization and unique design
            </div>
            <div className="text">
              <ul>
                <li>Flexible development process</li>
                <li>Fixed price billing</li>
                <li>Delivered in 3-5 weeks</li>
                <li>Dedicated Project Manager</li>
                <li>Pay by milestone</li>
              </ul>
            </div>
            <div className="button">
              <button>CHOOSE ME</button>
            </div>
          </div>
          <div className="form right">
            <div className="name">AGILE PROJECT</div>
            <div className="description">
            Fastest time to market for only
            </div>
            <div className="text">
              <ul>
                <li>Flexible development process</li>
                <li>Fixed price billing</li>
                <li>Delivered in 3-5 weeks</li>
                <li>Dedicated Project Manager</li>
                <li>Pay by milestone</li>
              </ul>
            </div>
            <div className="button">
              <button>CHOOSE ME</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
