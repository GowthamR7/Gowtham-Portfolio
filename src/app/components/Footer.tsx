'use client'; // This is required for using hooks like useState and useEffect

import React, { useState, useEffect } from 'react';

const Footer = () => {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      // Formatter for Indian Standard Time (IST)
      const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentTime(timeFormatter.format(new Date()));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array means this runs once on mount

  return (
    <footer className='w-full bg-black text-white p-6 md:p-8 font-sans'>
      <div className='w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center text-[10px] md:text-xs font-bold tracking-widest uppercase gap-6'>
        
        {/* Left Side: Location & Time */}
        <div className='text-left'>
          <p>Coimbatore, India</p>
          <p>{currentTime} IST</p>
        </div>

        {/* Middle: Social Links */}
        <div className='flex gap-4 md:gap-6'>
          <a href="https://github.com/GowthamR7" target="_blank" rel="noopener noreferrer" className='hover:opacity-75 transition-opacity'>GitHub</a>
          <a href="https://www.linkedin.com/mynetwork/grow/" target="_blank" rel="noopener noreferrer" className='hover:opacity-75 transition-opacity'>LinkedIn</a>
        </div>

        {/* Right Side: Copyright & Status */}
        <div className='text-right'>
          <p>© 2025 Gowtham R</p>
          <p>Available for Work</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;