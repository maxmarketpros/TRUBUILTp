'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import Filters from '@/components/Filters';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectListProps {
    initialProjects: Project[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('');

    const tags = useMemo(() => {
        const allTags = initialProjects
            .map((p) => p.category)
            .filter((t): t is string => !!t);
        return Array.from(new Set(allTags)).sort();
    }, [initialProjects]);

    const filteredProjects = useMemo(() => {
        return initialProjects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.fullDescription.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = selectedTag === '' || project.category === selectedTag;

            return matchesSearch && matchesTag;
        });
    }, [initialProjects, searchQuery, selectedTag]);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                    Showing <span className="text-dark">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'Project' : 'Projects'}
                </p>
            </div>

            <Filters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                tags={tags}
            />

            {filteredProjects.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-20 border-2 border-dashed border-neutral-100 sharp-edges">
                    <p className="text-neutral-400 font-body">No projects found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(''); setSelectedTag(''); }}
                        className="mt-4 text-regal-blue font-bold text-sm border-b border-regal-blue"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
