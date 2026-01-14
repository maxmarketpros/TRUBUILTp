import { getProjects } from '@/lib/projects';
import ProjectList from '@/components/ProjectList';
import Link from 'next/link';

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-dark text-white pt-40 pb-16 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-regal-blue/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-ecstasy/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-ecstasy"></div>
              <span className="text-ecstasy text-xs font-bold uppercase tracking-[0.3em]">TruBuilt Construction</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tighter uppercase">
              TruBuilt Co <span className="text-ecstasy">Projects</span>.
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 font-body leading-relaxed max-w-2xl border-l-2 border-neutral-800 pl-6">
              Expertly crafted decks, siding, and modern home transformations. Explore the precision and quality that defines every TruBuilt project.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <ProjectList initialProjects={projects} />
        </div>
      </section>
    </main>
  );
}
