import React, { ErrorInfo } from "react";

interface State {
  hasError: boolean;
}

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong. Refresh the page and contact project owner.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
