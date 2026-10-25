import { useEffect, useRef } from "react";

// Interactive WebGL background for the hero: a slowly drifting noise field drawn
// as bronze ordered-dither pixels, the same texture as .bg-dither-pattern.
// The cursor brightens the field around it; a click or tap sends out a ripple.
// Renders one still frame for reduced motion, pauses off screen, and draws
// nothing if WebGL is unavailable.

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_hover;
uniform vec3 u_click;   // x, y, time of last click
uniform float u_pixel;

// Sine-free hash (Dave Hoskins): stays stable at low float precision.
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}
// 4x4 ordered-dither threshold.
float bayer2(vec2 a) { a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 cell = floor(gl_FragCoord.xy / u_pixel);
  vec2 px = cell * u_pixel;
  vec2 uv = px / u_res.y;

  float t = u_time;
  vec2 q = vec2(fbm(uv * 1.6 + t * 0.03), fbm(uv * 1.6 - t * 0.025 + 4.0));
  float n = fbm(uv * 2.2 + q * 1.4);

  // Cursor: a soft bright pool that also bends the field.
  float d = distance(px, u_mouse);
  n += smoothstep(280.0, 0.0, d) * 0.42 * u_hover;

  // Click ripple: an expanding ring that fades out.
  float age = t - u_click.z;
  if (age > 0.0 && age < 3.0) {
    float r = age * 520.0;
    float dc = distance(px, u_click.xy);
    n += exp(-abs(dc - r) / 26.0) * exp(-age * 1.4) * 0.6;
  }

  // Keep it quiet at the edges and under the text at the bottom.
  vec2 s = gl_FragCoord.xy / u_res;
  float vignette = smoothstep(0.0, 0.35, s.x) * smoothstep(1.0, 0.65, s.x) * smoothstep(0.05, 0.45, s.y);
  float lit = step(bayer4(cell), (n - 0.38) * 1.9 * vignette);

  vec3 bronze = vec3(0.545, 0.451, 0.333);
  float alpha = clamp(lit, 0.0, 1.0) * 0.32;
  gl_FragColor = vec4(bronze * alpha, alpha);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
};

const DitherField = ({ className = "" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    // Pointer events come from the whole section (or footer), since text sits above the canvas.
    const target = canvas?.closest<HTMLElement>("section, footer") ?? host;
    if (!canvas || !host || !target) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("u_res"), uTime = u("u_time"), uMouse = u("u_mouse");
    const uHover = u("u_hover"), uClick = u("u_click"), uPixel = u("u_pixel");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Canvas pixels are CSS pixels (DPR 1): the dither is chunky on purpose and stays cheap.
    const pixel = window.innerWidth < 768 ? 5 : 4;
    const start = performance.now();
    const mouse = { x: -9999, y: -9999 };
    let hover = 0, hoverTarget = 0;
    let click = { x: 0, y: 0, t: -10 };
    let raf = 0, visible = true, running = false;

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width));
      canvas.height = Math.max(1, Math.round(height));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      const t = reduced ? 8 : (now - start) / 1000;
      hover += (hoverTarget - hover) * 0.08;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHover, hover);
      gl.uniform3f(uClick, click.x, click.y, click.t);
      gl.uniform1f(uPixel, pixel);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pointer coordinates in GL space (origin bottom-left).
    const toLocal = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: r.height - (e.clientY - r.top) };
    };
    const onMove = (e: PointerEvent) => {
      const p = toLocal(e);
      mouse.x = p.x;
      mouse.y = p.y;
      hoverTarget = 1;
    };
    const onLeave = () => (hoverTarget = 0);
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e);
      click = { x: p.x, y: p.y, t: (performance.now() - start) / 1000 };
    };
    const onVisibility = () => (document.hidden ? pause() : play());

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });

    resize();
    draw(performance.now());
    io.observe(host);
    ro.observe(host);
    if (!reduced) {
      target.addEventListener("pointermove", onMove);
      target.addEventListener("pointerleave", onLeave);
      target.addEventListener("pointerdown", onDown);
      document.addEventListener("visibilitychange", onVisibility);
      play();
    }

    return () => {
      pause();
      io.disconnect();
      ro.disconnect();
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
      target.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
      // Free GPU objects but keep the context: React may remount on the same canvas
      // (StrictMode in development), and a lost context would render blank.
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
};

export default DitherField;
