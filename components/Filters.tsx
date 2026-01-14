'use client';

import { Search } from 'lucide-react';

interface FiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedTag: string;
    setSelectedTag: (tag: string) => void;
    tags: string[];
}

export default function Filters({ searchQuery, setSearchQuery, selectedTag, setSelectedTag, tags }: FiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
            <div className="relative w-full md:max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-neutral-400 group-focus-within:text-regal-blue transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search projects by title or description..."
                    className="block w-full pl-11 pr-4 py-4 bg-white border border-neutral-200 sharp-edges focus:outline-none focus:ring-1 focus:ring-regal-blue focus:border-regal-blue transition-all font-body text-dark"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    <button
                        onClick={() => setSelectedTag('')}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-widest sharp-edges transition-all border ${selectedTag === ''
                                ? 'bg-regal-blue text-white border-regal-blue shadow-lg shadow-regal-blue/20'
                                : 'bg-white text-dark border-neutral-200 hover:border-regal-blue'
                            }`}
                    >
                        All
                    </button>
                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest sharp-edges transition-all border ${selectedTag === tag
                                    ? 'bg-regal-blue text-white border-regal-blue shadow-lg shadow-regal-blue/20'
                                    : 'bg-white text-dark border-neutral-200 hover:border-regal-blue'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
