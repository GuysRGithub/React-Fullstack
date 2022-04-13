import React from "react";
import Sidebar from "../Sidebar";
import "./style.css"

const Layout = (props) => {
  return (
    <React.Fragment>
      {props.children}
      <Sidebar />
    </React.Fragment>
  );
};

export default Layout;
