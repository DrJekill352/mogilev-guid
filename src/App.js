import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomeComponent } from './components/Home/Home';
import { MapComponent } from './components/Map/Map';
import { TripSelectorComponent } from './components/TripSelector';
import './App.css';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={HomeComponent} />
      <Route exact path="/map" component={MapComponent} />
      <Route exact path="/trip-selector" component={TripSelectorComponent}/>
    </Router>
  )
}
export default App;
