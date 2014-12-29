precision mediump float;
// varying vec2 vTextureCoord;
// varying vec4 vColor
// uniform sampler2D uSampler;
// uniform float gray;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;

void main(void) {
    vec2 lightSource = vec2(455, 560-170);
    float dist = distance(vec2(gl_FragCoord.x, gl_FragCoord.y), lightSource);
    float intensity = 10.0 / dist;
    float lightIntensity = intensity;
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    vec4 lightColor = vec4(1.0, 0.9, 0, 1);
    gl_FragColor.rgb *= 0.3 + lightIntensity;//clamp(intensity, 0.5, 1.0);
    gl_FragColor = gl_FragColor + (lightColor * gl_FragColor.a * lightIntensity * 0.1);
    // gl_FragColor.rgb
    // gl_FragColor.rgb = vec3(1, 1, 1);
}