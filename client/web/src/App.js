import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Apollo Client
import client from "./config/graphql";
// import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.js";
import Track from "./pages/Track.js";
import Details from "./pages/DetailsTrip";
import History from "./pages/History";
import "bootstrap/dist/css/bootstrap.min.css";

import ListCourier from "./pages/ListCourier.js";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/listcourier">
            <ListCourier />
          </Route>
          <Route exact path="/track/:userId">
            <Track />
          </Route>
          <Route exact path="/detailstrip/:userId">
            <Details />
          </Route>
          <Route exact path="/history/:userId">
            <History />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
