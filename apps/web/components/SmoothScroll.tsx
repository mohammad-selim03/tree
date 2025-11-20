'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with performance-optimized settings
        const lenis = new Lenis({
            duration: 1.2, // Smooth scroll duration
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
            orientation: 'vertical', // Scroll direction
            gestureOrientation: 'vertical',
            smoothWheel: true, // Enable smooth wheel scrolling
            wheelMultiplier: 1, // Mouse wheel sensitivity
            touchMultiplier: 2, // Touch sensitivity
            infinite: false,
            autoResize: true, // Auto-resize on window resize
        });

        lenisRef.current = lenis;

        // Animation frame loop for smooth scrolling
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup
        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Expose lenis instance to window for debugging (optional)
    useEffect(() => {
        if (lenisRef.current) {
            (window as any).lenis = lenisRef.current;
        }
    }, []);

    return null; // This component doesn't render anything
}
