import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Meals from "./ui/Meals";
import Food from "./ui/Food";
import Home from "./ui/Home";

function App() {
  return <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/food">Food</Link>
              </li>
              <li>
                <Link to="/meals">Meals</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/meals">
              <Meals />
            </Route>
            <Route path="/food">
              <Food />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
}

export default App;
