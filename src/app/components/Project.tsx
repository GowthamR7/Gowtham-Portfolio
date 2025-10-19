'use client'; 

import React, { useRef } from 'react';
import Image from 'next/image';
import { gsap, useGSAP } from '@/app/lib/gsap';

const Project = () => {
  const container = useRef(null);

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
          start: 'top 70%', 
          end: 'bottom 90%',
          scrub: true,
        },
      });
      
      const isReversed = index % 2 !== 0;

      // On mobile, don't reverse animations - keep them consistent
      const isMobile = window.innerWidth < 768;
      const xOffset = isMobile ? 50 : (isReversed ? 100 : -100);
      const xOffsetImage = isMobile ? -50 : (isReversed ? -100 : 100);

      gsap.set(content, { opacity: 0, x: xOffset });
      gsap.set(image, { opacity: 0, x: xOffsetImage });
      gsap.set(content.querySelectorAll('.anim-text'), { opacity: 0, y: 30 });

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
        stagger: 0.1,
      }, '-=0.5');
    });
    
  }, { scope: container });

  return (
    <div ref={container} className="w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">

      {/* Project 1: HR Management Tool */}
      <div className="project-item w-full min-h-screen md:h-[95vh] flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-8 md:py-0">
        <div className='project-content w-full md:w-1/2 text-white p-6 sm:p-8 md:p-12'>
          <h1 className='anim-text text-4xl sm:text-5xl md:text-6xl font-bold'>Project</h1>
          <h2 className='anim-text text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-4'>HR Management Tool | B2B</h2>
          <p className='anim-text text-sm sm:text-base md:text-lg text-white/60 mt-4 sm:mt-6 md:mt-8'>
              Built an end-to-end B2B HR management system for streamlining onboarding, payroll, and performance tracking.
              <br/><br/>
              The robust backend, powered by Node.js, was engineered to support over 100,000 requests per day while maintaining 99.99% uptime for all client applications.
          </p>
          <div className='anim-text flex border-t border-white/20 pt-3 mt-4 sm:mt-6 md:mt-8'>
              <div className='w-1/2'><h2 className='text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 md:mt-4'>Tech</h2></div>
              <div className='w-1/2'><p className='text-sm sm:text-base md:text-lg text-white/60 pt-4 sm:pt-6 md:pt-8 border-l border-white/20 pl-3 sm:pl-4'>React.js<br/>Node.js<br/>MongoDB<br/>Redux<br/>TypeScript</p></div>
          </div>
          <div className='anim-text flex border-t border-white/20 pt-3 mt-4 sm:mt-6 md:mt-8'>
              <div className='w-1/2'><h2 className='text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 md:mt-4'>Role</h2></div>
              <div className='w-1/2'><p className='text-sm sm:text-base md:text-lg text-white/60 pt-4 sm:pt-6 md:pt-8 border-l border-white/20 pl-3 sm:pl-4'>Full Stack Developer</p></div>
          </div>
        </div>
        <div className='project-image w-full md:w-1/2 h-64 sm:h-80 md:h-full relative rounded-lg md:rounded-none overflow-hidden'>
          <Image src="/hrm.png" alt="HR Management Tool" fill className='object-cover' />
        </div>
      </div>

      {/* Project 2: AI Placement Insight Generator */}
      <div className="project-item w-full min-h-screen md:h-[95vh] flex flex-col-reverse md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-8 md:py-0">
        <div className='project-image w-full md:w-1/2 h-64 sm:h-80 md:h-full relative rounded-lg md:rounded-none overflow-hidden'>
          <Image src="/ai.png" alt="AI Placement Insight Generator" fill className='object-cover' />
        </div>
        <div className='project-content w-full md:w-1/2 text-white p-6 sm:p-8 md:p-12'>
          <h2 className='anim-text text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-4'>AI Placement Insight Generator</h2>
          <p className='anim-text text-sm sm:text-base md:text-lg text-white/60 mt-4 sm:mt-6 md:mt-8'>
              Designed an autonomous 6-agent system using LangGraph to analyze college placement data and generate actionable insights for administrators.
              <br/><br/>
              It features a Retrieval-Augmented Generation (RAG) agent with a FAISS vector store to compare current trends against historical data, providing deep contextual analysis.
          </p>
          <div className='anim-text flex border-t border-white/20 pt-3 mt-4 sm:mt-6 md:mt-8'>
              <div className='w-1/2'><h2 className='text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 md:mt-4'>Tech</h2></div>
              <div className='w-1/2'><p className='text-sm sm:text-base md:text-lg text-white/60 pt-4 sm:pt-6 md:pt-8 border-l border-white/20 pl-3 sm:pl-4'>LangGraph<br/>LangChain<br/>Google Gemini<br/>Flask<br/>Next.js<br/>RAG & FAISS</p></div>
          </div>
          <div className='anim-text flex border-t border-white/20 pt-3 mt-4 sm:mt-6 md:mt-8'>
              <div className='w-1/2'><h2 className='text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 md:mt-4'>Role</h2></div>
              <div className='w-1/2'><p className='text-sm sm:text-base md:text-lg text-white/60 pt-4 sm:pt-6 md:pt-8 border-l border-white/20 pl-3 sm:pl-4'>AI Engineer & Full Stack Developer</p></div>
          </div>
        </div>
      </div>

      {/* Project 3: Task Management Tool */}
      <div className="project-item w-full min-h-screen md:h-[95vh] flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-8 md:py-0">
        <div className='project-content w-full md:w-1/2 text-white p-6 sm:p-8 md:p-12'>
          <h2 className='anim-text text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-4'>Task Management Tool | B2B</h2>
          <p className='anim-text text-sm sm:text-base md:text-lg text-white/60 mt-4 sm:mt-6 md:mt-8'>
              Launched a B2B task management platform to streamline project tracking and enhance productivity for over 100 users across multiple teams.
              <br/><br/>
              The backend was engineered with over 50 scalable REST API endpoints using Node.js to manage 12 distinct task workflows and complex user role permissions.
          </p>
          <div className='anim-text flex border-t border-white/20 pt-3 mt-4 sm:mt-6 md:mt-8'>
              <div className='w-1/2'><h2 className='text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 md:mt-4'>Tech</h2></div>
              <div className='w-1/2'><p className='text-sm sm:text-base md:text-lg text-white/60 pt-4 sm:pt-6 md:pt-8 border-l border-white/20 pl-3 sm:pl-4'>Next.js<br/>Node.js<br/>MongoDB<br/>Redux<br/>TypeScript</p></div>
          </div>
          <div className='anim-text flex border-t border-white/20 pt-3 mt-4 sm:mt-6 md:mt-8'>
              <div className='w-1/2'><h2 className='text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 md:mt-4'>Role</h2></div>
              <div className='w-1/2'><p className='text-sm sm:text-base md:text-lg text-white/60 pt-4 sm:pt-6 md:pt-8 border-l border-white/20 pl-3 sm:pl-4'>Full Stack Developer</p></div>
          </div>
        </div>
        <div className='project-image w-full md:w-1/2 h-64 sm:h-80 md:h-full relative rounded-lg md:rounded-none overflow-hidden'>
          <Image src="/task.png" alt="Task Management Tool" fill className='object-cover' />
        </div>
      </div>

      {/* Project 4: Healthcare Platform */}
      <div className="project-item w-full min-h-screen md:h-[95vh] flex flex-col-reverse md:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-8 md:py-0">
        <div className='project-image w-full md:w-1/2 h-64 sm:h-80 md:h-full relative rounded-lg md:rounded-none overflow-hidden'>
          <Image src="/health.png" alt="Healthcare Platform" fill className='object-cover' />
        </div>
        <div className='project-content w-full md:w-1/2 text-white p-6 sm:p-8 md:p-12'>
          <h2 className='anim-text text-2xl sm:text-3xl md:text-4xl mt-3 sm:mt-4'>Healthcare Platform | B2B & B2C</h2>
          <p className='anim-text text-sm sm:text-base md:text-lg text-white/60 mt-4 sm:mt-6 md:mt-8'>
              Orchestrated the development of a healthcare platform using a microservices architecture to connect medical professionals with jobs and communities.
              <br/><br/>
              Implemented key features like personalized job recommendations, digital portfolios, and an applicant tracking system to streamline professional growth.
          </p>
          <div className='anim-text flex border-t border-white/20 pt-3 mt-4 sm:mt-6 md:mt-8'>
              <div className='w-1/2'><h2 className='text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 md:mt-4'>Tech</h2></div>
              <div className='w-1/2'><p className='text-sm sm:text-base md:text-lg text-white/60 pt-4 sm:pt-6 md:pt-8 border-l border-white/20 pl-3 sm:pl-4'>Next.js<br/>Microservices<br/>RabbitMQ & Socket.IO<br/>FastAPI & Node.js<br/>MongoDB</p></div>
          </div>
          <div className='anim-text flex border-t border-white/20 pt-3 mt-4 sm:mt-6 md:mt-8'>
              <div className='w-1/2'><h2 className='text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 md:mt-4'>Role</h2></div>
              <div className='w-1/2'><p className='text-sm sm:text-base md:text-lg text-white/60 pt-4 sm:pt-6 md:pt-8 border-l border-white/20 pl-3 sm:pl-4'>Backend Architect & Developer</p></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Project;