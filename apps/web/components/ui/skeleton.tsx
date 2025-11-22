import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    )
}

// Predefined skeleton components for common use cases

export function ProductCardSkeleton() {
    return (
        <div className="block bg-card rounded-xl border overflow-hidden">
            <Skeleton className="aspect-square" />
            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-6 w-20" />
            </div>
        </div>
    )
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <div className="flex items-center space-x-4 p-4">
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} className="h-8 flex-1" />
            ))}
        </div>
    )
}

export function StatCardSkeleton() {
    return (
        <div className="bg-card rounded-xl border p-6 space-y-3">
            <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
            </div>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-40" />
        </div>
    )
}

export function FormSkeleton() {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-10 w-32" />
        </div>
    )
}

export function ChartSkeleton() {
    return (
        <div className="space-y-3">
            <div className="flex items-end justify-between h-64">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        className="w-12"
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                    />
                ))}
            </div>
            <div className="flex justify-between">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-8" />
                ))}
            </div>
        </div>
    )
}
