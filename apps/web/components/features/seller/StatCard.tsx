import { LucideIcon } from "lucide-react"

interface StatCardProps {
    title: string
    value: string
    description?: string
    icon: LucideIcon
    trend?: {
        value: number
        label: string
    }
}

export function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
    return (
        <div className="group relative">
            {/* Gradient Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-500" />

            {/* Card */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                        {title}
                    </h3>
                    <div className="relative">
                        {/* Icon Glow */}
                        <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative p-2 bg-white/5 rounded-lg group-hover:bg-green-500/20 transition-colors duration-300">
                            <Icon className="h-5 w-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </div>
                </div>

                {/* Value */}
                <div className="text-3xl font-bold text-white mb-2 group-hover:text-green-100 transition-colors duration-300">
                    {value}
                </div>

                {/* Description & Trend */}
                {(description || trend) && (
                    <div className="flex items-center gap-2 text-sm">
                        {trend && (
                            <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${trend.value >= 0
                                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                                }`}>
                                {trend.value > 0 ? "↑" : "↓"}
                                {Math.abs(trend.value)}%
                            </span>
                        )}
                        {description && (
                            <span className="text-white/50">
                                {description}
                            </span>
                        )}
                    </div>
                )}

                {/* Decorative Bottom Line */}
                <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full transition-all duration-500" />
            </div>
        </div>
    )
}
