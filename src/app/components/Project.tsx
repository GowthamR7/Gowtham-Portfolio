'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/app/lib/gsap';

const Project = () => {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    // Loop through each .project-item section
    gsap.utils.toArray<HTMLElement>('.project-item').forEach((item: HTMLElement, index: number) => {
      const projectItem = item as HTMLElement;

      const content = projectItem.querySelector('.project-content');
      const image = projectItem.querySelector('.project-image');

      if (!content || !image) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: projectItem,
          start: 'top 75%',
          end: 'bottom 95%',
          scrub: 1,
        },
      });

      const isReversed = index % 2 !== 0;
      const xOffset = isMobile ? 30 : (isReversed ? 80 : -80);
      const xOffsetImage = isMobile ? -30 : (isReversed ? -80 : 80);

      gsap.set(content, { opacity: 0, x: xOffset });
      gsap.set(image, { opacity: 0, x: xOffsetImage });
      gsap.set(content.querySelectorAll('.anim-text'), { opacity: 0, y: 20 });

      tl.to(content, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
        .to(image, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '<')
        .to(content.querySelectorAll('.anim-text'), {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
        }, '-=0.4');
    });

  }, { scope: container, dependencies: [isMobile] });

  return (
    <div ref={container} className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">

      {/* Project 1: Diginest AI */}
      <div className="project-item w-full min-h-screen lg:h-[90vh] xl:h-[95vh] flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-4">
        <div className='project-content w-full lg:w-1/2 text-white p-4 sm:p-6 lg:p-8 xl:p-12'>
          <h1 className='anim-text text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold'>Project</h1>
          <h2 className='anim-text text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-3 lg:mt-4'>Diginest AI | SaaS Platform</h2>
          <p className='anim-text text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            Architected a SaaS platform enabling businesses to deploy Voice, Virtual Avatar, and Text Bots trained on their own product data (RAG) for automated sales and appointment booking.
            <br /><br />
            Engineered WhatsApp automation with custom template creation & broadcasting via Meta Graph API, plus a Smart CRM where unresolved queries auto-convert to tickets.
          </p>
          <div className='anim-text flex border-t border-white/20 pt-2 sm:pt-3 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            <div className='w-1/2'><h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-3 xl:mt-4'>Tech</h2></div>
            <div className='w-1/2'><p className='text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 pt-2 sm:pt-4 lg:pt-6 xl:pt-8 border-l border-white/20 pl-2 sm:pl-3 lg:pl-4'>Next.js<br />Node.js<br />Meta Cloud API<br />Vector DB & OpenAI<br />Razorpay</p></div>
          </div>
          <div className='anim-text flex border-t border-white/20 pt-2 sm:pt-3 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            <div className='w-1/2'><h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-3 xl:mt-4'>Role</h2></div>
            <div className='w-1/2'><p className='text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 pt-2 sm:pt-4 lg:pt-6 xl:pt-8 border-l border-white/20 pl-2 sm:pl-3 lg:pl-4'>Full Stack Developer</p></div>
          </div>
        </div>
        <div className='project-image w-full lg:w-1/2 h-56 sm:h-72 md:h-80 lg:h-full relative rounded-lg lg:rounded-none overflow-hidden'>
          <Image src="/diginest.png" alt="Diginest AI SaaS Platform" fill className='object-cover' />
        </div>
      </div>

      {/* Project 2: AI Placement Insight Generator */}
      <div className="project-item w-full min-h-screen lg:h-[90vh] xl:h-[95vh] flex flex-col-reverse lg:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-4">
        <div className='project-image w-full lg:w-1/2 h-56 sm:h-72 md:h-80 lg:h-full relative rounded-lg lg:rounded-none overflow-hidden'>
          <Image src="/ai.png" alt="AI Placement Insight Generator" fill className='object-cover' />
        </div>
        <div className='project-content w-full lg:w-1/2 text-white p-4 sm:p-6 lg:p-8 xl:p-12'>
          <h2 className='anim-text text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-3 lg:mt-4'>AI Placement Insight Generator</h2>
          <p className='anim-text text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            Designed an autonomous 6-agent system using LangGraph to analyze college placement data and generate actionable insights for administrators.
            <br /><br />
            It features a Retrieval-Augmented Generation (RAG) agent with a FAISS vector store to compare current trends against historical data, providing deep contextual analysis.
          </p>
          <div className='anim-text flex border-t border-white/20 pt-2 sm:pt-3 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            <div className='w-1/2'><h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-3 xl:mt-4'>Tech</h2></div>
            <div className='w-1/2'><p className='text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 pt-2 sm:pt-4 lg:pt-6 xl:pt-8 border-l border-white/20 pl-2 sm:pl-3 lg:pl-4'>LangGraph<br />LangChain<br />Google Gemini<br />Flask<br />Next.js<br />RAG & FAISS</p></div>
          </div>
          <div className='anim-text flex border-t border-white/20 pt-2 sm:pt-3 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            <div className='w-1/2'><h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-3 xl:mt-4'>Role</h2></div>
            <div className='w-1/2'><p className='text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 pt-2 sm:pt-4 lg:pt-6 xl:pt-8 border-l border-white/20 pl-2 sm:pl-3 lg:pl-4'>AI Engineer & Full Stack Developer</p></div>
          </div>
        </div>
      </div>

      {/* Project 3: Jurist Bot */}
      <div className="project-item w-full min-h-screen lg:h-[90vh] xl:h-[95vh] flex flex-col lg:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-4">
        <div className='project-content w-full lg:w-1/2 text-white p-4 sm:p-6 lg:p-8 xl:p-12'>
          <h2 className='anim-text text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-3 lg:mt-4'>Jurist Bot | AI Legal Assistant</h2>
          <p className='anim-text text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            Developed an AI "Scenario Solver" that analyzes complex client situations against Indian Laws (IPC/CrPC) to generate defense strategies and case citations.
            <br /><br />
            Engineered smart document drafting for court-ready documents (Petitions, Affidavits, Contracts) and built a secure RAG pipeline to index legal repositories.
          </p>
          <div className='anim-text flex border-t border-white/20 pt-2 sm:pt-3 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            <div className='w-1/2'><h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-3 xl:mt-4'>Tech</h2></div>
            <div className='w-1/2'><p className='text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 pt-2 sm:pt-4 lg:pt-6 xl:pt-8 border-l border-white/20 pl-2 sm:pl-3 lg:pl-4'>React.js<br />Node.js<br />RAG & OpenAI<br />Text-to-Speech<br />Authentication <br />Razorpay</p></div>
          </div>
          <div className='anim-text flex border-t border-white/20 pt-2 sm:pt-3 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            <div className='w-1/2'><h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-3 xl:mt-4'>Role</h2></div>
            <div className='w-1/2'><p className='text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 pt-2 sm:pt-4 lg:pt-6 xl:pt-8 border-l border-white/20 pl-2 sm:pl-3 lg:pl-4'>Full Stack Developer</p></div>
          </div>
        </div>
        <div className='project-image w-full lg:w-1/2 h-56 sm:h-72 md:h-80 lg:h-full relative rounded-lg lg:rounded-none overflow-hidden'>
          <Image src="/jurishbot.png" alt="Jurist Bot AI Legal Assistant" fill className='object-cover' />
        </div>
      </div>

      {/* Project 4: Healthcare Platform */}
      <div className="project-item w-full min-h-screen lg:h-[90vh] xl:h-[95vh] flex flex-col-reverse lg:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-4">
        <div className='project-image w-full lg:w-1/2 h-56 sm:h-72 md:h-80 lg:h-full relative rounded-lg lg:rounded-none overflow-hidden'>
          <Image src="/health.png" alt="Healthcare Platform" fill className='object-cover' />
        </div>
        <div className='project-content w-full lg:w-1/2 text-white p-4 sm:p-6 lg:p-8 xl:p-12'>
          <h2 className='anim-text text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-2 sm:mt-3 lg:mt-4'>Healthcare Platform | B2B & B2C</h2>
          <p className='anim-text text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            Orchestrated the development of a healthcare platform using a microservices architecture to connect medical professionals with jobs and communities.
            <br /><br />
            Implemented key features like personalized job recommendations, digital portfolios, and an applicant tracking system to streamline professional growth.
          </p>
          <div className='anim-text flex border-t border-white/20 pt-2 sm:pt-3 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            <div className='w-1/2'><h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-3 xl:mt-4'>Tech</h2></div>
            <div className='w-1/2'><p className='text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 pt-2 sm:pt-4 lg:pt-6 xl:pt-8 border-l border-white/20 pl-2 sm:pl-3 lg:pl-4'>Next.js<br />Microservices<br />RabbitMQ & Socket.IO<br />FastAPI & Node.js<br />MongoDB</p></div>
          </div>
          <div className='anim-text flex border-t border-white/20 pt-2 sm:pt-3 mt-3 sm:mt-4 lg:mt-6 xl:mt-8'>
            <div className='w-1/2'><h2 className='text-xl sm:text-2xl lg:text-3xl xl:text-4xl mt-1 sm:mt-2 lg:mt-3 xl:mt-4'>Role</h2></div>
            <div className='w-1/2'><p className='text-xs sm:text-sm lg:text-base xl:text-lg text-white/60 pt-2 sm:pt-4 lg:pt-6 xl:pt-8 border-l border-white/20 pl-2 sm:pl-3 lg:pl-4'>Backend Architect & Developer</p></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Project;