import React from 'react';
import ThreeDTilt from '../components/ThreeDTilt';
import { Project } from '../types';

const interiorProjects: Project[] = [
  { id: '1', title: 'The Obsidian Loft', category: 'interior', description: 'Modern industrial living space.', imageUrl: 'https://picsum.photos/600/800?random=10', year: '2023' },
  { id: '2', title: 'Azure Villa', category: 'interior', description: 'Coastal minimalist retreat.', imageUrl: 'https://picsum.photos/600/600?random=11', year: '2022' },
  { id: '3', title: 'Kyoto Tea House', category: 'interior', description: 'Traditional aesthetics meets modern utility.', imageUrl: 'https://picsum.photos/600/900?random=12', year: '2023' },
  { id: '4', title: 'Urban Sanctuary', category: 'interior', description: 'Small space optimization.', imageUrl: 'https://picsum.photos/600/700?random=13', year: '2021' },
  { id: '5', title: 'Velvet Lounge', category: 'interior', description: 'Commercial bar design.', imageUrl: 'https://picsum.photos/600/800?random=14', year: '2024' },
  { id: '6', title: 'Nordic Office', category: 'interior', description: 'Productivity focused workspace.', imageUrl: 'https://picsum.photos/600/600?random=15', year: '2023' },
];

const Interior: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 pt-24 pb-12 px-4 md:px-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-card-entry {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center animate-card-entry">
          <h1 className="text-5xl md:text-7xl serif text-white mb-4">Interior Spaces</h1>
          <p className="text-gray-400 tracking-widest uppercase text-xs md:text-sm">Curating Atmosphere & Experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {interiorProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className="animate-card-entry"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <ThreeDTilt className={`group ${idx % 2 === 0 ? 'md:mt-12' : ''} h-full`}>
                <div className="relative overflow-hidden rounded-sm bg-neutral-900 shadow-2xl h-full">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between items-end">
                      <div>
                         <h3 className="text-xl serif text-white">{project.title}</h3>
                         <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{project.description}</p>
                      </div>
                      <span className="text-xs font-mono text-gray-500 border border-gray-700 px-2 py-1 rounded-full">{project.year}</span>
                    </div>
                  </div>
                </div>
              </ThreeDTilt>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interior;