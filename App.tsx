import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Interior from './pages/Interior';
import Graphic from './pages/Graphic';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interior" element={<Interior />} />
          <Route path="/graphic" element={<Graphic />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ChatWidget />
        
        <footer className="w-full py-8 text-center text-xs text-gray-600 uppercase tracking-widest bg-black border-t border-gray-900">
           © {new Date().getFullYear()} Aura Design Portfolio. All Rights Reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;