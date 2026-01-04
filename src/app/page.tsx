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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('hasLoadedOnce');
    if (hasLoaded === 'true') {
      setIsLoading(false);
      setHasLoadedOnce(true);
    }

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setHasLoadedOnce(true);
    sessionStorage.setItem('hasLoadedOnce', 'true');
  };

  useGSAP(() => {
    if (isLoading) return;

    // --- FADE IN MAIN CONTENT ---
    gsap.from(mainContainer.current, { autoAlpha: 0, duration: 1, delay: 0.2 });

    // --- SETUP ---
    gsap.set('.section-slide', { transformOrigin: 'center center', transformStyle: 'preserve-3d' });

    // Set initial transform states for sections (CSS handles opacity/visibility)
    if (isMobile) {
      gsap.set('.about-section', { y: 50 });
      gsap.set('.project-section', { y: 50 });
    } else {
      gsap.set('.about-section', { x: '50vw', rotationY: 20, rotationX: -10, z: -200 });
      gsap.set('.project-section', { x: '-50vw', rotationY: -20, rotationX: 10, z: -200 });
    }

    // --- HERO SECTION ANIMATION ---
    if (isMobile) {
      gsap.to('.hero-section', {
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 },
        scale: 0.9, y: -30, autoAlpha: 0, ease: 'power2.inOut',
      });
    } else {
      gsap.to('.hero-section', {
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1 },
        scale: 0.8, rotationX: 15, rotationY: -5, z: -200, autoAlpha: 0, ease: 'power2.inOut',
      });
    }

    // --- ABOUT SECTION ANIMATION ---
    // CSS handles initial opacity=0 to prevent flickering
    // GSAP sets initial Y positions for animation
    gsap.set('.about-section .about-title', { y: 60 });
    gsap.set('.about-section .about-p', { y: 40 });
    gsap.set('.about-section .about-card', { y: 50 });

    // Create timeline with scrub for reversible scroll animation
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 60%',
        end: 'top 10%',
        scrub: true,
        // toggleActions: "play none none reverse",
        // markers: true,

      }
    });

    if (isMobile) {
      // Mobile: Simple slide up
      aboutTl
        // Step 1: Section slides in (0% - 25% of scroll)
        .to('.about-section', { y: 0, autoAlpha: 1, duration: 1 })
        // Step 2: Title and paragraph appear (25% - 50% of scroll)
        .to('.about-section .about-title', { y: 0, opacity: 1, duration: 0.8 }, '-=0.3')
        .to('.about-section .about-p', { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        // Step 3: Cards appear one by one (50% - 100% of scroll)
        .to('.about-section .about-card:nth-child(1)', { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
        .to('.about-section .about-card:nth-child(2)', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .to('.about-section .about-card:nth-child(3)', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
    } else {
      // Desktop: 3D slide with rotation
      aboutTl
        // Step 1: Section slides in with 3D effect (0% - 30% of scroll)
        .to('.about-section', { rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, duration: 1.2 })
        // Step 2: Title and paragraph appear (30% - 55% of scroll)
        .to('.about-section .about-title', { y: 0, opacity: 1, duration: 0.8 }, '-=0.4')
        .to('.about-section .about-p', { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        // Step 3: Cards appear one by one (55% - 100% of scroll)
        .to('.about-section .about-card:nth-child(1)', { y: 0, opacity: 1, duration: 0.6 }, '-=0.2')
        .to('.about-section .about-card:nth-child(2)', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
        .to('.about-section .about-card:nth-child(3)', { y: 0, opacity: 1, duration: 0.6 }, '-=0.3');
    }

    // --- PROJECT SECTION ANIMATION ---
    if (isMobile) {
      gsap.to('.project-section', {
        scrollTrigger: { trigger: '.project-section', start: 'top bottom', end: 'top 60%', scrub: 1 },
        y: 0, autoAlpha: 1, ease: 'power2.out',
      });
    } else {
      gsap.to('.project-section', {
        scrollTrigger: { trigger: '.project-section', start: 'top bottom', end: 'top 60%', scrub: 1 },
        rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
      });
    }

  }, { scope: mainContainer, dependencies: [isLoading, isMobile] });

  // --- Parallax Background Animations (Desktop only) ---
  useGSAP(() => {
    if (isLoading || isMobile) return;

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
  }, { dependencies: [isLoading, isMobile] });

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