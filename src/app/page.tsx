'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';
import dynamic from 'next/dynamic';
import About from './components/About';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
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

// ✅ STEP 2: The gsap.registerPlugin() call is no longer needed here!
// It's handled globally by our new lib/gsap.ts file.

const Home: React.FC = () => {
  const mainContainer = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainer.current,
        start: 'top top',
        end: '+=50%',
        scrub: true,
        
      },
    });

    tl.to('.hero-section', { scale: 0.8, opacity: 0.5, ease: 'power2.inOut' });
    tl.from('.about-section', { y: '100%', ease: 'power2.inOut' }, '<');

  }, { scope: mainContainer });

  return (
    <main ref={mainContainer} className="relative w-full bg-black text-white overflow-hidden font-barlow perspective-container">
      {/* <Navbar /> */}
      <Hero />
      <About />
      <Project />
      <Contact />
    </main>
  );
};

export default Home;