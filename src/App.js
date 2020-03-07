import React, { useState } from "react";
import Nav from "./Nav";
import Users from "./Users";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import { Route, Switch } from "react-router-dom";
import ManageUser from "./ManageUser";
import ErrorBoundary from "./ErrorBoundary";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <>
      <Nav />
      <ErrorBoundary>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/users">
            <Users users={users} setUsers={setUsers} />
          </Route>
          <Route path="/user/:id?">
            <ManageUser users={users} setUsers={setUsers} />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </ErrorBoundary>
    </>
  );
}

export default App;
