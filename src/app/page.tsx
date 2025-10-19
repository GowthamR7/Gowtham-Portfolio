'use client';

import React, { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';
import About from './components/About';
import Hero from './components/Hero';
import Project from './components/Project';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen'; // Import the new loading screen

const Home: React.FC = () => {
  const mainContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // State to control the loader

  useGSAP(() => {
    // This entire block of animations will only run AFTER the loading is finished
    if (isLoading) return;

    // --- FADE IN MAIN CONTENT ---
    // A smooth transition after the loader is gone
    gsap.from(mainContainer.current, { autoAlpha: 0, duration: 1, delay: 0.2 });

    // --- SETUP ---
    gsap.set('.section-slide', { transformOrigin: 'center center', transformStyle: 'preserve-3d' });
    gsap.set('.about-section', { x: '100vw', rotationY: 45, rotationX: -15, z: -300, autoAlpha: 0 });
    gsap.set('.project-section', { x: '-100vw', rotationY: -45, rotationX: 15, z: -300, autoAlpha: 0 });
    
    // NOTE: We don't need to set the initial state for contact-section anymore because it's a standalone page now.

    // --- HERO SECTION ANIMATION ---
    gsap.to('.hero-section', {
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 },
      scale: 0.7, rotationX: 25, rotationY: -10, z: -400, autoAlpha: 0, ease: 'power2.inOut',
    });

    // --- ABOUT SECTION TIMELINE ---
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section', start: 'top 80%', end: 'top 30%', scrub: 1.5,
      }
    });
    aboutTl
      .to('.about-section', {
        rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
      })
      .from('.about-section .title-anim .char', { y: 80, opacity: 0, stagger: 0.02, ease: 'power2.out' }, '<0.2')
      .from('.about-section .p-anim .word', { y: 30, opacity: 0, stagger: 0.03, ease: 'power2.out' }, '-=0.5')
      .from('.about-section .about-card', { y: 80, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '<');

    // --- PROJECT SECTION ANIMATION ---
    gsap.to('.project-section', {
      scrollTrigger: { trigger: '.project-section', start: 'top bottom', end: 'top center', scrub: 1.2 },
      rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
    });
    
  }, { scope: mainContainer, dependencies: [isLoading] }); // Rerun animations when isLoading changes

  // --- Parallax Background Animations ---
  useGSAP(() => {
    if (isLoading) return;
    gsap.to('.bg-parallax-1', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 2 },
      yPercent: -30, rotationX: 5, ease: 'none',
    });
    // ... other parallax animations
  }, { dependencies: [isLoading] });

  return (
    <>
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}
      
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <div className="bg-parallax-1 fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-transparent -z-30" />
        <div className="bg-parallax-2 fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] -z-20" />
        <div className="bg-parallax-3 fixed inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent -z-10" />
        
        <main ref={mainContainer} className="relative w-full bg-black text-white overflow-hidden font-barlow perspective-scene">
          <div className="hero-section section-slide relative z-40">
            <Hero />
          </div>
          <div className="about-section section-slide relative z-30">
            <About />
          </div>
          <div className="project-section section-slide relative z-20">
            <Project />
          </div>
          {/* The contact section is now pinned and animated within its own component */}
          <div className="contact-section relative z-10">
            <Contact />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;