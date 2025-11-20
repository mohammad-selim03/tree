import { ReactNode } from 'react';
import Link from 'next/link';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f1f0f] text-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1f0f]/80 backdrop-blur-md border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:opacity-90 transition-opacity">
            <span className="text-3xl">🌳</span>
            <span>TreeVerse</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white/70 hover:text-white transition-colors font-medium">Home</Link>
            <Link href="/trees" className="text-white/70 hover:text-white transition-colors font-medium">Browse Trees</Link>
            <Link href="/about" className="text-white/70 hover:text-white transition-colors font-medium">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/api/v1/auth/login" 
              className="px-6 py-2 rounded-full border border-white/20 text-white font-medium hover:bg-white hover:text-[#0f1f0f] transition-all duration-300"
            >
              Login
            </Link>
            <Link 
              href="/api/v1/auth/register" 
              className="px-6 py-2 rounded-full bg-[#4a7c2d] text-white font-medium hover:bg-[#3d6625] hover:shadow-lg transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a160a] border-t border-white/10 pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-2xl font-bold">
              <span className="text-3xl">🌳</span>
              TreeVerse
            </h3>
            <p className="text-white/60 leading-relaxed">
              Growing a greener future, one tree at a time.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#4a7c2d]">Quick Links</h4>
            <ul className="space-y-3 text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/trees" className="hover:text-white transition-colors">Browse Trees</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#4a7c2d]">For Sellers</h4>
            <ul className="space-y-3 text-white/60">
              <li><Link href="/seller/register" className="hover:text-white transition-colors">Become a Seller</Link></li>
              <li><Link href="/seller/dashboard" className="hover:text-white transition-colors">Seller Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#4a7c2d]">Support</h4>
            <ul className="space-y-3 text-white/60">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>&copy; 2025 TreeVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
