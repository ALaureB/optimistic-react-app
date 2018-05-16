import React from "react";
import { Route, BrowserRouter, Switch, NavLink } from "react-router-dom";
import Container from "./withoutOptimisticUpdate/Container";
import ContainerOptimistic from "./withOptimisticUpdate/ContainerOptimistic";
import ContainerOptimisticBis from "./withOptimisticUpdateBis/ContainerOptimisticBis";

const normalStyle = {
  color: "black"
};

const activeStyle = {
  fontWeight: "bold",
  textDecoration: "underline"
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h1 className="text-muted text-center py-4">
            Optimistic Interface Example
          </h1>
          <ul
            className="mb-5 d-flex justify-content-around"
            style={{ listStyleType: "none" }}
          >
            <li>
              <NavLink
                to="/step1"
                style={normalStyle}
                activeStyle={activeStyle}
              >
                Step 1
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/step2"
                style={normalStyle}
                activeStyle={activeStyle}
              >
                Step 2
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/step3"
                style={normalStyle}
                activeStyle={activeStyle}
              >
                Step 3
              </NavLink>
            </li>
          </ul>

          <Switch>
            <Route exact path="/" component={Container} />
            <Route exact path="/step1" component={Container} />
            <Route exact path="/step2" component={ContainerOptimistic} />
            <Route exact path="/step3" component={ContainerOptimisticBis} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
