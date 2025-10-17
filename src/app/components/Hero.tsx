'use client';

import React, { useRef } from 'react';
import ParticleSystem from './ParticleSystem/ParticleSystem';
import { gsap, useGSAP } from '@/app/lib/gsap';

const Hero = () => {
  const container = useRef(null);
  const name = "GOWTHAM";

  useGSAP(() => {
    // --- TIMELINE 1: Initial "Enter" Animation ---
    // This runs only once when the component loads.
    const enterTimeline = gsap.timeline();
    
    enterTimeline.from('.title', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
    }).from('.name-char', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.05,
    }, "-=0.8"); // Overlap start of this animation with the end of the previous one

    // --- TIMELINE 2: "Scroll Away" Scrub Animation ---
    // This animation is linked to the user's scrollbar.
    gsap.to('.hero-text-container', {
      scrollTrigger: {
        trigger: container.current, // The hero section is the trigger
        start: 'top top',           // Animation starts when the top of the hero hits the top of the viewport
        end: '+=70%',               // Animation ends after scrolling 70% of the viewport height
        scrub: 1,                   // Smoothly links animation to scroll (1 is a good smoothness value)
      },
      scale: 0.8,                   // Scale down the text container to 80%
      opacity: 0,                   // Fade out the text
      y: -150,                      // Move it up slightly for a parallax effect
      ease: 'power2.inOut',
    });

  }, { scope: container });

  return (
    <div ref={container} className='hero-section relative h-screen w-full'>

      {/* Layer 1: Interactive Particle System */}
      <div className="absolute inset-0 z-0">
        <ParticleSystem 
          imagePath="/sample-image.jpg"
          particleSize={1.5}
          interactionIntensity={0.15}
          animationSpeed={1.0}
        />
      </div>

      {/* Layer 2: Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 md:pb-24 pointer-events-none">
        
        {/* ✅ ADDED a class 'hero-text-container' for easier targeting by GSAP */}
        <div className='hero-text-container w-fit relative'>
          
          <div className="title absolute left-0 text-base font-bold text-left w-full ml-10 text-[30px]">
            Creative Developer
          </div>
          
          <h1 className="mt-8 text-white-outline text-7xl sm:text-8xl md:text-9xl lg:text-[13.5vw] font-extrabold tracking-widest leading-none">
            {name.split("").map((char, index) => (
              <span key={index} className="name-char inline-block">
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;