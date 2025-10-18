'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';
import About from './components/About';
import Hero from './components/Hero';
import Project from './components/Project';
import Contact from './components/Contact';

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
      <Hero />
      <About />
      <Project />
      <Contact />
    </main>
  );
};

export default Home;