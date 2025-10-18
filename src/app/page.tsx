'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';
import About from './components/About';
import Hero from './components/Hero';
import Project from './components/Project';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen'; // Import the new component

const Home: React.FC = () => {
  // 1. Add a state to track loading status
  const [isLoading, setIsLoading] = useState(true);
  const mainContainer = useRef(null);
  
  // This effect runs the main content fade-in animation AFTER loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Animate the main container to fade in
      gsap.to(mainContainer.current, {
        autoAlpha: 1, // Fades in and sets visibility
        duration: 1.2,
        ease: 'power2.out',
        delay: 0.2 // Small delay to sync with loader fade-out
      });
    }
  }, [isLoading]);


  // Your existing scroll animations
  useGSAP(() => {
    // 2. Initially hide the main content to prevent it from flashing
    gsap.set(mainContainer.current, { autoAlpha: 0 });

    // Initial states for sections
    gsap.set('.section-slide', { transformOrigin: 'center center', transformStyle: 'preserve-3d' });
    gsap.set('.about-section', { x: '100vw', rotationY: 45, rotationX: -15, z: -300, autoAlpha: 0 });
    // ... all your other gsap.set and gsap.to calls for scroll triggers
    gsap.set('.project-section', { x: '-100vw', rotationY: -45, rotationX: 15, z: -300, autoAlpha: 0 });
    gsap.set('.contact-section', { y: '50vh', rotationX: 45, rotationY: 10, z: -200, autoAlpha: 0 });

    gsap.to('.hero-section', {
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 },
      scale: 0.7, rotationX: 25, rotationY: -10, z: -400, autoAlpha: 0, ease: 'power2.inOut',
    });

    gsap.to('.about-section', {
      scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'top center', scrub: 1.2 },
      rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
    });

    gsap.to('.project-section', {
      scrollTrigger: { trigger: '.project-section', start: 'top bottom', end: 'top center', scrub: 1.2 },
      rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
    });
    
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1.5,
      },
    });

    contactTl.to('.contact-section', {
      rotationX: 0, rotationY: 0, z: 0, y: 0, autoAlpha: 1, ease: 'power2.out',
    })
    .from('.contact-section .anim-heading-word', { y: 100, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '<0.2')
    .from('.contact-section .anim-paragraph', { y: 50, opacity: 0, ease: 'power2.out' }, '-=0.2')
    .from('.contact-section .anim-link', { y: 50, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '<');

  }, { scope: mainContainer });
  
  // Your existing parallax background animations (no changes needed here)
  useGSAP(() => {
    gsap.to('.bg-parallax-1', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 2 },
      yPercent: -30, rotationX: 5, ease: 'none',
    });
    gsap.to('.bg-parallax-2', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 1.5 },
      yPercent: -50, rotationY: 3, ease: 'none',
    });
    gsap.to('.bg-parallax-3', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 1 },
      yPercent: -70, rotationX: -3, ease: 'none',
    });
  });

  return (
    <>
      {/* Parallax backgrounds can stay here */}
      <div className="bg-parallax-1 fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-transparent -z-30" />
      <div className="bg-parallax-2 fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] -z-20" />
      <div className="bg-parallax-3 fixed inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent -z-10" />
      
      {/* 3. Use conditional rendering */}
      {isLoading ? (
        // When isLoading is true, show the loader. Pass the function to update the state.
        <LoadingScreen onLoaded={() => setIsLoading(false)} />
      ) : (
        // When isLoading is false, show your main content.
        <main 
          ref={mainContainer} 
          className="relative w-full bg-black text-white overflow-hidden font-barlow perspective-scene"
        >
          <div className="hero-section section-slide relative z-40">
            <Hero />
          </div>
          <div className="about-section section-slide relative z-30">
            <About />
          </div>
          <div className="project-section section-slide relative z-20">
            <Project />
          </div>
          <div className="contact-section section-slide relative z-10">
            <Contact />
          </div>
        </main>
      )}
    </>
  );
};

export default Home;