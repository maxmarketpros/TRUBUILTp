'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function Navigation() {
    const pathname = usePathname();
    const isProjectPage = pathname.startsWith('/projects/');

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                <div className="flex gap-4">
                    <Link
                        href="https://trubuiltco.com"
                        className="flex items-center gap-2 bg-dark text-white px-6 py-3 text-xs font-bold uppercase tracking-widest sharp-edges hover:bg-regal-blue transition-all shadow-xl"
                    >
                        <ExternalLink size={14} />
                        Back to Site
                    </Link>

                    {isProjectPage && (
                        <Link
                            href="/"
                            className="flex items-center gap-2 bg-white text-dark border border-neutral-200 px-6 py-3 text-xs font-bold uppercase tracking-widest sharp-edges hover:bg-neutral-50 transition-all shadow-xl"
                        >
                            <ArrowLeft size={14} />
                            Back to Projects
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
