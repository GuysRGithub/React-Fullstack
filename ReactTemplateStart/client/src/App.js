import React from 'react';
import {Route, Router, Switch} from "react-router-dom"
import Home from './components/Home/Home';
import About from './components/About/About';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </div>
  );
}

export default App;
