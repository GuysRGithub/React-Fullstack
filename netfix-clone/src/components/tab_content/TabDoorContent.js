import React, { Component } from "react";
import "./style.css";
import OfferButton from "../Button/OfferButton";
export class TabDoorContent extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="tab-content">
            <div className="tab-content-left">
              <p>
                If you decide Netfix is not for you - no problem, No
                committement. Cancel online anytime
              </p>

              <OfferButton />
            </div>

            <img src={require("../../assets/images/tab-1-pic.png")} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default TabDoorContent;
