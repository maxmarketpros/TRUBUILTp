'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
    images: string[];
    initialIndex: number;
    isOpen: boolean;
    onClose: () => void;
}

export default function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        setCurrentIndex(initialIndex);
    }, [initialIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
                if (e.key === 'ArrowRight') next();
                if (e.key === 'ArrowLeft') prev();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = 'auto';
            };
        }
    }, [isOpen, onClose]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-md"
                    onClick={onClose}
                >
                    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12 pointer-events-none" onClick={(e) => e.stopPropagation()}>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative w-full h-[85vh] flex items-center justify-center"
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`Gallery image ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                                quality={100}
                                priority
                            />
                        </motion.div>
                    </div>

                    <button
                        className="absolute left-0 top-0 bottom-0 w-24 md:w-32 flex items-center justify-center text-white/30 hover:text-white transition-all z-[110] bg-gradient-to-r from-black/40 to-transparent group"
                        onClick={(e) => { e.stopPropagation(); prev(); }}
                    >
                        <ChevronLeft size={64} className="transition-transform group-hover:-translate-x-1" />
                    </button>

                    <button
                        className="absolute right-0 top-0 bottom-0 w-24 md:w-32 flex items-center justify-center text-white/30 hover:text-white transition-all z-[110] bg-gradient-to-l from-black/40 to-transparent group"
                        onClick={(e) => { e.stopPropagation(); next(); }}
                    >
                        <ChevronRight size={64} className="transition-transform group-hover:translate-x-1" />
                    </button>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm font-bold tracking-widest bg-black/40 px-6 py-2 rounded-full backdrop-blur-md z-[110]">
                        {currentIndex + 1} <span className="mx-2 opacity-30">/</span> {images.length}
                    </div>

                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[130] p-4 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                    >
                        <X size={48} className="drop-shadow-lg transition-transform group-hover:scale-110" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
