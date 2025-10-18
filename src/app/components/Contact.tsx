'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap, useGSAP } from '@/app/lib/gsap';

// 👇 1. IMPORT THE DOWNLOAD ICON
import { FiMail, FiPhone, FiDownload } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const CreativeLink = ({ title, detail, href, icon, download = false }: { title: string; detail: string; href: string; icon: React.ReactNode; download?: boolean }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    // Add the download attribute if it's a download link
    {...(download && { download: true })}
    className="anim-link group relative flex w-full justify-between items-center border-b border-black py-8 transition-colors duration-300 hover:border-neutral-400"
  >
    <div className='flex items-center gap-4'>
      {icon}
      <p className="text-xl md:text-2xl font-bold uppercase tracking-widest">{title}</p>
    </div>
    <p className="text-lg text-neutral-600 transition-colors duration-300 group-hover:text-black">{detail}</p>
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
        end: 'bottom bottom',
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
      
      {/* ... (Your Header code remains the same) ... */}
      <header className='w-full flex justify-between items-center p-6 md:p-8 text-[10px] md:text-xs font-bold tracking-widest uppercase'>
        <Link href="/" className="z-10">
          <p>Gowtham R</p>
          <p>Creative Developer</p>
        </Link>
        <Link href="/" className="z-10">
          <div className="z-10 border border-black rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer">
            MENU
          </div>
        </Link>
      </header>


      <div
        style={followerStyle}
        className="pointer-events-none fixed -top-4 -left-4 z-0 h-8 w-8 rounded-full bg-black mix-blend-difference"
      ></div>

      <main className="flex-grow w-full flex flex-col md:flex-row p-6 md:p-8">
        
        <div className="w-full md:w-1/2 flex flex-col justify-between bg-black text-white p-8 md:p-12">
            <h1 className="text-[18vw] md:text-[8vw] lg:text-[7vw] font-black leading-none tracking-tighter mt-10">
                <span className="block anim-heading-word">GET IN</span>
                <span className="block anim-heading-word ml-35 mt-8">TOUCH</span>
            </h1>
            <p className="max-w-md text-base text-neutral-300 anim-paragraph ml-40 mb-43">
                I&apos;m currently available for freelance work... Whether you have a clear vision or just the spark of an idea, I&apos;m ready to help bring it to life.
            </p>
        </div>

        <div
          className="w-full md:w-1/2 flex flex-col md:pl-10 lg:pl-20 mt-30"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="border-t border-black w-full"></div>
          <CreativeLink title="Email" detail="Click to Send" href="mailto:gowthamramar1372@gmail.com" icon={<FiMail size={24} />} />
          <CreativeLink title="Phone" detail="Click to Call" href="tel:+919944814765" icon={<FiPhone size={24} />} />
          <CreativeLink title="LinkedIn" detail="View Profile" href="https://www.linkedin.com/in/gowtham-r-1634251b9/" icon={<FaLinkedin size={24} />} />
          <CreativeLink title="GitHub" detail="See My Code" href="https://github.com/GowthamR7" icon={<FaGithub size={24} />} />
          
          {/* 👇 2. ADD THE NEW RESUME LINK HERE */}
          <CreativeLink 
            title="Resume" 
            detail="Download PDF" 
            href="/Gowtham_Resume_Fullstack.pdf" 
            icon={<FiDownload size={24} />}
            download={true} // This tells the component to add the download attribute
          />
        </div>
      </main>

      {/* ... (Your Footer code remains the same) ... */}
      <footer className='w-full bg-black text-white flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold tracking-widest uppercase gap-6 p-6 md:p-8 mt-auto'>
        <p>© 2025 GOWTHAM R</p>
        <p className="hidden md:block">CRAFTED WITH NEXT.JS & GSAP</p>
        <div className="flex items-center gap-6">
          <a href="https://github.com/GowthamR7" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">
            GITHUB
          </a>
          <a href="https://www.linkedin.com/in/gowtham-r-1634251b9/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-400 transition-colors">
            LINKEDIN
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;