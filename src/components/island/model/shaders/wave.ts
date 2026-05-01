export const waveVertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uHeight;
  varying vec3 vNormal;
  varying vec3 vPos;

  void main() {
    vec3 pos = position;
    float t = uTime * uSpeed;

    pos.z += sin(pos.x * 0.831 + pos.y * 0.127 + t * 1.000) * uHeight * 0.38;
    pos.z += sin(pos.x * 0.317 + pos.y * 0.794 + t * 0.731) * uHeight * 0.25;
    pos.z += sin(pos.x * 1.153 - pos.y * 0.463 + t * 1.274) * uHeight * 0.16;
    pos.z += sin(pos.x * 0.612 + pos.y * 1.031 + t * 0.917) * uHeight * 0.12;
    pos.z += sin(pos.x * 2.073 - pos.y * 1.541 + t * 1.830) * uHeight * 0.05;
    pos.z += sin(pos.x * 1.739 + pos.y * 2.213 + t * 2.150) * uHeight * 0.04;

    vPos = (modelMatrix * vec4(pos, 1.0)).xyz;

    float eps = 0.4;
    float zL = sin((pos.x-eps)*0.831+pos.y*0.127+t)*uHeight*0.38
             + sin((pos.x-eps)*0.317+pos.y*0.794+t*0.731)*uHeight*0.25
             + sin((pos.x-eps)*1.153-pos.y*0.463+t*1.274)*uHeight*0.16;
    float zR = sin((pos.x+eps)*0.831+pos.y*0.127+t)*uHeight*0.38
             + sin((pos.x+eps)*0.317+pos.y*0.794+t*0.731)*uHeight*0.25
             + sin((pos.x+eps)*1.153-pos.y*0.463+t*1.274)*uHeight*0.16;
    float zD = sin(pos.x*0.831+(pos.y-eps)*0.127+t)*uHeight*0.38
             + sin(pos.x*0.317+(pos.y-eps)*0.794+t*0.731)*uHeight*0.25
             + sin(pos.x*1.153-(pos.y-eps)*0.463+t*1.274)*uHeight*0.16;
    float zU = sin(pos.x*0.831+(pos.y+eps)*0.127+t)*uHeight*0.38
             + sin(pos.x*0.317+(pos.y+eps)*0.794+t*0.731)*uHeight*0.25
             + sin(pos.x*1.153-(pos.y+eps)*0.463+t*1.274)*uHeight*0.16;

    vec3 localNormal = normalize(vec3(zL - zR, zD - zU, 2.0));
    vNormal = normalize(normalMatrix * localNormal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const waveFragmentShader = `
  uniform vec3 uWaterColor;
  uniform vec3 uSunDir;
  varying vec3 vNormal;
  varying vec3 vPos;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 sunDir = normalize(uSunDir);

    float diff = max(dot(n, sunDir), 0.0);
    vec3 viewDir = normalize(cameraPosition - vPos);
    vec3 halfDir = normalize(sunDir + viewDir);
    float spec = pow(max(dot(n, halfDir), 0.0), 80.0);

    float depth = clamp(vPos.y * 0.15 + 0.5, 0.0, 1.0);
    vec3 deepColor    = uWaterColor * 0.5;
    vec3 shallowColor = uWaterColor * 1.2;
    vec3 color = mix(deepColor, shallowColor, depth);

    color *= (0.4 + diff * 0.6);
    color += vec3(0.95, 0.98, 1.0) * spec * 0.8;

    float foam = smoothstep(0.6, 1.0, depth) * smoothstep(0.3, 0.8, spec + diff * 0.3);
    color = mix(color, vec3(1.0), foam * 0.35);

    gl_FragColor = vec4(color, 0.90);
  }
`;
