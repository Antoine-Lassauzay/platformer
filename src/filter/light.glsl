precision mediump float;
// varying vec2 vTextureCoord;
// varying vec4 vColor
// uniform sampler2D uSampler;
// uniform float gray;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;
uniform vec2 lightPosition;
uniform vec4 lightColor;

void main(void) {
    float dist = distance(vec2(gl_FragCoord.x, gl_FragCoord.y), lightPosition);
    float intensity = 10.0 / dist;
    float lightIntensity = intensity;
    gl_FragColor = texture2D(uSampler, vTextureCoord);

    gl_FragColor.rgb *= 0.3 + lightIntensity;//clamp(intensity, 0.5, 1.0);
    gl_FragColor = gl_FragColor + (lightColor * gl_FragColor.a * lightIntensity * 0.1);
    // gl_FragColor.rgb
    // gl_FragColor.rgb = vec3(1, 1, 1);
}