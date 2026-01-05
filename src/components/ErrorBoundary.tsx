import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Komponente für besseres Error-Handling
 * Fängt JavaScript-Fehler in der Komponenten-Baumstruktur ab
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Logge den Fehler für Debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Hier könnte man den Fehler an einen Error-Tracking-Service senden
    // z.B. Sentry, LogRocket, etc.
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-butcher-black text-white flex items-center justify-center px-4">
          <div className="text-center max-w-2xl">
            <h1 className="font-bebas text-4xl md:text-5xl text-butcher-red mb-6">
              OOPS! ETWAS IST SCHIEFGELAUFEN
            </h1>
            <p className="text-gray-300 mb-8 text-lg">
              Es tut uns leid, aber es ist ein unerwarteter Fehler aufgetreten.
              Bitte versuchen Sie, die Seite neu zu laden.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-8 text-left bg-butcher-black-light p-4 rounded">
                <summary className="cursor-pointer text-butcher-red mb-2">
                  Fehlerdetails (nur in Entwicklung)
                </summary>
                <pre className="text-sm text-gray-400 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="space-x-4">
              <button
                onClick={this.handleReset}
                className="bg-butcher-red hover:bg-butcher-red-light text-white font-bebas text-xl py-3 px-8 transition-all duration-300 transform hover:scale-105"
                aria-label="Fehler zurücksetzen"
              >
                ERNEUT VERSUCHEN
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bebas text-xl py-3 px-8 transition-all duration-300 transform hover:scale-105"
                aria-label="Seite neu laden"
              >
                SEITE NEU LADEN
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

