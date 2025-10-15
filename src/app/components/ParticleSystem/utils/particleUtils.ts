import * as THREE from 'three';
import type { ImageData, TouchData, ParticleGeometryData, MousePosition } from '../types';

export class ParticleUtils {
  static createParticleGeometry(
    imageWidth: number, 
    imageHeight: number, 
    imageData: Uint8ClampedArray
  ): ParticleGeometryData {
    const numPoints = imageWidth * imageHeight;
    
    const geometry = new THREE.InstancedBufferGeometry();
    
    const positions = new Float32Array([
      -0.5, 0.5, 0.0,   // top left
      0.5, 0.5, 0.0,    // top right
      -0.5, -0.5, 0.0,  // bottom left
      0.5, -0.5, 0.0,   // bottom right
    ]);
    
    const uvs = new Float32Array([
      0.0, 0.0,  // top left
      1.0, 0.0,  // top right
      0.0, 1.0,  // bottom left
      1.0, 1.0,  // bottom right
    ]);
    
    const indices = new Uint16Array([
      0, 2, 1,  // first triangle
      2, 3, 1   // second triangle
    ]);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    
    const offsets = new Float32Array(numPoints * 3);
    const indices_array = new Float32Array(numPoints);
    const angles = new Float32Array(numPoints);
    
    let particleIndex = 0;
    
    for (let i = 0; i < numPoints; i++) {
      const x = i % imageWidth;
      const y = Math.floor(i / imageWidth);
      
      const pixelIndex = (y * imageWidth + x) * 4;
      const r = imageData[pixelIndex] / 255;
      const g = imageData[pixelIndex + 1] / 255;
      const b = imageData[pixelIndex + 2] / 255;
      const grey = r * 0.21 + g * 0.71 + b * 0.07;
      
      if (grey < 0.1) continue;
      
      offsets[particleIndex * 3 + 0] = x;
      offsets[particleIndex * 3 + 1] = y;
      offsets[particleIndex * 3 + 2] = 0;
      
      indices_array[particleIndex] = i;
      angles[particleIndex] = Math.random() * Math.PI * 2;
      
      particleIndex++;
    }
    
    const trimmedOffsets = offsets.slice(0, particleIndex * 3);
    const trimmedIndices = indices_array.slice(0, particleIndex);
    const trimmedAngles = angles.slice(0, particleIndex);
    
    geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(trimmedOffsets, 3));
    geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(trimmedIndices, 1));
    geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(trimmedAngles, 1));
    
    return { geometry, particleCount: particleIndex };
  }
  
  static loadImageData(imagePath: string): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Could not get canvas context'));
        
        const maxSize = 320;
        const ratio = Math.min(maxSize / img.width, maxSize / img.height);
        const width = Math.floor(img.width * ratio);
        const height = Math.floor(img.height * ratio);
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        const imageData = ctx.getImageData(0, 0, width, height);
        
        resolve({
          width,
          height,
          data: imageData.data,
          canvas,
          texture: new THREE.CanvasTexture(canvas)
        });
      };
      
      img.onerror = () => reject(new Error(`Failed to load image: ${imagePath}`));
      img.src = imagePath;
    });
  }
  
  static createTouchTexture(width: number = 64, height: number = 64): TouchData {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context for touch texture');
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    
    return { canvas, texture: new THREE.CanvasTexture(canvas), ctx, width, height };
  }
  
  static updateTouchTexture(
    touchData: TouchData, 
    mousePos: MousePosition | null, 
    intensity: number = 0.1
  ): void {
    const { ctx, width, height } = touchData;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    if (mousePos) {
      const x = mousePos.x * width;
      const y = (1 - mousePos.y) * height;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
      gradient.addColorStop(0, `rgba(255, 255, 255, ${intensity})`);
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x - 20, y - 20, 40, 40);
    }
    
    touchData.texture.needsUpdate = true;
  }
}