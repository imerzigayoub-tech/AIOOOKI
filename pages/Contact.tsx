import React, { useState } from 'react';
import ThreeDTilt from '../components/ThreeDTilt';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Info Side */}
        <div className="space-y-8">
          <ThreeDTilt intensity={10}>
            <h1 className="text-5xl md:text-7xl serif text-white mb-6">Let's Create<br/>Something<br/><span className="italic text-gray-500">Timeless.</span></h1>
          </ThreeDTilt>
          
          <div className="space-y-4 text-gray-400 font-light">
            <p>I am currently accepting new projects for Q4 2024.</p>
            <p>Based in New York. Working Globally.</p>
            <div className="pt-4">
              <a href="mailto:hello@aura.design" className="text-xl text-white border-b border-white pb-1 hover:text-gray-300 transition-colors">hello@aura.design</a>
            </div>
            <div className="flex space-x-4 pt-4">
                {['Instagram', 'Behance', 'LinkedIn'].map(social => (
                    <span key={social} className="text-xs uppercase tracking-widest cursor-pointer hover:text-white transition-colors">{social}</span>
                ))}
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-neutral-900 p-8 md:p-12 rounded-lg border border-neutral-800 relative overflow-hidden">
             {status === 'success' ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 z-20 animate-fade-in-up">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-white mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                     </svg>
                     <h3 className="text-2xl serif text-white">Message Sent</h3>
                     <p className="text-gray-400 mt-2">I will be in touch shortly.</p>
                     <button onClick={() => setStatus('idle')} className="mt-6 text-xs uppercase tracking-widest border-b border-gray-600 pb-1">Send another</button>
                 </div>
             ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Your Name</label>
                        <input 
                            required
                            type="text" 
                            className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-white transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Email Address</label>
                        <input 
                            required
                            type="email" 
                            className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-white transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-white transition-colors">Project Details</label>
                        <textarea 
                            required
                            rows={4}
                            className="w-full bg-transparent border-b border-gray-700 py-2 text-white focus:outline-none focus:border-white transition-colors resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors mt-4">
                        Send Inquiry
                    </button>
                </form>
             )}
        </div>

      </div>
    </div>
  );
};

export default Contact;