import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@heroui/react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl border border-slate-100 shadow-xl p-8 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4 shadow-sm shadow-rose-100">
              <AlertTriangle size={32} />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              An unexpected error occurred in the application. Don't worry, your data is safe.
            </p>

            {/* Dev error display */}
            {import.meta.env.DEV && this.state.error && (
              <div className="w-full bg-slate-50 rounded-xl p-3 text-left mb-6 overflow-x-auto border border-slate-100">
                <p className="text-xs font-mono text-rose-600 break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 w-full">
              <Button
                variant="secondary"
                className="flex-1 rounded-xl h-10 text-xs font-semibold gap-1.5 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                <Home size={15} />
                <span>Go Home</span>
              </Button>

              <Button
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-10 text-xs font-semibold gap-1.5 shadow-md shadow-indigo-200 cursor-pointer"
                onClick={this.handleReset}
              >
                <RotateCcw size={15} />
                <span>Try Again</span>
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
