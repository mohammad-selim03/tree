"use client"

import { Component, ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to error tracking service (Sentry, LogRocket, etc.)
        console.error("ErrorBoundary caught an error:", error, errorInfo)

        // You can send to error tracking service here
        // Example: Sentry.captureException(error)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
    }

    handleReload = () => {
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="flex items-center justify-center min-h-[400px] p-4">
                    <Card className="max-w-md w-full">
                        <CardHeader>
                            <div className="flex items-center gap-2 text-destructive">
                                <AlertTriangle className="h-5 w-5" />
                                <CardTitle>Something went wrong</CardTitle>
                            </div>
                            <CardDescription>
                                An unexpected error occurred. This has been logged and we'll look into it.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <div className="mt-4 p-4 bg-muted rounded-md">
                                    <p className="text-sm font-mono text-destructive break-all">
                                        {this.state.error.message}
                                    </p>
                                    {this.state.error.stack && (
                                        <pre className="mt-2 text-xs overflow-auto max-h-40">
                                            {this.state.error.stack}
                                        </pre>
                                    )}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button onClick={this.handleReset} variant="outline">
                                Try Again
                            </Button>
                            <Button onClick={this.handleReload} className="gap-2">
                                <RefreshCw className="h-4 w-4" />
                                Reload Page
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )
        }

        return this.props.children
    }
}

// Simpler error state component for inline errors
export function ErrorState({
    title = "Error",
    message = "Something went wrong",
    onRetry,
}: {
    title?: string
    message?: string
    onRetry?: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4 max-w-md">{message}</p>
            {onRetry && (
                <Button onClick={onRetry} variant="outline" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </Button>
            )}
        </div>
    )
}
