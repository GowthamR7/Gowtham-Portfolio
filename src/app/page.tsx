'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';
import About from './components/About';
import Hero from './components/Hero';
import Project from './components/Project';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';

const Home: React.FC = () => {
  const mainContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // Check if user has already seen loading screen in this session
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoadedOnce');
    if (hasLoaded === 'true') {
      setIsLoading(false);
      setHasLoadedOnce(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasLoadedOnce(true);
    sessionStorage.setItem('hasLoadedOnce', 'true');
  };

  useGSAP(() => {
    if (isLoading) return;

    // Check if mobile
    const isMobile = window.innerWidth < 768;

    // --- FADE IN MAIN CONTENT ---
    gsap.from(mainContainer.current, { autoAlpha: 0, duration: 1, delay: 0.2 });

    // --- SETUP ---
    gsap.set('.section-slide', { transformOrigin: 'center center', transformStyle: 'preserve-3d' });
    
    // Simplified animations for mobile
    if (isMobile) {
      gsap.set('.about-section', { y: 100, autoAlpha: 0 });
      gsap.set('.project-section', { y: 100, autoAlpha: 0 });
    } else {
      gsap.set('.about-section', { x: '100vw', rotationY: 45, rotationX: -15, z: -300, autoAlpha: 0 });
      gsap.set('.project-section', { x: '-100vw', rotationY: -45, rotationX: 15, z: -300, autoAlpha: 0 });
    }

    // --- HERO SECTION ANIMATION ---
    if (isMobile) {
      gsap.to('.hero-section', {
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 },
        scale: 0.85, y: -50, autoAlpha: 0, ease: 'power2.inOut',
      });
    } else {
      gsap.to('.hero-section', {
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.5 },
        scale: 0.7, rotationX: 25, rotationY: -10, z: -400, autoAlpha: 0, ease: 'power2.inOut',
      });
    }

    // --- ABOUT SECTION TIMELINE ---
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section', start: 'top 80%', end: 'top 30%', scrub: 1.5,
      }
    });
    
    if (isMobile) {
      aboutTl
        .to('.about-section', { y: 0, autoAlpha: 1, ease: 'power2.out' })
        .from('.about-section .about-title', { y: 50, opacity: 0, ease: 'power2.out' }, '<0.2')
        .from('.about-section .about-p', { y: 30, opacity: 0, ease: 'power2.out' }, '-=0.5')
        .from('.about-section .about-card', { y: 50, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '<');
    } else {
      aboutTl
        .to('.about-section', {
          rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
        })
        .from('.about-section .about-title', { y: 80, opacity: 0, ease: 'power2.out' }, '<0.2')
        .from('.about-section .about-p', { y: 30, opacity: 0, ease: 'power2.out' }, '-=0.5')
        .from('.about-section .about-card', { y: 80, opacity: 0, stagger: 0.1, ease: 'power2.out' }, '<');
    }

    // --- PROJECT SECTION ANIMATION ---
    if (isMobile) {
      gsap.to('.project-section', {
        scrollTrigger: { trigger: '.project-section', start: 'top bottom', end: 'top center', scrub: 1.2 },
        y: 0, autoAlpha: 1, ease: 'power2.out',
      });
    } else {
      gsap.to('.project-section', {
        scrollTrigger: { trigger: '.project-section', start: 'top bottom', end: 'top center', scrub: 1.2 },
        rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
      });
    }
    
  }, { scope: mainContainer, dependencies: [isLoading] });

  // --- Parallax Background Animations (Desktop only) ---
  useGSAP(() => {
    if (isLoading || window.innerWidth < 768) return;
    
    gsap.to('.bg-parallax-1', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 2 },
      yPercent: -30, rotationX: 5, ease: 'none',
    });
    
    gsap.to('.bg-parallax-2', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 1.5 },
      yPercent: -20, ease: 'none',
    });
    
    gsap.to('.bg-parallax-3', {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 1 },
      yPercent: -10, ease: 'none',
    });
  }, { dependencies: [isLoading] });

  return (
    <>
      {isLoading && !hasLoadedOnce && <LoadingScreen onLoaded={handleLoadingComplete} />}
      
      <div style={{ visibility: isLoading && !hasLoadedOnce ? 'hidden' : 'visible' }}>
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
          <div className="contact-section relative z-10">
            <Contact />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;