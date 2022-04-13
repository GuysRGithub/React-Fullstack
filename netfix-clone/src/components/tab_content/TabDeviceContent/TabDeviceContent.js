import React from "react";

import "./style.css";

export default function TabDeviceContent() {
  return (
    <div className="tab-device-content">
      <div className="tab-device-top-content">
        <p>
          Watch TV shows and movies anytime, anywhere - personalized for you
        </p>
        <button className="btn">Try It Now!</button>
      </div>
      <div className="tab-device-bottom-content">
        <div>
          <img src={require("../../../assets/images/tab-tv.png")} alt="" />
          <h3>Watch on your TV</h3>
          <p>
            Smart Tvs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
            players,...
          </p>
        </div>
        <div>
          <img src={require("../../../assets/images/tab-tablet.png")} alt="" />
          <h3>Watch instanly or download for later</h3>
          <p>
            Available on phone and tablet, wherever you go.
          </p>
        </div>
        <div>
          <img src={require("../../../assets/images/tab-macbook.png")} alt="" />
          <h3>Use any computer</h3>
          <p>
            Watch right on Netflix
          </p>
        </div>
      </div>
    </div>
  );
}
