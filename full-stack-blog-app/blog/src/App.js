import React from "react";
import "./App.css";
import Home from "./containers/Home";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./containers/Contact";
import Post from "./containers/Post";
import Service from "./containers/Service";
import About from "./containers/About";
import Footer from "./components/Footer";
import Posts from "./containers/Posts";
import SignUp from "./containers/User/SignUp";
import SignIn from "./components/SignIn";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Hero />

        <Route path={["/home", "/"]} exact component={Home}></Route>
        <Route path="/contact" component={Contact} />
        <Route path="/posts" component={Posts} />
        <Route path="/post/:postId" component={Post} />
        <Route path="/service" component={Service} />
        <Route path="/about" component={About} />
        <Route path="/user/signUp" component={SignUp}/>
        <Route path="/user/signIn" component={SignIn}/>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
