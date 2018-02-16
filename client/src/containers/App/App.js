import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import FaHeart from 'react-icons/lib/fa/heart'

import NavBar from '../../components/NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import Show from '../../containers/Show/Show'; 
import Episode from '../../components/Episode/Episode';
import NotFound from '../NotFound/NotFound';

import './App.css';
import './Author.css'

const Author = () => (
  <div className="author-container">
    <a href="https://github.com/ArmaanButt/madcucks-media/">
      Made with <FaHeart/> by Armaan Butt
    </a>
    <div>
      <p>8=D: 0xeaD2ACA81ACaEc540C99c15d01A4132ce8e5305E</p>
    </div>
  </div>
);

const App = () => (
  <Router onUpdate={() => window.scrollTo(0, 0)}>
    <div>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/shows/:show" component={Show}/>
        <Route exact path="/shows/:show/:id" component={Episode}/>
        <Route path="*" component={NotFound}/>
      </Switch>
      <Author/>
    </div>
  </Router>
);


export default App;
