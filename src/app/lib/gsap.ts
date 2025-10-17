import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// --- Common GSAP Plugin Registration ---
// This is the most important part. By registering plugins here,
// we make them available project-wide to any component that imports this file.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// --- Re-export GSAP and its plugins ---
// We re-export everything from GSAP and the plugins so that we can
// import them from this file in our components, rather than from the 'gsap' package.
// This ensures we are always using the same registered GSAP instance.
export * from 'gsap';
export { ScrollTrigger, useGSAP };