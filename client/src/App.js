import React from "react";
/*import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";*/

import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom"
import Home from './pages/Home.js'
import Track from './pages/Track.js'

export default function App() {
  return(
    <div className="App">
      <Router>
        <div className="Header container-fluid">
          <header className="d-flex justify-content-around">
            <Link to="/">Home</Link>
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
