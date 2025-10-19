'use client';

import React, { useRef } from 'react';
import ParticleSystem from './ParticleSystem/ParticleSystem';
import { gsap, useGSAP } from '@/app/lib/gsap';

const Hero = () => {
  const container = useRef(null);
  const name = "GOWTHAM";

  useGSAP(() => {
    // Initial entrance animation
    const enterTimeline = gsap.timeline();
    
    enterTimeline
      .from('.title', {
        y: 50,
        opacity: 0,
        rotationX: 30,
        z: -100,
        duration: 1.2,
        ease: 'power3.out',
      })
      .from('.name-char', {
        y: 100,
        opacity: 0,
        rotationY: 45,
        z: -50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.05,
      }, "-=0.8");

    // Mouse interaction for 3D effect (desktop only)
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return; // Disable on mobile
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;
      
      gsap.to('.hero-text-container', {
        rotationY: xPos * 8,
        rotationX: -yPos * 8,
        z: Math.abs(xPos) * 30,
        duration: 1,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, { scope: container });

  return (
    <div ref={container} className='hero-section relative h-screen w-full overflow-hidden'>
      {/* Particle System Background */}
      <div className="absolute inset-0 z-0">
        <ParticleSystem 
          imagePath="/sample-image.jpg"
          particleSize={1.5}
          interactionIntensity={0.15}
          animationSpeed={1.0}
        />
      </div>

      {/* 3D Text Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-12 sm:pb-16 md:pb-24 px-4 pointer-events-none">
        <div className='hero-text-container w-full max-w-screen-xl relative transform-gpu'>
          <div className="title text-sm sm:text-base md:text-lg font-bold text-left w-full px-2 sm:px-4 md:ml-10 text-xl sm:text-2xl md:text-[30px]">
            Creative Developer
          </div>
          
          <h1 className="mt-4 sm:mt-6 md:mt-8 text-white-outline text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[13.5vw] font-extrabold tracking-wider sm:tracking-wide md:tracking-widest leading-none px-2 sm:px-0">
            {name.split("").map((char, index) => (
              <span key={index} className="name-char inline-block transform-gpu">
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