import * as THREE from 'three';

export interface ImageData {
  width: number;
  height: number;
  data: Uint8ClampedArray;
  canvas: HTMLCanvasElement;
  texture: THREE.CanvasTexture;
}

export interface TouchData {
  canvas: HTMLCanvasElement;
  texture: THREE.CanvasTexture;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

export interface ParticleGeometryData {
  geometry: THREE.InstancedBufferGeometry;
  particleCount: number;
}

export interface MousePosition {
  x: number;
  y: number;
}

export interface ParticleUniforms {
  uTime: { value: number };
  uRandom: { value: number };
  uDepth: { value: number };
  uSize: { value: number };
  uTextureSize: { value: THREE.Vector2 };
  uTexture: { value: THREE.CanvasTexture | null };
  uTouch: { value: THREE.CanvasTexture | null };
}

export interface ParticleSystemProps {
  imagePath?: string;
  particleSize?: number;
  interactionIntensity?: number;
  animationSpeed?: number;
}

export interface ParticleSystemRefs {
  scene: THREE.Scene | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.PerspectiveCamera | null;
  particles: THREE.Mesh | null;
  mouse: MousePosition;
  touchData: TouchData | null;
  animationId: number | null;
}
