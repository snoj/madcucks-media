import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import NavBar from '../../components/NavBar/NavBar';
import Homepage from '../Homepage/Homepage';
import Show from '../../containers/Show/Show'; 
import Episode from '../../components/Episode/Episode';
import NotFound from '../NotFound/NotFound';

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
    </div>
  </Router>
);


export default App;
