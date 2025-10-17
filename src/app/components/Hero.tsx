'use client';

import React, { useRef } from 'react';
import ParticleSystem from './ParticleSystem/ParticleSystem';
import { gsap, useGSAP } from '@/app/lib/gsap';



const Hero = () => {
  const container = useRef(null);
  const name = "GOWTHAM";

  useGSAP(() => {
    const tl = gsap.timeline();

    // Animation for the "Creative Developer" title
    // It will start from these values and animate to its default CSS state
    tl.from('.title', {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      
    });

    // Staggered animation for each character of the name
    tl.from('.name-char', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.05,
    }, "-=0.8");

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
        <div className='w-fit relative'>
          
          {/* ✅ FIXED: Removed 'opacity-0' class from here */}
          <div className="title absolute left-0 text-base font-bold text-left w-full ml-10 text-[30px]">
            Creative Developer
          </div>
          
          <h1 className="mt-8 text-white-outline text-7xl sm:text-8xl md:text-9xl lg:text-[13.5vw] font-extrabold tracking-widest leading-none">
            {name.split("").map((char, index) => (
              // ✅ FIXED: Removed 'opacity-0' class from here
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