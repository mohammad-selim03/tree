export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 p-4">
            <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
                {children}
            </div>
        </div>
    )
}
