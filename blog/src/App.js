import React from "react";
import "./App.css";
import Home from "./containers/Home";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Contact from "./containers/Contact";
import Post from "./containers/Post";
import Service from "./containers/Service";
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Hero />

        <Route path="/" exact component={Home}></Route>
        <Route path="/contact" component={Contact} />
        <Route path="/post/:postId" component={Post} />
        <Route path="/service"
          component={Service}
        />
      </Router>
    </div>
  );
}

export default App;
