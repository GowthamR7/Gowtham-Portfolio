'use client';

import React from 'react';
import Link from 'next/link';

const About = () => {
  // All GSAP animations are handled in page.tsx to ensure proper coordination
  // with the section slide-in animation

  return (
    <section className='about-section relative z-10 w-full min-h-screen bg-white text-black p-4 sm:p-6 md:p-8 lg:p-12 font-sans'>
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

        <div className='text-center mt-12 sm:mt-16 md:mt-20'>
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