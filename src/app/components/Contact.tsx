'use client';

import React, { useState, useEffect, useRef } from 'react'; // NEW: Added useRef
import Link from 'next/link';
import { gsap, useGSAP } from '@/app/lib/gsap'; // NEW: Import GSAP

// NEW: Import icons from the library you just installed
import { FiMail, FiPhone } from 'react-icons/fi';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

// NEW: Updated CreativeLink to accept and display an icon
const CreativeLink = ({ title, detail, href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    // NEW: Added 'anim-link' class for GSAP targeting
    className="anim-link group relative flex w-full justify-between items-center border-b border-black py-8 transition-colors duration-300 hover:border-neutral-400"
  >
    <div className='flex items-center gap-4'>
      {/* NEW: Icon is displayed here */}
      {icon} 
      <p className="text-xl md:text-2xl font-bold uppercase tracking-widest">{title}</p>
    </div>
    <p className="text-lg text-neutral-600 transition-colors duration-300 group-hover:text-black">{detail}</p>
  </a>
);

const ContactPage = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const container = useRef(null); // NEW: Create a ref for the main container

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // NEW: GSAP Animation Logic
  useGSAP(() => {
    // This creates an animation that is linked to the scrollbar (scrub)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%', // Animation starts when the top of the page is 80% down the viewport
        end: 'bottom bottom', // Animation ends when the bottom of the page hits the bottom of the viewport
        scrub: 1.5, // Smoothly scrubs the animation with the scrollbar
      },
    });

    // Animate the "GET IN TOUCH" heading words
    tl.from('.anim-heading-word', {
      y: 100,
      opacity: 0,
      stagger: 0.1, // Animates each word one after the other
      ease: 'power2.out',
    })
    // Animate the paragraph
    .from('.anim-paragraph', {
      y: 50,
      opacity: 0,
      ease: 'power2.out',
    }, '-=0.2') // Overlap with the previous animation for a smoother effect
    // Animate the contact links
    .from('.anim-link', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'power2.out',
    }, '<'); // Start at the same time as the paragraph animation

  }, { scope: container }); // Scope the animation to the container ref

  const followerStyle = {
    transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
    opacity: isHovering ? 1 : 0,
    transformOrigin: 'center',
    transition: 'opacity 0.3s ease, transform 0.1s ease-out',
  };

  return (
    // NEW: Added the ref to the main div
    <div id="contact" ref={container} className="w-full min-h-screen bg-white text-black flex flex-col font-sans overflow-hidden">
      
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
        
        {/* Left Section: Using the recommended "Editorial" layout for a cleaner look */}
        <div className="w-full md:w-1/2 flex flex-col justify-between bg-black text-white p-8 md:p-12">
            <h1 className="text-[18vw] md:text-[8vw] lg:text-[7vw] font-black leading-none tracking-tighter mt-10">
                {/* NEW: Wrapped each word in a span for individual animation */}
                <span className="block anim-heading-word">GET IN</span>
                <span className="block anim-heading-word ml-35 mt-8">TOUCH</span>
            </h1>
            <p className="max-w-md text-base text-neutral-300 anim-paragraph ml-40 mb-50"> {/* NEW: Added animation class */}
                I'm currently available for freelance work... Whether you have a clear vision or just the spark of an idea, I'm ready to help bring it to life.
            </p>
        </div>

        {/* Right Section: Interactive contact details */}
        <div 
          className="w-full md:w-1/2 flex flex-col md:pl-10 lg:pl-20 mt-30"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="border-t border-black w-full"></div>
          {/* NEW: Passed the icon component as a prop to each link */}
          <CreativeLink title="Email" detail="Click to Send" href="mailto:gowthamramar1372@gmail.com" icon={<FiMail size={24} />} />
          <CreativeLink title="Phone" detail="Click to Call" href="tel:+919944814765" icon={<FiPhone size={24} />} />
          <CreativeLink title="LinkedIn" detail="View Profile" href="https://www.linkedin.com/in/gowtham-r-1634251b9/" icon={<FaLinkedin size={24} />} />
          <CreativeLink title="GitHub" detail="See My Code" href="https://github.com/GowthamR7" icon={<FaGithub size={24} />} />
        </div>
      </main>

      <footer className='w-full bg-black text-white flex flex-wrap justify-between items-center text-[10px] md:text-xs font-bold tracking-widest uppercase gap-4 p-6 md:p-8 mt-auto'>
        <p>Available for Work</p>
        <p>© 2025</p>
        <p>Let's Connect</p>
        <p>Portfolio v1.0</p>
        <p>Built with Next.js</p>
      </footer>
    </div>
  );
};

export default ContactPage;