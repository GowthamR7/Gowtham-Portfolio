'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';
import About from './components/About';
import Hero from './components/Hero';
import Project from './components/Project';
import Contact from './components/Contact';

const Home: React.FC = () => {
  const mainContainer = useRef(null);

  // This is the main GSAP hook that controls all ScrollTrigger animations
  useGSAP(() => {
    // --- 1. SETUP ---
    // Set the initial hidden states for the sections before any animation starts
    gsap.set('.section-slide', { transformOrigin: 'center center', transformStyle: 'preserve-3d' });
    gsap.set('.about-section', { x: '100vw', rotationY: 45, rotationX: -15, z: -300, autoAlpha: 0 });
    gsap.set('.project-section', { x: '-100vw', rotationY: -45, rotationX: 15, z: -300, autoAlpha: 0 });
    gsap.set('.contact-section', { y: '50vh', rotationX: 45, rotationY: 10, z: -200, autoAlpha: 0 });

    // --- 2. HERO SECTION ANIMATION ---
    // This animates the Hero section out of view as you scroll down
    gsap.to('.hero-section', {
      scrollTrigger: { 
        trigger: '.hero-section', 
        start: 'top top', 
        end: 'bottom top', 
        scrub: 1.5 
      },
      scale: 0.7, rotationX: 25, rotationY: -10, z: -400, autoAlpha: 0, ease: 'power2.inOut',
    });

    // --- 3. ABOUT SECTION TIMELINE ---
    // This timeline controls both the section entrance AND the inner text animation
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.about-section',
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1.5,
      }
    });

    aboutTl
      .to('.about-section', {
        rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
      })
      .from('.about-section .title-anim .char', {
        y: 80, opacity: 0, stagger: 0.02, ease: 'power2.out',
      }, '<0.2')
      .from('.about-section .p-anim .word', {
        y: 30, opacity: 0, stagger: 0.03, ease: 'power2.out',
      }, '-=0.5')
      .from('.about-section .about-card', {
        y: 80, opacity: 0, stagger: 0.1, ease: 'power2.out',
      }, '<');

    // --- 4. PROJECT SECTION ANIMATION ---
    gsap.to('.project-section', {
      scrollTrigger: { 
        trigger: '.project-section', 
        start: 'top bottom', 
        end: 'top center', 
        scrub: 1.2 
      },
      rotationY: 0, rotationX: 0, z: 0, x: 0, autoAlpha: 1, ease: 'power2.out',
    });
    
    // --- 5. CONTACT SECTION TIMELINE ---
    // This timeline controls the contact section's entrance and inner text animation
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1.5,
      },
    });

    contactTl
      .to('.contact-section', {
        rotationX: 0, rotationY: 0, z: 0, y: 0, autoAlpha: 1, ease: 'power2.out',
      })
      .from('.contact-section .title-anim-contact .word', {
        y: 100, opacity: 0, stagger: 0.1, ease: 'power2.out',
      }, '<0.2')
      .from('.contact-section .p-anim-contact .word', {
        y: 50, opacity: 0, stagger: 0.05, ease: 'power2.out',
      }, '-=0.5')
      .from('.contact-section .anim-link', {
        y: 50, opacity: 0, stagger: 0.1, ease: 'power2.out',
      }, '<');
    
  }, { scope: mainContainer });

  // --- Parallax Background Animations ---
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
        <div className="contact-section section-slide relative z-10">
          <Contact />
        </div>
      </main>
    </>
  );
};

export default Home;