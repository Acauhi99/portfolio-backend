import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { colors } from '../styles/colors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex items-center justify-center p-6"
          style={{ backgroundColor: colors.primary.from }}
        >
          <div className="text-center">
            <AlertTriangle
              size={64}
              className="mx-auto mb-4"
              style={{ color: 'rgb(239, 68, 68)' }}
            />
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: colors.text.primary }}
            >
              Oops! Algo deu errado
            </h2>
            <p className="mb-6" style={{ color: colors.text.secondary }}>
              {this.state.error?.message || 'Ocorreu um erro inesperado'}
            </p>
            <button
              onClick={this.handleRetry}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors mx-auto"
              style={{
                background: `linear-gradient(135deg, ${colors.text.accent} 0%, ${colors.accent.via} 100%)`,
                color: colors.text.primary,
              }}
            >
              <RefreshCw size={18} />
              Tentar novamente
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
