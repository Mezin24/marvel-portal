import { Component } from 'react/cjs/react.development';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <h2>Sorry, something went wrong...</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
