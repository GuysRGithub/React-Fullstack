import React from "react";
import "./App.css";
import {Register} from "./pages/Register";
import {
  BrowserRouter,
  Redirect,
  Route,
  Router,
  Switch,
} from "react-router-dom";
import Activate from "./pages/Activate";
import { Login } from "./pages/Login";
import { ForgetPassword } from "./pages/ForgetPassword";
import "react-toastify/dist/ReactToastify.css"
import ResetPassword from "./pages/Reset";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/users/activate/:token" component={Activate} />
        <Route path="/login" component={Login}/>
        <Route path="/users/passwords/forget" component={ForgetPassword}/>
        <Route path="/users/passwords/reset/:token" component={ResetPassword}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
