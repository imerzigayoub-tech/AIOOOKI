import React from 'react';
import { Link } from 'react-router-dom';
import ThreeDTilt from '../components/ThreeDTilt';
import InteractiveSpace from '../components/InteractiveSpace';

const Home: React.FC = () => {
  return (
    <div className="w-full relative bg-black">
      {/* Hero Section */}
      <section className="h-screen w-full flex items-center justify-center overflow-hidden relative">
        
        {/* New Interactive 3D Background */}
        <InteractiveSpace variant="hero" />

        {/* Content */}
        <ThreeDTilt className="relative z-10 p-10 cursor-default" intensity={15}>
           <div className="text-center flex flex-col items-center justify-center">
            <h2 className="text-xs md:text-sm tracking-[0.8em] uppercase text-gray-300 font-light mb-8 animate-fade-in-down">
              The Portfolio of
            </h2>
            
            {/* Logo Image */}
            <div className="relative mb-8 animate-fade-in-up transition-transform duration-300 hover:scale-105">
              <img 
                src="./logo.png" 
                alt="AIOOOKI Logo" 
                className="w-full max-w-2xl h-auto object-contain drop-shadow-[0_20px_50px_rgba(219,39,119,0.2)]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    const fallback = document.createElement('h1');
                    fallback.innerText = 'AIOOOKI';
                    fallback.className = 'text-8xl md:text-[11rem] font-bold font-lemon text-pink-400';
                    fallback.style.textShadow = '2px 2px 0px #db2777';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>

            <div className="max-w-lg mx-auto border-t border-gray-700/50 pt-8 mt-4 backdrop-blur-sm bg-black/20 p-6 rounded-xl">
              <p className="text-gray-200 leading-relaxed text-sm md:text-base font-extralight tracking-widest">
                Where spatial harmony meets digital precision. Crafting immersive environments and brand identities that resonate with the soul.
              </p>
            </div>
          </div>
        </ThreeDTilt>
      </section>

      {/* Intro / Split Section */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative z-10 bg-black">
        {/* Interior Link */}
        <div className="relative group overflow-hidden h-[50vh] md:h-screen border-r border-neutral-900">
           {/* 3D Background Space */}
           <InteractiveSpace variant="interior" className="transition-opacity duration-1000 opacity-80 group-hover:opacity-100" />
           
           <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none bg-black/20 group-hover:bg-black/0 transition-colors duration-500">
             <ThreeDTilt intensity={5}>
               <div className="text-center">
                 <h2 className="text-5xl md:text-7xl serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-thin drop-shadow-2xl">Interior</h2>
                 <span className="inline-block w-12 h-px bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                 <p className="mt-4 text-xs font-fine uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-md">Explore Spaces</p>
               </div>
             </ThreeDTilt>
           </div>
           <Link to="/interior" className="absolute inset-0 z-20"></Link>
        </div>

        {/* Graphic Link */}
        <div className="relative group overflow-hidden h-[50vh] md:h-screen">
           {/* 3D Background Space */}
           <InteractiveSpace variant="graphic" className="transition-opacity duration-1000 opacity-80 group-hover:opacity-100" />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none bg-black/20 group-hover:bg-black/0 transition-colors duration-500">
              <ThreeDTilt intensity={5}>
                <div className="text-center">
                  <h2 className="text-5xl md:text-7xl serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-thin drop-shadow-2xl">Graphic</h2>
                  <span className="inline-block w-12 h-px bg-white/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                  <p className="mt-4 text-xs font-fine uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 drop-shadow-md">View Identities</p>
                </div>
              </ThreeDTilt>
           </div>
           <Link to="/graphic" className="absolute inset-0 z-20"></Link>
        </div>
      </section>

      {/* Minimal About Snippet */}
      <section className="py-32 px-6 bg-[#050505] text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <ThreeDTilt intensity={5}>
            <p className="text-2xl md:text-4xl serif leading-relaxed text-gray-300 font-light">
              "Design is not just what it looks like and feels like. Design is how it works."
            </p>
            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-pink-500 font-medium">- Steve Jobs (Adopted Philosophy)</p>
          </ThreeDTilt>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600 opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 opacity-10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>
    </div>
  );
};

export default Home;