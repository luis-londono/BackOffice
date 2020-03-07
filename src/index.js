import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Using browserrouter since it provides clean URLs (no hashes in URLs)
import { BrowserRouter as Router } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <ErrorBoundary>
    <Router>
      <App />
    </Router>
  </ErrorBoundary>,
  document.getElementById("root")
);
