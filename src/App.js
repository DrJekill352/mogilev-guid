import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomeComponent } from './components/Home/Home';
import { MainComponent } from './components/Main/Main';
import { TripSelectorComponent } from './components/TripSelector';
import './App.css';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={HomeComponent} />
      <Route exact path="/main" component={MainComponent} />
      <Route exact path="/trip-selector" component={TripSelectorComponent}/>
    </Router>
  )
}
export default App;
