precision highp float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 offset;
attribute float pindex;
attribute float angle;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uRandom;
uniform float uDepth;
uniform float uSize;
uniform vec2 uTextureSize;
uniform sampler2D uTexture;
uniform sampler2D uTouch;

varying vec2 vPuv;
varying vec2 vUv;
varying float vAlpha;

#define M_PI 3.1415926535897932384626433832795

float random(float n) {
    return fract(sin(n) * 43758.5453123);
}

void main() {
    vUv = uv;
    
    vec2 puv = vec2(
        mod(pindex, uTextureSize.x) / uTextureSize.x,
        floor(pindex / uTextureSize.x) / uTextureSize.y
    );
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
