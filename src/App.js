import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomeComponent } from './components/Home/Home';
import { MapComponent } from './components/Map/Map';
import './App.css';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={HomeComponent} />
      <Route exact path="/map" component={MapComponent} />
    </Router>
  )
}
export default App;
