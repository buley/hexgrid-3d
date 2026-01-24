
import React, { useEffect, useRef, useState } from 'react';
import { FluidEngineFactory, FluidEngine } from '../algorithms/FluidEngineFactory';
import { HexGridProps } from '../types';

export function HexGrid(props: HexGridProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [engine, setEngine] = useState<FluidEngine | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Fluid Engine
    const initEngine = async () => {
      try {
        const fluidEngine = await FluidEngineFactory.create({
          width: 64,
          height: 64,
          depth: 64,
          viscosity: 0.0001,
          diffusion: 0.00001
        });
        setEngine(fluidEngine);
      } catch (err: unknown) {
        console.error("Failed to init fluid engine", err);
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    initEngine();

    return () => {
       // Cleanup if engine has cleanup method
       if (engine && 'clear' in engine) {
           engine.clear();
       }
    };
  }, []);

  if (error) {
      return <div className="text-red-500">Error initializing simulation: {error}</div>;
  }

  return (
    <div className="hexgrid-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
        {/* Visualization Canvas */}
        <canvas 
            ref={canvasRef} 
            width={800} 
            height={600}
            style={{ width: '100%', height: '100%' }}
        />
        
        {/* Status Overlay */}
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '5px', pointerEvents: 'none' }}>
            Engine: {engine ? engine.constructor.name : 'Initializing...'}
        </div>
    </div>
  );
}

export default HexGrid;
