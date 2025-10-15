'use client';

import dynamic from 'next/dynamic';
import About from './components/About';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Project from './components/Project';
import Contact from './components/Contact';

const ParticleSystem = dynamic(
  () => import('./components/ParticleSystem/ParticleSystem'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Particles...</p>
        </div>
      </div>
    )
  }
);



const Home: React.FC = () => {
  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-hidden font-barlow">
      <Navbar />
      <Hero />
      <About />
      <Project />
      <Contact/>
    </main>
  );
};

export default Home;