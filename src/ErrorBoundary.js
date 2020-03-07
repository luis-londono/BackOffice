import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props); // this must run before declaring state
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // whatever we return here will be the new state
    return { hasError: true };
  }

  // We put our JSX in here.
  render() {
    if (this.state.hasError) {
      return <h1>Uh oh! We messed up. 🔥 🤦‍♂️</h1>;
    }
    // Show whatever is nested underneath this ErrorBoundary component
    return this.props.children;
  }
}

export default ErrorBoundary;
