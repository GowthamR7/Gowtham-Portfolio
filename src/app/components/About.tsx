'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap, useGSAP } from '@/app/lib/gsap';

const About = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // --- Title Parallax Animation ---
    gsap.fromTo('.about-title h1',
      { x: -50, opacity: 0.5 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        }
      }
    );

    gsap.fromTo('.about-title h2',
      { x: 50, opacity: 0.3 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
          end: 'top 30%',
          scrub: true,
        }
      }
    );

    // --- Paragraph Fade In ---
    gsap.fromTo('.about-p',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: '.about-p',
          start: 'top 85%',
          end: 'top 60%',
          scrub: true,
        }
      }
    );

    // --- Cards Stagger Animation ---
    const cards = gsap.utils.toArray<HTMLElement>('.about-card');

    cards.forEach((card, index) => {
      // Stagger offset: each card starts 5% later in the scroll
      const staggerOffset = index * 5;

      gsap.fromTo(card,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          rotateX: 10,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          scrollTrigger: {
            trigger: '.about-cards-container',
            start: `top ${85 - staggerOffset}%`,
            end: `top ${50 - staggerOffset}%`,
            scrub: true,
          }
        }
      );

      // Card content stagger (h3 and p inside each card)
      const cardTitle = card.querySelector('h3');
      const cardText = card.querySelector('p');

      if (cardTitle) {
        gsap.fromTo(cardTitle,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: '.about-cards-container',
              start: `top ${80 - staggerOffset}%`,
              end: `top ${45 - staggerOffset}%`,
              scrub: true,
            }
          }
        );
      }

      if (cardText) {
        gsap.fromTo(cardText,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: '.about-cards-container',
              start: `top ${75 - staggerOffset}%`,
              end: `top ${40 - staggerOffset}%`,
              scrub: true,
            }
          }
        );
      }
    });

    // --- CTA Button Animation ---
    gsap.fromTo('.about-cta',
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        scrollTrigger: {
          trigger: '.about-cta',
          start: 'top 95%',
          end: 'top 70%',
          scrub: true,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className='about-section relative z-10 w-full min-h-screen bg-white text-black p-4 sm:p-6 md:p-8 lg:p-12 font-sans'>
      <div className='max-w-7xl mx-auto'>

        <div className='text-center border-b border-neutral-200 pb-8 sm:pb-10 md:pb-12'>
          <div className='about-title'>
            <h1 className='text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-none tracking-tighter flex text-left justify-start'>
              My Creative
            </h1>
            <h2 className='text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-none tracking-tighter text-neutral-300'>
              Philosophy
            </h2>
          </div>
          <div className='w-full flex justify-center mt-6 sm:mt-8 px-4'>
            <p className='about-p max-w-2xl text-base sm:text-lg md:text-xl text-neutral-600'>
              I see technology as a canvas for creativity. My work is a blend of precision engineering and artistic design, aimed at building digital experiences that are not just functional, but memorable.
            </p>
          </div>
        </div>

        <div className='about-cards-container w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10 md:mt-12'>

          <div className='about-card border border-neutral-200 p-6 sm:p-8 rounded-lg'>
            <h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-3'>
              <span className='text-neutral-400'>01</span>
              Intuitive by Design
            </h3>
            <p className='text-sm sm:text-base text-neutral-600'>
              Every great user journey begins with thoughtful design. I use <strong>React</strong> and <strong>Next.js</strong> to build fluid, responsive interfaces, enhanced with subtle animations using <strong>GSAP</strong>. My goal is to create digital spaces that feel effortless and inspiring to navigate.
            </p>
          </div>

          <div className='about-card border border-neutral-200 p-6 sm:p-8 rounded-lg'>
            <h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-3'>
              <span className='text-neutral-400'>02</span>
              Engineered for Tomorrow
            </h3>
            <p className='text-sm sm:text-base text-neutral-600'>
              Beauty must be supported by strength. I engineer robust, scalable backends with <strong>Node.js</strong> and <strong>Python</strong>, designing powerful microservices and APIs that guarantee performance, reliability, and security for the future.
            </p>
          </div>

          <div className='about-card border border-neutral-200 p-6 sm:p-8 rounded-lg'>
            <h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-3'>
              <span className='text-neutral-400'>03</span>
              Intelligent Experiences
            </h3>
            <p className='text-sm sm:text-base text-neutral-600'>
              I am driven to explore the frontier of technology with <strong>Generative AI</strong>. By building agentic workflows with <strong>LangChain</strong> and implementing advanced <strong>RAG</strong> systems, I infuse applications with intelligence, creating personalized and truly dynamic user interactions.
            </p>
          </div>
        </div>

        <div className='about-cta text-center mt-12 sm:mt-16 md:mt-20'>
          <Link
            href="#contact"
            className='inline-block bg-black text-white font-bold uppercase tracking-widest py-3 px-6 sm:py-4 sm:px-8 rounded-full hover:bg-neutral-800 transition-colors text-sm sm:text-base'
          >
            Let&apos;s Create Together
          </Link>
        </div>

      </div>
    </section>
  );
};

export default About;