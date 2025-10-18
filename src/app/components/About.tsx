'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';
import Link from 'next/link';


const About = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.about-title', {
      scrollTrigger: {
        trigger: '.about-title',
        start: 'top 90%', 
        end: 'bottom 70%', 
        scrub: true,
      },
      y: 100,
      opacity: 0,
      ease: 'none',
    });

    gsap.from('.about-p', {
      scrollTrigger: {
        trigger: '.about-p',
        start: 'top 90%',
        end: 'bottom 80%',
        scrub: true,
      },
      y: 50,
      opacity: 0,
      ease: 'none',
    });
    
    gsap.from('.about-card', {
      scrollTrigger: {
        trigger: '.about-cards-container',
        start: 'top 85%',
        end: 'bottom 75%', 
        scrub: true,
      },
      y: 80,
      opacity: 0,
      ease: 'none',
      stagger: 0.2, 
    });

  }, { scope: container });

  return (
    <section ref={container} className='about-section relative z-10 w-full min-h-screen bg-white text-black p-8 md:p-12 font-sans'>
      <div className='max-w-7xl mx-auto'>
        
        <div className='text-center border-b border-neutral-200 pb-12'>
          <div className='about-title'>
            <h1 className='text-[10vw] md:text-[8vw] font-black leading-none tracking-tighter flex text-left'>
              My Creative
            </h1>
            <h2 className='text-[10vw] md:text-[8vw] font-black leading-none tracking-tighter text-neutral-300'>
              Philosophy
            </h2>
          </div>
          <div className='w-full flex justify-center mt-8'>
            <p className='about-p max-w-2xl text-lg text-neutral-600'>
              I see technology as a canvas for creativity. My work is a blend of precision engineering and artistic design, aimed at building digital experiences that are not just functional, but memorable.
            </p>
          </div>
        </div>

        <div className='about-cards-container w-full grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
          
          <div className='about-card border border-neutral-200 p-8 rounded-lg'>
            <h3 className='text-2xl font-bold mb-4 flex items-center gap-3'>
              <span className='text-neutral-400'>01</span>
              Intuitive by Design
            </h3>
            <p className='text-neutral-600'>
              Every great user journey begins with thoughtful design. I use **React** and **Next.js** to build fluid, responsive interfaces, enhanced with subtle animations using **GSAP**. My goal is to create digital spaces that feel effortless and inspiring to navigate.
            </p>
          </div>

          <div className='about-card border border-neutral-200 p-8 rounded-lg'>
            <h3 className='text-2xl font-bold mb-4 flex items-center gap-3'>
              <span className='text-neutral-400'>02</span>
              Engineered for Tomorrow
            </h3>
            <p className='text-neutral-600'>
              Beauty must be supported by strength. I engineer robust, scalable backends with **Node.js** and **Python**, designing powerful microservices and APIs that guarantee performance, reliability, and security for the future.
            </p>
          </div>

          <div className='about-card border border-neutral-200 p-8 rounded-lg'>
            <h3 className='text-2xl font-bold mb-4 flex items-center gap-3'>
              <span className='text-neutral-400'>03</span>
              Intelligent Experiences
            </h3>
            <p className='text-neutral-600'>
              I am driven to explore the frontier of technology with **Generative AI**. By building agentic workflows with **LangChain** and implementing advanced **RAG** systems, I infuse applications with intelligence, creating personalized and truly dynamic user interactions.
            </p>
          </div>
        </div>

        <div className='text-center mt-20'>
          <Link
            href="#contact"
            className='inline-block bg-black text-white font-bold uppercase tracking-widest py-4 px-8 rounded-full hover:bg-neutral-800 transition-colors'
          >
            {/* THIS IS THE FIXED LINE 👇 */}
            Let&apos;s Create Together
          </Link>
        </div>

      </div>
    </section>
  );
};

export default About;