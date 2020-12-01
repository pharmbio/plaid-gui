import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/instructions">Instructions</Link>
          </li>
          <li>
            <Link to="/tool">Tool</Link>
          </li>
          <li>
            <Link to="/publications">Publications</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/instructions">
        # TODO: Here goes the real component etc..
          <h1>This is the instructions page!</h1>
        </Route>
        <Route path="/tool">
          <h1>This is the tool page!</h1>
        </Route>
        <Route path="/publications">
          <h1>This is the publications page!</h1>
        </Route>
        <Route path="/contacts">
          <h1>This is the contact page!</h1>
        </Route>
        <Route path="/">
          <h1>This is the home page!</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default Navbar;
