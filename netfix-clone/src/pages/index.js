import React, { Component } from "react";
import Header from "../components/Header";
import TabComponent from "../components/tabs";
import Footer from "../components/Footer/Footer";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Header />
        <TabComponent />
        <Footer/>
      </div>
    );
  }
}
