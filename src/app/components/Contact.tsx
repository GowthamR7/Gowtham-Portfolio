'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, useGSAP } from '@/app/lib/gsap';

import { FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const CreativeLink = ({ title, detail, href, icon, download = false }: { title: string; detail: string; href: string; icon: React.ReactNode; download?: boolean }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    {...(download && { download: true })}
    className="anim-link group relative flex w-full justify-between items-center border-b border-black py-6 sm:py-8 transition-colors duration-300 hover:border-neutral-400"
  >
    <div className='flex items-center gap-3 sm:gap-4'>
      <div className="text-lg sm:text-xl md:text-2xl">{icon}</div>
      <p className="text-base sm:text-lg md:text-2xl font-bold uppercase tracking-wide sm:tracking-widest">{title}</p>
    </div>
    <p className="text-sm sm:text-base md:text-lg text-neutral-600 transition-colors duration-300 group-hover:text-black hidden sm:block">{detail}</p>
  </a>
);

const ContactPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
        end: 'top 30%', 
        scrub: 1.5,
      },
    });

    tl.from('.anim-heading-word', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
    })
    .from('.anim-paragraph', {
      y: 50,
      opacity: 0,
      ease: 'power2.out',
    }, '-=0.2')
    .from('.anim-link', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
    }, '<');

  }, { scope: container });

  const followerStyle = {
    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
    opacity: isHovering ? 1 : 0,
    transformOrigin: 'center',
    transition: 'opacity 0.3s ease, transform 0.1s ease-out',
  };

  return (
    <div id="contact" ref={container} className="w-full min-h-screen bg-white text-black flex flex-col font-sans overflow-hidden">
      
      <header className='w-full flex justify-between items-center p-4 sm:p-6 md:p-8 text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest uppercase'>
        <Link href="/" className="z-10">
          <p>Gowtham R</p>
          <p>Creative Developer</p>
        </Link>
        <Link href="/" className="z-10">
          <div className="z-10 border border-black rounded-full px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer text-[9px] sm:text-[10px] md:text-xs">
            MENU
          </div>
        </Link>
      </header>

      {/* Custom cursor - only show on desktop */}
      <div
        style={followerStyle}
        className="pointer-events-none fixed -top-4 -left-4 z-0 h-8 w-8 rounded-full bg-black mix-blend-difference hidden md:block"
      ></div>

      <main className="flex-grow w-full flex flex-col md:flex-row p-4 sm:p-6 md:p-8">
        
        {/* Left side - GET IN TOUCH section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between bg-black text-white p-6 sm:p-8 md:p-12 mb-8 md:mb-0 rounded-lg md:rounded-none">
            <h1 className="text-[20vw] sm:text-[15vw] md:text-[8vw] lg:text-[7vw] font-black leading-none tracking-tighter mt-6 sm:mt-8 md:mt-10">
                <span className="block anim-heading-word">GET IN</span>
                <span className="block anim-heading-word mt-4 sm:mt-6 md:mt-8 ml-0 md:ml-35">TOUCH</span>
            </h1>
            <p className="max-w-md text-sm sm:text-base text-neutral-300 anim-paragraph mt-8 sm:mt-12 md:ml-40 mb-8 sm:mb-12 md:mb-43">
                I&apos;m currently available for freelance work... Whether you have a clear vision or just the spark of an idea, I&apos;m ready to help bring it to life.
            </p>
        </div>

        {/* Right side - Contact links */}
        <div
          className="w-full md:w-1/2 flex flex-col md:pl-10 lg:pl-20 md:mt-30"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="border-t border-black w-full"></div>
          <CreativeLink title="Email" detail="Click to Send" href="mailto:gowthamramar1372@gmail.com" icon={<FiMail size={24} />} />
          <CreativeLink title="Phone" detail="Click to Call" href="tel:+919944814765" icon={<FiPhone size={24} />} />
          <CreativeLink title="LinkedIn" detail="View Profile" href="https://www.linkedin.com/in/gowtham-r-1634251b9/" icon={<FaLinkedin size={24} />} />
          {/* <CreativeLink title="GitHub" detail="See My Code" href="https://github.com/GowthamR7" icon={<FaGithub size={24} />} /> */}
          
          <CreativeLink 
            title="Resume" 
            detail="Download PDF" 
            href="/Gowtham_Resume_Fullstack.pdf" 
            icon={<FiDownload size={24} />}
            download={true}
          />
        </div>
      </main>

      <footer className='w-full bg-black text-white flex flex-col md:flex-row justify-between items-center text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 mt-auto'>
        <p>© 2025 GOWTHAM R</p>
        <p className="hidden md:block">CRAFTED WITH NEXT.JS & GSAP</p>
        <div className="flex items-center gap-4 sm:gap-6">
          {/* <a href="https://github.com/GowthamR7" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">
            GITHUB
          </a> */}
          <a href="https://www.linkedin.com/in/gowtham-r-1634251b9/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">
            LINKEDIN
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;