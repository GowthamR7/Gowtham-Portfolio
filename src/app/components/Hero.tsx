'use client';

import React, { useRef, useEffect, useState } from 'react';
import ParticleSystem from './ParticleSystem/ParticleSystem';
import { gsap, useGSAP } from '@/app/lib/gsap';

const Hero = () => {
  const container = useRef(null);
  const name = "GOWTHAM";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    // Initial entrance animation
    const enterTimeline = gsap.timeline();

    enterTimeline
      .from('.title', {
        y: 50,
        opacity: 0,
        rotationX: isMobile ? 0 : 30,
        z: isMobile ? 0 : -100,
        duration: 1.2,
        ease: 'power3.out',
      })
      .from('.name-char', {
        y: isMobile ? 50 : 100,
        opacity: 0,
        rotationY: isMobile ? 0 : 45,
        z: isMobile ? 0 : -50,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.05,
      }, "-=0.8");

    // Mouse interaction for 3D effect (desktop only)
    if (!isMobile) {
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
    }

  }, { scope: container, dependencies: [isMobile] });

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
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-12 sm:pb-16 md:pb-20 lg:pb-24 pointer-events-none px-4 sm:px-6 lg:px-8">
        <div className='hero-text-container w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw] relative transform-gpu'>
          <div className="title absolute left-0 text-base font-bold text-left w-full ml-2 sm:ml-4 md:ml-6 lg:ml-10 text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px]">
            Creative Developer
          </div>

          <h1 className="mt-6 sm:mt-8 text-white-outline text-[14vw] sm:text-[13vw] md:text-[11vw] lg:text-[10vw] xl:text-[9vw] font-extrabold tracking-[0.02em] sm:tracking-[0.05em] md:tracking-wider lg:tracking-widest leading-none whitespace-nowrap overflow-hidden">
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