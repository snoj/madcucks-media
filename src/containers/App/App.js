import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import NavBar from '../../components/NavBar/NavBar';
import Homepage from '../Homepage/Homepage'

const App = () => (
  <Router>
    <div>
      <NavBar/>
      <Route exact path="/" component={Homepage}/>
      <Route path="/interaction"/>
    </div>
  </Router>
);


export default App;
