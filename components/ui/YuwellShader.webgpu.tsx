/*
 * @yuwell · OpenShaders
 * https://openshaders.com/@yuwell
 * WebGPU with automatic WebGL fallback · React component (TypeScript)
 *
 * import { YuwellShader } from "./YuwellShader.webgpu.tsx";
 *
 * <YuwellShader theme="dark" style={{ width: 480, height: 300 }} />
 */

"use client";

import { type CSSProperties, useEffect, useRef } from "react";

const FIELD_SHADER = `struct Uniforms {
  resolution: vec2f,
  time: f32,
  lightMode: f32,
  darkBackground: vec3f,
  pixelRatio: f32,
  lightBackground: vec3f,
}
@group(0) @binding(0) var<uniform> u: Uniforms;

const HUE: f32 = 0.205;
const HUE_SPREAD: f32 = -0.055;
const HUE_TRAVEL: f32 = 2.2;
const CHROMA: f32 = 0.165;
const LIGHTNESS: f32 = 0.68;
const COLOUR_CYCLE: f32 = 0.180289254;
const THETA: f32 = 2.12781549;
const SHEAR: f32 = 0.963575602;
const SHRINK: f32 = 0.952983558;
const LAYERS: f32 = 48.0;
const WARP_FREQ_X: f32 = 0.402473509;
const WARP_FREQ_Y: f32 = 2.57634234;
const WARP_AMP_X: f32 = 0.14635025;
const WARP_AMP_Y: f32 = 0.0324737616;
const ASPECT_X: f32 = 2.08348799;
const ASPECT_Y: f32 = 0.215936691;
const OFFSET_X: f32 = 0.364977837;
const OFFSET_Y: f32 = -0.0113312239;
const TILT: f32 = -0.474999517;
const ZOOM: f32 = 1.04318345;
const CENTRE_X: f32 = 0.574172676;
const CENTRE_Y: f32 = -0.492953688;
const GLOW_SIZE: f32 = 0.00240834639;
const FALLOFF: f32 = 0.305342615;
const VIGNETTE: f32 = 0.0701176673;
const FLOW_SPEED: f32 = 0.624523401;
const FLOW_DIRECTION: f32 = 1.0;
const BREATH_RATE: f32 = 0.598989964;
const BREATH_AMOUNT: f32 = 0.118659742;
const PHASE: f32 = 76.053566;
const ECHO: f32 = 0.380957514;
const ECHO_SHIFT: f32 = -0.121080875;
const SOFTNESS: f32 = 0.00217873859;
const LIGHT_SWING: f32 = 0.15;

@vertex fn vertexMain(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
  let position = vec2f(f32((index << 1u) & 2u), f32(index & 2u));
  return vec4f(position * 2.0 - 1.0, 0.0, 1.0);
}

const TAU: f32 = 6.28318530718;

fn oklchToLinear(L: f32, C: f32, h: f32) -> vec3f {
  let a = C * cos(h);
  let b = C * sin(h);
  let l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  let m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  let s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  var lms = vec3f(l_, m_, s_);
  lms = lms * lms * lms;
  return mat3x3f(4.0767416621, -1.2684380046, -0.0041960863,
                 -3.3077115913, 2.6097574011, -0.7034186147,
                 0.2309699292, -0.3413193965, 1.7076147010) * lms;
}

fn fmod(x: f32, y: f32) -> f32 { return x - y * floor(x / y); }

fn blueNoise(p: vec2f, frame: f32) -> f32 {
  let q = p + 5.588238 * fmod(frame, 64.0);
  return fract(52.9829189 * fract(0.06711056 * q.x + 0.00583715 * q.y));
}

@fragment fn fragmentMain(@builtin(position) position: vec4f) -> @location(0) vec4f {
  let R = u.resolution;
  let frag = vec2f(position.x, R.y - position.y);
  let pos = (frag - 0.5 * R) / R.y;
  let t = u.time * FLOW_SPEED * FLOW_DIRECTION + PHASE;
  let breath = (-sin(u.time * BREATH_RATE * 1.5) + sin(u.time * BREATH_RATE + 1.0)) * 0.25 + 0.5;

  var p = (pos - vec2f(CENTRE_X, CENTRE_Y)) * (ZOOM - breath * BREATH_AMOUNT);
  let ct = cos(TILT);
  let st = sin(TILT);
  p = mat2x2f(ct, st, -st, ct) * p;

  let fold = mat2x2f(cos(THETA), sin(THETA), -SHEAR, cos(THETA));

  let hue0 = HUE * TAU;
  let hue1 = hue0 + HUE_SPREAD * TAU;
  var color = vec3f(0.0);

  for (var i: f32 = 1.0; i <= 52.0; i += 1.0) {
    if (i > LAYERS) { break; }
    p.x += -sin(p.y * WARP_FREQ_X + t + i * 0.007) * WARP_AMP_X;
    p.y += -sin(p.x * WARP_FREQ_Y - t + i * 0.02) * WARP_AMP_Y;
    p = fold * p * SHRINK;

    let q = p - vec2f(OFFSET_X + breath * 0.1, OFFSET_Y);
    let s = vec2f(q.x * ASPECT_X, q.y * ASPECT_Y);
    var glow = GLOW_SIZE / (dot(s, s) + SOFTNESS);
    if (ECHO > 0.0) {
      let e = vec2f((q.x - ECHO_SHIFT) * ASPECT_X, s.y);
      glow += ECHO * GLOW_SIZE / (dot(e, e) + SOFTNESS);
    }
    glow *= 0.25 + breath * 0.4;

    let r = length(p);
    let k = sin(i * COLOUR_CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    let tint = clamp(oklchToLinear(LIGHTNESS + LIGHT_SWING * k, CHROMA * (0.75 + 0.35 * k), mix(hue0, hue1, k)), vec3f(0.0), vec3f(1.0));
    color += glow * tint * exp2(-r * FALLOFF);
  }

  let x = max(color, vec3f(0.0));
  color = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  color = pow(clamp(color, vec3f(0.0), vec3f(1.0)), vec3f(0.85, 0.92, 0.98));

  let edge = smoothstep(0.5, 1.6, length(pos));
  color *= 1.0 - edge * VIGNETTE;

  let dark = u.darkBackground + color * (1.0 - u.darkBackground);
  let strength = max(color.r, max(color.g, color.b));
  let light = u.lightBackground * (1.0 - strength) + color * 0.96;
  color = mix(dark, light, vec3f(u.lightMode));

  color += (blueNoise(frag, floor(u.time * 24.0)) - 0.5) / 255.0;
  return vec4f(clamp(color, vec3f(0.0), vec3f(1.0)), 1.0);
}
`;

// ── WebGL 1/2 Equivalent Fragment Shader for Cross-Browser Fallback (Safari, Brave, Firefox, Mobile) ──
const WEBGL_VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const WEBGL_FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_lightMode;
uniform vec3 u_darkBackground;
uniform vec3 u_lightBackground;
uniform float u_pixelRatio;

#define HUE 0.205
#define HUE_SPREAD -0.055
#define HUE_TRAVEL 2.2
#define CHROMA 0.165
#define LIGHTNESS 0.68
#define COLOUR_CYCLE 0.180289254
#define THETA 2.12781549
#define SHEAR 0.963575602
#define SHRINK 0.952983558
#define LAYERS 48.0
#define WARP_FREQ_X 0.402473509
#define WARP_FREQ_Y 2.57634234
#define WARP_AMP_X 0.14635025
#define WARP_AMP_Y 0.0324737616
#define ASPECT_X 2.08348799
#define ASPECT_Y 0.215936691
#define OFFSET_X 0.364977837
#define OFFSET_Y -0.0113312239
#define TILT -0.474999517
#define ZOOM 1.04318345
#define CENTRE_X 0.574172676
#define CENTRE_Y -0.492953688
#define GLOW_SIZE 0.00240834639
#define FALLOFF 0.305342615
#define VIGNETTE 0.0701176673
#define FLOW_SPEED 0.624523401
#define FLOW_DIRECTION 1.0
#define BREATH_RATE 0.598989964
#define BREATH_AMOUNT 0.118659742
#define PHASE 76.053566
#define ECHO 0.380957514
#define ECHO_SHIFT -0.121080875
#define SOFTNESS 0.00217873859
#define LIGHT_SWING 0.15
#define TAU 6.28318530718

vec3 oklchToLinear(float L, float C, float h) {
  float a = C * cos(h);
  float b = C * sin(h);
  float l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  float m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  float s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  vec3 lms = vec3(l_, m_, s_);
  lms = lms * lms * lms;
  mat3 m = mat3(
    4.0767416621, -3.3077115913, 0.2309699292,
    -1.2684380046, 2.6097574011, -0.3413193965,
    -0.0041960863, -0.7034186147, 1.7076147010
  );
  return m * lms;
}

float fmod(float x, float y) { return x - y * floor(x / y); }

float blueNoise(vec2 p, float frame) {
  vec2 q = p + 5.588238 * fmod(frame, 64.0);
  return fract(52.9829189 * fract(0.06711056 * q.x + 0.00583715 * q.y));
}

void main() {
  vec2 R = u_resolution;
  vec2 frag = gl_FragCoord.xy;
  vec2 pos = (frag - 0.5 * R) / R.y;
  float t = u_time * FLOW_SPEED * FLOW_DIRECTION + PHASE;
  float breath = (-sin(u_time * BREATH_RATE * 1.5) + sin(u_time * BREATH_RATE + 1.0)) * 0.25 + 0.5;

  vec2 p = (pos - vec2(CENTRE_X, CENTRE_Y)) * (ZOOM - breath * BREATH_AMOUNT);
  float ct = cos(TILT);
  float st = sin(TILT);
  p = mat2(ct, -st, st, ct) * p;

  mat2 fold = mat2(cos(THETA), -SHEAR, sin(THETA), cos(THETA));

  float hue0 = HUE * TAU;
  float hue1 = hue0 + HUE_SPREAD * TAU;
  vec3 color = vec3(0.0);

  for (float i = 1.0; i <= 52.0; i += 1.0) {
    if (i > LAYERS) { break; }
    p.x += -sin(p.y * WARP_FREQ_X + t + i * 0.007) * WARP_AMP_X;
    p.y += -sin(p.x * WARP_FREQ_Y - t + i * 0.02) * WARP_AMP_Y;
    p = fold * p * SHRINK;

    vec2 q = p - vec2(OFFSET_X + breath * 0.1, OFFSET_Y);
    vec2 s = vec2(q.x * ASPECT_X, q.y * ASPECT_Y);
    float glow = GLOW_SIZE / (dot(s, s) + SOFTNESS);
    if (ECHO > 0.0) {
      vec2 e = vec2((q.x - ECHO_SHIFT) * ASPECT_X, s.y);
      glow += ECHO * GLOW_SIZE / (dot(e, e) + SOFTNESS);
    }
    glow *= 0.25 + breath * 0.4;

    float r = length(p);
    float k = sin(i * COLOUR_CYCLE + t * 1.2 + r * HUE_TRAVEL) * 0.5 + 0.5;
    vec3 tint = clamp(oklchToLinear(LIGHTNESS + LIGHT_SWING * k, CHROMA * (0.75 + 0.35 * k), mix(hue0, hue1, k)), 0.0, 1.0);
    color += glow * tint * exp2(-r * FALLOFF);
  }

  vec3 x = max(color, vec3(0.0));
  color = (x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14);
  color = pow(clamp(color, vec3(0.0), vec3(1.0)), vec3(0.85, 0.92, 0.98));

  float edge = smoothstep(0.5, 1.6, length(pos));
  color *= 1.0 - edge * VIGNETTE;

  vec3 dark = u_darkBackground + color * (1.0 - u_darkBackground);
  float strength = max(color.r, max(color.g, color.b));
  vec3 light = u_lightBackground * (1.0 - strength) + color * 0.96;
  color = mix(dark, light, vec3(u_lightMode));

  color += (blueNoise(frag, floor(u_time * 24.0)) - 0.5) / 255.0;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

export type ShaderTheme = "dark" | "light";

export type ShaderOptions = {
  theme?: ShaderTheme;
  background?: { dark?: string; light?: string };
  autoplay?: boolean;
  signal?: AbortSignal;
  onError?: (error: Error) => void;
};

export type ShaderHandle = {
  setTheme(theme: ShaderTheme): void;
  render(time: number): void;
  destroy(): void;
};

export type YuwellShaderProps = {
  theme?: ShaderTheme;
  background?: { dark?: string; light?: string };
  time?: number;
  onError?: (error: Error) => void;
  className?: string;
  style?: CSSProperties;
};

export function YuwellShader({ theme = "dark", background, time, onError, className, style }: YuwellShaderProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const shader = useRef<ShaderHandle | null>(null);
  const latestTheme = useRef(theme);
  const latestTime = useRef(time);
  const latestOnError = useRef(onError);
  const dark = background?.dark ?? "#0a0a0b";
  const light = background?.light ?? "#ffffff";
  const animated = time === undefined;

  useEffect(() => {
    latestTheme.current = theme;
    shader.current?.setTheme(theme);
  }, [theme]);

  useEffect(() => {
    latestTime.current = time;
    if (time !== undefined) shader.current?.render(time);
  }, [time]);

  useEffect(() => {
    latestOnError.current = onError;
  }, [onError]);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    let handle: ShaderHandle | null = null;
    const controller = new AbortController();
    const options: ShaderOptions = {
      theme: latestTheme.current,
      background: { dark, light },
      autoplay: animated,
      signal: controller.signal,
      onError: (error) => {
        if (controller.signal.aborted) return;
        if (latestOnError.current) latestOnError.current(error);
        else console.warn("[YuwellShader]", error);
      },
    };

    createShader(element, options).then((created) => {
      if (controller.signal.aborted) { created.destroy(); return; }
      handle = created;
      shader.current = created;
      if (latestTheme.current !== options.theme) created.setTheme(latestTheme.current);
      if (latestTime.current !== undefined) created.render(latestTime.current);
    }).catch((error: unknown) => {
      if (!controller.signal.aborted) options.onError?.(error instanceof Error ? error : new Error(String(error)));
    });

    return () => {
      controller.abort();
      handle?.destroy();
      shader.current = null;
    };
  }, [dark, light, animated]);

  return (
    <canvas
      ref={canvas}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
      aria-hidden="true"
    />
  );
}

const MAX_PIXELS = 800000;
const THEME_EASE = 7;
const MIN_FRAME_INTERVAL = 1000 / 60; // 60 FPS cap to prevent 120Hz/144Hz high-refresh GPU drain

function parseHex(hex: string): [number, number, number] {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) throw new Error(`Background colours must be #rrggbb, got "${hex}".`);
  return [0, 2, 4].map((i) => parseInt(match[1].slice(i, i + 2), 16) / 255) as [number, number, number];
}

function animate(options: ShaderOptions, draw: (time: number, theme: number, pixelRatio: number) => void, canvas: HTMLCanvasElement, release: () => void, maxDimension = Infinity): ShaderHandle {
  const autoplay = options.autoplay !== false;
  const stillness = window.matchMedia("(prefers-reduced-motion: reduce)");
  let resolution = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
  let deviceRatio = window.devicePixelRatio || 1;
  let width = canvas.clientWidth, height = canvas.clientHeight;
  let visible = true;
  let disposed = false;
  let targetTheme = options.theme === "light" ? 1 : 0;
  let theme = targetTheme;
  let frame = 0;
  let elapsed = 0;
  let lastTime = 0;
  let lastDrawTime = 0;
  let previous: number | null = null;

  function canDraw() {
    return !disposed && !document.hidden && visible && width > 0 && height > 0;
  }

  function fitCanvas() {
    // Ambient background liquid wave: clamp internal scale to max 1.0x DPR
    // to prevent 4x retina rasterization tax while maintaining silky smooth GPU upscaling
    const effectiveRatio = Math.min(deviceRatio, 1.0);
    const scale = Math.min(effectiveRatio, Math.sqrt(MAX_PIXELS / (width * height)), maxDimension / width, maxDimension / height);
    const w = Math.max(1, Math.floor(width * scale)), h = Math.max(1, Math.floor(height * scale));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    return w / width;
  }

  function render(time: number) {
    if (disposed) return;
    lastTime = time;
    if (!canDraw()) return;
    try {
      draw(time, theme, fitCanvas());
    } catch (error) {
      destroy();
      const failure = error instanceof Error ? error : new Error(String(error));
      if (options.onError) options.onError(failure);
      else console.error(failure);
    }
  }

  function schedule() {
    if (!frame && canDraw()) frame = requestAnimationFrame(tick);
  }

  function refresh() {
    if (!canDraw()) {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = null;
    } else schedule();
  }

  function tick(now: number) {
    frame = 0;
    if (!canDraw()) { previous = null; return; }

    // Throttle to 60 FPS max to prevent unnecessary GPU strain on 120Hz/144Hz monitors
    if (lastDrawTime && (now - lastDrawTime) < MIN_FRAME_INTERVAL - 1) {
      schedule();
      return;
    }
    lastDrawTime = now;

    const delta = previous === null ? 0 : Math.min((now - previous) / 1000, 0.1);
    previous = now;
    if (autoplay) {
      if (!stillness.matches) elapsed += delta;
      theme += (targetTheme - theme) * (1 - Math.exp(-delta * THEME_EASE));
      if (Math.abs(targetTheme - theme) < 0.002) theme = targetTheme;
    }
    render(autoplay ? elapsed : lastTime);
    if (autoplay && (!stillness.matches || theme !== targetTheme)) schedule();
    else previous = null;
  }

  function pixelRatioChanged() {
    if (disposed) return;
    const next = window.devicePixelRatio || 1;
    if (deviceRatio === next) return;
    deviceRatio = next;
    resolution.removeEventListener("change", pixelRatioChanged);
    resolution = window.matchMedia(`(resolution: ${next}dppx)`);
    resolution.addEventListener("change", pixelRatioChanged);
    refresh();
  }

  const observer = new ResizeObserver(([entry]) => {
    if (disposed || !entry) return;
    const next = entry.contentRect;
    if (width === next.width && height === next.height) return;
    width = next.width;
    height = next.height;
    refresh();
  });
  const intersection = new IntersectionObserver(([entry]) => {
    if (disposed || !entry || visible === entry.isIntersecting) return;
    visible = entry.isIntersecting;
    refresh();
  });

  function destroy() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    frame = 0;
    observer.disconnect();
    intersection.disconnect();
    resolution.removeEventListener("change", pixelRatioChanged);
    stillness.removeEventListener("change", refresh);
    document.removeEventListener("visibilitychange", refresh);
    window.removeEventListener("resize", pixelRatioChanged);
    options.signal?.removeEventListener("abort", destroy);
    release();
  }

  observer.observe(canvas);
  intersection.observe(canvas);
  resolution.addEventListener("change", pixelRatioChanged);
  stillness.addEventListener("change", refresh);
  document.addEventListener("visibilitychange", refresh);
  window.addEventListener("resize", pixelRatioChanged);
  options.signal?.addEventListener("abort", destroy, { once: true });
  if (options.signal?.aborted) destroy();
  else schedule();

  return {
    setTheme(next: ShaderTheme) {
      if (disposed) return;
      targetTheme = next === "light" ? 1 : 0;
      if (autoplay) refresh();
      else { theme = targetTheme; render(lastTime); }
    },
    render,
    destroy,
  };
}

const UNIFORM_FLOATS = 12;

// ── Native WebGPU Implementation ──
async function createWebGPUShader(canvas: HTMLCanvasElement, options: ShaderOptions): Promise<ShaderHandle> {
  const dark = parseHex(options.background?.dark ?? "#0a0a0b");
  const light = parseHex(options.background?.light ?? "#ffffff");
  options.signal?.throwIfAborted();
  if (typeof navigator === "undefined" || !navigator.gpu) {
    throw new Error("WebGPU is not available");
  }
  const adapter = await navigator.gpu.requestAdapter();
  options.signal?.throwIfAborted();
  if (!adapter) throw new Error("No WebGPU adapter");
  const device = await adapter.requestDevice();
  let context: GPUCanvasContext | null = null;
  let configured = false;
  let released = false;
  let failure: Error | null = null;
  let handle: ShaderHandle | null = null;

  function release() {
    if (released) return;
    released = true;
    options.signal?.removeEventListener("abort", abort);
    device.removeEventListener("uncapturederror", gpuError);
    if (configured) context?.unconfigure();
    device.destroy();
  }

  function abort() {
    if (handle) handle.destroy();
    else release();
  }

  function fail(error: Error) {
    if (released) return;
    failure = error;
    if (handle) {
      handle.destroy();
      if (options.onError) options.onError(error);
    } else release();
  }

  function gpuError(event: GPUUncapturedErrorEvent) {
    event.preventDefault();
    fail(new Error(event.error.message));
  }

  function checkActive() {
    options.signal?.throwIfAborted();
    if (failure) throw failure;
  }

  options.signal?.addEventListener("abort", abort, { once: true });
  device.addEventListener("uncapturederror", gpuError);
  void device.lost.then((info) => {
    if (!released) fail(new Error(`WebGPU device lost: ${info.message || info.reason}.`));
  });

  try {
    checkActive();
    const format = navigator.gpu.getPreferredCanvasFormat();
    const uniforms = device.createBuffer({ size: UNIFORM_FLOATS * 4, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
    const uniformData = new Float32Array(UNIFORM_FLOATS);
    const fieldModule = device.createShaderModule({ code: FIELD_SHADER });
    const [fieldPipeline] = await Promise.all([
      device.createRenderPipelineAsync({
        layout: "auto",
        vertex: { module: fieldModule, entryPoint: "vertexMain" },
        fragment: { module: fieldModule, entryPoint: "fragmentMain", targets: [{ format }] },
        primitive: { topology: "triangle-list" },
      }),
    ]);
    checkActive();
    const fieldBindGroup = device.createBindGroup({
      layout: fieldPipeline.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer: uniforms } }],
    });

    const canvasContext = canvas.getContext("webgpu");
    if (!canvasContext) throw new Error("Canvas webgpu context unavailable");
    context = canvasContext;
    context.configure({ device, format, alphaMode: "opaque" });
    configured = true;

    handle = animate(options, (time, theme, pixelRatio) => {
      const { width, height } = canvas;
      const output = canvasContext.getCurrentTexture().createView();
      uniformData.set([width, height, time, theme, dark[0], dark[1], dark[2], pixelRatio, light[0], light[1], light[2], 0]);
      device.queue.writeBuffer(uniforms, 0, uniformData);
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({ colorAttachments: [{ view: output, loadOp: "clear" as const, storeOp: "store" as const }] });
      pass.setPipeline(fieldPipeline);
      pass.setBindGroup(0, fieldBindGroup);
      pass.draw(3);
      pass.end();
      device.queue.submit([encoder.finish()]);
    }, canvas, release, device.limits.maxTextureDimension2D);
    return handle;
  } catch (error) {
    release();
    throw failure ?? error;
  }
}

// ── WebGL 1/2 Cross-Platform High-Performance Fallback ──
function createWebGLShader(canvas: HTMLCanvasElement, options: ShaderOptions): ShaderHandle {
  const dark = parseHex(options.background?.dark ?? "#0a0a0b");
  const light = parseHex(options.background?.light ?? "#ffffff");

  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as WebGLRenderingContext | null;
  if (!gl) throw new Error("WebGL not available in this browser");

  const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertShader, WEBGL_VERTEX_SHADER);
  gl.compileShader(vertShader);

  const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragShader, WEBGL_FRAGMENT_SHADER);
  gl.compileShader(fragShader);

  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(fragShader);
    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);
    throw new Error("WebGL shader compilation failed: " + info);
  }

  const program = gl.createProgram()!;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error("WebGL program link failed");
  }

  const positionLocation = gl.getAttribLocation(program, "position");
  const uResolution = gl.getUniformLocation(program, "u_resolution");
  const uTime = gl.getUniformLocation(program, "u_time");
  const uLightMode = gl.getUniformLocation(program, "u_lightMode");
  const uDarkBackground = gl.getUniformLocation(program, "u_darkBackground");
  const uLightBackground = gl.getUniformLocation(program, "u_lightBackground");
  const uPixelRatio = gl.getUniformLocation(program, "u_pixelRatio");

  const quadBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     3, -1,
    -1,  3
  ]), gl.STATIC_DRAW);

  let released = false;
  function release() {
    if (released) return;
    released = true;
    gl?.deleteBuffer(quadBuffer);
    gl?.deleteProgram(program);
    gl?.deleteShader(vertShader);
    gl?.deleteShader(fragShader);
  }

  const handle = animate(options, (time, theme, pixelRatio) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, time);
    gl.uniform1f(uLightMode, theme);
    gl.uniform3f(uDarkBackground, dark[0], dark[1], dark[2]);
    gl.uniform3f(uLightBackground, light[0], light[1], light[2]);
    gl.uniform1f(uPixelRatio, pixelRatio);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, canvas, release);

  return handle;
}

// ── Smart Engine Dispatcher: WebGPU first, then seamless WebGL fallback ──
export async function createShader(canvas: HTMLCanvasElement, options: ShaderOptions = {}): Promise<ShaderHandle> {
  options.signal?.throwIfAborted();
  try {
    if (typeof navigator !== "undefined" && navigator.gpu) {
      return await createWebGPUShader(canvas, options);
    }
  } catch (gpuError) {
    console.warn("[YuwellShader] WebGPU unavailable or failed, switching to WebGL fallback:", gpuError);
  }
  options.signal?.throwIfAborted();
  return createWebGLShader(canvas, options);
}
