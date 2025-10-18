'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ParticleUtils } from './utils/particleUtils';
import type { 
  ParticleSystemProps, 
  ParticleSystemRefs, 
  ParticleUniforms,
  TouchData
} from './types';

// Vertex shader
const vertexShader = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 offset;
attribute float pindex;
attribute float angle;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform sampler2D uTouch;
varying vec2 vPuv;
varying vec2 vUv;
varying float vAlpha;
#define M_PI 3.1415926535897932384626433832795
float random(float n) { return fract(sin(n) * 43758.5453123); }
void main() {
    vUv = uv;
    vec2 puv = vec2(mod(pindex, uTextureSize.x) / uTextureSize.x, floor(pindex / uTextureSize.x) / uTextureSize.y);
    vPuv = puv;
    vec4 colA = texture2D(uTexture, puv);
    float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
    if (grey < 0.1) {
        gl_Position = vec4(0.0, 0.0, -1000.0, 1.0);
        return;
    }
    vec3 displaced = offset;
    displaced.xy -= uTextureSize * 0.5;
    float rnd = random(pindex);
    vec2 touchUv = (displaced.xy + uTextureSize * 0.5) / uTextureSize;
    vec4 touch = texture2D(uTouch, touchUv);
    float touchForce = touch.r * 20.0;
    displaced.x += sin(angle + uTime * 0.5) * touchForce * rnd;
    displaced.y += cos(angle + uTime * 0.5) * touchForce * rnd;
    displaced.z += touchForce * rnd;
    displaced.x += sin(uTime * 0.1 + rnd * M_PI) * 2.0;
    displaced.y += cos(uTime * 0.1 + rnd * M_PI) * 2.0;
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    mvPosition.xyz += position * uSize;
    vAlpha = smoothstep(0.0, 0.3, grey);
    gl_Position = projectionMatrix * mvPosition;
}
`;

// Fragment shader
const fragmentShader = `
precision highp float;
uniform sampler2D uTexture;
varying vec2 vPuv;
varying vec2 vUv;
varying float vAlpha;
void main() {
    vec4 color = texture2D(uTexture, vPuv);
    float dist = length(vUv - 0.5);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(color.rgb, alpha * vAlpha * color.a);
    if (gl_FragColor.a < 0.001) discard;
}
`;

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  imagePath = '/sample-image.jpg',
  particleSize = 1.5,
  interactionIntensity = 0.1,
  animationSpeed = 1.0
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const refsRef = useRef<ParticleSystemRefs>({
    scene: null, renderer: null, camera: null, particles: null,
    mouse: { x: 0, y: 0 }, touchData: null, animationId: null
  });
  
  const [error, setError] = useState<string | null>(null);

  const handleMouseMove = useCallback((event: MouseEvent): void => {
    if (refsRef.current.mouse) {
      refsRef.current.mouse.x = event.clientX / window.innerWidth;
      refsRef.current.mouse.y = 1.0 - event.clientY / window.innerHeight;
    }
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent): void => {
    if (event.touches.length > 0 && refsRef.current.mouse) {
      const touch = event.touches[0];
      refsRef.current.mouse.x = touch.clientX / window.innerWidth;
      refsRef.current.mouse.y = 1.0 - touch.clientY / window.innerHeight;
    }
  }, []);

  const handleResize = useCallback((): void => {
    const { camera, renderer } = refsRef.current;
    if (camera && renderer) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const currentMount = mountRef.current;
    
    const initParticleSystem = async (): Promise<void> => {
      try {
        const imageToLoad = `${imagePath}?v=${Date.now()}`;
        const imageData = await ParticleUtils.loadImageData(imageToLoad);

        if (!mounted) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 200;
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        if (currentMount) {
          currentMount.innerHTML = '';
          currentMount.appendChild(renderer.domElement);
        }
        
        const { geometry, particleCount } = ParticleUtils.createParticleGeometry(imageData.width, imageData.height, imageData.data);
        if (particleCount === 0) {
            throw new Error("No particles were generated. The image might be too dark or failed to load correctly.");
        }
        geometry.instanceCount = particleCount;
        
        const touchData: TouchData = ParticleUtils.createTouchTexture(64, 64);
        
        const uniforms: ParticleUniforms = {
          uTime: { value: 0 }, uSize: { value: particleSize },
          uTextureSize: { value: new THREE.Vector2(imageData.width, imageData.height) },
          uTexture: { value: imageData.texture }, uTouch: { value: touchData.texture },
          uRandom: { value: Math.random() }, // Add a random value
          uDepth: { value: 0 } // Initialize depth value
        };

        const material = new THREE.RawShaderMaterial({
          uniforms, vertexShader, fragmentShader,
          depthTest: false, transparent: true, side: THREE.DoubleSide
        });
        
        const particles = new THREE.Mesh(geometry, material);
        scene.add(particles);
        
        refsRef.current = { scene, renderer, camera, particles, mouse: { x: 0, y: 0 }, touchData, animationId: null };
        
        const animate = (): void => {
          if (!mounted) return;
          const time = performance.now() * 0.001 * animationSpeed;
          const { particles: currentParticles, touchData: currentTouchData, mouse, renderer: currentRenderer, scene: currentScene, camera: currentCamera } = refsRef.current;
          
          if (currentParticles && 'uniforms' in currentParticles.material) {
            const particleMaterial = currentParticles.material as THREE.RawShaderMaterial;
            if (particleMaterial.uniforms) particleMaterial.uniforms.uTime.value = time;
          }
          if (currentTouchData) ParticleUtils.updateTouchTexture(currentTouchData, mouse, interactionIntensity);
          if (currentRenderer && currentScene && currentCamera) currentRenderer.render(currentScene, currentCamera);
          
          refsRef.current.animationId = requestAnimationFrame(animate);
        };
        
        animate();
        
      } catch (err) {
        console.error('Error initializing particle system:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      }
    };
    
    initParticleSystem();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      mounted = false;
      const { animationId, renderer, particles } = refsRef.current;
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) {
          renderer.dispose();
          if (currentMount && currentMount.contains(renderer.domElement)) {
            currentMount.removeChild(renderer.domElement);
          }
      }
      if (particles) {
        if (particles.geometry) particles.geometry.dispose();
        if ('material' in particles && particles.material instanceof THREE.Material) {
          particles.material.dispose();
        }
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [imagePath, particleSize, interactionIntensity, animationSpeed, handleMouseMove, handleTouchMove, handleResize]);
  
  if (error) return <div className="flex items-center justify-center h-screen bg-black text-red-500 p-8 text-center">Error: {error}</div>;
  
  return <div ref={mountRef} className="w-full h-full" />;
};

export default ParticleSystem;