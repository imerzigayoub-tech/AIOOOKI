import React from 'react';
import ThreeDTilt from '../components/ThreeDTilt';
import { Project } from '../types';

const graphicProjects: Project[] = [
  { id: '101', title: 'Neon Syntax', category: 'graphic', description: 'Brand Identity', imageUrl: 'https://picsum.photos/800/600?random=20', year: '2023' },
  { id: '102', title: 'Abstract Flow', category: 'graphic', description: 'Poster Series', imageUrl: 'https://picsum.photos/800/800?random=21', year: '2022' },
  { id: '103', title: 'Mono Type', category: 'graphic', description: 'Typography Study', imageUrl: 'https://picsum.photos/800/600?random=22', year: '2023' },
  { id: '104', title: 'Eco Roots', category: 'graphic', description: 'Packaging Design', imageUrl: 'https://picsum.photos/800/1000?random=23', year: '2024' },
];

const Graphic: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-100 text-black pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col items-start border-b-2 border-black pb-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase mb-2">Visual<br/>Language</h1>
          <p className="text-black font-medium tracking-tight text-lg ml-2">Digital / Print / Identity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {graphicProjects.map((project) => (
            <ThreeDTilt key={project.id} intensity={10} className="group">
              <div className="relative bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
                <div className="aspect-video overflow-hidden">
                   <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter saturate-0 group-hover:saturate-100 transition-all duration-500"
                  />
                </div>
                <div className="p-6 flex justify-between items-center bg-white relative z-10">
                   <div>
                     <h3 className="text-2xl font-bold uppercase tracking-tighter">{project.title}</h3>
                     <p className="text-sm font-mono text-gray-500 mt-1">/ {project.description}</p>
                   </div>
                   <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full transform group-hover:rotate-45 transition-transform duration-300">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                   </div>
                </div>
              </div>
            </ThreeDTilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Graphic;