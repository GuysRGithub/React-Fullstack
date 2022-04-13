import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { Icon } from "react-icons-kit";
import { iosWorld } from "react-icons-kit/ionicons/iosWorld";
import { arrowSortedDown } from "react-icons-kit/typicons/arrowSortedDown";

export class Footer extends Component {

  state = {
    langContent: false
  }

  handleToogleLang = e => {
    e.preventDefault();
    this.setState({langContent: !this.state.langContent})
  }

  render() {
    return (
      <div className="footer">
        <p>
          Questions?
          <Link>Call 1-877-742-1335</Link>{" "}
        </p>
        <div className="footer-columns">
          <ul>
            <li>
              <Link>FAQ</Link>
            </li>
            <li>
              <Link>Investor Relations</Link>
            </li>
            <li>
              <Link>Ways to Watch</Link>
            </li>
            <li>
              <Link>Corporate Infomation</Link>
            </li>
            <li>
              <Link>Netflix Originals</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link>Help Center</Link>
            </li>
            <li>
              <Link>Jobs</Link>
            </li>
            <li>
              <Link>Term of Use</Link>
            </li>
            <li>
              <Link>Contact Us</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Random Card Gift</Link>
            </li>
            <li>
              <Link>Privacy</Link>
            </li>
            <li>
              <Link>Speed Test</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link>Media Center</Link>
            </li>
            <li>
              <Link>Buy Gift Cards</Link>
            </li>
            <li>
              <Link>Cookie Preferences</Link>
            </li>
            <li>
              <Link>Legal Notices</Link>
            </li>
          </ul>
          <div className="lang-btn" onClick={this.handleToogleLang}>
            <Icon icon={iosWorld} size={20} />
            English
            <Icon icon={arrowSortedDown} size={20} />
          </div>
        </div>
        {this.state.langContent && (
          <div className="lang-toggle">
          <ul>
            <li>English</li>
            <li>French</li>
          </ul>
        </div>
        )}
        <p style={{marginLeft: '14%', marginTop: "2rem"}}>Netflix Canada</p>
      </div>
    );
  }
}

export default Footer;
