'use client';

import React, { useState, useRef } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';

// The onLoaded prop is a function we call when the animation is finished
const LoadingScreen = ({ onLoaded }: { onLoaded: () => void }) => {
  const container = useRef(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const counter = { value: 0 };

    const updateProgress = () => {
      setProgress(Math.round(counter.value));
    };

    const tl = gsap.timeline({
      // When this timeline is complete, call the onLoaded function
      onComplete: onLoaded
    });

    // Animate the counter's value from 0 to 100 over 3 seconds
    tl.to(counter, {
      value: 100,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: updateProgress, // Update the displayed percentage on every frame
    });

    // Animate the running wolf SVG across the screen at the same time
    tl.fromTo('#running-wolf', 
      { xPercent: -50 }, 
      { xPercent: 1050, duration: 3, ease: 'power2.inOut' },
      '<' // The "<" starts this animation at the same time as the previous one
    );
    
    // Animate the progress bar fill
    tl.fromTo('.progress-bar-fill', 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 3, ease: 'power2.inOut' },
      '<'
    );

    // After everything is done, fade out the entire loading screen
    tl.to(container.current, {
      autoAlpha: 0,
      duration: 1,
      ease: 'power2.out',
      delay: 0.5
    });

  }, { scope: container });

  return (
    <div ref={container} className="fixed inset-0 bg-black z-[100] flex flex-col justify-center items-center font-barlow">
      <div className="w-full max-w-lg overflow-hidden p-4 flex flex-col items-center">
        
        {/* BIGG SIZE Percentage Display */}
        <p className="text-white text-[10vw] md:text-9xl font-black mb-8">
          {progress}<span className="text-4xl">%</span>
        </p>
        
        <div className="w-full relative h-16">
          {/* Running Wolf SVG */}
          <svg id="running-wolf" viewBox="0 0 100 40" className="w-32 h-auto absolute -top-8 left-0 text-white">
            <path fill="currentColor" d="M98.6,22.5c-1.6-1-3.4-1.6-5.4-1.6c-2.3,0-4.4,0.9-6,2.4c-0.8,0.8-1.5,1.7-1.9,2.7c-0.6,1.4-0.6,3-0.1,4.4 c0.2,0.6,0.5,1.2,0.8,1.8c1.6,2.5,4.4,4.2,7.6,4.2c2.8,0,5.4-1.3,7.1-3.4c0.5-0.6,0.9-1.3,1.2-2.1c0.7-1.7,0.6-3.6-0.2-5.2 C99.8,24.1,99.3,23.2,98.6,22.5z M47.8,11.2L44.2,2.1L38.4,3l3.3,8.2L35,16.2l-4.2-1.8L28.2,5.2L22,8.4l2.5,9.2l-3.9,4.2 l-9.6-1.5L7.8,30.3l13.6-2.5l2.1,8.9l8.2-5.4l1.3,4.6l9.2-2.3l-2.7-8l5.2-1.9L47.8,11.2z M2,28.5l0.9,4.2l6.2,1.3l2.5-9.6 l-6.2-1.1L2,28.5z"/>
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-neutral-800 rounded-full">
          <div className="progress-bar-fill h-full bg-white rounded-full" style={{ transformOrigin: 'left' }}></div>
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;