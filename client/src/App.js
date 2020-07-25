import React from "react";
import { ApolloProvider } from '@apollo/client'
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom"
// import Apollo Client
import client from './config/graphql';
import {Container} from 'react-bootstrap'
// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './pages/Home.js'
import Track from './pages/Track.js'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Container>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/track">
              <Track />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
}
