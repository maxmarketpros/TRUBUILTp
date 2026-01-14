import { getProjectBySlug, getProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';
import { Quote } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} | TruBuilt Projects`,
        description: project.shortDescription,
        openGraph: {
            images: project.featuredImage ? [project.featuredImage] : [],
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">

            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[70vh] w-full bg-dark">
                {project.featuredImage && (
                    <Image
                        src={project.featuredImage}
                        alt={project.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                )}
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto w-full px-6 pb-16 md:pb-24">
                        <div className="max-w-4xl">
                            {project.category && (
                                <span className="inline-block bg-ecstasy text-white text-xs font-bold px-4 py-2 uppercase tracking-widest mb-6 sharp-edges">
                                    {project.category}
                                </span>
                            )}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                {project.title}
                            </h1>
                            <div className="w-20 h-1 bg-regal-blue mb-8"></div>
                            <p className="text-lg md:text-xl text-neutral-300 font-body max-w-2xl leading-relaxed">
                                {project.shortDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    {/* Left: Photos (Occupies more space) */}
                    <div className="lg:col-span-3 space-y-8 animate-fade-in">
                        <div className="space-y-4">
                            <GalleryGrid images={project.beforeImages} title="Before Photos" />
                            <div className="h-8"></div>
                            <GalleryGrid images={project.afterImages} title="After Photos" />
                        </div>
                    </div>

                    {/* Right: Overview & Sidebar (Sticky on desktop) */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-28 space-y-8">
                            {/* Overview Card */}
                            <div className="bg-white p-8 md:p-10 border border-neutral-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] sharp-edges animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                <h2 className="text-xl font-bold mb-8 text-dark inline-block border-b-4 border-regal-blue pb-2 uppercase tracking-tighter">
                                    Project Overview
                                </h2>
                                <div className="space-y-6">
                                    {project.fullDescription.split('\n').map((line: string, i: number) => {
                                        const trimmed = line.trim();
                                        if (!trimmed) return <div key={i} className="h-2" />;

                                        const renderLine = (text: string) => {
                                            const parts = text.split(/(\*\*.*?\*\*)/g);
                                            return parts.map((part, index) => {
                                                if (part.startsWith('**') && part.endsWith('**')) {
                                                    return <strong key={index} className="text-dark font-bold font-heading">{part.slice(2, -2)}</strong>;
                                                }
                                                return part;
                                            });
                                        };

                                        if (trimmed.startsWith('###')) {
                                            return (
                                                <h3 key={i} className="text-lg font-bold text-dark mt-8 mb-4 border-l-4 border-ecstasy pl-4 uppercase tracking-tight">
                                                    {renderLine(trimmed.replace('###', '').trim())}
                                                </h3>
                                            );
                                        }

                                        if (trimmed.startsWith('•')) {
                                            return (
                                                <div key={i} className="flex items-start space-x-3 text-neutral-600 font-body">
                                                    <span className="text-ecstasy mt-1">●</span>
                                                    <span className="leading-relaxed">{renderLine(trimmed.replace('•', '').trim())}</span>
                                                </div>
                                            );
                                        }

                                        return (
                                            <p key={i} className="text-neutral-600 font-body leading-relaxed">
                                                {renderLine(trimmed)}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>

                            {project.testimonial && (
                                <div className="bg-neutral-light p-10 border-l-8 border-ecstasy sharp-edges shadow-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
                                    <Quote className="text-ecstasy mb-6" size={40} />
                                    <p className="text-lg font-body italic text-dark leading-relaxed mb-6">
                                        "{project.testimonial.quote}"
                                    </p>
                                    <div className="font-bold text-sm uppercase tracking-widest text-regal-blue">
                                        — {project.testimonial.author}
                                    </div>
                                </div>
                            )}

                            <div className="bg-dark text-white p-10 sharp-edges shadow-xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
                                <h3 className="text-xl font-bold mb-8 border-b border-neutral-700 pb-4">Project Details</h3>
                                <dl className="space-y-6">
                                    <div>
                                        <dt className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-2">Status</dt>
                                        <dd className="text-neutral-200 text-sm">Completed</dd>
                                    </div>
                                    {project.category && (
                                        <div>
                                            <dt className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-2">Project Type</dt>
                                            <dd className="text-neutral-200 text-sm">{project.category}</dd>
                                        </div>
                                    )}
                                    <div>
                                        <dt className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-2">Location</dt>
                                        <dd className="text-neutral-200 text-sm">Central Missouri</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
