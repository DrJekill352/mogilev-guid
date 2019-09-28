import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomeComponent } from './components/Home/Home';
import { MainComponent } from './components/Main/Main';
import { TripSelector } from './components/TripSelector';
import { TripPreview } from './components/TripPreview';
import './App.css';


const App = () => {
  return (
    <Router>
      <Route exact path="/" component={HomeComponent} />
      <Route exact path="/main" component={MainComponent} />
      <Route exact path="/trip-preview" component={TripPreview}/>
    </Router>
  )
}
export default App;
