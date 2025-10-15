precision highp float;

uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vPuv;
varying vec2 vUv;
varying float vAlpha;

void main() {
    vec4 color = texture2D(uTexture, vPuv);
    
    vec2 uv = vUv;
    float dist = length(uv - 0.5);
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    gl_FragColor = vec4(color.rgb, alpha * vAlpha * color.a);
    
    if (gl_FragColor.a < 0.001) discard;
}
