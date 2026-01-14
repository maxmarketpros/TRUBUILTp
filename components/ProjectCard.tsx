'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Project } from '@/lib/projects';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="group bg-white border border-neutral-200 overflow-hidden sharp-edges flex flex-col h-full hover:border-regal-blue/30 transition-colors"
        >
            <Link href={`/projects/${project.slug}`} className="relative h-64 overflow-hidden block">
                {project.featuredImage ? (
                    <Image
                        src={project.featuredImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                        No Image
                    </div>
                )}
                {project.category && (
                    <div className="absolute top-4 left-4 bg-regal-blue text-white text-xs font-bold px-3 py-1 uppercase tracking-wider sharp-edges">
                        {project.category}
                    </div>
                )}
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 text-dark group-hover:text-regal-blue transition-colors leading-tight">
                    {project.title}
                </h3>
                <p className="text-neutral-600 text-sm line-clamp-3 mb-6 font-body">
                    {project.shortDescription || "No description provided."}
                </p>

                <div className="mt-auto">
                    <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-dark hover:text-ecstasy transition-colors border-b-2 border-transparent hover:border-ecstasy pb-1"
                    >
                        View Project Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
