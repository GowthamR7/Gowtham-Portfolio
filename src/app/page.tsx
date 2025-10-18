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
    // Set 3D perspective for all sections
    gsap.set('.section-slide', {
      transformOrigin: 'center center',
      transformStyle: 'preserve-3d',
    });

    // Hero section - 3D exit animation
    gsap.to('.hero-section', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        pin: false,
      },
      scale: 0.7,
      rotationX: 25,
      rotationY: -10,
      z: -400,
      opacity: 0.3,
      ease: 'power2.inOut',
    });

    // About section - 3D slide in from right
    gsap.fromTo('.about-section', 
      {
        rotationY: 45,
        rotationX: -15,
        z: -300,
        x: '100vw',
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '.about-section',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.2,
        },
        rotationY: 0,
        rotationX: 0,
        z: 0,
        x: 0,
        opacity: 1,
        ease: 'power2.out',
      }
    );

    // Project section - 3D slide in from left
    gsap.fromTo('.project-section', 
      {
        rotationY: -45,
        rotationX: 15,
        z: -300,
        x: '-100vw',
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '.project-section',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.2,
        },
        rotationY: 0,
        rotationX: 0,
        z: 0,
        x: 0,
        opacity: 1,
        ease: 'power2.out',
      }
    );

    // Contact section - 3D slide in from bottom
    gsap.fromTo('.contact-section', 
      {
        rotationX: 45,
        rotationY: 10,
        z: -200,
        y: '50vh',
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top bottom',
          end: 'top center',
          scrub: 1.2,
        },
        rotationX: 0,
        rotationY: 0,
        z: 0,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
      }
    );

    // Parallax background layers
    gsap.to('.bg-parallax-1', {
      scrollTrigger: {
        trigger: mainContainer.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
      y: '-30%',
      rotationX: 5,
      ease: 'none',
    });

    gsap.to('.bg-parallax-2', {
      scrollTrigger: {
        trigger: mainContainer.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: '-50%',
      rotationY: 3,
      ease: 'none',
    });

    gsap.to('.bg-parallax-3', {
      scrollTrigger: {
        trigger: mainContainer.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: '-70%',
      rotationX: -3,
      ease: 'none',
    });

  }, { scope: mainContainer });

  return (
    <>
      {/* 3D Parallax Background Layers */}
      <div className="bg-parallax-1 fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-transparent -z-30" />
      <div className="bg-parallax-2 fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_50%)] -z-20" />
      <div className="bg-parallax-3 fixed inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent -z-10" />
      
      <main 
        ref={mainContainer} 
        className="relative w-full bg-black text-white overflow-hidden font-barlow perspective-scene"
      >
        {/* Hero Section */}
        <div className="hero-section section-slide relative z-20">
          <Hero />
        </div>

        {/* About Section */}
        <div className="about-section section-slide relative z-15">
          <About />
        </div>

        {/* Project Section */}
        <div className="project-section section-slide relative z-15">
          <Project />
        </div>

        {/* Contact Section */}
        <div className="contact-section section-slide relative z-15">
          <Contact />
        </div>
      </main>
    </>
  );
};

export default Home;
