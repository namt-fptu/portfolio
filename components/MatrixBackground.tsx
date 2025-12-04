import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      antialias: false, // Disable antialiasing for performance
      powerPreference: "high-performance" 
    });
    
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader
    const fsSource = `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      
      // Pseudo-random function
      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      void main() {
          // Normalize coordinates
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          
          // Adjust aspect ratio
          st.x *= u_resolution.x / u_resolution.y;
          
          // Configure grid - Increased density
          float columns = 80.0; 
          vec2 ipos = floor(st * columns);
          vec2 fpos = fract(st * columns);
          
          // Random speed per column - Faster and more varied
          float speed = 5.0 + random(vec2(ipos.x, 32.54)) * 15.0;
          
          // Animation position
          float t = u_time * speed;
          float y_val = ipos.y + t;
          
          // Calculate brightness based on position in the drop cycle
          float dropLength = 10.0 + random(vec2(ipos.x, 11.4)) * 40.0; // Longer trails
          
          // Sawtooth wave for the drop
          float val = fract(y_val / dropLength);
          
          // Shaping function for the trail (Lower power = longer visual trail)
          float brightness = pow(val, 8.0); 
          
          // Character generation with flickering
          float charSeed = floor(u_time * 16.0) + ipos.x; // Faster char flicker
          
          // Sub-divide cell into 2x2 blocks to generate "alien" glyphs
          vec2 gridSub = floor(fpos * 2.0); 
          float pixel = step(0.5, random(vec2(gridSub.x + charSeed, gridSub.y + ipos.y)));
          
          // Color logic
          vec3 color = vec3(0.0, 1.0, 0.2); // Matrix Green with slight teal tint
          
          // White head effect
          if (val > 0.96) {
              color = vec3(0.8, 1.0, 0.9);
              brightness = 1.0; 
          }
          
          // Final color compositing
          vec3 finalColor = color * brightness * pixel;
          
          // Add subtle scanline darkening
          float scanline = sin(st.y * 800.0) * 0.1;
          finalColor -= scanline;

          gl_FragColor = vec4(finalColor, 1.0); 
      }
    `;

    // Compile Shader Function
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fsSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up full-screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');

    let startTime = performance.now();
    let animationFrameId: number;

    // Resize handling - MOVED OUT OF RENDER LOOP
    const resize = () => {
      // Force 1.0 pixel ratio for performance on high DPI screens
      const pixelRatio = Math.min(window.devicePixelRatio, 1.5); 
      const displayWidth = window.innerWidth * pixelRatio;
      const displayHeight = window.innerHeight * pixelRatio;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    
    // Initial resize
    resize();
    window.addEventListener('resize', resize);

    const render = (time: number) => {
      const currentTime = (time - startTime) * 0.001; // Seconds

      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform1f(timeUniformLocation, currentTime);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
      // Optional: loose context to free memory
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none"
    />
  );
};

export default MatrixBackground;