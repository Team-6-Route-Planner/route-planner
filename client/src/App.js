import React from "react";

import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import Home from './pages/Home.js'
import Track from './pages/Track.js'

export default function App() {
  return(
    <div className="app">
      <Router>
        <div className="Header container-fluid">
          <header className="d-flex justify-content-around">
            <Link to="/">Home</Link> &nbsp;|&nbsp;
            <Link to="/track">Track Courier</Link>
          </header>
        </div>
        <hr/>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/track" component={Track}></Route>
        </Switch>
      </Router>
    </div>
  )
}
