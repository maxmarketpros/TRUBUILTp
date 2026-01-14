'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lightbox from './Lightbox';

interface GalleryGridProps {
    images: string[];
    title: string;
}

export default function GalleryGrid({ images, title }: GalleryGridProps) {
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    if (images.length === 0) return null;

    return (
        <section className="py-12">
            <h2 className="text-2xl font-bold mb-8 text-dark inline-block border-b-4 border-regal-blue pb-2">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={image}
                        whileHover={{ scale: 1.01 }}
                        className="relative aspect-[4/3] cursor-pointer overflow-hidden sharp-edges bg-neutral-100 group shadow-sm"
                        onClick={() => setLightboxIndex(index)}
                    >
                        <Image
                            src={image}
                            alt={`${title} image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </motion.div>
                ))}
            </div>

            <Lightbox
                images={images}
                initialIndex={lightboxIndex}
                isOpen={lightboxIndex >= 0}
                onClose={() => setLightboxIndex(-1)}
            />
        </section>
    );
}
