'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';
import About from './components/About';
import Hero from './components/Hero';
import Project from './components/Project';
import Contact from './components/Contact';

const Home: React.FC = () => {
  const mainContainer = useRef(null);

  // --- FIX 1: SCOPED ANIMATIONS ---
  // This hook only animates the sections INSIDE the main container.
  useGSAP(() => {
    // Initial states to prevent flashing
    gsap.set('.section-slide', { transformOrigin: 'center center', transformStyle: 'preserve-3d' });
    gsap.set('.about-section', { x: '100vw', rotationY: 45, rotationX: -15, z: -300, autoAlpha: 0 });
    gsap.set('.project-section', { x: '-100vw', rotationY: -45, rotationX: 15, z: -300, autoAlpha: 0 });
    gsap.set('.contact-section', { y: '50vh', rotationX: 45, rotationY: 10, z: -200, autoAlpha: 0 });

    // Hero section - 3D exit animation
    gsap.to('.hero-section', {
      scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 },
      scale: 0.7, rotationX: 25, rotationY: -10, z: -400, autoAlpha: 0, ease: 'power2.inOut',
    });

    // About section - 3D slide in
    gsap.to('.about-section', {
      scrollTrigger: { trigger: '.about-section', start: 'top bottom', end: 'top center', scrub: 1.2 },
      rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
    });

    // Project section - 3D slide in
    gsap.to('.project-section', {
      scrollTrigger: { trigger: '.project-section', start: 'top bottom', end: 'top center', scrub: 1.2 },
      rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
    });
    
    // Contact section - Combined timeline for container and inner content
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
    

  }, { scope: mainContainer }); // This scope ensures GSAP only looks inside <main>

  // --- FIX 2: GLOBAL ANIMATIONS ---
  // This hook animates the parallax backgrounds, which are outside the main container.
  // By not providing a scope, it can find elements anywhere on the page.
  useGSAP(() => {
    gsap.to('.bg-parallax-1', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 2 },
      yPercent: -30,
      rotationX: 5,
      ease: 'none',
    });
    gsap.to('.bg-parallax-2', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 1.5 },
      yPercent: -50,
      rotationY: 3,
      ease: 'none',
    });
    gsap.to('.bg-parallax-3', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 1 },
      yPercent: -70,
      rotationX: -3,
      ease: 'none',
    });
  }); // NO scope here

  return (
    <>
      <div className="bg-parallax-1 fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-transparent -z-30" />
      <div className="bg-parallax-2 fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] -z-20" />
      <div className="bg-parallax-3 fixed inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent -z-10" />
      
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
    </>
  );
};

export default Home;