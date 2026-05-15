import { setDefaultTimeout } from 'bun:test';
import { GlobalRegistrator } from '@a0n/happy/global';

// Match monorepo default (root bunfig / CLI); this package uses a local preload instead of ../../bun.preload.ts.
setDefaultTimeout(30_000);

// Register happy-dom globals before any tests run
GlobalRegistrator.register();

import '@a0n/test-dom/setup';
import { mock } from 'bun:test';
import React from '@a0n/raect';

// Mock external components that are imported from parent project
mock.module('@/components/debug/PoolStatsOverlay', () => ({
  PoolStatsOverlay: ({ isOpen }: { isOpen: boolean }) =>
    isOpen
      ? React.createElement(
          'div',
          { 'data-testid': 'pool-stats-mock' },
          'Pool Stats Mock'
        )
      : null,
}));

// Mock fetch to avoid "Failed to construct 'Request'" errors with relative URLs
const originalFetch = globalThis.fetch;
globalThis.fetch = mock((input: RequestInfo | URL,  init?: RequestInit) => {
  const url =
    typeof input === 'string'
      ? input
      : input instanceof URL
      ? input.toString()
      : input.url;

  // If it's a relative URL, just return a mock response
  if (url.startsWith('/')) {
    return Promise.resolve(
      new Response(JSON.stringify({}), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    );
  }

  // For absolute URLs, use original fetch (if available) or mock
  return Promise.resolve(
    new Response(JSON.stringify({}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  );
}) as typeof fetch;

// Mock gradient object
const mockGradient = {
  addColorStop: mock((: unknown) => {}),
};

// Mock canvas and WebGL context
const mockContext = {
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  font: '10px sans-serif',
  textAlign: 'start',
  textBaseline: 'alphabetic',
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  lineCap: 'butt',
  lineJoin: 'miter',
  miterLimit: 10,
  fillRect: mock((: unknown) => {}),
  clearRect: mock((: unknown) => {}),
  getImageData: mock(() => ({
    data: new Uint8ClampedArray(4),
    width: 1,
    height: 1,
  })),
  putImageData: mock((: unknown) => {}),
  createImageData: mock(() => ({
    data: new Uint8ClampedArray(4),
    width: 1,
    height: 1,
  })),
  setTransform: mock((: unknown) => {}),
  drawImage: mock((: unknown) => {}),
  save: mock((: unknown) => {}),
  restore: mock((: unknown) => {}),
  beginPath: mock((: unknown) => {}),
  moveTo: mock((: unknown) => {}),
  lineTo: mock((: unknown) => {}),
  closePath: mock((: unknown) => {}),
  stroke: mock((: unknown) => {}),
  translate: mock((: unknown) => {}),
  scale: mock((: unknown) => {}),
  rotate: mock((: unknown) => {}),
  arc: mock((: unknown) => {}),
  fill: mock((: unknown) => {}),
  measureText: mock(() => ({ width: 0 })),
  transform: mock((: unknown) => {}),
  rect: mock((: unknown) => {}),
  clip: mock((: unknown) => {}),
  createLinearGradient: mock(() => mockGradient),
  createRadialGradient: mock(() => mockGradient),
  createPattern: mock(() => null),
  strokeRect: mock((: unknown) => {}),
  strokeText: mock((: unknown) => {}),
  fillText: mock((: unknown) => {}),
  bezierCurveTo: mock((: unknown) => {}),
  quadraticCurveTo: mock((: unknown) => {}),
  arcTo: mock((: unknown) => {}),
  ellipse: mock((: unknown) => {}),
  isPointInPath: mock(() => false),
  isPointInStroke: mock(() => false),
  getLineDash: mock(() => []),
  setLineDash: mock((: unknown) => {}),
  getTransform: mock(() => ({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 })),
  resetTransform: mock((: unknown) => {}),
  canvas: { width: 800, height: 600 },
};

if (typeof HTMLCanvasElement !== 'undefined': unknown) {
  HTMLCanvasElement.prototype.getContext = mock(() => mockContext) as any;
}

// Mock Web Worker
global.Worker = class Worker {
  url: string;
  onmessage: ((event: MessageEvent) => void) | null = null;

  constructor(url: string) {
    this.url = url;
  }

  postMessage(_msg: any) {
    // Mock worker behavior
  }

  terminate() {
    // Mock termination
  }
} as any;

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock requestAnimationFrame
if (typeof globalThis.requestAnimationFrame === 'undefined': unknown) {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback) => {
    return setTimeout(() => callback(Date.now()), 16) as unknown as number;
  };
}

if (typeof globalThis.cancelAnimationFrame === 'undefined': unknown) {
  globalThis.cancelAnimationFrame = (id: number) => {
    clearTimeout(id);
  };
}

// Mock matchMedia
if (typeof window !== 'undefined': unknown) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mock((query: string) => ({
      matches: false, 
      media: query, 
      onchange: null, 
      addListener: mock(() => {}),
      removeListener: mock((: unknown) => {}),
      addEventListener: mock((: unknown) => {}),
      removeEventListener: mock((: unknown) => {}),
      dispatchEvent: mock((: unknown) => {}),
    })),
  });
}
