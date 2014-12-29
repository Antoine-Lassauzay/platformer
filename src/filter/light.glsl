precision mediump float;
// varying vec2 vTextureCoord;
// varying vec4 vColor
// uniform sampler2D uSampler;
// uniform float gray;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;

void main(void) {
    vec2 lightSource = vec2(420, 560-210);
    float dist = distance(vec2(gl_FragCoord.x, gl_FragCoord.y), lightSource);
    gl_FragColor = texture2D(uSampler, vTextureCoord);
    float multiplier = clamp(100.0/dist, .5, 1.0);
    gl_FragColor.rgb = gl_FragColor.rgb * multiplier;
    // gl_FragColor.rgb = vec3(1, 1, 1);
}