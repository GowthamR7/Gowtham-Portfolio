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

    // Mouse interaction for 3D effect
    const handleMouseMove = (e: MouseEvent) => {
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
    <div ref={container} className='hero-section relative h-screen w-full'>
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
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 md:pb-24 pointer-events-none">
        <div className='hero-text-container w-fit relative transform-gpu'>
          <div className="title absolute left-0 text-base font-bold text-left w-full ml-10 text-[30px]">
            Creative Developer
          </div>
          
          <h1 className="mt-8 text-white-outline text-7xl sm:text-8xl md:text-9xl lg:text-[13.5vw] font-extrabold tracking-widest leading-none">
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
