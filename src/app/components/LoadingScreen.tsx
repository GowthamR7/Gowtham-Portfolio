'use client';

import React, { useState, useRef } from 'react';
import { gsap, useGSAP } from '@/app/lib/gsap';

// The onLoaded prop is a function we call when the animation is done
const LoadingScreen = ({ onLoaded }: { onLoaded: () => void }) => {
  const container = useRef(null);
  // 1. Add state to hold and display the percentage
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    // This is a proxy object. GSAP animates its `value` property,
    // which is more performant than animating React state directly.
    const counter = { value: 0 };

    // This function updates the React state on every "tick" of the animation
    const updateProgress = () => {
      setProgress(Math.round(counter.value));
    };

    const tl = gsap.timeline({
      // When the timeline is complete, call the onLoaded function from the parent
      onComplete: onLoaded
    });

    // 2. Animate the counter's value from 0 to 100
    tl.to(counter, {
      value: 100,
      duration: 2.5,
      ease: 'power1.inOut',
      onUpdate: updateProgress, // Run the update function on every frame
    });

    // Animate the cat and progress bar at the same time as the counter
    tl.fromTo('#running-cat', 
      { xPercent: -100 }, 
      { xPercent: 1100, duration: 2.5, ease: 'power1.inOut' },
      '<' // The "<" starts this animation at the same time as the previous one
    );

    tl.fromTo('.progress-bar', 
      { scaleX: 0 }, 
      { scaleX: 1, duration: 2.5, ease: 'power1.inOut' },
      '<'
    );

    // Fade out the entire loading screen after the other animations finish
    tl.to(container.current, {
      autoAlpha: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.2
    });

  }, { scope: container });

  return (
    <div ref={container} className="fixed inset-0 bg-black z-[100] flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-sm overflow-hidden p-4 flex flex-col items-center">
        
        {/* 3. Display the percentage from state */}
        <p className="text-white text-7xl font-black font-mono mb-6">
          {progress}%
        </p>
        
        {/* Container for the cat and progress bar for better alignment */}
        <div className="w-full relative h-12">
          {/* Running Cat SVG (positioned absolutely to run "over" the bar area) */}
          <svg id="running-cat" viewBox="0 0 200 80" className="w-24 h-auto absolute -top-12 left-0">
             <path fill="white" d="M38.4,49.4c0,0-1.3,2.3-2.9,2.3s-2.9-2.3-2.9-2.3s-1-1.2-1-2.9s1-2.9,1-2.9s1.3-2.3,2.9-2.3s2.9,2.3,2.9,2.3s1,1.2,1,2.9S38.4,49.4,38.4,49.4z M7.8,59.3c0,0-4.4-11.4,1-13.8c5.4-2.4,12.2-0.5,12.2-0.5s3.4,0,3.4,3.4s-3.4,8.8-3.4,8.8s-3,2.8-5.7,2.8C12.7,60,7.8,59.3,7.8,59.3z M29.1,59.3c0,0-4.4-11.4,1-13.8c5.4-2.4,12.2-0.5,12.2-0.5s3.4,0,3.4,3.4s-3.4,8.8-3.4,8.8s-3,2.8-5.7,2.8C34,60,29.1,59.3,29.1,59.3z M47,28.4c0,0-2.9-10-10.4-10S26.2,28.4,26.2,28.4s-1.8,4.1,3.2,5.2c5,1.1,5.2-1.8,5.2-1.8s1.1-2.9,4.1-2.9s4.1,2.9,4.1,2.9s-0.2,2.9,5.2,1.8C48.8,32.4,47,28.4,47,28.4z M39.6,21.5c0,0-2.3,1-2.3,2.9s2.3,2.9,2.3,2.9s1.3-0.5,1.3-1.6S40.9,21.5,39.6,21.5z M23.6,21.5c0,0,2.3,1,2.3,2.9s-2.3,2.9-2.3,2.9s-1.3-0.5-1.3-1.6S22.3,21.5,23.6,21.5z M47.3,42.5c0,0-1.8-0.9-3.4-0.9c-1.6,0-3.4,0.9-3.4,0.9s-1.3,1.3-0.2,3.2c1.1,1.8,2.1,1.6,2.1,1.6s2.3,0.5,3.4-1.3S47.3,42.5,47.3,42.5z"/>
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container w-full h-1 bg-gray-700 rounded-full">
          <div className="progress-bar h-full bg-white rounded-full" style={{ transformOrigin: 'left' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;