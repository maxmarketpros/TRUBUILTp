import { projectsData } from './projectsData';

export interface Project {
    slug: string;
    title: string;
    category: string;
    shortDescription: string;
    fullDescription: string;
    featuredImage: string;
    beforeImages: string[];
    afterImages: string[];
    testimonial?: {
        quote: string;
        author: string;
    };
}

export async function getProjects(): Promise<Project[]> {
    return projectsData as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    return (projectsData as Project[]).find(p => p.slug === slug);
}
