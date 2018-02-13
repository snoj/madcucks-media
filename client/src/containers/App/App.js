import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import NavBar from '../../components/NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import Show from '../../containers/Show/Show'; 
import Episode from '../../components/Episode/Episode';

const App = () => (
  <Router>
    <React.Fragment>
      <NavBar/>
      <Route exact path="/" component={Homepage}/>
      <Route path="/interaction"/>
      <Route exact path="/shows/:show" component={Show}/>
      <Route exact path="/shows/:show/:id" component={Episode}/>
    </React.Fragment>
  </Router>
);


export default App;
